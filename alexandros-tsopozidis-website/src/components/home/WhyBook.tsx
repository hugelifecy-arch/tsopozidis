'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeading from '@/components/common/SectionHeading';
import { Eye, Globe, CalendarHeart, Plane, SlidersHorizontal, Users } from 'lucide-react';

const icons = [Eye, Globe, CalendarHeart, Plane, SlidersHorizontal, Users];

export default function WhyBook() {
  const t = useTranslations('why_book');

  const items = [
    'views',
    'multilingual',
    'event_types',
    'international',
    'custom_formats',
    'audience',
  ] as const;

  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((key, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={key} delay={i * 0.1}>
                <div className="border border-border rounded-sm p-6 hover:border-gold/40 transition-colors duration-300 h-full">
                  <Icon className="w-6 h-6 text-gold mb-4" strokeWidth={1.5} />
                  <h3 className="font-display text-sm uppercase tracking-wider text-text-primary mb-2">
                    {t(`${key}_title`)}
                  </h3>
                  <p className="text-text-secondary font-sans text-sm font-light leading-relaxed">
                    {t(`${key}_desc`)}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.6}>
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block font-display uppercase tracking-wider transition-all duration-300 px-8 py-4 text-base border border-gold text-gold hover:bg-gold hover:text-bg-primary"
            >
              {t('cta')}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
