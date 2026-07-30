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
 * Mobile-first product list — clean stack on phone, 2-col from md up.
 * Open → borderless mini window (onOpen), not a new tab.
 */
export const ProductShowcase: React.FC<{
  products: Project[];
  onExpand?: (p: Project) => void;
}> = ({ products, onExpand }) => {
  const list = orderProducts(products);

  return (
    <section
      id="products"
      className="relative w-full bg-[#FAF8F5] py-12 sm:py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-2xl px-4 sm:max-w-3xl sm:px-5 md:px-6">
        <header className="mb-8 border-b border-stone-300/80 pb-5 sm:mb-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-400">
            Systems I built
          </p>
          <h2 className="mt-2 font-display text-[1.4rem] font-medium tracking-tight text-stone-900 sm:text-[1.65rem] md:text-[1.85rem]">
            Products from weekend kitchen
          </h2>
          <p className="mt-2 max-w-md text-[13px] leading-relaxed text-stone-500 sm:mt-3 sm:text-[15px]">
            Live surfaces — open here in a quiet window.
          </p>
        </header>

        {/* Single column on mobile; two columns only from md */}
        <ul className="m-0 flex list-none flex-col gap-0 p-0 md:grid md:grid-cols-2 md:gap-x-10">
          {list.map((p, i) => (
            <ProductCard key={p.title + (p.link || i)} project={p} onOpen={onExpand} />
          ))}
        </ul>

        <div className="mt-10 border-t border-stone-300/80 pt-5 sm:mt-12 sm:pt-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-stone-400">
            Index
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-3 sm:gap-y-2">
            {list.map((p) =>
              p.link && onExpand ? (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => onExpand(p)}
                  className="bg-transparent p-0 text-left text-[13px] text-[#0969da] hover:underline sm:inline"
                >
                  {p.title}
                </button>
              ) : (
                <span key={p.title} className="text-[13px] text-stone-600">
                  {p.title}
                </span>
              )
            )}
          </div>
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
    <li className="border-b border-stone-200/90 py-6 first:pt-0 last:border-b-0 md:py-7">
      {/* Stack on mobile — no bent side-by-side titles */}
      <div className="flex flex-col gap-1">
        <h3 className="text-[15px] font-medium tracking-tight text-stone-900 sm:text-base">
          {project.title}
        </h3>
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-stone-400 sm:text-[11px]">
          {project.category}
          {live ? ' · Live' : ''}
        </p>
      </div>

      <p className="mt-3 text-[13px] leading-[1.7] text-stone-600 sm:text-[14px]">
        {project.description}
      </p>

      {project.metric && (
        <p className="mt-2 text-[11px] text-stone-500 sm:text-[12px]">{project.metric}</p>
      )}

      {project.tags?.length > 0 && (
        <p className="mt-2 text-[11px] leading-relaxed text-stone-500 sm:mt-3 sm:text-[12px]">
          {project.tags.join(' · ')}
        </p>
      )}

      {project.link && onOpen && (
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="mt-4 min-h-[44px] bg-transparent py-1 pl-0 pr-3 text-left text-[13px] font-medium text-[#0969da] hover:underline sm:min-h-0"
        >
          Open
        </button>
      )}
    </li>
  );
};
