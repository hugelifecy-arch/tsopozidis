'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/common/SectionHeading';
import ScrollReveal from '@/components/common/ScrollReveal';
import AlbumCover from '@/components/AlbumCover';
import StreamingEmbed from '@/components/music/StreamingEmbed';
import { singles } from '@/lib/data/discography';
import { socialLinks } from '@/lib/data/social-links';

const streamingPlatforms = ['spotify', 'apple-music', 'youtube', 'yandex-music', 'zvuk'];

export default function LatestRelease() {
  const t = useTranslations('music');
  const tCommon = useTranslations('common');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const topReleases = singles.slice(0, 4);
  const selected = topReleases[selectedIdx];

  const platforms = socialLinks.filter((l) => streamingPlatforms.includes(l.platform));

  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading title={t('latest_release')} />
        </ScrollReveal>

        {/* Featured Release */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Artwork */}
            <div className="w-full md:w-[40%]">
              <AlbumCover src={selected.coverImage} spotifyCoverUrl={selected.spotifyCoverUrl} title={selected.title} year={selected.year} size="lg" className="w-full shadow-[0_0_60px_rgba(200,169,110,0.05)]" />

              {/* Release Selector */}
              <div className="flex gap-2 mt-4 justify-center md:justify-start flex-wrap">
                {topReleases.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedIdx(idx)}
                    className={`px-3 py-1.5 text-[10px] font-sans uppercase tracking-wider rounded-full transition-all duration-300 ${
                      idx === selectedIdx
                        ? 'bg-gold/15 text-gold border border-gold/30'
                        : 'text-text-tertiary hover:text-text-secondary border border-transparent'
                    }`}
                  >
                    {s.title.length > 12 ? s.title.substring(0, 12) + '…' : s.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="w-full md:w-[60%]">
              <span className="text-xs tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full uppercase font-sans">
                {selectedIdx === 0 ? tCommon('new_single') : t('single')}
              </span>
              <h3 className="font-display text-4xl mt-4">{selected.title}</h3>
              <p className="font-serif text-text-secondary text-lg mt-1">
                {selected.year}
                {selected.featuring && ` · ${t('featuring')} ${selected.featuring}`}
              </p>
              <p className="text-text-secondary font-sans font-light mt-4 leading-relaxed">
                {t('latest_description')}
              </p>

              {/* Streaming buttons */}
              <div className="flex flex-wrap gap-3 mt-8">
                {platforms.map((p) => (
                  <a
                    key={p.platform}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gold/30 text-gold text-xs uppercase tracking-wider px-4 py-2.5 min-h-[44px] flex items-center font-sans hover:bg-gold/10 transition-colors duration-300"
                  >
                    {p.label}
                  </a>
                ))}
              </div>

              {/* Streaming Player */}
              <div className="mt-6">
                <StreamingEmbed height={152} />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
