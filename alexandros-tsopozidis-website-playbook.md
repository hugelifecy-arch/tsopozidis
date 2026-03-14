# Alexandros Tsopozidis — Official Artist Website
## Claude Code Full-Stack Build Playbook

---

## PROJECT OVERVIEW

Build a modern, immersive artist website for **Alexandros Tsopozidis** — a Greek-Russian pop/ethnic singer based in Paphos, Cyprus. The site must feel premium, dark, cinematic, and music-driven — inspired by sites like dumikyan.com, but with its own identity. Target audiences: Russian-speaking diaspora fans (primary), Greek/Cypriot fans, international listeners.

**Live Reference:** https://dumikyan.com (for tone/mood reference only — our site will be unique)

---

## TECH STACK

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3.4+ |
| Language | TypeScript |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Google Fonts (Cinzel + Cormorant Garamond + Inter) |
| Hosting | Vercel |
| i18n | next-intl (EN / RU / GR) |
| Forms | React Hook Form + server action or mailto fallback |
| Media | YouTube Lite Embed, Spotify Embed iframes |
| Analytics | Vercel Analytics (optional) |
| Domain | TBD (tsopozidis.com or alexandros-tsopozidis.com) |

---

## DESIGN SYSTEM

### Color Palette
```
--bg-primary: #0A0A0A        /* Near-black background */
--bg-secondary: #111111      /* Card/section backgrounds */
--bg-tertiary: #1A1A1A       /* Elevated surfaces */
--gold-primary: #C8A96E      /* Primary gold accent */
--gold-light: #E0CFA0        /* Light gold for hover states */
--gold-dark: #8A7340         /* Dark gold for subtle elements */
--text-primary: #F5F0E8      /* Warm white text */
--text-secondary: #A09080    /* Muted warm gray */
--text-tertiary: #605040     /* Very subtle text */
--accent-red: #8B2020        /* Danger/live indicator */
--border: #2A2420            /* Subtle warm borders */
--glass: rgba(20, 18, 15, 0.85) /* Glass morphism bg */
```

### Typography
```
Display/Headings: "Cinzel", serif (700/900 weight) — uppercase, wide tracking
Subheadings: "Cormorant Garamond", serif (300/400/italic)
Body: "Inter", sans-serif (300/400)
```

### Motion Principles
- Page transitions: Fade up with subtle scale (0.3s ease-out)
- Scroll-triggered reveals: Elements fade in from below as they enter viewport
- Parallax: Hero background image subtle parallax on scroll
- Hover states: Gold color transitions, subtle scale on cards
- Navigation: Slide-in mobile menu from right
- NO excessive animation — keep it elegant and restrained

---

## SITE ARCHITECTURE

```
/
├── [locale]/
│   ├── page.tsx                    # Home (Hero + Highlights)
│   ├── about/page.tsx              # Biography
│   ├── music/page.tsx              # Discography + Streaming Links
│   ├── videos/page.tsx             # YouTube Music Videos
│   ├── gallery/page.tsx            # Photo Gallery
│   ├── events/page.tsx             # Tour Dates / Upcoming Shows
│   ├── contact/page.tsx            # Booking & Contact Form
│   └── layout.tsx                  # Root layout with nav + footer
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Fixed top nav with glass blur
│   │   ├── MobileMenu.tsx          # Fullscreen mobile overlay
│   │   ├── Footer.tsx              # Social links + copyright
│   │   └── LanguageSwitcher.tsx    # EN/RU/GR toggle
│   ├── home/
│   │   ├── HeroSection.tsx         # Fullscreen hero with name + CTA
│   │   ├── LatestRelease.tsx       # Featured single/album card
│   │   ├── AboutPreview.tsx        # Short bio + "Read More"
│   │   ├── VideoHighlight.tsx      # Featured YouTube embed
│   │   └── UpcomingShows.tsx       # Next 3 events preview
│   ├── music/
│   │   ├── AlbumCard.tsx           # Album artwork + tracklist
│   │   ├── SingleCard.tsx          # Single release card
│   │   ├── SpotifyEmbed.tsx        # Spotify player embed
│   │   └── StreamingLinks.tsx      # Links to all platforms
│   ├── gallery/
│   │   ├── PhotoGrid.tsx           # Masonry/grid photo layout
│   │   └── LightboxModal.tsx       # Fullscreen photo viewer
│   ├── common/
│   │   ├── SectionHeading.tsx      # Reusable styled heading
│   │   ├── GoldButton.tsx          # Primary CTA button
│   │   ├── SocialIcons.tsx         # Social media icon row
│   │   ├── ScrollReveal.tsx        # Framer Motion scroll wrapper
│   │   └── ParallaxImage.tsx       # Parallax background component
│   └── contact/
│       └── BookingForm.tsx         # Contact/booking form
├── lib/
│   ├── data/
│   │   ├── discography.ts          # All albums/singles data
│   │   ├── events.ts               # Tour dates data
│   │   ├── videos.ts               # YouTube video IDs
│   │   ├── gallery.ts              # Photo URLs/metadata
│   │   └── social-links.ts         # All social platform links
│   └── i18n/
│       ├── en.json                 # English translations
│       ├── ru.json                 # Russian translations
│       └── el.json                 # Greek translations
├── public/
│   ├── images/
│   │   ├── hero/                   # Hero background images
│   │   ├── gallery/                # Gallery photos
│   │   ├── albums/                 # Album/single artwork
│   │   └── about/                  # Bio section photos
│   ├── fonts/                      # Self-hosted font files (fallback)
│   ├── logo.svg                    # Name/logo SVG
│   └── favicon.ico
└── styles/
    └── globals.css                 # Tailwind base + custom utilities
```

