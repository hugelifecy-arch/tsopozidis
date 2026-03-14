'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import YouTubeFacade from '@/components/YouTubeFacade';
import { videos } from '@/lib/data/videos';

export default function VideosPage() {
  const t = useTranslations('videos');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const featured = videos[0];
  const rest = videos.slice(1);

  return (
    <>
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      {/* Featured Video */}
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
            <div className="mt-4">
              <h2 className="font-display text-xl">{featured.title}</h2>
              <p className="text-text-secondary text-sm font-sans">
                {featured.year}
                {featured.featuring && ` · feat. ${featured.featuring}`}
                {featured.views && ` · ${featured.views} views`}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-12 pb-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((video, i) => (
            <ScrollReveal key={video.id} delay={i * 0.05}>
              <div
                className="group cursor-pointer rounded-sm overflow-hidden"
                onClick={() => setActiveVideo(video.youtubeId)}
              >
                <YouTubeFacade
                  videoId={video.youtubeId}
                  title={video.title}
                  views={video.views}
                />
                <div className="mt-2 px-1">
                  <p className="font-sans text-sm">{video.title}</p>
                  <p className="text-xs text-text-secondary mt-1">
                    {video.year}
                    {video.views && ` · ${video.views} views`}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Video Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 text-gold z-10"
              aria-label="Close video"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                className="w-full h-full rounded-sm"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Video player"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
