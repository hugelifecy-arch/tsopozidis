'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type Photo, getPhotoAlt } from '@/lib/data/gallery';

interface GalleryClientProps {
  photos: Photo[];
  locale: string;
  categoryLabels: Record<string, string>;
  categories: readonly string[];
}

export default function GalleryClient({ photos, locale, categoryLabels, categories }: GalleryClientProps) {
  const t = useTranslations('gallery');
  const [filter, setFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const filtered = filter === 'all' ? photos : photos.filter((p) => p.category === filter);
  const touchStartX = useRef<number | null>(null);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

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
    if (e.key === 'Escape') {
      e.preventDefault();
      setLightbox(null);
      return;
    }
    if (e.key === 'ArrowRight') {
      setLightbox((prev) => (prev !== null && prev < filtered.length - 1 ? prev + 1 : prev));
      return;
    }
    if (e.key === 'ArrowLeft') {
      setLightbox((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
      return;
    }
    // Simple focus trap
    if (e.key === 'Tab' && dialogRef.current) {
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [lightbox, filtered.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Scroll lock while open + focus management (move into dialog on open,
  // restore to the previously focused thumbnail on close).
  useEffect(() => {
    if (lightbox === null) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const id = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = previousOverflow;
      lastFocusedRef.current?.focus?.();
    };
  }, [lightbox]);

  const handleImageError = (photoId: string) => {
    setImageErrors((prev) => new Set(prev).add(photoId));
  };

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            type="button"
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

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setLightbox(i)}
            aria-label={t('view_photo', { alt: getPhotoAlt(photo, locale) })}
            className="break-inside-avoid cursor-pointer group overflow-hidden rounded-sm block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <div
              className="relative bg-bg-secondary group-hover:border-gold/30 border border-transparent transition-all duration-300 overflow-hidden"
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
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={getPhotoAlt(filtered[lightbox], locale)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center touch-pan-y"
            onClick={() => setLightbox(null)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              ref={closeBtnRef}
              onClick={() => setLightbox(null)}
              type="button"
              className="absolute top-4 right-4 min-w-[48px] min-h-[48px] flex items-center justify-center text-gold z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
              aria-label={t('close_lightbox')}
            >
              <X size={28} />
            </button>

            {lightbox > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                type="button"
                className="absolute left-2 md:left-6 min-w-[48px] min-h-[48px] flex items-center justify-center text-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                aria-label={t('previous_image')}
              >
                <ChevronLeft size={36} />
              </button>
            )}

            {lightbox < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
                type="button"
                className="absolute right-2 md:right-6 min-w-[48px] min-h-[48px] flex items-center justify-center text-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                aria-label={t('next_image')}
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
