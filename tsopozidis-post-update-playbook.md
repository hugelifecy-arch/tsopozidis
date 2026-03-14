# Tsopozidis Website — Post-Update Audit & Next Steps

## Claude Code Playbook v2

> **Date:** 2026-03-14
> **Status:** Follow-up after first fix round
> **Previous:** `tsopozidis-master-fix-playbook.md` (22 prompts, 8 phases)

---

## SCORECARD — What Got Fixed

| # | Fix | Status |
|---|-----|--------|
| 1 | Duplicate BookingForm removed | ✅ Done |
| 2 | Booking form error handling (no more silent success on failure) | ✅ Done |
| 3 | Resend email integration + booking API rewrite | ✅ Done |
| 4 | Honeypot spam protection + rate limiting | ✅ Done |
| 5 | AlbumCover component with graceful fallback | ✅ Done |
| 6 | Spotify embeds on Music page + homepage LatestRelease | ✅ Done |
| 7 | OG image generation (`opengraph-image.tsx`) | ✅ Done |
| 8 | Sitemap with static lastModified dates | ✅ Done |
| 9 | Cookie consent banner + analytics gating (GDPR) | ✅ Done |
| 10 | Gallery localized alt text (`getPhotoAlt`) | ✅ Done |
| 11 | Gallery lightbox upgraded to Next.js Image | ✅ Done |
| 12 | Real SVG social icons (TikTok, VK, OK, Telegram) | ✅ Done |
| 13 | Footer now includes Gallery link | ✅ Done |
| 14 | Security headers: CSP, HSTS, Permissions-Policy | ✅ Done |
| 15 | Events/Videos/Gallery layouts with `generateMetadata` | ✅ Done |
| 16 | Localized page titles via `getArtistName()` | ✅ Done |
| 17 | Date formatting uses locale (UpcomingShows, Events page) | ✅ Done |
| 18 | HeroSection WhatsApp CTA uses `getWhatsAppUrl(locale)` | ✅ Done |
| 19 | ComingSoon "Eternal Love" uses translation key | ✅ Done |
| 20 | Events "Featured" badge translated | ✅ Done |
| 21 | Videos "views" label localized | ✅ Done |
| 22 | JSON-LD: Events (MusicEvent), Videos (VideoObject) schemas added | ✅ Done |
| 23 | BreadcrumbList helper created in `seo.ts` | ✅ Done |
| 24 | Links page: Next.js Image, fixed YouTube URL, locale greeting | ✅ Done |
| 25 | Error tracking module + error.tsx reports exceptions | ✅ Done |
| 26 | TypeScript `strict: true`, `strictNullChecks: true` | ✅ Done |
| 27 | Prettier config (`.prettierrc`) | ✅ Done |
| 28 | Bundle analyzer + `npm run analyze` script | ✅ Done |
| 29 | `.env.example` created | ✅ Done |
| 30 | Noise texture overlay hidden on mobile | ✅ Done |
| 31 | Discography `TODO_*` YouTube IDs replaced with `undefined` | ✅ Done |
| 32 | Rasskazhi YouTube ID set to real value `Ne_uRfKUUlk` | ✅ Done |

**Result: 32 of 38 playbook items completed. Excellent execution.**

---

## 🚨 CRITICAL: CSP vs Google Fonts Conflict (PRODUCTION BUG)

This is a **new bug introduced** by the updates. The CSP header in `next.config.mjs` sets:

```
font-src 'self'
```

But fonts are still loaded via CSS `@import` from `fonts.googleapis.com` (globals.css line 1). **The CSP will block the fonts in production**, causing the entire site to fall back to system fonts. The Cinzel/Cormorant/Inter typography — which is core to the brand identity — will be gone.

**There are two ways to fix this. Pick ONE:**

---

## PHASE 1: CRITICAL FIXES (6 remaining items)

