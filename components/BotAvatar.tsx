import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface BotAvatarProps {
    theme: Theme;
    isOpen: boolean;
}

export const BotAvatar: React.FC<BotAvatarProps> = ({ theme, isOpen }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const isDark = theme === 'dark';
    const isLightBrutal = theme === 'brutal';
    const isDarkBrutal = theme === 'dark-brutal';
    const isAnyBrutal = isLightBrutal || isDarkBrutal;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Calculate pupil position
    const calculatePupilPos = (eyeOffsetX: number) => {
        if (!containerRef.current) return { x: 0, y: 0 };

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Adjust center for specific eye
        const eyeCenterX = centerX + eyeOffsetX;
        const eyeCenterY = centerY;

        const angle = Math.atan2(mousePosition.y - eyeCenterY, mousePosition.x - eyeCenterX);
        const distance = Math.min(3, Math.hypot(mousePosition.x - eyeCenterX, mousePosition.y - eyeCenterY) / 10);

        return {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance
        };
    };

    const leftPupil = calculatePupilPos(-8);
    const rightPupil = calculatePupilPos(8);

    // Styles based on theme
    const bodyClass = isDarkBrutal
        ? "bg-black border-2 border-white shadow-brutal-white rounded-none"
        : isLightBrutal
            ? "bg-white border-2 border-black shadow-brutal rounded-none"
            : isDark
                ? "bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                : "bg-black shadow-lg";

    const eyeContainerClass = isDarkBrutal
        ? "bg-acid rounded-none"
        : isLightBrutal
            ? "bg-black rounded-none"
            : isDark
                ? "bg-black"
                : "bg-white";

    const pupilClass = isDarkBrutal
        ? "bg-black rounded-none"
        : isLightBrutal
            ? "bg-white rounded-none"
            : isDark
                ? "bg-white"
                : "bg-black";

    return (
        <div
            ref={containerRef}
            className={`relative w-12 h-12 flex items-center justify-center transition-all duration-300 ${isAnyBrutal ? '' : 'rounded-full'} ${bodyClass}`}
        >
            {/* Eyes Container */}
            <div className="flex gap-2">
                {/* Left Eye */}
                <div className={`w-3 h-4 flex items-center justify-center overflow-hidden ${isAnyBrutal ? '' : 'rounded-full'} ${eyeContainerClass}`}>
                    <motion.div
                        className={`w-1.5 h-1.5 ${isAnyBrutal ? '' : 'rounded-full'} ${pupilClass}`}
                        animate={{ x: isOpen ? 0 : leftPupil.x, y: isOpen ? 0 : leftPupil.y }}
                        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                    />
                </div>

                {/* Right Eye */}
                <div className={`w-3 h-4 flex items-center justify-center overflow-hidden ${isAnyBrutal ? '' : 'rounded-full'} ${eyeContainerClass}`}>
                    <motion.div
                        className={`w-1.5 h-1.5 ${isAnyBrutal ? '' : 'rounded-full'} ${pupilClass}`}
                        animate={{ x: isOpen ? 0 : rightPupil.x, y: isOpen ? 0 : rightPupil.y }}
                        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                    />
                </div>
            </div>

            {/* Mouth (Optional - maybe just for Brutal or when open) */}
            {isOpen && (
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className={`absolute bottom-2 w-4 h-0.5 ${isDarkBrutal ? 'bg-acid' : isLightBrutal ? 'bg-black' : isDark ? 'bg-black' : 'bg-white'}`}
                />
            )}
        </div>
    );
};
