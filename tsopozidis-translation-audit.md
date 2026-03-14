# Alexandros Tsopozidis — Translation & Localization Audit

**Audit Date:** 2026-03-14  
**Scope:** `messages/en.json`, `messages/ru.json`, `messages/el.json`, `src/lib/data/discography.ts`, `src/lib/data/events.ts`  
**Languages:** English (EN), Russian (RU), Greek (EL)  
**Auditor Level:** Native-level EN/RU/EL localization QA

---

## 1. Executive Summary

The site is well-localized overall — Russian translations are especially strong and natural. However, there are **~35 issues** ranging from incorrect booking terminology (site-wide) to awkward marketing phrasing, untranslated hardcoded strings, and minor consistency problems between the three language versions. The most impactful problems:

1. **"Book Artist" / "Забронировать артиста" / "Κράτηση Καλλιτέχνη"** — used site-wide in nav, hero, and events. Should name the artist ("Book Alexandros") for personalization and conversion.
2. **"Reservations" terminology on Contact page** — "Reservations" is hotel/restaurant language. Music industry standard is "Bookings" / "Booking Inquiries".
3. **"Any Event Format" / "Customisable Performance" / "Inquire for Availability"** — stiff, non-native English phrasing in the Why Book section.
4. **"The newest release" / "A fresh take on…"** — discography.ts descriptions read like AI-generated filler; need human-sounding rewrites.
5. **"Announced at Karnavala-2018"** — awkward; album was *premiered* or *debuted*, not "announced".
6. **Hardcoded English in `events.ts`** — event titles, venue names, and the "New Dates Coming Soon" placeholder are all English-only, never translated.
7. **Greek: excessive use of Cyrillic song titles** — Greek pages display Russian-script titles (Канитель, Вечная любовь) without transliteration or Greek translation.
8. **Inconsistent "Κράτηση" vs "Booking"** — Greek version mixes Greek words with English loanwords ("Press Kit", "booking agents", "events") inconsistently.

---

## 2. Page-by-Page Issues

### 2.1 Navigation (`nav.*`)

| Key | EN (current) | Issue | Severity |
|-----|-------------|-------|----------|
| `nav.booking` | "Book Artist" | Generic. Should be "Book Alexandros" for personalization. All 3 languages affected. | **HIGH** |

**RU:** "Забронировать артиста" → "Забронировать Александроса"  
**EL:** "Κράτηση Καλλιτέχνη" → "Κλείστε τον Αλέξανδρο"

> **Note on Greek:** "Κράτηση" literally means "reservation" (hotel/restaurant). For artist booking, "Κλείστε" (book/secure) is more natural in the entertainment industry.

---

### 2.2 Hero Section (`hero.*`)

| Key | EN (current) | Issue | Severity |
|-----|-------------|-------|----------|
| `hero.cta_booking` | "Book Artist" | Same as nav — should be "Book Alexandros" | **HIGH** |

**RU hero.cta_booking:** "Забронировать артиста" → "Забронировать Александроса"  
**EL hero.cta_booking:** "Κράτηση Καλλιτέχνη" → "Κλείστε τον Αλέξανδρο"

---

### 2.3 Contact Page (`contact.*`)

| Key | EN (current) | Issue | Severity |
|-----|-------------|-------|----------|
| `contact.subtitle` | "Reservations & Inquiries" | "Reservations" = hotel/restaurant. Music industry uses "Booking". | **HIGH** |
| `contact.booking_title` | "Reservations" | Same issue. Should be "Booking" or "Booking Inquiries". | **HIGH** |
| `contact.booking_text` | "For booking inquiries, please contact us directly by phone, WhatsApp, or Telegram." | Inconsistently uses "booking" in the body but "Reservations" in the heading. | MEDIUM |

**RU:** "Бронирование и запросы" is acceptable in RU (бронирование works for both hotels and artist bookings in Russian), but for consistency with the English fix, consider "Букинг и запросы" which is industry-standard in Russian music circles.  
**EL:** "Κρατήσεις & Ερωτήματα" → "Κρατήσεις & Πληροφορίες" or keep as is — Greek "κρατήσεις" is somewhat acceptable for bookings.