---

## PHASE 1: PROJECT SCAFFOLD & CONFIGURATION

### Prompt 1.1 — Initialize Project

```
Initialize a new Next.js 14 project with App Router, TypeScript, and Tailwind CSS for an artist website. Project name: "alexandros-tsopozidis-website".

Install these dependencies:
- next@14 react react-dom
- typescript @types/react @types/node
- tailwindcss postcss autoprefixer
- framer-motion
- lucide-react
- next-intl
- react-hook-form

Configure tailwind.config.ts with this custom theme extension:
- Colors: bg-primary (#0A0A0A), bg-secondary (#111111), bg-tertiary (#1A1A1A), gold (#C8A96E), gold-light (#E0CFA0), gold-dark (#8A7340), text-primary (#F5F0E8), text-secondary (#A09080), text-tertiary (#605040), accent-red (#8B2020), border (#2A2420)
- Font families: display ("Cinzel", serif), serif ("Cormorant Garamond", serif), sans ("Inter", sans-serif)
- Add custom animation keyframes: fadeUp (opacity 0 translateY 20px → opacity 1 translateY 0), fadeIn (opacity 0 → 1), slideRight (translateX -100% → 0)
- Extend screens if needed for a max container of 1400px

In globals.css:
- Import Google Fonts: Cinzel (400,700,900), Cormorant Garamond (300,400,500,700,italic), Inter (300,400,500)
- Set html/body: bg-[#0A0A0A], text-[#F5F0E8], font-sans, antialiased, scroll-smooth
- Add a subtle noise texture overlay on body using a CSS pseudo-element with an SVG noise filter at 2% opacity
- Add custom scrollbar styling: thin, gold thumb on dark track
- Add utility class .text-gold for the primary gold color
- Add a .glass class: backdrop-blur-xl bg-[rgba(20,18,15,0.85)] border-b border-[#2A2420]

Set up next.config.js with:
- images.domains: ["instagram.com", "scontent.cdninstagram.com", "i.ytimg.com", "i.scdn.co"] (for external image loading)
- experimental.serverActions: true
```

### Prompt 1.2 — i18n Setup

```
Set up next-intl internationalization with three locales: en (English, default), ru (Russian), el (Greek).

File structure:
- /messages/en.json, /messages/ru.json, /messages/el.json
- /src/i18n.ts — configuration
- /src/middleware.ts — locale detection and routing
- /src/app/[locale]/layout.tsx — locale-aware root layout

Create the translation JSON files with these keys (provide full content for EN and RU, placeholder for EL):

nav: { home, about, music, videos, gallery, events, contact, booking }
hero: { subtitle ("Greek-Russian Pop Artist"), cta_listen ("Listen Now"), cta_booking ("Book a Show") }
about: { title, subtitle, bio_paragraph_1 through bio_paragraph_5 — use the full biography from the research dossier below }
music: { title, subtitle, latest_release, full_discography, listen_on, album, single, featuring }
videos: { title, subtitle }
gallery: { title, subtitle }
events: { title, subtitle, upcoming_shows, past_shows, no_upcoming ("New dates coming soon..."), book_private ("Book a Private Event") }
contact: { title, subtitle, booking_title, booking_text, name, email, phone, message, event_type, send, success_message }
footer: { copyright, booking_phone, follow }
common: { read_more, view_all, back, loading }

For the RUSSIAN translations, here's the bio content to translate properly:
- Born January 1, 1986 in Sameba (Guniakala), Georgia
- Moved to Paphos, Cyprus in 1998
- Started football career, trained at Cyprus football academy
- Left sports at parents' request, pivoted to music in 2011
- Career launched by Russian producer Kemran Amirov
- Debut duet with Eldar Dalgatov "Может ты вернёшься"
- "Бродяга" with Elbrus Dzhanmirzoev — 22M+ YouTube views
- Performs in Russian, Greek, Pontic Greek
- Award winner: 9 Волна award for ethnic music contribution
- Performed at Zhara Festival Baku, Vostok FM Stars of the East
- Based in Paphos, Cyprus
- Latest: "Mia Kardia" (2025), "Вечная любовь" coming soon

Middleware should:
- Detect browser locale, default to "en"
- Support /en/*, /ru/*, /el/* URL patterns
- Redirect root / to /en/
```

