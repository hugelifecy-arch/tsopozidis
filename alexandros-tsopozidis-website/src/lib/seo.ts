import { Metadata } from 'next';

const BASE_URL = 'https://www.tsopozidis-alexandros.com';

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
  ogType = 'website',
  ogImage,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  ogType?: 'website' | 'profile';
  ogImage?: string;
}): Metadata {
  const pagePath = path ? `/${path}` : '';
  const canonical = `${BASE_URL}/${locale}${pagePath}`;
  const image = ogImage || `${BASE_URL}/images/og-default.jpg`;

  return {
    title,
    description,
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
