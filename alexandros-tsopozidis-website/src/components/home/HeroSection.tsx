'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function HeroSection() {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-[100px] -bottom-[100px]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero/hero-main.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Top decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="h-[1px] gold-line mx-auto mb-8"
        />

        {/* First name */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="font-serif font-light text-lg sm:text-xl md:text-2xl tracking-[0.5em] text-gold/70"
        >
          ALEXANDROS
        </motion.p>

        {/* Last name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.1em] text-gold-gradient mt-2"
        >
          TSOPOZIDIS
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease }}
          className="font-serif italic text-base text-text-secondary tracking-[0.3em] lowercase mt-4"
        >
          {t('tagline')}
        </motion.p>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1, delay: 1.4, ease }}
          className="h-[1px] gold-line mx-auto mt-8"
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Link
            href="/music"
            className="border border-gold text-gold px-8 py-3 text-sm font-display uppercase tracking-wider hover:bg-gold hover:text-bg-primary transition-all duration-300"
          >
            {t('cta_listen')}
          </Link>
          <a
            href="https://wa.me/79383163034"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-bg-primary px-8 py-3 text-sm font-display uppercase tracking-wider hover:bg-gold-light transition-all duration-300"
          >
            {t('cta_booking')}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-tertiary text-[10px] uppercase tracking-widest font-sans">
          {tCommon('scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={16} className="text-gold/50" />
        </motion.div>
      </motion.div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] gold-line-subtle" />
    </section>
  );
}
