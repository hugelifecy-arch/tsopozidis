# Alexandros Tsopozidis Website — Full Upgrade Playbook

## Claude Code Implementation Guide (Music Page + Homepage)

> **Last reviewed:** 2026-03-14
> **Codebase location:** `/home/user/tsopozidis/alexandros-tsopozidis-website/`

---

## Site Overview

- **URL:** `https://tsopozidis-alexandros.com`
- **Languages:** EN (`/en/...`), RU (`/ru/...`), and EL (`/el/...` — Greek/Ελληνικά)
- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS 3.4.1, Framer Motion, next-intl 4.8.3, Lucide React icons
- **Theme:** Dark (near-black background, gold/tan accent color `~#C9A96E`)
- **Booking:** WhatsApp `+79383163034` (contact: Liana)
- **i18n:** Fully implemented — 3 languages with 90+ translation keys in `messages/{en,ru,el}.json`
- **Pages built:** Home, About, Music, Videos, Gallery, Events, Contact (all routing + error/loading/404 pages)

---

## PART A: MUSIC PAGE (`/en/music`, `/ru/music` & `/el/music`)

### Current State — What Exists & What's Broken

**File:** `src/app/[locale]/music/page.tsx`
**Data:** `src/lib/data/discography.ts` (12 singles + 1 album defined)

The page structure is built with four sections (Latest Release, Album, Singles Grid, Listen On), but has critical gaps:

1. **ALL cover artwork is missing** — Every single and the album shows a Lucide `<Music>` icon placeholder (gold on dark grey square). All 13 cover image files (`/images/albums/*.jpg`) referenced in `discography.ts` do NOT exist in `/public/`. This is the #1 visual problem — the page looks like a template that was never finished.

2. **Spotify embed is a placeholder** — The "Latest Release" hero for "Mia Kardia" shows a grey box with text "Spotify Player — embed will load here" (line 51 of music/page.tsx). No actual iframe. Visitors cannot listen to anything without leaving the site.

3. **Singles grid is non-interactive** — Cards show Lucide `Music` icon + title + year + featuring info. Hover state exists (border highlight + gradient overlay) but no streaming links per track, no play functionality.

4. **No YouTube video embeds on Music page** — The Videos page (`/videos`) HAS working YouTube embeds with 5 videos (Бродяга 22M+, Male Male 11M+, etc.), but the Music page itself has no video section. YouTube IDs in `discography.ts` are all `TODO_*` placeholders.

5. **No social proof** — The artist has 310K Instagram followers and 10.4K Spotify monthly listeners. None of this is visible on the Music page (About page does show stats).

6. ~~**Missing social links**~~ — **RESOLVED.** Footer now has 14 social/streaming platforms via `src/lib/data/social-links.ts` and `src/components/common/SocialIcons.tsx`. Instagram, Facebook, YouTube, SoundCloud, etc. are all present.

7. **Upcoming release not teased** — Facebook shows a "Вечная любовь" (Eternal Love) premiere coming soon. Not mentioned on site.

---

### Artist Data Reference (use throughout)

#### Streaming Profiles
```
Spotify:       https://open.spotify.com/artist/6PPuuN3cvmbyuvgrGbhXge  (10.4K monthly listeners)
Spotify ID:    6PPuuN3cvmbyuvgrGbhXge
Apple Music:   https://music.apple.com/artist/alexandros-tsopozidis/839072119
YouTube:       https://www.youtube.com/channel/UC_25lDUqfZLnjvWxzPHGNmg
Yandex Music:  https://music.yandex.ru/artist/3050547
Zvuk:          https://zvuk.com/artist/196201870
Deezer:        https://deezer.com/en/artist/7144045
Amazon Music:  https://music.amazon.com/artists/B0749H7D6R/alexandros-tsopozidis
SoundCloud:    https://soundcloud.com/alexandrostsopozidis
Shazam:        https://www.shazam.com/artist/alexandros-tsopozidis/839072119
Discogs:       https://www.discogs.com/artist/5270354-Alexandros-Tsopozidis
```

#### Social Media
```
Instagram:  https://www.instagram.com/alexandros_official/   (~310K followers, 1730 posts)
Facebook:   https://www.facebook.com/alexandros.tsopozidis/  (~10.5K likes)
TikTok:     https://www.tiktok.com/@tsopozidis
VK:         https://vk.com/alexandros_tsopozidis
OK:         https://ok.ru/alexandros.tsopozidis
Telegram:   https://t.me/tsopozidis
```

