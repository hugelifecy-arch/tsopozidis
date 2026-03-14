# Videos Page Rebuild — Alexandros Tsopozidis Official Website

## Objective

Rebuild `/en/videos` (and `/ru/videos`) from a flat 5-video gallery into a structured, sectioned media page with ~14–16 curated videos across 3 categories, stronger CTAs, and thumbnail-card layout (no heavy embeds).

**Live URL:** `https://tsopozidis-alexandros.com/en/videos`
**YouTube Channel:** `https://www.youtube.com/@tsopozidisalexandros`
**Stack:** Next.js 14, Tailwind CSS, next-intl (EN/RU/EL), Vercel

---

## IMPORTANT — Before You Start

### Step 0: Get the actual YouTube Video IDs

Go to `https://www.youtube.com/@tsopozidisalexandros/videos` and collect the YouTube video IDs for every video listed below. The video ID is the `v=XXXXXXXXXXX` parameter in YouTube URLs, or the 11-character string after `youtu.be/`.

**You MUST verify every ID below against the live channel. Some IDs may have changed or videos may have been re-uploaded.**

---

## Video Data — Master List

### Already on the current page (confirmed IDs from site source)

| # | Title | YouTube ID | Year | Views (approx) | Category |
|---|-------|-----------|------|-----------------|----------|
| 1 | Бродяга (feat. Elbrus Dzhanmirzoev) | `z9ASjQE6Q2Y` | 2017 | 49M+ | Top |
| 2 | Male Male | `o20LEgccjxY` | 2016 | 13M+ | Top |
| 3 | Kaciyorum-Fevgo | `F9rQSin9PIY` | 2019 | 4.5M+ | Top |
| 4 | Дай мне номер телефона | `Rxp_-wMKU5k` | 2018 | — | Top |
| 5 | Расскажи | `Ne_uRfKUUlk` | 2020 | — | Top |

### Must be added — LOOK UP IDs from YouTube channel

| # | Title | YouTube ID | Year | Views (approx) | Category |
|---|-------|-----------|------|-----------------|----------|
| 6 | Ты все потеряла (feat. Elbrus Dzhanmirzoev) | `__LOOKUP__` | 2016 | 31M+ | Top |
| 7 | MONAHOS-SHIRKHANI (REMIX) | `__LOOKUP__` | 2023 | 19M+ | Top |
| 8 | KAPKAN (Капкан) | `__LOOKUP__` | 2021 | 13M+ | Top |
| 9 | Я ГРЕК | `__LOOKUP__` | 2022 | 3.2M+ | Top |
| 10 | За Тобой | `__LOOKUP__` | 2018 | 3M+ | Top |
| 11 | Dumanli | `__LOOKUP__` | 2018 | 2.2M+ | Top |
| 12 | Mia Kardia | `__LOOKUP__` | 2025 | — | Latest |
| 13 | PAR SHIRKHANI | `__LOOKUP__` | 2024 | 1.1M+ | Latest |
| 14 | Kavkaz | `__LOOKUP__` | 2023 | — | Latest |

### Live / Special — LOOK UP from YouTube channel

| # | Title | YouTube ID | Year | Views | Category |
|---|-------|-----------|------|-------|----------|
| 15 | ЖАРА В БАКУ 2018 — Бродяга live | `__LOOKUP__` | 2018 | — | Live |
| 16 | Any festival / acoustic / TV clip | `__LOOKUP__` | — | — | Live |

