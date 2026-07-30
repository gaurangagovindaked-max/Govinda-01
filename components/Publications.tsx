import React from 'react';
import { motion } from 'framer-motion';
import type { Publication } from '../types';

export const Publications: React.FC<{ items: Publication[] }> = ({ items }) => {
  return (
    <div className="flex flex-col gap-8">
      {items.map((p, i) => (
        <motion.article
          key={p.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="group grid gap-2 border-b border-stone-200/80 pb-8 last:border-0 sm:grid-cols-[4.5rem_1fr]"
        >
          <div className="font-mono text-xs tabular-nums text-stone-400 pt-1">{p.year}</div>
          <div>
            <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-stone-400">
              {p.venue}
            </div>
            {p.link ? (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-medium leading-snug text-stone-900 no-underline transition-colors group-hover:text-[#1839A7]"
              >
                {p.title}
              </a>
            ) : (
              <h3 className="text-[15px] font-medium leading-snug text-stone-900">{p.title}</h3>
            )}
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-stone-600">{p.summary}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
};
