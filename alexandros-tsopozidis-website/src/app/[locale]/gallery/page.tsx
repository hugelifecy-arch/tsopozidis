'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { X, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { photos, INSTAGRAM_URL, INSTAGRAM_HANDLE, getPhotoAlt } from '@/lib/data/gallery';

const categories = ['all', 'live', 'portrait', 'backstage', 'video-shoot'] as const;

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const [filter, setFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const filtered = filter === 'all' ? photos : photos.filter((p) => p.category === filter);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || lightbox === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const SWIPE_THRESHOLD = 50;
    if (diff > SWIPE_THRESHOLD && lightbox < filtered.length - 1) {
      setLightbox(lightbox + 1);
    } else if (diff < -SWIPE_THRESHOLD && lightbox > 0) {
      setLightbox(lightbox - 1);
    }
    touchStartX.current = null;
  }, [lightbox, filtered.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightbox === null) return;
    if (e.key === 'Escape') setLightbox(null);
    if (e.key === 'ArrowRight') setLightbox((prev) => (prev !== null && prev < filtered.length - 1 ? prev + 1 : prev));
    if (e.key === 'ArrowLeft') setLightbox((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, [lightbox, filtered.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleImageError = (photoId: string) => {
    setImageErrors((prev) => new Set(prev).add(photoId));
  };

  const categoryLabels: Record<string, string> = {
    all: t('all'),
    live: t('live'),
    portrait: t('portrait'),
    backstage: t('backstage'),
    'video-shoot': t('video_shoot'),
  };

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tsopozidis-alexandros.com' }, { '@type': 'ListItem', position: 2, name: 'Gallery', item: 'https://tsopozidis-alexandros.com/en/gallery' }] }} />
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Filter Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-sm font-sans uppercase tracking-wider transition-all duration-300 py-3 px-2 min-h-[48px] ${
                    filter === cat
                      ? 'text-gold border-b-2 border-gold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((photo, i) => (
              <ScrollReveal key={photo.id} delay={i * 0.03}>
                <div
                  className="break-inside-avoid cursor-pointer group overflow-hidden rounded-sm"
                  onClick={() => setLightbox(i)}
                >
                  <div
                    className="relative bg-bg-secondary hover:border-gold/30 border border-transparent transition-all duration-300 overflow-hidden"
                    style={{ aspectRatio: `${photo.width}/${photo.height}` }}
                  >
                    {imageErrors.has(photo.id) ? (
                      <div className="w-full h-full flex items-center justify-center text-text-tertiary text-xs font-sans">
                        {getPhotoAlt(photo, locale)}
                      </div>
                    ) : (
                      <Image
                        src={photo.src}
                        alt={getPhotoAlt(photo, locale)}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => handleImageError(photo.id)}
                      />
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

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

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center touch-pan-y"
            onClick={() => setLightbox(null)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 min-w-[48px] min-h-[48px] flex items-center justify-center text-gold z-10"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            {lightbox > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                className="absolute left-2 md:left-6 min-w-[48px] min-h-[48px] flex items-center justify-center text-gold/60 hover:text-gold"
                aria-label="Previous image"
              >
                <ChevronLeft size={36} />
              </button>
            )}

            {lightbox < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
                className="absolute right-2 md:right-6 min-w-[48px] min-h-[48px] flex items-center justify-center text-gold/60 hover:text-gold"
                aria-label="Next image"
              >
                <ChevronRight size={36} />
              </button>
            )}

            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[80vh] p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {imageErrors.has(filtered[lightbox].id) ? (
                <div className="bg-bg-secondary rounded-sm p-8 text-center">
                  <p className="text-text-secondary font-sans">{getPhotoAlt(filtered[lightbox], locale)}</p>
                </div>
              ) : (
                <div className="relative max-w-full max-h-[70vh]" style={{ aspectRatio: `${filtered[lightbox].width}/${filtered[lightbox].height}` }}>
                  <Image
                    src={filtered[lightbox].src}
                    alt={getPhotoAlt(filtered[lightbox], locale)}
                    fill
                    className="object-contain rounded-sm"
                    sizes="(max-width: 768px) 100vw, 896px"
                    quality={90}
                    priority
                    onError={() => handleImageError(filtered[lightbox].id)}
                  />
                </div>
              )}
              <p className="text-text-tertiary text-xs mt-3 text-center font-sans">
                {getPhotoAlt(filtered[lightbox], locale)} — {lightbox + 1} / {filtered.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