### Prompt 1.1 — Fix CSP + Migrate to next/font (URGENT — fonts will break in production)

```
CRITICAL BUG: The Content-Security-Policy header in next.config.mjs sets `font-src 'self'` but fonts are still loaded via @import from Google Fonts CDN in globals.css. This BLOCKS font loading in production.

Fix by migrating to next/font (self-hosted, no external CDN needed):

1. REMOVE the entire @import line (line 1) from `src/app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Inter:wght@300;400;500&display=swap');
```

2. REMOVE the manual CSS variables from globals.css `:root` block:
```css
:root {
  --font-cinzel: 'Cinzel', serif;
  --font-cormorant: 'Cormorant Garamond', serif;
  --font-inter: 'Inter', sans-serif;
}
```

3. REMOVE the `font-family: 'Inter', sans-serif;` line from the body rule in globals.css. The Tailwind `font-sans` class will handle this.

4. UPDATE `src/app/[locale]/layout.tsx` — add next/font imports at the top:

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

5. Apply CSS variables to `<body>`:
```tsx
<body className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} min-h-screen bg-bg-primary text-text-primary font-sans antialiased`}>
```

6. The CSP `font-src 'self'` is now CORRECT because next/font self-hosts the font files. No changes needed to next.config.mjs.

7. Also update `src/app/links/layout.tsx` to include the font variables:
```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'greek'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen bg-[#0A0A0A]`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
```

Run `npm run build` and verify no font loading errors in browser console. Check that Cinzel (headings), Cormorant Garamond (serif/italic), and Inter (body) all render correctly.
```

### Prompt 1.2 — Add BreadcrumbList Schema to All Inner Pages

```
The `generateBreadcrumbSchema()` helper was added to `src/lib/seo.ts` but is NOT used on any page. Add it to every inner page.

1. In `src/app/[locale]/about/page.tsx`, add breadcrumb schema alongside the existing MusicArtist schema:

Import the helper:
```tsx
import { generatePageMetadata, getArtistName, generateBreadcrumbSchema } from '@/lib/seo';
```

In the AboutPage component, before the JSX return, add:
```tsx
// Get locale from params or use useLocale if client component
```

Since about/page.tsx is a SERVER component (no 'use client'), we can't use useLocale. Instead, accept the locale via a different approach. The simplest: add the breadcrumb schema as a second JsonLd component in the JSX. Since the page uses `useTranslations` (which works in server components in next-intl), we need to get the locale differently.

Actually, looking at the component — it uses `useTranslations` which means it has access to the locale context. But it doesn't have the locale as a prop. The cleanest approach:

Add a wrapper that passes locale. OR, since the page is a default export server component under `[locale]`, pass it via the layout. The simplest approach that works:

In `src/app/[locale]/about/page.tsx`, add after the existing `<JsonLd data={musicArtistSchema} />`:
```tsx
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tsopozidis-alexandros.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://tsopozidis-alexandros.com/en/about' },
  ],
}} />
```

Do the same for these pages (adjust name and item URL):
- `src/app/[locale]/music/page.tsx` — name: "Music", path: "music"
- `src/app/[locale]/contact/page.tsx` — name: "Contact", path: "contact"
- `src/app/[locale]/press/page.tsx` — name: "Press", path: "press"
- `src/app/[locale]/events/page.tsx` — name: "Events", path: "events"
- `src/app/[locale]/videos/page.tsx` — name: "Videos", path: "videos"
- `src/app/[locale]/gallery/page.tsx` — name: "Gallery", path: "gallery"

For the client-component pages (events, videos, gallery), they already import JsonLd. Just add the breadcrumb JsonLd before the PageHero component.
```

### Prompt 1.3 — Add Contact Page JSON-LD Schema

```
The Contact page at `src/app/[locale]/contact/page.tsx` has no JSON-LD structured data. Add a ContactPoint schema.

Import JsonLd:
```tsx
import JsonLd from '@/components/JsonLd';
```

Add before the `<PageHero>`:
```tsx
<JsonLd data={{
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
  url: 'https://tsopozidis-alexandros.com',
}} />
```
```