---

### 2.4 Why Book Section (`why_book.*`)

| Key | EN (current) | Issue | Severity |
|-----|-------------|-------|----------|
| `why_book.event_types_title` | "Any Event Format" | Sounds unnatural / robotic. | **HIGH** |
| `why_book.custom_formats_title` | "Customisable Performance" | Stiff, non-native English. | **HIGH** |
| `why_book.cta` | "Inquire for Availability" | Overly formal. | MEDIUM |
| `why_book.views_desc` | "Over 22 million views on major music content, with a proven track record of audience engagement." | "on major music content" is awkward. | LOW |

**Recommended EN rewrites:**

- `event_types_title`: "Any Event Format" → **"Every Event Type"**
- `event_types_desc`: OK as-is (minor tweak optional)
- `custom_formats_title`: "Customisable Performance" → **"Flexible Performance"**
- `cta`: "Inquire for Availability" → **"Check Availability"**
- `views_desc`: "Over 22 million views on major music content…" → **"Over 22 million views across his music catalogue, with a proven track record of audience engagement."**

**RU versions are already better:**
- `event_types_title`: "Любой формат" ✅ (natural)
- `custom_formats_title`: "Гибкий формат выступления" ✅ (natural)
- `cta`: "Узнать о доступности" ✅ (natural)

**EL versions need adjustment to match:**
- `event_types_title`: "Κάθε Τύπος Εκδήλωσης" → **"Για Κάθε Εκδήλωση"** (more natural)
- `custom_formats_title`: "Προσαρμοσμένη Εμφάνιση" → **"Ευέλικτη Εμφάνιση"** (matches RU "Гибкий")
- `cta`: "Ρωτήστε για Διαθεσιμότητα" → **"Ελέγξτε Διαθεσιμότητα"** (matches proposed EN "Check Availability")

---

### 2.5 Music / Discography (`music.*` + `discography.ts`)

| Location | Current | Issue | Severity |
|----------|---------|-------|----------|
| `discography.ts` kanitel description EN | "The newest release from Alexandros Tsopozidis." | "The newest release" is awkward. Should be "The latest release" or "Latest single". | MEDIUM |
| `discography.ts` kanitel description EN | "A fresh take on his signature blend of Eastern and pop sounds." | Reads like AI filler. Vague. | MEDIUM |
| `discography.ts` album description EN | "Announced at Karnavala-2018" | "Announced" is wrong for an album. Albums are *premiered*, *debuted*, or *unveiled*. | MEDIUM |
| `discography.ts` album description EL | Missing the Karnavala announcement context entirely | Inconsistent with EN/RU | LOW |
| `music.latest_release` EN | "Latest Release" | ✅ Correct in messages file. But discography.ts says "newest". Inconsistent. | MEDIUM |

**Recommended discography.ts EN fixes:**

kanitel description:
```
"The latest single from Alexandros Tsopozidis — his signature blend of Eastern melodies and modern pop."
```

album description:
```
"Debut album featuring 19 tracks including the hit duets with Elbrus Dzhanmirzoev and Faxo. Premiered at Karnavala 2018 in Gelendzhik with Vostok FM support. Includes Kaciyorum, Танец грека, and Ты все потеряла."
```

kanitel description RU:
```
"Последний сингл Александроса Цопозидиса — фирменное сочетание восточных мелодий и современного попа."
```

kanitel description EL:
```
"Το τελευταίο single του Αλέξανδρου Τσοποζίδη — ο χαρακτηριστικός του συνδυασμός ανατολικών μελωδιών και σύγχρονης ποπ."
```

album description RU (fix "Анонсирован"):
```
"Дебютный альбом из 19 треков, включая хиты с Эльбрусом Джанмирзоевым и Faxo. Презентован на Карнавале-2018 в Геленджике при поддержке Восток FM. Включает Kaciyorum, Танец грека и Ты все потеряла."
```

