import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../types';

/** Compact weekend / smaller builds — before the big gradient strip. */
export const WeekendRow: React.FC<{
  items: Project[];
  onSelect: (p: Project) => void;
}> = ({ items, onSelect }) => {
  return (
    <section className="mx-auto max-w-5xl px-5 py-14 md:px-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
        Smaller builds
      </p>
      <h2 className="mt-2 font-display text-xl font-medium tracking-tight text-stone-900 md:text-2xl">
        Weekend & prototypes
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <motion.button
            type="button"
            key={p.title}
            onClick={() => onSelect(p)}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            whileHover={{ y: -2 }}
            className="rounded-2xl bg-white/70 p-5 text-left shadow-[0_1px_0_rgba(28,25,23,0.06)] ring-1 ring-stone-200/60 transition hover:shadow-md"
          >
            <h3 className="text-sm font-medium text-stone-900">{p.title}</h3>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-stone-400">
              {p.category}
            </p>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600">
              {p.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1">
              {p.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] text-stone-500"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
};
