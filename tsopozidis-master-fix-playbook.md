# Alexandros Tsopozidis Website — Master Fix Playbook

## Claude Code Implementation Guide — All Audit Fixes + Features

> **Generated:** 2026-03-14
> **Codebase:** `alexandros-tsopozidis-website/`
> **Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS 3.4, Framer Motion, next-intl 4.8, Lucide React
> **Theme:** Dark (#0A0A0A bg, #C8A96E gold accent, Cinzel/Cormorant Garamond/Inter fonts)
> **Locales:** EN (`/en/`), RU (`/ru/`), EL (`/el/`)
> **Hosting:** Vercel
> **Domain:** `https://tsopozidis-alexandros.com`
> **Booking Contact:** Liana, +7 938 316 30 34

---

## HOW TO USE THIS FILE

Run each prompt **sequentially** in Claude Code from the project root directory. Each prompt is self-contained with full context. Do NOT skip Phase 1 — it fixes critical broken functionality. After each prompt, verify the fix works with `npm run build` before proceeding.

**Important references for Claude Code:**
- Translation files: `messages/en.json`, `messages/ru.json`, `messages/el.json`
- Data files: `src/lib/data/discography.ts`, `src/lib/data/events.ts`, `src/lib/data/videos.ts`, `src/lib/data/gallery.ts`, `src/lib/data/social-links.ts`
- SEO utility: `src/lib/seo.ts` (BASE_URL = `https://tsopozidis-alexandros.com`)
- i18n routing: `src/i18n/routing.ts` (locales: en, ru, el; defaultLocale: en)

---

## PHASE 1: CRITICAL FIXES (Do First — Nothing Else Matters Until These Are Done)

### Prompt 1.1 — Fix Duplicate BookingForm & Error Swallowing

```
There are two BookingForm components in the codebase:
1. `src/components/BookingForm.tsx` — ACTIVE, used by contact page
2. `src/components/contact/BookingForm.tsx` — DEAD CODE, unused

Do the following:
1. DELETE `src/components/contact/BookingForm.tsx` entirely
2. In `src/components/BookingForm.tsx`, fix the error handling. Currently the catch block silently sets `setSubmitted(true)` even on failure, which lies to the user. Fix it:

```tsx
// CURRENT (broken):
} catch {
  setSubmitted(true); // ← WRONG: shows success on failure
}

// FIX TO:
} catch {
  alert('Something went wrong. Please try WhatsApp: +7 938 316 30 34');
} finally {
  setSubmitting(false);
}
```

3. Also add proper error state handling — add a `const [error, setError] = useState(false);` state. On catch, `setError(true)`. Render an error message below the form with a WhatsApp fallback link if error is true.

4. Verify no other files import from `src/components/contact/BookingForm.tsx`. The contact page at `src/app/[locale]/contact/page.tsx` imports from `@/components/BookingForm` which is the correct one.

Run `npm run build` to verify no import errors.
```

### Prompt 1.2 — Integrate Email Delivery for Booking Form

```
The booking API route at `src/app/api/booking/route.ts` currently only does `console.log()`. No email is ever sent. Fix this by integrating the Resend email service.

1. Install Resend:
```bash
npm install resend
```

2. Rewrite `src/app/api/booking/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingData {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  location?: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: BookingData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.eventType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

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
        <p style="color: #666; margin-top: 20px;">Sent from tsopozidis-alexandros.com booking form</p>
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
        <p>📞 +7 938 316 30 34 (Liana)<br>
        💬 <a href="https://wa.me/79383163034">WhatsApp</a><br>
        ✈️ <a href="https://t.me/TsopozidisPr">Telegram</a></p>
        <p>Best regards,<br>Team Alexandros Tsopozidis</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking email error:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}
```

3. Create a `.env.example` file in the project root:
```
# Email (Resend — https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Analytics
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_YANDEX_METRICA_ID=XXXXXXXX
```

4. Add `RESEND_API_KEY` to `.env.local` (the actual key needs to be set in Vercel dashboard).

Note: Until the Resend API key is configured, the form will return 500 errors, which the updated BookingForm component (from Prompt 1.1) will now properly display to the user instead of silently swallowing.
```

### Prompt 1.3 — Fix YouTube IDs in Discography Data

```
In `src/lib/data/discography.ts`, ALL singles have placeholder YouTube IDs like `TODO_mia_kardia`, `TODO_kavkaz`, etc. Cross-reference with the REAL YouTube IDs from `src/lib/data/videos.ts` and update them.

Known real YouTube IDs (from videos.ts):
- Бродяга (brodyaga, 2017): z9ASjQE6Q2Y
- Male Male (2016): o20LEgccjxY
- Kaciyorum (2019): F9rQSin9PIY
- Дай мне номер телефона (2018): Rxp_-wMKU5k
- Расскажи (2020): Ne_uRfKUUlk

Update these singles in `discography.ts`:
1. Find the single with id "rasskazhi" → set youtubeId to "Ne_uRfKUUlk"
2. Find the single with id "kapkan" (Капкан, 2021) → youtubeId stays as TODO since we don't have it
3. Find "kavkaz" → search YouTube for "Alexandros Tsopozidis Kavkaz" and if you can't verify, leave as TODO
4. For ALL singles where we don't have a verified YouTube ID, change from `TODO_*` to `undefined` (not a string, just remove the field or set to undefined). This way the UI can check `if (single.youtubeId)` and not render broken links.

Make the `youtubeId` field truly optional in the Release interface — it should be `youtubeId?: string` (which it already is, but ensure all TODO_ strings are replaced with `undefined`).

In `discography.ts`, update ONLY the ones we have confirmed IDs for. Set the rest to `undefined` by removing the youtubeId property entirely from those objects.

Also update `src/lib/data/videos.ts` — add these missing videos that should be on the Videos page:
```typescript
// Add after the existing 5 videos:
{ id: "kavkaz", youtubeId: "SEARCH_AND_VERIFY", title: "Kavkaz", titleRu: "Кавказ", year: 2023, featuring: "Vasiliadis" },
{ id: "ya-grek", youtubeId: "SEARCH_AND_VERIFY", title: "Я грек", titleRu: "Я грек", year: 2022 },
```

For videos where you can't verify the YouTube ID, leave a comment `// TODO: verify YouTube ID` but do NOT use a fake ID.
```

### Prompt 1.4 — Add Spotify Embed to Music Page

```
The Music page at `src/app/[locale]/music/page.tsx` has a placeholder where the Spotify embed should be. Replace the grey placeholder box with a real Spotify iframe embed.

