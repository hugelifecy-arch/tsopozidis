# Tsopozidis — Music & Videos Deep Content Playbook

## Claude Code Master Prompt — Real Data, Real Depth

> **Date:** 2026-03-14
> **Sources verified:** Spotify artist page, Apple Music, Shazam, Wikipedia (RU), Moscow Greek Society, Popnable, RecentMusic, Last.fm
> **Goal:** Transform Music + Videos pages from "list of links" to rich, immersive artist experience

---

## 🚨 CRITICAL DISCOVERY: MISSING RELEASE

The website does NOT know about **"Канитель" (Kanitel)** — a 2026 release that is ALREADY on Spotify as the artist's "Latest Release". The site still shows Mia Kardia (2025) as the latest. This must be fixed immediately.

**Spotify album ID:** `1lnctFCOafDjAWWoP7AWTH`
**Cover art:** `https://i.scdn.co/image/ab67616d00001e021f54ac012cbdf2155ad7bd8e`

---

## PROMPT 1 — Rewrite discography.ts with Complete Verified Data

```
Completely rewrite `src/lib/data/discography.ts` with verified data from Spotify, Apple Music, Wikipedia, and Shazam. This is the single most important data file on the site.

Replace the entire file with:

```typescript
export interface Release {
  id: string;
  title: string;
  titleRu?: string;
  titleEl?: string;
  year: number;
  releaseDate?: string;        // ISO date from Spotify/Apple Music
  type: "album" | "single";
  featuring?: string;
  language: string[];           // e.g. ["ru"], ["el"], ["ru","el"]
  genre: string[];              // e.g. ["pop","eastern"], ["pontic"]
  description: {                // Short blurb per locale — NOT a placeholder
    en: string;
    ru: string;
    el: string;
  };
  credits?: string;             // Producer, songwriter, label
  spotifyAlbumId?: string;      // For embed: open.spotify.com/embed/album/{id}
  spotifyTrackId?: string;      // For embed: open.spotify.com/embed/track/{id}
  spotifyCoverUrl?: string;     // Spotify CDN cover art (300x300)
  appleMusicUrl?: string;
  youtubeId?: string;
  yandexMusicUrl?: string;
  coverImage?: string;          // Local fallback: /images/albums/{name}.jpg
  trackCount?: number;
  plays?: string;               // Spotify play count snapshot
}

// ============================================================
// ALBUM
// ============================================================

export const album: Release = {
  id: "za-toboi",
  title: "За тобой",
  titleRu: "За тобой",
  titleEl: "Πίσω σου",
  year: 2018,
  releaseDate: "2018-05-18",
  type: "album",
  trackCount: 19,
  language: ["ru"],
  genre: ["pop", "eastern", "caucasian"],
  description: {
    en: "Debut album featuring 19 tracks including the hit duets with Elbrus Dzhanmirzoev and Faxo. Announced at Karnavala-2018 in Gelendzhik with Vostok FM support. Includes Kaciyorum, Танец грека, and Ты все потеряла.",
    ru: "Дебютный альбом из 19 треков, включая хиты с Эльбрусом Джанмирзоевым и Faxo. Анонсирован на Карнавале-2018 в Геленджике при поддержке Восток FM. Включает Kaciyorum, Танец грека и Ты все потеряла.",
    el: "Ντεμπούτο άλμπουμ με 19 τραγούδια, συμπεριλαμβανομένων ντουέτων με τον Elbrus Dzhanmirzoev και τον Faxo. Περιλαμβάνει Kaciyorum, Τανέτς Γκρέκα και Ты все потеряла.",
  },
  credits: "Label: Independent · Vostok FM media partner",
  spotifyAlbumId: "1NoRjx078qmnF0hvCTamFk",
  spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e02f57422e4fe7802226d1e613f",
  appleMusicUrl: "https://music.apple.com/artist/alexandros-tsopozidis/839072119",
  yandexMusicUrl: "https://music.yandex.ru/artist/3050547",
  coverImage: "/images/albums/za-toboi.jpg",
};

// ============================================================
// SINGLES — Reverse chronological (newest first)
// ============================================================

