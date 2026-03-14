import { generatePageMetadata } from '@/lib/seo';

const galleryDescriptions: Record<string, string> = {
  en: 'Alexandros Tsopozidis photo gallery — concert photos, behind the scenes, and press images from performances worldwide.',
  ru: 'Фотогалерея Александроса Цопозидиса — концертные фото, закулисье и пресс-фото с выступлений по всему миру.',
  el: 'Φωτογραφίες Αλέξανδρου Τσοποζίδη — φωτογραφίες από συναυλίες, παρασκήνια και εμφανίσεις σε όλο τον κόσμο.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    locale,
    path: 'gallery',
    title: 'Gallery — Alexandros Tsopozidis',
    description: galleryDescriptions[locale] || galleryDescriptions.en,
  });
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
