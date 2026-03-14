# Tsopozidis Music Page — Deep Upgrade Playbook

## Claude Code Prompts — Music-Focused Improvements & Add-ons

> **Date:** 2026-03-14
> **Focus:** `/music` page, `LatestRelease` homepage section, discography data, streaming integration
> **Prerequisite:** Fix the CSP+font bug first (Prompt 0.1 below) — everything else is cosmetic if fonts break in production

---

## CURRENT STATE — Music Page Analysis

**What works well:**
- Clean 4-section layout (Latest Release → Album → Singles Grid → Listen On)
- Spotify artist embed on latest release + album sections
- AlbumCover component with graceful placeholder fallback
- MusicRecording JSON-LD schema for top 5 tracks
- Localized metadata via `getArtistName()`
- 7 streaming platform buttons (Spotify, Apple Music, YouTube, Yandex, Zvuk, Deezer, Amazon)

**What's broken or missing:**
1. **Still no album artwork** — `/public/images/albums/` directory doesn't exist. Every card shows the Music icon placeholder
2. **Both Spotify iframes point to the same artist page** — not specific tracks or albums. The album "За тобой" embed should show that album, the latest release should show that track
3. **Singles grid is completely dead** — cards have zero interactivity. No links, no play buttons, no streaming URLs. Users see a track name and can't do anything with it
4. **Only 1 of 12 singles has a YouTube ID** (Расскажи). The remaining 11 have no video link
5. **No per-track streaming links** — `discography.ts` has `spotifyUrl` only on the album, nothing on singles
6. **No music video section** on the Music page — Videos page has them, but the Music page doesn't cross-reference
7. **No social proof** — the Music page doesn't show follower counts, view counts, or streaming stats (About page does)
8. **"Latest Release" section has hardcoded** title "Mia Kardia" and year "2025" instead of reading from data
9. **Fonts will break in production** — CSP `font-src 'self'` blocks the Google Fonts @import

---

## PHASE 0: CRITICAL (Do First)

### Prompt 0.1 — Fix CSP + Migrate Fonts to next/font

```
CRITICAL PRODUCTION BUG: The Content-Security-Policy in next.config.mjs sets `font-src 'self'` but fonts still load via @import from Google Fonts CDN in globals.css. Fonts WILL be blocked in production.

1. REMOVE the @import line (line 1) from `src/app/globals.css`:
Delete: @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Inter:wght@300;400;500&display=swap');

2. REMOVE the :root CSS variables block from globals.css:
Delete the entire :root { --font-cinzel: ...; --font-cormorant: ...; --font-inter: ...; } block.

3. REMOVE `font-family: 'Inter', sans-serif;` from the body rule in globals.css.

4. In `src/app/[locale]/layout.tsx`, add at the top after imports:

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

5. Update the <body> tag to apply the CSS variables:
<body className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} min-h-screen bg-bg-primary text-text-primary font-sans antialiased`}>

6. Also update `src/app/links/layout.tsx` — import Inter from next/font/google and apply the variable to its body tag.

7. Run `npm run build` and verify all three font families render correctly. The CSP `font-src 'self'` is now correct because next/font self-hosts the files.
```

---

## PHASE 1: DISCOGRAPHY DATA ENRICHMENT

### Prompt 1.1 — Add Per-Track Spotify & YouTube IDs to Discography

```
The discography data in `src/lib/data/discography.ts` is missing streaming links for individual tracks. The Release interface already has `spotifyUrl` and `youtubeId` fields — they're just empty.

1. Add known Spotify track IDs. Update the Release interface to also include a `spotifyTrackId` field:

interface Release {
  id: string;
  title: string;
  titleRu?: string;
  year: number;
  type: "album" | "single";
  featuring?: string;
  spotifyUrl?: string;
  spotifyTrackId?: string;   // NEW: for embed per track
  youtubeId?: string;
  appleMusicUrl?: string;
  coverImage?: string;
  trackCount?: number;
}

2. Set known Spotify track IDs (from the earlier audit data):
- kavkaz: spotifyTrackId: "1F1PGhdEb1MtMLbuGuxCR7"