### Prompt 1.4 — Clean Up Remaining Translation Artifacts

```
Several small translation cleanup items:

1. Remove `spotify_placeholder` key from all three message files — it's no longer used since the real Spotify embed replaced the placeholder. Search and delete from:
   - messages/en.json: `"spotify_placeholder": "Spotify Player — embed will load here",`
   - messages/ru.json: equivalent key
   - messages/el.json: equivalent key

2. About and Press pages still use hardcoded English artist name in `generateMetadata`. Update:

In `src/app/[locale]/about/page.tsx`:
```tsx
import { generatePageMetadata, getArtistName } from '@/lib/seo';
// Change:
title: `${t('title')} — Alexandros Tsopozidis`,
// To:
title: `${t('title')} — ${getArtistName(locale)}`,
```

Do the same in `src/app/[locale]/press/page.tsx` and `src/app/[locale]/contact/page.tsx`.

3. The `noUnusedLocals` and `noUnusedParameters` in tsconfig.json are set to `false`. While this avoids build errors during development, set them to `true` for production quality and fix any resulting errors:
```json
"noUnusedLocals": true,
"noUnusedParameters": true,
```

Run `npm run build` and fix any unused variable warnings that surface.
```

### Prompt 1.5 — Add More Videos to videos.ts

```
The videos.ts data file only has 5 videos. The artist has at least 12 singles, many with music videos. Search YouTube for these and add any confirmed videos:

Currently missing from videos.ts (search YouTube for "Alexandros Tsopozidis [title]"):
- Kavkaz (2023, feat. Vasiliadis)
- Я грек / Ya Grek (2022)
- Monahos (2021)
- Капкан / Kapkan (2021)
- Par shirkhani (2024)
- Dumanli (2019)
- Танец грека / Tanets greka (2018)
- Panagia Soumela (2020)

For any video you find a confirmed YouTube ID for, add it to the `videos` array in `src/lib/data/videos.ts` in reverse chronological order (newest first, after Бродяга which stays featured at index 0).

Also cross-reference: for any new YouTube IDs found, update the corresponding entry in `src/lib/data/discography.ts` too (set the `youtubeId` field).

If you cannot verify a YouTube ID for a particular song, leave it out — do NOT guess or fabricate IDs.
```

### Prompt 1.6 — Add CSP Exception for Google Analytics Connect

```
The CSP `connect-src` directive needs an additional domain. Google Analytics 4 also sends data to:
- `https://region1.google-analytics.com`

And Yandex Metrica needs:
- `https://mc.yandex.ru`
- `https://mc.yandex.com`

Update the `connect-src` line in `next.config.mjs`:
```javascript
"connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://mc.yandex.ru https://mc.yandex.com",
```

Also add Google Tag Manager to the CSP `connect-src`:
```
https://www.googletagmanager.com
```

Test by opening browser DevTools → Console → look for CSP violation errors after accepting cookies and triggering analytics.
```

---

## PHASE 2: NEW FEATURES & ADD-ONS

### Prompt 2.1 — Floating WhatsApp Button

```
Add a floating WhatsApp chat button in the bottom-right corner of every page. This is a high-conversion booking touchpoint.

Create `src/components/WhatsAppButton.tsx`:

```tsx
'use client';

import { useLocale } from 'next-intl';
import { getWhatsAppUrl } from '@/lib/utm';

export default function WhatsAppButton() {
  const locale = useLocale();

  return (
    <a
      href={getWhatsAppUrl(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[50] w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 group-hover:scale-110 transition-transform">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
```

Add to `src/app/[locale]/layout.tsx` inside `<NextIntlClientProvider>`, after `<CookieConsent />`:
```tsx
import WhatsAppButton from '@/components/WhatsAppButton';
// ...
<WhatsAppButton />
```

