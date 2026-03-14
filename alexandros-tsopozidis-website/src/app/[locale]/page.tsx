import HeroSection from '@/components/home/HeroSection';
import LatestRelease from '@/components/home/LatestRelease';
import ComingSoon from '@/components/home/ComingSoon';
import AboutPreview from '@/components/home/AboutPreview';
import WhyBook from '@/components/home/WhyBook';
import VideoHighlight from '@/components/home/VideoHighlight';
import UpcomingShows from '@/components/home/UpcomingShows';
import JsonLd from '@/components/JsonLd';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Alexandros Tsopozidis — Official Website',
  alternateName: 'Александрос Цопозидис',
  url: 'https://tsopozidis-alexandros.com',
  inLanguage: ['en', 'ru', 'el'],
  description: 'Official website of Alexandros Tsopozidis. Greek soul, Eastern sound.',
  publisher: {
    '@type': 'Person',
    name: 'Alexandros Tsopozidis',
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema} />
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
