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
      'React Native': 'reactnative.svg'
    };
    return map[lang];
  };

  const getToolIcon = (tool: string) => {
    const map: Record<string, string> = {
      'pi': 'pi-coding-agent.png', 
      'hermes agent': 'hermesagent.webp',
      'claude': 'claude-code (1).svg',
      'codex': 'codex.svg'
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
            if (tool.toLowerCase() === 'aws') {
              return (
                <div key={idx} className="flex items-center gap-2 border border-zinc-200 px-3 py-1.5 rounded bg-zinc-50 text-sm font-medium text-zinc-800 uppercase">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[#232F3E]">
                    <path d="M11.53 17.51c-2.47.88-5.26 1.35-8 1.35A17.9 17.9 0 010 18c2.46.99 5.38 1.48 8.12 1.48 3.5 0 7.04-.6 10.37-1.74l-1.02-1.92c-1.97.74-3.95 1.13-5.94 1.13v.56zm10.7-3.92c-1.02 0-2.3.2-3.76.54l-1.33-4.83h-2.58l3.19 10.23h3.1l2.5-8.52 2.45 8.52h3.11l3.18-10.23h-2.55l-1.34 4.88c-1.44-.36-2.73-.59-3.93-.59zm-13.68 5.7c-.57.17-1.12.35-1.68.5v3.1h2.24v-2.92c.67-.18 1.32-.38 1.95-.58v-3.14c-.81.3-1.63.63-2.51 1.04zm13.12-2.12c1.45.31 2.84.77 4.16 1.4v-3.03c-1.37-.62-2.83-1.07-4.33-1.38v3.01zm-5.46-.22c1.23-.27 2.44-.45 3.61-.53v-3.15c-1.31.06-2.67.24-4.04.54v3.14zm-14.73 1.25c.67-.28 1.36-.5 2.05-.68v-3.06c-.85.19-1.67.43-2.45.73v3.01z" />
                  </svg>
                  {tool}
                </div>
              );
            }

            const icon = getToolIcon(tool);
            return (
              <div key={idx} className="flex items-center gap-2 border border-zinc-200 px-3 py-1.5 rounded bg-zinc-50 text-sm font-medium text-zinc-800 capitalize">
                {icon && <img src={`/assets/${icon}`} alt={tool} className="w-4 h-4 object-contain" />}
                {tool}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
