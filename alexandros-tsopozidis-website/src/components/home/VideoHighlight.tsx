'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Play } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SectionHeading from '@/components/common/SectionHeading';
import ScrollReveal from '@/components/common/ScrollReveal';
import { videos } from '@/lib/data/videos';

export default function VideoHighlight() {
  const t = useTranslations('videos');
  const tCommon = useTranslations('common');
  const [playing, setPlaying] = useState(false);
  const featured = videos[0]; // Бродяга
  const thumbnails = videos.slice(1, 4);

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        </ScrollReveal>

        {/* Featured Video */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-bg-tertiary rounded-sm overflow-hidden">
              {!playing ? (
                <button
                  onClick={() => setPlaying(true)}
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
            <div className="mt-4 text-center">
              <p className="font-display text-lg">{featured.title}</p>
              {featured.views && (
                <p className="text-text-secondary text-sm font-sans mt-1">{featured.views} views</p>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Thumbnail Row */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
            {thumbnails.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="aspect-video bg-bg-tertiary rounded-sm relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={24} className="text-gold/40 group-hover:text-gold transition-colors" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-xs font-sans truncate">{video.title}</p>
                  </div>
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
