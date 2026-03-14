'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { X, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import { photos, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/lib/data/gallery';

const categories = ['all', 'live', 'portrait', 'backstage', 'video-shoot'] as const;

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const [filter, setFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const filtered = filter === 'all' ? photos : photos.filter((p) => p.category === filter);

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
                  className={`text-sm font-sans uppercase tracking-wider transition-all duration-300 pb-1 ${
                    filter === cat
                      ? 'text-gold border-b border-gold'
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
                    className="bg-bg-secondary hover:border-gold/30 border border-transparent transition-all duration-300 overflow-hidden"
                    style={{ aspectRatio: `${photo.width}/${photo.height}` }}
                  >
                    {imageErrors.has(photo.id) ? (
                      <div className="w-full h-full flex items-center justify-center text-text-tertiary text-xs font-sans">
                        {photo.alt}
                      </div>
                    ) : (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-gold z-10">
              <X size={28} />
            </button>

            {lightbox > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                className="absolute left-4 md:left-8 text-gold/60 hover:text-gold"
              >
                <ChevronLeft size={36} />
              </button>
            )}

            {lightbox < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
                className="absolute right-4 md:right-8 text-gold/60 hover:text-gold"
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
                  <p className="text-text-secondary font-sans">{filtered[lightbox].alt}</p>
                </div>
              ) : (
                <img
                  src={filtered[lightbox].src}
                  alt={filtered[lightbox].alt}
                  className="max-w-full max-h-[70vh] object-contain rounded-sm"
                  onError={() => handleImageError(filtered[lightbox].id)}
                />
              )}
              <p className="text-text-tertiary text-xs mt-3 text-center font-sans">
                {filtered[lightbox].alt} — {lightbox + 1} / {filtered.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