### Prompt 1.3 — Data Files

```
Create TypeScript data files in /src/lib/data/ with strongly typed interfaces.

1. /src/lib/data/social-links.ts
Export an array of social link objects:
[
  { platform: "instagram", url: "https://instagram.com/alexandros_official", label: "Instagram", followers: "310K" },
  { platform: "facebook", url: "https://facebook.com/alexandros.tsopozidis", label: "Facebook", followers: "10.5K" },
  { platform: "youtube", url: "https://youtube.com/@alexandrostsopozidis", label: "YouTube" },
  { platform: "spotify", url: "https://open.spotify.com/artist/6PPuuN3cvmbyuvgrGbhXge", label: "Spotify", followers: "10.4K monthly" },
  { platform: "apple-music", url: "https://music.apple.com/artist/alexandros-tsopozidis/839072119", label: "Apple Music" },
  { platform: "tiktok", url: "https://tiktok.com/@alexandros_official", label: "TikTok" },
  { platform: "vk", url: "https://vk.com/id191473549", label: "VKontakte" },
  { platform: "yandex-music", url: "https://music.yandex.ru/artist/3050547", label: "Yandex Music" },
  { platform: "deezer", url: "https://deezer.com/en/artist/7144045", label: "Deezer" },
  { platform: "soundcloud", url: "https://soundcloud.com/alexandros-tsopozidis-853060317", label: "SoundCloud" },
  { platform: "amazon-music", url: "https://music.amazon.com/artists/B0749H7D6R/alexandros-tsopozidis", label: "Amazon Music" }
]

2. /src/lib/data/discography.ts
Export typed arrays for album and singles. Include:
- Album: "За тобой" (Za Toboi), 2018, track count: 12+
- Singles array (newest first): Mia Kardia (2025), Soltera (2025, ft. El Pontios), Par shirkhani (2024), Kavkaz (2023, ft. Vasiliadis), Я грек (2022), Kortsopon apsimon (2021), Monahos (2021), Капкан (2021), Расскажи (2020), Panagia Soumela (2020), Dumanli (2019), Танец грека (2018)
- Each entry: { id, title, titleRu (if different), year, type: "album"|"single", featuring?, spotifyUrl?, youtubeId?, appleMusicUrl?, coverImage? }

3. /src/lib/data/videos.ts
Export array of YouTube video objects:
- Each: { id, youtubeId, title, titleRu?, year, featuring?, views? }
- Include known videos: Male Male (11M+), Бродяга (22M+), Kavkaz, Kaciyorum, Дай мне номер телефона, and others
- Use placeholder youtubeId values marked with TODO comments — these need to be filled with actual YouTube video IDs

4. /src/lib/data/events.ts
Export typed events array. For now, populate with:
- 1 upcoming placeholder event with "coming_soon: true"
- 3-4 past events: Kavkaz Music Fest (Aug 2022), Zhara Festival Baku (2018), Karnaval Gelendzhik (May 2018), Stars of the East Moscow (Nov 2018)
- Each: { id, title, date, venue, city, country, type: "festival"|"concert"|"private", isFeatured?, isUpcoming? }

5. /src/lib/data/gallery.ts
Export photo gallery array. Use placeholder paths /images/gallery/photo-01.jpg through photo-12.jpg. Mark each with:
- { id, src, alt, altRu?, category: "live"|"portrait"|"backstage"|"video-shoot", width, height }
```

---

## PHASE 2: LAYOUT COMPONENTS

### Prompt 2.1 — Navbar & Mobile Menu

