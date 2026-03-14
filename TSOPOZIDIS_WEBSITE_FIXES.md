# Alexandros Tsopozidis — Website Improvement Playbook

## Claude Code Master Prompt Guide

**Site:** `tsopozidis-alexandros.com`
**Stack:** Next.js 14 + Tailwind CSS + next-intl (EN/RU/EL) + Vercel
**Repo:** Run each prompt sequentially in Claude Code from the project root.
**Priority:** Prompts are ordered by impact — Phase 1 is critical, do not skip.

---

## PHASE 1: SEARCH ENGINE INDEXATION (CRITICAL — DO FIRST)

> The site is currently **invisible to Google and Yandex**. Nothing else matters until this is fixed.

### Prompt 1.1 — robots.txt

```
Create a public/robots.txt file that:
- Allows all user agents to crawl all paths
- Points to the sitemap at https://tsopozidis-alexandros.com/sitemap.xml
- Disallows nothing (we want full indexation)
- Adds a specific allow for Yandex bot

The file should look professional and include a comment header identifying the site.
```

### Prompt 1.2 — XML Sitemap (Dynamic)

```
Create a dynamic XML sitemap for the site using Next.js App Router's sitemap.ts convention.

Requirements:
- Generate entries for ALL pages: home, about, music, videos, gallery, events, contact
- Generate entries for ALL 3 locale variants: /en/, /ru/, /el/
- Each URL must include <lastmod> with the current date
- Each URL must include <changefreq> (weekly for home/music/events, monthly for about/gallery/videos)
- Each URL must include <priority> (1.0 for home, 0.8 for music/videos/events, 0.6 for about/gallery)
- The base URL is https://tsopozidis-alexandros.com
- Output should be accessible at /sitemap.xml

If the project uses App Router, create app/sitemap.ts.
If it uses Pages Router, create pages/sitemap.xml.tsx with getServerSideProps.

Verify the sitemap renders correctly by checking the route.
```

### Prompt 1.3 — hreflang Tags (All Pages)

```
Implement hreflang tags across the entire site.

For every page, add the following <link> tags to the <head>:
- <link rel="alternate" hreflang="en" href="https://tsopozidis-alexandros.com/en/{path}" />
- <link rel="alternate" hreflang="ru" href="https://tsopozidis-alexandros.com/ru/{path}" />
- <link rel="alternate" hreflang="el" href="https://tsopozidis-alexandros.com/el/{path}" />
- <link rel="alternate" hreflang="x-default" href="https://tsopozidis-alexandros.com/en/{path}" />

Where {path} is the page path (empty for homepage, "about" for about page, etc.)

Implementation approach:
- If using next-intl with App Router, add these in the root layout.tsx or a shared metadata generation function
- Use the current locale and pathname from next-intl to dynamically generate the correct URLs
- Ensure these tags appear on EVERY page, not just the homepage
- Verify by viewing page source on at least 3 different pages
```

### Prompt 1.4 — Canonical URL Tags

```
Add self-referencing canonical URL tags to every page.

For each page, add to <head>:
<link rel="canonical" href="https://tsopozidis-alexandros.com/{locale}/{path}" />

The canonical should always point to the exact current URL (including the locale prefix).

Implementation:
- Add this alongside the hreflang implementation in the shared layout or metadata function
- Use the current locale and pathname to construct the full canonical URL
- Verify canonical tags are present and correct on at least 3 pages
```

### Prompt 1.5 — Meta Descriptions (All 18 Pages)

