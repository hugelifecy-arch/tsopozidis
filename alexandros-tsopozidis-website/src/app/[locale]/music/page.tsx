import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
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
import { album, singles, getSpotifyEmbedUrl } from '@/lib/data/discography';
import { socialLinks } from '@/lib/data/social-links';
import { videos } from '@/lib/data/videos';

const musicDescriptions: Record<string, string> = {
  en: 'Listen to Alexandros Tsopozidis — Канитель, Mia Kardia, Soltera, Kavkaz, Бродяга and more on Spotify, Apple Music, Yandex Music, YouTube and Zvuk.',
  ru: 'Слушайте Александрос Цопозидис — Канитель, Mia Kardia, Soltera, Кавказ, Бродяга на Spotify, Apple Music, Яндекс Музыка, YouTube и Звук.',
  el: 'Ακούστε Αλέξανδρος Τσοποζίδης — Канитель, Mia Kardia, Soltera, Kavkaz, Бродяга σε Spotify, Apple Music, YouTube και άλλες πλατφόρμες.',
};

const musicRecordingsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'MusicRecording', name: 'Канитель', datePublished: '2026', byArtist: { '@type': 'MusicArtist', name: 'Alexandros Tsopozidis' }, url: 'https://tsopozidis-alexandros.com/en/music' },
    { '@type': 'MusicRecording', name: 'Mia Kardia', datePublished: '2025', byArtist: { '@type': 'MusicArtist', name: 'Alexandros Tsopozidis' } },
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
  const locale = useLocale();
  const latest = singles[0];
  const latestEmbedUrl = getSpotifyEmbedUrl(latest);

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

      {/* Latest Release — Канитель */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeading title={t('latest_release')} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col md:flex-row gap-12 items-center max-w-4xl mx-auto">
              <AlbumCover
                src={latest.coverImage}
                spotifyCoverUrl={latest.spotifyCoverUrl}
                title={latest.title}
                year={latest.year}
                size="lg"
                className="w-full md:w-[40%]"
              />
              <div className="w-full md:w-[60%]">
                <span className="text-xs tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full uppercase font-sans">
                  {latest.year}
                </span>
                <h3 className="font-display text-4xl mt-4">{latest.title}</h3>
                {latest.featuring && (
                  <p className="font-serif text-text-secondary text-lg mt-1">
                    {t('featuring')} {latest.featuring}
                  </p>
                )}
                <p className="text-text-secondary font-sans font-light mt-4 leading-relaxed">
                  {latest.description[locale as keyof typeof latest.description] || latest.description.en}
                </p>
                {latest.credits && (
                  <p className="text-text-tertiary text-xs font-sans mt-2">{latest.credits}</p>
                )}
                {/* Streaming Player */}
                {latestEmbedUrl && (
                  <div className="mt-6">
                    <StreamingEmbed
                      spotifyUri={latestEmbedUrl.replace('https://open.spotify.com/embed/', '')}
                      height={152}
                    />
                  </div>
                )}
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
              <AlbumCover
                src={album.coverImage}
                spotifyCoverUrl={album.spotifyCoverUrl}
                title={album.title}
                year={album.year}
                size="lg"
                className="w-full md:w-[40%]"
              />
              <div className="w-full md:w-[60%]">
                <h3 className="font-display text-3xl">{album.title}</h3>
                <p className="font-serif text-text-secondary text-lg mt-1">{album.year} · {album.trackCount} {t('tracks')}</p>
                <p className="text-text-secondary font-sans font-light mt-4 leading-relaxed">
                  {album.description[locale as keyof typeof album.description] || album.description.en}
                </p>
                {album.credits && (
                  <p className="text-text-tertiary text-xs font-sans mt-2">{album.credits}</p>
                )}
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
                    spotifyUri={`album/${album.spotifyAlbumId}`}
                    height={152}
                  />
                </div>
                <p className="text-text-tertiary text-xs font-sans mt-6">
                  {t('available_live')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured On */}
      <section className="py-16 px-4 md:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeading title={t('featured_on')} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Бродяга */}
              <a href="https://open.spotify.com/track/4wrHLDr6rgVFnzldOYp37t" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-bg-tertiary/50 border border-border hover:border-gold/30 rounded-sm p-4 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 relative">
                  <Image src="https://i.scdn.co/image/ab67616d00004851f57422e4fe7802226d1e613f" alt="Бродяга" fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <p className="font-sans font-medium group-hover:text-gold transition-colors">Бродяга</p>
                  <p className="text-xs text-text-secondary font-sans">Elbrus Dzhanmirzoev ft. Alexandros</p>
                  <p className="text-[10px] text-text-tertiary font-sans mt-1">551K+ plays · 22M+ YouTube views</p>
                </div>
              </a>

              {/* Ты все потеряла */}
              <a href="https://open.spotify.com/track/4XYmHQMmFOFw7NaOINtmtb" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-bg-tertiary/50 border border-border hover:border-gold/30 rounded-sm p-4 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 relative">
                  <Image src="https://i.scdn.co/image/ab67616d00004851f57422e4fe7802226d1e613f" alt="Ты все потеряла" fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <p className="font-sans font-medium group-hover:text-gold transition-colors">Ты все потеряла</p>
                  <p className="text-xs text-text-secondary font-sans">Elbrus Dzhanmirzoev ft. Alexandros</p>
                  <p className="text-[10px] text-text-tertiary font-sans mt-1">551K+ plays · #1 most-played track</p>
                </div>
              </a>
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
