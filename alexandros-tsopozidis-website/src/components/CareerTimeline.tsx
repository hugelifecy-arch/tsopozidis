'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/common/ScrollReveal';

interface TimelineEntry {
  year: string;
  key: string;
  featured?: boolean;
}

const timelineEntries: TimelineEntry[] = [
  { year: '1986', key: 'born' },
  { year: '1998', key: 'cyprus' },
  { year: '2011', key: 'music_start' },
  { year: '2011', key: 'debut' },
  { year: '2013', key: 'volna_first' },
  { year: '2013', key: 'male_male', featured: true },
  { year: '2014', key: 'brodyaga', featured: true },
  { year: '2014', key: 'volna_award', featured: true },
  { year: '2015', key: 'armenians_greeks' },
  { year: '2017', key: 'dai_nomer' },
  { year: '2018', key: 'karnaval' },
  { year: '2018', key: 'zhara', featured: true },
  { year: '2018', key: 'stars_east' },
  { year: '2018', key: 'za_toboi' },
  { year: '2022', key: 'kavkaz_fest' },
  { year: '2022', key: 'ya_grek' },
  { year: '2023', key: 'kavkaz_single' },
  { year: '2024', key: 'par_shirkhani' },
  { year: '2025', key: 'mia_kardia' },
  { year: '2025', key: 'vechnaya', featured: true },
];

export default function CareerTimeline() {
  const t = useTranslations('timeline');

  return (
    <section className="py-24 px-4 md:px-8 bg-bg-secondary">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-2xl uppercase tracking-wider text-center mb-16">
            {t('title')}
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gold/20 md:-translate-x-[0.5px]" />

          {timelineEntries.map((entry, i) => (
            <ScrollReveal key={`${entry.year}-${entry.key}`} delay={i * 0.03}>
              <div className={`relative flex mb-8 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 z-10">
                  <div className={`rounded-full border-2 border-gold ${
                    entry.featured
                      ? 'w-4 h-4 bg-gold'
                      : 'w-3 h-3 bg-bg-secondary'
                  }`} />
                </div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${
                  i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'
                }`}>
                  <div className={`p-4 rounded-sm ${
                    entry.featured
                      ? 'bg-gold/5 border border-gold/20'
                      : 'bg-bg-primary/50'
                  }`}>
                    <span className="text-gold font-display text-sm tracking-wider">
                      {entry.year}
                    </span>
                    <p className="text-text-secondary font-sans text-sm mt-1 leading-relaxed">
                      {t(entry.key)}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