Find this block in the Latest Release section (around line 51):
```tsx
{/* Spotify embed placeholder */}
<div className="mt-6 bg-bg-tertiary rounded-lg p-4">
  <p className="text-text-tertiary text-sm font-sans">{t('spotify_placeholder')}</p>
</div>
```

Replace it with an actual Spotify embed:
```tsx
{/* Spotify Player */}
<div className="mt-6">
  <iframe
    src="https://open.spotify.com/embed/artist/6PPuuN3cvmbyuvgrGbhXge?utm_source=generator&theme=0"
    width="100%"
    height="352"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    className="rounded-lg"
    title="Spotify Player — Alexandros Tsopozidis"
  />
</div>
```

Also add a Spotify embed in the Album section for the "За тобой" album. After the streaming platform buttons, add:
```tsx
<div className="mt-6">
  <iframe
    src="https://open.spotify.com/embed/artist/6PPuuN3cvmbyuvgrGbhXge?utm_source=generator&theme=0"
    width="100%"
    height="152"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    className="rounded-lg"
    title="Spotify Player — За тобой"
  />
</div>
```

Also add the Spotify embed to the homepage LatestRelease component at `src/components/home/LatestRelease.tsx`. After the streaming buttons div, add a compact Spotify embed:
```tsx
<div className="mt-6">
  <iframe
    src="https://open.spotify.com/embed/artist/6PPuuN3cvmbyuvgrGbhXge?utm_source=generator&theme=0"
    width="100%"
    height="152"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    className="rounded-lg"
    title="Spotify Player"
  />
</div>
```

Finally, update `next.config.mjs` to allow the Spotify embed domain in the Content Security Policy (for future CSP implementation). Add to the `images.remotePatterns` array:
```javascript
{ protocol: 'https', hostname: 'open.spotify.com' },
```

You can remove the `spotify_placeholder` translation key from all three message files (en.json, ru.json, el.json) since we no longer need it.
```

### Prompt 1.5 — Create Missing Album Artwork Placeholder System

```
All 13 album/single covers referenced in `src/lib/data/discography.ts` point to files in `/public/images/albums/` that don't exist. The images directory `/public/images/` only has `artist/`, `gallery/`, and `hero/` subdirectories.

Since we don't have the actual album artwork files, create a dynamic artwork generation system:

1. Create directory `public/images/albums/`

2. Create a new component `src/components/AlbumCover.tsx`:

```tsx
'use client';

import Image from 'next/image';
import { Music } from 'lucide-react';
import { useState } from 'react';

interface AlbumCoverProps {
  src?: string;
  title: string;
  year?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AlbumCover({ src, title, year, size = 'md', className = '' }: AlbumCoverProps) {
  const [error, setError] = useState(false);

  const iconSize = size === 'sm' ? 24 : size === 'md' ? 40 : 64;

  if (!src || error) {
    return (
      <div className={`aspect-square bg-gradient-to-br from-bg-tertiary to-bg-secondary rounded-sm border border-gold/20 flex flex-col items-center justify-center gap-2 ${className}`}>
        <Music size={iconSize} className="text-gold/30" />
        <p className="text-gold/40 text-xs font-display uppercase tracking-wider text-center px-2 truncate max-w-full">
          {title}
        </p>
        {year && (
          <p className="text-gold/20 text-[10px] font-sans">{year}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`aspect-square relative rounded-sm border border-gold/20 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={`${title} — album cover`}
        fill
        className="object-cover"
        sizes={size === 'sm' ? '192px' : size === 'md' ? '320px' : '480px'}
        onError={() => setError(true)}
      />
    </div>
  );
}
```

3. Update `src/components/home/LatestRelease.tsx` — replace the placeholder artwork div with AlbumCover:

Replace the artwork section (the div with `<Music size={64}>` icon) with:
```tsx
import AlbumCover from '@/components/AlbumCover';

// In the Featured Release section, replace:
<div className="w-full md:w-[40%] aspect-square relative rounded-sm border border-gold/20 overflow-hidden bg-bg-secondary shadow-[0_0_60px_rgba(200,169,110,0.05)]">
  <div className="absolute inset-0 flex items-center justify-center">
    <Music size={64} className="text-gold/20" />
  </div>
</div>

// With:
<AlbumCover src={latest.coverImage} title={latest.title} year={latest.year} size="lg" className="w-full md:w-[40%] shadow-[0_0_60px_rgba(200,169,110,0.05)]" />
```

And in the recent singles row, replace each placeholder with:
```tsx
<AlbumCover src={single.coverImage} title={single.title} year={single.year} size="sm" />
```

4. Do the same in `src/app/[locale]/music/page.tsx`:
- Latest Release artwork → use `<AlbumCover>`
- Album artwork → use `<AlbumCover>`  
- Singles grid artwork → use `<AlbumCover>`

Remove all direct `<Music size={...} />` icon placeholders from these files and use `<AlbumCover>` instead.

This way, when actual artwork files are added to `/public/images/albums/`, they'll automatically appear. Until then, the styled placeholder is much better than a raw icon.
```

### Prompt 1.6 — Create Open Graph Default Image

