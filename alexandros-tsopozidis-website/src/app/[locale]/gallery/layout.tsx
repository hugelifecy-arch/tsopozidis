import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, getArtistName } from '@/lib/seo';

const galleryDescriptions: Record<string, string> = {
  en: 'Photo gallery of Alexandros Tsopozidis — live performances, portraits, backstage moments and music video shoots.',
  ru: 'Фотогалерея Александроса Цопозидиса — концерты, портреты, бэкстейдж и съёмки клипов.',
  el: 'Φωτογραφίες του Αλέξανδρου Τσοποζίδη — ζωντανές εμφανίσεις, πορτρέτα και παρασκήνια.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gallery' });
  return generatePageMetadata({
    locale,
    path: 'gallery',
    title: `${t('title')} — ${getArtistName(locale)}`,
    description: galleryDescriptions[locale] || galleryDescriptions.en,
  });
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