#### Known Spotify Track IDs (for embeds)
```
Kavkaz (2023):                 1F1PGhdEb1MtMLbuGuxCR7
Бродяга (with Elbrus, 2016):  4XYmHQMmFOFw7NaOINtmtb  (also: 5npMrvUO3XfkRYQiMRQOdN on Za toboi album)
Kaciyorum/Fevgo (with Faxo):  0mVa0ZUSX9sunN4X6YQbMD
Kavkaz album:                 5LkRMJW59dmjgLfIzdUCnh
```

#### Known YouTube Video IDs (from `src/lib/data/videos.ts`)
```
Бродяга (2017, feat. Elbrus):       z9ASjQE9Q2Y   (22M+ views)
Male Male (2016):                    o20LEgccjxY   (11M+ views)
Kaciyorum (2019, feat. Faxo):       F9rQSin9PIY
Дай мне номер телефона (2018):      Rxp_-wMKU5k
Расскажи (2020):                    Ne_uRfKUUlk
```
NOTE: The 12 singles in `discography.ts` have `youtubeId` fields all set to `TODO_*` placeholders.
These should be cross-referenced with `videos.ts` where possible (e.g., Расскажи already has an ID).

#### SoundCloud URL discrepancy
```
Playbook reference:  https://soundcloud.com/alexandrostsopozidis
Actual in codebase:  https://soundcloud.com/alexandros-tsopozidis-853060317
→ Use the codebase version (it's the actual working URL).
```

#### Full Discography
```
ALBUM:
За тобой (2018) — 12 tracks

SINGLES (newest first):
2025  Mia Kardia
2025  Soltera (feat. El Pontios)
2024  Par shirkhani
2023  Kavkaz (feat. Vasiliadis) — 383K YouTube views
2022  Я грек
2021  Kortsopon apsimon
2021  Monahos
2021  Капкан
2020  Расскажи
2020  Panagia Soumela
2019  Dumanli
2018  Танец грека

UPCOMING:
Вечная любовь (Eternal Love) — premiere teased on Facebook

KEY COLLABORATIONS:
- Elbrus Dzhanmirzoev — "Бродяга" (Brodiaga)
- Vasiliadis — "Kavkaz"
- El Pontios — "Soltera"
- Faxo — "Kaciyorum (Fevgo)"
- Eldar Dalgatov — "Может ты вернёшься"
```

---

### PROMPT 1 — Fix Missing Cover Artwork (CRITICAL)

> **STATUS:** NOT STARTED — 13 image files need to be created/sourced

This is the single most impactful fix. Every release shows a Lucide `<Music>` icon placeholder.

**Files to modify:**
- `src/app/[locale]/music/page.tsx` (lines 39, 68, 103 — Music icon placeholders)
- `src/components/home/LatestRelease.tsx` (lines 33, 75 — Music icon placeholders)
- `src/lib/data/discography.ts` (coverImage fields already defined, images just missing)
- Create `/public/images/albums/` directory with 13 cover images

```
PRIORITY: CRITICAL
PAGES: /en/music, /ru/music, /el/music, homepage (LatestRelease component)

Every single and the album on the Music page displays a generic music note placeholder 
icon instead of actual cover artwork. This makes the page look unfinished.

SOLUTION — Use the Spotify API to fetch cover art dynamically. 

The Spotify oEmbed endpoint returns artwork:
GET https://open.spotify.com/oembed?url=https://open.spotify.com/artist/6PPuuN3cvmbyuvgrGbhXge

But for individual track artwork, the best approach is to use Spotify's CDN directly.
Spotify album art follows this pattern and can be extracted from the embed page.

RECOMMENDED APPROACH:

Option A — Spotify Embed per track (best UX, includes play button + artwork):
Replace each placeholder card with a compact Spotify embed iframe:

<iframe 
  style="border-radius:12px" 
  src="https://open.spotify.com/embed/track/{TRACK_ID}?utm_source=generator&theme=0" 
  width="100%" 
  height="152" 
  frameBorder="0" 
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
  loading="lazy">
</iframe>

This automatically shows: cover art + title + play button + 30sec preview.
Use height="152" for compact card style, or height="352" for full player.
Use theme=0 for dark mode.

Known track IDs to use:
- Kavkaz: 1F1PGhdEb1MtMLbuGuxCR7

For tracks where we don't have the Spotify track ID, look in the codebase for 
any existing track ID data. If not found, you can:
1. Search Spotify's embed page pattern: open.spotify.com/search/{track name} alexandros tsopozidis
2. Use the artist embed as fallback for unknown tracks
3. Or manually add placeholder images and leave a TODO comment

Option B — Download artwork from Spotify/Apple Music and save to /public/images/music/:
Name files: {year}-{slug}.jpg (e.g. 2025-mia-kardia.jpg, 2023-kavkaz.jpg)
Apple Music artwork URLs follow this pattern and can be resized:
https://is1-ssl.mzstatic.com/image/thumb/Music.../source/{width}x{height}bb.jpg

Option C — Use the Spotify Web API (requires API key):
GET https://api.spotify.com/v1/artists/6PPuuN3cvmbyuvgrGbhXge/top-tracks
Returns track objects with album.images[] array containing artwork URLs.
This is the most robust option but requires a Spotify API client ID.

WHICHEVER OPTION YOU CHOOSE:
- Replace ALL music note placeholder icons with real artwork
- The hero "Latest Release" section (Mia Kardia) needs a large cover image (~400px)
- The singles grid cards need square cover images (~250px)  
- The album "За тобой" section needs its cover art
- All images must be lazy-loaded (loading="lazy")
- Add subtle hover effect on artwork (scale 1.02-1.05 transition)
- Maintain the dark theme — use dark/transparent backgrounds
```

