import React from 'react';

/**
 * Slim top bar — answers "what is he building" on first paint, every screen
 * size, without competing with the hanging badge. Links to the Ent site.
 * Single flowing sentence so it wraps gracefully instead of stacking oddly.
 */
export const NowBuilding: React.FC = () => {
  return (
    <a
      href="https://ent-01.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-stone-950 px-4 py-2.5 text-center hover:no-underline"
    >
      <p className="mx-auto w-full max-w-5xl text-balance text-[13px] leading-relaxed">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400">
          Currently building
        </span>
        <span className="text-stone-500"> · </span>
        <span className="font-semibold text-stone-50">
          Ent — a distributed inference cluster from ordinary laptops. One AI server.
        </span>{' '}
        <span className="font-mono text-[11px] text-sky-400">
          ent-01.vercel.app ↗
        </span>
      </p>
    </a>
  );
};