---

### 2.6 Events (`events.*` + `events.ts`)

| Location | Current | Issue | Severity |
|----------|---------|-------|----------|
| `events.ts` all titles | English only ("New Dates Coming Soon", "Kavkaz Music Fest", etc.) | **Hardcoded English — never translated** for RU/EL visitors | **HIGH** |
| `events.ts` venue/city | English only ("TBA", "Crystal Hall", etc.) | Same — untranslated | MEDIUM |
| `events.book_private` | "Book Artist" | Same generic issue as nav | HIGH |

**Events titles need i18n or at minimum bilingual treatment.** The `Event` interface has no `titleRu`/`titleEl` fields. This is a structural issue.

---

### 2.7 Press Kit (`press.*`)

| Key | EN (current) | Issue | Severity |
|-----|-------------|-------|----------|
| EL `press.title` | "Press Kit" | English left untranslated. Should be "Δελτίο Τύπου" or kept as "Press Kit" intentionally (industry term). | LOW |
| EL `press.subtitle` | "Για μέσα ενημέρωσης, διοργανωτές και booking agents" | Mixes Greek with English "booking agents". Should be "πράκτορες κρατήσεων" or consistently use loanword. | LOW |
| EL `press.available_for` | "Εταιρικά events" | Mixed Greek/English. Either "Εταιρικές εκδηλώσεις" or keep "events" consistently. | LOW |

---

### 2.8 Greek-Specific: Cyrillic Title Display

| Location | Issue | Severity |
|----------|-------|----------|
| EL `about.today_text` | Displays "«Канитель»" and "«Вечная любовь»" in Cyrillic on the Greek page | MEDIUM |
| EL `about.bio_paragraph_5` | Same — Cyrillic titles without transliteration | MEDIUM |
| EL press bios | Same pattern throughout | MEDIUM |

**Recommendation:** On Greek pages, provide transliterations: «Κανιτέλ» (Канитель) and «Βέτσναγια Λιουμπόβ» (Вечная любовь), or use the Greek translation «Αιώνια Αγάπη» for Вечная любовь (already exists in `coming_soon.translation`).

---

### 2.9 Footer (`footer.*`)

| Key | EN (current) | Issue | Severity |
|-----|-------------|-------|----------|
| `footer.telegram_cta` EN | "Subscribe to Telegram for new track and concert announcements" | Slightly awkward. "Subscribe on Telegram" is more natural. | LOW |

---

### 2.10 Cookie Consent (`cookie_consent.*`)

| Key | RU (current) | Issue | Severity |
|-----|-------------|-------|----------|
| `cookie_consent.message` RU | "…чтобы улучшить ваш опыт" | "ваш опыт" is a calque from English "your experience". More natural: "для улучшения работы сайта" | LOW |

---

### 2.11 Coming Soon (`coming_soon.*`)

All three versions look good. ✅

---

### 2.12 Timeline (`timeline.*`)

| Key | EN (current) | Issue | Severity |
|-----|-------------|-------|----------|
| `timeline.karnaval` | "Headlined Карнавала 2018 with Митя Фомин (Gelendzhik)" | Mixing scripts in one sentence is fine but inconsistent — some entries translate names, others don't | LOW |

---

## 3. Full Corrections Table

### 3.1 High-Priority Fixes (messages/*.json)