3. Cross-reference YouTube IDs from `src/lib/data/videos.ts` into discography:
- Already done for rasskazhi (Ne_uRfKUUlk) ✅
- These singles match videos in videos.ts but are MISSING the youtubeId in discography.ts:
  * tanets-greka (2018) — likely "Дай мне номер телефона" video exists at Rxp_-wMKU5k but it's a different track
  * kapkan — search YouTube for "Александрос Цопозидис Капкан"
  * ya-grek — search YouTube for "Александрос Цопозидис Я грек"
  * monahos — search YouTube for "Alexandros Tsopozidis Monahos"
  * dumanli — search YouTube for "Alexandros Tsopozidis Dumanli"

For any YouTube ID you CAN verify, add it. For any you CANNOT verify, leave as undefined.

4. Add per-track Spotify URLs. The format is:
   spotifyUrl: "https://open.spotify.com/track/{TRACK_ID}"
   
For tracks where you don't have the ID, leave the field undefined. The UI will check `if (single.spotifyUrl)` before rendering a play link.

5. Also add the album's Spotify album URL (not just artist URL):
   For the album "За тобой":
   spotifyUrl: "https://open.spotify.com/artist/6PPuuN3cvmbyuvgrGbhXge" (keep as-is for now, update when album ID is confirmed)
```

### Prompt 1.2 — Add Genre Tags and Language to Discography

```
Add genre and language metadata to each release. This enriches the Music page and improves SEO structured data.

1. Update the Release interface in `src/lib/data/discography.ts`:

interface Release {
  // ... existing fields
  language?: string[];        // NEW: e.g., ["ru"], ["el", "ru"], ["el"]
  genre?: string[];           // NEW: e.g., ["pop", "eastern"], ["pontic"]
}

2. Tag each single with language and genre. Based on the track names and artist bio:

- mia-kardia: language: ["el"], genre: ["greek-pop"]
- soltera: language: ["el", "es"], genre: ["greek-pop", "latin"]  // "El Pontios" collab suggests Pontic/Greek
- par-shirkhani: language: ["hy"], genre: ["eastern", "armenian"]  // Armenian title
- kavkaz: language: ["ru"], genre: ["caucasian", "pop"]
- ya-grek: language: ["ru"], genre: ["greek-pop", "ethnic"]
- kortsopon-apsimon: language: ["el"], genre: ["pontic"]  // Pontic Greek title
- monahos: language: ["el"], genre: ["pontic", "folk"]
- kapkan: language: ["ru"], genre: ["pop", "eastern"]
- rasskazhi: language: ["ru"], genre: ["pop"]
- panagia-soumela: language: ["el"], genre: ["pontic", "religious"]
- dumanli: language: ["tr"], genre: ["eastern", "turkish"]
- tanets-greka: language: ["ru"], genre: ["greek-pop", "dance"]

And the album:
- za-toboi: language: ["ru"], genre: ["pop", "eastern"]

3. Create language label mappings for display:

const languageLabels: Record<string, Record<string, string>> = {
  ru: { en: "Russian", ru: "Русский", el: "Ρωσικά" },
  el: { en: "Greek", ru: "Греческий", el: "Ελληνικά" },
  tr: { en: "Turkish", ru: "Турецкий", el: "Τουρκικά" },
  hy: { en: "Armenian", ru: "Армянский", el: "Αρμενικά" },
  es: { en: "Spanish", ru: "Испанский", el: "Ισπανικά" },
};

Export this from discography.ts for use in the UI.
```

---

## PHASE 2: MUSIC PAGE MAJOR UPGRADES

### Prompt 2.1 — Make Singles Grid Cards Interactive with Play Links

```
The singles grid in `src/app/[locale]/music/page.tsx` currently shows non-interactive cards. Transform each card into a rich interactive element.

Replace the singles grid section with:

