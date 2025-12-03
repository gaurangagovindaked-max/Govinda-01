import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Shuffle.css';

// Note: SplitText is a Club GSAP plugin. If not available, we need a fallback or a custom implementation.
// Since we can't guarantee the user has the paid plugin, I will implement a basic custom splitter 
// or try to use the imported one if it exists. 
// However, importing it will crash if the package isn't there.
// I will try to use a simplified approach that doesn't rely on the paid SplitText plugin 
// but achieves a similar character splitting effect for this specific component.

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ShuffleProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    shuffleDirection?: 'left' | 'right';
    duration?: number;
    maxDelay?: number;
    ease?: string | ((t: number) => number);
    threshold?: number;
    rootMargin?: string;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    textAlign?: React.CSSProperties['textAlign'];
    onShuffleComplete?: () => void;
    shuffleTimes?: number;
    animationMode?: 'random' | 'evenodd';
    loop?: boolean;
    loopDelay?: number;
    stagger?: number;
    scrambleCharset?: string;
    colorFrom?: string;
    colorTo?: string;
    triggerOnce?: boolean;
    respectReducedMotion?: boolean;
    triggerOnHover?: boolean;
}

const Shuffle: React.FC<ShuffleProps> = ({
    text,
    className = '',
    style = {},
    shuffleDirection = 'right',
    duration = 0.35,
    maxDelay = 0,
    ease = 'power3.out',
    threshold = 0.1,
    rootMargin = '-100px',
    tag = 'p',
    textAlign = 'center',
    onShuffleComplete,
    shuffleTimes = 1,
    animationMode = 'evenodd',
    loop = false,
    loopDelay = 0,
    stagger = 0.03,
    scrambleCharset = '',
    colorFrom,
    colorTo,
    triggerOnce = true,
    respectReducedMotion = true,
    triggerOnHover = true
}) => {
    const ref = useRef<HTMLElement>(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [ready, setReady] = useState(false);

    const wrappersRef = useRef<HTMLElement[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const playingRef = useRef(false);
    const hoverHandlerRef = useRef<((e: Event) => void) | null>(null);

    useEffect(() => {
        if ('fonts' in document) {
            if (document.fonts.status === 'loaded') setFontsLoaded(true);
            else document.fonts.ready.then(() => setFontsLoaded(true));
        } else setFontsLoaded(true);
    }, []);

    useGSAP(
        () => {
            if (!ref.current || !text || !fontsLoaded) return;
            if (respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                onShuffleComplete?.();
                return;
            }

            const el = ref.current as HTMLElement;

            const startPct = (1 - threshold) * 100;
            const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');
            const mv = mm ? parseFloat(mm[1]) : 0;
            const mu = mm ? mm[2] || 'px' : 'px';
            const sign = mv === 0 ? '' : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;
            const start = `top ${startPct}%${sign}`;

            const removeHover = () => {
                if (hoverHandlerRef.current && ref.current) {
                    ref.current.removeEventListener('mouseenter', hoverHandlerRef.current);
                    hoverHandlerRef.current = null;
                }
            };

            const teardown = () => {
                if (tlRef.current) {
                    tlRef.current.kill();
                    tlRef.current = null;
                }
                // Restore original text
                if (ref.current) {
                    ref.current.innerHTML = '';
                    ref.current.textContent = text;
                }
                wrappersRef.current = [];
                playingRef.current = false;
            };

            const build = () => {
                // Manual splitting since we might not have SplitText
                // This is a simplified version that splits by character
                if (!ref.current) return;

                ref.current.innerHTML = ''; // Clear content
                const chars = text.split('');

                wrappersRef.current = [];
                const rolls = Math.max(1, Math.floor(shuffleTimes));
                const rand = (set: string) => set.charAt(Math.floor(Math.random() * set.length)) || '';

                chars.forEach((char, i) => {
                    const ch = document.createElement('span');
                    ch.textContent = char;
                    ch.className = 'shuffle-char';
                    if (char === ' ') ch.style.width = '0.3em'; // Handle spaces

                    // Measure width (approximate or use computed style if needed, but for now let's trust flow)
                    // For a robust implementation we'd need to measure, but let's try inline-block flow

                    const wrap = document.createElement('span');
                    wrap.className = 'shuffle-char-wrapper';

                    const inner = document.createElement('span');

                    ref.current?.appendChild(wrap);
                    wrap.appendChild(inner);

                    // Create clones for the shuffle effect
                    const firstOrig = ch.cloneNode(true) as HTMLElement;
                    firstOrig.setAttribute('data-orig', '1');

                    inner.appendChild(firstOrig);

                    for (let k = 0; k < rolls; k++) {
                        const c = ch.cloneNode(true) as HTMLElement;
                        if (scrambleCharset) c.textContent = rand(scrambleCharset);
                        inner.appendChild(c);
                    }
                    inner.appendChild(ch.cloneNode(true)); // Final char

                    // Calculate widths and positions
                    // We need to wait for render to get widths, or assume monospaced/fixed
                    // Let's assume the browser handles the width of the wrapper via CSS inline-block

                    // Animation logic
                    // We need to animate 'x' or 'y'. The original code animated 'x'.
                    // Since we are stacking horizontally in the DOM, 'x' translation moves the strip.
                    // But wait, the original code had a vertical stack or horizontal?
                    // "display: inline-block" suggests horizontal flow of characters.
                    // The 'inner' span contains [Orig, Clone1, Clone2, ..., Final].
                    // If we want to scroll through them, they should be stacked VERTICALLY or HORIZONTALLY?
                    // The original code used `x` translation, so they must be side-by-side in a very wide `inner`.
                    // Let's ensure `inner` doesn't wrap.

                    // We need to measure the width of one character to know how far to move.
                    // This is tricky without a layout pass. 
                    // Let's use percentages? No, characters differ in width.
                    // Let's use a small timeout or assume we can measure immediately after append.
                    const w = firstOrig.getBoundingClientRect().width || 20; // Fallback

                    wrap.style.width = `${w}px`;
                    wrap.style.height = 'auto'; // Or fixed height?

                    // Fix widths of all children
                    Array.from(inner.children).forEach((child: any) => {
                        child.style.width = `${w}px`;
                        child.style.display = 'inline-block';
                    });

                    const steps = rolls + 1;
                    let startX = 0;
                    let finalX = -steps * w;

                    if (shuffleDirection === 'right') {
                        // Logic from original:
                        // if right, we might want to move from left to right?
                        // The original code swapped elements. Let's stick to simple left-shift for now (standard ticker).
                        // Or if direction is right, maybe we start at -steps*w and move to 0?
                        startX = -steps * w;
                        finalX = 0;
                    }

                    gsap.set(inner, { x: startX, force3D: true });
                    if (colorFrom) (inner.style as any).color = colorFrom;

                    inner.setAttribute('data-final-x', String(finalX));
                    inner.setAttribute('data-start-x', String(startX));

                    wrappersRef.current.push(wrap);
                });
            };

            const inners = () => wrappersRef.current.map(w => w.firstElementChild as HTMLElement);

            const randomizeScrambles = () => {
                if (!scrambleCharset) return;
                wrappersRef.current.forEach(w => {
                    const strip = w.firstElementChild as HTMLElement;
                    if (!strip) return;
                    const kids = Array.from(strip.children) as HTMLElement[];
                    for (let i = 1; i < kids.length - 1; i++) {
                        kids[i].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));
                    }
                });
            };

            const cleanupToStill = () => {
                wrappersRef.current.forEach(w => {
                    const strip = w.firstElementChild as HTMLElement;
                    if (!strip) return;
                    // Just reset to show the final character (which is the last one)
                    // or the first one if we moved back to 0?
                    // If shuffleDirection is right, we moved to 0 (first element).
                    // If left (default), we moved to -steps*w (last element).

                    // Actually, let's just ensure the text is correct.
                    // The easiest way is to re-render the plain text? 
                    // But we want to keep the structure if we loop.

                    // For now, let's trust the GSAP set to final position is correct.
                });
            };

            const play = () => {
                const strips = inners();
                if (!strips.length) return;

                playingRef.current = true;

                const tl = gsap.timeline({
                    smoothChildTiming: true,
                    repeat: loop ? -1 : 0,
                    repeatDelay: loop ? loopDelay : 0,
                    onRepeat: () => {
                        if (scrambleCharset) randomizeScrambles();
                        gsap.set(strips, { x: (i, t: HTMLElement) => parseFloat(t.getAttribute('data-start-x') || '0') });
                        onShuffleComplete?.();
                    },
                    onComplete: () => {
                        playingRef.current = false;
                        if (!loop) {
                            cleanupToStill();
                            if (colorTo) gsap.set(strips, { color: colorTo });
                            onShuffleComplete?.();
                            armHover();
                        }
                    }
                });

                const addTween = (targets: HTMLElement[], at: number) => {
                    tl.to(
                        targets,
                        {
                            x: (i, t: HTMLElement) => parseFloat(t.getAttribute('data-final-x') || '0'),
                            duration,
                            ease,
                            force3D: true,
                            stagger: animationMode === 'evenodd' ? stagger : 0
                        },
                        at
                    );
                    if (colorFrom && colorTo) {
                        tl.to(targets, { color: colorTo, duration, ease }, at);
                    }
                };

                if (animationMode === 'evenodd') {
                    const odd = strips.filter((_, i) => i % 2 === 1);
                    const even = strips.filter((_, i) => i % 2 === 0);
                    const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;
                    const evenStart = odd.length ? oddTotal * 0.7 : 0;
                    if (odd.length) addTween(odd, 0);
                    if (even.length) addTween(even, evenStart);
                } else {
                    strips.forEach(strip => {
                        const d = Math.random() * maxDelay;
                        tl.to(
                            strip,
                            {
                                x: parseFloat(strip.getAttribute('data-final-x') || '0'),
                                duration,
                                ease,
                                force3D: true
                            },
                            d
                        );
                        if (colorFrom && colorTo) tl.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease }, d);
                    });
                }

                tlRef.current = tl;
            };

            const armHover = () => {
                if (!triggerOnHover || !ref.current) return;
                removeHover();
                const handler = () => {
                    if (playingRef.current) return;
                    build();
                    if (scrambleCharset) randomizeScrambles();
                    play();
                };
                hoverHandlerRef.current = handler;
                ref.current.addEventListener('mouseenter', handler);
            };

            const create = () => {
                build();
                if (scrambleCharset) randomizeScrambles();
                play();
                armHover();
                setReady(true);
            };

            const st = ScrollTrigger.create({
                trigger: el,
                start,
                once: triggerOnce,
                onEnter: create
            });

            return () => {
                st.kill();
                removeHover();
                teardown();
                setReady(false);
            };
        },
        {
            dependencies: [
                text,
                duration,
                maxDelay,
                ease,
                threshold,
                rootMargin,
                fontsLoaded,
                shuffleDirection,
                shuffleTimes,
                animationMode,
                loop,
                loopDelay,
                stagger,
                scrambleCharset,
                colorFrom,
                colorTo,
                triggerOnce,
                respectReducedMotion,
                triggerOnHover
            ],
            scope: ref
        }
    );

    const commonStyle: React.CSSProperties = { textAlign, ...style };
    const classes = `shuffle-parent ${ready ? 'is-ready' : ''} ${className}`;
    const Tag = (tag || 'p') as keyof React.JSX.IntrinsicElements;
    return React.createElement(Tag, { ref: ref as any, className: classes, style: commonStyle }, text);
};

export default Shuffle;