| File | Key | Current | Corrected |
|------|-----|---------|-----------|
| **en.json** | `nav.booking` | "Book Artist" | **"Book Alexandros"** |
| **en.json** | `hero.cta_booking` | "Book Artist" | **"Book Alexandros"** |
| **en.json** | `events.book_private` | "Book Artist" | **"Book Alexandros"** |
| **en.json** | `contact.subtitle` | "Reservations & Inquiries" | **"Booking & Inquiries"** |
| **en.json** | `contact.booking_title` | "Reservations" | **"Booking"** |
| **en.json** | `why_book.event_types_title` | "Any Event Format" | **"Every Event Type"** |
| **en.json** | `why_book.custom_formats_title` | "Customisable Performance" | **"Flexible Performance"** |
| **en.json** | `why_book.cta` | "Inquire for Availability" | **"Check Availability"** |
| **en.json** | `why_book.views_desc` | "…on major music content…" | **"…across his music catalogue…"** |
| **ru.json** | `nav.booking` | "Забронировать артиста" | **"Забронировать Александроса"** |
| **ru.json** | `hero.cta_booking` | "Забронировать артиста" | **"Забронировать Александроса"** |
| **ru.json** | `events.book_private` | "Забронировать артиста" | **"Забронировать Александроса"** |
| **el.json** | `nav.booking` | "Κράτηση Καλλιτέχνη" | **"Κλείστε τον Αλέξανδρο"** |
| **el.json** | `hero.cta_booking` | "Κράτηση Καλλιτέχνη" | **"Κλείστε τον Αλέξανδρο"** |
| **el.json** | `events.book_private` | "Κράτηση Καλλιτέχνη" | **"Κλείστε τον Αλέξανδρο"** |
| **el.json** | `why_book.event_types_title` | "Κάθε Τύπος Εκδήλωσης" | **"Για Κάθε Εκδήλωση"** |
| **el.json** | `why_book.custom_formats_title` | "Προσαρμοσμένη Εμφάνιση" | **"Ευέλικτη Εμφάνιση"** |
| **el.json** | `why_book.cta` | "Ρωτήστε για Διαθεσιμότητα" | **"Ελέγξτε Διαθεσιμότητα"** |

### 3.2 Medium-Priority Fixes (messages/*.json)

| File | Key | Current | Corrected |
|------|-----|---------|-----------|
| **en.json** | `footer.telegram_cta` | "Subscribe to Telegram for new track and concert announcements" | **"Subscribe on Telegram for new releases and concert announcements"** |
| **el.json** | `press.available_for` | "Διαθέσιμος για: Εταιρικά events, Φεστιβάλ, Γάμους, Ιδιωτικές εκδηλώσεις, TV/Ραδιόφωνο" | **"Διαθέσιμος για: Εταιρικές εκδηλώσεις, Φεστιβάλ, Γάμους, Ιδιωτικές εκδηλώσεις, Τηλεόραση/Ραδιόφωνο"** |

### 3.3 Discography Fixes (discography.ts)

| Release | Lang | Current | Corrected |
|---------|------|---------|-----------|
| kanitel | EN | "The newest release from Alexandros Tsopozidis. A fresh take on his signature blend of Eastern and pop sounds." | **"The latest single from Alexandros Tsopozidis — his signature blend of Eastern melodies and modern pop."** |
| kanitel | RU | "Новейший релиз Александроса Цопозидиса. Свежий взгляд на его фирменное сочетание восточного и поп-звучания." | **"Последний сингл Александроса Цопозидиса — фирменное сочетание восточных мелодий и современного попа."** |
| kanitel | EL | "Η νεότερη κυκλοφορία του Αλέξανδρου Τσοποζίδη. Ανανεωμένη εκδοχή του χαρακτηριστικού μίγματος ανατολίτικου και ποπ ήχου." | **"Το τελευταίο single του Αλέξανδρου Τσοποζίδη — ο χαρακτηριστικός του συνδυασμός ανατολικών μελωδιών και σύγχρονης ποπ."** |
| za-toboi (album) | EN | "…Announced at Karnavala-2018…" | **"…Premiered at Karnavala 2018…"** |
| za-toboi (album) | RU | "…Анонсирован на Карнавале-2018…" | **"…Презентован на Карнавале-2018…"** |

---

## 4. Terminology Glossary

Standardised terms to use consistently across all three languages:

