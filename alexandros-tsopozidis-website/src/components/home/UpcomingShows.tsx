'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import SectionHeading from '@/components/common/SectionHeading';
import ScrollReveal from '@/components/common/ScrollReveal';
import { events } from '@/lib/data/events';

export default function UpcomingShows() {
  const t = useTranslations('events');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const upcoming = events.filter((e) => e.isUpcoming && !e.comingSoon);
  const hasUpcoming = upcoming.length > 0;

  const dateLocale = locale === 'ru' ? 'ru-RU' : locale === 'el' ? 'el-GR' : 'en-US';

  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {hasUpcoming ? (
            <div className="space-y-4">
              {upcoming.slice(0, 3).map((event) => {
                const date = new Date(event.date);
                return (
                  <div
                    key={event.id}
                    className="border-l-2 border-gold pl-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-center min-w-[60px]">
                        <p className="font-display text-2xl text-gold">
                          {date.getDate()}
                        </p>
                        <p className="text-xs text-text-secondary uppercase font-sans">
                          {date.toLocaleString(dateLocale, { month: 'short' })}
                        </p>
                      </div>
                      <div>
                        <p className="font-sans">{event.title}</p>
                        <p className="text-sm text-text-secondary font-sans">
                          {event.venue} · {event.city}, {event.country}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary font-serif italic text-lg mb-6">
                {t('no_upcoming')}
              </p>
              <a
                href="https://wa.me/79383163034"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gold text-gold px-6 py-3 text-sm font-display uppercase tracking-wider hover:bg-gold hover:text-bg-primary transition-all duration-300"
              >
                {t('book_private')} →
              </a>
            </div>
          )}
        </ScrollReveal>

        <div className="text-center mt-8">
          <Link
            href="/events"
            className="text-gold font-sans text-sm tracking-wider hover:text-gold-light transition-colors duration-300"
          >
            {tCommon('view_all_events')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
