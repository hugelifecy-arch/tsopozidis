import { Metadata } from 'next';

const BASE_URL = 'https://tsopozidis-alexandros.com';

const localeMap: Record<string, string> = {
  en: 'en_US',
  ru: 'ru_RU',
  el: 'el_GR',
};

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
  ogType?: 'website' | 'music.musician';
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
      type: ogType as 'website',
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
