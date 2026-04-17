import HeroSection from '@/components/home/HeroSection';
import LatestRelease from '@/components/home/LatestRelease';
import ComingSoon from '@/components/home/ComingSoon';
import AboutPreview from '@/components/home/AboutPreview';
import WhyBook from '@/components/home/WhyBook';
import VideoHighlight from '@/components/home/VideoHighlight';
import UpcomingShows from '@/components/home/UpcomingShows';
import JsonLd from '@/components/JsonLd';
import {
  generatePerformerSchema,
  generateBookingFAQSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from '@/lib/seo';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={generateWebSiteSchema()} />
      <JsonLd data={generateOrganizationSchema()} />
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