```
Add unique meta descriptions to every page in every language. Use Next.js metadata API.

Here are the descriptions to implement:

HOME PAGE:
- EN: "Alexandros Tsopozidis — official website. Greek soul, Eastern sound. Listen to Бродяга, Mia Kardia, Kavkaz and more. Book for events worldwide."
- RU: "Александрос Цопозидис — официальный сайт. Греческая душа, восточный звук. Слушайте Бродяга, Mia Kardia, Кавказ. Заказать на мероприятие."
- EL: "Αλέξανδρος Τσοποζίδης — επίσημη ιστοσελίδα. Ελληνική ψυχή, ανατολίτικος ήχος. Ακούστε Бродяга, Mia Kardia, Kavkaz. Κρατήσεις εκδηλώσεων."

ABOUT PAGE:
- EN: "The story of Alexandros Tsopozidis — from Pontic Greek roots in Georgia to 22M+ YouTube views. Blending Caucasian, Greek and Eastern music traditions."
- RU: "История Александроса Цопозидиса — от понтийских греческих корней в Грузии до 22М+ просмотров на YouTube. Кавказская и греческая музыка."
- EL: "Η ιστορία του Αλέξανδρου Τσοποζίδη — από τις ποντιακές ρίζες στη Γεωργία στα 22M+ views στο YouTube."

MUSIC PAGE:
- EN: "Listen to Alexandros Tsopozidis — Mia Kardia, Soltera, Kavkaz, Бродяга and more on Spotify, Apple Music, Yandex Music, YouTube and Zvuk."
- RU: "Слушайте Александрос Цопозидис — Mia Kardia, Soltera, Кавказ, Бродяга на Spotify, Apple Music, Яндекс Музыка, YouTube и Звук."
- EL: "Ακούστε Αλέξανδρος Τσοποζίδης — Mia Kardia, Soltera, Kavkaz, Бродяга σε Spotify, Apple Music, YouTube και άλλες πλατφόρμες."

VIDEOS PAGE:
- EN: "Watch Alexandros Tsopozidis music videos — Бродяга (22M+ views), Male Male (11M+ views), Kaciyorum, and live performances."
- RU: "Смотрите клипы Александроса Цопозидиса — Бродяга (22М+ просмотров), Male Male (11М+), Kaciyorum и живые выступления."
- EL: "Δείτε τα βιντεοκλίπ του Αλέξανδρου Τσοποζίδη — Бродяга (22M+ views), Male Male (11M+), Kaciyorum και ζωντανές εμφανίσεις."

GALLERY PAGE:
- EN: "Alexandros Tsopozidis photo gallery — concert photos, behind the scenes, and press images from performances worldwide."
- RU: "Фотогалерея Александроса Цопозидиса — концертные фото, закулисье и пресс-фото с выступлений по всему миру."
- EL: "Φωτογραφίες Αλέξανδρου Τσοποζίδη — φωτογραφίες από συναυλίες, παρασκήνια και εμφανίσεις σε όλο τον κόσμο."

EVENTS PAGE:
- EN: "Alexandros Tsopozidis upcoming shows and past events. Book for concerts, corporate events, weddings and private parties. Contact: +7 938 316 30 34."
- RU: "Александрос Цопозидис — концерты и мероприятия. Заказать на корпоратив, свадьбу, частный праздник. Букинг: +7 938 316 30 34."
- EL: "Αλέξανδρος Τσοποζίδης — εκδηλώσεις και συναυλίες. Κρατήσεις για εταιρικά events, γάμους και ιδιωτικές εκδηλώσεις."

Implement using generateMetadata() or the metadata export in each page's layout/page file.
Also set the page <title> tags per page per language if not already done.
```

---

## PHASE 2: SOCIAL SHARING & OPEN GRAPH TAGS

### Prompt 2.1 — Open Graph + Twitter Card + VK Meta Tags

```
Add comprehensive social sharing meta tags to every page. These must be dynamic per page and per language.

For EVERY page, add these Open Graph tags:
- og:title — same as page title
- og:description — same as meta description
- og:url — canonical URL of the page
- og:type — "music.musician" for home/about, "website" for other pages
- og:image — "https://tsopozidis-alexandros.com/images/og-default.jpg" (1200x630px)
- og:image:width — 1200
- og:image:height — 630
- og:site_name — "Alexandros Tsopozidis"
- og:locale — "en_US" / "ru_RU" / "el_GR" based on current language
- og:locale:alternate — the other two locales

Twitter Card tags:
- twitter:card — "summary_large_image"
- twitter:title — same as og:title
- twitter:description — same as og:description
- twitter:image — same as og:image

VK-specific (important — primary audience shares on VK):
- vk:image — same as og:image

Implementation:
- Use Next.js metadata API (generateMetadata or metadata export)
- Create a shared utility function that generates all social meta tags given title, description, url, and locale
- Call this utility in every page's metadata generation
- Ensure the og:image file exists at public/images/og-default.jpg (create a placeholder note if the image doesn't exist yet)
```

