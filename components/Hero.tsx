import React from 'react';
import LanyardBadge from './LanyardBadge';
import { RESUME } from '../constants';

/**
 * Do NOT edit LanyardBadge.
 *
 * The badge stage is shorter than the hanging card on mobile (scale 0.65–0.8),
 * so links must start BELOW the computed card bottom (~500–610px), not the stage box.
 */
export const Hero: React.FC = () => {
  return (
    <section className="relative mb-6 w-full overflow-visible sm:mb-8 md:mb-10">
      {/*
        Reserved height ≥ hanging card bottom (physics) + gap.
        Phone (~0.65 scale): card bottom ≈ 500px
        Large phone (~0.8 scale): card bottom ≈ 610px
        Desktop (1.0 scale): card bottom ≈ 730px
      */}
      <div
        className="relative isolate w-full overflow-visible
          min-h-[560px]
          sm:min-h-[700px]
          md:min-h-[780px]
          lg:min-h-[800px]"
      >
        <LanyardBadge />
      </div>

      {/* Extra gap so blue links sit clearly under the card, never on it */}
      <div
        className="relative z-0 mx-auto w-full max-w-2xl px-4
          mt-8 pt-2
          sm:mt-10 sm:pt-4
          md:mt-6
          text-center"
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
            href="/Govinda_Chauhan_ML_Systems_Resume.pdf"
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