```
The SEO utility at `src/lib/seo.ts` references `${BASE_URL}/images/og-default.jpg` as the default Open Graph image, but this file likely doesn't exist.

1. Create a simple OG image generation script. Create `scripts/generate-og.js`:

```javascript
// This generates a simple 1200x630 SVG that can be converted to JPG
// For now, create a placeholder file
const fs = require('fs');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0A0A0A"/>
  <rect x="0" y="0" width="1200" height="4" fill="#C8A96E"/>
  <rect x="0" y="626" width="1200" height="4" fill="#C8A96E"/>
  <text x="600" y="250" font-family="serif" font-size="28" fill="#C8A96E" text-anchor="middle" letter-spacing="12">ALEXANDROS</text>
  <text x="600" y="320" font-family="serif" font-size="64" fill="#F5F0E8" text-anchor="middle" font-weight="bold" letter-spacing="8">TSOPOZIDIS</text>
  <text x="600" y="380" font-family="serif" font-size="18" fill="#A09080" text-anchor="middle" font-style="italic" letter-spacing="6">greek soul · eastern sound</text>
  <text x="600" y="540" font-family="sans-serif" font-size="14" fill="#605040" text-anchor="middle">tsopozidis-alexandros.com</text>
</svg>`;

fs.writeFileSync('public/images/og-default.svg', svg);
console.log('OG image SVG created at public/images/og-default.svg');
console.log('IMPORTANT: Convert to JPG 1200x630 and save as public/images/og-default.jpg');
console.log('You can use: npx sharp-cli -i public/images/og-default.svg -o public/images/og-default.jpg --resize 1200 630');
```

2. Better approach — use Next.js OG Image Generation. Create `src/app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Alexandros Tsopozidis — Official Website';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          fontFamily: 'serif',
        }}
      >
        <div style={{ width: '100%', height: '4px', backgroundColor: '#C8A96E', position: 'absolute', top: 0 }} />
        <div style={{ color: '#C8A96E', fontSize: '28px', letterSpacing: '12px', marginBottom: '8px' }}>
          ALEXANDROS
        </div>
        <div style={{ color: '#F5F0E8', fontSize: '64px', fontWeight: 'bold', letterSpacing: '8px' }}>
          TSOPOZIDIS
        </div>
        <div style={{ color: '#A09080', fontSize: '18px', fontStyle: 'italic', letterSpacing: '6px', marginTop: '16px' }}>
          greek soul · eastern sound
        </div>
        <div style={{ color: '#605040', fontSize: '14px', position: 'absolute', bottom: '40px' }}>
          tsopozidis-alexandros.com
        </div>
        <div style={{ width: '100%', height: '4px', backgroundColor: '#C8A96E', position: 'absolute', bottom: 0 }} />
      </div>
    ),
    { ...size }
  );
}
```

3. Also create locale-specific OG images. Create `src/app/[locale]/opengraph-image.tsx` with the same content but using locale-aware text (e.g., Russian name for /ru/).

4. Update `src/lib/seo.ts` — the static fallback `og-default.jpg` reference is fine as a safety net. The dynamic OG image generation will take priority when Next.js resolves the route.
```

---

## PHASE 2: SEO & STRUCTURED DATA

### Prompt 2.1 — Fix Sitemap lastModified Timestamps

```
In `src/app/sitemap.ts`, the `lastModified` field is set to `new Date().toISOString()` which generates the CURRENT timestamp on every request. This makes Google think every page is constantly changing, which can be interpreted as spam.

Fix by using static dates per page:

```typescript
import { MetadataRoute } from 'next';

const BASE_URL = 'https://tsopozidis-alexandros.com';
const locales = ['en', 'ru', 'el'];

const pages = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0, lastModified: '2026-03-14' },
  { path: 'about', changeFrequency: 'monthly' as const, priority: 0.6, lastModified: '2026-03-01' },
  { path: 'music', changeFrequency: 'weekly' as const, priority: 0.8, lastModified: '2026-03-14' },
  { path: 'videos', changeFrequency: 'monthly' as const, priority: 0.8, lastModified: '2026-02-15' },
  { path: 'gallery', changeFrequency: 'monthly' as const, priority: 0.6, lastModified: '2026-02-01' },
  { path: 'events', changeFrequency: 'weekly' as const, priority: 0.8, lastModified: '2026-03-14' },
  { path: 'contact', changeFrequency: 'monthly' as const, priority: 0.5, lastModified: '2026-01-15' },
  { path: 'press', changeFrequency: 'monthly' as const, priority: 0.5, lastModified: '2026-01-15' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      const url = page.path
        ? `${BASE_URL}/${locale}/${page.path}`
        : `${BASE_URL}/${locale}`;

      entries.push({
        url,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return entries;
}
```

Update the dates whenever content on that page actually changes.
```

### Prompt 2.2 — Add JSON-LD Schemas to All Inner Pages

```
Currently only the homepage (WebSite schema) and about page (MusicArtist schema) have JSON-LD structured data. Add appropriate schemas to all remaining pages.

1. **Events page** — `src/app/[locale]/events/page.tsx`

The events page is a client component ('use client'), so we can't add JSON-LD directly in the server component way. Instead, add it via the JsonLd component inside the rendered JSX. Import the events data and generate Event schema:

Add at the top of the EventsPage component's return:
```tsx
import JsonLd from '@/components/JsonLd';
import { events } from '@/lib/data/events';

// Inside the component, before the first JSX:
const upcomingEvents = events.filter(e => e.isUpcoming && !e.comingSoon);
const eventSchemas = upcomingEvents.map(event => ({
  '@type': 'MusicEvent',
  name: event.title,
  startDate: event.date,
  location: {
    '@type': 'Place',
    name: event.venue,
    address: {
      '@type': 'PostalAddress',
      addressLocality: event.city,
      addressCountry: event.country,
    },
  },
  performer: {
    '@type': 'MusicArtist',
    name: 'Alexandros Tsopozidis',
  },
}));

// Add to the JSX return, before PageHero:
<JsonLd data={{ '@context': 'https://schema.org', '@graph': eventSchemas }} />
```

