export interface Photo {
  id: string;
  src: string;
  alt: string;
  altRu?: string;
  category: "live" | "portrait" | "backstage" | "video-shoot";
  width: number;
  height: number;
}

export const photos: Photo[] = [
  { id: "photo-01", src: "/images/gallery/photo-01.jpg", alt: "Alexandros performing live on stage", altRu: "Александрос на сцене", category: "live", width: 1200, height: 800 },
  { id: "photo-02", src: "/images/gallery/photo-02.jpg", alt: "Portrait of Alexandros", altRu: "Портрет Александроса", category: "portrait", width: 800, height: 1200 },
  { id: "photo-03", src: "/images/gallery/photo-03.jpg", alt: "Backstage moment", altRu: "За кулисами", category: "backstage", width: 1200, height: 800 },
  { id: "photo-04", src: "/images/gallery/photo-04.jpg", alt: "Music video shooting", altRu: "Съёмки клипа", category: "video-shoot", width: 1200, height: 900 },
  { id: "photo-05", src: "/images/gallery/photo-05.jpg", alt: "Live concert performance", altRu: "Концертное выступление", category: "live", width: 1200, height: 800 },
  { id: "photo-06", src: "/images/gallery/photo-06.jpg", alt: "Alexandros portrait", altRu: "Александрос портрет", category: "portrait", width: 800, height: 1200 },
  { id: "photo-07", src: "/images/gallery/photo-07.jpg", alt: "Behind the scenes", altRu: "Закулисье", category: "backstage", width: 1200, height: 800 },
  { id: "photo-08", src: "/images/gallery/photo-08.jpg", alt: "Video production", altRu: "Видеопроизводство", category: "video-shoot", width: 1200, height: 900 },
  { id: "photo-09", src: "/images/gallery/photo-09.jpg", alt: "Festival stage", altRu: "Фестивальная сцена", category: "live", width: 1600, height: 900 },
  { id: "photo-10", src: "/images/gallery/photo-10.jpg", alt: "Artistic portrait", altRu: "Художественный портрет", category: "portrait", width: 800, height: 1000 },
  { id: "photo-11", src: "/images/gallery/photo-11.jpg", alt: "Sound check", altRu: "Саундчек", category: "backstage", width: 1200, height: 800 },
  { id: "photo-12", src: "/images/gallery/photo-12.jpg", alt: "Music video scene", altRu: "Сцена из клипа", category: "video-shoot", width: 1200, height: 900 },
];
