import React from 'react';
import { RESUME } from '../constants';

/**
 * Quiet language / tool chips — organic density, no skill-wall marketing.
 */
export const TechStack: React.FC = () => {
  const languageIcon = (lang: string): string | undefined => {
    const map: Record<string, string> = {
      TypeScript: 'typescript.svg',
      Typescript: 'typescript.svg',
      Python: 'python.svg',
      Rust: 'rust.svg',
      Go: 'go.svg',
      Golang: 'go.svg',
      'Node.js': 'nodedotjs.svg',
      'Next.js': 'nextdotjs.svg',
      React: 'reactnative.svg',
      Vite: 'vite.svg',
      Flutter: 'flutter.svg',
      'React Native': 'reactnative.svg',
      Electron: 'electron.svg',
    };
    return map[lang];
  };

  const toolIcon = (tool: string): string | undefined => {
    const map: Record<string, string> = {
      pi: 'pi-coding-agent.png',
      'hermes agent': 'hermesagent.webp',
      claude: 'claude-code (1).svg',
      codex: 'codex.svg',
      cursor: 'codex.svg',
      ubuntu: 'ubuntu.svg',
    };
    return map[tool.toLowerCase()];
  };

  const Chip = ({
    label,
    icon,
  }: {
    label: string;
    icon?: string;
  }) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/70 px-3 py-1.5 text-[12px] text-stone-700 shadow-[0_1px_0_rgba(28,25,23,0.04)]">
      {icon && (
        <img src={`/assets/${icon}`} alt="" className="h-3.5 w-3.5 object-contain opacity-80" />
      )}
      {label}
    </span>
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-stone-400">
          Languages
        </p>
        <div className="flex flex-wrap gap-2">
          {RESUME.languages?.map((lang) => (
            <Chip key={lang} label={lang} icon={languageIcon(lang)} />
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-stone-400">
          Day-to-day
        </p>
        <div className="flex flex-wrap gap-2">
          {RESUME.tools?.map((tool) => {
            if (tool.toLowerCase() === 'cloudflare') {
              return (
                <span
                  key={tool}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/70 px-3 py-1.5 text-[12px] capitalize text-stone-700 shadow-[0_1px_0_rgba(28,25,23,0.04)]"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#F38020] opacity-90">
                    <path d="M16.92 12c-1.39-4.22-5.59-6.3-9.92-4.83a8.1 8.1 0 00-5 5A4.47 4.47 0 000 16.5 4.51 4.51 0 004.5 21h14A5.5 5.5 0 0024 15.5a5.45 5.45 0 00-2.85-4.8z" />
                  </svg>
                  {tool}
                </span>
              );
            }
            return <Chip key={tool} label={tool} icon={toolIcon(tool)} />;
          })}
        </div>
      </div>
    </div>
  );
};