2. **Music page** — already has MusicRecording schema. Good.

3. **Videos page** — `src/app/[locale]/videos/page.tsx`

Add VideoObject schema:
```tsx
const videoSchemas = videos.map(v => ({
  '@type': 'VideoObject',
  name: v.title,
  description: `${v.title} — Alexandros Tsopozidis music video`,
  thumbnailUrl: `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`,
  embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
  uploadDate: `${v.year}-01-01`,
  ...(v.views && { interactionStatistic: { '@type': 'InteractionCounter', interactionType: 'http://schema.org/WatchAction', userInteractionCount: v.views.replace(/[^0-9]/g, '') } }),
}));
```

4. **Contact page** — `src/app/[locale]/contact/page.tsx`

Add ContactPoint schema:
```tsx
const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'MusicArtist',
  name: 'Alexandros Tsopozidis',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+7-938-316-30-34',
    contactType: 'booking',
    areaServed: 'Worldwide',
    availableLanguage: ['Russian', 'Greek', 'English'],
  },
};
```

5. **Add BreadcrumbList schema** to ALL inner pages. Create a reusable helper in `src/lib/seo.ts`:

```typescript
export function generateBreadcrumbSchema(locale: string, pageName: string, pagePath: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://tsopozidis-alexandros.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: pageName, item: `https://tsopozidis-alexandros.com/${locale}/${pagePath}` },
    ],
  };
}
```

Add this to every inner page's JSX using the JsonLd component.
```

### Prompt 2.3 — Add generateMetadata to Client-Component Pages

```
The Events, Gallery, and Videos pages are client components ('use client') which means they can't export `generateMetadata` directly. This results in missing SEO metadata for these pages.

Fix by extracting metadata into layout files:

1. **Events** — `src/app/[locale]/events/layout.tsx` already exists. Update it:

```tsx
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';

const eventDescriptions: Record<string, string> = {
  en: 'Upcoming concerts and past performances by Alexandros Tsopozidis. Book for festivals, corporate events, and private shows.',
  ru: 'Концерты и выступления Александроса Цопозидиса. Заказать на фестивали, корпоративы и частные мероприятия.',
  el: 'Επερχόμενες συναυλίες και εμφανίσεις του Αλέξανδρου Τσοποζίδη. Κρατήσεις για φεστιβάλ και ιδιωτικές εκδηλώσεις.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'events' });
  return generatePageMetadata({
    locale,
    path: 'events',
    title: `${t('title')} — Alexandros Tsopozidis`,
    description: eventDescriptions[locale] || eventDescriptions.en,
  });
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

2. **Videos** — `src/app/[locale]/videos/layout.tsx` already exists. Update it similarly:

```tsx
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';

const videoDescriptions: Record<string, string> = {
  en: 'Watch music videos by Alexandros Tsopozidis — Бродяга (22M+ views), Male Male, Kaciyorum and more.',
  ru: 'Смотрите клипы Александроса Цопозидиса — Бродяга (22М+ просмотров), Male Male, Kaciyorum и другие.',
  el: 'Δείτε μουσικά βίντεο του Αλέξανδρου Τσοποζίδη — Бродяга (22M+ views), Male Male, Kaciyorum.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'videos' });
  return generatePageMetadata({
    locale,
    path: 'videos',
    title: `${t('title')} — Alexandros Tsopozidis`,
    description: videoDescriptions[locale] || videoDescriptions.en,
  });
}

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

3. **Gallery** — `src/app/[locale]/gallery/layout.tsx` already exists. Same pattern:

```tsx
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';

const galleryDescriptions: Record<string, string> = {
  en: 'Photo gallery of Alexandros Tsopozidis — live performances, portraits, backstage moments and music video shoots.',
  ru: 'Фотогалерея Александроса Цопозидиса — концерты, портреты, бэкстейдж и съёмки клипов.',
  el: 'Φωτογραφίες του Αλέξανδρου Τσοποζίδη — ζωντανές εμφανίσεις, πορτρέτα και παρασκήνια.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gallery' });
  return generatePageMetadata({
    locale,
    path: 'gallery',
    title: `${t('title')} — Alexandros Tsopozidis`,
    description: galleryDescriptions[locale] || galleryDescriptions.en,
  });
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Run `npm run build` to verify all layouts export metadata correctly.
```

### Prompt 2.4 — Localize Page Titles

```
Currently all page titles are English-only (e.g., "Music — Alexandros Tsopozidis") regardless of locale. Fix by using translated titles.

In every page that exports `generateMetadata`, change the title construction to use the translated page name while keeping the artist name consistent.

Example for music page (`src/app/[locale]/music/page.tsx`):
```tsx
// CURRENT:
title: `${t('title')} — Alexandros Tsopozidis`,

// This already uses translations, which is correct. BUT the artist name should also be localized.
// Update to:
const artistNames: Record<string, string> = {
  en: 'Alexandros Tsopozidis',
  ru: 'Александрос Цопозидис',
  el: 'Αλέξανδρος Τσοποζίδης',
};
// Then:
title: `${t('title')} — ${artistNames[locale] || artistNames.en}`,
```

Create a shared constant in `src/lib/seo.ts`:
```typescript
export const ARTIST_NAME: Record<string, string> = {
  en: 'Alexandros Tsopozidis',
  ru: 'Александрос Цопозидис',
  el: 'Αλέξανδρος Τσοποζίδης',
};

export function getArtistName(locale: string): string {
  return ARTIST_NAME[locale] || ARTIST_NAME.en;
}
```

Then update ALL generateMetadata functions across all pages and layouts to use `getArtistName(locale)` instead of the hardcoded English name.

Also update the root locale layout at `src/app/[locale]/layout.tsx`:
```tsx
title: `${getArtistName(locale)} — ${locale === 'ru' ? 'Официальный сайт' : locale === 'el' ? 'Επίσημη ιστοσελίδα' : 'Official Website'}`,
```
```

---

## PHASE 3: PERFORMANCE

### Prompt 3.1 — Migrate Fonts to next/font

```
Currently fonts are loaded via a render-blocking CSS @import in `src/app/globals.css` (line 1):
```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Inter:wght@300;400;500&display=swap');
```

