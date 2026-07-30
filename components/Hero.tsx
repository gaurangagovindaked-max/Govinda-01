import React from 'react';
import LanyardBadge from './LanyardBadge';
import { RESUME } from '../constants';

/**
 * LanyardBadge is not modified.
 * Mobile: tall reserved block so the hanging card cannot cover blue links.
 */
export const Hero: React.FC = () => {
  return (
    <section className="relative mb-6 w-full overflow-visible sm:mb-8 md:mb-10">
      {/*
        Lanyard stage heights: 440 / 540 / 650 / 700.
        Reserve MORE than the stage so swinging card never overlaps links on phone.
      */}
      <div
        className="relative isolate w-full overflow-visible
          min-h-[640px] sm:min-h-[680px] md:min-h-[760px] lg:min-h-[820px]"
      >
        <LanyardBadge />
      </div>

      {/* Hard separation — links always below reserved card zone */}
      <div
        className="relative z-0 mx-auto w-full max-w-2xl px-4 pt-4 text-center sm:pt-6"
        style={{ marginTop: 0 }}
      >
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
