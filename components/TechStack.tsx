import React from 'react';
import { motion } from 'framer-motion';
import { RESUME } from '../constants';

export const TechStack: React.FC = () => {
  const getLanguageIcon = (lang: string) => {
    const map: Record<string, string> = {
      'Typescript': 'typescript.svg',
      'Python': 'python.svg',
      'Rust': 'rust.svg',
      'Golang': 'go.svg',
      'Node.js': 'nodedotjs.svg',
      'Next.js': 'nextdotjs.svg',
      'React': 'reactnative.svg',
      'Vite': 'vite.svg',
      'Flutter': 'flutter.svg',
      'React Native': 'reactnative.svg',
      'Electron': 'electron.svg'
    };
    return map[lang];
  };

  const getToolIcon = (tool: string) => {
    const map: Record<string, string> = {
      'pi': 'pi-coding-agent.png', 
      'hermes agent': 'hermesagent.webp',
      'claude': 'claude-code (1).svg',
      'codex': 'codex.svg',
      'aws': 'aws.svg',
      'ubuntu': 'ubuntu.svg'
    };
    return map[tool.toLowerCase()];
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Languages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold text-zinc-900 mb-4">
          Languages worked with
        </h3>
        <div className="flex flex-wrap gap-4">
          {RESUME.languages?.map((lang, idx) => {
            const icon = getLanguageIcon(lang);
            return (
              <div key={idx} className="flex items-center gap-2 border border-zinc-200 px-3 py-1.5 rounded bg-zinc-50 text-sm font-medium text-zinc-800">
                {icon && <img src={`/assets/${icon}`} alt={lang} className="w-4 h-4 object-contain" />}
                {lang}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Tools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-xl font-bold text-zinc-900 mb-4">
          Tools worked with
        </h3>
        <div className="flex flex-wrap gap-4">
          {RESUME.tools?.map((tool, idx) => {
            if (tool.toLowerCase() === 'cloudflare') {
              return (
                <div key={idx} className="flex items-center gap-2 border border-zinc-200 px-3 py-1.5 rounded bg-zinc-50 text-sm font-medium text-zinc-800 capitalize">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[#F38020]">
                    <path d="M16.92 12c-1.39-4.22-5.59-6.3-9.92-4.83a8.1 8.1 0 00-5 5A4.47 4.47 0 000 16.5 4.51 4.51 0 004.5 21h14A5.5 5.5 0 0024 15.5a5.45 5.45 0 00-2.85-4.8z" />
                  </svg>
                  {tool}
                </div>
              );
            }

            const icon = getToolIcon(tool);
            const needsInvert = tool.toLowerCase() === 'pi';
            return (
              <div key={idx} className="flex items-center gap-2 border border-zinc-200 px-3 py-1.5 rounded bg-zinc-50 text-sm font-medium text-zinc-800 capitalize">
                {icon && <img src={`/assets/${icon}`} alt={tool} className={`w-4 h-4 object-contain ${needsInvert ? 'invert opacity-90' : ''}`} />}
                {tool}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