This blocks rendering until all 3 font families download. Migrate to next/font for self-hosting and automatic optimization.

1. Remove the @import line from `src/app/globals.css` (delete line 1 entirely).

2. Update `src/app/[locale]/layout.tsx`:

```tsx
import { Cinzel, Cormorant_Garamond, Inter } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'greek'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});
```

3. Apply the CSS variables to the `<body>` tag:
```tsx
<body className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} min-h-screen bg-bg-primary text-text-primary font-sans antialiased`}>
```

4. Update `src/app/globals.css` body rule — remove the `font-family: 'Inter', sans-serif;` line since it's now handled by the Tailwind `font-sans` class which maps to `var(--font-inter)`.

5. Verify `tailwind.config.ts` already references these CSS variables:
```typescript
fontFamily: {
  display: ['var(--font-cinzel)', '"Cinzel"', "serif"],
  serif: ['var(--font-cormorant)', '"Cormorant Garamond"', "serif"],
  sans: ['var(--font-inter)', '"Inter"', "sans-serif"],
},
```
This should already be correct. The CSS variables are now actually created by next/font (previously they were referenced but never defined).

6. Also update the Links page layout at `src/app/links/layout.tsx` to include the font variables, since it has its own separate layout.

Run `npm run build` and verify fonts load correctly without the Google Fonts @import.
```

### Prompt 3.2 — Remove Noise Texture Overlay on Mobile

```
In `src/app/[locale]/layout.tsx`, there's a fixed full-screen div that renders a fractal noise SVG texture at 1.5% opacity:

```tsx
<div
  className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]"
  style={{
    backgroundImage: `url("data:image/svg+xml,...")`,
  }}
/>
```

This forces GPU compositing on every scroll frame on mobile devices for a barely-visible decorative effect. Fix:

1. Make it desktop-only by adding a responsive class:
```tsx
<div
  className="hidden md:block fixed inset-0 pointer-events-none z-[1] opacity-[0.015]"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  }}
/>
```

The `hidden md:block` ensures it only renders on screens >= 768px.
```

---

## PHASE 4: i18n FIXES

### Prompt 4.1 — Fix Gallery Localized Alt Text

```
In `src/lib/data/gallery.ts`, every photo has `altRu` and `altEl` fields with translated alt text, but the gallery page at `src/app/[locale]/gallery/page.tsx` always uses the English `alt` field.

Fix by using the locale-aware alt text:

1. Add a utility function to `src/lib/data/gallery.ts`:
```typescript
export function getPhotoAlt(photo: Photo, locale: string): string {
  if (locale === 'ru' && photo.altRu) return photo.altRu;
  if (locale === 'el' && photo.altEl) return photo.altEl;
  return photo.alt;
}
```

2. In `src/app/[locale]/gallery/page.tsx`, import `useLocale` from 'next-intl' and the new helper:
```tsx
import { useLocale } from 'next-intl';
import { photos, INSTAGRAM_URL, INSTAGRAM_HANDLE, getPhotoAlt } from '@/lib/data/gallery';
```

3. Inside the component, get the locale:
```tsx
const locale = useLocale();
```

4. Replace ALL instances of `photo.alt` with `getPhotoAlt(photo, locale)`:
- In the Image component's `alt` prop
- In the error fallback text
- In the lightbox alt text
- In the lightbox counter text

Search and replace throughout the file: `photo.alt` → `getPhotoAlt(photo, locale)` and `filtered[lightbox].alt` → `getPhotoAlt(filtered[lightbox], locale)`.
```

### Prompt 4.2 — Fix Date Formatting Per Locale

```
Several pages use hardcoded English date formatting: `date.toLocaleString('en', ...)`. Fix to use the current locale.

1. In `src/app/[locale]/events/page.tsx`, find all instances of:
```tsx
date.toLocaleString('en', { month: 'short' })
date.toLocaleString('en', { month: 'short', day: 'numeric' })
date.toLocaleString('en', { month: 'short', year: 'numeric' })
```

Add `useLocale` import and get the locale:
```tsx
import { useLocale } from 'next-intl';
// inside component:
const locale = useLocale();
```

Replace the hardcoded 'en' with the locale variable. Map locale codes to proper BCP 47:
```tsx
const dateLocale = locale === 'ru' ? 'ru-RU' : locale === 'el' ? 'el-GR' : 'en-US';
```

Then use `date.toLocaleString(dateLocale, { month: 'short' })` etc.

2. Do the same in `src/components/home/UpcomingShows.tsx`:
```tsx
import { useLocale } from 'next-intl';
// inside component:
const locale = useLocale();
const dateLocale = locale === 'ru' ? 'ru-RU' : locale === 'el' ? 'el-GR' : 'en-US';
```

Replace `date.toLocaleString('en', { month: 'short' })` with `date.toLocaleString(dateLocale, { month: 'short' })`.
```

### Prompt 4.3 — Fix Hardcoded Text in Components

