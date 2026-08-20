import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RESUME } from '../constants';

/**
 * ResearchSurface — ONE sticky-rail layout wrapping Ent AND the papers.
 *
 * EntSection renders the Ent content column; ResearchFirst renders the
 * papers column; both live inside THIS wrapper so the shared sidebar rail
 * spans the whole surface (the fix for the rail dying at Ent's end).
 * Content components are layout-agnostic: they render plain column divs.
 */

type NavItem = { id: string; label: string };
type NavGroup = { title: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    title: 'Ent — pooled inference',
    items: [
      { id: 'ent-overview', label: 'Overview' },
      { id: 'ent-gold', label: 'The next gold' },
      { id: 'ent-problem', label: 'The problem' },
      { id: 'ent-trial', label: 'The trial' },
      { id: 'ent-figures', label: 'Figures' },
      { id: 'ent-claim', label: 'What’s new' },
      { id: 'ent-limits', label: 'Limits' },
    ],
  },
  {
    title: 'Papers',
    items: [
      { id: 'research-wsr', label: 'Working-Set Routing' },
      { id: 'research-figures', label: 'T4 figures' },
      { id: 'research-aether', label: 'AETHER' },
    ],
  },
];

const FLAT: NavItem[] = NAV.flatMap((g) => g.items);

export const ResearchSurface: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [active, setActive] = useState<string>(FLAT[0].id);

  useEffect(() => {
    const onScroll = () => {
      const marker = 140;
      let current = FLAT[0].id;
      for (const n of FLAT) {
        const el = document.getElementById(n.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - marker <= 0) current = n.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="research"
      aria-label="Research — Ent and papers"
      className="relative border-y border-stone-200/70 bg-[#FAF8F5]"
    >
      <div className="mx-auto flex w-full max-w-5xl items-stretch">
        <aside className="hidden w-40 flex-shrink-0 self-stretch md:block lg:w-44">
          <div className="sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto py-14 pl-4 pr-2 lg:pl-5">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">
              Research
            </p>
            <nav className="relative flex flex-col border-l border-stone-300/90">
              {NAV.map((group) => (
                <div key={group.title} className="mb-3">
                  <p className="py-1.5 pl-4 font-mono text-[9.5px] uppercase tracking-[0.16em] text-stone-400">
                    {group.title}
                  </p>
                  {group.items.map((n) => {
                    const on = active === n.id;
                    return (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => scrollTo(n.id)}
                        className="relative py-2 pl-4 text-left text-[13px] transition-colors duration-200"
                      >
                        <span
                          className={`absolute left-[-1px] top-2 bottom-2 w-[2px] rounded-full transition-colors duration-200 ${
                            on ? 'bg-stone-900' : 'bg-transparent'
                          }`}
                          aria-hidden
                        />
                        <span
                          className={
                            on
                              ? 'font-medium text-stone-900'
                              : 'text-stone-500 hover:text-stone-800'
                          }
                        >
                          {n.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>
        </aside>
        <div className="min-w-0 w-full flex-1">{children}</div>
      </div>
    </section>
  );
};