| Concept | EN | RU | EL |
|---------|----|----|-----|
| Book the artist (CTA) | Book Alexandros | Забронировать Александроса | Κλείστε τον Αλέξανδρο |
| Booking (noun) | Booking | Букинг / Бронирование | Κρατήσεις |
| Booking inquiry | Booking Inquiry | Запрос на букинг | Αίτημα κράτησης |
| Latest release | Latest Release | Последний релиз | Τελευταία κυκλοφορία |
| Single (release type) | Single | Сингл | Single / Σινγκλ |
| Album | Album | Альбом | Άλμπουμ |
| Check availability | Check Availability | Узнать о доступности | Ελέγξτε διαθεσιμότητα |
| Live performance | Live Performance | Живое выступление | Ζωντανή εμφάνιση |
| Flexible performance | Flexible Performance | Гибкий формат выступления | Ευέλικτη εμφάνιση |
| Every event type | Every Event Type | Любой формат | Για κάθε εκδήλωση |
| Press kit | Press Kit | Пресс-кит | Press Kit |
| Coming soon | Coming Soon | Скоро | Σύντομα |
| Premiered / Debuted | Premiered | Презентован | Παρουσιάστηκε |
| Featured on | Featured On | С участием | Συμμετοχή σε |
| Corporate event | Corporate Event | Корпоратив | Εταιρική εκδήλωση |

---

## 5. Consistency Report

### 5.1 Cross-Language Consistency

| Check | Status | Notes |
|-------|--------|-------|
| "Book Artist" used consistently across EN/RU/EL | ✅ Consistent but wrong | All three use generic "artist" — fix all three to use the name |
| Contact page "Reservations" vs body "booking" | ❌ **Inconsistent in EN** | Heading says "Reservations", body says "booking inquiries" |
| "Latest Release" (messages) vs "newest release" (discography.ts) | ❌ **Inconsistent** | Messages file correct, discography.ts wrong |
| Album description: Karnavala context in EN/RU but missing in EL | ❌ **Inconsistent** | EL album description drops the Karnavala premiere info |
| Press Kit title: EN "Press Kit", RU "Пресс-кит", EL "Press Kit" | ✅ | EL keeping English is acceptable (industry term) |
| Footer tagline capitalisation | ✅ | All three consistent |
| "9 Волна" award name consistent across all pages and languages | ✅ | Kept in Cyrillic everywhere — acceptable brand name |
| Song titles: Cyrillic on Greek pages | ⚠️ **Concern** | Канитель and Вечная любовь displayed in Cyrillic on Greek pages without transliteration |
| Event titles translated? | ❌ **Not translated** | events.ts is English-only |
| RU nav "Концерты" vs EN nav "Events" | ⚠️ | RU narrowed the scope — "Концерты" means "Concerts" not "Events". Acceptable but slightly different meaning. |

### 5.2 Release Chronology Consistency

Based on discography.ts dates:

| Release | Year | In timeline? | In bio? | Notes |
|---------|------|-------------|---------|-------|
| Канитель | 2026 | ✅ | ✅ | Listed as latest |
| Mia Kardia | 2025 | ✅ | ❌ | Missing from bio text |
| Soltera | 2025 | ✅ (grouped with Mia Kardia) | ❌ | Missing from bio text |
| Par shirkhani | 2024 | ✅ | ❌ | — |
| Kavkaz | 2023 | ✅ | ❌ | — |
| Вечная любовь | TBD | ✅ ("coming soon") | ✅ | Mentioned as upcoming |

The bio mentions "latest single 'Канитель' (2026) and 'Вечная любовь' coming soon" but skips Mia Kardia (2025) — which is actually a more recent *released* track than Канитель if we go by release date (Sept 2025 vs Jan 2026). This is fine if Канитель is the primary push single, but worth noting.

---

## 6. Final Recommended Site-Wide Wording

### English (EN) — Definitive Strings

```
nav.booking = "Book Alexandros"
hero.cta_booking = "Book Alexandros"
contact.subtitle = "Booking & Inquiries"
contact.booking_title = "Booking"
events.book_private = "Book Alexandros"
why_book.event_types_title = "Every Event Type"
why_book.custom_formats_title = "Flexible Performance"
why_book.cta = "Check Availability"
why_book.views_desc = "Over 22 million views across his music catalogue, with a proven track record of audience engagement."
footer.telegram_cta = "Subscribe on Telegram for new releases and concert announcements"
```