---

### PROMPT 2 — Add Spotify Embed Player to Hero Section

> **STATUS:** NOT STARTED — Currently shows grey placeholder box with text "Spotify Player — embed will load here"

**Files to modify:**
- `src/app/[locale]/music/page.tsx` (lines 49-52 — replace placeholder div)
- `src/components/home/LatestRelease.tsx` (no embed exists — add one)

```
PRIORITY: HIGH
PAGES: /en/music, /ru/music, /el/music

The "Latest Release" hero section for "Mia Kardia" has streaming platform link buttons 
but NO actual embedded player. Add a Spotify embed so visitors can listen immediately.

Replace the area where the placeholder music note icon is (left side of the hero) with 
a Spotify embed iframe:

FOR /en/music (English audience — Spotify primary):
<iframe 
  style="border-radius:12px" 
  src="https://open.spotify.com/embed/artist/6PPuuN3cvmbyuvgrGbhXge?utm_source=generator&theme=0" 
  width="100%" 
  height="352" 
  frameBorder="0" 
  allowfullscreen="" 
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
  loading="lazy">
</iframe>

If you can find the specific Spotify track ID for "Mia Kardia" in the codebase or data, 
use the track-specific embed instead:
src="https://open.spotify.com/embed/track/{MIA_KARDIA_TRACK_ID}?utm_source=generator&theme=0"

FOR /ru/music (Russian audience — Yandex Music primary):
Add a Yandex Music embed as the PRIMARY player:
<iframe 
  frameborder="0" 
  style="border:none;width:100%;height:450px;border-radius:12px;" 
  src="https://music.yandex.ru/iframe/artist/3050547">
</iframe>

Keep the Spotify embed below it as secondary, or in a tabbed interface 
("Listen on Spotify" / "Слушать в Яндекс.Музыке").

IMPORTANT: The existing platform link buttons (YouTube, Spotify, Apple Music, etc.) 
should remain alongside the embed — they're useful for opening in native apps.
Make the embed responsive: 100% width with max-width constraint on the container.
```

---

### PROMPT 3 — Embed YouTube Music Videos Section

> **STATUS:** PARTIALLY ADDRESSED — A full Videos page exists at `/videos` with working
> YouTube embeds (thumbnail → click-to-play iframe). However, the Music page itself has
> NO video section. Consider adding a condensed version or cross-link.
>
> **Already available in codebase:**
> - `src/lib/data/videos.ts` — 5 videos with real YouTube IDs
> - `src/components/home/VideoHighlight.tsx` — Working YouTube embed component on homepage
> - YouTube thumbnail helper: `getYoutubeThumbnail()` in `videos.ts`

**Files to modify:**
- `src/app/[locale]/music/page.tsx` — Add a "Music Videos" section

