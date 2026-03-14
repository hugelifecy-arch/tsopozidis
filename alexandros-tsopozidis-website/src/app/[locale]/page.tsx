import HeroSection from '@/components/home/HeroSection';
import LatestRelease from '@/components/home/LatestRelease';
import AboutPreview from '@/components/home/AboutPreview';
import VideoHighlight from '@/components/home/VideoHighlight';
import UpcomingShows from '@/components/home/UpcomingShows';

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="h-[1px] gold-line-subtle" />
      <LatestRelease />
      <div className="h-[1px] gold-line-subtle" />
      <AboutPreview />
      <VideoHighlight />
      <div className="h-[1px] gold-line-subtle" />
      <UpcomingShows />
    </>
  );
}
