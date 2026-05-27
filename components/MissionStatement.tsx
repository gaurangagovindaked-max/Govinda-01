import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';
import { Reveal } from './Reveal';

interface MissionStatementProps {
    theme: Theme;
    summary: string;
}

export const MissionStatement: React.FC<MissionStatementProps> = ({ theme, summary }) => {
    const isDark = theme === 'dark';

    // Split summary into words for the animation
    const words = summary.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <section id="about" className="py-24 px-6 relative overflow-hidden">
            <div className="container mx-auto max-w-5xl text-center">
                <Reveal width="100%">
                    <span className={`inline-block text-[10px] font-mono uppercase tracking-[0.2em] mb-10 px-4 py-1.5 rounded-full border ${
                        isDark ? 'border-zinc-800 bg-zinc-900/40 text-zinc-400' : 'border-zinc-200 bg-zinc-50 text-zinc-600'
                    }`}>
                        Mission Statement
                    </span>
                </Reveal>

                <div className="glass-card p-10 md:p-16 rounded-[2.5rem] relative">
                    <motion.div
                        style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                    >
                        {words.map((word, index) => (
                            <motion.span
                                variants={child}
                                style={{ marginRight: "0.25em" }}
                                key={index}
                                className={`font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed font-bold ${
                                    isDark ? 'text-zinc-100' : 'text-zinc-800'
                                }`}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