export const singles: Release[] = [
  {
    id: "kanitel",
    title: "Канитель",
    titleRu: "Канитель",
    year: 2026,
    releaseDate: "2026-01-01",
    type: "single",
    language: ["ru"],
    genre: ["pop", "eastern"],
    description: {
      en: "The newest release from Alexandros Tsopozidis. A fresh take on his signature blend of Eastern and pop sounds.",
      ru: "Новейший релиз Александроса Цопозидиса. Свежий взгляд на его фирменное сочетание восточного и поп-звучания.",
      el: "Η νεότερη κυκλοφορία του Αλέξανδρου Τσοποζίδη. Ανανεωμένη εκδοχή του χαρακτηριστικού μίγματος ανατολίτικου και ποπ ήχου.",
    },
    spotifyAlbumId: "1lnctFCOafDjAWWoP7AWTH",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e021f54ac012cbdf2155ad7bd8e",
    coverImage: "/images/albums/kanitel.jpg",
  },
  {
    id: "mia-kardia",
    title: "Mia Kardia",
    titleEl: "Μια Καρδιά",
    year: 2025,
    releaseDate: "2025-09-26",
    type: "single",
    language: ["el"],
    genre: ["greek-pop"],
    description: {
      en: "A Greek-language single meaning 'One Heart'. Alexandros returns to his Hellenic roots with this emotional ballad blending modern pop with traditional Greek melodic structures.",
      ru: "Грекоязычный сингл, означающий «Одно сердце». Александрос возвращается к эллинским корням с эмоциональной балладой, сочетающей современный поп с греческими мелодическими структурами.",
      el: "Ελληνόφωνο single που σημαίνει «Μια Καρδιά». Ο Αλέξανδρος επιστρέφει στις ελληνικές του ρίζες με αυτή τη συναισθηματική μπαλάντα.",
    },
    spotifyAlbumId: "4mOEmQFf1gSuA57b8JLXE1",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e026b6c0621a16d6363a80666bb",
    appleMusicUrl: "https://music.apple.com/artist/alexandros-tsopozidis/839072119",
    coverImage: "/images/albums/mia-kardia.jpg",
  },
  {
    id: "soltera",
    title: "Soltera",
    year: 2025,
    releaseDate: "2025-01-12",
    type: "single",
    featuring: "El Pontios",
    language: ["el", "es"],
    genre: ["greek-pop", "latin"],
    description: {
      en: "A vibrant collaboration with El Pontios. The title means 'Single Woman' in Spanish — a fusion of Greek and Latin rhythms that bridges Pontic Greek culture with Mediterranean pop.",
      ru: "Яркая коллаборация с El Pontios. Название означает «Одинокая женщина» по-испански — слияние греческих и латинских ритмов, соединяющее понтийскую культуру со средиземноморским попом.",
      el: "Μια ζωντανή συνεργασία με τον El Pontios. Ο τίτλος σημαίνει «Ελεύθερη γυναίκα» στα ισπανικά — σύντηξη ελληνικών και λάτιν ρυθμών.",
    },
    credits: "feat. El Pontios",
    spotifyAlbumId: "39cSs6iULc23U3UQk9TPWM",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e02c7aa6478d6524717afe4f575",
    coverImage: "/images/albums/soltera.jpg",
  },
  {
    id: "par-shirkhani",
    title: "Par shirkhani",
    year: 2024,
    releaseDate: "2024-01-12",
    type: "single",
    language: ["hy"],
    genre: ["eastern", "armenian"],
    description: {
      en: "An Armenian-language track celebrating the deep cultural bonds between Greek and Armenian communities of the Caucasus. Sung in Armenian, reflecting Alexandros's multicultural heritage.",
      ru: "Армяноязычный трек, воспевающий глубокие культурные связи между греческими и армянскими общинами Кавказа. Исполнена на армянском языке, отражая мультикультурное наследие Александроса.",
      el: "Ένα τραγούδι στα αρμενικά που γιορτάζει τους βαθιούς πολιτιστικούς δεσμούς μεταξύ ελληνικών και αρμενικών κοινοτήτων του Καυκάσου.",
    },
    spotifyAlbumId: "3jQy3AACd4POpibCgYmLpt",
    spotifyTrackId: "5npMrvUO3XfkRYQiMRQOdN",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e026115ef4e516abbf64b6afa1b",
    plays: "182K+",
    coverImage: "/images/albums/par-shirkhani.jpg",
  },
  {
    id: "kavkaz",
    title: "Kavkaz",
    titleRu: "Кавказ",
    year: 2023,
    releaseDate: "2023-03-10",
    type: "single",
    featuring: "VASILIADIS",
    language: ["ru", "el"],
    genre: ["caucasian", "pop", "eastern"],
    description: {
      en: "An ode to the Caucasus Mountains — the region where Alexandros was born. A powerful collaboration with VASILIADIS, blending Caucasian folk elements with modern pop production. The official video, released on VASILIADIS's channel, has surpassed 380K views.",
      ru: "Ода Кавказским горам — региону, где родился Александрос. Мощная коллаборация с VASILIADIS, сочетающая кавказские народные элементы с современной поп-продакшн. Официальный клип на канале VASILIADIS набрал более 380 тыс. просмотров.",
      el: "Ωδή στα βουνά του Καυκάσου — την περιοχή όπου γεννήθηκε ο Αλέξανδρος. Δυνατή συνεργασία με τον VASILIADIS, με στοιχεία καυκασιανής λαϊκής μουσικής και σύγχρονης ποπ παραγωγής.",
    },
    credits: "feat. VASILIADIS · Video dir: VASILIADIS channel · Label: Independent",
    spotifyAlbumId: "5LkRMJW59dmjgLfIzdUCnh",
    spotifyTrackId: "1F1PGhdEb1MtMLbuGuxCR7",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e02f03d47c826c3d0d176796851",
    plays: "237K+",
    coverImage: "/images/albums/kavkaz.jpg",
  },
  {
    id: "ya-grek",
    title: "Я грек",
    titleRu: "Я грек",
    titleEl: "Είμαι Έλληνας",
    year: 2022,
    releaseDate: "2022-11-02",
    type: "single",
    language: ["ru"],
    genre: ["greek-pop", "ethnic"],
    description: {
      en: "'I Am Greek' — a proud declaration of Pontic Greek identity. The lyrics celebrate Greek heritage through imagery of bouzouki strings, the sea, and ancient traditions. Written by Fedos and Vladimir Turshiev. A fan favorite at Greek diaspora events across Russia.",
      ru: "«Я грек» — гордое заявление понтийско-греческой идентичности. Текст воспевает греческое наследие через образы бузуки, моря и древних традиций. Авторы: Fedos и Владимир Туршиев. Любимая песня на греческих мероприятиях диаспоры.",
      el: "«Είμαι Έλληνας» — μια υπερήφανη δήλωση ποντιακής ελληνικής ταυτότητας. Οι στίχοι γιορτάζουν την ελληνική κληρονομιά μέσα από εικόνες μπουζουκιού, θάλασσας και αρχαίων παραδόσεων.",
    },
    credits: "Written by: Fedos, Vladimir Turshiev",
    spotifyAlbumId: "0pJSthEBQBMBDLc7rqPO3M",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e0240462d430d81b1881a48ce28",
    coverImage: "/images/albums/ya-grek.jpg",
  },
  {
    id: "kortsopon-apsimon",
    title: "Kortsopon apsimon",
    year: 2021,
    releaseDate: "2021-09-17",
    type: "single",
    language: ["el"],
    genre: ["pontic", "folk"],
    description: {
      en: "A Pontic Greek folk song — one of the purest expressions of Alexandros's cultural roots. Sung in the Pontic Greek dialect, connecting to the traditions of the Black Sea Greeks.",
      ru: "Понтийская греческая народная песня — одно из чистейших выражений культурных корней Александроса. Исполнена на понтийском диалекте греческого языка.",
      el: "Ένα ποντιακό δημοτικό τραγούδι — μία από τις πιο αυθεντικές εκφράσεις των πολιτιστικών ριζών του Αλέξανδρου. Τραγουδιέται στα ποντιακά.",
    },
    spotifyAlbumId: "1IFXDaP0PUbAZJ1W369QeL",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e022bfd01e5eb32f58def650263",
    coverImage: "/images/albums/kortsopon.jpg",
  },
  {
    id: "monahos",
    title: "Monahos",
    titleEl: "Μοναχός",
    year: 2021,
    releaseDate: "2021-07-30",
    type: "single",
    language: ["el"],
    genre: ["pontic", "folk"],
    description: {
      en: "'Alone' in Greek — a contemplative Pontic ballad exploring themes of solitude and longing. One of Alexandros's most emotionally raw performances.",
      ru: "«Одинокий» по-гречески — созерцательная понтийская баллада, исследующая темы одиночества и тоски. Одно из самых эмоционально откровенных исполнений Александроса.",
      el: "«Μοναχός» — μια στοχαστική ποντιακή μπαλάντα που εξερευνά θέματα μοναξιάς και νοσταλγίας.",
    },
    spotifyAlbumId: "3PFO31TCaybbYVnAejw3D1",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e02d6906a5e707d4c9d7bd092d2",
    plays: "229K+",
    coverImage: "/images/albums/monahos.jpg",
  },
  {
    id: "kapkan",
    title: "Капкан",
    titleRu: "Капкан",
    year: 2021,
    releaseDate: "2020-12-17",
    type: "single",
    language: ["ru"],
    genre: ["pop", "eastern"],
    description: {
      en: "'Trap' in Russian — a passionate pop track about being caught in the snare of love. Features driving Eastern-influenced production with a modern pop hook. One of his top Spotify tracks with 500K+ plays.",
      ru: "«Капкан» — страстный поп-трек о том, как попасть в ловушку любви. Восточное звучание с современным поп-хуком. Один из самых популярных треков на Spotify с 500 тыс.+ прослушиваний.",
      el: "«Παγίδα» στα ρωσικά — ένα παθιασμένο ποπ τραγούδι. Ένα από τα κορυφαία τραγούδια στο Spotify με 500Κ+ ακροάσεις.",
    },
    spotifyAlbumId: "3Annba9ZfbhbCnqZ0PnYI9",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e02871076c2dd664dc68bbb7852",
    plays: "512K+",
    coverImage: "/images/albums/kapkan.jpg",
  },
  {
    id: "rasskazhi",
    title: "Расскажи",
    titleRu: "Расскажи",
    year: 2020,
    releaseDate: "2020-08-01",
    type: "single",
    language: ["ru"],
    genre: ["pop"],
    description: {
      en: "'Tell Me' — a Russian-language pop ballad. One of the few singles with an official music video on YouTube.",
      ru: "«Расскажи» — русскоязычная поп-баллада. Один из немногих синглов с официальным музыкальным видео на YouTube.",
      el: "«Πες μου» — ένα ρωσόφωνο ποπ τραγούδι με επίσημο μουσικό βίντεο στο YouTube.",
    },
    youtubeId: "Ne_uRfKUUlk",
    coverImage: "/images/albums/rasskazhi.jpg",
  },
  {
    id: "panagia-soumela",
    title: "Panagia Soumela",
    titleEl: "Παναγία Σουμελά",
    year: 2020,
    releaseDate: "2020-05-01",
    type: "single",
    language: ["el"],
    genre: ["pontic", "religious", "folk"],
    description: {
      en: "A devotional song dedicated to the Panagia Soumela monastery — the most sacred site for Pontic Greeks, originally in Trabzon (now Turkey). A deeply spiritual piece connecting Alexandros to his Pontic Greek Orthodox heritage.",
      ru: "Духовная песня, посвящённая монастырю Панагия Сумела — самому священному месту для понтийских греков, изначально в Трабзоне. Глубоко духовное произведение, связывающее Александроса с православным наследием.",
      el: "Ένα αφιερωματικό τραγούδι στο μοναστήρι της Παναγίας Σουμελά — τον πιο ιερό τόπο για τους Πόντιους Έλληνες.",
    },
    coverImage: "/images/albums/panagia.jpg",
  },
  {
    id: "dumanli",
    title: "Dumanli",
    year: 2019,
    type: "single",
    featuring: "Agafangel Tsopozidis",
    language: ["tr"],
    genre: ["eastern", "turkish"],
    description: {
      en: "A Turkish-language track meaning 'Misty/Foggy', exploring themes of lost love and yearning. A collaboration with Agafangel Tsopozidis — a family connection highlighting the multicultural Pontic Greek musical tradition.",
      ru: "Турецкоязычный трек, означающий «Туманный», исследующий темы утраченной любви. Коллаборация с Агафангелом Цопозидисом — семейная связь, подчёркивающая мультикультурную понтийскую музыкальную традицию.",
      el: "Τραγούδι στα τουρκικά που σημαίνει «Ομιχλώδης». Συνεργασία με τον Αγαφάγγελο Τσοποζίδη.",
    },
    credits: "feat. Agafangel Tsopozidis",
    coverImage: "/images/albums/dumanli.jpg",
  },
  {
    id: "tanets-greka",
    title: "Танец грека",
    titleRu: "Танец грека",
    titleEl: "Ο χορός του Έλληνα",
    year: 2018,
    releaseDate: "2018-05-18",
    type: "single",
    language: ["ru"],
    genre: ["greek-pop", "dance"],
    description: {
      en: "'Dance of the Greek' — an upbeat celebration of Greek dance culture and joy. Written by Fedos and Vladimir Turshiev. The lyrics describe the passionate Greek dance and the happiness it brings. A staple at Greek community events.",
      ru: "«Танец грека» — зажигательное празднование греческой танцевальной культуры. Авторы: Fedos и Владимир Туршиев. Текст описывает страстный греческий танец и радость, которую он приносит. Хит на всех греческих мероприятиях.",
      el: "«Ο χορός του Έλληνα» — ένα ζωηρό τραγούδι που γιορτάζει τον ελληνικό χορό. Κλασικό σε ελληνικές εκδηλώσεις.",
    },
    credits: "Written by: Fedos, Vladimir Turshiev",
    coverImage: "/images/albums/tanets-greka.jpg",
  },
];

