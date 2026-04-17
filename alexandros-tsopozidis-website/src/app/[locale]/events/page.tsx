import { getTranslations, getLocale } from 'next-intl/server';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import SocialIcons from '@/components/common/SocialIcons';
import JsonLd from '@/components/JsonLd';
import EventsTabs from '@/components/events/EventsTabs';
import { events, getEventDisplayTitle } from '@/lib/data/events';

export default async function EventsPage() {
  const t = await getTranslations('events');
  const locale = await getLocale();

  const dateLocale = locale === 'ru' ? 'ru-RU' : locale === 'el' ? 'el-GR' : 'en-US';

  const upcoming = events.filter((e) => e.isUpcoming);
  const past = events.filter((e) => !e.isUpcoming).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const upcomingNonTBA = upcoming.filter(e => !e.comingSoon);
  const eventSchemas = upcomingNonTBA.map(event => ({
    '@type': 'MusicEvent',
    name: getEventDisplayTitle(event, locale),
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

  const upcomingContent = (
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
                      <p className="font-sans font-medium text-lg">{getEventDisplayTitle(event, locale)}</p>
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
  );

  const pastContent = (
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
                        <p className="font-sans text-sm">{getEventDisplayTitle(event, locale)}</p>
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
  );

  return (
    <>
      {eventSchemas.length > 0 && (
        <JsonLd data={{ '@context': 'https://schema.org', '@graph': eventSchemas }} />
      )}
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tsopozidis-alexandros.com' }, { '@type': 'ListItem', position: 2, name: 'Events', item: `https://www.tsopozidis-alexandros.com/${locale}/events` }] }} />
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className="py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <EventsTabs
            upcomingLabel={t('upcoming_shows')}
            pastLabel={t('past_shows')}
            upcomingContent={upcomingContent}
            pastContent={pastContent}
          />
        </div>
      </section>
    </>
  );
}
