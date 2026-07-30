import React from 'react';
import type { Project } from '../types';
import { isLiveProductUrl } from '../lib/portfolioData';

export const PRODUCT_ORDER = [
  'Delegators Client',
  'CEO Hunt',
  'Delegators Workbench',
  'Remote-os',
  'Doorway IDE',
];

export function orderProducts(products: Project[]): Project[] {
  const byTitle = new Map(products.map((p) => [p.title, p]));
  const ordered: Project[] = [];
  for (const t of PRODUCT_ORDER) {
    const p = byTitle.get(t);
    if (p) {
      ordered.push(p);
      byTitle.delete(t);
    }
  }
  for (const p of byTitle.values()) ordered.push(p);
  return ordered;
}

/**
 * Resume-style product gallery.
 * Open → borderless mini window (via onExpand), not a new browser tab.
 */
export const ProductShowcase: React.FC<{
  products: Project[];
  onExpand?: (p: Project) => void;
}> = ({ products, onExpand }) => {
  const list = orderProducts(products);

  return (
    <section
      id="products"
      className="relative w-full max-w-[100vw] overflow-x-hidden bg-[#FAF8F5] py-12 sm:py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-3xl px-3 sm:px-5 md:px-6">
        <header className="mb-8 border-b border-stone-300/80 pb-5 sm:mb-10 sm:pb-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-400">
            Systems I built
          </p>
          <h2 className="mt-2 font-display text-[1.45rem] font-medium tracking-tight text-stone-900 sm:text-[1.65rem] md:text-[1.85rem]">
            Products from weekend kitchen
          </h2>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-stone-500 sm:text-[15px]">
            Small live surfaces — open in a quiet window on this page.
          </p>
        </header>

        <ul className="m-0 grid list-none grid-cols-1 gap-0 p-0 sm:grid-cols-2 sm:gap-x-8 md:gap-x-10">
          {list.map((p, i) => (
            <ProductCard key={p.title + (p.link || i)} project={p} onOpen={onExpand} />
          ))}
        </ul>

        <div className="mt-12 border-t border-stone-300/80 pt-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-stone-400">
            Index
          </p>
          <p className="flex flex-wrap gap-x-3 gap-y-2 text-[13px] leading-relaxed text-stone-600">
            {list.map((p, i) => (
              <React.Fragment key={p.title}>
                {i > 0 && (
                  <span className="text-stone-300" aria-hidden>
                    ·
                  </span>
                )}
                {p.link && onExpand ? (
                  <button
                    type="button"
                    onClick={() => onExpand(p)}
                    className="bg-transparent p-0 text-[13px] text-[#0969da] hover:underline"
                  >
                    {p.title}
                  </button>
                ) : (
                  <span>{p.title}</span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{
  project: Project;
  onOpen?: (p: Project) => void;
}> = ({ project, onOpen }) => {
  const live = isLiveProductUrl(project.link);

  return (
    <li className="border-b border-stone-200/90 py-7 first:pt-2 last:border-b-0 sm:border-b">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-[15px] font-medium tracking-tight text-stone-900">{project.title}</h3>
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
          {project.category}
          {live ? ' · Live' : ''}
        </p>
      </div>

      <p className="mt-3 text-[14px] leading-[1.7] text-stone-600">{project.description}</p>

      {project.metric && (
        <p className="mt-2 text-[12px] text-stone-500">{project.metric}</p>
      )}

      {project.tags?.length > 0 && (
        <p className="mt-3 text-[12px] leading-relaxed text-stone-500">
          {project.tags.join(' · ')}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {project.link && onOpen && (
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="bg-transparent p-0 text-[13px] text-[#0969da] hover:underline"
          >
            Open
          </button>
        )}
      </div>
    </li>
  );
};
