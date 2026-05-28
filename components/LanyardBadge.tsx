import React, { useEffect, useRef, useState } from 'react';

type Node = {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  fixed: boolean;
};

const CARD_WIDTH = 286;
const CARD_HEIGHT = 430;
const SEGMENT_LENGTH = 58; // 290px total rest length / 5 segments
const NUM_NODES = 6;

export default function LanyardBadge() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGPathElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const state = useRef({
    nodes: [] as Node[],
    dragging: false,
    pointerId: -1,
    pointerTarget: { x: 0, y: 0 },
    pointerOffset: { x: 0, y: 0 },
    hoverTilt: { x: 0, y: 0 },
    cardVelocity: { x: 0, y: 0 },
    lastTime: 0,
  });

  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    const rope = ropeRef.current;

    if (!stage || !card || !rope) return;

    // Initialize Verlet nodes
    const rect = stage.getBoundingClientRect();
    const anchorX = rect.width / 2;
    const anchorY = window.innerWidth < 768 ? 44 : 24;

    const currentScale = window.innerWidth < 480 ? 0.65 : (window.innerWidth < 768 ? 0.8 : 1.0);
    const initialSegLen = SEGMENT_LENGTH * currentScale;

    const initialNodes: Node[] = [];
    for (let i = 0; i < NUM_NODES; i++) {
      const y = anchorY + i * initialSegLen;
      initialNodes.push({
        x: anchorX,
        y: y,
        oldX: anchorX,
        oldY: y,
        fixed: i === 0,
      });
    }
    state.current.nodes = initialNodes;

    const layout = () => {
      const stageRect = stage.getBoundingClientRect();
      const newAnchorX = stageRect.width / 2;
      const newAnchorY = window.innerWidth < 768 ? 44 : 24;

      if (state.current.nodes.length === 0) return;

      const dx = newAnchorX - state.current.nodes[0].x;
      const dy = newAnchorY - state.current.nodes[0].y;

      // Adjust all nodes relative to the new anchor position
      state.current.nodes.forEach((node) => {
        node.x += dx;
        node.y += dy;
        node.oldX += dx;
        node.oldY += dy;
      });
    };

    const render = () => {
      const { nodes, hoverTilt, cardVelocity } = state.current;
      if (nodes.length < NUM_NODES) return;

      const anchor = nodes[0];
      const cardAttach = nodes[NUM_NODES - 1];
      const preCard = nodes[NUM_NODES - 2];

      const currentScale = window.innerWidth < 480 ? 0.65 : (window.innerWidth < 768 ? 0.8 : 1.0);

      // 1. Draw smooth ribbon lanyard rope using quadratic curves
      let d = `M ${anchor.x} ${anchor.y}`;
      for (let i = 1; i < nodes.length - 2; i++) {
        const xc = (nodes[i].x + nodes[i + 1].x) / 2;
        const yc = (nodes[i].y + nodes[i + 1].y) / 2;
        d += ` Q ${nodes[i].x} ${nodes[i].y}, ${xc} ${yc}`;
      }
      d += ` Q ${nodes[nodes.length - 2].x} ${nodes[nodes.length - 2].y}, ${cardAttach.x} ${cardAttach.y}`;
      rope.setAttribute('d', d);
      rope.setAttribute('stroke-width', (7.5 * currentScale).toString());

      // 2. Calculate dynamic card swing angle (Z-axis rotation) based on the last segment direction
      const dx = cardAttach.x - preCard.x;
      const dy = cardAttach.y - preCard.y;
      const segmentAngle = Math.atan2(dx, dy);
      const swingAngle = -segmentAngle * (180 / Math.PI); // Convert to degrees

      // 3. Calculate dynamic card 3D tilt based on physical velocity
      const velocityTiltX = Math.max(-12, Math.min(12, -cardVelocity.y * 0.75));
      const velocityTiltY = Math.max(-10, Math.min(10, cardVelocity.x * 0.75));

      // Combine velocity tilt and pointer hover parallax tilt
      const finalTiltX = velocityTiltX + hoverTilt.x;
      const finalTiltY = velocityTiltY + hoverTilt.y;

      // 4. Position the card relative to the last Verlet node
      const cardLeft = cardAttach.x - CARD_WIDTH / 2;
      const cardTop = cardAttach.y - (18 * currentScale); // Scale visual attachment elevation offset

      card.style.transform = `translate3d(${cardLeft}px, ${cardTop}px, 0) scale(${currentScale}) rotateX(${finalTiltX}deg) rotateY(${finalTiltY}deg) rotateZ(${swingAngle}deg)`;
      card.style.boxShadow = `${-dx * 0.15}px ${24 + Math.abs(dx) * 0.08}px ${50 + Math.abs(dx) * 0.1}px rgba(0,0,0,0.18)`;
    };

    let accumulator = 0;
    let lastTime = 0;
    const FIXED_DT = 1 / 60; // 16.67ms fixed timestep for high performance & stability

    const updatePhysics = (dt: number) => {
      const current = state.current;
      const { nodes, dragging } = current;
      if (nodes.length < NUM_NODES) return;

      const currentScale = window.innerWidth < 480 ? 0.65 : (window.innerWidth < 768 ? 0.8 : 1.0);
      const segLen = SEGMENT_LENGTH * currentScale;

      // 1. Position Update (Verlet Integration)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.fixed) continue;

        if (i === nodes.length - 1 && dragging) {
          // Card node is kinematic during drag: track and record velocity accurately
          node.oldX = node.x;
          node.oldY = node.y;
          node.x += (current.pointerTarget.x - node.x) * 0.32;
          node.y += (current.pointerTarget.y - node.y) * 0.32;
          continue;
        }

        // Apply dynamic damping
        const vx = (node.x - node.oldX) * 0.985;
        const vy = (node.y - node.oldY) * 0.985;

        node.oldX = node.x;
        node.oldY = node.y;

        // Apply forces (velocity + gravity)
        node.x += vx;
        node.y += vy + 820 * dt * dt; // Gravity acceleration
      }

      // 2. Satisfy distance constraints (stiffness iterations)
      const iterations = 8;
      for (let iter = 0; iter < iterations; iter++) {
        for (let i = 0; i < nodes.length - 1; i++) {
          const n1 = nodes[i];
          const n2 = nodes[i + 1];

          const cDx = n2.x - n1.x;
          const cDy = n2.y - n1.y;
          const dist = Math.max(0.1, Math.hypot(cDx, cDy));
          const diff = segLen - dist;
          const percent = (diff / dist) * 0.5;
          const offsetX = cDx * percent;
          const offsetY = cDy * percent;

          const isCardNodeAndDragging = (i + 1 === nodes.length - 1) && dragging;

          if (!n1.fixed) {
            n1.x -= offsetX;
            n1.y -= offsetY;
          }
          if (!isCardNodeAndDragging) {
            n2.x += offsetX;
            n2.y += offsetY;
          }
        }
      }

      // 3. Smoothly update card velocity for rendering
      const cardAttach = nodes[NUM_NODES - 1];
      const instantVelX = cardAttach.x - cardAttach.oldX;
      const instantVelY = cardAttach.y - cardAttach.oldY;

      // Exponential smoothing for natural, springy momentum tilt
      current.cardVelocity.x += (instantVelX - current.cardVelocity.x) * 0.15;
      current.cardVelocity.y += (instantVelY - current.cardVelocity.y) * 0.15;
    };

    const step = (time: number) => {
      const current = state.current;
      if (!lastTime) {
        lastTime = time;
        requestAnimationFrame(step);
        return;
      }

      let delta = (time - lastTime) / 1000; // delta in seconds
      lastTime = time;

      // Cap delta time to prevent physics explosion in background tabs
      if (delta > 0.1) delta = 0.1;

      accumulator += delta;

      // Process fixed steps to ensure frame-rate-independent speed on 120Hz/ProMotion displays
      while (accumulator >= FIXED_DT) {
        updatePhysics(FIXED_DT);
        accumulator -= FIXED_DT;
      }

      // Smoothly decay hover parallax tilt back to 0
      if (!current.dragging) {
        current.hoverTilt.x *= 0.92;
        current.hoverTilt.y *= 0.92;
      }

      render();
      requestAnimationFrame(step);
    };

    const toLocalPoint = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handlePointerDown = (event: PointerEvent) => {
      const current = state.current;
      const point = toLocalPoint(event);
      const cardAttach = current.nodes[NUM_NODES - 1];

      current.dragging = true;
      current.pointerId = event.pointerId;
      current.pointerOffset = {
        x: point.x - cardAttach.x,
        y: point.y - cardAttach.y,
      };
      current.pointerTarget = point;

      setIsDragging(true);
      card.setPointerCapture(event.pointerId);
      card.style.cursor = 'grabbing';
    };

    const handlePointerMove = (event: PointerEvent) => {
      const current = state.current;
      const point = toLocalPoint(event);

      if (current.dragging && current.pointerId === event.pointerId) {
        // Dragging update
        current.pointerTarget = {
          x: point.x - current.pointerOffset.x,
          y: point.y - current.pointerOffset.y,
        };
      } else {
        // Hover 3D Parallax effect (calculate distance from center of the card)
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;

        const maxHoverDist = 220;
        const dist = Math.hypot(dx, dy);

        if (dist < maxHoverDist) {
          current.hoverTilt = {
            x: -dy * 0.04,
            y: dx * 0.04,
          };
        } else {
          current.hoverTilt.x *= 0.85;
          current.hoverTilt.y *= 0.85;
        }
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      const current = state.current;
      if (current.pointerId !== event.pointerId) return;

      current.dragging = false;
      current.pointerId = -1;
      setIsDragging(false);

      card.releasePointerCapture(event.pointerId);
      card.style.cursor = 'grab';
    };

    layout();
    render();

    window.addEventListener('resize', layout);
    card.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove); // Listen globally to window for absolute drag stability
    card.addEventListener('pointerup', handlePointerUp);
    card.addEventListener('pointercancel', handlePointerUp);

    const frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', layout);
      card.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerup', handlePointerUp);
      card.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative h-[440px] sm:h-[540px] md:h-[650px] lg:h-[700px] w-full touch-none select-none overflow-visible bg-transparent pointer-events-none transition-[height] duration-300"
    >
      {/* 1. Hanging Lanyard strap (SVG Ribbon) */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <path
          ref={ropeRef}
          d=""
          fill="none"
          stroke="#171717"
          strokeLinecap="round"
          strokeWidth="7.5"
          className="drop-shadow-[0_8px_9px_rgba(0,0,0,0.18)]"
        />
      </svg>

      <div
        ref={cardRef}
        className="absolute left-0 top-0 h-[430px] w-[286px] origin-[50%_0%] cursor-grab overflow-hidden rounded-[26px] bg-[#f7f8f5] will-change-transform pointer-events-auto border border-zinc-200/50 touch-none shadow-xl"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Glossy shine reflection overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/18 mix-blend-overlay rounded-[26px] z-10" />

        <div className="h-[276px] bg-[#e4e9e4] overflow-hidden">
          <img
            src="/assets/Gemini_Generated_Image_.png"
            alt="Govinda Chauhan"
            className="h-full w-full object-cover object-center select-none"
            draggable={false}
          />
        </div>
        <div className="absolute bottom-0 left-0 h-[158px] w-full bg-white" />
        <div className="absolute bottom-[134px] right-0 h-[56px] w-[98px] rounded-bl-[56px] bg-white" />
        <div className="absolute bottom-[72px] left-[22px] text-[26px] font-medium leading-[1.05] tracking-tight text-[#151515] font-sans select-none">
          <div>Govinda</div>
          <div>Chauhan</div>
        </div>
        <div className="absolute bottom-[24px] left-[22px] text-[13px] text-[#555] font-sans font-medium select-none">
          Software Engineer
        </div>
        <div className="absolute bottom-[24px] right-[20px] text-[8px] text-[#777] font-mono select-none">
          ID: GOV2004
        </div>
      </div>
    </div>
  );
}