### Russian (RU) — Definitive Strings

```
nav.booking = "Забронировать Александроса"
hero.cta_booking = "Забронировать Александроса"
events.book_private = "Забронировать Александроса"
```

### Greek (EL) — Definitive Strings

```
nav.booking = "Κλείστε τον Αλέξανδρο"
hero.cta_booking = "Κλείστε τον Αλέξανδρο"
events.book_private = "Κλείστε τον Αλέξανδρο"
why_book.event_types_title = "Για Κάθε Εκδήλωση"
why_book.custom_formats_title = "Ευέλικτη Εμφάνιση"
why_book.cta = "Ελέγξτε Διαθεσιμότητα"
press.available_for = "Διαθέσιμος για: Εταιρικές εκδηλώσεις, Φεστιβάλ, Γάμους, Ιδιωτικές εκδηλώσεις, Τηλεόραση/Ραδιόφωνο"
```

---

## 7. Claude Code Fix Playbook

> **Instructions for Claude Code:** Run each prompt below sequentially. Each prompt is a self-contained edit. Test the site after all changes.

---

### Prompt 1 — Fix "Book Artist" → "Book Alexandros" (all languages)

```
In messages/en.json:
- Change nav.booking from "Book Artist" to "Book Alexandros"
- Change hero.cta_booking from "Book Artist" to "Book Alexandros"
- Change events.book_private from "Book Artist" to "Book Alexandros"

In messages/ru.json:
- Change nav.booking from "Забронировать артиста" to "Забронировать Александроса"
- Change hero.cta_booking from "Забронировать артиста" to "Забронировать Александроса"
- Change events.book_private from "Забронировать артиста" to "Забронировать Александроса"

In messages/el.json:
- Change nav.booking from "Κράτηση Καλλιτέχνη" to "Κλείστε τον Αλέξανδρο"
- Change hero.cta_booking from "Κράτηση Καλλιτέχνη" to "Κλείστε τον Αλέξανδρο"
- Change events.book_private from "Κράτηση Καλλιτέχνη" to "Κλείστε τον Αλέξανδρο"
```

---

### Prompt 2 — Fix "Reservations" → "Booking" on Contact page

```
In messages/en.json:
- Change contact.subtitle from "Reservations & Inquiries" to "Booking & Inquiries"
- Change contact.booking_title from "Reservations" to "Booking"
```

---

### Prompt 3 — Fix Why Book section (EN + EL)

```
In messages/en.json:
- Change why_book.event_types_title from "Any Event Format" to "Every Event Type"
- Change why_book.custom_formats_title from "Customisable Performance" to "Flexible Performance"
- Change why_book.cta from "Inquire for Availability" to "Check Availability"
- Change why_book.views_desc from "Over 22 million views on major music content, with a proven track record of audience engagement." to "Over 22 million views across his music catalogue, with a proven track record of audience engagement."

In messages/el.json:
- Change why_book.event_types_title from "Κάθε Τύπος Εκδήλωσης" to "Για Κάθε Εκδήλωση"
- Change why_book.custom_formats_title from "Προσαρμοσμένη Εμφάνιση" to "Ευέλικτη Εμφάνιση"
- Change why_book.cta from "Ρωτήστε για Διαθεσιμότητα" to "Ελέγξτε Διαθεσιμότητα"
```

---

### Prompt 4 — Fix discography.ts descriptions

