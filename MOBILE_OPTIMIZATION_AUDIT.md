# Mobile Optimization Audit Report

**Site:** Alexandros Tsopozidis Official Website
**Stack:** Next.js 14 / React 18 / Tailwind CSS / Framer Motion
**Date:** 2026-03-14
**Auditor Role:** Senior UX/UI Designer & Web Performance Specialist

---

## 1. Visual Hierarchy & Layout

| # | Problem | Fix | Priority |
|---|---------|-----|----------|
| 1.1 | Hero background uses CSS `background-image` — no responsive sizing, no Next.js optimization, no AVIF/WebP delivery | Replace with Next.js `<Image>` component using `fill`, `priority`, and `sizes="100vw"` | Critical |
| 1.2 | AboutPreview uses raw `<img>` tag — no format optimization, no responsive srcset | Replace with Next.js `<Image>` using `fill` and appropriate `sizes` | High |
| 1.3 | Gallery uses raw `<img>` tags — no AVIF/WebP, no responsive sizing | Replace with Next.js `<Image>` component | High |
| 1.4 | Scroll indicator text is `text-[10px]` (10px) — below minimum readable size on mobile | Increase to `text-xs` (12px) minimum | Low |
| 1.5 | Recent singles horizontal scroll row has no visual scroll affordance on mobile | Add fade-out gradient edges or scroll indicator dots | Low |
| 1.6 | Duplicate noise texture overlay: rendered in both `globals.css` (`body::after`) AND `layout.tsx` (fixed div) — wasted paint cycles | Remove the duplicate `body::after` from `globals.css` | Medium |

---

## 2. Touch Targets

**Standard:** Google/WCAG recommend minimum 48x48px touch targets with 8px spacing.

| # | Problem | Fix | Priority |
|---|---------|-----|----------|
| 2.1 | Hamburger menu button — icon is 24px with no explicit min-size. Computed tap area ~24x24px | Add `min-w-[48px] min-h-[48px] flex items-center justify-center` | Critical |
| 2.2 | Mobile menu close button — icon 28px with no min-size padding | Add `min-w-[48px] min-h-[48px] flex items-center justify-center` | Critical |
| 2.3 | Telegram banner dismiss button — X icon is only 16px, total tap area ~16x16px | Increase to `min-w-[44px] min-h-[44px]` with centered icon | Critical |
| 2.4 | Language switcher buttons — `px-3 py-1.5` yields ~36x28px tap targets | Increase to `px-3 py-2.5` to achieve 48px height | High |
| 2.5 | Gallery filter tab buttons — text-only with `pb-1`, no min-height | Add `py-3` padding for 48px touch target | High |
| 2.6 | Events tab toggle buttons — same issue as gallery filters | Add `py-3` padding | High |
| 2.7 | Social media icon links — icons are 16-24px with no surrounding padding | Add `min-w-[44px] min-h-[44px] flex items-center justify-center` wrapper | High |
| 2.8 | Lightbox navigation arrows — icon 36px but no min-size enforcement | Add `min-w-[48px] min-h-[48px] flex items-center justify-center` | High |
| 2.9 | Lightbox close button — icon 28px, no min-size | Add `min-w-[48px] min-h-[48px]` | High |
| 2.10 | Footer quick links — text links with `gap-3` spacing, no min-height | Add `py-2` for taller touch targets | Medium |
| 2.11 | Streaming platform buttons — `px-4 py-2` at `text-xs` is borderline at ~32px height | Increase to `py-2.5` | Medium |

---

## 3. Core Web Vitals (Mobile on 4G/5G)

### Largest Contentful Paint (LCP)

| # | Problem | Fix | Priority |
|---|---------|-----|----------|
| 3.1 | Hero image loaded via CSS `background-image` — bypasses Next.js image optimization pipeline entirely. No AVIF/WebP, no responsive srcset, no priority preload. This IS the LCP element | Convert to `<Image priority fill sizes="100vw" />` — enables preload hint, AVIF/WebP, and responsive sizing | Critical |
| 3.2 | Google Fonts loaded via `@import url()` in CSS — render-blocking. Three font families (Cinzel, Cormorant Garamond, Inter) add ~150-300KB | Move to `next/font/google` for automatic optimization: subsetting, `font-display: swap`, self-hosting, and preloading | Critical |
| 3.3 | No `<link rel="preconnect">` for external origins (YouTube thumbnails, fonts.googleapis.com) | Add preconnect hints in layout for `fonts.googleapis.com` and `fonts.gstatic.com` (if keeping Google Fonts CDN) | High |
| 3.4 | AboutPreview image is a raw `<img>` — full-size JPEG delivered to all viewports | Use Next.js `<Image>` with `sizes="(max-width: 768px) 100vw, 45vw"` | High |
| 3.5 | Large Framer Motion bundle loaded on every page (~30KB gzipped) — even for simple animations | Consider `prefers-reduced-motion` support and lazy-loading animation-heavy components | Medium |

### Cumulative Layout Shift (CLS)

| # | Problem | Fix | Priority |
|---|---------|-----|----------|
| 3.6 | Hero content animates in with 0.5s-2s delays (`initial={{ opacity: 0 }}`) — text pops in causing layout reflow if below-fold content depends on hero height | Use `min-h-screen` (already present) + ensure `will-change: transform` on animated elements. Consider `visibility` instead of `opacity: 0` for initial state to reserve space | High |
| 3.7 | `ScrollReveal` wraps all content sections with `initial={{ opacity: 0, y: 40 }}` — 40px vertical shift on every section entry causes CLS if elements above haven't rendered | Reduce `y` offset to 20px and use `transform` only (not layout-affecting properties). Add `will-change: transform, opacity` | High |
| 3.8 | Gallery masonry grid with dynamic `aspectRatio` — if images load at different times, columns can reflow | Aspect ratios are set via data (good), but raw `<img>` has no explicit `width`/`height`. Add explicit dimensions | High |
| 3.9 | Telegram banner appears after 50% scroll at `fixed bottom-4` — technically no CLS since it's `position: fixed`, but it obscures content | Ensure the banner doesn't overlap critical CTAs. Current implementation is acceptable | Low |