> **Note:** Search the channel for any video with "live", "концерт", "фестиваль", "acoustic" in the title. Pick 2–4 of the strongest ones.
> Also check Facebook (https://www.facebook.com/alexandros.tsopozidis/) — a "Вечная любовь" premiere was teased ~6 days ago (as of mid-March 2026). If it has dropped, add it to Latest Releases.

---

## Architecture — Page Sections

```
┌─────────────────────────────────────────────┐
│  SECTION 1: Hero Banner                     │
│  Title + Subtitle + CTA buttons             │
├─────────────────────────────────────────────┤
│  SECTION 2: Top Videos (8 cards)            │
│  Thumbnail grid, sorted by views desc       │
├─────────────────────────────────────────────┤
│  SECTION 3: Latest Releases (3–4 cards)     │
│  Most recent official releases              │
├─────────────────────────────────────────────┤
│  SECTION 4: Live & Special (2–4 cards)      │
│  Festival, acoustic, TV appearances         │
├─────────────────────────────────────────────┤
│  SECTION 5: Bottom CTA + Subscribe          │
│  Booking CTA + YouTube Subscribe button     │
└─────────────────────────────────────────────┘
```

---

## Prompt 1 — Create the video data file

Create a new data file for all video content. This centralises all video metadata in one place and makes it easy to update.

```
Create a new file: src/data/videos.ts (or wherever the project keeps data files — check existing structure first).

Define a TypeScript type:

type VideoCategory = 'top' | 'latest' | 'live'

type Video = {
  id: string               // YouTube video ID
  title: string            // Display title
  titleRu: string          // Russian title (for /ru/ page)
  year: number
  views?: string           // e.g. "49M+" — optional for live/newer videos
  description?: string     // EN one-liner
  descriptionRu?: string   // RU one-liner
  category: VideoCategory
  featured?: boolean       // true for the 1–2 videos to auto-embed
  feat?: string            // featured artist name if collab
}

Export a const VIDEOS: Video[] array with all videos from the master list above.

Sort within each category:
- top: by views descending
- latest: by year descending
- live: manual order (best first)

Mark Бродяга and Ты все потеряла as featured: true (these are the only two that will auto-embed; the rest use thumbnail cards).
```

**IMPORTANT:** Replace all `__LOOKUP__` IDs with real YouTube IDs from the channel before proceeding.

---

## Prompt 2 — Build the VideoCard component

```
Create a reusable VideoCard component: src/components/VideoCard.tsx

Requirements:
- Accepts a Video object as prop
- Displays:
  - YouTube thumbnail using: https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg
  - Fallback to hqdefault.jpg if maxresdefault fails (use onError handler)
  - Title (use titleRu when locale is 'ru')
  - Year badge (small pill, top-left overlay on thumbnail)
  - Views badge (e.g. "49M+ views") — bottom-right overlay on thumbnail, only if views exists
  - feat. artist name below title if feat exists
  - One-line description below title (if exists)
- On click: opens YouTube video in new tab (https://www.youtube.com/watch?v={id})
- Add a play button overlay (centered, semi-transparent circle with triangle icon) on hover
- Tailwind styling:
  - Card with rounded-xl, overflow-hidden
  - Thumbnail aspect-video
  - Hover: scale-[1.02] transition, shadow-lg
  - Dark theme consistent with the rest of the site (check existing color palette — likely navy/dark backgrounds with gold accents)
- Responsive: 1 col mobile, 2 col tablet, 3–4 col desktop
- Do NOT embed YouTube iframes in cards — thumbnail + link only
```

---

## Prompt 3 — Build the FeaturedVideo component (embed)

```
Create a FeaturedVideo component: src/components/FeaturedVideo.tsx

This is for the 1–2 videos marked featured: true. These get an actual YouTube embed.

Requirements:
- Lazy-load the iframe: show thumbnail first, on click replace with YouTube iframe (lite-youtube pattern)
- Use: https://www.youtube.com/embed/{VIDEO_ID}?rel=0&modestbranding=1
- Aspect ratio 16:9
- Title, views, description below the embed
- Maximum 2 featured embeds on the page — more than that kills performance
```

---

## Prompt 4 — Rebuild the Videos page

```
Rewrite the Videos page at the appropriate route file (likely src/app/[locale]/videos/page.tsx or similar — find the existing file first).

Structure the page with these sections:

### Section 1 — Hero
- H1: "Official Videos" (EN) / "Официальные видео" (RU)
- Subtitle: "Watch Alexandros Tsopozidis' most popular music videos, latest releases, and live performances." (EN)
  Russian: "Смотрите самые популярные клипы, новые релизы и живые выступления Александроса Тсопозидиса."
- 3 CTA buttons (same style as rest of site):
  1. "Watch on YouTube" → https://www.youtube.com/@tsopozidisalexandros (target _blank)
  2. "Book Alexandros" → https://wa.me/79383163034
  3. "Subscribe" → https://www.youtube.com/@tsopozidisalexandros?sub_confirmation=1 (target _blank)

### Section 2 — Top Videos
- Section heading: "Top Videos" / "Лучшие видео"
- Subheading: "The biggest hits with over 100 million combined views" / "Самые популярные хиты с более чем 100 миллионами просмотров"
- First 1–2 items: use FeaturedVideo component (embedded, lazy)
- Remaining 6 items: use VideoCard grid (thumbnail cards)
- Filter VIDEOS array where category === 'top'
- Responsive grid: 1 col mobile / 2 col md / 3 col lg / 4 col xl

### Section 3 — Latest Releases
- Section heading: "Latest Releases" / "Новые релизы"
- Subheading: "New music from Alexandros" / "Новая музыка от Александроса"
- Use VideoCard grid for all items
- Filter VIDEOS array where category === 'latest'
- Grid: 1 col mobile / 2 col md / 3 col lg

### Section 4 — Live & Special Performances
- Section heading: "Live & Special Performances" / "Живые выступления"
- Subheading: "Festival appearances, acoustic sessions, and more" / "Фестивали, акустические сессии и многое другое"
- Use VideoCard grid
- Filter VIDEOS array where category === 'live'
- Grid: 1 col mobile / 2 col md / 3 col lg

### Section 5 — Bottom CTA
- Centered block with:
  - Heading: "Book Alexandros" / "Забронировать Александроса"
  - Text: "Available for weddings, private events, festivals, and corporate performances." /
    "Доступен для свадеб, частных мероприятий, фестивалей и корпоративов."
  - 3 buttons:
    1. WhatsApp → https://wa.me/79383163034
    2. Telegram → https://t.me/tsopozidis
    3. Contact → /en/contact (or /ru/contact)
  - Below buttons: YouTube subscribe link styled as secondary CTA
    "Subscribe on YouTube" → https://www.youtube.com/@tsopozidisalexandros?sub_confirmation=1

Use the site's existing section spacing, container widths, and color tokens. Do NOT invent new design patterns — match the existing About/Music/Gallery pages.
```

---

## Prompt 5 — Add i18n translations

```
Find the existing translation/locale files (likely in messages/en.json and messages/ru.json or similar — check project structure).

Add the following keys under a "videos" namespace:

EN:
{
  "videos": {
    "pageTitle": "Official Videos",
    "pageSubtitle": "Watch Alexandros Tsopozidis' most popular music videos, latest releases, and live performances.",
    "topVideos": "Top Videos",
    "topVideosSubtitle": "The biggest hits with over 100 million combined views",
    "latestReleases": "Latest Releases",
    "latestReleasesSubtitle": "New music from Alexandros",
    "livePerformances": "Live & Special Performances",
    "livePerformancesSubtitle": "Festival appearances, acoustic sessions, and more",
    "bookArtist": "Book Alexandros",
    "bookDescription": "Available for weddings, private events, festivals, and corporate performances.",
    "watchOnYoutube": "Watch on YouTube",
    "subscribe": "Subscribe on YouTube",
    "views": "views",
    "watchVideo": "Watch Video"
  }
}

RU:
{
  "videos": {
    "pageTitle": "Официальные видео",
    "pageSubtitle": "Смотрите самые популярные клипы, новые релизы и живые выступления Александроса Тсопозидиса.",
    "topVideos": "Лучшие видео",
    "topVideosSubtitle": "Самые популярные хиты с более чем 100 миллионами просмотров",
    "latestReleases": "Новые релизы",
    "latestReleasesSubtitle": "Новая музыка от Александроса",
    "livePerformances": "Живые выступления",
    "livePerformancesSubtitle": "Фестивали, акустические сессии и многое другое",
    "bookArtist": "Забронировать Александроса",
    "bookDescription": "Доступен для свадеб, частных мероприятий, фестивалей и корпоративов.",
    "watchOnYoutube": "Смотреть на YouTube",
    "subscribe": "Подписаться на YouTube",
    "views": "просмотров",
    "watchVideo": "Смотреть видео"
  }
}

Wire all hardcoded strings in the Videos page and VideoCard/FeaturedVideo components to use useTranslations('videos') from next-intl.
```

---

## Prompt 6 — SEO & metadata

```
Update the Videos page metadata for SEO.

In the page file, export metadata (or use generateMetadata):

EN:
- title: "Music Videos & Live Performances — Alexandros Tsopozidis"
- description: "Watch official music videos, latest releases, and live performances by Alexandros Tsopozidis. Over 100 million views on YouTube."
- og:title: same as title
- og:description: same as description
- og:image: use Бродяга maxresdefault thumbnail or site OG image

RU:
- title: "Клипы и живые выступления — Александрос Тсопозидис"
- description: "Смотрите официальные клипы, новые релизы и живые выступления Александроса Тсопозидиса. Более 100 миллионов просмотров на YouTube."

Also add Schema.org JSON-LD VideoObject markup for the top 3 videos (Бродяга, Ты все потеряла, MONAHOS-SHIRKHANI REMIX):

{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Бродяга — Alexandros Tsopozidis feat. Elbrus Dzhanmirzoev",
  "description": "Official music video",
  "thumbnailUrl": "https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg",
  "uploadDate": "2017-01-01",
  "contentUrl": "https://www.youtube.com/watch?v={VIDEO_ID}",
  "embedUrl": "https://www.youtube.com/embed/{VIDEO_ID}",
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": "https://schema.org/WatchAction",
    "userInteractionCount": 49000000
  }
}

Add this as a <script type="application/ld+json"> in the page head. Use an array of 3 VideoObject items.
```

---

## Prompt 7 — Thumbnail image optimization

```
The current page uses Next.js Image component with YouTube thumbnails:
https://img.youtube.com/vi/{ID}/maxresdefault.jpg

Ensure all VideoCard and FeaturedVideo components:
1. Use next/image with proper width/height and sizes prop
2. Set priority={true} only for above-fold items (first 4 cards)
3. Set loading="lazy" for everything below the fold
4. Add meaningful alt text: "{title} — Alexandros Tsopozidis music video"
5. Add a blurDataURL or placeholder="blur" if the project supports it

This is critical for Core Web Vitals — the current page loads full-size thumbnails without optimization.
```

---

## Prompt 8 — QA checklist

After all prompts are applied, verify:

```
Run through this checklist:

1. [ ] /en/videos loads with all 5 sections visible
2. [ ] /ru/videos loads with all Russian translations
3. [ ] Top Videos section shows 8 videos sorted by views (highest first)
4. [ ] Latest Releases section shows 3–4 videos (newest first)
5. [ ] Live section shows 2–4 videos
6. [ ] Featured videos (Бродяга, Ты все потеряла) lazy-load embeds on click
7. [ ] All other videos are thumbnail cards that open YouTube in new tab
8. [ ] All view counts display correctly (formatted: "49M+", "31M+", etc.)
9. [ ] Play button overlay appears on hover for all video cards
10. [ ] Mobile responsive: single column, cards stack cleanly
11. [ ] Bottom CTA has WhatsApp, Telegram, Contact buttons that work
12. [ ] YouTube Subscribe link works and opens sub confirmation
13. [ ] Page speed: run Lighthouse — should score 90+ on Performance
14. [ ] No YouTube iframes load on initial page load (lazy only)
15. [ ] Schema.org JSON-LD is present in page source (check with Rich Results Test)
16. [ ] All thumbnail images load (no broken images)
17. [ ] Hreflang tags exist for both /en/videos and /ru/videos
18. [ ] Meta description appears in page source for both locales
```

---

## Execution Order

| Step | Prompt | Dependency |
|------|--------|------------|
| 0 | **Manual:** Look up all YouTube video IDs from channel | — |
| 1 | Prompt 1: Video data file | Step 0 |
| 2 | Prompt 2: VideoCard component | Step 1 |
| 3 | Prompt 3: FeaturedVideo component | Step 1 |
| 4 | Prompt 4: Rebuild Videos page | Steps 1–3 |
| 5 | Prompt 5: i18n translations | Step 4 |
| 6 | Prompt 6: SEO & metadata | Step 4 |
| 7 | Prompt 7: Image optimization | Step 4 |
| 8 | Prompt 8: QA checklist | Steps 1–7 |

---

## Notes

- The Facebook page teased a "Вечная любовь" (Eternal Love) premiere as of early March 2026. If this video has been published by the time you run these prompts, add it to the Latest Releases section.
- The YouTube channel handle is `@tsopozidisalexandros` — this is confirmed from the site's existing links.
- The current site uses WhatsApp booking at `+7 938 316 30 34` — keep this consistent.
- Existing site colour palette appears to be dark/navy backgrounds with gold/warm accents — match existing tokens, do not introduce new colours.
- The `Бродяга` video is listed on the current site as "22M+ views" but external sources show ~49M. Always use the latest count from YouTube when populating data.