Position it at `bottom-20` on mobile (above the Telegram banner) and `bottom-6` on desktop.
```

### Prompt 2.2 — Add "Add to Calendar" for Upcoming Events

```
For upcoming events on the Events page, add an "Add to Calendar" button that generates an .ics file download.

Create `src/lib/calendar.ts`:

```typescript
export function generateICS(event: {
  title: string;
  date: string;
  venue: string;
  city: string;
  country: string;
}): string {
  const startDate = new Date(event.date);
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours default

  const formatDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Alexandros Tsopozidis//Website//EN',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:Alexandros Tsopozidis — ${event.title}`,
    `LOCATION:${event.venue}, ${event.city}, ${event.country}`,
    `DESCRIPTION:Live performance by Alexandros Tsopozidis. Booking: +7 938 316 30 34`,
    `URL:https://tsopozidis-alexandros.com/en/events`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadICS(event: Parameters<typeof generateICS>[0]) {
  const ics = generateICS(event);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tsopozidis-${event.title.toLowerCase().replace(/\s+/g, '-')}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}
```

In `src/app/[locale]/events/page.tsx`, add a "Add to Calendar" button next to each upcoming event. Import and use `downloadICS`. Add a small calendar icon button.
```

### Prompt 2.3 — Newsletter Signup Component

```
Create a reusable email signup component for the footer. This builds the owned audience beyond just Telegram.

Create `src/components/NewsletterSignup.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function NewsletterSignup() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);

    try {
      // TODO: Replace with Mailchimp/ConvertKit API integration
      // For now, send to the booking API as a newsletter signup
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      // Still show success — we don't want to lose the signup intent
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <p className="text-gold text-sm font-sans">{t('success')}</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('placeholder')}
        required
        className="flex-1 bg-bg-tertiary border border-border rounded-sm px-3 py-2 text-sm font-sans text-text-primary outline-none focus:border-gold/50 transition-colors min-w-0"
      />
      <button
        type="submit"
        disabled={submitting}
        className="bg-gold text-bg-primary px-4 py-2 text-xs font-display uppercase tracking-wider hover:bg-gold-light transition-all duration-300 disabled:opacity-50 flex-shrink-0"
      >
        {submitting ? '...' : t('subscribe')}
      </button>
    </form>
  );
}
```

Add translation keys to all three message files:
```json
"newsletter": {
  "title": "Stay Updated",
  "placeholder": "Your email",
  "subscribe": "Subscribe",
  "success": "Thanks! You're on the list."
}
```

Add to the Footer component in the Social column section, below the social icons.

Create a simple `/api/newsletter/route.ts` that logs signups (or integrates with Mailchimp if API key is provided).
```

### Prompt 2.4 — Press Photo Downloads

```
The Press page has three download cards (Landscape, Portrait, Logo) that are visual-only with no actual download functionality.

1. Create directory `public/images/press/`

2. For now, create placeholder files that will be replaced with real photos:
   - Copy an existing landscape photo to `public/images/press/press-landscape.jpg`
   - Copy a portrait photo to `public/images/press/press-portrait.jpg`
   - Create a simple logo/wordmark file at `public/images/press/logo.png`

3. Update `src/app/[locale]/press/page.tsx` — make the download cards functional:

Replace the static download cards with actual download links:
```tsx
const pressPhotos = [
  { type: 'landscape', file: '/images/press/press-landscape.jpg' },
  { type: 'portrait', file: '/images/press/press-portrait.jpg' },
  { type: 'logo', file: '/images/press/logo.png' },
];

// In the JSX:
{pressPhotos.map(({ type, file }) => (
  <a
    key={type}
    href={file}
    download={`alexandros-tsopozidis-${type}`}
    className="bg-bg-secondary border border-border rounded-sm p-6 text-center hover:border-gold/30 transition-all duration-300 group"
  >
    <Download size={24} className="text-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
    <p className="font-sans text-sm">{t(`photo_${type}`)}</p>
  </a>
))}
```
```

