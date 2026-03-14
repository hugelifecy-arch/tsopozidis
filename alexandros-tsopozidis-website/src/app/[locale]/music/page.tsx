import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, getArtistName } from '@/lib/seo';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeading from '@/components/common/SectionHeading';
import JsonLd from '@/components/JsonLd';
import AlbumCover from '@/components/AlbumCover';
import { album, singles } from '@/lib/data/discography';
import { socialLinks } from '@/lib/data/social-links';

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
      <PageHero title={t('title')} subtitle={t('subtitle')} />

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
                  2025
                </span>
                <h3 className="font-display text-4xl mt-4">Mia Kardia</h3>
                <p className="text-text-secondary font-sans font-light mt-4 leading-relaxed">
                  {t('latest_description')}
                </p>
                {/* Spotify Player */}
                <div className="mt-6">
                  <iframe
                    src="https://open.spotify.com/embed/artist/6PPuuN3cvmbyuvgrGbhXge?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                    title="Spotify Player — Alexandros Tsopozidis"
                  />
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
                  <iframe
                    src="https://open.spotify.com/embed/artist/6PPuuN3cvmbyuvgrGbhXge?utm_source=generator&theme=0"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                    title="Spotify Player — За тобой"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Singles Grid */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeading title={`${t('full_discography')} — ${t('singles')}`} />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {singles.map((single, i) => (
              <ScrollReveal key={single.id} delay={i * 0.05}>
                <div className="group bg-bg-secondary rounded-sm border border-border hover:border-gold/30 transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <AlbumCover src={single.coverImage} title={single.title} year={single.year} size="sm" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute top-3 right-3 text-xs bg-bg-primary/80 text-gold px-2 py-1 rounded font-sans">
                      {single.year}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="font-sans font-medium truncate">{single.title}</p>
                    {single.featuring && (
                      <p className="text-xs text-text-secondary font-sans mt-1">
                        {t('featuring')} {single.featuring}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Listen On */}
      <section className="py-24 px-4 md:px-8 bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <SectionHeading title={t('listen_on')} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              {streamingPlatforms.map((p) => (
                <a
                  key={p.platform}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gold/30 text-gold px-8 py-4 text-sm font-display uppercase tracking-wider hover:bg-gold hover:text-bg-primary transition-all duration-300"
                >
                  {p.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
