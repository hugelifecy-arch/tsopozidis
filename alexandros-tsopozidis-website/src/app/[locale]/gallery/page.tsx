import { getTranslations, getLocale } from 'next-intl/server';
import { Instagram } from 'lucide-react';
import Image from 'next/image';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import GalleryClient from '@/components/gallery/GalleryClient';
import { photos, INSTAGRAM_URL, INSTAGRAM_HANDLE, getPhotoAlt } from '@/lib/data/gallery';

const categories = ['all', 'live', 'portrait', 'backstage', 'video-shoot'] as const;

export default async function GalleryPage() {
  const t = await getTranslations('gallery');
  const locale = await getLocale();

  const categoryLabels: Record<string, string> = {
    all: t('all'),
    live: t('live'),
    portrait: t('portrait'),
    backstage: t('backstage'),
    'video-shoot': t('video_shoot'),
  };

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tsopozidis-alexandros.com' }, { '@type': 'ListItem', position: 2, name: 'Gallery', item: `https://www.tsopozidis-alexandros.com/${locale}/gallery` }] }} />
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Server-rendered photo grid for SEO — all images with alt text visible to crawlers */}
          <noscript>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {photos.map((photo) => (
                <div key={photo.id} className="break-inside-avoid overflow-hidden rounded-sm">
                  <div
                    className="relative bg-bg-secondary"
                    style={{ aspectRatio: `${photo.width}/${photo.height}` }}
                  >
                    <Image
                      src={photo.src}
                      alt={getPhotoAlt(photo, locale)}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </noscript>

          {/* Client-side interactive gallery with filtering + lightbox */}
          <GalleryClient
            photos={photos}
            locale={locale}
            categoryLabels={categoryLabels}
            categories={categories}
          />

          {/* Instagram CTA Section */}
          <ScrollReveal>
            <div className="mt-20 text-center">
              <div className="gold-line-subtle mx-auto mb-8 w-16" />
              <h3 className="font-display text-2xl md:text-3xl text-text-primary mb-4">
                {t('instagram_title')}
              </h3>
              <p className="text-text-secondary font-serif italic mb-8 max-w-lg mx-auto">
                {t('instagram_subtitle')}
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3 border border-gold/40 text-gold hover:bg-gold/10 transition-all duration-300 rounded-sm font-sans uppercase tracking-wider text-sm"
              >
                <Instagram size={20} />
                {t('instagram_follow')} {INSTAGRAM_HANDLE}
              </a>
              <p className="text-text-tertiary text-xs mt-4 font-sans">
                310K+ {t('instagram_followers')}
              </p>
            </div>
          </ScrollReveal>

          <p className="text-center text-text-secondary font-serif italic mt-16 text-sm">
            {t('press_note')}
          </p>
        </div>
      </section>
    </>
  );
}
