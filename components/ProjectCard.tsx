
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
    const isLightBrutal = theme === 'brutal';
    const isDarkBrutal = theme === 'dark-brutal';
    const isAnyBrutal = isLightBrutal || isDarkBrutal;

    const CardShell = link ? motion.a : motion.div;

    return (
        <CardShell
            href={link}
            target={link ? "_blank" : undefined}
            rel={link ? "noopener noreferrer" : undefined}
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: isAnyBrutal ? 0.3 : 0.6, delay: index * 0.1, type: isAnyBrutal ? "spring" : "tween" }}
            whileHover={isLightBrutal ? { y: -5 } : isDarkBrutal ? { y: -5 } : { scale: 1.02 }}
            className={`relative w-full group cursor-pointer h-full flex flex-col overflow-hidden ${isDark ? 'text-white' : 'text-black'
                } ${isLightBrutal
                    ? 'rounded-none bg-white border-4 border-black shadow-brutal hover:shadow-brutal-hover transition-all'
                    : isDarkBrutal
                        ? 'rounded-none bg-black text-white border-4 border-white shadow-brutal-white hover:shadow-brutal-hover-white transition-all'
                        : 'rounded-sm'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Base (Non-Brutal) */}
            {!isAnyBrutal && (
                <div className={`absolute inset-0 transition-all duration-500 ${isDark
                        ? 'bg-neutral-900/60 border border-neutral-800'
                        : 'bg-neutral-50 border border-neutral-200'
                    }`} />
            )}

            {/* Hover Glow Effect (Non-Brutal) */}
            {!isAnyBrutal && (
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isDark ? 'bg-indigo-500/5' : 'bg-indigo-500/5'
                    }`} />
            )}

            {/* Cybernetic Scan Line (Non-Brutal) */}
            <AnimatePresence>
                {isHovered && !isAnyBrutal && (
                    <motion.div
                        initial={{ top: '-10%', opacity: 0 }}
                        animate={{ top: '120%', opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "linear", repeat: Infinity, repeatDelay: 0.5 }}
                        className={`absolute left-0 right-0 h-[1px] z-10 box-content shadow-[0_0_15px_2px_rgba(99,102,241,0.3)] ${isDark ? 'bg-indigo-500' : 'bg-indigo-600'}`}
                    />
                )}
            </AnimatePresence>

            {/* Content Container */}
            {image && (
                <div className={`relative z-20 aspect-[16/9] overflow-hidden border-b ${isLightBrutal ? 'border-black border-b-4' :
                    isDarkBrutal ? 'border-white border-b-4' :
                        isDark ? 'border-neutral-800' : 'border-neutral-200'
                    }`}>
                    <div className={`absolute inset-0 flex flex-col justify-end p-6 ${isLightBrutal ? 'bg-white brutal-grid' :
                        isDarkBrutal ? 'bg-black dark-brutal-grid' :
                            isDark ? 'bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_35%),#111]' :
                                'bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.12),transparent_35%),#f8fafc]'
                        }`}>
                        <div className={`text-[10px] font-mono uppercase tracking-[0.25em] ${isDark || isDarkBrutal ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            public build capture
                        </div>
                        <div className={`mt-2 font-display text-4xl font-black tracking-tighter ${isDark || isDarkBrutal ? 'text-white' : 'text-black'}`}>
                            {title}
                        </div>
                    </div>
                    <img
                        src={image}
                        alt={`${title} preview`}
                        loading="lazy"
                        onError={(event) => {
                            event.currentTarget.style.display = 'none';
                        }}
                        className="h-full w-full object-cover grayscale contrast-110 transition duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className={`absolute left-4 top-4 flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest ${isLightBrutal ? 'bg-cherry text-white border-2 border-black' :
                        isDarkBrutal ? 'bg-acid text-black border-2 border-white' :
                            isDark ? 'bg-black/70 text-white' : 'bg-white/80 text-black'
                        }`}>
                        <Github size={12} />
                        {proof || 'Public proof'}
                    </div>
                </div>
            )}

            <div className="relative z-20 p-8 flex flex-col h-full flex-grow">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-2">
                        <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-bold w-fit ${isLightBrutal
                                ? 'bg-black text-white px-2 py-1'
                                : isDarkBrutal
                                    ? 'bg-acid text-black px-2 py-1'
                                    : (isDark ? 'text-indigo-400' : 'text-indigo-600')
                            }`}>
                            {category}
                        </span>
                        <h3 className={`text-2xl md:text-3xl font-display font-bold leading-[1.1] mt-2 ${isAnyBrutal ? 'uppercase tracking-tighter' : ''
                            } ${isDarkBrutal && isHovered ? 'text-acid transition-colors' : ''}`}>
                            {title}
                        </h3>
                    </div>
                    <ArrowUpRight
                        size={22}
                        className={`mt-1 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isLightBrutal ? 'text-cherry' : isDarkBrutal ? 'text-acid' : isDark ? 'text-neutral-300' : 'text-neutral-800'}`}
                    />
                </div>

                {/* Description */}
                <p className={`text-sm md:text-base leading-relaxed mb-8 flex-grow ${isDark ? 'text-neutral-400' :
                        isLightBrutal ? 'text-black font-medium' :
                            isDarkBrutal ? 'text-white font-medium' :
                                'text-neutral-600'
                    }`}>
                    {description}
                </p>

                {/* Bottom: Tags & Specs */}
                <div className={`mt-auto pt-6 flex flex-col gap-4 ${isLightBrutal ? 'border-t-4 border-black' :
                        isDarkBrutal ? 'border-t-4 border-white' :
                            'border-t border-dashed border-neutral-200 dark:border-neutral-800'
                    }`}>

                    {/* Metric */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Activity size={16} className={`${isLightBrutal ? 'text-cherry' : isDarkBrutal ? 'text-acid' : (isDark ? 'text-emerald-400' : 'text-emerald-600')
                                }`} />
                            <span className={`font-mono text-sm font-bold tracking-tight`}>
                                {metric}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                            <span key={i} className={`text-xs font-mono font-bold uppercase ${isLightBrutal
                                    ? 'bg-neutral-100 text-black px-2 py-1'
                                    : isDarkBrutal
                                        ? 'bg-neutral-900 text-white px-2 py-1'
                                        : 'text-neutral-500'
                                }`}>
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Button (The Arrow Box from Schema) */}
            {isAnyBrutal && (
                <div className={`absolute bottom-0 right-0 p-4`}>
                    <div className={`w-12 h-12 flex items-center justify-center transition-all ${isLightBrutal
                            ? 'bg-cherry text-white'
                            : 'bg-acid text-black'
                        } ${isHovered ? 'scale-110' : 'scale-100'}`}>
                        <ArrowRight size={24} />
                    </div>
                </div>
            )}

            {/* Active Corners (Non-Brutal) */}
            {!isAnyBrutal && (
                <>
                    <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-all duration-300 ${isHovered ? 'border-indigo-500 opacity-100' : 'border-transparent opacity-0'}`} />
                    <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-all duration-300 ${isHovered ? 'border-indigo-500 opacity-100' : 'border-transparent opacity-0'}`} />
                    <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-all duration-300 ${isHovered ? 'border-indigo-500 opacity-100' : 'border-transparent opacity-0'}`} />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-all duration-300 ${isHovered ? 'border-indigo-500 opacity-100' : 'border-transparent opacity-0'}`} />
                </>
            )}

        </CardShell>
    );
};
