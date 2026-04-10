import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SectionHeading from '@/components/common/SectionHeading';
import ScrollReveal from '@/components/common/ScrollReveal';
import YouTubeFacade from '@/components/YouTubeFacade';
import { videos } from '@/lib/data/videos';

export default async function VideoHighlight() {
  const t = await getTranslations('videos');
  const tCommon = await getTranslations('common');
  const locale = await getLocale();
  const featured = videos[0]; // Бродяга
  const thumbnails = videos.slice(1, 4);

  const viewsLabel = locale === 'ru' ? 'просмотров' : locale === 'el' ? 'προβολές' : 'views';

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        </ScrollReveal>

        {/* Featured Video */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-sm overflow-hidden">
              <YouTubeFacade
                videoId={featured.youtubeId}
                title={featured.title}
                views={featured.views}
                quality="maxresdefault"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-display text-lg">{featured.title}</p>
              {featured.views && (
                <p className="text-text-secondary text-sm font-sans mt-1">{featured.views} {viewsLabel}</p>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Thumbnail Row */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
            {thumbnails.map((video) => (
              <div key={video.id} className="rounded-sm overflow-hidden">
                <YouTubeFacade
                  videoId={video.youtubeId}
                  title={video.title}
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="bg-gradient-to-t from-black/80 to-transparent p-3 -mt-10 relative z-10">
                  <p className="text-xs font-sans truncate">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="text-center mt-8">
          <Link
            href="/videos"
            className="text-gold font-sans text-sm tracking-wider hover:text-gold-light transition-colors duration-300"
          >
            {tCommon('view_all_videos')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
