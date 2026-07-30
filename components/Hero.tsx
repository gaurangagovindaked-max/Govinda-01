import React from 'react';
import LanyardBadge from './LanyardBadge';
import { RESUME } from '../constants';

/**
 * Card (LanyardBadge) is unchanged.
 * Only links sit under it — no extra bio line here, no overflow clipping.
 */
export const Hero: React.FC = () => {
  return (
    <section className="-mx-4 mt-0 mb-12 overflow-visible md:-mx-8">
      <LanyardBadge />
      {/* Space under the card so links are not under/behind the badge */}
      <div className="relative z-10 mx-auto mt-10 max-w-2xl px-4 text-center md:mt-12">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-medium">
          <a
            href="https://github.com/GC-WORK11"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0969da] hover:underline"
          >
            GitHub
          </a>
          <span className="text-zinc-300">/</span>
          <a
            href="https://in.linkedin.com/in/govinda-flow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0969da] hover:underline"
          >
            LinkedIn
          </a>
          <span className="text-zinc-300">/</span>
          <a
            href="/Govinda_Chauhan_Paper_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0969da] hover:underline"
          >
            Resume
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
