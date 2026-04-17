'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeading from '@/components/common/SectionHeading';
import AlbumCover from '@/components/AlbumCover';
import Waveform from '@/components/music/Waveform';
import { singles, getSpotifyEmbedUrl, getDisplayTitle } from '@/lib/data/discography';

const years = Array.from(new Set(singles.map(s => s.year))).sort((a, b) => b - a);

export default function SinglesGrid() {
  const t = useTranslations('music');
  const locale = useLocale();
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all');

  const filtered = yearFilter === 'all'
    ? singles
    : singles.filter(s => s.year === yearFilter);

  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading title={`${t('full_discography')} — ${t('singles')}`} />
        </ScrollReveal>

        {/* Year Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setYearFilter('all')}
            className={`px-4 py-2 text-xs font-sans uppercase tracking-wider rounded-full transition-all duration-300 ${
              yearFilter === 'all'
                ? 'bg-gold/15 text-gold border border-gold/30'
                : 'text-text-secondary hover:text-text-primary border border-transparent'
            }`}
          >
            {t('all_years')}
          </button>
          {years.map(year => (
            <button
              key={year}
              onClick={() => setYearFilter(year)}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-wider rounded-full transition-all duration-300 ${
                yearFilter === year
                  ? 'bg-gold/15 text-gold border border-gold/30'
                  : 'text-text-secondary hover:text-text-primary border border-transparent'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((single, i) => {
            const embedUrl = getSpotifyEmbedUrl(single);
            const desc = single.description[locale as keyof typeof single.description] || single.description.en;

            return (
              <ScrollReveal key={single.id} delay={i * 0.05}>
                <div className="group bg-bg-secondary rounded-sm border border-border hover:border-gold/30 transition-all duration-300 overflow-hidden">
                  {/* Artwork with play overlay */}
                  <div className="relative">
                    <AlbumCover
                      src={single.coverImage}
                      spotifyCoverUrl={single.spotifyCoverUrl}
                      title={single.title}
                      year={single.year}
                      size="sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute top-3 right-3 text-xs bg-bg-primary/80 text-gold px-2 py-1 rounded font-sans">
                      {single.year}
                    </span>

                    {/* Play count badge */}
                    {single.plays && (
                      <span className="absolute top-3 left-3 text-[10px] bg-bg-primary/80 text-text-secondary px-2 py-1 rounded font-sans">
                        {single.plays} {t('plays_suffix')}
                      </span>
                    )}

                    {/* Play button overlay */}
                    {embedUrl && (
                      <a
                        href={embedUrl.replace('/embed/', '/')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label={`Play ${single.title}`}
                      >
                        <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center shadow-lg hover:bg-gold transition-colors">
                          <svg viewBox="0 0 24 24" fill="#0A0A0A" className="w-6 h-6 ml-0.5">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </a>
                    )}
                    {!embedUrl && single.youtubeId && (
                      <a
                        href={`https://www.youtube.com/watch?v=${single.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label={`Play ${single.title}`}
                      >
                        <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center shadow-lg hover:bg-gold transition-colors">
                          <svg viewBox="0 0 24 24" fill="#0A0A0A" className="w-6 h-6 ml-0.5">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </a>
                    )}
                  </div>

                  {/* Waveform */}
                  <Waveform seed={single.id} className="px-4 pt-3" />

                  {/* Info */}
                  <div className="p-4 pt-2">
                    <p className="font-sans font-medium truncate">{getDisplayTitle(single, locale)}</p>
                    {single.featuring && (
                      <p className="text-xs text-text-secondary font-sans mt-1">
                        {t('featuring')} {single.featuring}
                      </p>
                    )}

                    {/* Language tags */}
                    {single.language && (
                      <div className="flex gap-1.5 mt-2">
                        {single.language.map(lang => (
                          <span key={lang} className="text-[10px] bg-gold/5 text-gold/60 px-1.5 py-0.5 rounded font-sans uppercase">
                            {lang}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-text-secondary font-sans text-xs mt-3 leading-relaxed line-clamp-3">
                      {desc}
                    </p>

                    {/* Credits */}
                    {single.credits && (
                      <p className="text-text-tertiary text-[10px] font-sans mt-2">{single.credits}</p>
                    )}

                    {/* Quick streaming links */}
                    <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                      {single.spotifyAlbumId && (
                        <a href={`https://open.spotify.com/album/${single.spotifyAlbumId}`} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] text-text-tertiary hover:text-gold transition-colors font-sans uppercase tracking-wider">
                          Spotify
                        </a>
                      )}
                      {single.spotifyTrackId && !single.spotifyAlbumId && (
                        <a href={`https://open.spotify.com/track/${single.spotifyTrackId}`} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] text-text-tertiary hover:text-gold transition-colors font-sans uppercase tracking-wider">
                          Spotify
                        </a>
                      )}
                      {single.youtubeId && (
                        <a href={`https://www.youtube.com/watch?v=${single.youtubeId}`} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] text-text-tertiary hover:text-gold transition-colors font-sans uppercase tracking-wider">
                          YouTube
                        </a>
                      )}
                      {!single.spotifyAlbumId && !single.spotifyTrackId && !single.youtubeId && (
                        <span className="text-[10px] text-text-tertiary/50 font-sans uppercase tracking-wider">
                          {t('coming_soon_label')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Booking CTA */}
                  <div className="px-4 pb-4 pt-2 border-t border-border/30">
                    <Link
                      href="/contact"
                      className="text-[10px] text-gold/50 hover:text-gold font-sans uppercase tracking-wider transition-colors"
                    >
                      {t('book_this_live')} →
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-text-tertiary font-serif italic py-12">
            {t('no_releases_year')}
          </p>
        )}
      </div>
    </section>
  );
}
