'use client';

interface StreamingEmbedProps {
  spotifyUri?: string;
  height?: number;
  className?: string;
}

export default function StreamingEmbed({
  spotifyUri = 'artist/6PPuuN3cvmbyuvgrGbhXge',
  height = 352,
  className = '',
}: StreamingEmbedProps) {
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
