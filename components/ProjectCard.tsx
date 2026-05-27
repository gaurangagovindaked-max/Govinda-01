
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Activity, Github } from 'lucide-react';
import { Project, Theme } from '../types';

interface ProjectCardProps extends Project {
    theme: Theme;
    index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, description, tags, metric, link, image, proof, theme, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isDark = theme === 'dark';

    const CardShell = link ? motion.a : motion.div;

    return (
        <CardShell
            href={link}
            target={link ? "_blank" : undefined}
            rel={link ? "noopener noreferrer" : undefined}
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className={`glass-card relative w-full group cursor-pointer h-full flex flex-col overflow-hidden rounded-[2rem] p-6 text-left ${
                isDark ? 'text-zinc-100' : 'text-zinc-900'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Project Image Panel */}
            {image && (
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[1.5rem] mb-6 bg-zinc-900">
                    <img
                        src={image}
                        alt={`${title} preview`}
                        loading="lazy"
                        onError={(event) => {
                            event.currentTarget.style.display = 'none';
                        }}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Badge */}
                    <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded-full backdrop-blur-md ${
                        isDark ? 'bg-black/60 text-zinc-300' : 'bg-white/80 text-zinc-800'
                    }`}>
                        <Github size={10} />
                        {proof || 'Public proof'}
                    </div>
                </div>
            )}

            <div className="flex flex-col h-full flex-grow">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col gap-1">
                        <span className={`text-[9px] font-mono uppercase tracking-[0.25em] font-bold ${
                            isDark ? 'text-indigo-400' : 'text-indigo-600'
                        }`}>
                            {category}
                        </span>
                        <h3 className="text-2xl font-display font-extrabold tracking-tight leading-tight">
                            {title}
                        </h3>
                    </div>
                    
                    <div className={`p-2 rounded-full transition-all duration-300 border ${
                        isDark 
                          ? 'border-zinc-800 bg-zinc-900/50 text-zinc-300 group-hover:bg-zinc-800 group-hover:border-zinc-700' 
                          : 'border-zinc-200 bg-zinc-50 text-zinc-700 group-hover:bg-zinc-100 group-hover:border-zinc-300'
                    }`}>
                        <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm opacity-60 leading-relaxed font-sans mb-6 flex-grow">
                    {description}
                </p>

                {/* Bottom specs */}
                <div className="mt-auto pt-6 flex flex-col gap-4 border-t border-zinc-200/40 dark:border-zinc-800/40">
                    <div className="flex items-center gap-2">
                        <Activity size={14} className={isDark ? 'text-emerald-400' : 'text-emerald-600'} />
                        <span className="font-mono text-xs font-bold opacity-80">
                            {metric}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                            <span key={i} className={`text-[10px] font-mono tracking-wider ${
                                isDark ? 'text-zinc-500' : 'text-zinc-400'
                            }`}>
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </CardShell>
    );
};