```
PRIORITY: HIGH (reduced — Videos page already covers most of this)
PAGES: /en/music, /ru/music, /el/music

Add a "Music Videos" section between the hero and the discography grid.
The artist has videos with hundreds of thousands of views but NONE are on the site.

The YouTube channel is: https://www.youtube.com/channel/UC_25lDUqfZLnjvWxzPHGNmg

To find the exact video IDs, search the codebase for any YouTube references, or 
visit the channel and extract video IDs from the most popular uploads.

Key videos to embed (find their YouTube video IDs):
1. "KAVKAZ" (2022) with Vasiliadis — ~383K views, official video
   Title on YouTube: @VASILIADIS & @ALEXANDROS TSOPOZIDIS ◣ КАВКАЗ ● KAVKAZ ◥【 OFFICIAL VIDEO 】
2. "БРОДЯГА" (Brodiaga) with Elbrus Dzhanmirzoev — classic hit, official video
   Title on YouTube: Эльбрус Джанмирзоев и Alexandros Tsopozidis - БРОДЯГА (официальный видеоклип)
3. "Mia Kardia" or "Я грек" — latest/recent releases

IMPLEMENTATION:
<div class="video-grid"> <!-- 2 columns desktop, 1 column mobile -->
  <div class="video-card">
    <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
      <iframe 
        style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:12px;"
        src="https://www.youtube.com/embed/{VIDEO_ID}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        loading="lazy">
      </iframe>
    </div>
    <h4>Kavkaz (feat. Vasiliadis)</h4>
    <span class="views">383K+ views</span>
  </div>
  <!-- repeat for 2nd video -->
</div>

Section heading: "Music Videos" / "Музыкальные клипы"
Add a "View All on YouTube →" link button at bottom pointing to:
https://www.youtube.com/channel/UC_25lDUqfZLnjvWxzPHGNmg

If you cannot determine exact video IDs from the codebase, embed the channel's 
uploads playlist as fallback:
src="https://www.youtube.com/embed?listType=playlist&list=UU_25lDUqfZLnjvWxzPHGNmg"

Layout: 
- Desktop: 2 videos side by side
- Mobile: stacked
- 16:9 aspect ratio via padding-bottom:56.25% trick
- Border-radius:12px to match site style
```

---

### PROMPT 4 — Make Singles Grid Interactive

> **STATUS:** PARTIALLY BUILT — Grid exists with 12 singles, has hover border/gradient effect,
> year badge, and featuring info. Missing: cover art (see P1), streaming links per card, play button.
>
> **Current grid:** 1col mobile / 2col sm / 3col lg (lines 98-120 of music/page.tsx)
> Playbook suggests 4col desktop / 3col tablet / 2col mobile — adjust as desired.

**Files to modify:**
- `src/app/[locale]/music/page.tsx` (lines 98-120 — singles grid section)
- `src/lib/data/discography.ts` (add per-track streaming URLs if available)

```
PRIORITY: HIGH
PAGES: /en/music, /ru/music, /el/music

The singles grid cards (Soltera, Par shirkhani, Kavkaz, Я грек, etc.) are currently 
just a placeholder image + title. They need to be interactive.

For each single card, add:

1. COVER ARTWORK — Replace the music note placeholder (handled in Prompt 1, but ensure
   it's done for these cards too)

2. YEAR + FEATURING ARTIST — Show below the title:
   - "2025 · feat. El Pontios" for Soltera
   - "2023 · feat. Vasiliadis" for Kavkaz
   - etc.

3. STREAMING ICON ROW — Small clickable platform icons below each card:
   Spotify | Apple Music | YouTube | Yandex Music
   Each icon links to the track on that platform.
   
   Use small SVG icons (~20px), matching each platform's brand color on hover:
   - Spotify: #1DB954 (green)
   - Apple Music: #FC3C44 (red/pink) 
   - YouTube: #FF0000
   - Yandex Music: #FFCC00 (yellow)
   
   If specific per-track URLs aren't available, link to the artist's profile on 
   each platform as a fallback.

4. HOVER EFFECT — On card hover:
   - Slight scale up (transform: scale(1.03))
   - Show a play icon overlay on the artwork
   - Smooth transition (0.2s ease)

5. CLICK BEHAVIOR — Clicking the card should either:
   a. Open a mini Spotify embed inline (preferred)
   b. Or open the track in Spotify (via the artist page link)

6. RESPONSIVE GRID:
   - Desktop: 4 cards per row (as it currently appears)
   - Tablet: 3 cards per row
   - Mobile: 2 cards per row

On /ru/music pages, show Yandex Music icon FIRST in the icon row.
On /en/music pages, show Spotify icon FIRST.
```

---

### PROMPT 5 — Social Proof Stats Banner

> **STATUS:** NOT STARTED on Music page.
> Note: The About page (`/about`) already shows stats (22M+ views, 310K followers, 15+ years).
> This prompt adds a similar banner to the Music page. Consider reusing the About page's approach.

**Files to modify:**
- `src/app/[locale]/music/page.tsx` — Add stats section
- `messages/{en,ru,el}.json` — Add translation keys for stat labels

```
PRIORITY: MEDIUM
PAGES: /en/music, /ru/music, /el/music (with localized labels)

Add a horizontal stats strip section. Position it between the hero and the 
discography, or between the videos section and discography.

Display these metrics in a clean horizontal layout:

| Metric          | Value  | Icon/Platform |
|-----------------|--------|---------------|
| Instagram       | 310K+  | Instagram icon (gradient) |
| Spotify Monthly | 10K+   | Spotify icon (green) |
| Facebook        | 10K+   | Facebook icon (blue) |
| Singles Released | 13+   | Music note icon (gold) |

Russian version labels:
| Подписчиков Instagram | 310K+ |
| Слушателей Spotify    | 10K+  |
| Подписчиков Facebook  | 10K+  |
| Синглов               | 13+   |

Design:
- Horizontal row on desktop (4 cols), 2x2 grid on mobile
- Large bold gold numbers (#C9A96E or the site's accent color)
- Smaller label text below in muted/grey
- Platform-colored small icons
- Subtle background differentiation (slightly lighter than page bg)
- Optional: number count-up animation on scroll (only if animation library 
  already exists in the project)
```

