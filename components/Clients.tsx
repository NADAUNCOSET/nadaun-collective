import React, { useRef, useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CLIENT_LIST = [
  { name: "AENTIO", category: "FASHION" },
  { name: "M2", category: "ENTERTAINMENT" },
  { name: "OLIVE YOUNG", category: "RETAIL" },
  { name: "COWAY", category: "LIFESTYLE" },
  { name: "EMIRATES", category: "AIRLINE" },
  { name: "SAMSUNG", category: "ELECTRONICS" },
  { name: "HYUNDAI STEEL", category: "INDUSTRY" },
  { name: "GAONCHIPS", category: "SEMICONDUCTOR" },
  { name: "PEPSI", category: "F&B" },
  { name: "PAT", category: "FASHION" },
  { name: "PREED", category: "SERVICE" },
  { name: "BEREX", category: "LIFESTYLE" },
  { name: "K2 SAFETY", category: "FASHION" },
  { name: "KWDA", category: "DESIGN AWARDS" },
  { name: "KOVA", category: "ORGANIZATION" },
  { name: "AMOREPACIFIC", category: "BEAUTY" },
  { name: "NUMBUZIN", category: "BEAUTY" },
  { name: "HECTO INNOVATION", category: "TECH" },
  { name: "JUNG SAEM MOOL", category: "BEAUTY" },
  { name: "ACMÉ DE LA VIE", category: "FASHION" },
  { name: "THE NEW GREY", category: "FASHION" },
  { name: "NUDAKE", category: "F&B" },
  { name: "MIRAEMI", category: "LIFESTYLE" },
  { name: "KIA", category: "MOBILITY" },
  { name: "THE MATTERS", category: "MEDIA" },
  { name: "3 HOURS AHEAD", category: "TRAVEL" },
  { name: "HD HYUNDAI", category: "HEAVY INDUSTRY" },
  { name: "CESTI", category: "FASHION" },
  { name: "ELLE", category: "MEDIA" },
  { name: "HD HYUNDAI C.E.", category: "INDUSTRIAL" },
  { name: "DASIQUE", category: "BEAUTY" },
  { name: "SKINFOOD", category: "BEAUTY" },
  { name: "TONYMOLY", category: "BEAUTY" },
  { name: "ABIB", category: "BEAUTY" },
  { name: "ROOTONIX", category: "LIFESTYLE" },
  { name: "SKIN1004", category: "BEAUTY" },
  { name: "SKEDERM", category: "BEAUTY" },
  { name: "THE SAEM", category: "BEAUTY" },
  { name: "2aN", category: "BEAUTY" },
  { name: "CALVIN KLEIN", category: "FASHION" },
  { name: "TORHOP", category: "BEAUTY" },
  { name: "DIOR BEAUTY", category: "BEAUTY" },
];

const SPACING = 90;

interface NodeData {
  name: string;
  category: string;
  x: number;
  y: number;
  id: number;
}

interface ClientNodeProps {
  node: NodeData;
  mouseX: any;
  mouseY: any;
  entered: boolean;
}

const ClientNode: React.FC<ClientNodeProps> = ({ node, mouseX, mouseY, entered }) => {
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform([mouseX, mouseY], ([mx, my]) => {
    const dx = node.x - (mx as number);
    const dy = node.y - (my as number);
    return Math.sqrt(dx * dx + dy * dy);
  });

  const x = useTransform([mouseX, mouseY, distance], ([mx, my, dist]) => {
    const dx = node.x - (mx as number);
    const dy = node.y - (my as number);
    const d = dist as number;
    let repelX = 0;
    if (d < 400) {
      repelX = Math.cos(Math.atan2(dy, dx)) * (1 - d / 400) * 180;
    }
    return node.x + (mx as number) * 0.05 + repelX;
  });

  const y = useTransform([mouseX, mouseY, distance], ([mx, my, dist]) => {
    const dx = node.x - (mx as number);
    const dy = node.y - (my as number);
    const d = dist as number;
    let repelY = 0;
    if (d < 400) {
      repelY = Math.sin(Math.atan2(dy, dx)) * (1 - d / 400) * 180;
    }
    return node.y + (my as number) * 0.05 + repelY;
  });

  const scale = useTransform(distance, (d) =>
    d < 300 ? 1 + Math.pow(1 - d / 300, 2) * 1.6 : 1
  );
  const proximity = useTransform(distance, (d) => (d < 300 ? 1 : 0.5));

  return (
    <motion.div
      style={{ x, y, zIndex: isHovered ? 50 : 10, willChange: 'transform' }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation"
      initial={{ opacity: 0 }}
      animate={entered ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: node.id * 0.016, duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <motion.div style={{ scale, opacity: proximity }} className="flex flex-col items-center justify-center">
        {/* Node dot */}
        <motion.div
          className="rounded-full mb-2"
          style={{ width: 6, height: 6 }}
          animate={{
            backgroundColor: isHovered ? '#FFB800' : 'rgba(255,255,255,0.75)',
            boxShadow: isHovered
              ? '0 0 18px 5px #FFB800, 0 0 40px 10px rgba(255,184,0,0.25)'
              : '0 0 5px 1px rgba(255,255,255,0.15)',
          }}
          transition={{ duration: 0.18 }}
        />
        {/* Name */}
        <motion.h3
          className="text-[10px] md:text-[11px] font-bold leading-none tracking-tight whitespace-nowrap"
          animate={{ color: isHovered ? '#ffffff' : '#888888' }}
          transition={{ duration: 0.15 }}
        >
          {node.name}
        </motion.h3>
        {/* Category — only shown when scaled up enough */}
        <motion.span
          className="text-[6px] uppercase tracking-widest text-[#FFB800] mt-1 absolute top-full whitespace-nowrap"
          style={{ opacity: useTransform(scale, (s) => (s > 1.9 ? 1 : 0)) }}
        >
          {node.category}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Clients: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - r.left - r.width / 2);
    mouseY.set(e.clientY - r.top - r.height / 2);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const t = e.touches[0];
    const r = containerRef.current.getBoundingClientRect();
    mouseX.set(t.clientX - r.left - r.width / 2);
    mouseY.set(t.clientY - r.top - r.height / 2);
  };

  // Precompute node positions + constellation edges
  const { nodes, lines } = useMemo(() => {
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const nodes: NodeData[] = CLIENT_LIST.map((c, i) => {
      const n = i + 1;
      const r = SPACING * Math.sqrt(n);
      const theta = n * GOLDEN_ANGLE;
      return { ...c, x: r * Math.cos(theta), y: r * Math.sin(theta), id: i };
    });

    const lines: { x1: number; y1: number; x2: number; y2: number; len: number; key: string }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len < 175) {
          lines.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y, len, key: `${i}-${j}` });
        }
      }
    }
    return { nodes, lines };
  }, []);

  return (
    <section
      id="clients"
      ref={containerRef}
      className="relative w-full h-[100vh] bg-black overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Minimal header — OUR PARTNERS + brand count only */}
      <div
        className="absolute top-8 left-0 w-full z-20 pointer-events-none"
        style={{ paddingLeft: 'var(--header-pad, 1.5rem)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-baseline gap-5"
        >
          <span className="text-[#FFB800] font-bold tracking-[0.3em] text-xs uppercase">
            OUR PARTNERS
          </span>
          <span className="text-white/20 text-xs tracking-widest font-light tabular-nums">
            {CLIENT_LIST.length} BRANDS
          </span>
        </motion.div>
      </div>

      {/* Constellation map */}
      <motion.div
        className="relative flex-1 flex items-center justify-center z-10"
        onViewportEnter={() => setHasEntered(true)}
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Container anchored at center (0,0) */}
        <div
          className="relative scale-[0.42] sm:scale-[0.65] md:scale-[0.82] lg:scale-100 origin-center"
          style={{ width: 0, height: 0 }}
        >
          {/* ── SVG constellation lines — draw-on effect via strokeDashoffset ── */}
          <svg
            className="absolute pointer-events-none"
            style={{ left: '-660px', top: '-660px', width: '1320px', height: '1320px', overflow: 'visible' }}
          >
            {lines.map((line, i) => (
              <line
                key={line.key}
                x1={line.x1 + 660}
                y1={line.y1 + 660}
                x2={line.x2 + 660}
                y2={line.y2 + 660}
                stroke="#FFB800"
                strokeWidth="0.7"
                strokeLinecap="round"
                strokeDasharray={line.len}
                strokeDashoffset={hasEntered ? 0 : line.len}
                style={{
                  opacity: hasEntered ? 0.2 : 0,
                  // CSS transitions handle the draw-on — better perf than framer-motion for many SVG lines
                  transition: [
                    `stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1) ${(0.15 + i * 0.011).toFixed(3)}s`,
                    `opacity 0.5s ease ${(0.3 + i * 0.011).toFixed(3)}s`,
                  ].join(', '),
                }}
              />
            ))}
          </svg>

          {/* ── Client nodes ── */}
          {nodes.map((node) => (
            <ClientNode
              key={node.id}
              node={node}
              mouseX={smoothMouseX}
              mouseY={smoothMouseY}
              entered={hasEntered}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Clients;
