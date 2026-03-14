# Alexandros Tsopozidis Website — Full Upgrade Playbook

## Claude Code Implementation Guide (Music Page + Homepage)

---

## Site Overview

- **URL:** `https://tsopozidis-alexandros.com`
- **Languages:** EN (`/en/...`) and RU (`/ru/...`)
- **Stack:** Likely Next.js (bilingual routing, Vercel-style patterns)
- **Theme:** Dark (near-black background, gold/tan accent color `~#C9A96E`)
- **Booking:** WhatsApp `+79383163034` (contact: Liana)

---

## PART A: MUSIC PAGE (`/en/music` & `/ru/music`)

### Current State — What's Broken

From visual inspection (screenshot) and HTML audit:

1. **ALL cover artwork is missing** — Every single and the album shows a generic music note placeholder icon (gold `♫` on dark grey square). There are NO actual album/single cover images anywhere on the page. This is the #1 visual problem — the page looks like a template that was never finished.

2. **No embedded music players** — The "Latest Release" hero for "Mia Kardia" has platform link buttons (YouTube, Spotify, Apple Music, Yandex Music, Zvuk) but NO actual playable embed. Visitors cannot listen to anything without leaving the site.

3. **Singles grid is non-interactive** — The cards (Soltera, Par shirkhani, Kavkaz, Я грек, etc.) are just placeholder squares + title text. No streaming links per track, no play functionality, no hover states that do anything useful.

4. **No YouTube video embeds** — The artist has music videos with significant views (Kavkaz has ~383K YouTube views) but NONE are embedded.

5. **No social proof** — The artist has 310K Instagram followers and 10.4K Spotify monthly listeners. None of this is visible.

6. **Missing social links** — Footer shows only TT/VK/OK/TG. Missing: Instagram (310K!), Facebook (10.5K likes), YouTube, SoundCloud.

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

This is the single most impactful fix. Every release shows a placeholder music note icon.

```
PRIORITY: CRITICAL
PAGES: /en/music, /ru/music

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

```
PRIORITY: HIGH
PAGES: /en/music, /ru/music

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

```
PRIORITY: HIGH
PAGES: /en/music, /ru/music

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

```
PRIORITY: HIGH
PAGES: /en/music, /ru/music

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

```
PRIORITY: MEDIUM
PAGES: /en/music (and /ru/music with Russian labels)

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

```
PRIORITY: HIGH (quick win)
PAGES: ALL pages (footer), Music page, Contact page

The footer currently shows only: TT (TikTok), VK, OK, TG (Telegram)
This is missing the artist's BIGGEST platforms.

UPDATE the footer social links to include (in this order):
1. Instagram: https://www.instagram.com/alexandros_official/  (310K — this is THE main platform!)
2. Facebook: https://www.facebook.com/alexandros.tsopozidis/
3. YouTube: https://www.youtube.com/channel/UC_25lDUqfZLnjvWxzPHGNmg
4. TikTok: https://www.tiktok.com/@tsopozidis
5. VK: https://vk.com/alexandros_tsopozidis
6. OK: https://ok.ru/alexandros.tsopozidis
7. Telegram: https://t.me/tsopozidis

Use proper SVG icons for each platform. Check what icon library the project uses 
(react-icons, lucide, custom SVGs) and use the same for consistency.

Also update the "Listen On" section on the Music page to include SoundCloud:
SoundCloud: https://soundcloud.com/alexandrostsopozidis

And add Discogs link for credibility:
Discogs: https://www.discogs.com/artist/5270354-Alexandros-Tsopozidis
```

---

### PROMPT 7 — "Listen On" Section Visual Redesign

```
PRIORITY: MEDIUM
PAGES: /en/music, /ru/music

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

## PART B: HOMEPAGE (`/en` & `/ru`)

### Current Issues (from user report: "some links are plain, no images or linking")

The homepage likely mirrors the same pattern as the music page — sections that reference 
music, videos, or events with placeholder content instead of real media.

---

### PROMPT 8 — Homepage Music Section Fix

```
PRIORITY: HIGH
PAGES: /en, /ru (homepage)

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

```
PRIORITY: MEDIUM
PAGES: /en, /ru

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

```
PRIORITY: MEDIUM (SEO impact)
PAGES: /en/music, /ru/music, homepage

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

```
PRIORITY: LOW-MEDIUM
PAGES: /en/music, /ru/music

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

```
PRIORITY: CRITICAL (if embeds don't load)
PAGES: Site config / next.config.js / middleware

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

## IMPLEMENTATION ORDER

| # | Prompt | Est. Time | Impact | Notes |
|---|--------|-----------|--------|-------|
| 1 | P1 — Fix cover artwork | 30-60 min | CRITICAL | Transforms the page visually |
| 2 | P2 — Spotify/Yandex embed hero | 15 min | HIGH | Visitors can finally listen |
| 3 | P12 — CSP whitelist | 10 min | CRITICAL | Do BEFORE testing embeds |
| 4 | P6 — Fix social links | 15 min | HIGH | Quick win, site-wide |
| 5 | P3 — YouTube video embeds | 30 min | HIGH | Visual impact + engagement |
| 6 | P4 — Interactive singles grid | 45-60 min | HIGH | Full interactivity |
| 7 | P8 — Homepage music section fix | 30 min | HIGH | Fixes homepage UX |
| 8 | P5 — Stats banner | 20 min | MEDIUM | Social proof |
| 9 | P7 — Listen On redesign | 20 min | MEDIUM | Polish |
| 10 | P9 — Homepage hero + Instagram | 30 min | MEDIUM | Visual richness |
| 11 | P10 — Schema.org SEO | 15 min | MEDIUM | SEO boost |
| 12 | P11 — Collaborations section | 20 min | LOW-MEDIUM | Discovery |

**Total estimated time: 4-6 hours**

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
