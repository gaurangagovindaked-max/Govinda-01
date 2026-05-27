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
    const textX = useTransform(smoothMouseX, [-0.5, 0.5], ['1.5%', '-1.5%']);
    const textY = useTransform(smoothMouseY, [-0.5, 0.5], ['1.5%', '-1.5%']);

    return (
        <section
            id="vision"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={`relative py-40 px-6 overflow-hidden min-h-[85vh] flex items-center justify-center ${
                isDark ? 'bg-black text-white' : 'bg-zinc-50 text-zinc-900'
            }`}
        >
            {/* Dynamic Background */}
            <motion.div
                style={{ x: backgroundX, y: backgroundY, scale: 1.05 }}
                className="absolute inset-0 pointer-events-none"
            >
                {/* Starfield / Particles */}
                <div className="absolute inset-0 opacity-30">
                    {[...Array(25)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`absolute rounded-full ${isDark ? 'bg-indigo-500' : 'bg-indigo-400'}`}
                            initial={{
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%",
                                scale: Math.random() * 0.5 + 0.5,
                                opacity: Math.random() * 0.4 + 0.2
                            }}
                            animate={{
                                y: [null, Math.random() * 100 + "%"],
                                opacity: [0.15, 0.7, 0.15]
                            }}
                            transition={{
                                duration: Math.random() * 12 + 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                width: Math.random() * 3 + 2 + "px",
                                height: Math.random() * 3 + 2 + "px",
                            }}
                        />
                    ))}
                </div>

                {/* Glow Orb */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-10 animate-pulse-slow ${
                    isDark ? 'bg-indigo-600' : 'bg-indigo-300'
                }`} />
            </motion.div>

            {/* Content Container */}
            <motion.div
                style={{ x: textX, y: textY }}
                className="container mx-auto max-w-5xl relative z-10 text-center"
            >
                <Reveal width="100%">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`font-mono text-xs md:text-sm tracking-[0.25em] uppercase mb-8 ${
                            isDark ? 'text-indigo-400' : 'text-indigo-600'
                        }`}
                    >
                        Long Term Arc
                    </motion.p>
                </Reveal>

                <Reveal width="100%" delay={0.1}>
                    <h2 className="font-display text-6xl sm:text-7xl md:text-8xl font-extrabold mb-12 tracking-tighter leading-none">
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
                            {/* Glitch/Accent effect */}
                            <motion.span
                                className="absolute -inset-1 text-indigo-500 opacity-20 blur-sm pointer-events-none"
                                animate={{
                                    opacity: [0.1, 0.3, 0.1],
                                    scale: [1, 1.01, 1],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                {RESUME.vision.startup}
                            </motion.span>
                        </span>
                    </h2>
                </Reveal>

                <Reveal width="100%" delay={0.2}>
                    <div className="relative inline-block w-full">
                        <div className="glass-card p-10 md:p-14 rounded-[2.5rem] relative max-w-4xl mx-auto">
                            <p className="text-lg sm:text-2xl font-light leading-relaxed opacity-85">
                                {RESUME.vision.description}
                            </p>
                        </div>
                    </div>
                </Reveal>
            </motion.div>
        </section>
    );
};