---

## 4. Navigation & Inputs

### Thumb Zone Accessibility

| # | Problem | Fix | Priority |
|---|---------|-----|----------|
| 4.1 | All primary navigation is at the top of the screen — outside the natural thumb zone on modern tall phones (6.5"+) | Consider adding a sticky bottom CTA bar on mobile for the primary conversion action (Book Now / WhatsApp) | Medium |
| 4.2 | Gallery lightbox navigation arrows positioned at `left-4`/`right-4` — mid-screen horizontally, good for thumbs | No change needed | - |
| 4.3 | Mobile menu is full-screen overlay — all items centered vertically. Excellent for thumb reach | No change needed | - |

### Form Input Optimization

| # | Problem | Fix | Priority |
|---|---------|-----|----------|
| 4.4 | Phone field has `type="tel"` but no `inputMode="tel"` — some mobile browsers may not show numeric keypad | Add `inputMode="tel"` to phone input | Critical |
| 4.5 | Email field has `type="email"` but no `inputMode="email"` — missing optimized keyboard on some browsers | Add `inputMode="email"` to email input | High |
| 4.6 | No `autoComplete` attributes on any form fields — browser autofill won't work, users must type everything manually | Add `autoComplete="name"`, `autoComplete="email"`, `autoComplete="tel"` respectively | High |
| 4.7 | No `enterKeyHint` on form inputs — mobile keyboard shows generic "return" instead of contextual action | Add `enterKeyHint="next"` on fields and `enterKeyHint="send"` on last field | Medium |
| 4.8 | Select dropdown for event type — no `defaultValue` placeholder option, first option auto-selected | Add a disabled placeholder `<option>` as first choice | Low |

---

## 5. Conversion Friction

| # | Problem | Fix | Priority |
|---|---------|-----|----------|
| 5.1 | Telegram banner overlays bottom of viewport on mobile (`fixed bottom-4 left-4 right-4`) — can obscure page CTAs and content | Reduce to a compact single-line banner or move to a non-blocking position; dismiss on any scroll past it | Medium |
| 5.2 | Booking form has 7 fields on mobile — high friction for mobile users | Consider a 2-step form: Step 1 (name, email, event type), Step 2 (phone, date, location, message). Or mark optional fields more clearly | Medium |
| 5.3 | WhatsApp links in hero/events have no pre-filled message — user lands in empty chat | Add pre-filled `?text=` parameter like the contact page already does | High |
| 5.4 | No sticky mobile CTA — booking action requires scrolling to find | Add a fixed bottom bar on mobile with "Book Now" CTA that appears after scrolling past the hero | Medium |
| 5.5 | Gallery lightbox has no swipe gesture support on mobile — only button/keyboard navigation | Add touch swipe detection for left/right navigation in lightbox | High |

---

## Prioritized To-Do List

### Critical Fixes (Must-Do)

1. **[LCP]** Convert hero background-image to Next.js `<Image priority>` component
2. **[LCP]** Migrate Google Fonts from `@import` to `next/font/google`
3. **[Touch]** Fix hamburger menu button touch target (48x48px minimum)
4. **[Touch]** Fix mobile menu close button touch target
5. **[Touch]** Fix Telegram banner dismiss button touch target (16px icon is untappable)
6. **[Input]** Add `inputMode="tel"` to phone field
7. **[Input]** Add `inputMode="email"` to email field

### High Priority Fixes

8. **[Touch]** Enlarge language switcher button touch targets
9. **[Touch]** Enlarge gallery filter tab touch targets
10. **[Touch]** Enlarge events tab toggle touch targets
11. **[Touch]** Add minimum touch areas to social media icon links
12. **[Touch]** Enlarge lightbox navigation arrow touch targets
13. **[Touch]** Enlarge lightbox close button touch target
14. **[Input]** Add `autoComplete` attributes to all form fields
15. **[CLS]** Reduce ScrollReveal Y-offset from 40px to 20px
16. **[CLS]** Add explicit dimensions to gallery images
17. **[LCP]** Convert AboutPreview to Next.js `<Image>`
18. **[LCP]** Convert Gallery images to Next.js `<Image>`
19. **[Conversion]** Add pre-filled WhatsApp message to hero/events links
20. **[Conversion]** Add swipe gesture support to gallery lightbox
21. **[Performance]** Remove duplicate noise texture overlay

### Medium Priority (UX Enhancements)

22. **[Touch]** Increase footer quick link touch targets
23. **[Touch]** Increase streaming platform button touch targets
24. **[Input]** Add `enterKeyHint` attributes to form inputs
25. **[Conversion]** Consider sticky bottom CTA bar on mobile
26. **[Conversion]** Reduce Telegram banner intrusiveness on mobile
27. **[Conversion]** Consider multi-step booking form on mobile

### Low Priority (Polish)

28. **[Visual]** Increase scroll indicator text from 10px to 12px
29. **[Visual]** Add scroll affordance to horizontal singles row
30. **[Input]** Add placeholder option to event type select

---

*This audit focuses on actionable fixes with code-level specificity. Each item maps to a specific file and line range in the codebase.*