---

### PROMPT 6 — Fix Missing Social Links (Site-Wide)

> **STATUS: ✅ COMPLETED**
>
> The footer now includes 14 platforms via `src/lib/data/social-links.ts`:
> TikTok, YouTube, Instagram (310K), Facebook (10.5K), VK, OK, Telegram,
> Spotify (10.4K monthly), Apple Music, Yandex Music, Zvuk, Deezer, SoundCloud, Amazon Music.
>
> Icons rendered by `src/components/common/SocialIcons.tsx` using Lucide React icons
> with text fallbacks for platforms without Lucide support (TT, VK, OK, TG).
>
> **Remaining minor items:**
> - SoundCloud URL uses `alexandros-tsopozidis-853060317` (verified working)
> - Discogs link NOT included in social-links.ts — add if desired
> - Shazam link NOT included — add if desired
> - Consider replacing text fallback icons (TT, VK, OK, TG) with proper SVGs

```
PRIORITY: ✅ DONE (minor polish remaining)
PAGES: ALL pages (footer)

No major work needed. Optional enhancements:

1. Add Discogs to social-links.ts:
   { platform: "discogs", url: "https://www.discogs.com/artist/5270354-Alexandros-Tsopozidis", label: "Discogs" }

2. Add Shazam:
   { platform: "shazam", url: "https://www.shazam.com/artist/alexandros-tsopozidis/839072119", label: "Shazam" }

3. Replace text-based icon fallbacks with proper SVGs for TikTok, VK, OK, Telegram
   in SocialIcons.tsx (currently uses <span> with text like "TT", "VK", etc.)
```

---

### PROMPT 7 — "Listen On" Section Visual Redesign

> **STATUS:** PARTIALLY BUILT — Section exists (lines 124-146 of music/page.tsx) with
> gold-bordered text buttons for 7 streaming platforms. Functional but plain — no logos,
> no brand colors, no hover glow. Uses `streamingPlatforms` filtered from `socialLinks`.

**Files to modify:**
- `src/app/[locale]/music/page.tsx` (lines 124-146 — Listen On section)
- Optionally add platform SVG logos to `/public/images/platforms/`

```
PRIORITY: MEDIUM
PAGES: /en/music, /ru/music, /el/music

The current "Listen On" section at the bottom of the Music page is just a row of 
plain text links. Redesign it with visual branded buttons.

Each platform should be a card/button with:
- Platform LOGO (not just text)
- Platform brand color as background or border accent
- Hover glow/highlight effect

Platforms and brand colors:
- Spotify:      #1DB954 (green)    → https://open.spotify.com/artist/6PPuuN3cvmbyuvgrGbhXge
- Apple Music:  #FC3C44 (red)      → https://music.apple.com/artist/alexandros-tsopozidis/839072119
- YouTube:      #FF0000            → https://www.youtube.com/channel/UC_25lDUqfZLnjvWxzPHGNmg
- Yandex Music: #FFCC00 (yellow)   → https://music.yandex.ru/artist/3050547
- Deezer:       #A238FF (purple)   → https://deezer.com/en/artist/7144045
- Amazon Music: #25D1DA (teal)     → https://music.amazon.com/artists/B0749H7D6R/alexandros-tsopozidis
- Zvuk:         #0066FF (blue)     → https://zvuk.com/artist/196201870
- SoundCloud:   #FF5500 (orange)   → https://soundcloud.com/alexandrostsopozidis

Layout:
- Desktop: horizontal wrapped grid (4 per row)
- Mobile: horizontal scroll or 2-column grid
- Each button ~150px wide, rounded corners matching site style
- Section heading: "Stream Everywhere" / "Слушайте на всех платформах"
- All links open in new tab (target="_blank" rel="noopener")
```

---

## PART B: HOMEPAGE (`/en`, `/ru` & `/el`)

### Current State

**File:** `src/app/[locale]/page.tsx`
**Components:** `src/components/home/` — 5 components (HeroSection, LatestRelease, AboutPreview, VideoHighlight, UpcomingShows)

