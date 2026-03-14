export interface Event {
  id: string;
  title: string;
  titleRu?: string;
  titleEl?: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  type: "festival" | "concert" | "award" | "private";
  isFeatured?: boolean;
  isUpcoming?: boolean;
  comingSoon?: boolean;
}

export const events: Event[] = [
  {
    id: "upcoming-tba",
    title: "New Dates Coming Soon",
    titleRu: "Новые даты скоро",
    titleEl: "Νέες ημερομηνίες σύντομα",
    date: "2026-06-01",
    venue: "TBA",
    city: "TBA",
    country: "TBA",
    type: "concert",
    isUpcoming: true,
    comingSoon: true,
  },
  {
    id: "kavkaz-fest-2022",
    title: "Kavkaz Music Fest",
    titleRu: "Кавказ Мьюзик Фест",
    titleEl: "Kavkaz Music Fest",
    date: "2022-08-15",
    venue: "Kavkaz Arena",
    city: "Kavkaz",
    country: "Russia",
    type: "festival",
    isFeatured: true,
    isUpcoming: false,
  },
  {
    id: "greek-youth-2021",
    title: "Greek Youth Party (Moscow Greek Society)",
    titleRu: "Молодёжный вечер (Московское греческое общество)",
    titleEl: "Ελληνική Νεολαία (Ελληνική Κοινότητα Μόσχας)",
    date: "2021-03-20",
    venue: "Moscow Greek Society",
    city: "Moscow",
    country: "Russia",
    type: "private",
    isUpcoming: false,
  },
  {
    id: "stars-east-2018",
    title: "Stars of the East — Vostok FM",
    titleRu: "Звёзды Востока — Восток FM",
    titleEl: "Αστέρια της Ανατολής — Vostok FM",
    date: "2018-11-10",
    venue: "Crocus City Hall",
    city: "Moscow",
    country: "Russia",
    type: "concert",
    isFeatured: true,
    isUpcoming: false,
  },
  {
    id: "zhara-2018",
    title: "Zhara Festival",
    titleRu: "Фестиваль «Жара»",
    titleEl: "Φεστιβάλ Жара",
    date: "2018-07-28",
    venue: "Crystal Hall",
    city: "Baku",
    country: "Azerbaijan",
    type: "festival",
    isFeatured: true,
    isUpcoming: false,
  },
  {
    id: "karnaval-2018",
    title: "Karnaval 2018 (headline with Mitya Fomin)",
    titleRu: "Карнавала 2018 (хедлайнер с Митей Фоминым)",
    titleEl: "Karnaval 2018 (headliner με Μίτια Φόμιν)",
    date: "2018-05-20",
    venue: "City Stage",
    city: "Gelendzhik",
    country: "Russia",
    type: "festival",
    isUpcoming: false,
  },
  {
    id: "9-volna-2014",
    title: "9 Volna Award Ceremony",
    titleRu: "Церемония «9 Волна»",
    titleEl: "Τελετή βράβευσης «9 Волна»",
    date: "2014-05-15",
    venue: "Award Ceremony Venue",
    city: "Moscow",
    country: "Russia",
    type: "award",
    isFeatured: true,
    isUpcoming: false,
  },
  {
    id: "9-volna-2013",
    title: "9 Volna Award Ceremony",
    titleRu: "Церемония «9 Волна»",
    titleEl: "Τελετή βράβευσης «9 Волна»",
    date: "2013-03-20",
    venue: "Award Ceremony Venue",
    city: "Moscow",
    country: "Russia",
    type: "award",
    isUpcoming: false,
  },
];