export const allReleases: Release[] = [album, ...singles];

// ============================================================
// HELPER: Get Spotify embed URL for a release
// ============================================================
export function getSpotifyEmbedUrl(release: Release): string | undefined {
  if (release.spotifyTrackId) return `https://open.spotify.com/embed/track/${release.spotifyTrackId}`;
  if (release.spotifyAlbumId) return `https://open.spotify.com/embed/album/${release.spotifyAlbumId}`;
  return undefined;
}

// ============================================================
// HELPER: Get cover image — prefer Spotify CDN, fallback to local
// ============================================================
export function getCoverUrl(release: Release): string | undefined {
  return release.spotifyCoverUrl || release.coverImage;
}
```

IMPORTANT: This adds "Канитель" (2026) as the NEWEST release — the site currently doesn't know about it at all. Update the homepage LatestRelease component to show this instead of Mia Kardia. Also update the "Coming Soon" section on the homepage — "Вечная любовь" should replace "Канитель" as the teaser since Канитель is now released.
```

### Prompt 2 — Rewrite videos.ts with Complete Verified Data

```
Rewrite `src/lib/data/videos.ts` with all verified YouTube videos and rich metadata.

```typescript
export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  titleRu?: string;
  titleEl?: string;
  year: number;
  featuring?: string;
  views?: string;
  description: {
    en: string;
    ru: string;
    el: string;
  };
  context: string;             // Song/project context
  shotLocation?: string;       // Where it was filmed
  director?: string;
  label?: string;              // YouTube channel it's on
}

