import React from 'react';
import LanyardBadge from './LanyardBadge';
import { RESUME } from '../constants';

/**
 * LanyardBadge is not modified.
 * Extra bottom clearance so links + copy never sit on top of the hanging card on mobile.
 */
export const Hero: React.FC = () => {
  return (
    <section className="relative mb-6 w-full overflow-visible sm:mb-10 md:mb-12">
      {/* Clearance below the physics stage so the swinging card cannot cover links */}
      <div className="relative w-full overflow-visible pb-14 sm:pb-10 md:pb-6">
        <LanyardBadge />
      </div>

      {/* Links below the card — low z so they never paint over the badge */}
      <div className="relative z-0 mx-auto -mt-2 max-w-2xl px-3 text-center sm:mt-0 sm:px-4">
        <nav
          className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-[13px] font-medium sm:gap-x-3 sm:text-sm"
          aria-label="Profile links"
        >
          <a
            href="https://github.com/GC-WORK11"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0969da] hover:underline"
          >
            GitHub
          </a>
          <span className="select-none text-zinc-300" aria-hidden>
            /
          </span>
          <a
            href="https://x.com/Doorway_harness"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0969da] hover:underline"
          >
            X
          </a>
          <span className="select-none text-zinc-300" aria-hidden>
            /
          </span>
          <a
            href="https://in.linkedin.com/in/govinda-flow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0969da] hover:underline"
          >
            LinkedIn
          </a>
          <span className="select-none text-zinc-300" aria-hidden>
            /
          </span>
          <a
            href="/Govinda_Chauhan_Paper_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0969da] hover:underline"
          >
            Resume
          </a>
          <span className="hidden select-none text-zinc-300 sm:inline" aria-hidden>
            /
          </span>
          <a
            href={`mailto:${RESUME.header.email}`}
            className="w-full break-all text-[#0969da] hover:underline sm:w-auto"
          >
            {RESUME.header.email}
          </a>
        </nav>
      </div>
    </section>
  );
};
