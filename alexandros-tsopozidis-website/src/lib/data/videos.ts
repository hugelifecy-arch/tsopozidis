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
  context: string;
  shotLocation?: string;
  director?: string;
  label?: string;
}

/** Generate YouTube thumbnail URL from video ID */
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
