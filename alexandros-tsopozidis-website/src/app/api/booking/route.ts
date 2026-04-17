import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { captureException } from '@/lib/error-tracking';
import { checkRateLimit } from '@/lib/rate-limit';

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not configured');
  return new Resend(key);
}

interface BookingData {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  location?: string;
  message: string;
  website?: string; // honeypot
}

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 3_600_000;

// Reject obviously malformed email addresses before hitting Resend.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    await resend.emails.send({
      from: 'Alexandros Tsopozidis <noreply@tsopozidis-alexandros.com>',
      to: [data.email],
      subject: 'Booking Inquiry Received — Alexandros Tsopozidis',
      html: `
        <p>Dear ${safe.name},</p>
        <p>Thank you for your booking inquiry. We have received your request and will get back to you within 24 hours.</p>
        <p>For urgent matters, please contact us directly:</p>
        <p>+7 938 316 30 34 (Liana)<br>
        <a href="https://wa.me/79383163034">WhatsApp</a><br>
        <a href="https://t.me/TsopozidisPr">Telegram</a></p>
        <p>Best regards,<br>Team Alexandros Tsopozidis</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    captureException(error, { context: 'booking-api' });
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}
