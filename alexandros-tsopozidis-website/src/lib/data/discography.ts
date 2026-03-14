export interface Release {
  id: string;
  title: string;
  titleRu?: string;
  year: number;
  type: "album" | "single";
  featuring?: string;
  spotifyUrl?: string;
  spotifyTrackId?: string;
  youtubeId?: string;
  appleMusicUrl?: string;
  coverImage?: string;
  trackCount?: number;
  language?: string[];
  genre?: string[];
}

export const languageLabels: Record<string, Record<string, string>> = {
  ru: { en: "Russian", ru: "Русский", el: "Ρωσικά" },
  el: { en: "Greek", ru: "Греческий", el: "Ελληνικά" },
  tr: { en: "Turkish", ru: "Турецкий", el: "Τουρκικά" },
  hy: { en: "Armenian", ru: "Армянский", el: "Αρμενικά" },
  es: { en: "Spanish", ru: "Испанский", el: "Ισπανικά" },
};

export const album: Release = {
  id: "za-toboi",
  title: "За тобой",
  titleRu: "За тобой",
  year: 2018,
  type: "album",
  trackCount: 12,
  spotifyUrl: "https://open.spotify.com/artist/6PPuuN3cvmbyuvgrGbhXge",
  coverImage: "/images/albums/za-toboi.jpg",
  language: ["ru"],
  genre: ["pop", "eastern"],
};

export const singles: Release[] = [
  { id: "mia-kardia", title: "Mia Kardia", year: 2025, type: "single", coverImage: "/images/albums/mia-kardia.jpg", language: ["el"], genre: ["greek-pop"] },
  { id: "soltera", title: "Soltera", year: 2025, type: "single", featuring: "El Pontios", coverImage: "/images/albums/soltera.jpg", language: ["el", "es"], genre: ["greek-pop", "latin"] },
  { id: "par-shirkhani", title: "Par shirkhani", year: 2024, type: "single", coverImage: "/images/albums/par-shirkhani.jpg", language: ["hy"], genre: ["eastern", "armenian"] },
  { id: "kavkaz", title: "Kavkaz", titleRu: "Кавказ", year: 2023, type: "single", featuring: "Vasiliadis", coverImage: "/images/albums/kavkaz.jpg", spotifyTrackId: "1F1PGhdEb1MtMLbuGuxCR7", spotifyUrl: "https://open.spotify.com/track/1F1PGhdEb1MtMLbuGuxCR7", language: ["ru"], genre: ["caucasian", "pop"] },
  { id: "ya-grek", title: "Я грек", titleRu: "Я грек", year: 2022, type: "single", coverImage: "/images/albums/ya-grek.jpg", language: ["ru"], genre: ["greek-pop", "ethnic"] },
  { id: "kortsopon-apsimon", title: "Kortsopon apsimon", year: 2021, type: "single", coverImage: "/images/albums/kortsopon.jpg", language: ["el"], genre: ["pontic"] },
  { id: "monahos", title: "Monahos", year: 2021, type: "single", coverImage: "/images/albums/monahos.jpg", language: ["el"], genre: ["pontic", "folk"] },
  { id: "kapkan", title: "Капкан", titleRu: "Капкан", year: 2021, type: "single", coverImage: "/images/albums/kapkan.jpg", language: ["ru"], genre: ["pop", "eastern"] },
  { id: "rasskazhi", title: "Расскажи", titleRu: "Расскажи", year: 2020, type: "single", youtubeId: "Ne_uRfKUUlk", coverImage: "/images/albums/rasskazhi.jpg", language: ["ru"], genre: ["pop"] },
  { id: "panagia-soumela", title: "Panagia Soumela", year: 2020, type: "single", coverImage: "/images/albums/panagia.jpg", language: ["el"], genre: ["pontic", "religious"] },
  { id: "dumanli", title: "Dumanli", year: 2019, type: "single", coverImage: "/images/albums/dumanli.jpg", language: ["tr"], genre: ["eastern", "turkish"] },
  { id: "tanets-greka", title: "Танец грека", titleRu: "Танец грека", year: 2018, type: "single", coverImage: "/images/albums/tanets-greka.jpg", language: ["ru"], genre: ["greek-pop", "dance"] },
];

export const allReleases: Release[] = [album, ...singles];