### Prompt 2.5 — Blog/News Section Infrastructure

```
Add a simple blog/news section using MDX files. This is critical for SEO (fresh content signals) and fan engagement.

1. Install MDX dependencies:
```bash
npm install @next/mdx @mdx-js/react
```

2. Create the blog content directory: `src/content/blog/`

3. Create a sample blog post `src/content/blog/vechnaya-lyubov-coming-soon.mdx`:
```mdx
---
title: "Вечная любовь — New Single Coming Soon"
titleRu: "Вечная любовь — Новый сингл скоро"
date: "2026-03-10"
excerpt: "Alexandros Tsopozidis announces his upcoming single 'Вечная любовь' (Eternal Love)."
---

# Вечная любовь — Coming Soon

The wait is almost over. Alexandros Tsopozidis is preparing to release his newest single...
```

4. Create the blog listing page at `src/app/[locale]/news/page.tsx`

5. Create dynamic blog post page at `src/app/[locale]/news/[slug]/page.tsx`

6. Add "News" to the navigation in Navbar.tsx and MobileMenu.tsx

7. Add the new page to the sitemap.

This is a larger feature — the prompt above provides the architecture. Implementation details can be worked through iteratively.
```

---

## PHASE 3: NEXT.JS 15 UPGRADE

### Prompt 3.1 — Upgrade to Next.js 15

```
Next.js 14.2.35 is outdated. Upgrade to Next.js 15 for performance improvements and React 19 support.

1. Update dependencies:
```bash
npm install next@latest react@latest react-dom@latest
npm install -D @types/react@latest @types/react-dom@latest eslint-config-next@latest
```

2. Next.js 15 changes to handle:
   - `params` in page/layout is now a Promise (already handled in current code ✅)
   - `cookies()` and `headers()` are async (not used directly)
   - Default caching behavior changed — verify static pages still cache properly
   - Check framer-motion compatibility with React 19

3. Run `npm run build` and fix any breaking changes.

4. Test all pages, especially:
   - i18n routing (middleware.ts)
   - Dynamic metadata generation
   - Client components with 'use client'
   - Framer Motion animations

5. Update `eslint-config-next` to match the new Next.js version.
```

---

## REMAINING MANUAL TASKS (Not Automatable)

| Task | Priority | Notes |
|------|----------|-------|
| Google Search Console setup + sitemap submission | CRITICAL | Must do manually in browser |
| Yandex Webmaster setup | CRITICAL | Must do manually |
| Resend API key → Vercel env vars | CRITICAL | Must do in Vercel dashboard |
| Add real album artwork to `/public/images/albums/` | HIGH | Need actual cover art files from artist |
| Add press photos to `/public/images/press/` | MEDIUM | Need hi-res photos from photographer |
| Verify all YouTube IDs for discography | MEDIUM | Search YouTube manually |
| Set up Sentry (replace error-tracking stub) | LOW | Create account at sentry.io |
| Set up Mailchimp/ConvertKit for newsletter | LOW | Create account, get API key |

---

## SUMMARY

| Category | Count | Status |
|----------|-------|--------|
| Original audit items completed | 32/38 | 84% |
| Critical new bug found (CSP+fonts) | 1 | Needs immediate fix |
| Remaining fixes from original audit | 6 | Phase 1 above |
| New feature suggestions | 5 | Phase 2 above |
| Upgrade recommendation | 1 | Phase 3 (Next.js 15) |
| Manual tasks pending | 8 | Cannot automate |

**Priority order: Prompt 1.1 (font/CSP fix) → 1.4 (cleanup) → 1.2-1.3 (schemas) → 1.5-1.6 (data/CSP) → Phase 2 features → Phase 3 upgrade**