{singles.map((single, i) => (
  <ScrollReveal key={single.id} delay={i * 0.05}>
    <div className="group bg-bg-secondary rounded-sm border border-border hover:border-gold/30 transition-all duration-300 overflow-hidden">
      {/* Artwork with play overlay */}
      <div className="relative">
        <AlbumCover src={single.coverImage} title={single.title} year={single.year} size="sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 right-3 text-xs bg-bg-primary/80 text-gold px-2 py-1 rounded font-sans">
          {single.year}
        </span>

        {/* Play button overlay — links to Spotify or YouTube */}
        {(single.spotifyTrackId || single.youtubeId) && (
          <a
            href={single.spotifyTrackId 
              ? `https://open.spotify.com/track/${single.spotifyTrackId}` 
              : `https://www.youtube.com/watch?v=${single.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label={`Play ${single.title}`}
          >
            <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center shadow-lg hover:bg-gold transition-colors">
              <svg viewBox="0 0 24 24" fill="#0A0A0A" className="w-6 h-6 ml-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </a>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="font-sans font-medium truncate">{single.title}</p>
        {single.featuring && (
          <p className="text-xs text-text-secondary font-sans mt-1">
            {t('featuring')} {single.featuring}
          </p>
        )}

        {/* Language tags */}
        {single.language && (
          <div className="flex gap-1.5 mt-2">
            {single.language.map(lang => (
              <span key={lang} className="text-[10px] bg-gold/5 text-gold/60 px-1.5 py-0.5 rounded font-sans uppercase">
                {lang}
              </span>
            ))}
          </div>
        )}

        {/* Quick streaming links */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
          {single.spotifyTrackId && (
            <a href={`https://open.spotify.com/track/${single.spotifyTrackId}`} target="_blank" rel="noopener noreferrer"
              className="text-[10px] text-text-tertiary hover:text-gold transition-colors font-sans uppercase tracking-wider">
              Spotify
            </a>
          )}
          {single.youtubeId && (
            <a href={`https://www.youtube.com/watch?v=${single.youtubeId}`} target="_blank" rel="noopener noreferrer"
              className="text-[10px] text-text-tertiary hover:text-gold transition-colors font-sans uppercase tracking-wider">
              YouTube
            </a>
          )}
          {!single.spotifyTrackId && !single.youtubeId && (
            <span className="text-[10px] text-text-tertiary/50 font-sans uppercase tracking-wider">
              {t('coming_soon_label') || 'Coming to streaming'}
            </span>
          )}
        </div>
      </div>
    </div>
  </ScrollReveal>
))}

Add translation key to all three message files:
- en.json: "music": { ..., "coming_soon_label": "Coming to streaming" }
- ru.json: "music": { ..., "coming_soon_label": "Скоро на платформах" }
- el.json: "music": { ..., "coming_soon_label": "Σύντομα σε πλατφόρμες" }
```

### Prompt 2.2 — Fix Spotify Embeds to Show Specific Content

```
Both Spotify iframes on the Music page point to the same artist page URL. Fix them to show relevant content.

1. **Latest Release section** — embed the specific latest track or a curated playlist.
Change from:
  src="https://open.spotify.com/embed/artist/6PPuuN3cvmbyuvgrGbhXge?utm_source=generator&theme=0"

To (using the Spotify track embed format):
  src="https://open.spotify.com/embed/artist/6PPuuN3cvmbyuvgrGbhXge?utm_source=generator&theme=0"
  
NOTE: Until we have the specific Spotify track ID for "Mia Kardia", keep the artist embed but reduce its height. When the track ID is known, use:
  src="https://open.spotify.com/embed/track/{MIA_KARDIA_TRACK_ID}?utm_source=generator&theme=0"

2. **Album section** — this should embed the album, not the artist page again.
The album "За тобой" has tracks on Spotify. Search for the album ID and update:
  src="https://open.spotify.com/embed/album/{ZA_TOBOI_ALBUM_ID}?utm_source=generator&theme=0"

If the album ID cannot be confirmed, use the known Kavkaz track as a fallback for now:
  src="https://open.spotify.com/embed/track/1F1PGhdEb1MtMLbuGuxCR7?utm_source=generator&theme=0"

3. **Homepage LatestRelease component** — same fix. Use the specific track embed when available, or a compact artist embed (height: 152).

4. Remove the hardcoded "Mia Kardia" title and "2025" year badge in the Music page latest release section. Read from data instead:
Change:
  <h3 className="font-display text-4xl mt-4">Mia Kardia</h3>
  <span className="...">2025</span>
To:
  <h3 className="font-display text-4xl mt-4">{singles[0].title}</h3>
  <span className="...">{singles[0].year}</span>
```

### Prompt 2.3 — Add "Featured Music Video" Section to Music Page

```
The Music page has no video content even though the artist has 22M+ YouTube views. Add a featured video section between the Album and Singles Grid sections.

In `src/app/[locale]/music/page.tsx`, after the Album section and before the Singles Grid section, add:

import YouTubeFacade from '@/components/YouTubeFacade';
import { videos } from '@/lib/data/videos';

// Between Album and Singles Grid sections:
{/* Featured Music Video */}
<section className="py-24 px-4 md:px-8">
  <div className="max-w-6xl mx-auto">
    <ScrollReveal>
      <SectionHeading title={t('featured_video')} />
    </ScrollReveal>
    <ScrollReveal delay={0.2}>
      <div className="max-w-3xl mx-auto">
        <div className="rounded-sm overflow-hidden">
          <YouTubeFacade
            videoId={videos[0].youtubeId}
            title={videos[0].title}
            views={videos[0].views}
            quality="maxresdefault"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-display text-lg">{videos[0].title}</p>
            <p className="text-text-secondary text-sm font-sans">
              {videos[0].year}
              {videos[0].featuring && ` · feat. ${videos[0].featuring}`}
              {videos[0].views && ` · ${videos[0].views} ${t('views_label')}`}
            </p>
          </div>
          <a href="/videos" className="text-gold text-sm font-sans hover:text-gold-light transition-colors">
            {t('all_videos')} →
          </a>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>

Add to all three message files:
- "music": { ..., "featured_video": "Featured Video", "views_label": "views", "all_videos": "All Videos" }
- Russian: "featured_video": "Видеоклип", "views_label": "просмотров", "all_videos": "Все видео"
- Greek: "featured_video": "Βίντεο", "views_label": "προβολές", "all_videos": "Όλα τα βίντεο"
```

### Prompt 2.4 — Add Social Proof / Stats Bar to Music Page

```
The Music page has no social proof. Add a stats bar below the page hero that shows key numbers.

In `src/app/[locale]/music/page.tsx`, right after <PageHero>, add:

{/* Stats Bar */}
<section className="border-b border-border">
  <div className="max-w-4xl mx-auto py-8 px-4 md:px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div>
        <p className="font-display text-2xl md:text-3xl text-gold">22M+</p>
        <p className="text-xs text-text-tertiary font-sans uppercase tracking-wider mt-1">YouTube {t('views_label')}</p>
      </div>
      <div>
        <p className="font-display text-2xl md:text-3xl text-gold">310K</p>
        <p className="text-xs text-text-tertiary font-sans uppercase tracking-wider mt-1">Instagram</p>
      </div>
      <div>
        <p className="font-display text-2xl md:text-3xl text-gold">10.4K</p>
        <p className="text-xs text-text-tertiary font-sans uppercase tracking-wider mt-1">Spotify {t('monthly')}</p>
      </div>
      <div>
        <p className="font-display text-2xl md:text-3xl text-gold">{singles.length + 1}</p>
        <p className="text-xs text-text-tertiary font-sans uppercase tracking-wider mt-1">{t('releases_label')}</p>
      </div>
    </div>
  </div>
</section>

Add translation keys:
- en: "monthly": "Monthly Listeners", "releases_label": "Releases"
- ru: "monthly": "Ежемесячных слушателей", "releases_label": "Релизов"
- el: "monthly": "Μηνιαίοι ακροατές", "releases_label": "Κυκλοφορίες"
```

### Prompt 2.5 — Add Filter/Sort to Singles Grid

```
The singles grid shows all 12 singles in chronological order with no way to filter. Add year-based filtering and a language filter.

Make the Singles Grid section interactive. Convert it to a client island. Create a new component `src/components/music/SinglesGrid.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeading from '@/components/common/SectionHeading';
import AlbumCover from '@/components/AlbumCover';
import { singles, type Release } from '@/lib/data/discography';

const years = [...new Set(singles.map(s => s.year))].sort((a, b) => b - a);

export default function SinglesGrid() {
  const t = useTranslations('music');
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all');

  const filtered = yearFilter === 'all'
    ? singles
    : singles.filter(s => s.year === yearFilter);

  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading title={`${t('full_discography')} — ${t('singles')}`} />
        </ScrollReveal>

        {/* Year Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setYearFilter('all')}
            className={`px-4 py-2 text-xs font-sans uppercase tracking-wider rounded-full transition-all duration-300 ${
              yearFilter === 'all'
                ? 'bg-gold/15 text-gold border border-gold/30'
                : 'text-text-secondary hover:text-text-primary border border-transparent'
            }`}
          >
            {t('all_years') || 'All'}
          </button>
          {years.map(year => (
            <button
              key={year}
              onClick={() => setYearFilter(year)}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-wider rounded-full transition-all duration-300 ${
                yearFilter === year
                  ? 'bg-gold/15 text-gold border border-gold/30'
                  : 'text-text-secondary hover:text-text-primary border border-transparent'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((single, i) => (
            <ScrollReveal key={single.id} delay={i * 0.05}>
              {/* ... use the interactive card JSX from Prompt 2.1 ... */}
              <SingleCard single={single} t={t} />
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-text-tertiary font-serif italic py-12">
            No releases for this year.
          </p>
        )}
      </div>
    </section>
  );
}
```

Then in `src/app/[locale]/music/page.tsx`, replace the static singles grid section with:
```tsx
import SinglesGrid from '@/components/music/SinglesGrid';
// ...
<SinglesGrid />
```

Add translation key: "all_years": "All" / "Все" / "Όλα"
```

### Prompt 2.6 — Add Yandex Music Embed as Alternative to Spotify

```
A large portion of the audience is Russian-speaking and uses Yandex Music, not Spotify. Add a Yandex Music embed option.

1. Create a smart embed component that shows Spotify for non-Russian locales and Yandex Music for Russian locale:

Create `src/components/music/StreamingEmbed.tsx`:

```tsx
'use client';

import { useLocale } from 'next-intl';

interface StreamingEmbedProps {
  spotifyUri?: string;      // e.g., "artist/6PPuuN3cvmbyuvgrGbhXge" or "track/xxx"
  yandexArtistId?: string;  // e.g., "3050547"
  height?: number;
  className?: string;
}

export default function StreamingEmbed({
  spotifyUri = 'artist/6PPuuN3cvmbyuvgrGbhXge',
  yandexArtistId = '3050547',
  height = 352,
  className = '',
}: StreamingEmbedProps) {
  const locale = useLocale();

  // Show Yandex Music for Russian locale, Spotify for others
  if (locale === 'ru' && yandexArtistId) {
    return (
      <div className={className}>
        <iframe
          src={`https://music.yandex.ru/iframe/artist/${yandexArtistId}`}
          width="100%"
          height={height}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          loading="lazy"
          className="rounded-lg"
          title="Yandex Music Player"
          style={{ border: 'none', borderRadius: '12px' }}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <iframe
        src={`https://open.spotify.com/embed/${spotifyUri}?utm_source=generator&theme=0`}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-lg"
        title="Spotify Player"
      />
    </div>
  );
}
```

2. Replace ALL raw Spotify iframes in `src/app/[locale]/music/page.tsx` and `src/components/home/LatestRelease.tsx` with this component:

```tsx
import StreamingEmbed from '@/components/music/StreamingEmbed';

