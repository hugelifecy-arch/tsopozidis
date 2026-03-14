import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import SocialIcons from '@/components/common/SocialIcons';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const quickLinks = [
    { label: tNav('about'), href: '/about' },
    { label: tNav('music'), href: '/music' },
    { label: tNav('videos'), href: '/videos' },
    { label: tNav('events'), href: '/events' },
    { label: tNav('press'), href: '/press' },
    { label: tNav('contact'), href: '/contact' },
  ];

  return (
    <footer className="bg-bg-secondary border-t border-border">
      {/* Top Section */}
      <div className="max-w-container mx-auto py-16 px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <h3 className="font-display text-xl tracking-wider uppercase text-text-primary">
            Alexandros Tsopozidis
          </h3>
          <p className="mt-2 font-serif italic text-text-secondary">
            {t('tagline')}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <nav className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-gold transition-colors duration-300 font-sans py-2 inline-block"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-sm uppercase tracking-wider text-text-primary mb-4 font-sans">
            {t('follow')}
          </h4>
          <SocialIcons size="md" />
        </div>
      </div>

      {/* Telegram CTA */}
      <div className="max-w-container mx-auto px-4 md:px-8 pb-8">
        <div className="text-center">
          <p className="text-text-secondary text-sm font-sans mb-4">
            {t('telegram_cta')}
          </p>
          <a
            href="https://t.me/tsopozidis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold/30 text-gold px-6 py-3 min-h-[48px] text-xs font-display uppercase tracking-wider hover:bg-gold/10 transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            Telegram
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-container mx-auto px-8">
        <div className="h-[1px] gold-line-subtle" />
      </div>

      {/* Bottom */}
      <div className="max-w-container mx-auto py-6 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-text-tertiary text-xs font-sans tracking-wide">
        <span>{t('copyright')}</span>
        <span>{t('booking_phone')}</span>
      </div>
    </footer>
  );
}
