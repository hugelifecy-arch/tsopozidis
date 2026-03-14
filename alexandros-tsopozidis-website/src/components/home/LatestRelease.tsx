'use client';

import { useTranslations } from 'next-intl';
import { Music } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import ScrollReveal from '@/components/common/ScrollReveal';
import { singles } from '@/lib/data/discography';
import { socialLinks } from '@/lib/data/social-links';

const streamingPlatforms = ['spotify', 'apple-music', 'youtube', 'yandex-music', 'zvuk'];

export default function LatestRelease() {
  const t = useTranslations('music');
  const tCommon = useTranslations('common');
  const latest = singles[0]; // Mia Kardia
  const recentSingles = singles.slice(1, 5);

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
            <div className="w-full md:w-[40%] aspect-square relative rounded-sm border border-gold/20 overflow-hidden bg-bg-secondary shadow-[0_0_60px_rgba(200,169,110,0.05)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Music size={64} className="text-gold/20" />
              </div>
            </div>

            {/* Info */}
            <div className="w-full md:w-[60%]">
              <span className="text-xs tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full uppercase font-sans">
                {tCommon('new_single')}
              </span>
              <h3 className="font-display text-4xl mt-4">{latest.title}</h3>
              <p className="font-serif text-text-secondary text-lg mt-1">{latest.year}</p>
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
            </div>
          </div>
        </ScrollReveal>

        {/* Recent Singles Row */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
            {recentSingles.map((single) => (
              <div
                key={single.id}
                className="snap-start flex-shrink-0 w-48 group"
              >
                <div className="aspect-square bg-bg-secondary rounded-sm border border-border group-hover:border-gold/30 transition-all duration-300 flex items-center justify-center overflow-hidden">
                  <Music size={32} className="text-gold/20" />
                </div>
                <p className="mt-2 text-sm font-sans truncate">{single.title}</p>
                <p className="text-xs text-text-secondary font-sans">
                  {single.year}
                  {single.featuring && ` · ${t('featuring')} ${single.featuring}`}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