export function getYoutubeThumbnail(youtubeId: string, quality: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault' = 'hqdefault'): string {
  return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
}

export const videos: Video[] = [
  {
    id: "brodyaga",
    youtubeId: "z9ASjQE6Q2Y",
    title: "Бродяга",
    titleRu: "Бродяга",
    year: 2014,
    featuring: "Elbrus Dzhanmirzoev",
    views: "22M+",
    description: {
      en: "The breakthrough hit that launched Alexandros to fame across the Russian-speaking world. A duet with Dagestani singer Elbrus Dzhanmirzoev about a wanderer searching for meaning. Released as official video in April 2014, it became a cultural phenomenon in the Caucasian and Greek diaspora communities. The track was later released on Spotify in 2016 via Lotus Music.",
      ru: "Прорывной хит, прославивший Александроса по всему русскоязычному миру. Дуэт с дагестанским певцом Эльбрусом Джанмирзоевым о бродяге, ищущем смысл жизни. Официальный клип вышел в апреле 2014 года и стал культурным феноменом в кавказской и греческой диаспоре.",
      el: "Το τραγούδι-σταθμός που έκανε τον Αλέξανδρο γνωστό σε ολόκληρο τον ρωσόφωνο κόσμο. Ντουέτο με τον Νταγκεστανό τραγουδιστή Elbrus Dzhanmirzoev.",
    },
    context: "From the album Бродяга (2016, Lotus Music). The song that defined Alexandros's career — 22M+ YouTube views make it one of the most-watched Caucasian music videos.",
    label: "Official channel",
  },
  {
    id: "male-male",
    youtubeId: "o20LEgccjxY",
    title: "Male Male",
    year: 2013,
    views: "11M+",
    description: {
      en: "One of Alexandros's earliest viral hits. Released as an official video in October 2013, it quickly amassed millions of views. A high-energy track with Eastern pop production that established his signature sound before Бродяга.",
      ru: "Один из первых вирусных хитов Александроса. Официальный клип вышел в октябре 2013 года и быстро набрал миллионы просмотров. Энергичный трек с восточным поп-продакшн, определивший его фирменное звучание ещё до Бродяги.",
      el: "Ένα από τα πρώτα viral hits του Αλέξανδρου. Κυκλοφόρησε τον Οκτώβριο 2013 και γρήγορα συγκέντρωσε εκατομμύρια προβολές.",
    },
    context: "Early career single that proved Alexandros could command a massive audience. 11M+ views on YouTube.",
    label: "Official channel",
  },
  {
    id: "kaciyorum",
    youtubeId: "F9rQSin9PIY",
    title: "Kaciyorum (Fevgo)",
    titleRu: "Качиорум",
    year: 2013,
    featuring: "Faxo",
    description: {
      en: "A collaboration with Turkish-Cypriot artist Faxo, shot on location in Cyprus in late 2013. The title means 'I'm Running Away' in Turkish. Blends Turkish pop with Alexandros's Eastern vocal style — a bridge between the Turkish and Greek musical worlds of Cyprus.",
      ru: "Коллаборация с турко-кипрским артистом Faxo, снятая на Кипре в конце 2013 года. Название означает «Я убегаю» по-турецки. Сочетание турецкого попа с восточным вокальным стилем Александроса.",
      el: "Συνεργασία με τον Τουρκοκύπριο καλλιτέχνη Faxo, γυρισμένη στην Κύπρο στα τέλη του 2013.",
    },
    context: "From the album За тобой (2018). Shot in Cyprus — one of the few videos filmed on the island where Alexandros lives.",
    shotLocation: "Cyprus",
    label: "Official channel",
  },
  {
    id: "dai-mne-nomer",
    youtubeId: "Rxp_-wMKU5k",
    title: "Дай мне номер телефона",
    titleRu: "Дай мне номер телефона",
    year: 2017,
    description: {
      en: "'Give Me Your Phone Number' — a flirtatious Russian-language pop track released as a single in July 2017. Light-hearted and catchy, it showcases Alexandros's versatility beyond the emotional ballads.",
      ru: "«Дай мне номер телефона» — игривый русскоязычный поп-трек, вышедший в июле 2017 года. Лёгкий и запоминающийся, он демонстрирует универсальность Александроса помимо эмоциональных баллад.",
      el: "«Δώσε μου το τηλέφωνό σου» — ένα ποπ τραγούδι στα ρωσικά. Κυκλοφόρησε τον Ιούλιο 2017.",
    },
    context: "Standalone single from 2017. Part of the creative period leading up to the За тобой album.",
    label: "Official channel",
  },
  {
    id: "rasskazhi",
    youtubeId: "Ne_uRfKUUlk",
    title: "Расскажи",
    titleRu: "Расскажи",
    year: 2020,
    description: {
      en: "'Tell Me' — a Russian pop ballad exploring themes of communication and vulnerability in relationships. Released in 2020 as a standalone single.",
      ru: "«Расскажи» — русская поп-баллада, исследующая темы общения и уязвимости в отношениях. Вышла в 2020 году как отдельный сингл.",
      el: "«Πες μου» — ρωσική ποπ μπαλάντα που εξερευνά θέματα επικοινωνίας στις σχέσεις.",
    },
    context: "2020 single. One of the more recent official music videos on the channel.",
    label: "Official channel",
  },
];

