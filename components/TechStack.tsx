import React from 'react';
import { motion } from 'framer-motion';
import { RESUME } from '../constants';
import { Theme } from '../types';

interface TechStackProps {
  theme: Theme;
}

export const TechStack: React.FC<TechStackProps> = ({ theme }) => {
  const getLanguageIcon = (lang: string) => {
    const map: Record<string, string> = {
      'Typescript': 'typescript.svg',
      'Python': 'python.svg',
      'Rust': 'rust.svg',
      'Golang': 'go.svg',
      'React': 'reactnative.svg',
      'Vite': 'vite.svg',
      'Flutter': 'flutter.svg',
      'React Native': 'reactnative.svg'
    };
    return map[lang];
  };

  const getToolIcon = (tool: string) => {
    const map: Record<string, string> = {
      'pi': '', 
      'hermes agent': '',
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
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          Languages worked with
        </h3>
        <div className="flex flex-wrap gap-4">
          {RESUME.languages?.map((lang, idx) => {
            const icon = getLanguageIcon(lang);
            return (
              <div key={idx} className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded bg-zinc-50 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200">
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
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          Tools worked with
        </h3>
        <div className="flex flex-wrap gap-4">
          {RESUME.tools?.map((tool, idx) => {
            const icon = getToolIcon(tool);
            return (
              <div key={idx} className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded bg-zinc-50 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 capitalize">
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
