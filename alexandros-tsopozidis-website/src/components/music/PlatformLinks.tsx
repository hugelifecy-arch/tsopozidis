import { socialLinks } from '@/lib/data/social-links';

const platformIcons: Record<string, { icon: string; color: string }> = {
  spotify: { icon: '🎵', color: '#1DB954' },
  'apple-music': { icon: '🎵', color: '#FC3C44' },
  'yandex-music': { icon: '🎵', color: '#FFCC00' },
  youtube: { icon: '▶️', color: '#FF0000' },
  zvuk: { icon: '🎵', color: '#7C3AED' },
  deezer: { icon: '🎵', color: '#00C7F2' },
  'amazon-music': { icon: '🎵', color: '#25D1DA' },
  soundcloud: { icon: '🎵', color: '#FF7700' },
};

const streamingPlatformIds = ['spotify', 'apple-music', 'youtube', 'yandex-music', 'zvuk', 'deezer', 'amazon-music', 'soundcloud'];

export default function PlatformLinks() {
  const platforms = socialLinks.filter(l => streamingPlatformIds.includes(l.platform));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {platforms.map(p => {
        const meta = platformIcons[p.platform];
        return (
          <a
            key={p.platform}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 bg-bg-tertiary/50 border border-border hover:border-gold/30 rounded-sm p-6 transition-all duration-300 hover:bg-gold/5"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: `${meta?.color}15` }}
            >
              {meta?.icon || '🎵'}
            </div>
            <span className="text-xs font-sans uppercase tracking-wider text-text-secondary group-hover:text-gold transition-colors">
              {p.label}
            </span>
            {p.followers && (
              <span className="text-[10px] text-text-tertiary font-sans">
                {p.followers}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
