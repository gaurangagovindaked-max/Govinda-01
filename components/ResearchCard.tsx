
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
        className={`glass-card group relative p-8 md:p-12 transition-all cursor-pointer flex flex-col justify-between min-h-[400px] rounded-[2rem] text-left ${
            isDark ? 'text-zinc-100' : 'text-zinc-900'
        }`}
    >
        <div>
            {/* ID */}
            <div className={`text-xs font-mono font-bold mb-6 ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
                RESEARCH // 0{index + 1}
            </div>

            {/* Main Title */}
            <h3 className="font-display text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                {title}
            </h3>
            
            {/* Subtitle */}
            <div className={`inline-block px-3 py-1 mb-8 rounded-full text-xs font-mono font-bold ${
                isDark ? 'bg-zinc-900 text-zinc-300 border border-zinc-800' : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
            }`}>
               {subtitle}
            </div>
        </div>

        {/* Bottom Section */}
        <div>
            <ul className="flex flex-col gap-3">
                {points.map((pt, i) => (
                    <li key={i} className="text-sm opacity-70 leading-relaxed font-sans list-disc list-inside">
                        {pt}
                    </li>
                ))}
            </ul>
        </div>

        {/* Arrow Icon */}
        <div className={`absolute top-8 right-8 p-2 rounded-full border transition-all duration-300 ${
            isDark 
              ? 'border-zinc-800 bg-zinc-900/50 text-zinc-300 group-hover:bg-zinc-800 group-hover:border-zinc-700' 
              : 'border-zinc-200 bg-zinc-50 text-zinc-700 group-hover:bg-zinc-100 group-hover:border-zinc-300'
        }`}>
             <ArrowUpRight 
                 size={16} 
                 className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
             />
        </div>
    </CardShell>
  );
};