The homepage is fully built with all 5 sections. However, the LatestRelease component
mirrors the Music page's cover art problem (Lucide `Music` icon placeholders).
The VideoHighlight component IS working — it shows YouTube thumbnails and click-to-play embeds.
Hero section has an actual background image (`/public/images/hero/hero-main.jpg`).
AboutPreview has a portrait image (`/public/images/artist/portrait-balcony.jpg`).

---

### PROMPT 8 — Homepage Music Section Fix

> **STATUS:** PARTIALLY DONE
> - LatestRelease component exists and is functional but shows Music icon placeholders (same as Music page P1)
> - VideoHighlight component is WORKING — YouTube thumbnails + click-to-play iframe for Бродяга (22M+)
> - Hero section is WORKING — has actual background image with parallax effect
> - AboutPreview is WORKING — has portrait image
> - UpcomingShows is WORKING — shows event cards
> - All CTA buttons and nav links appear functional
>
> **Main issue:** Cover artwork in LatestRelease (same fix as P1)

**Files to modify:**
- `src/components/home/LatestRelease.tsx` (lines 33, 75 — Music icon placeholders)
- Homepage will auto-fix when P1 cover images are added

```
PRIORITY: HIGH (mostly resolved — depends on P1)
PAGES: /en, /ru, /el (homepage)

The homepage likely has a section that previews music/latest release content.
Based on the Music page pattern, it probably shows:
- Music note placeholder icons instead of cover art
- Plain text links instead of interactive elements

AUDIT the homepage and fix:

1. If there's a "Latest Music" / "Latest Release" section on the homepage:
   - Replace any placeholder icons with actual cover artwork (same approach as Prompt 1)
   - Add a working Spotify or YouTube embed for the latest single
   - Make sure the "Listen Now" or equivalent CTA button actually works

2. If there's a "Featured Videos" section:
   - Embed at least 1 YouTube music video (use Kavkaz — highest views)
   - Don't just link — embed with the responsive iframe

3. If there's a navigation/link grid (e.g., "Music", "Videos", "Gallery", "Events"):
   - Each card should have a real background image, not a placeholder
   - For "Music": use the latest single's cover art or the artist performing
   - For "Videos": use a YouTube thumbnail
   - For "Gallery": use a photo from Instagram/Facebook
   - For "Events": use a concert/performance photo
   - All cards should link to their respective pages

4. Check for any broken or dead links on the homepage.
   Make sure all CTA buttons work:
   - "Book Artist" WhatsApp link: https://wa.me/79383163034
   - Navigation links to /about, /music, /videos, /gallery, /events, /contact
   - All social media links in footer (as updated in Prompt 6)

5. If the homepage has a hero section:
   - It should have a high-quality hero image of the artist (not a placeholder)
   - Check if there's a background image/video that's failing to load
   - The hero CTA should be prominent and functional
```

---

### PROMPT 9 — Homepage Hero Image & Social Integration

> **STATUS:** PARTIALLY DONE
> - Hero section EXISTS with actual background image (`/public/images/hero/hero-main.jpg`)
>   with parallax effect, animated name, CTA buttons — this is WORKING
> - Instagram feed preview — NOT implemented
> - "Coming Soon" teaser for Вечная любовь — NOT implemented
> - OG image (`/images/og-image.jpg`) referenced in metadata but file DOES NOT EXIST

**Files to modify:**
- `src/app/[locale]/page.tsx` — Add Instagram preview or Coming Soon teaser section
- `src/app/[locale]/layout.tsx` — Fix OG image reference or create the file

```
PRIORITY: MEDIUM (hero is done; remaining items are enhancements)
PAGES: /en, /ru, /el

If the homepage hero section lacks a compelling background image:

1. SOURCE HIGH-QUALITY IMAGES:
   Check if the project already has images in /public/images/ that aren't being used.
   
   If no images exist locally, the artist's Instagram (@alexandros_official) has 1,730 
   posts with professional concert and portrait photos. Options:
   a. Ask the client (artist) to provide 3-5 high-res photos for the site
   b. Use a professional photo from the site's existing /gallery page if available
   c. As temporary measure, use the Spotify artist image via their API

2. ADD AN INSTAGRAM FEED PREVIEW to the homepage:
   Show 3-4 latest Instagram posts in a horizontal row.
   Options:
   a. Instagram Basic Display API / oEmbed — embed recent posts dynamically
   b. Manual embed: hardcode 3-4 recent Instagram post URLs using:
      https://api.instagram.com/oembed?url={POST_URL}
   c. Simple CTA card: "Follow on Instagram" with follower count (310K+)
      linking to https://www.instagram.com/alexandros_official/
   
   This adds life and visual content to an otherwise text-heavy page.

3. ADD "COMING SOON" TEASER for new release:
   The artist's Facebook shows "Вечная любовь" (Eternal Love) premiere coming soon.
   Add a teaser banner/strip:
   - "New Single Coming Soon — Вечная любовь (Eternal Love)"  
   - With a "Pre-Save" or "Follow for Updates" CTA
   - Link to Spotify artist page for follow/pre-save
```

