'use client';

import { useLocale } from 'next-intl';

interface StreamingEmbedProps {
  spotifyUri?: string;
  yandexArtistId?: string;
  height?: number;
  className?: string;
}

export default function StreamingEmbed({
  spotifyUri = 'artist/6PPuuN3cvmbyuvgrGbhXge',
  yandexArtistId = '3050547',
  height = 352,
  className = '',
}: StreamingEmbedProps) {
  const locale = useLocale();

  if (locale === 'ru' && yandexArtistId) {
    return (
      <div className={className}>
        <iframe
          src={`https://music.yandex.ru/iframe/artist/${yandexArtistId}`}
          width="100%"
          height={height}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          loading="lazy"
          className="rounded-lg"
          title="Yandex Music Player"
          style={{ border: 'none', borderRadius: '12px' }}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <iframe
        src={`https://open.spotify.com/embed/${spotifyUri}?utm_source=generator&theme=0`}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-lg"
        title="Spotify Player"
      />
    </div>
  );
}
