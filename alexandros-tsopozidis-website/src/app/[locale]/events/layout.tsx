import { generatePageMetadata } from '@/lib/seo';

const eventsDescriptions: Record<string, string> = {
  en: 'Alexandros Tsopozidis upcoming shows and past events. Book for concerts, corporate events, weddings and private parties. Contact: +7 938 316 30 34.',
  ru: 'Александрос Цопозидис — концерты и мероприятия. Заказать на корпоратив, свадьбу, частный праздник. Букинг: +7 938 316 30 34.',
  el: 'Αλέξανδρος Τσοποζίδης — εκδηλώσεις και συναυλίες. Κρατήσεις για εταιρικά events, γάμους και ιδιωτικές εκδηλώσεις.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    locale,
    path: 'events',
    title: 'Events — Alexandros Tsopozidis',
    description: eventsDescriptions[locale] || eventsDescriptions.en,
  });
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