---

## PART C: SITE-WIDE IMPROVEMENTS

### PROMPT 10 — Schema.org Structured Data (SEO)

> **STATUS:** NOT STARTED — No JSON-LD or Schema.org markup exists anywhere in the codebase.
> Open Graph metadata is minimal and references a missing OG image file.

**Files to modify:**
- `src/app/[locale]/layout.tsx` — Add MusicGroup JSON-LD to root layout
- `src/app/[locale]/music/page.tsx` — Add MusicAlbum/MusicRecording JSON-LD
- `src/app/[locale]/videos/page.tsx` — Add VideoObject JSON-LD
- Create `/public/images/og-image.jpg` (currently referenced but missing)

```
PRIORITY: MEDIUM (SEO impact)
PAGES: /en/music, /ru/music, /el/music, homepage

Add JSON-LD structured data in the <head> of relevant pages:

1. MUSIC PAGE — MusicGroup schema:
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "name": "Alexandros Tsopozidis",
  "alternateName": ["Александрос Тсопозидис", "Aleksandros Tsopozidis"],
  "url": "https://tsopozidis-alexandros.com",
  "image": "{ARTIST_IMAGE_URL}",
  "genre": ["Pop", "Greek Pop", "Eastern Pop", "Mainstream Pop"],
  "sameAs": [
    "https://open.spotify.com/artist/6PPuuN3cvmbyuvgrGbhXge",
    "https://www.instagram.com/alexandros_official/",
    "https://www.youtube.com/channel/UC_25lDUqfZLnjvWxzPHGNmg",
    "https://music.apple.com/artist/alexandros-tsopozidis/839072119",
    "https://music.yandex.ru/artist/3050547",
    "https://www.facebook.com/alexandros.tsopozidis/",
    "https://www.tiktok.com/@tsopozidis",
    "https://deezer.com/en/artist/7144045",
    "https://www.discogs.com/artist/5270354-Alexandros-Tsopozidis",
    "https://soundcloud.com/alexandrostsopozidis",
    "https://www.wikidata.org/wiki/Q65126751"
  ],
  "foundingLocation": {
    "@type": "Place",
    "name": "Cyprus"
  }
}
</script>

2. Add MusicAlbum schema for "За тобой" (2018, 12 tracks)
3. Add MusicRecording schema for at least the latest 3 singles
4. Both /en and /ru pages should have proper hreflang tags if not already present
```

---

### PROMPT 11 — Collaborations Section

> **STATUS:** NOT STARTED — No collaborations section exists.
> The collaborators are mentioned in `discography.ts` via `featuring` fields but
> there's no dedicated section highlighting them.

**Files to modify:**
- `src/app/[locale]/music/page.tsx` — Add Collaborations section after Singles Grid
- `src/lib/data/discography.ts` — Collaboration data already partially exists (featuring field)
- `messages/{en,ru,el}.json` — Add translation keys

```
PRIORITY: LOW-MEDIUM
PAGES: /en/music, /ru/music, /el/music

Add a "Collaborations" / "Коллаборации" section after the singles discography.
This highlights cross-audience tracks and builds credibility.

Featured collaborations:
1. Elbrus Dzhanmirzoev — "Бродяга" (Brodiaga) — Spotify: 4XYmHQMmFOFw7NaOINtmtb
2. Vasiliadis — "Kavkaz" — Spotify: 1F1PGhdEb1MtMLbuGuxCR7
3. El Pontios — "Soltera" (2025)
4. Faxo — "Kaciyorum (Fevgo)" — Spotify: 0mVa0ZUSX9sunN4X6YQbMD
5. Eldar Dalgatov — "Может ты вернёшься"

Display as horizontal scroll cards (mobile) / 3-column grid (desktop):
- Collaborator name (bold)
- Track title
- Year
- Small Spotify play button or link

This is especially valuable because Elbrus Dzhanmirzoev is a much bigger artist
and the collab drives significant discovery traffic.
```

---

### PROMPT 12 — Content Security Policy for Embeds

> **STATUS:** NOT CONFIGURED
> `next.config.mjs` only has `images.remotePatterns` for instagram, YouTube thumbnails,
> and Spotify CDN. No CSP headers defined. No middleware security headers.
> This means embeds should work by default (no restrictive CSP blocking them),
> but adding proper CSP is a security best practice.

**Files to modify:**
- `src/middleware.ts` — Currently only handles i18n routing; add security headers
- OR `next.config.mjs` — Add headers() config

