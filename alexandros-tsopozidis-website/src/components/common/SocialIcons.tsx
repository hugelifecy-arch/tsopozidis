import { Instagram, Facebook, Youtube, Music, type LucideIcon } from 'lucide-react';
import { socialLinks } from '@/lib/data/social-links';

interface SocialIconsProps {
  size?: 'sm' | 'md' | 'lg';
  platforms?: string[];
}

const sizeMap = { sm: 16, md: 20, lg: 24 };

const iconMap: Record<string, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  spotify: Music,
};

export default function SocialIcons({ size = 'md', platforms }: SocialIconsProps) {
  const filtered = platforms
    ? socialLinks.filter((l) => platforms.includes(l.platform))
    : socialLinks.filter((l) => ['instagram', 'facebook', 'youtube', 'spotify', 'tiktok', 'vk'].includes(l.platform));

  return (
    <div className="flex items-center gap-4">
      {filtered.map((link) => {
        const Icon = iconMap[link.platform];
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-text-secondary hover:text-gold transition-colors duration-300"
          >
            {Icon ? (
              <Icon size={sizeMap[size]} />
            ) : (
              <span className="text-xs uppercase tracking-wider font-sans" style={{ fontSize: sizeMap[size] * 0.6 }}>
                {link.platform === 'tiktok' ? 'TT' : link.platform === 'vk' ? 'VK' : link.label.substring(0, 2).toUpperCase()}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