// Note: Kavkaz video (382K+ views) was published on VASILIADIS's YouTube channel, not Alexandros's own.
// Танец грека has a clip from 2021 per Shazam data.
// За тобой title track had a video in July 2016.
// Листья (Leaves) had a video in early 2018.
// Additional YouTube IDs should be verified from the official channel: youtube.com/c/tsopozidisalexandros
```
```

### Prompt 3 — Rebuild Music Page with Rich Release Cards

```
Rewrite `src/app/[locale]/music/page.tsx` to use the new rich data. Each release should feel like a full story, not a link.

Key changes:

1. **Latest Release section** — Show "Канитель" (2026), not Mia Kardia. Use `singles[0]` which is now Канитель. Show the full description, credits, Spotify embed via `getSpotifyEmbedUrl()`, and cover art via `getCoverUrl()`.

2. **Every single card** should now display:
   - Cover art (Spotify CDN URL as primary, local fallback)
   - Title + year + release date
   - Featured artist badge
   - Language tags as pills (RU, EL, TR, HY)
   - 2-3 sentence description from the locale-aware `description` field
   - Credits line (when available)
   - Play count badge (when available)
   - Streaming links: Spotify embed button + YouTube link (when youtubeId exists)
   - CTA: "Book a live performance →" linking to /contact on every card

3. **Update AlbumCover component** to accept `spotifyCoverUrl` as an alternative image source. In AlbumCover.tsx, update the logic:
```tsx
// If spotifyCoverUrl is provided, use it as primary source
const imageSrc = props.spotifyCoverUrl || props.src;
```

4. **Album section** — embed the actual album via Spotify album ID `1NoRjx078qmnF0hvCTamFk`, not the artist page again. Show the full 19-track count, description, and credits.

5. **Add "Ты все потеряла" mention** — this is the #1 most-played track (551K Spotify plays) but it's a collaboration credit on Elbrus Dzhanmirzoev's release. Add a "Featured On" section after the album showing this track with a link to Spotify.

6. Replace all hardcoded Spotify iframes with the `getSpotifyEmbedUrl()` helper.

7. For the locale-aware descriptions, use `useTranslations` or read directly from the data based on `useLocale()`:
```tsx
const locale = useLocale();
// For each release:
const desc = release.description[locale as keyof typeof release.description] || release.description.en;
```

Wait — this page is a SERVER component (no 'use client'). It uses `useTranslations` from next-intl which works in server components. But for reading locale, use the page params or `getLocale()` from next-intl/server:

```tsx
import { getLocale } from 'next-intl/server';