```
Several components have hardcoded English or Russian text that bypasses the i18n system:

1. **ComingSoon component** (`src/components/home/ComingSoon.tsx`):
- Line: `<p className="font-serif italic text-text-secondary text-lg mt-2">Eternal Love</p>`
- This should be a translation key. Add to all three message files:
  - en.json: `"coming_soon": { ..., "translation": "Eternal Love" }`
  - ru.json: `"coming_soon": { ..., "translation": "Вечная любовь" }`  
  - el.json: `"coming_soon": { ..., "translation": "Αιώνια αγάπη" }`
- Replace the hardcoded text with `{t('translation')}`

2. **HeroSection** (`src/components/home/HeroSection.tsx`):
- The WhatsApp CTA link has a hardcoded English message. Use the `getWhatsAppUrl` function from `src/lib/utm.ts` which already has locale support:
```tsx
import { getWhatsAppUrl } from '@/lib/utm';
import { useLocale } from 'next-intl';
// inside component:
const locale = useLocale();
// Replace the hardcoded wa.me URL with:
href={getWhatsAppUrl(locale)}
```

3. **Events page** — "Featured" badge:
- Replace hardcoded `Featured` text with translation key
- Add to message files: `"events": { ..., "featured": "Featured" }` / `"featured": "Хит"` / `"featured": "Κορυφαίο"`

4. **VideoHighlight** (`src/components/home/VideoHighlight.tsx`):
- `{featured.views} views` — "views" is hardcoded English
- Add translation key: `"videos": { ..., "views_label": "views" }` / `"views_label": "просмотров"` / `"views_label": "προβολές"`
```

### Prompt 4.4 — Fix Links Page to Support i18n

```
The `/links` page at `src/app/links/page.tsx` completely bypasses the i18n system. It has its own layout.tsx that doesn't use next-intl. While this is intentional (it's a Linktree-style page meant for social bio links), we should at least:

1. Add locale detection based on browser language. Update `src/app/links/page.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
// ... keep existing imports and data

export default function LinksPage() {
  const [greeting, setGreeting] = useState('Greek Soul · Eastern Sound');

  useEffect(() => {
    const lang = navigator.language?.slice(0, 2);
    if (lang === 'ru') setGreeting('Греческая душа · Восточный звук');
    else if (lang === 'el') setGreeting('Ελληνική ψυχή · Ανατολίτικος ήχος');
  }, []);

  return (
    // ... existing JSX but replace the tagline with {greeting}
  );
}
```

2. Fix the raw `<img>` tag to use Next.js Image:
```tsx
import Image from 'next/image';

// Replace:
<img src="/images/artist/portrait-balcony.jpg" alt="..." className="w-full h-full object-cover" />

// With:
<Image src="/images/artist/portrait-balcony.jpg" alt="Alexandros Tsopozidis" width={96} height={96} className="w-full h-full object-cover" />
```

3. Fix the YouTube URL that has a malformed query string. In the links array:
```tsx
// CURRENT (broken — has ? before existing ?):
{ label: 'Watch Бродяга (22M+ views)', href: 'https://www.youtube.com/watch?v=z9ASjQE6Q2Y?utm_source=...', ... },
// FIX TO:
{ label: 'Watch Бродяга (22M+ views)', href: 'https://www.youtube.com/watch?v=z9ASjQE6Q2Y&utm_source=linkinbio&utm_medium=social', ... },
```
```

---

## PHASE 5: SECURITY

### Prompt 5.1 — Add Security Headers

```
Update `next.config.mjs` to add missing security headers:

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Robots-Tag', value: 'all' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://mc.yandex.ru https://www.youtube.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https://img.youtube.com https://i.scdn.co https://*.instagram.com https://*.cdninstagram.com",
            "frame-src https://www.youtube.com https://open.spotify.com",
            "connect-src 'self' https://www.google-analytics.com https://mc.yandex.ru https://analytics.google.com",
            "font-src 'self'",
            "media-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
          ].join('; '),
        },
      ],
    },
    {
      source: '/images/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ];
},
```

Note: After migrating to next/font (Phase 3), we no longer need `fonts.googleapis.com` in the CSP since fonts are self-hosted. If fonts are still loading from Google, add `https://fonts.googleapis.com https://fonts.gstatic.com` to the font-src and style-src directives.

Test thoroughly after adding CSP — it's the most likely header to break functionality if misconfigured. Check the browser console for CSP violations.
```

### Prompt 5.2 — Add Spam Protection to Booking Form

```
The booking form at `/api/booking` has no spam protection. Add three layers:

1. **Honeypot field** — Add to `src/components/BookingForm.tsx`:

In the form JSX, add a hidden field (bots will fill it, humans won't):
```tsx
{/* Honeypot — hidden from humans, catches bots */}
<div className="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true">
  <label htmlFor="website">Website</label>
  <input
    {...register('website')}
    id="website"
    type="text"
    tabIndex={-1}
    autoComplete="off"
  />
</div>
```

Add `website?: string` to the FormData interface.

2. **Rate limiting** — Update `src/app/api/booking/route.ts`:

Add a simple in-memory rate limiter at the top of the file:
```typescript
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // max 3 submissions
const RATE_WINDOW = 3600000; // per hour

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
```

In the POST handler, add:
```typescript
const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
if (!checkRateLimit(ip)) {
  return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
}
```

3. **Honeypot check** — In the POST handler:
```typescript
if (data.website) {
  // Bot detected — silently accept to not reveal the honeypot
  return NextResponse.json({ success: true });
}
```

4. **Basic validation** — Add length checks:
```typescript
if (data.name.length > 200 || data.email.length > 200 || (data.message && data.message.length > 5000)) {
  return NextResponse.json({ error: 'Input too long' }, { status: 400 });
}
```
```

---

## PHASE 6: UX IMPROVEMENTS

### Prompt 6.1 — Add Real SVG Social Icons

```
The `SocialIcons` component at `src/components/common/SocialIcons.tsx` uses text abbreviations like "TT", "VK", "OK", "TG" for platforms that don't have Lucide icons. Replace with proper SVG icons.

Replace the entire `SocialIcons.tsx` with:

```tsx
import { Instagram, Facebook, Youtube, Music, type LucideIcon } from 'lucide-react';
import { socialLinks } from '@/lib/data/social-links';

interface SocialIconsProps {
  size?: 'sm' | 'md' | 'lg';
  platforms?: string[];
}

const sizeMap = { sm: 16, md: 20, lg: 24 };

// Custom SVG icons for platforms not in Lucide
function TikTokIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.49a8.27 8.27 0 0 0 4.85 1.56V6.6a4.84 4.84 0 0 1-1.09.09z" />
    </svg>
  );
}

function VKIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.49 2.27 4.675 2.852 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.168-3.624 2.168-3.624.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
    </svg>
  );
}

function OKIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.505 17.44a11.97 11.97 0 0 0 3.055-1.42.75.75 0 0 0-.75-1.3 10.52 10.52 0 0 1-5.31 1.57c-1.86 0-3.67-.53-5.31-1.57a.75.75 0 1 0-.75 1.3c.96.55 1.98.98 3.055 1.42L6.08 20.69a.75.75 0 0 0 1.06 1.06L12 16.89l4.86 4.86a.75.75 0 0 0 1.06-1.06l-3.415-3.45zM12 2.25a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zm0 9a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5z" />
    </svg>
  );
}

function TelegramIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

const iconMap: Record<string, React.FC<{ size: number }>> = {
  instagram: ({ size }) => <Instagram size={size} />,
  facebook: ({ size }) => <Facebook size={size} />,
  youtube: ({ size }) => <Youtube size={size} />,
  spotify: ({ size }) => <Music size={size} />,
  tiktok: TikTokIcon,
  vk: VKIcon,
  ok: OKIcon,
  telegram: TelegramIcon,
};

export default function SocialIcons({ size = 'md', platforms }: SocialIconsProps) {
  const iconSize = sizeMap[size];
  const filtered = platforms
    ? socialLinks.filter((l) => platforms.includes(l.platform))
    : socialLinks.filter((l) => ['tiktok', 'youtube', 'instagram', 'facebook', 'vk', 'ok', 'telegram'].includes(l.platform));

  return (
    <div className="flex items-center gap-4">
      {filtered.map((link) => {
        const IconComponent = iconMap[link.platform];
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-text-secondary hover:text-gold transition-colors duration-300"
          >
            {IconComponent ? (
              <IconComponent size={iconSize} />
            ) : (
              <span className="text-xs uppercase tracking-wider font-sans">{link.label.substring(0, 2).toUpperCase()}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}
```
```

### Prompt 6.2 — Add Cookie Consent Banner

```
The site fires GA4 and Yandex Metrica scripts immediately without user consent, which is a GDPR issue for EU visitors. Create a cookie consent banner.

1. Create `src/components/CookieConsent.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function CookieConsent() {
  const t = useTranslations('cookie_consent');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing to not block initial page experience
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
    // Disable analytics
    window.location.reload(); // Analytics component will check consent
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-bg-secondary border border-border rounded-sm p-5 shadow-lg">
        <p className="text-text-secondary text-sm font-sans leading-relaxed">
          {t('message')}
        </p>
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAccept}
            className="bg-gold text-bg-primary px-6 py-2 text-xs font-display uppercase tracking-wider hover:bg-gold-light transition-all duration-300"
          >
            {t('accept')}
          </button>
          <button
            onClick={handleDecline}
            className="border border-border text-text-secondary px-6 py-2 text-xs font-display uppercase tracking-wider hover:border-gold/30 hover:text-text-primary transition-all duration-300"
          >
            {t('decline')}
          </button>
        </div>
      </div>
    </div>
  );
}
```

2. Update `src/components/Analytics.tsx` to check consent:

```tsx
'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function Analytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    setConsent(localStorage.getItem('cookie-consent') === 'accepted');
  }, []);

  if (!consent) return null;

  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const ymId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;

  return (
    <>
      {ga4Id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`}
          </Script>
        </>
      )}
      {ymId && (
        <Script id="yandex-metrica" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${ymId},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
        </Script>
      )}
    </>
  );
}
```

3. Add the CookieConsent component to `src/app/[locale]/layout.tsx`, inside the `<NextIntlClientProvider>`, after `<TelegramBanner />`:
```tsx
<CookieConsent />
```

4. Add translation keys to all three message files:

**en.json:**
```json
"cookie_consent": {
  "message": "We use cookies for analytics to improve your experience. No personal data is sold or shared with advertisers.",
  "accept": "Accept",
  "decline": "Decline"
}
```

**ru.json:**
```json
"cookie_consent": {
  "message": "Мы используем файлы cookie для аналитики, чтобы улучшить ваш опыт. Персональные данные не продаются и не передаются рекламодателям.",
  "accept": "Принять",
  "decline": "Отклонить"
}
```

**el.json:**
```json
"cookie_consent": {
  "message": "Χρησιμοποιούμε cookies για αναλυτικά στοιχεία προκειμένου να βελτιώσουμε την εμπειρία σας. Δεν πωλούνται ή μοιράζονται προσωπικά δεδομένα.",
  "accept": "Αποδοχή",
  "decline": "Απόρριψη"
}
```
```

### Prompt 6.3 — Fix Footer Missing Gallery Link

```
The Footer component at `src/components/layout/Footer.tsx` has a quickLinks array that doesn't include the Gallery page.

Find the quickLinks array:
```tsx
const quickLinks = [
  { label: tNav('about'), href: '/about' },
  { label: tNav('music'), href: '/music' },
  { label: tNav('videos'), href: '/videos' },
  { label: tNav('events'), href: '/events' },
  { label: tNav('press'), href: '/press' },
  { label: tNav('contact'), href: '/contact' },
];
```

Add gallery between videos and events:
```tsx
const quickLinks = [
  { label: tNav('about'), href: '/about' },
  { label: tNav('music'), href: '/music' },
  { label: tNav('videos'), href: '/videos' },
  { label: tNav('gallery'), href: '/gallery' },
  { label: tNav('events'), href: '/events' },
  { label: tNav('press'), href: '/press' },
  { label: tNav('contact'), href: '/contact' },
];
```
```

### Prompt 6.4 — Add Gallery Lightbox Image Optimization

```
The gallery lightbox at `src/app/[locale]/gallery/page.tsx` uses a raw `<img>` tag instead of Next.js Image:

```tsx
<img
  src={filtered[lightbox].src}
  alt={filtered[lightbox].alt}
  className="max-w-full max-h-[70vh] object-contain rounded-sm"
  onError={() => handleImageError(filtered[lightbox].id)}
