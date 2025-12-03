
import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface SkillTickerProps {
  skills: string[];
  theme: Theme;
}

export const SkillTicker: React.FC<SkillTickerProps> = ({ skills, theme }) => {
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];
  const isDark = theme === 'dark';
  const isLightBrutal = theme === 'brutal';
  const isDarkBrutal = theme === 'dark-brutal';
  const isAnyBrutal = isLightBrutal || isDarkBrutal;

  return (
    <div className={`w-full overflow-hidden py-16 border-y ${
        isDark ? 'bg-neutral-950 border-neutral-800' : 
        isLightBrutal ? 'bg-white border-y-4 border-black text-black' : 
        isDarkBrutal ? 'bg-black border-y-4 border-white text-white' :
        'bg-neutral-50 border-neutral-100'
    }`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        {duplicatedSkills.map((skill, i) => (
          <span
            key={i}
            className={`mx-8 text-4xl md:text-6xl font-display font-bold uppercase tracking-tight transition-opacity cursor-default ${
              isAnyBrutal 
                ? 'opacity-100 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]' 
                : `opacity-20 hover:opacity-100 ${isDark ? 'text-white' : 'text-black'}`
            }`}
          >
            {skill} {isLightBrutal ? <span className="text-cherry font-black mx-2">+</span> : isDarkBrutal ? <span className="text-acid font-black mx-2">+</span> : '•'}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
