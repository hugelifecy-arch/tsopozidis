'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import SocialIcons from '@/components/common/SocialIcons';
import { navItems, navPaths } from '@/config/nav';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Build-time translation key manifest for nav items. If navItems changes,
// TypeScript will fail at next-intl generated types — intentional.
const navKeyMap: Record<string, string> = {
  home: 'home',
  about: 'about',
  music: 'music',
  videos: 'videos',
  events: 'events',
  gallery: 'gallery',
  press: 'press',
  contact: 'contact',
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('nav');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // Scroll lock on <html>/<body> while open, restore on close/unmount.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Focus management: remember the previously focused element, move focus into
  // the dialog on open, and restore focus to trigger on close.
  useEffect(() => {
    if (!isOpen) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    // Next tick so the Framer Motion transform is applied first.
    const id = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      window.clearTimeout(id);
      lastFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  // Escape to close + simple focus trap (Tab / Shift+Tab cycles inside dialog).
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !containerRef.current) return;
      const focusables = containerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t('open_menu')}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-bg-primary/95 backdrop-blur-lg flex flex-col"
        >
          <div className="flex justify-end p-6">
            <button
              ref={closeBtnRef}
              onClick={onClose}
              type="button"
              className="min-w-[48px] min-h-[48px] flex items-center justify-center text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
              aria-label={t('close_menu')}
            >
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
                {t(navKeyMap[item] ?? item)}
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
                className="min-h-[48px] flex items-center text-gold text-xs font-display uppercase tracking-wider hover:text-gold-light transition-colors px-3"
              >
                WhatsApp
              </a>
              <a
                href="https://t.me/TsopozidisPr"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] flex items-center text-gold text-xs font-display uppercase tracking-wider hover:text-gold-light transition-colors px-3"
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
