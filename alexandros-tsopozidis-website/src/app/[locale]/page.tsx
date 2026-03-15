import HeroSection from '@/components/home/HeroSection';
import LatestRelease from '@/components/home/LatestRelease';
import ComingSoon from '@/components/home/ComingSoon';
import AboutPreview from '@/components/home/AboutPreview';
import WhyBook from '@/components/home/WhyBook';
import VideoHighlight from '@/components/home/VideoHighlight';
import UpcomingShows from '@/components/home/UpcomingShows';
import JsonLd from '@/components/JsonLd';
import { generatePerformerSchema, generateBookingFAQSchema } from '@/lib/seo';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Alexandros Tsopozidis — Official Website',
  alternateName: ['Александрос Цопозидис', 'Αλέξανδρος Τσοποζίδης'],
  url: 'https://www.tsopozidis-alexandros.com',
  inLanguage: ['en', 'ru', 'el'],
  description: 'Official website of Alexandros Tsopozidis — Greek-Russian pop artist. Book for weddings, christenings, corporate events, birthdays & private celebrations worldwide.',
  publisher: {
    '@type': 'Person',
    name: 'Alexandros Tsopozidis',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.tsopozidis-alexandros.com/en/contact',
    'query-input': 'required name=event_type',
  },
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={generatePerformerSchema(locale)} />
      <JsonLd data={generateBookingFAQSchema(locale)} />
      <HeroSection />
      <div className="h-[1px] gold-line-subtle" />
      <LatestRelease />
      <div className="h-[1px] gold-line-subtle" />
      <ComingSoon />
      <div className="h-[1px] gold-line-subtle" />
      <AboutPreview />
      <div className="h-[1px] gold-line-subtle" />
      <WhyBook />
      <VideoHighlight />
      <div className="h-[1px] gold-line-subtle" />
      <UpcomingShows />
    </>
  );
}
