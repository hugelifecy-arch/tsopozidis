'use client';

import { useState, type ReactNode } from 'react';
import ScrollReveal from '@/components/common/ScrollReveal';

interface EventsTabsProps {
  upcomingLabel: string;
  pastLabel: string;
  upcomingContent: ReactNode;
  pastContent: ReactNode;
}

export default function EventsTabs({ upcomingLabel, pastLabel, upcomingContent, pastContent }: EventsTabsProps) {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <>
      <ScrollReveal>
        <div className="flex justify-center gap-8 mb-16">
          {(['upcoming', 'past'] as const).map((tab_) => (
            <button
              key={tab_}
              onClick={() => setTab(tab_)}
              className={`text-sm font-sans uppercase tracking-wider py-3 px-2 min-h-[48px] transition-all duration-300 ${
                tab === tab_
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab_ === 'upcoming' ? upcomingLabel : pastLabel}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {tab === 'upcoming' && upcomingContent}
      {tab === 'past' && pastContent}
    </>
  );
}
