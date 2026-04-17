import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, getArtistName, generateBreadcrumbSchema } from '@/lib/seo';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import GoldButton from '@/components/common/GoldButton';
import JsonLd from '@/components/JsonLd';
import CareerTimeline from '@/components/CareerTimeline';
import { User, MapPin, Award, Music, Globe, type LucideIcon } from 'lucide-react';

const aboutDescriptions: Record<string, string> = {
  en: 'Alexandros Tsopozidis — Greek-Russian pop artist from Pontic Greek roots. 22M+ YouTube views, 310K followers. Available for weddings, christenings, corporate events & festivals worldwide.',
  ru: 'Александрос Цопозидис — греко-русский поп-артист понтийского происхождения. 22М+ просмотров YouTube, 310К подписчиков. Доступен для свадеб, крестин, корпоративов и фестивалей.',
  el: 'Αλέξανδρος Τσοποζίδης — Ελληνορώσος ποπ καλλιτέχνης ποντιακής καταγωγής. 22M+ YouTube views, 310K followers. Διαθέσιμος για γάμους, βαπτίσεις, εταιρικές εκδηλώσεις & φεστιβάλ.',
};

const musicArtistSchema = {
  '@context': 'https://schema.org',
  '@type': 'MusicArtist',
  name: 'Alexandros Tsopozidis',
  alternateName: ['Александрос Цопозидис', 'Αλέξανδρος Τσοποζίδης'],
  description: 'Greek-Caucasian singer blending Pontic Greek, Eastern and pop traditions. Known for Бродяга (22M+ YouTube views). Available for weddings, christenings, corporate events, birthdays, and festivals worldwide.',
  url: 'https://www.tsopozidis-alexandros.com',
  image: 'https://www.tsopozidis-alexandros.com/images/artist/portrait-balcony.jpg',
  birthPlace: { '@type': 'Place', name: 'Sameba (Guniakala), Georgia' },
  nationality: 'Greek',
  genre: ['Greek Pop', 'Eastern Music', 'Caucasian Music', 'Pontic Greek Music'],
  sameAs: [
    'https://open.spotify.com/artist/6PPuuN3cvmbyuvgrGbhXge',
    'https://music.apple.com/artist/alexandros-tsopozidis/839072119',
    'https://www.youtube.com/channel/UC_25lDUqfZLnjvWxzPHGNmg',
    'https://music.yandex.ru/artist/3050547',
    'https://www.instagram.com/alexandros_official/',
    'https://vk.com/alexandros_tsopozidis',
    'https://www.tiktok.com/@tsopozidis',
    'https://t.me/tsopozidis',
    'https://ok.ru/alexandros.tsopozidis',
    'https://www.facebook.com/alexandros.tsopozidis/',
    'https://ru.wikipedia.org/wiki/Тсопозидис,_Александрос',
    'https://www.wikidata.org/wiki/Q65126751',
  ],
  award: '9 Волна Award for Contribution to Ethnic Music (2014)',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return generatePageMetadata({
    locale,
    path: 'about',
    title: `${t('title')} — ${getArtistName(locale)}`,
    description: aboutDescriptions[locale] || aboutDescriptions.en,
    ogType: 'profile',
  });
}

function TimelineItem({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <ScrollReveal>
      <div className="relative pl-8 pb-12 border-l border-gold/20 last:border-0 last:pb-0">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-bg-secondary border border-gold/40 flex items-center justify-center">
          <Icon size={14} className="text-gold" />
        </div>
        <h3 className="font-display text-xl uppercase tracking-wider mb-4">{title}</h3>
        <div className="text-text-secondary font-sans font-light leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <>
      <JsonLd data={musicArtistSchema} />
      <JsonLd data={generateBreadcrumbSchema(locale, 'About', 'about')} />
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className="py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <TimelineItem icon={MapPin} title={t('origins_title')}>
            <p>{t('bio_paragraph_1')}</p>
            <p>{t('bio_paragraph_2')}</p>
          </TimelineItem>

          <TimelineItem icon={Music} title={t('football_title')}>
            <p>{t('bio_paragraph_3')}</p>
          </TimelineItem>

          <TimelineItem icon={Award} title={t('career_title')}>
            <p>{t('bio_paragraph_4')}</p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center py-4 bg-bg-secondary rounded-sm">
                <p className="font-display text-2xl text-gold">22M+</p>
                <p className="text-xs text-text-tertiary mt-1">{t('youtube_views')}</p>
              </div>
              <div className="text-center py-4 bg-bg-secondary rounded-sm">
                <p className="font-display text-2xl text-gold">310K</p>
                <p className="text-xs text-text-tertiary mt-1">{t('followers')}</p>
              </div>
              <div className="text-center py-4 bg-bg-secondary rounded-sm">
                <p className="font-display text-2xl text-gold">15+</p>
                <p className="text-xs text-text-tertiary mt-1">{t('years')}</p>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem icon={Globe} title={t('sound_title')}>
            <p>{t('bio_paragraph_5')}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {(['lang_russian', 'lang_greek', 'lang_pontic'] as const).map((langKey) => (
                <span key={langKey} className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full font-sans">
                  {t(langKey)}
                </span>
              ))}
            </div>
          </TimelineItem>

          <TimelineItem icon={User} title={t('today_title')}>
            <p>{t('today_text')}</p>
            <div className="mt-6">
              <GoldButton href="/contact" variant="outline">
                {t('book_artist')}
              </GoldButton>
            </div>
          </TimelineItem>
        </div>
      </section>

      <CareerTimeline />
    </>
  );
}