// Latest Release:
<StreamingEmbed height={352} />

// Album:
<StreamingEmbed height={152} />

// Homepage:
<StreamingEmbed height={152} />
```

3. Update CSP in next.config.mjs — add Yandex Music to `frame-src`:
```
"frame-src https://www.youtube.com https://open.spotify.com https://music.yandex.ru",
```

4. Also add to images CSP for Yandex album covers:
```
"img-src 'self' data: https://img.youtube.com https://i.scdn.co https://*.instagram.com https://*.cdninstagram.com https://avatars.yandex.net",
```
```

---

## PHASE 3: MUSIC PAGE DESIGN UPGRADES

### Prompt 3.1 — Add Waveform / Audio Preview Visualization

```
Create a visual waveform component that adds visual interest to the singles grid cards. This is a purely decorative element (no actual audio analysis) that gives each card a unique generated pattern.

Create `src/components/music/Waveform.tsx`:

```tsx
'use client';

import { useMemo } from 'react';

interface WaveformProps {
  seed: string;  // e.g., single.id — generates consistent pattern per track
  bars?: number;
  className?: string;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export default function Waveform({ seed, bars = 32, className = '' }: WaveformProps) {
  const heights = useMemo(() => {
    const base = hashCode(seed);
    return Array.from({ length: bars }, (_, i) => {
      const h = ((base * (i + 1) * 7919) % 100);
      // Create a natural-looking waveform shape (higher in middle)
      const position = i / bars;
      const envelope = Math.sin(position * Math.PI) * 0.6 + 0.4;
      return Math.max(8, h * envelope);
    });
  }, [seed, bars]);

  return (
    <div className={`flex items-end gap-[2px] h-8 ${className}`}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-gold/20 rounded-full min-w-[2px] transition-all duration-300 group-hover:bg-gold/40"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
```

Add this to each singles grid card, between the AlbumCover and the title text:
```tsx
<Waveform seed={single.id} className="px-4 pt-3" />
```

This gives each card a unique visual fingerprint without needing actual audio data.
```

### Prompt 3.2 — Redesign "Listen On" Section with Platform Icons

```
The "Listen On" section at the bottom of the Music page is plain text buttons. Upgrade to show platform logos/icons with a more premium layout.

Create `src/components/music/PlatformLinks.tsx`:

```tsx
import { socialLinks } from '@/lib/data/social-links';

const platformIcons: Record<string, { icon: string; color: string }> = {
  spotify: { icon: '🎵', color: '#1DB954' },
  'apple-music': { icon: '🎵', color: '#FC3C44' },
  'yandex-music': { icon: '🎵', color: '#FFCC00' },
  youtube: { icon: '▶️', color: '#FF0000' },
  zvuk: { icon: '🎵', color: '#7C3AED' },
  deezer: { icon: '🎵', color: '#00C7F2' },
  'amazon-music': { icon: '🎵', color: '#25D1DA' },
  soundcloud: { icon: '🎵', color: '#FF7700' },
};

const streamingPlatforms = ['spotify', 'apple-music', 'youtube', 'yandex-music', 'zvuk', 'deezer', 'amazon-music', 'soundcloud'];

export default function PlatformLinks() {
  const platforms = socialLinks.filter(l => streamingPlatforms.includes(l.platform));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {platforms.map(p => {
        const meta = platformIcons[p.platform];
        return (
          <a
            key={p.platform}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 bg-bg-tertiary/50 border border-border hover:border-gold/30 rounded-sm p-6 transition-all duration-300 hover:bg-gold/5"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: `${meta?.color}15` }}
            >
              {meta?.icon || '🎵'}
            </div>
            <span className="text-xs font-sans uppercase tracking-wider text-text-secondary group-hover:text-gold transition-colors">
              {p.label}
            </span>
            {p.followers && (
              <span className="text-[10px] text-text-tertiary font-sans">
                {p.followers}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
```

Replace the "Listen On" section's flex-wrap button layout with this grid component.
```

---

## PHASE 4: HOMEPAGE MUSIC SECTION

### Prompt 4.1 — Upgrade Homepage LatestRelease with Track Switcher

```
The homepage LatestRelease section only shows the first single (Mia Kardia). Add the ability to cycle through the latest 3-4 releases with a simple selector.

Update `src/components/home/LatestRelease.tsx`:

1. Add state to track the selected release:
```tsx
'use client';
import { useState } from 'react';

// Inside the component:
const [selectedIdx, setSelectedIdx] = useState(0);
const topReleases = singles.slice(0, 4);
const selected = topReleases[selectedIdx];
```

2. Replace the static featured release section with the selected one. Add small tab buttons below the AlbumCover to switch:

```tsx
{/* Release Selector Dots */}
<div className="flex gap-2 mt-4 justify-center md:justify-start">
  {topReleases.map((s, idx) => (
    <button
      key={s.id}
      onClick={() => setSelectedIdx(idx)}
      className={`px-3 py-1.5 text-[10px] font-sans uppercase tracking-wider rounded-full transition-all duration-300 ${
        idx === selectedIdx
          ? 'bg-gold/15 text-gold border border-gold/30'
          : 'text-text-tertiary hover:text-text-secondary border border-transparent'
      }`}
    >
      {s.title.length > 12 ? s.title.substring(0, 12) + '…' : s.title}
    </button>
  ))}
</div>
```

3. Use `selected` instead of `latest` for title, year, cover image, etc.

4. Add a subtle crossfade animation when switching using framer-motion AnimatePresence.
```

---

## REMAINING CRITICAL ITEMS (from previous audit)

### Prompt 5.1 — Add BreadcrumbList Schemas to All Pages

```
The generateBreadcrumbSchema() helper exists in seo.ts but is unused. Add a BreadcrumbList JsonLd to EVERY inner page (about, music, videos, gallery, events, contact, press).

For each page, add before the <PageHero> component:
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tsopozidis-alexandros.com' },
    { '@type': 'ListItem', position: 2, name: '{PAGE_NAME}', item: 'https://tsopozidis-alexandros.com/en/{page_path}' },
  ],
}} />

Pages to update:
1. src/app/[locale]/about/page.tsx — name: "About"
2. src/app/[locale]/music/page.tsx — name: "Music"
3. src/app/[locale]/contact/page.tsx — name: "Contact"
4. src/app/[locale]/press/page.tsx — name: "Press"
5. src/app/[locale]/events/page.tsx — name: "Events"
6. src/app/[locale]/videos/page.tsx — name: "Videos"
7. src/app/[locale]/gallery/page.tsx — name: "Gallery"
```

### Prompt 5.2 — Fix Remaining Hardcoded Artist Names in Metadata

```
The about, press, and contact pages still have hardcoded English "Alexandros Tsopozidis" in their generateMetadata title construction. Update all three:

1. src/app/[locale]/about/page.tsx — import getArtistName from seo.ts. Change title to use getArtistName(locale)
2. src/app/[locale]/press/page.tsx — same fix
3. src/app/[locale]/contact/page.tsx — same fix

Pattern:
import { generatePageMetadata, getArtistName } from '@/lib/seo';
// In generateMetadata:
title: `${t('title')} — ${getArtistName(locale)}`,
```

---

## SUMMARY

| Phase | Prompts | Focus |
|-------|---------|-------|
| 0 | 0.1 | **CRITICAL:** Font/CSP fix (blocks all typography in production) |
| 1 | 1.1–1.2 | Enrich discography data with Spotify IDs, YouTube IDs, genres, languages |
| 2 | 2.1–2.6 | **Music page overhaul:** interactive cards, correct Spotify embeds, video section, stats bar, year filter, Yandex Music for RU users |
| 3 | 3.1–3.2 | Design polish: waveform visualization, platform grid redesign |
| 4 | 4.1 | Homepage LatestRelease upgrade with track switcher |
| 5 | 5.1–5.2 | Remaining SEO fixes from previous audit |

**Total: 13 prompts | Estimated: ~20 dev hours via Claude Code**

**Priority: 0.1 → 2.2 → 2.1 → 2.3 → 2.6 → 2.4 → 1.1 → rest**