```
PRIORITY: MEDIUM (embeds will work without CSP since none is set; add for security)
PAGES: Site config — next.config.mjs or middleware.ts

If you add Spotify, YouTube, and Yandex Music iframes and they don't render,
check the Content Security Policy (CSP) headers.

You may need to whitelist these domains in the frame-src directive:

frame-src: 
  https://open.spotify.com 
  https://www.youtube.com 
  https://music.yandex.ru 
  https://w.soundcloud.com

Also check next.config.js for any headers configuration or middleware that 
restricts embedded content.

Test all embeds on:
- Desktop Chrome/Firefox/Safari
- Mobile iOS Safari
- Mobile Android Chrome

If CSP is an issue, update the config BEFORE deploying the embed changes.
```

---

## IMPLEMENTATION ORDER (Revised)

| # | Prompt | Status | Impact | Notes |
|---|--------|--------|--------|-------|
| 1 | P1 — Fix cover artwork | **NOT STARTED** | CRITICAL | 13 images needed; also fixes P8 homepage |
| 2 | P2 — Spotify/Yandex embed hero | **NOT STARTED** | HIGH | Replace placeholder div on music page |
| 3 | P4 — Interactive singles grid | **NOT STARTED** | HIGH | Add streaming links + play to cards |
| 4 | P3 — YouTube video section (music page) | **NOT STARTED** | MEDIUM | Videos page already covers this; add cross-link or mini section |
| 5 | P7 — Listen On redesign | **NOT STARTED** | MEDIUM | Add platform logos + brand colors |
| 6 | P5 — Stats banner | **NOT STARTED** | MEDIUM | Social proof on music page |
| 7 | P10 — Schema.org SEO | **NOT STARTED** | MEDIUM | JSON-LD + fix missing OG image |
| 8 | P9 — Homepage Instagram + teaser | **PARTIAL** | MEDIUM | Hero done; add IG preview + new release teaser |
| 9 | P12 — CSP headers | **NOT STARTED** | MEDIUM | Security best practice (embeds work without it) |
| 10 | P11 — Collaborations section | **NOT STARTED** | LOW-MEDIUM | Discovery |
| 11 | P6 — Social links polish | **✅ DONE** | — | Optionally add Discogs/Shazam, replace text icons with SVGs |
| 12 | P8 — Homepage music fix | **✅ MOSTLY DONE** | — | Depends on P1 cover images |

**Key dependency:** P1 (cover artwork) unblocks both the Music page AND homepage LatestRelease component.

**Data cleanup needed:** Fix `TODO_*` YouTube IDs in `discography.ts` — cross-reference with `videos.ts`.

**Missing assets checklist:**
- [ ] `/public/images/albums/` — 13 cover images (mia-kardia, soltera, par-shirkhani, kavkaz, ya-grek, kortsopon, monahos, kapkan, rasskazhi, panagia, dumanli, tanets-greka, za-toboi)
- [ ] `/public/images/og-image.jpg` — Open Graph share image

---

## QUICK REFERENCE — Key IDs & URLs

```
SPOTIFY ARTIST ID:    6PPuuN3cvmbyuvgrGbhXge
APPLE MUSIC ID:       839072119
YANDEX MUSIC ID:      3050547
YOUTUBE CHANNEL:      UC_25lDUqfZLnjvWxzPHGNmg
DEEZER ARTIST ID:     7144045
DISCOGS ID:           5270354
WIKIDATA:             Q65126751
INSTAGRAM HANDLE:     @alexandros_official
FACEBOOK PAGE:        alexandros.tsopozidis
TIKTOK:               @tsopozidis
BOOKING WHATSAPP:     +79383163034
SITE ACCENT COLOR:    ~#C9A96E (gold/tan)
```

## QUICK REFERENCE — Key Codebase Paths

```
PROJECT ROOT:           alexandros-tsopozidis-website/
PAGES:                  src/app/[locale]/{page}/page.tsx
HOME COMPONENTS:        src/components/home/
LAYOUT COMPONENTS:      src/components/layout/
COMMON COMPONENTS:      src/components/common/
DATA FILES:             src/lib/data/ (discography, videos, events, gallery, social-links)
TRANSLATIONS:           messages/{en,ru,el}.json
CONFIG:                 next.config.mjs, tailwind.config.ts
IMAGES:                 public/images/ (hero/, artist/, gallery/ exist; albums/ MISSING)
i18n:                   src/i18n/ (routing.ts, request.ts) + src/middleware.ts
ICON LIBRARY:           Lucide React (lucide-react@0.577.0)
ANIMATION:              Framer Motion (framer-motion@12.36.0)
```