```
Create the main navigation components:

1. /src/components/layout/Navbar.tsx
- Fixed position at top, z-50
- Starts transparent, transitions to glass morphism (backdrop-blur-xl bg-[rgba(10,10,10,0.9)] border-b border-[#2A2420]) on scroll (use scroll listener, trigger at 50px)
- Left: Artist name "ALEXANDROS" in Cinzel font, uppercase, tracking-[0.2em], text-gold — links to home. Below it in smaller Cormorant Garamond italic: "TSOPOZIDIS" in text-secondary. Both stacked as a logo block
- Center (desktop): Nav links — Home, About, Music, Videos, Gallery, Events — use next-intl useTranslations for labels. Links styled in Inter 300 weight, uppercase, tracking-wider, text-sm. Active link: text-gold with a small gold dot below. Hover: text-gold transition
- Right (desktop): Language switcher (EN | RU | EL) + "BOOKING" CTA button with gold border, gold text, hover: gold bg with dark text
- Mobile: Hamburger icon (3 lines) on right, triggers MobileMenu. Hide center nav links and booking button below lg breakpoint
- Smooth transition for all states. Use Framer Motion for mount/unmount of glass bg

2. /src/components/layout/MobileMenu.tsx
- Fullscreen overlay, bg-[#0A0A0A]/95 with backdrop-blur
- Animated: slides in from right using Framer Motion (AnimatePresence)
- Close button (X) top right, gold color
- Nav links stacked vertically, centered, Cinzel font, text-2xl, tracking-wider
- Language switcher below nav links
- Social icons row at bottom
- Booking phone number displayed: +7 938 316 30 34

3. /src/components/layout/LanguageSwitcher.tsx
- Three buttons: EN | RU | EL, separated by gold dots or slashes
- Active locale: text-gold, others: text-secondary hover:text-primary
- Uses next-intl router to switch locale while preserving current path
- Compact design, font Inter, text-xs tracking-widest uppercase
```

### Prompt 2.2 — Footer

```
Create /src/components/layout/Footer.tsx:

- Full width, bg-bg-secondary (#111111), border-t border-[#2A2420]
- Top section (py-16 px-8):
  - Left column: Large "ALEXANDROS TSOPOZIDIS" in Cinzel, below it a short tagline in Cormorant Garamond italic: "Greek Soul. Eastern Sound."
  - Center column: Quick links (About, Music, Videos, Events, Contact) in Inter, text-sm, text-secondary
  - Right column: "Follow" heading, then social media icons grid (Instagram, Facebook, YouTube, Spotify, TikTok, VK) using Lucide icons or custom SVG icons. Each icon: text-secondary hover:text-gold transition
- Divider: thin gold gradient line (transparent → gold → transparent)
- Bottom bar (py-6 px-8): 
  - Left: "© 2026 Alexandros Tsopozidis. All Rights Reserved."
  - Center: "Booking: +7 938 316 30 34"
  - Right: "Website by [Client Credit]"
  - All in Inter, text-xs, text-tertiary, tracking-wide
- Responsive: stack columns on mobile
```

### Prompt 2.3 — Root Layout

```
Create /src/app/[locale]/layout.tsx:

- Import and apply Google Fonts (Cinzel, Cormorant Garamond, Inter) using next/font/google
- Set metadata: title "Alexandros Tsopozidis — Official Website", description "Official website of Greek-Russian pop artist Alexandros Tsopozidis. Music, videos, tour dates, and booking."
- Include Open Graph meta tags with artist name, description, and placeholder OG image
- Body: min-h-screen, bg-bg-primary, text-text-primary, font-sans
- Include Navbar at top (sticky)
- Main content area with locale provider from next-intl
- Footer at bottom
- Add a subtle full-page noise texture overlay (fixed position, pointer-events-none, z-[1], opacity-[0.015])
```

---

## PHASE 3: HOME PAGE

### Prompt 3.1 — Hero Section

