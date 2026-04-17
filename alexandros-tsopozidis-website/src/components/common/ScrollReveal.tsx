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
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // SSR and first client render: plain div so content is always visible
  // (prevents flash-to-invisible if framer-motion / IntersectionObserver stalls).
  if (!hydrated) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // After hydration: add a subtle slide-in when the element enters the viewport.
  // Content stays fully visible (opacity always 1) — only the translate animates.
  return (
    <motion.div
      ref={ref}
      initial={offsets[direction]}
      animate={isInView ? { x: 0, y: 0 } : offsets[direction]}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
