'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import ScrollReveal from '@/components/common/ScrollReveal';

interface EventsTabsProps {
  upcomingLabel: string;
  pastLabel: string;
  upcomingContent: ReactNode;
  pastContent: ReactNode;
  /**
   * When true, default to the "past" tab on mount. Used when there are no
   * confirmed upcoming events so visitors see the past tour archive instead
   * of an empty state.
   */
  defaultToPast?: boolean;
}

type TabId = 'upcoming' | 'past';

export default function EventsTabs({
  upcomingLabel,
  pastLabel,
  upcomingContent,
  pastContent,
  defaultToPast = false,
}: EventsTabsProps) {
  const [tab, setTab] = useState<TabId>(defaultToPast ? 'past' : 'upcoming');
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    upcoming: null,
    past: null,
  });

  useEffect(() => {
    if (defaultToPast) setTab('past');
  }, [defaultToPast]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, current: TabId) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Home' && e.key !== 'End') {
      return;
    }
    e.preventDefault();
    const order: TabId[] = ['upcoming', 'past'];
    let idx = order.indexOf(current);
    if (e.key === 'ArrowRight') idx = (idx + 1) % order.length;
    else if (e.key === 'ArrowLeft') idx = (idx - 1 + order.length) % order.length;
    else if (e.key === 'Home') idx = 0;
    else if (e.key === 'End') idx = order.length - 1;
    const next = order[idx];
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <ScrollReveal>
        <div
          role="tablist"
          aria-label={`${upcomingLabel} / ${pastLabel}`}
          className="flex justify-center gap-8 mb-16"
        >
          {(['upcoming', 'past'] as const).map((tab_) => {
            const selected = tab === tab_;
            return (
              <button
                key={tab_}
                ref={(el) => {
                  tabRefs.current[tab_] = el;
                }}
                id={`events-tab-${tab_}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`events-panel-${tab_}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setTab(tab_)}
                onKeyDown={(e) => handleKeyDown(e, tab_)}
                className={`text-sm font-sans uppercase tracking-wider py-3 px-2 min-h-[48px] transition-all duration-300 ${
                  selected
                    ? 'text-gold border-b-2 border-gold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab_ === 'upcoming' ? upcomingLabel : pastLabel}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      <div
        id="events-panel-upcoming"
        role="tabpanel"
        aria-labelledby="events-tab-upcoming"
        hidden={tab !== 'upcoming'}
      >
        {tab === 'upcoming' && upcomingContent}
      </div>
      <div
        id="events-panel-past"
        role="tabpanel"
        aria-labelledby="events-tab-past"
        hidden={tab !== 'past'}
      >
        {tab === 'past' && pastContent}
      </div>
    </>
  );
}
