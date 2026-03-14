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
  // Live performance photos from Revolution Nachtpalast concert (Dec 28, 2024)
  {
    id: "live-01",
    src: "https://revolution-nachtpalast.disco2app.com/media/galleries/9/photos/711.jpg?timestamp=1736207454",
    alt: "Alexandros Tsopozidis performing live at Revolution Nachtpalast",
    altRu: "Александрос Цопозидис выступает в Revolution Nachtpalast",
    altEl: "Ο Αλέξανδρος Τσοποζίδης σε ζωντανή εμφάνιση στο Revolution Nachtpalast",
    category: "live",
    width: 1200,
    height: 800,
  },
  {
    id: "live-02",
    src: "https://revolution-nachtpalast.disco2app.com/media/galleries/9/photos/695.jpg?timestamp=1736207454",
    alt: "Alexandros on stage — live concert energy",
    altRu: "Александрос на сцене — энергия живого концерта",
    altEl: "Ο Αλέξανδρος στη σκηνή — ζωντανή ενέργεια συναυλίας",
    category: "live",
    width: 1200,
    height: 800,
  },
  {
    id: "live-03",
    src: "https://revolution-nachtpalast.disco2app.com/media/galleries/9/photos/694.jpg?timestamp=1736207454",
    alt: "Live performance moment — connecting with the audience",
    altRu: "Момент живого выступления — связь с аудиторией",
    altEl: "Στιγμή ζωντανής εμφάνισης — σύνδεση με το κοινό",
    category: "live",
    width: 1200,
    height: 800,
  },
  {
    id: "live-04",
    src: "https://revolution-nachtpalast.disco2app.com/media/galleries/9/photos/693.jpg?timestamp=1736207454",
    alt: "Alexandros Tsopozidis — stage presence and passion",
    altRu: "Александрос Цопозидис — сценическое присутствие и страсть",
    altEl: "Ο Αλέξανδρος Τσοποζίδης — σκηνική παρουσία και πάθος",
    category: "live",
    width: 1200,
    height: 800,
  },
  {
    id: "live-05",
    src: "https://revolution-nachtpalast.disco2app.com/media/galleries/9/photos/692.jpg?timestamp=1736207454",
    alt: "Concert finale — Alexandros Tsopozidis live in Germany",
    altRu: "Финал концерта — Александрос Цопозидис в Германии",
    altEl: "Φινάλε συναυλίας — Ο Αλέξανδρος Τσοποζίδης ζωντανά στη Γερμανία",
    category: "live",
    width: 1200,
    height: 800,
  },

  // YouTube video thumbnails — music video shoots
  {
    id: "video-01",
    src: "https://i.ytimg.com/vi/ImJG4MWh3pA/maxresdefault.jpg",
    alt: "Dumanli — official music video with Agafangel Tsopozidis",
    altRu: "Думанлы — официальный клип с Агафангелом Цопозидисом",
    altEl: "Dumanli — επίσημο μουσικό βίντεο με τον Αγαφάγγελο Τσοποζίδη",
    category: "video-shoot",
    width: 1280,
    height: 720,
  },
  {
    id: "video-02",
    src: "https://i.ytimg.com/vi/VocDPZ7nDo8/maxresdefault.jpg",
    alt: "Alexandros Tsopozidis — music video production",
    altRu: "Александрос Цопозидис — съёмки музыкального клипа",
    altEl: "Αλέξανδρος Τσοποζίδης — παραγωγή μουσικού βίντεο",
    category: "video-shoot",
    width: 1280,
    height: 720,
  },
  {
    id: "video-03",
    src: "https://i.ytimg.com/vi/E_1O7hDGghk/maxresdefault.jpg",
    alt: "Alexandros Tsopozidis — official video scene",
    altRu: "Александрос Цопозидис — сцена из официального клипа",
    altEl: "Αλέξανδρος Τσοποζίδης — σκηνή από επίσημο βίντεο",
    category: "video-shoot",
    width: 1280,
    height: 720,
  },
  {
    id: "video-04",
    src: "https://i.ytimg.com/vi/Rxp_-wMKU5k/maxresdefault.jpg",
    alt: "Music video behind the scenes — Alexandros Tsopozidis",
    altRu: "За кулисами музыкального клипа — Александрос Цопозидис",
    altEl: "Πίσω από τις κάμερες μουσικού βίντεο — Αλέξανδρος Τσοποζίδης",
    category: "backstage",
    width: 1280,
    height: 720,
  },
  {
    id: "video-05",
    src: "https://i.ytimg.com/vi/4VCZyzOPzDY/maxresdefault.jpg",
    alt: "Alexandros Tsopozidis — cinematic music video moment",
    altRu: "Александрос Цопозидис — кинематографический момент клипа",
    altEl: "Αλέξανδρος Τσοποζίδης — κινηματογραφική στιγμή μουσικού βίντεο",
    category: "video-shoot",
    width: 1280,
    height: 720,
  },
  {
    id: "video-06",
    src: "https://i.ytimg.com/vi/o20LEgccjxY/maxresdefault.jpg",
    alt: "Alexandros Tsopozidis — portrait from video shoot",
    altRu: "Александрос Цопозидис — портрет со съёмок клипа",
    altEl: "Αλέξανδρος Τσοποζίδης — πορτρέτο από γυρίσματα βίντεο",
    category: "portrait",
    width: 1280,
    height: 720,
  },
  {
    id: "video-07",
    src: "https://i.ytimg.com/vi/F9rQSin9PIY/maxresdefault.jpg",
    alt: "Alexandros Tsopozidis — artistic portrait",
    altRu: "Александрос Цопозидис — художественный портрет",
    altEl: "Αλέξανδρος Τσοποζίδης — καλλιτεχνικό πορτρέτο",
    category: "portrait",
    width: 1280,
    height: 720,
  },
];

export const INSTAGRAM_URL = "https://www.instagram.com/alexandros_official";
export const INSTAGRAM_HANDLE = "@alexandros_official";
