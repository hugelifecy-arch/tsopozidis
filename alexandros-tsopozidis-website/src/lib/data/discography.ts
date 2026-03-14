export interface Release {
  id: string;
  title: string;
  titleRu?: string;
  year: number;
  type: "album" | "single";
  featuring?: string;
  spotifyUrl?: string;
  youtubeId?: string;
  appleMusicUrl?: string;
  coverImage?: string;
  trackCount?: number;
}

export const album: Release = {
  id: "za-toboi",
  title: "За тобой",
  titleRu: "За тобой",
  year: 2018,
  type: "album",
  trackCount: 12,
  spotifyUrl: "https://open.spotify.com/artist/6PPuuN3cvmbyuvgrGbhXge",
  coverImage: "/images/albums/za-toboi.jpg",
};

export const singles: Release[] = [
  { id: "mia-kardia", title: "Mia Kardia", year: 2025, type: "single", coverImage: "/images/albums/mia-kardia.jpg" },
  { id: "soltera", title: "Soltera", year: 2025, type: "single", featuring: "El Pontios", coverImage: "/images/albums/soltera.jpg" },
  { id: "par-shirkhani", title: "Par shirkhani", year: 2024, type: "single", coverImage: "/images/albums/par-shirkhani.jpg" },
  { id: "kavkaz", title: "Kavkaz", titleRu: "Кавказ", year: 2023, type: "single", featuring: "Vasiliadis", coverImage: "/images/albums/kavkaz.jpg" },
  { id: "ya-grek", title: "Я грек", titleRu: "Я грек", year: 2022, type: "single", coverImage: "/images/albums/ya-grek.jpg" },
  { id: "kortsopon-apsimon", title: "Kortsopon apsimon", year: 2021, type: "single", coverImage: "/images/albums/kortsopon.jpg" },
  { id: "monahos", title: "Monahos", year: 2021, type: "single", coverImage: "/images/albums/monahos.jpg" },
  { id: "kapkan", title: "Капкан", titleRu: "Капкан", year: 2021, type: "single", coverImage: "/images/albums/kapkan.jpg" },
  { id: "rasskazhi", title: "Расскажи", titleRu: "Расскажи", year: 2020, type: "single", youtubeId: "Ne_uRfKUUlk", coverImage: "/images/albums/rasskazhi.jpg" },
  { id: "panagia-soumela", title: "Panagia Soumela", year: 2020, type: "single", coverImage: "/images/albums/panagia.jpg" },
  { id: "dumanli", title: "Dumanli", year: 2019, type: "single", coverImage: "/images/albums/dumanli.jpg" },
  { id: "tanets-greka", title: "Танец грека", titleRu: "Танец грека", year: 2018, type: "single", coverImage: "/images/albums/tanets-greka.jpg" },
];

export const allReleases: Release[] = [album, ...singles];