export default async function MusicPage() {
  const locale = await getLocale();
  const t = useTranslations('music');
  // ...
}
```

Actually, `useTranslations` is a hook and can't be used with `async`. The page currently uses `useTranslations` without async, which works in next-intl's server component support. For locale access, use:
```tsx
import { useLocale } from 'next-intl';
```
This also works in server components with next-intl.
```

### Prompt 4 — Rebuild Videos Page with Rich Context

```
Rewrite `src/app/[locale]/videos/page.tsx` to show each video as a full story, not just an embed grid.

For each video, render:

1. **YouTube embed** (existing YouTubeFacade component — keep it)
2. **Title** + year + featuring artist
3. **Description** — 2-3 sentences from the locale-aware `description` field
4. **Context line** — from the `context` field, showing song/project context
5. **Shot location** (when available) — "Filmed in Cyprus"
6. **CTA button** — "Book a similar live performance →" linking to /contact

Layout: Instead of the current grid, use a **stacked layout** where each video gets its own full-width section with the embed on one side and the rich info on the other (alternating left/right on desktop).

```tsx
{videos.map((video, i) => (
  <ScrollReveal key={video.id}>
    <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center py-12 ${i > 0 ? 'border-t border-border' : ''}`}>
      {/* Video embed — 60% width */}
      <div className="w-full md:w-[60%]">
        <div className="rounded-sm overflow-hidden">
          <YouTubeFacade videoId={video.youtubeId} title={video.title} views={video.views} quality="maxresdefault" />
        </div>
      </div>

      {/* Info — 40% width */}
      <div className="w-full md:w-[40%]">
        <h3 className="font-display text-2xl">{video.title}</h3>
        <p className="text-text-secondary text-sm font-sans mt-1">
          {video.year}
          {video.featuring && ` · feat. ${video.featuring}`}
          {video.views && ` · ${video.views} ${viewsLabel}`}
        </p>

        <p className="text-text-secondary font-sans font-light mt-4 leading-relaxed">
          {video.description[locale as keyof typeof video.description] || video.description.en}
        </p>

        {video.context && (
          <p className="text-text-tertiary text-xs font-sans mt-3 italic">
            {video.context}
          </p>
        )}

        {video.shotLocation && (
          <p className="text-gold/60 text-xs font-sans mt-2">
            📍 Filmed in {video.shotLocation}
          </p>
        )}

        {/* CTA */}
        <a
          href="/contact"
          className="inline-block mt-6 border border-gold/30 text-gold px-5 py-2 text-xs font-display uppercase tracking-wider hover:bg-gold/10 transition-all duration-300"
        >
          {t('book_performance')} →
        </a>
      </div>
    </div>
  </ScrollReveal>
))}
```

Add translation keys:
- en: `"videos": { ..., "book_performance": "Book a Live Performance" }`
- ru: `"videos": { ..., "book_performance": "Заказать выступление" }`
- el: `"videos": { ..., "book_performance": "Κράτηση εμφάνισης" }`

The featured video (Бродяга) should remain as a standalone hero section at the top with larger embed and full description. The remaining videos use the alternating layout below.
```

### Prompt 5 — Add "Featured On" Collaboration Section to Music Page

```
Alexandros appears as a featured artist on other people's releases — most notably:

- "Бродяга" by Elbrus Dzhanmirzoev ft. Alexandros Tsopozidis — 551K+ Spotify plays, Spotify track: 4wrHLDr6rgVFnzldOYp37t (also 4XYmHQMmFOFw7NaOINtmtb)
- "Ты все потеряла" by Elbrus Dzhanmirzoev ft. Alexandros Tsopozidis — 551K+ Spotify plays (his #1 most-played track!)

Add a "Featured On" section to the Music page, between the Album and Singles Grid:

```tsx
{/* Featured On */}
<section className="py-16 px-4 md:px-8 border-t border-border">
  <div className="max-w-6xl mx-auto">
    <ScrollReveal>
      <SectionHeading title={t('featured_on')} />
    </ScrollReveal>
    <ScrollReveal delay={0.2}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Бродяга */}
        <a href="https://open.spotify.com/track/4wrHLDr6rgVFnzldOYp37t" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-4 bg-bg-tertiary/50 border border-border hover:border-gold/30 rounded-sm p-4 transition-all duration-300 group">
          <div className="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0">
            <img src="https://i.scdn.co/image/ab67616d00004851f57422e4fe7802226d1e613f" alt="Бродяга" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-sans font-medium group-hover:text-gold transition-colors">Бродяга</p>
            <p className="text-xs text-text-secondary font-sans">Elbrus Dzhanmirzoev ft. Alexandros</p>
            <p className="text-[10px] text-text-tertiary font-sans mt-1">551K+ plays · 22M+ YouTube views</p>
          </div>
        </a>

        {/* Ты все потеряла */}
        <a href="https://open.spotify.com/track/4XYmHQMmFOFw7NaOINtmtb" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-4 bg-bg-tertiary/50 border border-border hover:border-gold/30 rounded-sm p-4 transition-all duration-300 group">
          <div className="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0">
            <img src="https://i.scdn.co/image/ab67616d00004851f57422e4fe7802226d1e613f" alt="Ты все потеряла" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-sans font-medium group-hover:text-gold transition-colors">Ты все потеряла</p>
            <p className="text-xs text-text-secondary font-sans">Elbrus Dzhanmirzoev ft. Alexandros</p>
            <p className="text-[10px] text-text-tertiary font-sans mt-1">551K+ plays · #1 most-played track</p>
          </div>
        </a>
      </div>
    </ScrollReveal>
  </div>
</section>
```

Add translation key:
- en: "featured_on": "Featured On"
- ru: "featured_on": "С участием"
- el: "featured_on": "Συμμετοχή σε"
```

### Prompt 6 — Update Homepage for Канитель + Spotify Cover Art

```
Now that discography data includes Spotify cover art URLs, update all components to use them.

1. **AlbumCover component** (`src/components/AlbumCover.tsx`) — add `spotifyCoverUrl` prop:

```tsx
interface AlbumCoverProps {
  src?: string;
  spotifyCoverUrl?: string;  // NEW
  title: string;
  year?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// In the component, determine the image source:
const imageSrc = spotifyCoverUrl || src;
// Use imageSrc instead of src for the Image component
```

Note: Spotify CDN URLs are external — they need to be added to `next.config.mjs` remotePatterns:
```javascript
{ protocol: 'https', hostname: 'i.scdn.co' },
```
This is ALREADY in the config. Good.

2. **LatestRelease homepage component** — update to pass `spotifyCoverUrl`:
```tsx
<AlbumCover
  src={latest.coverImage}
  spotifyCoverUrl={latest.spotifyCoverUrl}
  title={latest.title}
  year={latest.year}
  size="lg"
/>
```

Do the same for all AlbumCover usages in:
- `src/app/[locale]/music/page.tsx`
- `src/components/home/LatestRelease.tsx`

3. **Update the "Coming Soon" section** — "Канитель" is now released. Change the coming soon teaser to "Вечная любовь" only (which is genuinely upcoming based on the Facebook post from 6 days ago).

4. **Update the JSON-LD MusicRecording schema** on the Music page to include Канитель as the first entry.

5. **Update sitemap.ts** — change the music page lastModified to today's date since we've added new content.
```

### Prompt 7 — Add Booking CTA to Every Release Card

```
Every single card and video should have a subtle but clear booking CTA. The entire point of the website is to generate booking inquiries.

1. In the singles grid on the Music page, add to each card's footer:
```tsx
<div className="px-4 pb-4 pt-2 border-t border-border/30">
  <a
    href="/contact"
    className="text-[10px] text-gold/50 hover:text-gold font-sans uppercase tracking-wider transition-colors"
  >
    {t('book_this_live')} →
  </a>
</div>
```

2. Add translation keys:
- en: "book_this_live": "Book this song live"
- ru: "book_this_live": "Заказать эту песню вживую"
- el: "book_this_live": "Κράτηση ζωντανά"

3. On the Videos page, each video already gets a CTA from Prompt 4.

4. On the Music page album section, add:
```tsx
<p className="text-text-tertiary text-xs font-sans mt-6">
  {t('available_live')}
</p>
```
- en: "available_live": "All tracks available for live performance. Contact for booking."
- ru: "available_live": "Все треки доступны для живого исполнения. Свяжитесь для букинга."
- el: "available_live": "Όλα τα τραγούδια διαθέσιμα για ζωντανή εκτέλεση."
```

---

## SUMMARY

| Prompt | Focus | Impact |
|--------|-------|--------|
| 1 | Rewrite discography.ts — 13 releases with full metadata, Spotify IDs, cover art URLs, descriptions, credits, genres, languages. **Adds missing "Канитель" 2026 release.** | Critical — foundation for everything else |
| 2 | Rewrite videos.ts — 5 videos with rich descriptions, context, shot locations, booking CTAs | Critical — transforms Videos page |
| 3 | Rebuild Music page — rich cards with descriptions, language tags, streaming embeds, play counts, cover art from Spotify CDN | Major UX upgrade |
| 4 | Rebuild Videos page — alternating layout with full context per video + booking CTA | Major UX upgrade |
| 5 | Add "Featured On" section — Бродяга + Ты все потеряла collaborations | New content, social proof |
| 6 | Update homepage + AlbumCover for Spotify CDN covers + fix Coming Soon | Content freshness |
| 7 | Booking CTA on every release and video | Conversion optimization |

**Estimated: ~15 dev hours via Claude Code**
**Run order: 1 → 2 → 6 → 3 → 4 → 5 → 7**
