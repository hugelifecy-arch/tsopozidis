'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

const offsets = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  // 'ssr' = initial server/hydration render (content visible for SEO)
  // 'animate' = below-fold element, apply scroll animation
  // 'visible' = above-fold element, already in viewport — skip animation
  const [state, setState] = useState<'ssr' | 'animate' | 'visible'>('ssr');

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      setState(inViewport ? 'visible' : 'animate');
    } else {
      setState('animate');
    }
  }, []);

  // SSR + hydration: render visible content so search engines see it
  // Above-fold elements: stay visible without animation
  if (state === 'ssr' || state === 'visible') {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // Below-fold elements: animate in on scroll
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
