import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Theme } from '../types';
import { RESUME } from '../constants';
import { Reveal } from './Reveal';
import Shuffle from './Shuffle';

interface VisionProps {
    theme: Theme;
}

export const Vision: React.FC<VisionProps> = ({ theme }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const isDark = theme === 'dark';
    const isLightBrutal = theme === 'brutal';
    const isDarkBrutal = theme === 'dark-brutal';
    const isAnyBrutal = isLightBrutal || isDarkBrutal;

    // Mouse parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the mouse movement
    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isMobile) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set((clientX / innerWidth) - 0.5);
        mouseY.set((clientY / innerHeight) - 0.5);
    };

    // Parallax transforms
    const backgroundX = useTransform(smoothMouseX, [-0.5, 0.5], ['-5%', '5%']);
    const backgroundY = useTransform(smoothMouseY, [-0.5, 0.5], ['-5%', '5%']);
    const textX = useTransform(smoothMouseX, [-0.5, 0.5], ['2%', '-2%']);
    const textY = useTransform(smoothMouseY, [-0.5, 0.5], ['2%', '-2%']);

    return (
        <section
            id="vision"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={`relative py-40 px-6 overflow-hidden min-h-[80vh] flex items-center justify-center ${isDark ? 'bg-black' :
                isLightBrutal ? 'bg-white border-t-4 border-black' :
                    isDarkBrutal ? 'bg-black border-t-4 border-white' :
                        'bg-neutral-900'
                }`}
        >
            {/* Dynamic Background */}
            <motion.div
                style={{ x: backgroundX, y: backgroundY, scale: 1.1 }}
                className="absolute inset-0 pointer-events-none"
            >
                {isLightBrutal ? (
                    <div className="absolute inset-0 opacity-10 brutal-grid animate-pulse-slow"></div>
                ) : isDarkBrutal ? (
                    <div className="absolute inset-0 opacity-10 dark-brutal-grid animate-pulse-slow"></div>
                ) : (
                    <>
                        {/* Starfield / Particles */}
                        <div className="absolute inset-0 opacity-20">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`absolute rounded-full ${isDark ? 'bg-indigo-500' : 'bg-blue-400'}`}
                                    initial={{
                                        x: Math.random() * 100 + "%",
                                        y: Math.random() * 100 + "%",
                                        scale: Math.random() * 0.5 + 0.5,
                                        opacity: Math.random() * 0.5 + 0.2
                                    }}
                                    animate={{
                                        y: [null, Math.random() * 100 + "%"],
                                        opacity: [0.2, 0.8, 0.2]
                                    }}
                                    transition={{
                                        duration: Math.random() * 10 + 10,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{
                                        width: Math.random() * 4 + 2 + "px",
                                        height: Math.random() * 4 + 2 + "px",
                                    }}
                                />
                            ))}
                        </div>

                        {/* Glow Orb */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[150px] opacity-10 animate-pulse-slow" />
                    </>
                )}
            </motion.div>

            {/* Content Container */}
            <motion.div
                style={{ x: textX, y: textY }}
                className="container mx-auto max-w-6xl relative z-10 text-center"
            >
                <Reveal width="100%">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`font-mono text-sm md:text-base tracking-[0.3em] uppercase mb-8 ${isLightBrutal ? 'text-white bg-black inline-block px-4 py-2 transform -rotate-1' :
                            isDarkBrutal ? 'text-black bg-white inline-block px-4 py-2 transform rotate-1' :
                                'text-indigo-400'
                            }`}
                    >
                        {RESUME.vision.tagline}
                    </motion.p>
                </Reveal>

                <Reveal width="100%" delay={0.1}>
                    <h2 className={`font-display text-6xl md:text-8xl lg:text-[10rem] font-bold mb-12 tracking-tighter leading-[0.85] ${isLightBrutal ? 'text-black uppercase drop-shadow-[8px_8px_0px_#ff3333]' :
                        isDarkBrutal ? 'text-white uppercase drop-shadow-[8px_8px_0px_#ccff00]' :
                            'text-white'
                        }`}>
                        <span className="inline-block relative">
                            <Shuffle
                                text={RESUME.vision.startup}
                                shuffleDirection="right"
                                duration={0.6}
                                shuffleTimes={4}
                                scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                                triggerOnHover={true}
                                className="inline-block"
                            />
                            {/* Glitch/Accent effect for non-brutal themes */}
                            {!isAnyBrutal && (
                                <motion.span
                                    className="absolute -inset-1 text-indigo-500 opacity-30 blur-sm pointer-events-none"
                                    animate={{
                                        opacity: [0.2, 0.5, 0.2],
                                        scale: [1, 1.02, 1],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {RESUME.vision.startup}
                                </motion.span>
                            )}
                        </span>
                    </h2>
                </Reveal>

                <Reveal width="100%" delay={0.2}>
                    <div className="relative inline-block">
                        <p className={`text-xl md:text-3xl font-light leading-relaxed max-w-4xl mx-auto ${isLightBrutal ? 'text-black font-medium border-4 border-black p-8 shadow-brutal bg-white text-left md:text-center transform rotate-1' :
                            isDarkBrutal ? 'text-white font-medium border-4 border-white p-8 shadow-brutal-white bg-black text-left md:text-center transform -rotate-1' :
                                'text-neutral-300'
                            }`}>
                            {RESUME.vision.description}
                        </p>

                        {/* Decorative corners for non-brutal */}
                        {!isAnyBrutal && (
                            <>
                                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-indigo-500/50" />
                                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-indigo-500/50" />
                            </>
                        )}
                    </div>
                </Reveal>

                {/* Mobile-specific touch hint or decoration */}
                {isMobile && !isAnyBrutal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-12 text-neutral-600 text-xs font-mono uppercase tracking-widest"
                    >
            /// SYSTEM.INITIATED ///
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};