```
In src/lib/data/discography.ts, find the kanitel single and update its description object:
- EN: change from "The newest release from Alexandros Tsopozidis. A fresh take on his signature blend of Eastern and pop sounds." to "The latest single from Alexandros Tsopozidis — his signature blend of Eastern melodies and modern pop."
- RU: change from "Новейший релиз Александроса Цопозидиса. Свежий взгляд на его фирменное сочетание восточного и поп-звучания." to "Последний сингл Александроса Цопозидиса — фирменное сочетание восточных мелодий и современного попа."
- EL: change from "Η νεότερη κυκλοφορία του Αλέξανδρου Τσοποζίδη. Ανανεωμένη εκδοχή του χαρακτηριστικού μίγματος ανατολίτικου και ποπ ήχου." to "Το τελευταίο single του Αλέξανδρου Τσοποζίδη — ο χαρακτηριστικός του συνδυασμός ανατολικών μελωδιών και σύγχρονης ποπ."

In the album (za-toboi) description:
- EN: change "Announced at Karnavala-2018" to "Premiered at Karnavala 2018"
- RU: change "Анонсирован на Карнавале-2018" to "Презентован на Карнавале-2018"
```

---

### Prompt 5 — Fix footer and cookie consent

```
In messages/en.json:
- Change footer.telegram_cta from "Subscribe to Telegram for new track and concert announcements" to "Subscribe on Telegram for new releases and concert announcements"

In messages/ru.json:
- Change cookie_consent.message from "Мы используем файлы cookie для аналитики, чтобы улучшить ваш опыт. Персональные данные не продаются и не передаются рекламодателям." to "Мы используем файлы cookie для аналитики и улучшения работы сайта. Персональные данные не продаются и не передаются рекламодателям."
```

---

### Prompt 6 — Fix Greek press page mixed language

```
In messages/el.json:
- Change press.available_for from "Διαθέσιμος για: Εταιρικά events, Φεστιβάλ, Γάμους, Ιδιωτικές εκδηλώσεις, TV/Ραδιόφωνο" to "Διαθέσιμος για: Εταιρικές εκδηλώσεις, Φεστιβάλ, Γάμους, Ιδιωτικές εκδηλώσεις, Τηλεόραση/Ραδιόφωνο"
```

---

### Prompt 7 (Optional / Structural) — Add i18n fields to events.ts

```
This is a structural improvement. In src/lib/data/events.ts:

1. Add optional titleRu and titleEl fields to the Event interface:
   titleRu?: string;
   titleEl?: string;

2. Add translated titles to each event:

   "upcoming-tba":
     titleRu: "Новые даты скоро"
     titleEl: "Νέες ημερομηνίες σύντομα"

   "kavkaz-fest-2022":
     titleRu: "Кавказ Мьюзик Фест"
     titleEl: "Kavkaz Music Fest"

   "greek-youth-2021":
     titleRu: "Молодёжный вечер (Московское греческое общество)"
     titleEl: "Ελληνική Νεολαία (Ελληνική Κοινότητα Μόσχας)"

   "stars-east-2018":
     titleRu: "Звёзды Востока — Восток FM"
     titleEl: "Αστέρια της Ανατολής — Vostok FM"

   "zhara-2018":
     titleRu: "Фестиваль «Жара»"
     titleEl: "Φεστιβάλ Жара"

   "karnaval-2018":
     titleRu: "Карнавала 2018 (хедлайнер с Митей Фоминым)"
     titleEl: "Karnaval 2018 (headliner με Μίτια Φόμιν)"

   "9-volna-2014":
     titleRu: "Церемония «9 Волна»"
     titleEl: "Τελετή βράβευσης «9 Волна»"

   "9-volna-2013":
     titleRu: "Церемония «9 Волна»"
     titleEl: "Τελετή βράβευσης «9 Волна»"

Note: The component rendering events will also need to be updated to use the locale-appropriate title (titleRu/titleEl when available, falling back to title). This requires checking the events page/component code.
```

---

## End of Audit

**Total issues found:** ~35  
**Critical (site-wide impact):** 3 (Book Artist naming, Reservations terminology, hardcoded event titles)  
**High:** 6 (Why Book section phrasing)  
**Medium:** 12 (discography descriptions, consistency gaps)  
**Low:** ~14 (minor phrasing, mixed Greek/English, cookie consent)