/>
```

Replace with Next.js Image for optimization:

```tsx
import Image from 'next/image';

// In the lightbox section, replace the <img> with:
<div className="relative max-w-full max-h-[70vh]" style={{ aspectRatio: `${filtered[lightbox].width}/${filtered[lightbox].height}` }}>
  <Image
    src={filtered[lightbox].src}
    alt={getPhotoAlt(filtered[lightbox], locale)}
    fill
    className="object-contain rounded-sm"
    sizes="(max-width: 768px) 100vw, 896px"
    quality={90}
    priority
    onError={() => handleImageError(filtered[lightbox].id)}
  />
</div>
```

Note: Image component doesn't support onError directly in all Next.js versions. If it causes issues, wrap in a client error boundary or keep the fallback text approach that already exists.
```

---

## PHASE 7: DEV TOOLING & QUALITY

### Prompt 7.1 — Add Bundle Analysis & Strict TypeScript

```
1. Enable TypeScript strict mode. Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    // ... keep all existing options
  }
}
```

After enabling strict mode, run `npm run build` and fix any type errors that surface. Common fixes needed:
- Add null checks where values might be undefined
- Add proper types to event handlers
- Fix any implicit `any` types

2. Add bundle analysis. Install the analyzer:
```bash
npm install -D @next/bundle-analyzer
```

Update `next.config.mjs`:
```javascript
import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Wrap the final export:
export default withAnalyzer(withNextIntl(nextConfig));
```

Add a script to `package.json`:
```json
"analyze": "ANALYZE=true next build"
```

3. Add Prettier config. Create `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

Add script to package.json:
```json
"format": "prettier --write 'src/**/*.{ts,tsx}'"
```
```

### Prompt 7.2 — Add Error Tracking Stub

```
Create a lightweight error tracking setup that can be swapped for Sentry later.

1. Create `src/lib/error-tracking.ts`:

```typescript
export function captureException(error: unknown, context?: Record<string, unknown>) {
  // TODO: Replace with Sentry.captureException when ready
  console.error('[Error Tracking]', error, context);
  
  // If Sentry is configured:
  // if (typeof window !== 'undefined' && window.Sentry) {
  //   window.Sentry.captureException(error, { extra: context });
  // }
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  console.log(`[${level.toUpperCase()}]`, message);
}
```

2. Update the booking API route to use it:
```typescript
import { captureException } from '@/lib/error-tracking';

// In catch block:
catch (error) {
  captureException(error, { formData: { name: data.name, eventType: data.eventType } });
  return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
}
```

3. Update the error.tsx and global-error.tsx to report errors:
```tsx
// In src/app/[locale]/error.tsx:
import { captureException } from '@/lib/error-tracking';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    captureException(error);
  }, [error]);
  // ... rest of component
}
```
```

---

## PHASE 8: FINAL VERIFICATION

### Prompt 8.1 — Full Build Verification

```
Run a complete build verification to ensure all fixes compile:

1. `npm run build` — must complete with zero errors
2. `npm run lint` — must pass
3. Check that all pages render: visit each route in dev mode:
   - /en, /ru, /el (homepages)
   - /en/about, /en/music, /en/videos, /en/gallery, /en/events, /en/contact, /en/press
   - /links
4. Verify the sitemap at /sitemap.xml renders correctly
5. Check browser console for any CSP violations after adding security headers
6. Test the booking form submission (will fail without Resend API key, but should show proper error state)
7. Verify fonts load without FOUT (Flash of Unstyled Text) after next/font migration
8. Check all three languages render correctly with no missing translation keys

Report any issues found during verification.
```

---

## POST-DEPLOYMENT MANUAL TASKS

These cannot be automated via Claude Code — they require browser/dashboard access:

1. **Google Search Console:** Go to https://search.google.com/search-console → Add property → Verify domain `tsopozidis-alexandros.com` via DNS TXT record or HTML file upload → Submit sitemap URL `https://tsopozidis-alexandros.com/sitemap.xml` → Request indexing for all key pages

2. **Yandex Webmaster:** Go to https://webmaster.yandex.com → Add site → Verify → Submit sitemap → Submit for indexing

3. **Resend Setup:** Go to https://resend.com → Create account → Add domain `tsopozidis-alexandros.com` → Get API key → Add `RESEND_API_KEY` to Vercel environment variables

4. **Album Artwork:** Source actual cover art files from the artist/label. Save as JPG at minimum 500x500px to `/public/images/albums/` matching the filenames in `discography.ts` (mia-kardia.jpg, soltera.jpg, par-shirkhani.jpg, kavkaz.jpg, ya-grek.jpg, etc.)

5. **Press Photos:** Obtain hi-res press photos and save to `/public/images/press/` with landscape, portrait, and logo variants. Update the Press page to link to these files for download.

6. **Verify YouTube IDs:** Search YouTube for each single's official music video and update the IDs in `discography.ts` and `videos.ts` for any that are still undefined.

---

## SUMMARY

| Phase | Prompts | Focus |
|-------|---------|-------|
| 1 | 1.1–1.6 | Critical fixes: form, email, data, Spotify, artwork, OG image |
| 2 | 2.1–2.4 | SEO: sitemap, schemas, metadata, localized titles |
| 3 | 3.1–3.2 | Performance: fonts, mobile optimization |
| 4 | 4.1–4.4 | i18n: alt text, dates, hardcoded text, links page |
| 5 | 5.1–5.2 | Security: headers, spam protection |
| 6 | 6.1–6.4 | UX: icons, cookie consent, footer, lightbox |
| 7 | 7.1–7.2 | DevOps: TypeScript strict, bundle analysis, error tracking |
| 8 | 8.1 | Verification: full build test |

**Total: 22 prompts across 8 phases**
**Estimated effort: ~30–40 dev hours via Claude Code**
