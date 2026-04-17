'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative pt-32 pb-20 px-4 md:px-8 bg-bg-secondary overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {mounted && !reducedMotion ? (
          <>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-[1px] gold-line mx-auto mb-6"
            />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-5xl uppercase tracking-wider"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-4 font-serif italic text-text-secondary text-lg"
              >
                {subtitle}
              </motion.p>
            )}
          </>
        ) : (
          <>
            <div className="h-[1px] gold-line mx-auto mb-6" style={{ width: 60 }} />
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 font-serif italic text-text-secondary text-lg">
                {subtitle}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
