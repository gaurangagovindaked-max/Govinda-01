import React from 'react';

/**
 * Slim top bar — answers "what is he building" on first paint, every screen
 * size, without competing with the hanging badge. Links to the Ent site.
 */
export const NowBuilding: React.FC = () => {
  return (
    <a
      href="https://ent-01.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-stone-950 px-4 py-2.5 text-center hover:no-underline"
    >
      <span className="mx-auto flex w-full max-w-3xl flex-wrap items-baseline justify-center gap-x-2.5 gap-y-0.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400">
          Currently building
        </span>
        <span className="text-[13px] font-semibold text-stone-50">
          Ent — your ordinary laptops become one private AI server
        </span>
        <span className="font-mono text-[11px] text-stone-400">
          ent-01.vercel.app ↗
        </span>
      </span>
    </a>
  );
};