```
Create /src/components/home/HeroSection.tsx:

This is the MOST IMPORTANT section of the entire site. It must be cinematic and impactful.

- Full viewport height (min-h-screen), relative, overflow-hidden
- Background: Full-bleed photo of Alexandros (use placeholder /images/hero/hero-main.jpg for now)
  - Apply: object-cover, subtle parallax effect on scroll (translateY at 30% scroll speed using Framer Motion useScroll + useTransform)
  - Overlay: gradient from transparent at top to #0A0A0A at bottom (ensure text readability), plus a subtle dark overlay at 40% opacity overall
- Content (centered vertically, z-10, text-center):
  - Top: Thin decorative line (120px wide, gold gradient: transparent → gold → transparent), animate in with width from 0
  - First name: "ALEXANDROS" in Cormorant Garamond 300 weight, text-lg sm:text-xl md:text-2xl, tracking-[0.5em], text-gold/70, animate fadeDown with 0.5s delay
  - Last name: "TSOPOZIDIS" in Cinzel 700 weight, text-5xl sm:text-6xl md:text-7xl lg:text-8xl, tracking-[0.1em], metallic gold gradient text (linear-gradient 180deg: #E0D5C0 → #C8A96E → #8A7340 → #C8A96E → #DDD2BE) using bg-clip-text, animate fadeUp with 0.8s delay
  - Tagline: Cormorant Garamond italic, text-base, text-secondary, tracking-[0.3em], lowercase: "greek soul · eastern sound" — animate fadeIn 1.2s delay
  - Bottom decorative line matching top
  - Two CTA buttons side by side (mt-12):
    - "LISTEN NOW" — gold outlined button (border-gold, text-gold, hover:bg-gold hover:text-bg-primary), links to /music
    - "BOOK A SHOW" — solid gold button (bg-gold, text-bg-primary, hover:bg-gold-light), links to /contact
  - Animate buttons fadeUp with 1.5s delay
- Bottom: Subtle scroll indicator — small chevron down icon, pulsing opacity animation, text "scroll" in tiny text above it
- At the very bottom of hero: a subtle horizontal gradient line (gold, same as decorative lines)

All animations use Framer Motion with easing [0.25, 0.1, 0.25, 1]
```

### Prompt 3.2 — Latest Release Section

```
Create /src/components/home/LatestRelease.tsx:

- Section with py-24 px-8, max-w-6xl mx-auto
- Section heading: Use SectionHeading component (see Prompt 4.1) with "Latest Release" / "Новый релиз"
- Featured card layout:
  - Left side (40%): Album/single artwork placeholder (square, rounded-sm, with a subtle gold border, box-shadow glow effect in gold at very low opacity)
  - Right side (60%): 
    - Release type badge: "NEW SINGLE" in text-xs, tracking-widest, text-gold, bg-gold/10, px-3 py-1, rounded-full
    - Title: "Mia Kardia" in Cinzel, text-4xl
    - Year: "2025" in Cormorant Garamond, text-secondary
    - Short description (2 lines) in Inter 300
    - Streaming platform buttons row: Spotify, Apple Music, YouTube, Yandex Music — each as a small icon button with platform name, gold outline style
  - On mobile: stack vertically, artwork on top
- Below the featured card: A horizontal scrolling row of 4 recent singles (SingleCard mini-cards showing cover art, title, year) — with snap scrolling on mobile
- Scroll reveal animation on the entire section
```

### Prompt 3.3 — About Preview + Video Highlight + Upcoming Shows

```
Create three more home page sections:

1. /src/components/home/AboutPreview.tsx
- py-24, max-w-5xl mx-auto
- Layout: Left side — large portrait photo (placeholder), with a thin gold border offset by 12px (decorative frame effect)
- Right side: 
  - Small label "About" in gold
  - "The Story" heading in Cinzel
  - 2-3 paragraphs of condensed bio in Inter 300, text-secondary, line-height relaxed
  - "Read Full Bio →" link in gold with arrow
- Scroll reveal from left for image, from right for text

2. /src/components/home/VideoHighlight.tsx
- py-24, full-width dark section (bg-bg-secondary)
- Section heading: "Watch" / "Смотреть"
- Featured video: Large YouTube embed (16:9 aspect ratio, max-w-4xl, mx-auto)
  - Use a custom thumbnail overlay: show the video thumbnail with a large gold play button in center. On click, load the actual YouTube iframe (performance optimization — don't load iframe until clicked)
  - Below: video title and view count
- Below featured: Row of 3 smaller video thumbnails linking to /videos page
- "View All Videos →" link

3. /src/components/home/UpcomingShows.tsx
- py-24, max-w-5xl mx-auto
- Section heading: "Events" / "Концерты"
- If upcoming events exist: List them as elegant rows (date | city, venue | ticket link)
  - Each event row: left-bordered with gold, date in large Cinzel numerals, venue in Inter
- If no upcoming: Elegant message "New dates coming soon. Book a private event →" with gold CTA
- Below: "View All Events →" link
```

### Prompt 3.4 — Assemble Home Page

```
Create /src/app/[locale]/page.tsx (Home page):

Import and render all home sections in order:
1. HeroSection
2. LatestRelease
3. AboutPreview
4. VideoHighlight
5. UpcomingShows

Add subtle spacing/dividers between sections where appropriate — use thin gold gradient lines (transparent → gold/20 → transparent) as decorative separators.

The page should feel like one continuous cinematic scroll experience. Ensure smooth scroll behavior is enabled globally.
```

