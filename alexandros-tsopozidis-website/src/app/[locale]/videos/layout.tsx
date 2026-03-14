import { generatePageMetadata } from '@/lib/seo';

const videosDescriptions: Record<string, string> = {
  en: 'Watch Alexandros Tsopozidis music videos — Бродяга (22M+ views), Male Male (11M+ views), Kaciyorum, and live performances.',
  ru: 'Смотрите клипы Александроса Цопозидиса — Бродяга (22М+ просмотров), Male Male (11М+), Kaciyorum и живые выступления.',
  el: 'Δείτε τα βιντεοκλίπ του Αλέξανδρου Τσοποζίδη — Бродяга (22M+ views), Male Male (11M+), Kaciyorum και ζωντανές εμφανίσεις.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    locale,
    path: 'videos',
    title: 'Videos — Alexandros Tsopozidis',
    description: videosDescriptions[locale] || videosDescriptions.en,
  });
}

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
