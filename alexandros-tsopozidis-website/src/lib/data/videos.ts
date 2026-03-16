export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  titleEn?: string;
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

/** Get locale-aware display title for a video */
export function getVideoDisplayTitle(video: Video, locale: string): string {
  if (locale === 'ru') return video.title;
  if (locale === 'el' && video.titleEl) return video.titleEl;
  if (locale === 'en' && video.titleEn) return video.titleEn;
  return video.title;
}

export const videos: Video[] = [
  {
    id: "brodyaga",
    youtubeId: "z9ASjQE6Q2Y",
    title: "Бродяга",
    titleEn: "Brodyaga (Wanderer)",
    titleRu: "Бродяга",
    titleEl: "Бродяга (Αλήτης)",
    year: 2014,
    featuring: "Elbrus Dzhanmirzoev",
    views: "69M+",
    description: {
      en: "The breakthrough hit that launched Alexandros to fame across the Russian-speaking world. A duet with Dagestani singer Elbrus Dzhanmirzoev about a wanderer searching for meaning. Released as official video in April 2014, it became a cultural phenomenon in the Caucasian and Greek diaspora communities. The track was later released on Spotify in 2016 via Lotus Music.",
      ru: "Прорывной хит, прославивший Александроса по всему русскоязычному миру. Дуэт с дагестанским певцом Эльбрусом Джанмирзоевым о бродяге, ищущем смысл жизни. Официальный клип вышел в апреле 2014 года и стал культурным феноменом в кавказской и греческой диаспоре.",
      el: "Το τραγούδι-σταθμός που έκανε τον Αλέξανδρο γνωστό σε ολόκληρο τον ρωσόφωνο κόσμο. Ντουέτο με τον Νταγκεστανό τραγουδιστή Elbrus Dzhanmirzoev.",
    },
    context: "From the album Бродяга (2016, Lotus Music). The song that defined Alexandros's career — 69M+ YouTube views make it the most-watched Caucasian music video.",
    label: "Official channel",
  },
  {
    id: "male-male",
    youtubeId: "o20LEgccjxY",
    title: "Male Male",
    year: 2013,
    views: "13M+",
    description: {
      en: "One of Alexandros's earliest viral hits. Released as an official video in October 2013, it quickly amassed millions of views. A high-energy track with Eastern pop production that established his signature sound before Бродяга.",
      ru: "Один из первых вирусных хитов Александроса. Официальный клип вышел в октябре 2013 года и быстро набрал миллионы просмотров. Энергичный трек с восточным поп-продакшн, определивший его фирменное звучание ещё до Бродяги.",
      el: "Ένα από τα πρώτα viral hits του Αλέξανδρου. Κυκλοφόρησε τον Οκτώβριο 2013 και γρήγορα συγκέντρωσε εκατομμύρια προβολές.",
    },
    context: "Early career single that proved Alexandros could command a massive audience. 13M+ views on YouTube.",
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
    titleEn: "Dai Mne Nomer Telefona (Give Me Your Phone Number)",
    titleRu: "Дай мне номер телефона",
    titleEl: "Дай мне номер телефона (Δώσε μου τον αριθμό τηλεφώνου)",
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
    titleEn: "Rasskazhi (Tell Me)",
    titleRu: "Расскажи",
    titleEl: "Расскажи (Πες μου)",
    year: 2020,
    description: {
      en: "'Tell Me' — a Russian pop ballad exploring themes of communication and vulnerability in relationships. Released in 2020 as a standalone single.",
      ru: "«Расскажи» — русская поп-баллада, исследующая темы общения и уязвимости в отношениях. Вышла в 2020 году как отдельный сингл.",
      el: "«Πες μου» — ρωσική ποπ μπαλάντα που εξερευνά θέματα επικοινωνίας στις σχέσεις.",
    },
    context: "2020 single. One of the more recent official music videos on the channel.",
    label: "Official channel",
  },
  {
    id: "ty-vse-poteryala",
    youtubeId: "H_j4mXRQYf4",
    title: "Ты все потеряла",
    titleEn: "Ty Vsyo Poteryala (You Lost Everything)",
    titleRu: "Ты все потеряла",
    titleEl: "Ты все потеряла (Τα έχασες όλα)",
    year: 2016,
    featuring: "Elbrus Dzhanmirzoev",
    views: "31M+",
    description: {
      en: "A powerful duet with Elbrus Dzhanmirzoev from the album Бродяга. One of the most-viewed Russian-language music videos, blending emotional vocals with Caucasian pop production.",
      ru: "Мощный дуэт с Эльбрусом Джанмирзоевым из альбома Бродяга. Один из самых просматриваемых русскоязычных клипов, сочетающий эмоциональный вокал с кавказским поп-продакшн.",
      el: "Ένα δυνατό ντουέτο με τον Elbrus Dzhanmirzoev από το άλμπουμ Бродяга. Ένα από τα πιο δημοφιλή ρωσόφωνα μουσικά βίντεο.",
    },
    context: "From the album Бродяга (2016, Lotus Music). 31M+ YouTube views — the second most-viewed video on the channel.",
    label: "Official channel",
  },
  {
    id: "monahos-cover",
    youtubeId: "5MmCBWcdgSQ",
    title: "Monahos",
    titleEl: "Μοναχός",
    year: 2021,
    views: "23M+",
    description: {
      en: "A cover of the beloved Greek classic 'Monahos' (Alone). Alexandros brings his Pontic Greek heritage to this contemplative ballad, delivering an emotionally raw performance that resonated with millions.",
      ru: "Кавер на любимую греческую классику «Монахос» (Одинокий). Александрос привносит своё понтийско-греческое наследие в эту созерцательную балладу.",
      el: "Διασκευή του αγαπημένου ελληνικού κλασικού «Μοναχός». Ο Αλέξανδρος φέρνει την ποντιακή του κληρονομιά σε αυτή τη στοχαστική μπαλάντα.",
    },
    context: "A Pontic Greek cover that became one of Alexandros's biggest hits — 23M+ views on YouTube.",
    label: "Official channel",
  },
  {
    id: "monahos-shirkhani-remix",
    youtubeId: "5bGsXOJuqWk",
    title: "MONAHOS-SHIRKHANI (REMIX)",
    year: 2023,
    views: "19M+",
    description: {
      en: "A high-energy remix blending the Greek classic 'Monahos' with Armenian 'Shirkhani'. Performed at the Song of the Year 2023 ceremony in Yerevan, this mashup celebrates the shared musical heritage of the Caucasus.",
      ru: "Энергичный ремикс, соединяющий греческую классику «Монахос» с армянской «Ширхани». Исполнен на церемонии «Песня года 2023» в Ереване — мэшап, воспевающий общее музыкальное наследие Кавказа.",
      el: "Ένα ενεργητικό remix που συνδυάζει το ελληνικό κλασικό «Μοναχός» με το αρμενικό «Shirkhani». Παρουσιάστηκε στην τελετή Τραγούδι της Χρονιάς 2023 στο Ερεβάν.",
    },
    context: "Песня Года 2023 Erevan. 19M+ views — a cross-cultural hit bridging Greek and Armenian music traditions.",
    label: "Official channel",
  },
  {
    id: "kapkan",
    youtubeId: "wHOp_ojf60c",
    title: "Капкан",
    titleEn: "Kapkan (Trap)",
    titleRu: "Капкан",
    titleEl: "Капкан (Παγίδα)",
    year: 2021,
    views: "14M+",
    description: {
      en: "'Trap' — a passionate Russian-language pop track about being caught in the snare of love. Features driving Eastern-influenced production with a modern pop hook. One of Alexandros's biggest solo hits.",
      ru: "«Капкан» — страстный русскоязычный поп-трек о том, как попасть в ловушку любви. Восточное звучание с современным поп-хуком. Один из самых больших сольных хитов Александроса.",
      el: "«Παγίδα» στα ρωσικά — ένα παθιασμένο ποπ τραγούδι για την παγίδα του έρωτα. Ένα από τα μεγαλύτερα σόλο hits του Αλέξανδρου.",
    },
    context: "2021 single. 14M+ YouTube views — one of his top solo tracks.",
    label: "Official channel",
  },
  {
    id: "esena-mono",
    youtubeId: "u75a8QbWPrc",
    title: "Esena Mono",
    titleEl: "Εσένα Μόνο",
    year: 2020,
    views: "10M+",
    description: {
      en: "'Only You' — a Greek-language cover showcasing Alexandros's deep connection to Hellenic music. A tender ballad that became a fan favourite across the Greek diaspora.",
      ru: "«Только тебя» — грекоязычный кавер, демонстрирующий глубокую связь Александроса с эллинской музыкой. Нежная баллада, ставшая фаворитом поклонников в греческой диаспоре.",
      el: "«Εσένα Μόνο» — μια τρυφερή μπαλάντα που αγαπήθηκε από τους Έλληνες της διασποράς.",
    },
    context: "Greek-language cover. 10M+ views on YouTube.",
    label: "Official channel",
  },
  {
    id: "tanets-greka-clip",
    youtubeId: "KmiV3qwNPBc",
    title: "Танец Грека",
    titleEn: "Tanets Greka (Dance of the Greek)",
    titleRu: "Танец Грека",
    titleEl: "Танец Грека (Ο χορός του Έλληνα)",
    year: 2021,
    views: "7.8M+",
    description: {
      en: "'Dance of the Greek' — an upbeat celebration of Greek dance culture and joy. The 2021 music video brings this fan-favourite track to life with vibrant visuals. A staple at Greek community events.",
      ru: "«Танец грека» — зажигательное празднование греческой танцевальной культуры. Клип 2021 года оживляет этот любимый фанатами трек яркими визуальными образами. Хит на всех греческих мероприятиях.",
      el: "«Ο χορός του Έλληνα» — ένα ζωηρό τραγούδι που γιορτάζει τον ελληνικό χορό. Κλασικό σε ελληνικές εκδηλώσεις.",
    },
    context: "2021 music video for the 2018 single. 7.8M+ YouTube views.",
    label: "Official channel",
  },
  {
    id: "kavkaz",
    youtubeId: "6uzHGKptumI",
    title: "Kavkaz",
    titleEn: "Kavkaz (Caucasus)",
    titleRu: "Кавказ",
    titleEl: "Kavkaz (Καύκασος)",
    year: 2023,
    views: "5.3M+",
    description: {
      en: "An ode to the Caucasus Mountains — the region where Alexandros was born. A powerful anthem blending Caucasian folk elements with modern pop production that celebrates his roots.",
      ru: "Ода Кавказским горам — региону, где родился Александрос. Мощный гимн, сочетающий кавказские народные элементы с современной поп-продакшн.",
      el: "Ωδή στα βουνά του Καυκάσου — την περιοχή όπου γεννήθηκε ο Αλέξανδρος. Ένας δυνατός ύμνος με στοιχεία καυκασιανής λαϊκής μουσικής.",
    },
    context: "2023 single. 5.3M+ YouTube views.",
    label: "Official channel",
  },
  {
    id: "diana",
    youtubeId: "GSaHrBTOvt8",
    title: "Диана",
    titleEn: "Diana",
    titleRu: "Диана",
    titleEl: "Ντιάνα",
    year: 2014,
    views: "3.5M+",
    description: {
      en: "A romantic Russian-language track dedicated to a woman named Diana. One of Alexandros's early hits that helped establish his name in the Russian-speaking music scene.",
      ru: "Романтический русскоязычный трек, посвящённый девушке по имени Диана. Один из ранних хитов Александроса, укрепивших его имя на русскоязычной музыкальной сцене.",
      el: "Ένα ρομαντικό τραγούδι στα ρωσικά αφιερωμένο σε μια γυναίκα ονόματι Ντιάνα.",
    },
    context: "Early career single. 3.5M+ views on YouTube.",
    label: "Official channel",
  },
  {
    id: "ya-grek",
    youtubeId: "sULilaPkHp0",
    title: "Я ГРЕК",
    titleEn: "Ya Grek (I Am Greek)",
    titleRu: "Я грек",
    titleEl: "Я грек (Είμαι Έλληνας)",
    year: 2022,
    views: "3.2M+",
    description: {
      en: "'I Am Greek' — a proud declaration of Pontic Greek identity. The lyrics celebrate Greek heritage through imagery of bouzouki strings, the sea, and ancient traditions. A fan favourite at Greek diaspora events across Russia.",
      ru: "«Я грек» — гордое заявление понтийско-греческой идентичности. Текст воспевает греческое наследие через образы бузуки, моря и древних традиций. Любимая песня на греческих мероприятиях диаспоры.",
      el: "«Είμαι Έλληνας» — μια υπερήφανη δήλωση ποντιακής ελληνικής ταυτότητας. Οι στίχοι γιορτάζουν την ελληνική κληρονομιά.",
    },
    context: "2022 single. 3.2M+ views — a cultural anthem for the Greek diaspora.",
    label: "Official channel",
  },
  {
    id: "za-toboi",
    youtubeId: "xw8ctinyw_o",
    title: "За Тобой",
    titleEn: "Za Toboy (After You)",
    titleRu: "За Тобой",
    titleEl: "За Тобой (Πίσω σου)",
    year: 2016,
    views: "3M+",
    description: {
      en: "'After You' — the title track from Alexandros's debut album. A heartfelt Russian-language ballad about pursuing love. The official music video showcases his emotional vocal delivery.",
      ru: "«За Тобой» — заглавный трек дебютного альбома Александроса. Искренняя русскоязычная баллада о стремлении к любви.",
      el: "«Πίσω σου» — το ομώνυμο τραγούδι του ντεμπούτου άλμπουμ του Αλέξανδρου. Μια ειλικρινής μπαλάντα στα ρωσικά.",
    },
    context: "Title track from the За тобой album (2018). 3M+ views on YouTube.",
    label: "Official channel",
  },
];
