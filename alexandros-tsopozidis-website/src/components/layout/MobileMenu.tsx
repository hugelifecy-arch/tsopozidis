'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import SocialIcons from '@/components/common/SocialIcons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = ['home', 'about', 'music', 'videos', 'gallery', 'events', 'press', 'contact'] as const;
const navPaths: Record<string, string> = {
  home: '/',
  about: '/about',
  music: '/music',
  videos: '/videos',
  gallery: '/gallery',
  events: '/events',
  press: '/press',
  contact: '/contact',
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('nav');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-bg-primary/95 backdrop-blur-lg flex flex-col"
        >
          <div className="flex justify-end p-6">
            <button onClick={onClose} className="text-gold">
              <X size={28} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item}
                href={navPaths[item]}
                onClick={onClose}
                className="font-display text-2xl tracking-wider uppercase text-text-primary hover:text-gold transition-colors duration-300"
              >
                {t(item)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-6 pb-12">
            <LanguageSwitcher />
            <SocialIcons size="md" />
            <a href="tel:+79383163034" className="text-text-secondary text-sm font-sans">
              +7 938 316 30 34
            </a>
            <div className="flex gap-4">
              <a
                href="https://wa.me/79383163034"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold text-xs font-display uppercase tracking-wider hover:text-gold-light transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="https://t.me/TsopozidisPr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold text-xs font-display uppercase tracking-wider hover:text-gold-light transition-colors"
              >
                Telegram
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
