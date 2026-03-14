'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import { videos } from '@/lib/data/videos';

export default function VideosPage() {
  const t = useTranslations('videos');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const featured = videos[0];
  const rest = videos.slice(1);

  return (
    <>
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      {/* Featured Video */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="relative aspect-video bg-bg-secondary rounded-sm overflow-hidden">
              {!featuredPlaying ? (
                <button
                  onClick={() => setFeaturedPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center group-hover:bg-gold/20 transition-all duration-300">
                    <Play size={32} className="text-gold ml-1" />
                  </div>
                </button>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${featured.youtubeId}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
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
                className="group cursor-pointer"
                onClick={() => setActiveVideo(video.youtubeId)}
              >
                <div className="aspect-video bg-bg-secondary rounded-sm relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold transition-all duration-300">
                      <Play size={20} className="text-gold/60 group-hover:text-gold ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="font-sans text-sm">{video.title}</p>
                    <p className="text-xs text-text-secondary mt-1">
                      {video.year}
                      {video.views && ` · ${video.views} views`}
                    </p>
                  </div>
                  {video.views && (
                    <span className="absolute top-3 right-3 text-[10px] bg-black/70 text-gold px-2 py-0.5 rounded font-sans">
                      {video.views}
                    </span>
                  )}
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
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
