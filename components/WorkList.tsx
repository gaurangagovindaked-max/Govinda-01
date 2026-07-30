import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../types';

/** Rajan-like quiet work list — title, mono category, short description. */
export const WorkList: React.FC<{
  items: Project[];
  onSelect: (p: Project) => void;
}> = ({ items, onSelect }) => {
  return (
    <div className="flex flex-col">
      {items.map((project, index) => (
        <motion.button
          type="button"
          key={project.title + index}
          onClick={() => onSelect(project)}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.4, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
          className="group cursor-pointer border-b border-stone-200/70 py-5 text-left transition-colors first:pt-0 last:border-0 hover:bg-stone-50/40"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[15px] font-medium text-stone-900 transition-colors group-hover:text-[#1839A7]">
              {project.title}
            </span>
            <span className="font-mono text-[11px] tracking-tight text-stone-400">
              {project.category}
            </span>
          </div>
          <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-stone-600">
            {project.description}
          </p>
          {project.metric && (
            <p className="mt-2 font-mono text-[11px] text-stone-400">{project.metric}</p>
          )}
        </motion.button>
      ))}
    </div>
  );
};
