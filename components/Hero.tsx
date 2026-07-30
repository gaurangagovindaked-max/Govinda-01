import React from 'react';
import LanyardBadge from './LanyardBadge';
import { RESUME } from '../constants';

/**
 * LanyardBadge file is not edited.
 * Mobile: reserve height under the stage so GitHub / X / LinkedIn / Resume
 * never sit on top of the hanging card.
 */
export const Hero: React.FC = () => {
  return (
    <section className="relative mb-4 w-full overflow-visible sm:mb-8 md:mb-10">
      {/*
        Stage heights inside LanyardBadge: 440 / 540 / 650 / 700.
        Extra reserved space = room for hang + links gap (not overlapping).
      */}
      <div
        className="relative w-full overflow-visible
          min-h-[520px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[760px]"
      >
        <LanyardBadge />
      </div>

      {/* Explicit gap so blue links always start below the card area */}
      <div className="relative z-0 mx-auto mt-2 max-w-2xl px-4 pt-2 text-center sm:mt-4 sm:pt-4">
        <nav
          className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2.5 text-[13px] font-medium sm:gap-x-3 sm:text-sm"
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
