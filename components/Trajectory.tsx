
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
  const isLightBrutal = theme === 'brutal';
  const isDarkBrutal = theme === 'dark-brutal';
  const isAnyBrutal = isLightBrutal || isDarkBrutal;

  return (
    <div ref={containerRef} className="relative w-full flex flex-col gap-32 pl-4 md:pl-0">
      
      {/* Central Timeline Line (Desktop Only) */}
      <div className={`absolute left-[24.5%] top-0 bottom-0 w-[1px] hidden md:block ${
        isLightBrutal ? 'w-[4px] bg-black/10' : 
        isDarkBrutal ? 'w-[4px] bg-white/10' :
        'bg-neutral-200 dark:bg-neutral-800'
      }`}>
        <motion.div 
            style={{ height: lineHeight }}
            className={`w-full origin-top ${
                isLightBrutal ? 'bg-black' : 
                isDarkBrutal ? 'bg-white' :
                'bg-indigo-500 shadow-[0_0_10px_2px_rgba(99,102,241,0.5)]'
            }`}
        />
      </div>

      {/* Education Block */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row gap-8 md:gap-24 items-start relative z-10"
      >
        <div className="md:w-1/4 sticky top-32 text-right pr-12 hidden md:block">
             <span className={`block text-6xl md:text-8xl font-display font-bold leading-none opacity-20 transition-opacity duration-500 hover:opacity-100 ${
                 isDark || isDarkBrutal ? 'text-white' : isLightBrutal ? 'text-black font-black' : 'text-black'
             }`}>
                2026
             </span>
             <div className={`mt-4 text-sm font-mono uppercase tracking-widest font-bold ${
                 isDark ? 'text-indigo-400' : isLightBrutal ? 'text-white bg-cherry inline-block px-1' : isDarkBrutal ? 'text-black bg-acid inline-block px-1' : 'text-indigo-600'
             }`}>
                Education
             </div>
        </div>
        
        {/* Mobile Header */}
        <div className="md:hidden">
            <span className={`text-sm font-mono uppercase tracking-widest font-bold ${
                isDark ? 'text-indigo-400' : isLightBrutal ? 'text-cherry' : isDarkBrutal ? 'text-acid' : 'text-indigo-600'
            }`}>
                Education / 2026
             </span>
        </div>

        <div className="md:w-3/4 relative">
             {/* Timeline Dot */}
             <div className={`absolute -left-[54px] top-3 hidden md:block z-20 transition-colors duration-500 ${
                 isLightBrutal 
                    ? 'w-6 h-6 bg-cherry border-4 border-black -ml-1' 
                    : isDarkBrutal
                    ? 'w-6 h-6 bg-acid border-4 border-white -ml-1'
                    : `w-3 h-3 rounded-full border-2 ${isDark ? 'bg-[#050505] border-indigo-500' : 'bg-white border-indigo-600'}`
             }`} />

             <h3 className={`text-4xl md:text-6xl font-display font-bold mb-4 leading-tight ${
                 isDark ? 'text-white' : 
                 isLightBrutal ? 'text-black drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]' : 
                 isDarkBrutal ? 'text-white drop-shadow-[2px_2px_0px_rgba(255,255,255,0.2)]' :
                 'text-black'
             }`}>
                {education.institute}
             </h3>
             <p className={`text-xl md:text-3xl font-light mb-8 ${
                 isDark ? 'text-neutral-300' : 
                 isLightBrutal ? 'text-neutral-900 font-mono font-bold' : 
                 isDarkBrutal ? 'text-neutral-200 font-mono font-bold' :
                 'text-neutral-700'
             }`}>
                {education.degree}
             </p>
             <div className={`p-8 transition-colors duration-300 ${
                 isLightBrutal 
                    ? 'bg-white border-4 border-black shadow-brutal' 
                    : isDarkBrutal
                    ? 'bg-black border-4 border-white shadow-brutal-white'
                    : `border-l-2 ${isDark ? 'border-neutral-800 bg-neutral-900/30 hover:bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100'}`
             }`}>
                <p className={`text-base leading-relaxed font-mono ${
                    isDark ? 'text-neutral-400' : 
                    isLightBrutal ? 'text-black font-medium' : 
                    isDarkBrutal ? 'text-white font-medium' :
                    'text-neutral-600'
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
            className="flex flex-col md:flex-row gap-8 md:gap-24 items-start relative z-10"
        >
            <div className="md:w-1/4 sticky top-32 text-right pr-12 hidden md:block">
                <span className={`block text-6xl md:text-8xl font-display font-bold leading-none opacity-20 transition-opacity duration-500 hover:opacity-100 ${
                    isDark || isDarkBrutal ? 'text-white' : isLightBrutal ? 'text-black font-black' : 'text-black'
                }`}>
                    {exp.duration.split('–')[0]}
                </span>
                <div className={`mt-4 text-sm font-mono uppercase tracking-widest font-bold ${
                    isDark ? 'text-indigo-400' : isLightBrutal ? 'text-white bg-cherry inline-block px-1' : isDarkBrutal ? 'text-black bg-acid inline-block px-1' : 'text-indigo-600'
                }`}>
                    Professional Exp.
                </div>
            </div>
            
            {/* Mobile Header */}
             <div className="md:hidden">
                <span className={`text-sm font-mono uppercase tracking-widest font-bold ${
                    isDark ? 'text-indigo-400' : isLightBrutal ? 'text-cherry' : isDarkBrutal ? 'text-acid' : 'text-indigo-600'
                }`}>
                    Experience / {exp.duration}
                </span>
            </div>

            <div className="md:w-3/4 relative">
                {/* Timeline Dot */}
                <div className={`absolute -left-[54px] top-3 hidden md:block z-20 ${
                    isLightBrutal 
                        ? 'w-6 h-6 bg-cherry border-4 border-black -ml-1' 
                        : isDarkBrutal
                        ? 'w-6 h-6 bg-acid border-4 border-white -ml-1'
                        : `w-3 h-3 rounded-full border-2 ${isDark ? 'bg-[#050505] border-indigo-500' : 'bg-white border-indigo-600'}`
                }`} />

                <h3 className={`text-4xl md:text-6xl font-display font-bold mb-2 ${
                    isDark ? 'text-white' : 
                    isLightBrutal ? 'text-black uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]' : 
                    isDarkBrutal ? 'text-white uppercase drop-shadow-[2px_2px_0px_rgba(255,255,255,0.2)]' :
                    'text-black'
                }`}>
                    {exp.role}
                </h3>
                <div className={`text-xl md:text-2xl font-medium mb-8 ${
                    isDark ? 'text-neutral-400' : 
                    isLightBrutal ? 'text-neutral-700 font-mono' : 
                    isDarkBrutal ? 'text-neutral-300 font-mono' :
                    'text-neutral-500'
                }`}>
                    @ {exp.company}
                </div>
                
                <p className={`max-w-3xl text-lg mb-8 leading-relaxed ${
                    isDark ? 'text-neutral-300' : 
                    isLightBrutal ? 'text-black font-medium' : 
                    isDarkBrutal ? 'text-white font-medium' :
                    'text-neutral-700'
                }`}>
                    {exp.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exp.points.map((pt, i) => (
                        <div key={i} className={`flex items-start gap-3 p-4 transition-all duration-300 ${
                            isLightBrutal 
                                ? 'bg-white border-4 border-black shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1' 
                                : isDarkBrutal
                                ? 'bg-black border-4 border-white shadow-brutal-white hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                                : `border hover:-translate-y-1 hover:shadow-lg ${isDark ? 'border-neutral-800 bg-neutral-900/20 hover:border-neutral-700' : 'border-neutral-200 bg-white hover:border-neutral-300'}`
                        }`}>
                            <span className={`mt-1.5 w-1.5 h-1.5 flex-shrink-0 ${
                                isLightBrutal ? 'bg-cherry w-3 h-3 rounded-none' : isDarkBrutal ? 'bg-acid w-3 h-3 rounded-none' : `rounded-full ${isDark ? 'bg-indigo-500' : 'bg-indigo-600'}`
                            }`} />
                            <span className={`text-sm ${
                                isDark ? 'text-neutral-400' : 
                                isLightBrutal ? 'text-black font-bold' : 
                                isDarkBrutal ? 'text-white font-bold' :
                                'text-neutral-600'
                            }`}>
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
