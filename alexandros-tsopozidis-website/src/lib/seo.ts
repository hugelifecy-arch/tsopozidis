import { Metadata } from 'next';

export const BASE_URL = 'https://www.tsopozidis-alexandros.com';

const localeMap: Record<string, string> = {
  en: 'en_US',
  ru: 'ru_RU',
  el: 'el_GR',
};

export const ARTIST_NAME: Record<string, string> = {
  en: 'Alexandros Tsopozidis',
  ru: 'Александрос Цопозидис',
  el: 'Αλέξανδρος Τσοποζίδης',
};

/** SEO keywords targeting event booking searches per locale */
export const EVENT_BOOKING_KEYWORDS: Record<string, string> = {
  en: 'book singer for wedding, hire singer for event, Greek singer for hire, singer for christening, singer for baptism, singer for corporate event, singer for birthday party, book artist for engagement party, singer for private event, singer for festival, Greek Russian singer, Eastern European singer for hire, book live singer, wedding entertainment, christening entertainment, event singer Cyprus, event singer Europe, Pontic Greek singer, Caucasian singer for wedding, multilingual singer for events',
  ru: 'заказать певца на свадьбу, певец на свадьбу, певец на корпоратив, певец на юбилей, певец на крестины, певец на день рождения, заказать артиста на мероприятие, греческий певец на свадьбу, певец на банкет, певец на праздник, заказать певца на крестины, кавказский певец на свадьбу, певец на помолвку, певец на именины, артист на свадьбу Москва, артист на свадьбу Россия, живая музыка на свадьбу, артист на корпоратив, певец на частное мероприятие, восточный певец на праздник',
  el: 'τραγουδιστής για γάμο, τραγουδιστής για βάπτιση, τραγουδιστής για πάρτι, τραγουδιστής για εκδήλωση, καλλιτέχνης για γάμο, κρατήσεις τραγουδιστή, τραγουδιστής για αρραβώνα, τραγουδιστής για γενέθλια, τραγουδιστής για ονομαστική γιορτή, Πόντιος τραγουδιστής για γάμο, Ελληνορώσος τραγουδιστής, τραγουδιστής για εταιρική εκδήλωση, ζωντανή μουσική για γάμο, τραγουδιστής Κύπρος, τραγουδιστής Ελλάδα, τραγουδιστής για πανηγύρι, μουσική για βάπτιση, τραγουδιστής για γιορτή',
};

export function getArtistName(locale: string): string {
  return ARTIST_NAME[locale] || ARTIST_NAME.en;
}

export function generateBreadcrumbSchema(locale: string, pageName: string, pagePath: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: pageName, item: `${BASE_URL}/${locale}/${pagePath}` },
    ],
  };
}

