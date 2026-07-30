import React from 'react';
import { motion } from 'framer-motion';
import type { EditorialNote, Publication } from '../types';
import { MetricBars } from './MetricBars';
import { PipelineDiagram } from './PipelineDiagram';

/** Editorial research — short plain English, then one deeper note. */
export const ResearchBlog: React.FC<{
  publications: Publication[];
  notes: EditorialNote[];
}> = ({ publications, notes }) => {
  return (
    <section id="research" className="mx-auto max-w-2xl px-5 py-20 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
          Research
        </p>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-stone-900 md:text-3xl">
          Notes from the work
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-stone-600">
          Architecture write-ups and lab measurements. No fake journals—links go to
          real repos and docs.
        </p>
      </motion.div>

      {/* Compact publication index */}
      <ul className="mt-12 space-y-0 divide-y divide-stone-200/80">
        {publications.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            className="grid gap-1 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
          >
            <span className="font-mono text-xs tabular-nums text-stone-400">{p.year}</span>
            <div>
              {p.link ? (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-medium leading-snug text-stone-900 no-underline hover:text-[#1839A7]"
                >
                  {p.title}
                </a>
              ) : (
                <span className="text-[15px] font-medium text-stone-900">{p.title}</span>
              )}
              <p className="mt-1 text-xs text-stone-400">{p.venue}</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{p.summary}</p>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Deeper posts */}
      <div className="mt-16 space-y-20 border-t border-stone-200/80 pt-16">
        {notes.map((n) => (
          <motion.article
            key={n.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-xl font-medium tracking-tight text-stone-900 md:text-2xl">
              {n.title}
            </h3>
            <p className="mt-2 text-sm italic text-stone-500">{n.dek}</p>
            <div className="mt-6 space-y-4 text-[15px] leading-[1.75] text-stone-700">
              {n.body.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
            {n.pipeline && (
              <PipelineDiagram steps={n.pipeline} caption="Steps, left to right." />
            )}
            {n.figure && <MetricBars figure={n.figure} />}
            {n.link && (
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-[#1839A7] no-underline hover:underline"
              >
                {n.linkLabel || 'Source'} →
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
};
