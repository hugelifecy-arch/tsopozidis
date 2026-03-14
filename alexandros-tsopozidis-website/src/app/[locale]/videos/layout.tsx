import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, getArtistName } from '@/lib/seo';

const videosDescriptions: Record<string, string> = {
  en: 'Watch Alexandros Tsopozidis music videos — Бродяга (22M+ views), Male Male (11M+ views), Kaciyorum, and live performances.',
  ru: 'Смотрите клипы Александроса Цопозидиса — Бродяга (22М+ просмотров), Male Male (11М+), Kaciyorum и живые выступления.',
  el: 'Δείτε τα βιντεοκλίπ του Αλέξανδρου Τσοποζίδη — Бродяга (22M+ views), Male Male (11M+), Kaciyorum και ζωντανές εμφανίσεις.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'videos' });
  return generatePageMetadata({
    locale,
    path: 'videos',
    title: `${t('title')} — ${getArtistName(locale)}`,
    description: videosDescriptions[locale] || videosDescriptions.en,
  });
}

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
