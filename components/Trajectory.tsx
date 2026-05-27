
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Theme } from '../types';

interface TrajectoryProps {
  theme: Theme;
  education: {
    institute: string;
    degree: string;
    batch: string;
    details: string;
  };
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
    points: string[];
  }[];
}

export const Trajectory: React.FC<TrajectoryProps> = ({ theme, education, experience }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);
  const isDark = theme === 'dark';

  return (
    <div ref={containerRef} className="relative w-full flex flex-col gap-32 pl-4 md:pl-0">
      
      {/* Central Timeline Line (Desktop Only) */}
      <div className={`absolute left-[24.5%] top-0 bottom-0 w-[1px] hidden md:block ${
        isDark ? 'bg-neutral-800' : 'bg-neutral-200'
      }`}>
        <motion.div 
            style={{ height: lineHeight }}
            className={`w-full origin-top ${
                isDark ? 'bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]' : 'bg-indigo-600 shadow-[0_0_12px_rgba(99,102,241,0.3)]'
            }`}
        />
      </div>

      {/* Education Block */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row gap-8 md:gap-24 items-start relative z-10 text-left"
      >
        <div className="md:w-1/4 sticky top-32 text-right pr-12 hidden md:block">
             <span className={`block text-6xl md:text-8xl font-display font-extrabold leading-none opacity-20 transition-opacity duration-500 hover:opacity-100 ${
                 isDark ? 'text-white' : 'text-black'
             }`}>
                2026
             </span>
             <div className={`mt-4 text-xs font-mono uppercase tracking-[0.2em] font-bold ${
                 isDark ? 'text-indigo-400' : 'text-indigo-600'
             }`}>
                Education
             </div>
        </div>
        
        {/* Mobile Header */}
        <div className="md:hidden">
            <span className={`text-xs font-mono uppercase tracking-widest font-bold ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
                Education / 2026
             </span>
        </div>

        <div className="md:w-3/4 relative">
             {/* Timeline Dot */}
             <div className={`absolute -left-[54px] top-3 hidden md:block z-20 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                 isDark ? 'bg-[#030303] border-indigo-500' : 'bg-white border-indigo-600'
             }`} />

             <h3 className={`text-3xl md:text-5xl font-display font-extrabold mb-2 leading-tight ${
                 isDark ? 'text-white' : 'text-zinc-900'
             }`}>
                {education.institute}
             </h3>
             <p className={`text-lg md:text-2xl font-light mb-8 ${
                 isDark ? 'text-zinc-300' : 'text-zinc-700'
             }`}>
                {education.degree}
             </p>
             <div className="glass-card p-6 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50">
                <p className={`text-sm leading-relaxed ${
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                    {education.details}
                </p>
             </div>
        </div>
      </motion.div>

      {/* Experience Blocks */}
      {experience.map((exp, index) => (
         <motion.div 
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-8 md:gap-24 items-start relative z-10 text-left"
        >
            <div className="md:w-1/4 sticky top-32 text-right pr-12 hidden md:block">
                <span className={`block text-6xl md:text-8xl font-display font-extrabold leading-none opacity-20 transition-opacity duration-500 hover:opacity-100 ${
                    isDark ? 'text-white' : 'text-black'
                }`}>
                    {exp.duration.split('–')[0]}
                </span>
                <div className={`mt-4 text-xs font-mono uppercase tracking-[0.2em] font-bold ${
                    isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}>
                    Professional Exp.
                </div>
            </div>
            
            {/* Mobile Header */}
             <div className="md:hidden">
                <span className={`text-xs font-mono uppercase tracking-widest font-bold ${
                    isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}>
                    Experience / {exp.duration}
                </span>
            </div>

            <div className="md:w-3/4 relative">
                {/* Timeline Dot */}
                <div className={`absolute -left-[54px] top-3 hidden md:block z-20 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    isDark ? 'bg-[#030303] border-indigo-500' : 'bg-white border-indigo-600'
                }`} />

                <h3 className={`text-3xl md:text-5xl font-display font-extrabold mb-1 ${
                    isDark ? 'text-white' : 'text-zinc-900'
                }`}>
                    {exp.role}
                </h3>
                <div className={`text-lg md:text-xl font-medium mb-8 ${
                    isDark ? 'text-indigo-400/80' : 'text-indigo-600/80'
                }`}>
                    @ {exp.company}
                </div>
                
                <p className={`max-w-3xl text-base mb-8 leading-relaxed opacity-70 ${
                    isDark ? 'text-zinc-300' : 'text-zinc-700'
                }`}>
                    {exp.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {exp.points.map((pt, i) => (
                        <div key={i} className="glass-card flex items-start gap-3 p-5 rounded-[1.5rem]">
                            <span className={`mt-1.5 w-1.5 h-1.5 flex-shrink-0 rounded-full ${
                                isDark ? 'bg-indigo-500' : 'bg-indigo-600'
                            }`} />
                            <span className="text-xs opacity-70 leading-relaxed font-sans">
                                {pt}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
         </motion.div>
      ))}

    </div>
  );
};
