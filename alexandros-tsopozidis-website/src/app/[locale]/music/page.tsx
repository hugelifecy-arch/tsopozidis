import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, getArtistName, generateBreadcrumbSchema } from '@/lib/seo';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeading from '@/components/common/SectionHeading';
import JsonLd from '@/components/JsonLd';
import AlbumCover from '@/components/AlbumCover';
import YouTubeFacade from '@/components/YouTubeFacade';
import StreamingEmbed from '@/components/music/StreamingEmbed';
import SinglesGrid from '@/components/music/SinglesGrid';
import PlatformLinks from '@/components/music/PlatformLinks';
import { album, singles } from '@/lib/data/discography';
import { socialLinks } from '@/lib/data/social-links';
import { videos } from '@/lib/data/videos';

const musicDescriptions: Record<string, string> = {
  en: 'Listen to Alexandros Tsopozidis — Mia Kardia, Soltera, Kavkaz, Бродяга and more on Spotify, Apple Music, Yandex Music, YouTube and Zvuk.',
  ru: 'Слушайте Александрос Цопозидис — Mia Kardia, Soltera, Кавказ, Бродяга на Spotify, Apple Music, Яндекс Музыка, YouTube и Звук.',
  el: 'Ακούστε Αλέξανδρος Τσοποζίδης — Mia Kardia, Soltera, Kavkaz, Бродяга σε Spotify, Apple Music, YouTube και άλλες πλατφόρμες.',
};

const musicRecordingsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'MusicRecording', name: 'Mia Kardia', datePublished: '2025', byArtist: { '@type': 'MusicArtist', name: 'Alexandros Tsopozidis' }, url: 'https://tsopozidis-alexandros.com/en/music' },
    { '@type': 'MusicRecording', name: 'Soltera', datePublished: '2025', byArtist: { '@type': 'MusicArtist', name: 'Alexandros Tsopozidis' }, contributor: { '@type': 'MusicArtist', name: 'El Pontios' } },
    { '@type': 'MusicRecording', name: 'Par shirkhani', datePublished: '2024', byArtist: { '@type': 'MusicArtist', name: 'Alexandros Tsopozidis' } },
    { '@type': 'MusicRecording', name: 'Kavkaz', datePublished: '2023', byArtist: { '@type': 'MusicArtist', name: 'Alexandros Tsopozidis' } },
    { '@type': 'MusicRecording', name: 'Я грек', datePublished: '2022', byArtist: { '@type': 'MusicArtist', name: 'Alexandros Tsopozidis' } },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'music' });
  return generatePageMetadata({
    locale,
    path: 'music',
    title: `${t('title')} — ${getArtistName(locale)}`,
    description: musicDescriptions[locale] || musicDescriptions.en,
  });
}

const streamingPlatforms = socialLinks.filter((l) =>
  ['spotify', 'apple-music', 'youtube', 'yandex-music', 'zvuk', 'deezer', 'amazon-music'].includes(l.platform)
);

export default function MusicPage() {
  const t = useTranslations('music');

  return (
    <>
      <JsonLd data={musicRecordingsSchema} />
      <JsonLd data={generateBreadcrumbSchema('en', 'Music', 'music')} />
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      {/* Stats Bar */}
      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto py-8 px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display text-2xl md:text-3xl text-gold">22M+</p>
              <p className="text-xs text-text-tertiary font-sans uppercase tracking-wider mt-1">YouTube {t('views_label')}</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl text-gold">310K</p>
              <p className="text-xs text-text-tertiary font-sans uppercase tracking-wider mt-1">Instagram</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl text-gold">10.4K</p>
              <p className="text-xs text-text-tertiary font-sans uppercase tracking-wider mt-1">Spotify {t('monthly')}</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl text-gold">{singles.length + 1}</p>
              <p className="text-xs text-text-tertiary font-sans uppercase tracking-wider mt-1">{t('releases_label')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Release */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeading title={t('latest_release')} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col md:flex-row gap-12 items-center max-w-4xl mx-auto">
              <AlbumCover src={singles[0].coverImage} title={singles[0].title} year={singles[0].year} size="lg" className="w-full md:w-[40%]" />
              <div className="w-full md:w-[60%]">
                <span className="text-xs tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full uppercase font-sans">
                  {singles[0].year}
                </span>
                <h3 className="font-display text-4xl mt-4">{singles[0].title}</h3>
                <p className="text-text-secondary font-sans font-light mt-4 leading-relaxed">
                  {t('latest_description')}
                </p>
                {/* Streaming Player */}
                <div className="mt-6">
                  <StreamingEmbed height={352} />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Album */}
      <section className="py-24 px-4 md:px-8 bg-bg-secondary">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeading title={t('album')} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col md:flex-row gap-12 items-center max-w-4xl mx-auto">
              <AlbumCover src={album.coverImage} title={album.title} year={album.year} size="lg" className="w-full md:w-[40%]" />
              <div className="w-full md:w-[60%]">
                <h3 className="font-display text-3xl">{album.title}</h3>
                <p className="font-serif text-text-secondary text-lg mt-1">{album.year} · {album.trackCount} {t('tracks')}</p>
                <div className="flex flex-wrap gap-3 mt-6">
                  {streamingPlatforms.map((p) => (
                    <a
                      key={p.platform}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gold/30 text-gold text-xs uppercase tracking-wider px-4 py-2 font-sans hover:bg-gold/10 transition-colors duration-300"
                    >
                      {p.label}
                    </a>
                  ))}
                </div>
                <div className="mt-6">
                  <StreamingEmbed
                    spotifyUri="track/1F1PGhdEb1MtMLbuGuxCR7"
                    height={152}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Music Video */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeading title={t('featured_video')} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="max-w-3xl mx-auto">
              <div className="rounded-sm overflow-hidden">
                <YouTubeFacade
                  videoId={videos[0].youtubeId}
                  title={videos[0].title}
                  views={videos[0].views}
                  quality="maxresdefault"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-lg">{videos[0].title}</p>
                  <p className="text-text-secondary text-sm font-sans">
                    {videos[0].year}
                    {videos[0].featuring && ` · feat. ${videos[0].featuring}`}
                    {videos[0].views && ` · ${videos[0].views} ${t('views_label')}`}
                  </p>
                </div>
                <a href="/videos" className="text-gold text-sm font-sans hover:text-gold-light transition-colors">
                  {t('all_videos')} →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Singles Grid (client component with year filter) */}
      <SinglesGrid />

      {/* Listen On */}
      <section className="py-24 px-4 md:px-8 bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <SectionHeading title={t('listen_on')} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <PlatformLinks />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
