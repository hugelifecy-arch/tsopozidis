import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { captureException } from '@/lib/error-tracking';
import { checkRateLimit } from '@/lib/rate-limit';

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not configured');
  return new Resend(key);
}

type BookingLocale = 'en' | 'ru' | 'el';

interface BookingData {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  location?: string;
  message: string;
  website?: string; // honeypot
  locale?: BookingLocale | string;
}

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 3_600_000;

// Reject obviously malformed email addresses before hitting Resend.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUPPORTED_LOCALES: readonly BookingLocale[] = ['en', 'ru', 'el'];

interface ConfirmationCopy {
  subject: string;
  greeting: (name: string) => string;
  body: string;
  urgentIntro: string;
  phoneLine: string;
  signoff: string;
}

const CONFIRMATIONS: Record<BookingLocale, ConfirmationCopy> = {
  en: {
    subject: 'Booking Inquiry Received — Alexandros Tsopozidis',
    greeting: (name) => `Dear ${name},`,
    body:
      'Thank you for your booking inquiry. We have received your request and will get back to you within 24 hours.',
    urgentIntro: 'For urgent matters, please contact us directly:',
    phoneLine: '+7 938 316 30 34 (Liana)',
    signoff: 'Best regards,<br>Team Alexandros Tsopozidis',
  },
  ru: {
    subject: 'Ваша заявка получена — Александрос Цопозидис',
    greeting: (name) => `Здравствуйте, ${name}!`,
    body:
      'Спасибо за заявку на букинг. Мы получили ваше сообщение и ответим в течение 24 часов.',
    urgentIntro: 'По срочным вопросам свяжитесь с нами напрямую:',
    phoneLine: '+7 938 316 30 34 (Лиана)',
    signoff: 'С уважением,<br>Команда Александроса Цопозидиса',
  },
  el: {
    subject: 'Λάβαμε το αίτημά σας — Αλέξανδρος Τσοποζίδης',
    greeting: (name) => `Αγαπητέ/ή ${name},`,
    body:
      'Ευχαριστούμε για το αίτημα κράτησης. Το λάβαμε και θα σας απαντήσουμε εντός 24 ωρών.',
    urgentIntro: 'Για επείγοντα, επικοινωνήστε μαζί μας απευθείας:',
    phoneLine: '+7 938 316 30 34 (Λιάνα)',
    signoff: 'Με εκτίμηση,<br>Ομάδα Αλέξανδρου Τσοποζίδη',
  },
};

function normalizeLocale(raw: unknown): BookingLocale {
  if (typeof raw !== 'string') return 'en';
  const lc = raw.toLowerCase();
  return (SUPPORTED_LOCALES as readonly string[]).includes(lc) ? (lc as BookingLocale) : 'en';
}


function escapeHtml(value: string | undefined | null): string {
  if (!value) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const { allowed } = await checkRateLimit(`booking:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const data: BookingData = await request.json();

    // Honeypot — bot detected, silently accept
    if (data.website) {
      return NextResponse.json({ success: true });
    }

    if (!data.name || !data.email || !data.eventType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!EMAIL_RE.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    if (
      data.name.length > 200 ||
      data.email.length > 200 ||
      (data.message && data.message.length > 5000)
    ) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    const safe = {
      name: escapeHtml(data.name),
      email: escapeHtml(data.email),
      phone: escapeHtml(data.phone) || 'Not provided',
      eventType: escapeHtml(data.eventType),
      eventDate: escapeHtml(data.eventDate) || 'Not specified',
      location: escapeHtml(data.location) || 'Not specified',
      message: escapeHtml(data.message) || 'No message',
    };

    const resend = getResendClient();

    await resend.emails.send({
      from: 'Tsopozidis Website <noreply@tsopozidis-alexandros.com>',
      to: ['booking@tsopozidis-alexandros.com'],
      replyTo: data.email,
      subject: `New Booking Inquiry: ${data.eventType} — ${data.name}`.slice(0, 200),
      html: `
        <h2>New Booking Inquiry</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${safe.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${safe.email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${safe.phone}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Event Type:</td><td style="padding: 8px;">${safe.eventType}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Event Date:</td><td style="padding: 8px;">${safe.eventDate}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Location:</td><td style="padding: 8px;">${safe.location}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td><td style="padding: 8px; white-space: pre-wrap;">${safe.message}</td></tr>
        </table>
        <p style="color: #666; margin-top: 20px;">Sent from www.tsopozidis-alexandros.com booking form</p>
      `,
    });

    const locale = normalizeLocale(data.locale);
    const copy = CONFIRMATIONS[locale];

    await resend.emails.send({
      from: 'Alexandros Tsopozidis <noreply@tsopozidis-alexandros.com>',
      to: [data.email],
      subject: copy.subject,
      html: `
        <p>${copy.greeting(safe.name)}</p>
        <p>${copy.body}</p>
        <p>${copy.urgentIntro}</p>
        <p>${copy.phoneLine}<br>
        <a href="https://wa.me/79383163034">WhatsApp</a><br>
        <a href="https://t.me/TsopozidisPr">Telegram</a></p>
        <p>${copy.signoff}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    captureException(error, { context: 'booking-api' });
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}
