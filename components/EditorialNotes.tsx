import React from 'react';
import { motion } from 'framer-motion';
import type { EditorialNote } from '../types';
import { MetricBars } from './MetricBars';
import { PipelineDiagram } from './PipelineDiagram';

export const EditorialNotes: React.FC<{ notes: EditorialNote[] }> = ({ notes }) => {
  return (
    <div className="flex flex-col gap-16">
      {notes.map((n, i) => (
        <motion.article
          key={n.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-prose"
        >
          <h3 className="font-display text-xl font-medium tracking-tight text-stone-900 md:text-2xl">
            {n.title}
          </h3>
          <p className="mt-2 text-sm italic leading-relaxed text-stone-500">{n.dek}</p>
          <div className="mt-5 space-y-4 text-[15px] leading-[1.7] text-stone-700">
            {n.body.map((para, j) => (
              <p key={j}>{para}</p>
            ))}
          </div>
          {n.pipeline && (
            <PipelineDiagram
              steps={n.pipeline}
              caption="Pipeline (read left to right)."
            />
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
  );
};