export function generatePageMetadata({
  locale,
  path = '',
  title,
  description,
  keywords,
  ogType = 'website',
  ogImage,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  keywords?: string;
  ogType?: 'website' | 'profile';
  ogImage?: string;
}): Metadata {
  const pagePath = path ? `/${path}` : '';
  const canonical = `${BASE_URL}/${locale}${pagePath}`;
  const image = ogImage || `${BASE_URL}/images/og-default.jpg`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords: keywords || EVENT_BOOKING_KEYWORDS[locale] || EVENT_BOOKING_KEYWORDS.en,
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical,
      languages: {
        en: `${BASE_URL}/en${pagePath}`,
        ru: `${BASE_URL}/ru${pagePath}`,
        el: `${BASE_URL}/el${pagePath}`,
        'x-default': `${BASE_URL}/en${pagePath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: ogType,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
      siteName: 'Alexandros Tsopozidis',
      locale: localeMap[locale] || 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    other: {
      'vk:image': image,
    },
  };
}

/** Generate performer/entertainer JSON-LD for booking pages */
export function generatePerformerSchema(locale: string) {
  const name = ARTIST_NAME[locale] || ARTIST_NAME.en;
  return {
    '@context': 'https://schema.org',
    '@type': 'PerformingGroup',
    name,
    alternateName: Object.values(ARTIST_NAME).filter(n => n !== name),
    description: locale === 'ru'
      ? 'Греко-кавказский певец. Доступен для свадеб, крестин, корпоративов, юбилеев, дней рождения, помолвок и частных мероприятий.'
      : locale === 'el'
        ? 'Ελληνο-καυκάσιος τραγουδιστής. Διαθέσιμος για γάμους, βαπτίσεις, εταιρικά events, γενέθλια, αρραβώνες και ιδιωτικές εκδηλώσεις.'
        : 'Greek-Caucasian singer. Available for weddings, christenings, corporate events, birthdays, engagements, and private celebrations.',
    url: `${BASE_URL}/${locale}/contact`,
    image: `${BASE_URL}/images/og-default.jpg`,
    genre: ['Greek Pop', 'Eastern Music', 'Caucasian Music', 'Pontic Greek Music'],
    knowsLanguage: ['ru', 'el', 'en'],
    areaServed: [
      { '@type': 'Country', name: 'Russia' },
      { '@type': 'Country', name: 'Greece' },
      { '@type': 'Country', name: 'Cyprus' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Georgia' },
      { '@type': 'Country', name: 'Azerbaijan' },
      { '@type': 'Country', name: 'Armenia' },
      { '@type': 'Country', name: 'Kazakhstan' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'United States' },
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: locale === 'ru' ? 'Выступление на свадьбе' : locale === 'el' ? 'Εμφάνιση σε γάμο' : 'Wedding Performance',
          description: locale === 'ru' ? 'Живое выступление на свадебном торжестве' : locale === 'el' ? 'Ζωντανή εμφάνιση σε γαμήλια δεξίωση' : 'Live performance at wedding celebrations',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: locale === 'ru' ? 'Выступление на крестинах' : locale === 'el' ? 'Εμφάνιση σε βάπτιση' : 'Christening / Baptism Performance',
          description: locale === 'ru' ? 'Живое выступление на крестинах' : locale === 'el' ? 'Ζωντανή εμφάνιση σε βάπτιση' : 'Live performance at christening/baptism celebrations',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: locale === 'ru' ? 'Корпоративное выступление' : locale === 'el' ? 'Εταιρική εμφάνιση' : 'Corporate Event Performance',
          description: locale === 'ru' ? 'Выступление на корпоративных мероприятиях' : locale === 'el' ? 'Εμφάνιση σε εταιρικές εκδηλώσεις' : 'Live performance at corporate events and galas',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: locale === 'ru' ? 'Концерт / Фестиваль' : locale === 'el' ? 'Συναυλία / Φεστιβάλ' : 'Concert / Festival',
          description: locale === 'ru' ? 'Выступление на концертах и фестивалях' : locale === 'el' ? 'Εμφάνιση σε συναυλίες και φεστιβάλ' : 'Performance at concerts and music festivals',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: locale === 'ru' ? 'Частное мероприятие' : locale === 'el' ? 'Ιδιωτική εκδήλωση' : 'Private Event',
          description: locale === 'ru' ? 'Выступление на юбилеях, днях рождения, помолвках' : locale === 'el' ? 'Εμφάνιση σε γενέθλια, αρραβώνες, ονομαστικές γιορτές' : 'Performance at birthdays, engagements, name days, anniversaries',
        },
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7-938-316-30-34',
      contactType: 'booking',
      availableLanguage: ['Russian', 'Greek', 'English'],
    },
  };
}

/** Generate FAQ schema for event booking SEO */
export function generateBookingFAQSchema(locale: string) {
  const faqs = locale === 'ru' ? [
    { q: 'Можно ли заказать Александроса Цопозидиса на свадьбу?', a: 'Да, Александрос доступен для выступлений на свадьбах по всему миру. Он исполняет песни на русском, греческом и понтийском языках, создавая незабываемую атмосферу для вашего торжества. Свяжитесь с букинг-менеджером Лианой по WhatsApp: +7 938 316 30 34.' },
    { q: 'Выступает ли Александрос на крестинах и крещениях?', a: 'Да, Александрос регулярно выступает на крестинах и крещениях. Его репертуар включает традиционные греческие, понтийские и русские песни, идеально подходящие для таких торжеств.' },
    { q: 'Можно ли пригласить певца на корпоратив или юбилей?', a: 'Конечно. Александрос выступает на корпоративных мероприятиях, юбилеях, днях рождения и банкетах. Формат — от камерного акустического сета до полноценного концерта.' },
    { q: 'В каких странах доступны выступления?', a: 'Александрос выступает по всему миру. Базируется на Кипре, активно гастролирует по России, Греции, Германии, странам СНГ, ОАЭ и другим. Для международного букинга свяжитесь с нами.' },
    { q: 'На каких языках поёт Александрос?', a: 'Александрос исполняет песни на русском, греческом, понтийском греческом, армянском и испанском языках. Это делает его идеальным выбором для мультикультурных мероприятий.' },
    { q: 'Какой репертуар доступен для свадьбы?', a: 'Для свадеб доступен полный репертуар: от хитов «Бродяга» (22М+ просмотров) и «Male Male» до лирических и танцевальных композиций. Программа согласовывается индивидуально.' },
  ] : locale === 'el' ? [
    { q: 'Μπορώ να κλείσω τον Αλέξανδρο Τσοποζίδη για γάμο;', a: 'Ναι, ο Αλέξανδρος είναι διαθέσιμος για εμφανίσεις σε γάμους σε όλο τον κόσμο. Τραγουδά στα ρωσικά, ελληνικά και ποντιακά, δημιουργώντας μια αξέχαστη ατμόσφαιρα. Επικοινωνήστε μέσω WhatsApp: +7 938 316 30 34.' },
    { q: 'Εμφανίζεται ο Αλέξανδρος σε βαπτίσεις;', a: 'Ναι, ο Αλέξανδρος εμφανίζεται τακτικά σε βαπτίσεις και χριστουγεννιάτικες εκδηλώσεις. Το ρεπερτόριό του περιλαμβάνει παραδοσιακά ελληνικά, ποντιακά και ρωσικά τραγούδια.' },
    { q: 'Μπορώ να τον καλέσω σε εταιρική εκδήλωση ή πάρτι γενεθλίων;', a: 'Φυσικά. Ο Αλέξανδρος εμφανίζεται σε εταιρικές εκδηλώσεις, πάρτι γενεθλίων, ονομαστικές γιορτές και αρραβώνες. Η μορφή κυμαίνεται από ακουστικό σετ έως πλήρη συναυλία.' },
    { q: 'Σε ποιες χώρες είναι διαθέσιμος;', a: 'Ο Αλέξανδρος εμφανίζεται σε όλο τον κόσμο. Βρίσκεται στην Κύπρο και περιοδεύει ενεργά σε Ελλάδα, Ρωσία, Γερμανία, ΗΑΕ και αλλού. Επικοινωνήστε για διεθνείς κρατήσεις.' },
    { q: 'Σε ποιες γλώσσες τραγουδάει ο Αλέξανδρος;', a: 'Ο Αλέξανδρος τραγουδά στα ρωσικά, ελληνικά, ποντιακά, αρμενικά και ισπανικά. Αυτό τον καθιστά ιδανική επιλογή για πολυπολιτισμικές εκδηλώσεις.' },
    { q: 'Τι ρεπερτόριο είναι διαθέσιμο για γάμο;', a: 'Για γάμους διατίθεται πλήρες ρεπερτόριο: από hits όπως «Бродяга» (Αλήτης, 22M+ views) και «Male Male» μέχρι λυρικά και χορευτικά κομμάτια. Το πρόγραμμα διαμορφώνεται ανάλογα.' },
  ] : [
    { q: 'Can I book Alexandros Tsopozidis for a wedding?', a: 'Yes, Alexandros is available for wedding performances worldwide. He sings in Russian, Greek, and Pontic Greek, creating an unforgettable atmosphere for your celebration. Contact booking manager Liana via WhatsApp: +7 938 316 30 34.' },
    { q: 'Does Alexandros perform at christenings and baptisms?', a: 'Yes, Alexandros regularly performs at christenings and baptisms. His repertoire includes traditional Greek, Pontic Greek, and Russian songs perfect for such celebrations.' },
    { q: 'Can I hire him for a corporate event or birthday party?', a: 'Absolutely. Alexandros performs at corporate events, birthday parties, anniversaries, engagements, and name day celebrations. Formats range from intimate acoustic sets to full concert productions.' },
    { q: 'In which countries is Alexandros available for events?', a: 'Alexandros performs worldwide. Based in Cyprus, he actively tours Russia, Greece, Germany, CIS countries, UAE, and beyond. Contact us for international booking.' },
    { q: 'What languages does Alexandros sing in?', a: 'Alexandros performs in Russian, Greek, Pontic Greek, Armenian, and Spanish. This makes him an ideal choice for multicultural events and diverse audiences.' },
    { q: 'What repertoire is available for weddings?', a: 'For weddings, the full repertoire is available: from hits like "Brodyaga" (22M+ YouTube views) and "Male Male" to lyrical ballads and dance tracks. The program is customized to your preferences.' },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}
