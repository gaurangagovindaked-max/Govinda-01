
import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ResearchItem, Theme } from '../types';
import { motion } from 'framer-motion';

interface ResearchCardProps extends ResearchItem {
  theme: Theme;
  index: number;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({ title, subtitle, points, link, theme, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const isDark = theme === 'dark';
  const isLightBrutal = theme === 'brutal';
  const isDarkBrutal = theme === 'dark-brutal';
  const isAnyBrutal = isLightBrutal || isDarkBrutal;

  const CardShell = link ? motion.a : motion.div;

  return (
    <CardShell 
        href={link}
        target={link ? "_blank" : undefined}
        rel={link ? "noopener noreferrer" : undefined}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative p-8 md:p-12 transition-all cursor-pointer flex flex-col justify-between min-h-[400px] ${
            isLightBrutal 
                ? 'bg-white border-4 border-black shadow-brutal hover:shadow-brutal-hover' 
                : isDarkBrutal
                ? 'bg-black border-4 border-white shadow-brutal-white hover:shadow-brutal-hover-white'
                : `border ${isDark ? 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700' : 'border-neutral-200 bg-white hover:border-neutral-300'}`
        }`}
    >
        {/* Hover Highlight Background for Brutal */}
        {isAnyBrutal && (
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${
                isLightBrutal ? 'bg-cherry' : 'bg-acid'
            }`} />
        )}

        <div>
            {/* ID */}
            <div className={`text-sm font-mono font-bold mb-6 ${
                isLightBrutal ? 'text-black' : isDarkBrutal ? 'text-acid' : 'text-neutral-500'
            }`}>
                RESEARCH_0{index + 1}
            </div>

            {/* Main Title */}
            <h3 className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.9] mb-4 ${
                isDark || isDarkBrutal ? 'text-white' : 'text-neutral-900'
            } ${isAnyBrutal ? 'uppercase tracking-tighter' : ''}`}>
                {title}
            </h3>
            
            {/* Subtitle */}
            <div className={`inline-block px-3 py-1 mb-8 ${
                isLightBrutal 
                    ? 'bg-black text-white font-bold text-sm' 
                    : isDarkBrutal 
                    ? 'bg-white text-black font-bold text-sm'
                    : `text-sm font-mono ${isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-600'}`
            }`}>
               {subtitle}
            </div>
        </div>

        {/* Bottom Section */}
        <div>
            <div className={`w-12 h-1 mb-8 ${
                isLightBrutal ? 'bg-cherry' : isDarkBrutal ? 'bg-acid' : 'bg-transparent'
            }`} />
            
            <ul className="flex flex-col gap-3">
                {points.map((pt, i) => (
                    <li key={i} className={`text-lg leading-snug ${
                        isDark ? 'text-neutral-400' : 
                        isLightBrutal ? 'text-neutral-900 font-medium' : 
                        isDarkBrutal ? 'text-neutral-300 font-medium' :
                        'text-neutral-600'
                    }`}>
                        {pt}
                    </li>
                ))}
            </ul>
        </div>

        {/* Arrow Icon */}
        <div className={`absolute top-8 right-8 transition-transform duration-300 ${isHovered ? 'translate-x-2 -translate-y-2' : ''}`}>
             <ArrowUpRight size={isAnyBrutal ? 40 : 24} className={`${
                 isLightBrutal ? 'text-cherry' : isDarkBrutal ? 'text-acid' : (isDark ? 'text-white' : 'text-black')
             }`} />
        </div>

    </CardShell>
  );
};