---

## PHASE 4: INNER PAGES

### Prompt 4.1 — Reusable Components

```
Create reusable components in /src/components/common/:

1. SectionHeading.tsx
- Props: title (string), subtitle? (string), align?: "left"|"center"
- Renders: Small gold decorative line above, title in Cinzel uppercase tracking-wider, subtitle below in Cormorant Garamond italic text-secondary
- Default center aligned

2. GoldButton.tsx
- Props: children, variant: "outline"|"solid", href?, onClick?, size: "sm"|"md"|"lg"
- Outline: border-gold text-gold hover:bg-gold hover:text-bg-primary
- Solid: bg-gold text-bg-primary hover:bg-gold-light
- Transition all 300ms, tracking-wider, uppercase, Cinzel font

3. ScrollReveal.tsx
- Wrapper component using Framer Motion
- Props: children, direction?: "up"|"down"|"left"|"right", delay?: number, duration?: number
- Uses useInView hook to trigger animation when element enters viewport (once: true, margin: "-100px")
- Renders motion.div with appropriate initial/animate states

4. SocialIcons.tsx
- Props: size?: "sm"|"md"|"lg", platforms?: string[] (filter which to show)
- Renders row of social media icons using Lucide or custom SVGs
- For platforms not in Lucide (VK, Yandex Music, etc.), use simple text labels or custom SVG paths
- Each: text-secondary hover:text-gold transition, with aria-label and target="_blank"

5. ParallaxImage.tsx
- Props: src, alt, speed?: number (0-1, default 0.3), className?
- Uses Framer Motion useScroll + useTransform for parallax
- Renders image inside overflow-hidden container with translateY transform
```

### Prompt 4.2 — About Page

```
Create /src/app/[locale]/about/page.tsx:

Full biography page with rich storytelling layout:

- Hero banner: Wide cinematic photo with dark overlay, "About" heading overlaid
- Section 1 — "Origins" (Sameba, Georgia → Cyprus):
  - Timeline-style layout with gold vertical line
  - Birth in Georgia, Greek heritage, move to Cyprus at age 12
  - Photo placeholder alongside text
- Section 2 — "From Football to Music":
  - Football academy story, parents' decision, family music background
  - Transition to music in 2011, meeting Kemran Amirov
- Section 3 — "Career":
  - Major milestones in chronological cards/blocks
  - Key stats: 22M+ views on Бродяга, 310K Instagram followers, 15+ years performing
  - Awards: 9 Волна 2013, Ethnic Music Contribution 2014
- Section 4 — "The Sound":
  - Description of his musical style: pop meets Caucasian/Eastern influences
  - Languages: Russian, Greek, Pontic Greek
  - Key collaborators list with names
- Section 5 — "Alexandros Today":
  - Based in Paphos, Cyprus
  - Still actively releasing (latest: 2025)
  - Booking info CTA

Use ScrollReveal throughout. Alternate photo/text alignment for visual rhythm.
All text must use next-intl translations.
```

### Prompt 4.3 — Music Page

```
Create /src/app/[locale]/music/page.tsx:

- Hero banner with "Music" heading
- "Latest Release" featured block (same as home but expanded — include Spotify embed player)
- Spotify Follow button / embed for his artist profile
- Section: "Album" — Card for "За тобой" (2018) with:
  - Cover art placeholder
  - Tracklist
  - Streaming links row (Spotify, Apple Music, Yandex, Amazon, Deezer)
- Section: "Singles" — Grid of SingleCard components (3 columns desktop, 2 tablet, 1 mobile):
  - Each card: cover art (or gradient placeholder with year overlay), title, year, featuring artist if any
  - Hover: subtle scale up, gold border glow
  - Click: expands or links to streaming
- Section: "Listen On" — Large platform buttons row with all streaming platforms where he's available
- All text i18n translated
```

### Prompt 4.4 — Videos Page

```
Create /src/app/[locale]/videos/page.tsx:

- Hero banner with "Videos" heading
- Featured video: Large embed at top (same lazy-load pattern — thumbnail + play button overlay)
- Video grid below: 2 columns on desktop, 1 on mobile
  - Each video card: YouTube thumbnail (https://i.ytimg.com/vi/{videoId}/maxresdefault.jpg), title overlay at bottom on dark gradient, view count badge
  - On click: open video in a modal/lightbox with YouTube iframe, or navigate to YouTube
- Use placeholder YouTube IDs with TODO comments where actual IDs need to be inserted
- Pagination or "Load More" if many videos
```

### Prompt 4.5 — Gallery Page

