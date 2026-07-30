import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import type { ResearchItem } from '../types';

export const PapersEnd: React.FC<{ papers: ResearchItem[] }> = ({ papers }) => {
  return (
    <section
      id="papers"
      className="w-full max-w-[100vw] overflow-x-hidden border-t border-stone-200/60 bg-[#F5F2EC] px-3 py-12 sm:px-5 sm:py-16 md:px-8 md:py-20"
    >
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
          Writing
        </p>
        <h2 className="mt-2 font-display text-xl font-medium tracking-tight text-stone-900 sm:text-2xl">
          A few things I have written
        </h2>
        <div className="mt-8 space-y-3 sm:mt-10">
          {papers.map((item, idx) => (
            <motion.a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 rounded-2xl bg-white/80 px-3 py-3.5 no-underline shadow-sm transition hover:bg-white sm:gap-4 sm:px-5 sm:py-4"
            >
              <FileText size={18} className="mt-0.5 flex-shrink-0 text-stone-400" />
              <div className="min-w-0 flex-1">
                <h3 className="break-words text-sm font-medium text-stone-900">{item.title}</h3>
                <p className="mt-0.5 font-mono text-[11px] text-stone-400">{item.subtitle}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-stone-600 sm:text-sm">
                  {item.points[0]}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
