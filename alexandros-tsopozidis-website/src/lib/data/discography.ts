export interface Release {
  id: string;
  title: string;
  titleEn?: string;
  titleRu?: string;
  titleEl?: string;
  year: number;
  releaseDate?: string;
  type: "album" | "single";
  featuring?: string;
  language: string[];
  genre: string[];
  description: {
    en: string;
    ru: string;
    el: string;
  };
  credits?: string;
  spotifyAlbumId?: string;
  spotifyTrackId?: string;
  spotifyCoverUrl?: string;
  appleMusicUrl?: string;
  youtubeId?: string;
  yandexMusicUrl?: string;
  coverImage?: string;
  trackCount?: number;
  plays?: string;
}

export const languageLabels: Record<string, Record<string, string>> = {
  ru: { en: "Russian", ru: "Русский", el: "Ρωσικά" },
  el: { en: "Greek", ru: "Греческий", el: "Ελληνικά" },
  tr: { en: "Turkish", ru: "Турецкий", el: "Τουρκικά" },
  hy: { en: "Armenian", ru: "Армянский", el: "Αρμενικά" },
  es: { en: "Spanish", ru: "Испанский", el: "Ισπανικά" },
};

// ============================================================
// ALBUM
// ============================================================

export const album: Release = {
  id: "za-toboi",
  title: "За тобой",
  titleEn: "Za Toboy (After You)",
  titleRu: "За тобой",
  titleEl: "За тобой (Πίσω σου)",
  year: 2018,
  releaseDate: "2018-05-18",
  type: "album",
  trackCount: 19,
  language: ["ru"],
  genre: ["pop", "eastern", "caucasian"],
  description: {
    en: "Debut album featuring 19 tracks including the hit duets with Elbrus Dzhanmirzoev and Faxo. Premiered at Karnavala 2018 in Gelendzhik with Vostok FM support. Includes Kaciyorum, Танец грека, and Ты все потеряла.",
    ru: "Дебютный альбом из 19 треков, включая хиты с Эльбрусом Джанмирзоевым и Faxo. Презентован на Карнавале-2018 в Геленджике при поддержке Восток FM. Включает Kaciyorum, Танец грека и Ты все потеряла.",
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
    titleEn: "Kanitel",
    titleRu: "Канитель",
    titleEl: "Κανιτέλ",
    year: 2026,
    releaseDate: "2026-01-01",
    type: "single",
    language: ["ru"],
    genre: ["pop", "eastern"],
    description: {
      en: "The latest single from Alexandros Tsopozidis — his signature blend of Eastern melodies and modern pop.",
      ru: "Последний сингл Александроса Цопозидиса — фирменное сочетание восточных мелодий и современного попа.",
      el: "Το τελευταίο single του Αλέξανδρου Τσοποζίδη — ο χαρακτηριστικός του συνδυασμός ανατολικών μελωδιών και σύγχρονης ποπ.",
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
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e026115ef4e516abbf64b6afa1b",
    plays: "182K+",
    coverImage: "/images/albums/par-shirkhani.jpg",
  },
  {
    id: "kavkaz",
    title: "Kavkaz",
    titleEn: "Kavkaz (Caucasus)",
    titleRu: "Кавказ",
    titleEl: "Kavkaz (Καύκασος)",
    year: 2023,
    releaseDate: "2023-03-10",
    type: "single",
    language: ["ru", "el"],
    genre: ["caucasian", "pop", "eastern"],
    description: {
      en: "An ode to the Caucasus Mountains — the region where Alexandros was born. A powerful blend of Caucasian folk elements with modern pop production. The official video has surpassed 380K views.",
      ru: "Ода Кавказским горам — региону, где родился Александрос. Сочетание кавказских народных элементов с современной поп-продакшн. Официальный клип набрал более 380 тыс. просмотров.",
      el: "Ωδή στα βουνά του Καυκάσου — την περιοχή όπου γεννήθηκε ο Αλέξανδρος. Με στοιχεία καυκασιανής λαϊκής μουσικής και σύγχρονης ποπ παραγωγής.",
    },
    credits: "Label: Independent",
    spotifyAlbumId: "5LkRMJW59dmjgLfIzdUCnh",
    spotifyTrackId: "1F1PGhdEb1MtMLbuGuxCR7",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e02f03d47c826c3d0d176796851",
    plays: "237K+",
    coverImage: "/images/albums/kavkaz.jpg",
  },
  {
    id: "ya-grek",
    title: "Я грек",
    titleEn: "Ya Grek (I Am Greek)",
    titleRu: "Я грек",
    titleEl: "Я грек (Είμαι Έλληνας)",
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
    titleEn: "Kapkan (Trap)",
    titleRu: "Капкан",
    titleEl: "Капкан (Παγίδα)",
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
    titleEn: "Rasskazhi (Tell Me)",
    titleRu: "Расскажи",
    titleEl: "Расскажи (Πες μου)",
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
    spotifyAlbumId: "3qrqocYHmAkHLBImZSdlR0",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e02a947f87fcc92af9aa1aaf186",
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
    spotifyAlbumId: "6SSmd4Dw7KF1858tNdLBvx",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e02243f3aef80e7ca349f48bbf7",
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
    spotifyTrackId: "2hVxYFJTIS1a8GYlEthQB4",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e022c8ef0554a13122e9e431fc7",
    coverImage: "/images/albums/dumanli.jpg",
  },
  {
    id: "tanets-greka",
    title: "Танец грека",
    titleEn: "Tanets Greka (Dance of the Greek)",
    titleRu: "Танец грека",
    titleEl: "Танец грека (Ο χορός του Έλληνα)",
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
    spotifyAlbumId: "5XqFJOzeikzqlA8msKaTBt",
    spotifyCoverUrl: "https://i.scdn.co/image/ab67616d00001e02998a7e2c12919f1ccb779f1f",
    coverImage: "/images/albums/tanets-greka.jpg",
  },
];

export const allReleases: Release[] = [album, ...singles];

// ============================================================
// HELPER: Get locale-aware display title
// For non-Russian locales, uses titleEn/titleEl instead of
// raw Cyrillic so English/Greek visitors see readable titles.
// ============================================================
export function getDisplayTitle(release: Release, locale: string): string {
  if (locale === 'ru') return release.title;
  if (locale === 'el' && release.titleEl) return release.titleEl;
  if (locale === 'en' && release.titleEn) return release.titleEn;
  return release.title;
}

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
