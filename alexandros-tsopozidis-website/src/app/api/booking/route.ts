import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { captureException } from '@/lib/error-tracking';

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

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 3600000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const data: BookingData = await request.json();

    // Honeypot check — bot detected, silently accept
    if (data.website) {
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!data.name || !data.email || !data.eventType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Length validation
    if (data.name.length > 200 || data.email.length > 200 || (data.message && data.message.length > 5000)) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    const resend = getResendClient();

    // Send notification email to booking manager
    await resend.emails.send({
      from: 'Tsopozidis Website <noreply@tsopozidis-alexandros.com>',
      to: ['booking@tsopozidis-alexandros.com'],
      replyTo: data.email,
      subject: `New Booking Inquiry: ${data.eventType} — ${data.name}`,
      html: `
        <h2>New Booking Inquiry</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${data.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${data.email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${data.phone || 'Not provided'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Event Type:</td><td style="padding: 8px;">${data.eventType}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Event Date:</td><td style="padding: 8px;">${data.eventDate || 'Not specified'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Location:</td><td style="padding: 8px;">${data.location || 'Not specified'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${data.message || 'No message'}</td></tr>
        </table>
        <p style="color: #666; margin-top: 20px;">Sent from www.tsopozidis-alexandros.com booking form</p>
      `,
    });

    // Send confirmation to customer
    await resend.emails.send({
      from: 'Alexandros Tsopozidis <noreply@tsopozidis-alexandros.com>',
      to: [data.email],
      subject: 'Booking Inquiry Received — Alexandros Tsopozidis',
      html: `
        <p>Dear ${data.name},</p>
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
