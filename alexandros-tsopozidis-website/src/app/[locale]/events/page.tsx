'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import SocialIcons from '@/components/common/SocialIcons';
import JsonLd from '@/components/JsonLd';
import { events } from '@/lib/data/events';

export default function EventsPage() {
  const t = useTranslations('events');
  const locale = useLocale();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  const dateLocale = locale === 'ru' ? 'ru-RU' : locale === 'el' ? 'el-GR' : 'en-US';

  const upcoming = events.filter((e) => e.isUpcoming);
  const past = events.filter((e) => !e.isUpcoming).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const upcomingNonTBA = upcoming.filter(e => !e.comingSoon);
  const eventSchemas = upcomingNonTBA.map(event => ({
    '@type': 'MusicEvent',
    name: event.title,
    startDate: event.date,
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city,
        addressCountry: event.country,
      },
    },
    performer: {
      '@type': 'MusicArtist',
      name: 'Alexandros Tsopozidis',
    },
  }));

  // Group past events by year
  const pastByYear = past.reduce<Record<string, typeof past>>((acc, event) => {
    const year = new Date(event.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {});

  return (
    <>
      {eventSchemas.length > 0 && (
        <JsonLd data={{ '@context': 'https://schema.org', '@graph': eventSchemas }} />
      )}
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tsopozidis-alexandros.com' }, { '@type': 'ListItem', position: 2, name: 'Events', item: 'https://tsopozidis-alexandros.com/en/events' }] }} />
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className="py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Tab Toggle */}
          <ScrollReveal>
            <div className="flex justify-center gap-8 mb-16">
              {(['upcoming', 'past'] as const).map((tab_) => (
                <button
                  key={tab_}
                  onClick={() => setTab(tab_)}
                  className={`text-sm font-sans uppercase tracking-wider py-3 px-2 min-h-[48px] transition-all duration-300 ${
                    tab === tab_
                      ? 'text-gold border-b-2 border-gold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab_ === 'upcoming' ? t('upcoming_shows') : t('past_shows')}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {tab === 'upcoming' && (
            <ScrollReveal>
              {upcoming.some((e) => !e.comingSoon) ? (
                <div className="space-y-4">
                  {upcoming.filter((e) => !e.comingSoon).map((event) => {
                    const date = new Date(event.date);
                    return (
                      <div
                        key={event.id}
                        className="border-l-2 border-gold pl-6 py-6 bg-bg-secondary/50 rounded-r-sm"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-6">
                            <div className="text-center min-w-[60px]">
                              <p className="font-display text-3xl text-gold">{date.getDate()}</p>
                              <p className="text-xs text-text-secondary uppercase font-sans">
                                {date.toLocaleString(dateLocale, { month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                            <div>
                              <p className="font-sans font-medium text-lg">{event.title}</p>
                              <p className="text-sm text-text-secondary font-sans">
                                {event.venue} · {event.city}, {event.country}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-text-secondary font-serif italic text-xl mb-4">
                    {t('no_upcoming')}
                  </p>
                  <p className="text-text-tertiary font-sans text-sm mb-8">
                    {t('follow_social')}
                  </p>
                  <div className="flex justify-center mb-8">
                    <SocialIcons size="lg" />
                  </div>
                  <a
                    href="https://wa.me/79383163034"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-gold text-gold px-8 py-3 text-sm font-display uppercase tracking-wider hover:bg-gold hover:text-bg-primary transition-all duration-300"
                  >
                    {t('book_private')} →
                  </a>
                </div>
              )}
            </ScrollReveal>
          )}

          {tab === 'past' && (
            <div>
              {Object.entries(pastByYear)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, yearEvents]) => (
                  <ScrollReveal key={year}>
                    <div className="mb-12">
                      <h3 className="font-display text-2xl text-gold mb-6">{year}</h3>
                      <div className="space-y-3">
                        {yearEvents.map((event) => {
                          const date = new Date(event.date);
                          return (
                            <div
                              key={event.id}
                              className="flex items-center gap-6 border-l border-border pl-4 py-3"
                            >
                              <span className="text-xs text-text-tertiary font-sans min-w-[60px]">
                                {date.toLocaleString(dateLocale, { month: 'short', day: 'numeric' })}
                              </span>
                              <div>
                                <p className="font-sans text-sm">{event.title}</p>
                                <p className="text-xs text-text-secondary font-sans">
                                  {event.venue} · {event.city}, {event.country}
                                </p>
                              </div>
                              {event.isFeatured && (
                                <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full font-sans uppercase tracking-wider">
                                  {t('featured')}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
