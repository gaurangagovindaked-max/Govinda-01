import React from 'react';

/** Simple pipeline diagram (mermaid-like clarity without heavy deps). */
export const PipelineDiagram: React.FC<{ steps: string[]; caption?: string }> = ({
  steps,
  caption,
}) => {
  return (
    <figure className="my-6">
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <span className="rounded-sm border border-stone-300/80 bg-white/70 px-2.5 py-1 font-mono text-[11px] tracking-tight text-stone-700">
              {s}
            </span>
            {i < steps.length - 1 && (
              <span className="select-none text-stone-400" aria-hidden>
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-stone-500">{caption}</figcaption>
      )}
    </figure>
  );
};