### Prompt 2.2 — Per-Page OG Images (Optional Enhancement)

```
If the project has an app/api/ directory or supports Next.js OG image generation:

Create dynamic OG images using next/og (the @vercel/og package) for the key pages:
- Homepage: Artist name + "Greek Soul · Eastern Sound" tagline + artist photo overlay
- Music page: "Listen Now" + latest release artwork
- Videos page: "Watch" + Бродяга thumbnail + "22M+ views"

Create at app/api/og/route.tsx (or similar) using ImageResponse from next/og.

If the project does NOT support next/og, skip this and note that static OG images should be created manually:
- /public/images/og-default.jpg (1200x630 — general sharing)
- /public/images/og-music.jpg (1200x630 — music page)
- /public/images/og-videos.jpg (1200x630 — videos page)
```

---

## PHASE 3: STRUCTURED DATA (SCHEMA.ORG)

### Prompt 3.1 — MusicArtist Schema (About Page)

```
Add JSON-LD structured data to the About page for Schema.org MusicArtist.

Create a <script type="application/ld+json"> block in the About page with:

{
  "@context": "https://schema.org",
  "@type": "MusicArtist",
  "name": "Alexandros Tsopozidis",
  "alternateName": ["Александрос Цопозидис", "Αλέξανδρος Τσοποζίδης", "Alexandros Tsopozidis"],
  "description": "Greek-Caucasian singer blending Pontic Greek, Eastern and pop traditions. Known for Бродяга (22M+ YouTube views).",
  "url": "https://tsopozidis-alexandros.com",
  "image": "https://tsopozidis-alexandros.com/images/artist/portrait-balcony.jpg",
  "birthDate": "1986-01-01",
  "birthPlace": {
    "@type": "Place",
    "name": "Sameba (Guniakala), Georgia"
  },
  "nationality": "Greek",
  "genre": ["Greek Pop", "Eastern Music", "Caucasian Music", "Pontic Greek Music"],
  "sameAs": [
    "https://open.spotify.com/artist/6PPuuN3cvmbyuvgrGbhXge",
    "https://music.apple.com/artist/alexandros-tsopozidis/839072119",
    "https://www.youtube.com/channel/UC_25lDUqfZLnjvWxzPHGNmg",
    "https://music.yandex.ru/artist/3050547",
    "https://www.instagram.com/alexandros_official/",
    "https://vk.com/alexandros_tsopozidis",
    "https://www.tiktok.com/@tsopozidis",
    "https://t.me/tsopozidis",
    "https://ok.ru/alexandros.tsopozidis",
    "https://www.facebook.com/alexandros.tsopozidis/",
    "https://ru.wikipedia.org/wiki/Тсопозидис,_Александрос",
    "https://www.wikidata.org/wiki/Q65126751"
  ],
  "award": "9 Волна Award for Contribution to Ethnic Music (2014)"
}

Place this in a reusable component like <JsonLd data={...} /> and include it on the About page.
Also add a simpler version on the homepage.
```

### Prompt 3.2 — WebSite Schema (Homepage)

```
Add JSON-LD structured data to the homepage for Schema.org WebSite.

{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Alexandros Tsopozidis — Official Website",
  "alternateName": "Александрос Цопозидис",
  "url": "https://tsopozidis-alexandros.com",
  "inLanguage": ["en", "ru", "el"],
  "description": "Official website of Alexandros Tsopozidis. Greek soul, Eastern sound.",
  "publisher": {
    "@type": "Person",
    "name": "Alexandros Tsopozidis"
  }
}

Add this to the homepage layout alongside the MusicArtist schema.
```

### Prompt 3.3 — MusicRecording Schema (Music Page)