```
Create /src/app/[locale]/gallery/page.tsx:

- Hero banner with "Gallery" heading
- Filter tabs: All, Live, Portrait, Backstage, Video Shoots — styled as gold text tabs, active has underline
- Masonry-style photo grid using CSS columns (3 cols desktop, 2 tablet, 1 mobile)
  - Each image: rounded-sm, hover: subtle gold border + slight zoom
  - Click opens LightboxModal (fullscreen overlay, dark bg, image centered, prev/next arrows, close button)
- Use placeholder images for now (12 items)
- LightboxModal: Framer Motion AnimatePresence, keyboard navigation (arrow keys, Escape to close), swipe on mobile
- Note at bottom: "For press inquiries and high-resolution images, please contact us"
```

### Prompt 4.6 — Events Page

```
Create /src/app/[locale]/events/page.tsx:

- Hero banner with "Events" heading
- Tab toggle: "Upcoming" / "Past" — gold underline indicator
- Upcoming events section:
  - If events exist: List as cards with date (large gold numerals), event name, venue, city/country, ticket link button
  - If none: Elegant empty state — "New tour dates coming soon. Follow on social media for announcements." with social links
  - Below: "Book a Private Event" gold CTA card with brief description and contact link
- Past events section:
  - Timeline layout with year headers
  - Each event: date, name, venue, city — more compact than upcoming
  - Include: Kavkaz Music Fest (2022), Zhara Festival Baku (2018), Karnaval Gelendzhik (2018), Stars of the East Moscow (2018), Black Sea Tour (2015)
```

### Prompt 4.7 — Contact / Booking Page

```
Create /src/app/[locale]/contact/page.tsx:

- Hero banner with "Contact" / "Booking" heading
- Two-column layout:
  - Left: Contact information card
    - "Booking Inquiries" heading
    - Phone: +7 938 316 30 34 (Liana) — with click-to-call link
    - Booking agencies:
      - BigCityStar: +7 (495) 142-60-10, inbox@bigcitystar.ru
    - Social media links row
    - "For press inquiries, please use the contact form"
  - Right: Contact form (BookingForm component)
    - Fields: Name, Email, Phone (optional), Event Type (dropdown: Concert, Festival, Private Event, Corporate, Wedding, Other), Event Date (date picker), Message (textarea)
    - Submit button: solid gold "Send Inquiry"
    - Form validation with react-hook-form
    - On submit: Use a Next.js server action that sends data via email (or for MVP, construct a mailto: link)
    - Success state: "Thank you! We'll get back to you within 48 hours."
- Below form: Map or address? Not necessary for an artist site — skip.
```

---

## PHASE 5: POLISH & OPTIMIZATION

### Prompt 5.1 — Page Transitions & Loading States

```
Add page transition animations:

1. Create a PageTransition wrapper component that wraps page content:
   - On route change: fade out current (opacity 0, translateY -10px, 200ms)
   - On new page: fade in (opacity 0 → 1, translateY 10px → 0, 300ms)
   - Use Framer Motion AnimatePresence with mode="wait"

2. Add loading.tsx files in each route for loading states:
   - Minimal: centered gold pulsing dot or thin gold line animating width
   - Keep it elegant and fast

3. Add a subtle progress bar at the very top of the page during navigation (thin gold line, 2px height)
```

### Prompt 5.2 — SEO & Meta Tags

```
Add comprehensive SEO to every page:

1. Create a generateMetadata function in each page.tsx:
   - Unique title per page: "About — Alexandros Tsopozidis", "Music — Alexandros Tsopozidis", etc.
   - Unique description per page
   - Open Graph: title, description, image (placeholder OG image), url, type, locale
   - Twitter card: summary_large_image
   - alternates.languages for EN/RU/EL versions (hreflang)

2. Add JSON-LD structured data:
   - Home: MusicGroup schema with name, url, genre, sameAs (all social links), image
   - Music page: MusicAlbum schema for the album, MusicRecording for singles
   - Events page: Event schema for each upcoming event
   - About: Person schema with name, birthDate, nationality, knowsLanguage, sameAs

3. Create robots.txt and sitemap.xml (or sitemap.ts dynamic generation):
   - Include all pages in all 3 locales
   - Priority: home 1.0, music 0.9, about/videos 0.8, gallery/events 0.7, contact 0.6

4. Add canonical URLs to prevent duplicate content across locales
```

### Prompt 5.3 — Performance Optimization

