import { getTranslations, getLocale } from 'next-intl/server';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import YouTubeFacade from '@/components/YouTubeFacade';
import JsonLd from '@/components/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { videos, getVideoDisplayTitle } from '@/lib/data/videos';
import { Link } from '@/i18n/routing';

export default async function VideosPage() {
  const t = await getTranslations('videos');
  const locale = await getLocale();
  const featured = videos[0];
  const rest = videos.slice(1);

  const viewsLabel = locale === 'ru' ? 'просмотров' : locale === 'el' ? 'προβολές' : 'views';

  const videoSchemas = videos.map(v => ({
    '@type': 'VideoObject',
    name: v.title,
    description: v.description[locale as keyof typeof v.description] || v.description.en,
    thumbnailUrl: `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.youtubeId}`,
    uploadDate: `${v.year}-01-01`,
  }));

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': videoSchemas }} />
      <JsonLd data={generateBreadcrumbSchema(locale, t('breadcrumb'), 'videos')} />
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      {/* Featured Video — Бродяга hero section */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="rounded-sm overflow-hidden">
              <YouTubeFacade
                videoId={featured.youtubeId}
                title={featured.title}
                views={featured.views}
                quality="maxresdefault"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
            <div className="mt-6">
              <h2 className="font-display text-2xl">{getVideoDisplayTitle(featured, locale)}</h2>
              <p className="text-text-secondary text-sm font-sans mt-1">
                {featured.year}
                {featured.featuring && ` · feat. ${featured.featuring}`}
                {featured.views && ` · ${featured.views} ${viewsLabel}`}
              </p>
              <p className="text-text-secondary font-sans font-light mt-4 leading-relaxed">
                {featured.description[locale as keyof typeof featured.description] || featured.description.en}
              </p>
              {featured.context && (
                <p className="text-text-tertiary text-xs font-sans mt-3 italic">
                  {featured.context}
                </p>
              )}
              <Link
                href="/contact"
                className="inline-block mt-6 border border-gold/30 text-gold px-5 py-2 text-xs font-display uppercase tracking-wider hover:bg-gold/10 transition-all duration-300"
              >
                {t('book_performance')} →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Remaining Videos — Alternating Layout */}
      <section className="py-12 pb-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {rest.map((video, i) => (
            <ScrollReveal key={video.id}>
              <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center py-12 ${i > 0 ? 'border-t border-border' : ''}`}>
                {/* Video embed — 60% width */}
                <div className="w-full md:w-[60%]">
                  <div className="rounded-sm overflow-hidden">
                    <YouTubeFacade
                      videoId={video.youtubeId}
                      title={video.title}
                      views={video.views}
                      quality="maxresdefault"
                    />
                  </div>
                </div>

                {/* Info — 40% width */}
                <div className="w-full md:w-[40%]">
                  <h3 className="font-display text-2xl">{getVideoDisplayTitle(video, locale)}</h3>
                  <p className="text-text-secondary text-sm font-sans mt-1">
                    {video.year}
                    {video.featuring && ` · feat. ${video.featuring}`}
                    {video.views && ` · ${video.views} ${viewsLabel}`}
                  </p>

                  <p className="text-text-secondary font-sans font-light mt-4 leading-relaxed">
                    {video.description[locale as keyof typeof video.description] || video.description.en}
                  </p>

                  {video.context && (
                    <p className="text-text-tertiary text-xs font-sans mt-3 italic">
                      {video.context}
                    </p>
                  )}

                  {video.shotLocation && (
                    <p className="text-gold/60 text-xs font-sans mt-2">
                      {t('filmed_in', { location: video.shotLocation })}
                    </p>
                  )}

                  {/* CTA */}
                  <a
                    href="/contact"
                    className="inline-block mt-6 border border-gold/30 text-gold px-5 py-2 text-xs font-display uppercase tracking-wider hover:bg-gold/10 transition-all duration-300"
                  >
                    {t('book_performance')} →
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
