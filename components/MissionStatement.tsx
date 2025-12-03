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
    const isLightBrutal = theme === 'brutal';
    const isDarkBrutal = theme === 'dark-brutal';
    const isAnyBrutal = isLightBrutal || isDarkBrutal;

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

    if (isAnyBrutal) {
        return (
            <section id="about" className={`py-32 px-6 ${isLightBrutal ? 'bg-white border-y-4 border-black' : 'bg-black border-y-4 border-white'
                }`}>
                <div className="container mx-auto max-w-[1600px] text-left">
                    <Reveal width="fit-content">
                        <span className={`inline-block text-xs font-mono uppercase tracking-widest mb-8 px-4 py-2 ${isLightBrutal ? 'bg-black text-white font-bold shadow-brutal-red' : 'bg-acid text-black font-bold shadow-brutal-red'
                            }`}>
                            Mission Statement
                        </span>
                    </Reveal>
                    <h2 className={`font-display text-3xl md:text-5xl lg:text-7xl leading-tight font-black uppercase tracking-tighter ${isLightBrutal ? 'text-black' : 'text-white'
                        }`}>
                        "{summary}"
                    </h2>
                </div>
            </section>
        );
    }

    return (
        <section id="about" className={`py-32 px-6 ${isDark ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
            <div className="container mx-auto max-w-4xl text-center">
                <Reveal width="100%">
                    <span className={`inline-block text-xs font-mono uppercase tracking-widest mb-12 px-4 py-2 rounded-full border ${isDark ? 'border-neutral-700 text-neutral-400' : 'border-neutral-300 text-neutral-500'
                        }`}>
                        Mission Statement
                    </span>
                </Reveal>

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
                            className={`font-display text-2xl md:text-4xl lg:text-5xl leading-tight font-medium ${isDark
                                    ? 'bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500'
                                    : 'bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500'
                                }`}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
