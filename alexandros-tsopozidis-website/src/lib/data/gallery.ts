export interface Photo {
  id: string;
  src: string;
  alt: string;
  altRu?: string;
  altEl?: string;
  category: "live" | "portrait" | "backstage" | "video-shoot";
  width: number;
  height: number;
  instagramUrl?: string;
}

export const photos: Photo[] = [
  // Artist portrait photos — rain photoshoot
  {
    id: "portrait-rain-facing",
    src: "/images/gallery/portrait-rain-facing.jpg",
    alt: "Alexandros Tsopozidis — portrait in the rain",
    altRu: "Александрос Цопозидис — портрет под дождём",
    altEl: "Αλέξανδρος Τσοποζίδης — πορτρέτο στη βροχή",
    category: "portrait",
    width: 3,
    height: 4,
  },
  {
    id: "portrait-rain-reaching",
    src: "/images/gallery/portrait-rain-reaching.jpg",
    alt: "Alexandros Tsopozidis — reaching out in the rain",
    altRu: "Александрос Цопозидис — протягивая руку под дождём",
    altEl: "Αλέξανδρος Τσοποζίδης — χέρι στη βροχή",
    category: "portrait",
    width: 3,
    height: 4,
  },
  {
    id: "portrait-rain-smiling",
    src: "/images/gallery/portrait-rain-smiling.jpg",
    alt: "Alexandros Tsopozidis — smiling in the rain",
    altRu: "Александрос Цопозидис — улыбка под дождём",
    altEl: "Αλέξανδρος Τσοποζίδης — χαμόγελο στη βροχή",
    category: "portrait",
    width: 3,
    height: 4,
  },

  // Rain photoshoot — artistic shots
  {
    id: "photoshoot-rain-arms",
    src: "/images/gallery/photoshoot-rain-arms.jpg",
    alt: "Alexandros Tsopozidis — artistic rain photoshoot, arms spread",
    altRu: "Александрос Цопозидис — художественная фотосессия под дождём",
    altEl: "Αλέξανδρος Τσοποζίδης — καλλιτεχνική φωτογράφιση στη βροχή",
    category: "backstage",
    width: 3,
    height: 4,
  },
  {
    id: "photoshoot-rain-bw",
    src: "/images/gallery/photoshoot-rain-bw.jpg",
    alt: "Alexandros Tsopozidis — black and white rain portrait",
    altRu: "Александрос Цопозидис — чёрно-белый портрет под дождём",
    altEl: "Αλέξανδρος Τσοποζίδης — ασπρόμαυρο πορτρέτο στη βροχή",
    category: "portrait",
    width: 3,
    height: 4,
  },
  {
    id: "photoshoot-rain-open",
    src: "/images/gallery/photoshoot-rain-open.jpg",
    alt: "Alexandros Tsopozidis — arms wide open under the rain",
    altRu: "Александрос Цопозидис — руки раскинуты под дождём",
    altEl: "Αλέξανδρος Τσοποζίδης — ανοιχτά χέρια στη βροχή",
    category: "backstage",
    width: 3,
    height: 4,
  },

  // Live performance photos
  {
    id: "live-white-blazer",
    src: "/images/gallery/live-white-blazer.jpg",
    alt: "Alexandros Tsopozidis — live performance in white blazer",
    altRu: "Александрос Цопозидис — выступление в белом пиджаке",
    altEl: "Αλέξανδρος Τσοποζίδης — ζωντανή εμφάνιση με λευκό σακάκι",
    category: "live",
    width: 3,
    height: 4,
  },
  {
    id: "live-singing-dark",
    src: "/images/gallery/live-singing-dark.jpg",
    alt: "Alexandros Tsopozidis — singing on stage, dramatic lighting",
    altRu: "Александрос Цопозидис — пение на сцене, драматическое освещение",
    altEl: "Αλέξανδρος Τσοποζίδης — τραγουδώντας στη σκηνή",
    category: "live",
    width: 3,
    height: 4,
  },
  {
    id: "live-arms-spread",
    src: "/images/gallery/live-arms-spread.jpg",
    alt: "Alexandros Tsopozidis — arms spread on stage with light beams",
    altRu: "Александрос Цопозидис — руки раскинуты на сцене",
    altEl: "Αλέξανδρος Τσοποζίδης — ανοιχτά χέρια στη σκηνή",
    category: "live",
    width: 3,
    height: 4,
  },
  // Music video stills
  {
    id: "video-traditional",
    src: "/images/gallery/video-traditional.jpg",
    alt: "Alexandros Tsopozidis — traditional Pontic music video scenes",
    altRu: "Александрос Цопозидис — сцены из понтийского музыкального клипа",
    altEl: "Αλέξανδρος Τσοποζίδης — σκηνές ποντιακού μουσικού βίντεο",
    category: "video-shoot",
    width: 3,
    height: 4,
  },

];

export const INSTAGRAM_URL = "https://www.instagram.com/alexandros_official";
export const INSTAGRAM_HANDLE = "@alexandros_official";