```
On the Music page, add JSON-LD for each song/release listed.

Create an array of MusicRecording schemas for the discography:

[
  {
    "@type": "MusicRecording",
    "name": "Mia Kardia",
    "datePublished": "2025",
    "byArtist": { "@type": "MusicArtist", "name": "Alexandros Tsopozidis" },
    "url": "https://tsopozidis-alexandros.com/en/music"
  },
  {
    "@type": "MusicRecording",
    "name": "Soltera",
    "datePublished": "2025",
    "byArtist": { "@type": "MusicArtist", "name": "Alexandros Tsopozidis" },
    "contributor": { "@type": "MusicArtist", "name": "El Pontios" }
  },
  {
    "@type": "MusicRecording",
    "name": "Par shirkhani",
    "datePublished": "2024",
    "byArtist": { "@type": "MusicArtist", "name": "Alexandros Tsopozidis" }
  },
  {
    "@type": "MusicRecording",
    "name": "Kavkaz",
    "datePublished": "2023",
    "byArtist": { "@type": "MusicArtist", "name": "Alexandros Tsopozidis" }
  },
  {
    "@type": "MusicRecording",
    "name": "Я грек",
    "datePublished": "2022",
    "byArtist": { "@type": "MusicArtist", "name": "Alexandros Tsopozidis" }
  }
]

Wrap in @context and @graph if placing multiple schemas on one page.
If the music data comes from a data file or CMS, generate the schemas dynamically from that source.
```

---

## PHASE 4: ANALYTICS & TRACKING

### Prompt 4.1 — Google Analytics 4 + Yandex Metrica

```
Install Google Analytics 4 and Yandex Metrica on the site.

GA4:
- Add the GA4 script tag using next/script with strategy="afterInteractive"
- The measurement ID will be provided later — use a placeholder environment variable: NEXT_PUBLIC_GA4_ID
- Create a components/Analytics.tsx component that renders the GA4 script
- Include in the root layout

Template for GA4:
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
  strategy="afterInteractive"
/>
<Script id="ga4" strategy="afterInteractive">
{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
`}
</Script>

Yandex Metrica:
- Add Yandex Metrica script with placeholder: NEXT_PUBLIC_YANDEX_METRICA_ID
- Enable webvisor (session recordings), clickmap, and trackLinks
- Include in the same Analytics component

Template for Yandex Metrica:
<Script id="yandex-metrica" strategy="afterInteractive">
{`
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  ym(${process.env.NEXT_PUBLIC_YANDEX_METRICA_ID}, "init", {
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true,
    webvisor:true
  });
`}
</Script>

Add both IDs to .env.example with placeholder values and document in README.
```

### Prompt 4.2 — UTM Parameters on External Links

```
Find ALL external links on the site (streaming platforms, social media, WhatsApp booking) and add UTM parameters for tracking.

Rules:
- All streaming platform links (Spotify, Apple Music, YouTube, Yandex Music, Zvuk) should get: ?utm_source=website&utm_medium=streaming_link&utm_campaign=artist_site
- The WhatsApp booking link should become: https://wa.me/79383163034?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20booking%20Alexandros%20Tsopozidis%20for%20an%20event.
- Social media footer links (TikTok, VK, OK, Telegram) should get: ?utm_source=website&utm_medium=social_link&utm_campaign=artist_site

Create a utility function like getTrackedUrl(baseUrl, medium, campaign) to standardize this across the codebase.

