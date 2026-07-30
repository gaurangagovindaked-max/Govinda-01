import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import type { StripCard } from '../types';
import type { Project } from '../types';
import { RibbonField, ribbonFieldCss } from './RibbonField';

export const HorizontalWorkStrip: React.FC<{
  cards: StripCard[];
  onSelect: (p: Project) => void;
}> = ({ cards, onSelect }) => {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section
      id="work-strip"
      className="relative -mx-4 mb-20 md:-mx-8"
      aria-label="Selected work, horizontal"
    >
      <div className="mb-5 flex items-end justify-between px-4 md:px-8">
        <div>
          <h2 className="text-sm font-medium tracking-wide text-stone-800">Selected surfaces</h2>
          <p className="mt-1 text-xs text-stone-500">Scroll sideways · open a card for a live preview</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="rounded-full border border-stone-300/80 bg-white/80 px-3 py-1 text-xs text-stone-600 hover:bg-white"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="rounded-full border border-stone-300/80 bg-white/80 px-3 py-1 text-xs text-stone-600 hover:bg-white"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scroll-smooth md:px-8"
        style={{ scrollbarWidth: 'thin' }}
      >
        {cards.map((card, i) => (
          <motion.button
            type="button"
            key={card.title + i}
            onClick={() => {
              if (card.project) onSelect(card.project);
              else if (card.link) window.open(card.link, '_blank', 'noopener,noreferrer');
            }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className="group relative h-[220px] w-[min(280px,78vw)] flex-shrink-0 snap-start overflow-hidden rounded-md border border-white/25 text-left shadow-[0_12px_40px_-20px_rgba(15,23,42,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1839A7]/40"
          >
            {/* Ribbon Field: canvas wave + CSS fallback underlay */}
            <div className="absolute inset-0" style={ribbonFieldCss} />
            <RibbonField className="opacity-90" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-end p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                {card.category}
              </span>
              <h3 className="mt-1 text-base font-medium tracking-tight text-white">{card.title}</h3>
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/85">
                {card.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
};