```
Optimize the site for performance:

1. Images:
   - Use next/image everywhere with proper width/height/sizes attributes
   - Add blur placeholder (blurDataURL) for hero and gallery images
   - Lazy load all images below the fold
   - Use WebP format where possible

2. Fonts:
   - Use next/font/google with display: "swap" for all fonts
   - Preload Cinzel and Inter (critical fonts)

3. YouTube embeds:
   - Never load iframe on page load — use thumbnail + play button pattern everywhere
   - On click, dynamically insert iframe with autoplay

4. Bundle:
   - Mark Framer Motion animations as client components ("use client") only where needed
   - Keep page components as server components where possible
   - Use dynamic imports for LightboxModal and MobileMenu (loaded on interaction)

5. Core Web Vitals targets:
   - LCP < 2.5s (optimize hero image loading)
   - FID < 100ms
   - CLS < 0.1 (set explicit dimensions on all images/embeds)
```

### Prompt 5.4 — Responsive Final Pass

```
Do a responsive design audit and fix pass:

Ensure ALL components render perfectly at these breakpoints:
- Mobile: 375px (iPhone SE / small Android)
- Mobile: 428px (iPhone 14 Pro Max)
- Tablet: 768px (iPad)
- Tablet landscape: 1024px (iPad landscape)
- Desktop: 1280px
- Large desktop: 1536px+

Specific responsive concerns:
- Hero text: Must not overflow on mobile. Use clamp() or Tailwind responsive sizing
- Navigation: Hamburger menu must trigger at lg breakpoint (1024px)
- Photo gallery: 1 col mobile, 2 col tablet, 3 col desktop
- Music singles grid: 1 col mobile, 2 col tablet, 3 col desktop
- Contact form: Full width on mobile, side-by-side on desktop
- Footer: Stack all columns on mobile
- All padding: Reduce on mobile (px-4 instead of px-8)
- Font sizes: Scale down appropriately on mobile
- Touch targets: All buttons/links minimum 44x44px on mobile
```

---

## PHASE 6: DEPLOYMENT

### Prompt 6.1 — Vercel Deployment Setup

```
Prepare the project for Vercel deployment:

1. Ensure all environment variables are documented in .env.example:
   - NEXT_PUBLIC_SITE_URL=https://tsopozidis.com (or whatever domain)
   - NEXT_PUBLIC_GA_ID= (optional Google Analytics)
   - CONTACT_EMAIL=booking@tsopozidis.com (for form submissions)

2. Add vercel.json if needed for any redirects or rewrites

3. Verify build: Run `npm run build` and fix any TypeScript errors or build warnings

4. Test all locale routes work correctly:
   - /en, /en/about, /en/music, etc.
   - /ru, /ru/about, /ru/music, etc.
   - /el, /el/about, /el/music, etc.
   - Root / redirects to /en

5. Ensure all images have fallback/placeholder handling for missing files

6. Add error.tsx and not-found.tsx pages with elegant styling matching the site theme

7. Final check: No console errors, no hydration mismatches, no layout shifts
```

---

## CONTENT CHECKLIST — NEEDS FROM CLIENT

Before launch, the following real assets are needed from Alexandros or his team:

### Images Needed
- [ ] Hero background photo (landscape, high-res, min 2400px wide)
- [ ] Portrait photo for About section
- [ ] Album artwork for "За тобой"
- [ ] Single artwork for each release (or we design placeholders)
- [ ] Gallery photos (12-20 high-res images: live performances, portraits, backstage)
- [ ] OG/social sharing image (1200x630px)
- [ ] Favicon/logo mark

### Content Needed
- [ ] Approved biography text (or sign off on our researched version)
- [ ] Complete YouTube video IDs for all music videos
- [ ] Correct YouTube channel URL
- [ ] Confirm TikTok handle
- [ ] Any upcoming tour dates or events
- [ ] Preferred contact email for form submissions
- [ ] Domain preference (tsopozidis.com, alexandros-official.com, etc.)
- [ ] Any additional booking agent details
- [ ] Greek translations review (native speaker)
- [ ] Russian translations review

### Optional Enhancements (Phase 2)
- [ ] Mailing list integration (Mailchimp / ConvertKit)
- [ ] Merch store page
- [ ] Fan club / VIP area
- [ ] Blog / News section for announcements
- [ ] Live chat widget for booking inquiries
- [ ] Press kit PDF download
- [ ] Lyrics pages for popular songs

---

## QUICK START

```bash
# Clone and install
git clone [repo-url]
cd alexandros-tsopozidis-website
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

---

*Playbook Version: 1.0*
*Created: March 14, 2026*
*Author: Claude AI for Notis @ GN Kalaitsidis Capital*
*Project: Alexandros Tsopozidis Official Website*
