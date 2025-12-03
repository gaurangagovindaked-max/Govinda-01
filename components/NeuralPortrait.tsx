import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Theme } from '../types';

interface NeuralPortraitProps {
    theme: Theme;
    imageSrc: string;
}

export const NeuralPortrait: React.FC<NeuralPortraitProps> = ({ theme, imageSrc }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Motion values for mouse position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth movement (damping prevents "overwhelming" 3D)
    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    // Calculate rotation based on mouse position
    // Range is limited to +/- 7 degrees to keep it subtle
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Parallax for the image itself (moves opposite to container)
    const imageX = useTransform(mouseX, [-0.5, 0.5], ["-3%", "3%"]);
    const imageY = useTransform(mouseY, [-0.5, 0.5], ["-3%", "3%"]);

    // Lighting effect (glare moves with mouse)
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
    const glareOpacity = useTransform(mouseX, [-0.5, 0, 0.5], [0, 1, 0]); // Glare fades at edges

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate normalized mouse position (-0.5 to 0.5)
        const mouseXVal = (e.clientX - rect.left) / width - 0.5;
        const mouseYVal = (e.clientY - rect.top) / height - 0.5;

        x.set(mouseXVal);
        y.set(mouseYVal);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Don't reset immediately, let the idle animation take over smoothly
        // x.set(0); 
        // y.set(0); 
    };

    // Idle animation effect
    useEffect(() => {
        if (isHovered) return;

        let animationFrameId: number;
        const startTime = Date.now();

        const animateIdle = () => {
            const now = Date.now();
            const elapsed = (now - startTime) / 1000; // seconds

            // Gentle complex motion (Lissajous curve-like)
            // Range is roughly -0.15 to 0.15 (normalized coordinates)
            const newX = Math.sin(elapsed * 0.8) * 0.15 + Math.cos(elapsed * 0.4) * 0.05;
            const newY = Math.cos(elapsed * 0.7) * 0.15 + Math.sin(elapsed * 0.3) * 0.05;

            x.set(newX);
            y.set(newY);

            animationFrameId = requestAnimationFrame(animateIdle);
        };

        animateIdle();

        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered, x, y]);

    const isDark = theme === 'dark';

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
            }}
            className="relative w-full h-full flex items-center justify-center"
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden transition-shadow duration-500 ${isHovered ? 'shadow-2xl' : 'shadow-xl'
                    }`}
            >
                {/* Prismatic Border/Glow Container */}
                <div className={`absolute -inset-[2px] rounded-2xl opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        background: isDark
                            ? 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ff0000)'
                            : 'linear-gradient(45deg, #ff9a9e, #fad0c4, #fad0c4, #ff9a9e)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient 15s ease infinite',
                        filter: 'blur(10px)',
                        zIndex: -1
                    }}
                />

                {/* The Image Layer with Parallax */}
                <motion.div
                    style={{
                        x: imageX,
                        y: imageY,
                        scale: 1.1, // Scale up slightly to avoid edges showing during parallax
                    }}
                    className="w-full h-full relative z-10"
                >
                    <img
                        src={imageSrc}
                        alt="Portrait"
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay for depth/mood */}
                    <div className={`absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 ${isDark ? 'bg-indigo-900' : 'bg-amber-100'
                        }`} />
                </motion.div>

                {/* Glass Reflection Layer (Dynamic Lighting) */}
                <motion.div
                    style={{
                        background: `linear-gradient(105deg, transparent 20%, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)'} 40%, transparent 60%)`,
                        left: glareX, // This might need adjustment to map correctly, let's try simple gradient movement first
                        top: 0,
                        bottom: 0,
                        width: "200%", // Wide gradient to slide across
                        x: "-50%", // Center it
                        pointerEvents: "none",
                        zIndex: 20,
                    }}
                    className="absolute h-full mix-blend-overlay"
                />

                {/* Static Glass Shine (Subtle) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none z-20" />

                {/* Scanline/Texture (Optional, keeping it clean for now as per "clean" request) */}

            </motion.div>
        </motion.div>
    );
};
