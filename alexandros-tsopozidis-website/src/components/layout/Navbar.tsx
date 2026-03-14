'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

const navItems = ['home', 'about', 'music', 'videos', 'gallery', 'events', 'press'] as const;
const navPaths: Record<string, string> = {
  home: '/',
  about: '/about',
  music: '/music',
  videos: '/videos',
  gallery: '/gallery',
  events: '/events',
  press: '/press',
};

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass' : 'bg-transparent'
        }`}
      >
        <div className="max-w-container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="font-display text-gold text-sm tracking-[0.2em] uppercase">
              Alexandros
            </span>
            <span className="font-serif italic text-text-secondary text-xs tracking-[0.15em]">
              Tsopozidis
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const path = navPaths[item];
              const isActive = pathname === path || (item === 'home' && pathname === '/');
              return (
                <Link
                  key={item}
                  href={path}
                  className={`relative font-sans text-sm font-light uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-gold' : 'text-text-primary hover:text-gold'
                  }`}
                >
                  {t(item)}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-6">
            <LanguageSwitcher />
            <a
              href="https://wa.me/79383163034"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold text-gold px-5 py-2 text-xs font-display uppercase tracking-wider hover:bg-gold hover:text-bg-primary transition-all duration-300"
            >
              {t('booking')}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-text-primary hover:text-gold transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