Also: add a pre-filled WhatsApp message to the booking link (in Russian since it's the primary audience):
https://wa.me/79383163034?text=Здравствуйте!%20Хочу%20узнать%20о%20букинге%20Александроса%20Цопозидиса%20на%20мероприятие.

If the locale is EN or EL, use the English version of the pre-filled message.
```

---

## PHASE 5: UX IMPROVEMENTS

### Prompt 5.1 — Language Switcher Enhancement

```
Improve the language switcher from plain "EN/RU/EL" text to a more visible and user-friendly component.

Requirements:
- Replace the current text-based toggle with a dropdown or pill-style selector
- Show the language name in its native script: "English", "Русский", "Ελληνικά"
- Optionally include small flag emoji or flag icons: 🇬🇧 🇷🇺 🇬🇷
- On desktop: show as a horizontal pill group or dropdown in the header
- On mobile: make it prominent in the mobile navigation menu (not buried)
- Preserve the current path when switching language (e.g., /en/about → /ru/about)
- Highlight the currently active language
- Style with Tailwind to match the existing dark/gold aesthetic of the site

Use the existing next-intl routing setup — just update the UI component.
```

### Prompt 5.2 — Booking Contact Form

```
Add a professional booking inquiry form alongside the existing WhatsApp CTA.

Create a new Contact/Booking section or page with:

Form fields:
- Name (required)
- Email (required)
- Phone (optional)
- Event Type (dropdown: Corporate Event, Wedding, Private Party, Festival, Concert, Other)
- Event Date (date picker)
- Event Location / City (text)
- Message / Details (textarea)
- Submit button

On submit:
- Send the data to a serverless API route (app/api/booking/route.ts)
- The API route should forward the form data as an email via a service like Resend, or save to a Google Sheet via Google Sheets API
- For now, just log the data to console and return a success response — the email integration can be added later
- Show a success message: "Thank you! We'll get back to you within 24 hours." / "Спасибо! Мы ответим вам в течение 24 часов."
- Include a note below the form: "For urgent inquiries, contact via WhatsApp: +7 938 316 30 34"

Translate all form labels and messages into RU and EL using next-intl.

Style:
- Dark theme matching the site aesthetic
- Gold accent on the submit button
- Clean, professional layout
- Mobile responsive
```

### Prompt 5.3 — Past Events Population

```
Add past event data to the Events page.

Create a data file (e.g., data/events.ts or a JSON file) with past events:

Past Events:
1. Кавказ Мьюзик Фест 2022 — August 2022, Russia
2. Жара Festival — Summer 2018, Baku, Azerbaijan
3. Карнавала 2018 (headline with Митя Фомин) — May 2018, Gelendzhik, Russia
4. Звёзды Востока Concert (Восток FM) — November 2018, Moscow, Russia
5. 9 Волна Award Ceremony — May 2014, Moscow, Russia
6. 9 Волна Award Ceremony — March 2013, Russia
7. Greek Youth Party (Московское общество греков) — March 2021, Moscow, Russia

For each event, include:
- title (in current locale language)
- date
- venue/location
- type: "festival" | "concert" | "award" | "private"
- optional: image URL placeholder

Display these under the "Past Shows" tab on the Events page.
Style each event as a card with date, title, location, and event type badge.
Sort by date descending (most recent first).

Make sure the "Upcoming Shows" tab still shows the "New dates coming soon" message with social follow links.
```

### Prompt 5.4 — Telegram Channel Signup CTA

```
Add a Telegram channel signup call-to-action to the site.

Implementation:
1. Create a subtle sticky banner or floating button that appears on scroll (after the user scrolls past the hero section)
2. The CTA should say:
   - EN: "Get new releases first → Join Telegram"
   - RU: "Узнавайте о новинках первыми → Telegram канал"
   - EL: "Μάθετε πρώτοι για νέες κυκλοφορίες → Telegram"
3. Link to: https://t.me/tsopozidis
4. Include the Telegram icon (use an SVG or the Telegram icon from a library)
5. Add a dismiss button (X) that hides the banner for the session (use sessionStorage)
6. Style: dark background with gold accent text, matching the site theme
7. Position: bottom of viewport on mobile, bottom-right corner on desktop

Also add a Telegram signup section in the footer, between the social links and the copyright:
"Подпишитесь на Telegram для анонсов новых треков и концертов" with a button.
```

### Prompt 5.5 — Homepage "Coming Soon" Teaser for Вечная любовь

```
Add a "Coming Soon" teaser section on the homepage for the upcoming release "Вечная любовь".

Place it between the "Latest Release" (Mia Kardia) section and "The Story" section.

Content:
- Section title: "Coming Soon" / "Скоро" / "Σύντομα"
- Track name: "Вечная любовь" (Eternal Love)
- Subtitle: "New single coming soon" / "Новый сингл скоро" / "Νέο single σύντομα"
- A "Notify Me" CTA that links to the Telegram channel: https://t.me/tsopozidis
- Visual: a subtle animated gradient or pulsing glow effect to create anticipation
- If there's a teaser image or short video clip available, display it; otherwise use a placeholder with an artistic blur/gradient treatment

Style:
- Full-width section with dark background
- Gold accent text for the track name
- Subtle animation (e.g., gentle pulse on the track name, or a slow gradient shift)
- Keep it elegant and minimal — this is a teaser, not a full release announcement
```

---

## PHASE 6: YOUTUBE PERFORMANCE OPTIMIZATION

### Prompt 6.1 — YouTube Facade / Lite Embed

```
Replace YouTube iframe embeds with a lightweight facade pattern to improve page load performance.

The Videos page and homepage video section currently load full YouTube iframes which are heavy (~1.5MB each).

Implementation:
1. Create a component: components/YouTubeFacade.tsx (or .jsx)
2. The component should:
   - Display the YouTube video thumbnail as a static image (using img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg)
   - Show a play button overlay (custom SVG, styled like YouTube's play button)
   - On click, replace the thumbnail with the actual YouTube iframe embed
   - Use the Next.js Image component for the thumbnail (already using _next/image)
   - Accept props: videoId, title, views (optional)
3. Replace all current YouTube embed implementations with this component
4. Add loading="lazy" to the thumbnail images for videos below the fold

Video IDs to handle (from the current site):
- z9ASjQE6Q2Y — Бродяга
- o20LEgccjxY — Male Male
- F9rQSin9PIY — Kaciyorum
- Rxp_-wMKU5k — Дай мне номер телефона
- Ne_uRfKUUlk — Расскажи

This should reduce initial page weight by 3-5MB on the Videos page.
```

---

## PHASE 7: CONTENT ENHANCEMENTS

### Prompt 7.1 — Enriched Artist Bio with Timeline

```
Enhance the About page bio with a visual career timeline.

Add a timeline section below the narrative bio text. Use a vertical timeline layout with the following milestones:

Timeline data:
- 1986 — Born in Sameba (Guniakala), Georgia. Pontic Greek heritage.
- 1998 — Moved to Paphos, Cyprus at age 12. Trained at Cyprus football academy.
- 2011 — Left football for music. Met Russian producer Kemran Amirov.
- 2011 — Debut duet with Eldar Dalgatov: "Может ты вернёшься"
- 2013 (Mar) — First 9 Волна award
- 2013 (Oct) — "Male Male" music video released (11M+ YouTube views)
- 2013 — Collaboration with Faxo, filmed on Cyprus
- 2014 (May) — 9 Волна Award for contribution to ethnic music
- 2015 — Released "Армяне и греки — братья навеки"
- 2017 (Jul) — "Бродяга" with Elbrus Dzhanmirzoev (22M+ YouTube views)
- 2017 — "Дай мне номер телефона" released
- 2018 (May) — Headlined Карнавала 2018 with Митя Фомин (Gelendzhik)
- 2018 (Summer) — Performed at Жара Festival, Baku, Azerbaijan
- 2018 (Nov) — "Звёзды Востока" concert with Восток FM, Moscow
- 2018 — Album "За тобой" released
- 2022 (Aug) — Performed at Кавказ Мьюзик Фест
- 2022 — Released "Я грек"
- 2023 — Released "Kavkaz"
- 2024 — Released "Par shirkhani"
- 2025 — Released "Mia Kardia" and "Soltera" (feat. El Pontios)
- 2025 — "Вечная любовь" — coming soon

Timeline design:
- Vertical line running down the left (or center on desktop)
- Each milestone is a card with year, event description
- Alternate left/right on desktop, all left-aligned on mobile
- Use gold dots on the timeline for each milestone
- Highlight the major milestones (Бродяга, Жара, 9 Волна awards) with a larger or gold-colored card

Translate all timeline entries for RU and EL locales using next-intl.
```

### Prompt 7.2 — Press Kit / EPK Page

```
Create a new Press Kit / EPK (Electronic Press Kit) page.

Route: /en/press (and /ru/press, /el/press)
Add "Press" to the navigation menu (after Events or as a sub-item).

Page content:

1. HEADER SECTION:
   - Title: "Press Kit" / "Пресс-кит" / "Press Kit"
   - Subtitle: "For media, event organizers, and booking agents"

2. QUICK FACTS:
   - Full name: Alexandros Tsopozidis (Александрос Цопозидис / Αλέξανδρος Τσοποζίδης)
   - Origin: Sameba, Georgia → Paphos, Cyprus
   - Genre: Greek-Eastern Pop, Caucasian Music, Pontic Greek
   - Languages: Russian, Greek, Pontic Greek
   - Notable: 22M+ YouTube views (Бродяга), 310K Instagram followers
   - Award: 9 Волна (2014) — Contribution to Ethnic Music
   - Booking: +7 938 316 30 34 (Liana)

3. BIO SECTIONS:
   - Short bio (50 words) — for social media and brief mentions
   - Medium bio (150 words) — for event programs and press releases
   - Full bio — link to /about page

4. PRESS PHOTOS SECTION:
   - Display placeholder cards with "Download" buttons for:
     - Landscape press photo (horizontal, 3000px wide)
     - Portrait press photo (vertical, for posters)
     - Logo / artist name wordmark
   - Note: "For hi-res images, contact booking@tsopozidis-alexandros.com"
   - If actual images exist in /public/images/artist/, link to them

5. BOOKING INFORMATION:
   - Available for: Corporate Events, Festivals, Weddings, Private Events, TV/Radio Appearances
   - Booking contact: WhatsApp +7 938 316 30 34 and/or the contact form
   - A CTA button linking to the booking form or WhatsApp

Style: Clean, professional, minimal — this page is for industry people, not fans.
Match the existing site theme but slightly more corporate in tone.
```

---

## PHASE 8: PERFORMANCE & TECHNICAL CLEANUP

### Prompt 8.1 — Image Alt Text Audit & Fix

```
Audit all <img> and <Image> tags across the entire site and ensure every image has:
1. Descriptive alt text in the current locale language
2. Alt text that includes relevant keywords for SEO

Fix any missing or generic alt text. Examples of good alt text:
- Artist portrait: "Alexandros Tsopozidis — Greek-Eastern singer, portrait photo"
- Video thumbnail for Бродяга: "Бродяга music video thumbnail — Alexandros Tsopozidis feat. Elbrus Dzhanmirzoev"
- Gallery photo: "Alexandros Tsopozidis performing live at [event name]"

For Russian locale, use Russian alt text:
- "Александрос Цопозидис — греко-восточный певец, портрет"
- "Клип Бродяга — Александрос Цопозидис и Эльбрус Джанмирзоев"

For Greek locale, use Greek alt text accordingly.

Search the entire codebase for:
- <img without alt=
- <Image without alt=
- alt="" (empty alt)
- alt="image" or alt="photo" (generic alt)

Fix all instances.
```

### Prompt 8.2 — Next.js Performance Config

```
Review and optimize the Next.js configuration for performance.

In next.config.js (or next.config.ts), ensure:

1. Image optimization:
   - remotePatterns includes img.youtube.com for video thumbnails
   - formats: ['image/avif', 'image/webp'] for modern image formats
   - deviceSizes and imageSizes are configured for common breakpoints

2. Headers:
   - Add security headers: X-Content-Type-Options, X-Frame-Options, Referrer-Policy
   - Add cache headers for static assets (images, fonts): Cache-Control max-age=31536000, immutable
   - Add X-Robots-Tag: all (to ensure search engines don't see noindex)

3. Redirects:
   - Redirect /  to /en (or /ru based on Accept-Language header if using i18n detection)
   - Redirect /en/contact to /en/events or wherever the booking form lives

4. Compression:
   - Ensure compress: true (default in Next.js but verify)

5. If using App Router:
   - Verify that dynamic routes aren't accidentally set to force-dynamic when they could be statically generated
   - Pages like About, Music, Videos, Gallery can be static (generateStaticParams)

Output the optimized next.config file.
```

### Prompt 8.3 — Accessibility Quick Pass

```
Do a quick accessibility audit and fix the most critical issues:

1. Check all interactive elements (buttons, links) have sufficient color contrast (4.5:1 ratio minimum)
2. Ensure all buttons have accessible names (aria-label where text is not visible)
3. Check the language switcher and mobile menu for keyboard navigation (Tab, Enter, Escape)
4. Add skip-to-content link as the first focusable element in the layout
5. Ensure the WhatsApp link has an aria-label: "Book artist via WhatsApp" / "Заказать артиста через WhatsApp"
6. Check that the YouTube facade component (if implemented) has proper aria-label: "Play {video title} on YouTube"
7. Add lang attribute to the <html> tag that changes per locale (en, ru, el)

Fix any issues found. Don't over-engineer — focus on the critical accessibility wins.
```

---

## PHASE 9: LONG-TERM ENHANCEMENTS (Month 2+)

### Prompt 9.1 — Blog / News Section (Optional)

```
Create a minimal blog/news section for the site.

Route: /en/news (and /ru/news, /el/news)
Add "News" to the navigation menu.

Implementation:
- Create a simple file-based blog using MDX files in a /content/news/ directory
- Each post is a .mdx file with frontmatter: title, date, excerpt, locale, slug, image (optional)
- The news listing page shows posts as cards (image, title, excerpt, date)
- Individual post pages render the MDX content
- Filter posts by the current locale
- Sort by date descending

Create 2-3 seed posts:
1. "Mia Kardia — New Single Out Now" (March 2025)
2. "Вечная любовь — Coming Soon" (teaser announcement)
3. "Soltera feat. El Pontios — Available on All Platforms" (2025)

Keep the design consistent with the rest of the site. This section exists primarily for SEO (fresh crawlable content) and fan engagement.
```

### Prompt 9.2 — Smart Link / Link-in-Bio Page

```
Create a "link-in-bio" style page that serves as the single destination from social media profiles.

Route: /links (no locale prefix — this is a universal page)

Content:
- Artist photo at top (circle crop)
- Name: Alexandros Tsopozidis
- Tagline: Greek Soul · Eastern Sound
- Buttons (full-width, stacked):
  1. 🎵 Latest Release: Mia Kardia → link to music page
  2. 🔥 Coming Soon: Вечная любовь → link to Telegram
  3. ▶️ Watch Бродяга (22M+ views) → YouTube link
  4. 🎧 Spotify → Spotify artist link
  5. 🎧 Apple Music → Apple Music link
  6. 🎧 Yandex Music → Yandex Music link
  7. 🎧 Zvuk → Zvuk link
  8. 📱 TikTok → TikTok link
  9. 📱 VK → VK link
  10. 📱 Instagram → Instagram link
  11. ✉️ Book for Event → WhatsApp link
  12. 🌐 Official Website → homepage

Style:
- Dark background, centered layout, max-width 480px
- Gold accent buttons with hover effects
- Mobile-optimized (this page is almost exclusively viewed on mobile)
- Fast loading — no heavy images or scripts
- Add UTM parameters to all links: ?utm_source=linkinbio&utm_medium=social

This replaces the need for Linktree or similar services and keeps traffic on the official domain.
```

---

## POST-DEPLOYMENT CHECKLIST

After implementing all changes, verify:

```
□ Visit https://tsopozidis-alexandros.com/sitemap.xml — should render valid XML
□ Visit https://tsopozidis-alexandros.com/robots.txt — should show allow rules + sitemap
□ View source on homepage — verify hreflang tags for en/ru/el/x-default
□ View source on homepage — verify canonical tag
□ View source on homepage — verify og:title, og:description, og:image, twitter:card
□ View source on about page — verify JSON-LD MusicArtist schema
□ Test WhatsApp link on mobile — verify pre-filled message opens
□ Test language switcher — verify path preservation (/en/about → /ru/about)
□ Run PageSpeed Insights on homepage (mobile + desktop)
□ Run https://search.google.com/test/rich-results on homepage and about page
□ Paste a page URL in Telegram — verify OG preview card renders correctly
□ Paste a page URL in VK — verify preview card renders correctly
□ Submit sitemap.xml in Google Search Console
□ Submit sitemap.xml in Yandex Webmaster
□ Verify GA4 is receiving data (Real-time report)
□ Verify Yandex Metrica is receiving data
□ Check Events page — verify past events display correctly
□ Check About page — verify career timeline displays correctly
□ Test booking form submission
□ Test Telegram CTA banner (appears on scroll, dismisses on X)
```

---

## ENVIRONMENT VARIABLES NEEDED

Add these to `.env.local` (and `.env.example` for documentation):

```env
# Google Analytics 4
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Yandex Metrica
NEXT_PUBLIC_YANDEX_METRICA_ID=XXXXXXXX

# Site URL (used for canonical/OG tags)
NEXT_PUBLIC_SITE_URL=https://tsopozidis-alexandros.com

# Email service (for booking form — optional, add when ready)
# RESEND_API_KEY=re_XXXXXXXXXX
```

---

*Generated from comprehensive website audit — March 2026*
*Total prompts: 22 across 9 phases*
*Estimated implementation: 2-3 focused Claude Code sessions for Phases 1-6*
