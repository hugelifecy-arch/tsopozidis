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
                className="text-sm text-text-secondary hover:text-gold transition-colors duration-300 font-sans"
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
