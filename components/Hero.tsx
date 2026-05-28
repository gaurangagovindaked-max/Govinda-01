import React from 'react';
import LanyardBadge from './LanyardBadge';
import { RESUME } from '../constants';

export const Hero: React.FC = () => {
  return (
    <section className="-mx-4 mt-0 mb-12 overflow-visible md:-mx-8">
      <LanyardBadge />
      <div className="mx-auto mt-4 max-w-2xl px-4 text-center md:mt-2">
        <p className="text-base font-medium leading-relaxed text-zinc-900 md:text-lg">
          From apps to orchestration, I build agentic software systems, product infrastructure, and autonomous tools that turn ambitious ideas into shipped products.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-medium">
          <a href="https://github.com/GC-WORK11" target="_blank" rel="noopener noreferrer" className="text-[#0969da] hover:underline">
            GitHub
          </a>
          <span className="text-zinc-300">/</span>
          <a href="https://in.linkedin.com/in/govinda-flow" target="_blank" rel="noopener noreferrer" className="text-[#0969da] hover:underline">
            LinkedIn
          </a>
          <span className="text-zinc-300">/</span>
          <a href={`mailto:${RESUME.header.email}`} className="text-[#0969da] hover:underline">
            {RESUME.header.email}
          </a>
        </div>
      </div>
    </section>
  );
};
