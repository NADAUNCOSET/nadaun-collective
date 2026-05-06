import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ClientNode {
  name: string;
  x: number; // 0–100 (%)
  y: number; // 0–100 (%)
  size?: 'lg' | 'md' | 'sm';
}

// Constellation layout — manually positioned for visual balance
const NODES: ClientNode[] = [
  { name: 'SAMSUNG',        x: 12,  y: 18,  size: 'lg' },
  { name: 'HYUNDAI',        x: 28,  y: 8,   size: 'lg' },
  { name: 'PEPSI',          x: 50,  y: 12,  size: 'lg' },
  { name: 'EMIRATES',       x: 72,  y: 7,   size: 'lg' },
  { name: 'KIA',            x: 88,  y: 22,  size: 'md' },
  { name: 'DIOR',           x: 82,  y: 40,  size: 'md' },
  { name: 'CALVIN KLEIN',   x: 92,  y: 58,  size: 'md' },
  { name: 'ELLE',           x: 80,  y: 72,  size: 'md' },
  { name: 'AMOREPACIFIC',   x: 62,  y: 82,  size: 'md' },
  { name: 'OLIVE YOUNG',    x: 44,  y: 88,  size: 'md' },
  { name: 'COWAY',          x: 26,  y: 80,  size: 'md' },
  { name: 'JUNG SAEM MOOL', x: 10,  y: 70,  size: 'sm' },
  { name: 'ACMÉ DE LA VIE', x: 6,   y: 52,  size: 'sm' },
  { name: 'HD HYUNDAI',     x: 8,   y: 36,  size: 'sm' },
  { name: 'HYUNDAI STEEL',  x: 22,  y: 28,  size: 'sm' },
  { name: 'GAONCHIPS',      x: 38,  y: 32,  size: 'sm' },
  { name: 'NUMBUZIN',       x: 55,  y: 28,  size: 'sm' },
  { name: 'TONYMOLY',       x: 68,  y: 35,  size: 'sm' },
  { name: 'SKINFOOD',       x: 74,  y: 52,  size: 'sm' },
  { name: 'THE SAEM',       x: 68,  y: 65,  size: 'sm' },
  { name: 'SKIN1004',       x: 52,  y: 62,  size: 'sm' },
  { name: 'ABIB',           x: 36,  y: 60,  size: 'sm' },
  { name: 'DASIQUE',        x: 22,  y: 52,  size: 'sm' },
  { name: 'HECTO',          x: 32,  y: 44,  size: 'sm' },
  { name: 'K2 SAFETY',      x: 46,  y: 46,  size: 'sm' },
  { name: 'KOVA',           x: 60,  y: 48,  size: 'sm' },
  { name: 'BEREX',          x: 18,  y: 62,  size: 'sm' },
  { name: 'PAT',            x: 42,  y: 72,  size: 'sm' },
  { name: 'PREED',          x: 56,  y: 75,  size: 'sm' },
  { name: 'KWDA',           x: 70,  y: 78,  size: 'sm' },
  { name: 'M2美度',          x: 84,  y: 86,  size: 'sm' },
  { name: 'THE NEW GREY',   x: 32,  y: 18,  size: 'sm' },
  { name: 'NUDAKE',         x: 18,  y: 42,  size: 'sm' },
];

// Edges to draw — pairs of node indices forming the constellation lines
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],        // top arc
  [4, 5], [5, 6], [6, 7],                // right side
  [7, 8], [8, 9], [9, 10], [10, 11],     // bottom arc
  [11, 12], [12, 13], [13, 0],           // left side
  [1, 14], [14, 15], [15, 16], [16, 17], // inner upper
  [17, 18], [18, 19], [19, 20],          // inner right
  [20, 21], [21, 22], [22, 23],          // inner middle
  [23, 24], [24, 25],                    // center
  [10, 22], [9, 21], [2, 16],            // cross-links
  [13, 32], [12, 26], [8, 29],           // extra branches
];

interface EdgeProps {
  a: ClientNode;
  b: ClientNode;
  pathLength: ReturnType<typeof useTransform>;
}

const ConstellationEdge: React.FC<EdgeProps> = ({ a, b, pathLength }) => (
  <motion.line
    x1={`${a.x}%`} y1={`${a.y}%`}
    x2={`${b.x}%`} y2={`${b.y}%`}
    stroke="rgba(255,184,0,0.25)"
    strokeWidth="0.5"
    style={{ pathLength }}
  />
);

const Clients: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'center center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} id="clients" className="relative w-full bg-black overflow-hidden" style={{ minHeight: '100vh' }}>

      {/* Dot grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <motion.div className="relative z-10 px-8 md:px-16 lg:px-24 pt-20 pb-16" style={{ opacity }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#FFB800] font-bold mb-3">
            OUR PARTNERS
          </p>
          <div className="flex items-baseline justify-between">
            <h2
              className="font-black leading-none text-white"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
            >
              {NODES.length}+ BRANDS
            </h2>
            <p className="text-white/20 text-xs tracking-widest hidden md:block">
              TRUSTED BY THE BEST
            </p>
          </div>
        </motion.div>

        {/* Constellation map */}
        <div className="relative w-full" style={{ height: 'clamp(420px, 55vw, 640px)' }}>

          {/* SVG lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
            {EDGES.map(([ai, bi], ei) => {
              const a = NODES[ai];
              const b = NODES[bi];
              if (!a || !b) return null;
              return (
                <ConstellationEdge key={ei} a={a} b={b} pathLength={pathLength} />
              );
            })}
          </svg>

          {/* Nodes */}
          {NODES.map((node, i) => {
            const delay = i * 0.025;
            const fontSize = node.size === 'lg' ? 'clamp(12px, 1.4vw, 16px)'
              : node.size === 'md' ? 'clamp(10px, 1.1vw, 13px)'
              : 'clamp(8px, 0.9vw, 10px)';

            return (
              <motion.div
                key={node.name}
                className="absolute flex flex-col items-center group"
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Dot */}
                <div
                  className="rounded-full mb-1.5 group-hover:scale-150 transition-transform duration-300"
                  style={{
                    width: node.size === 'lg' ? 6 : node.size === 'md' ? 4 : 3,
                    height: node.size === 'lg' ? 6 : node.size === 'md' ? 4 : 3,
                    backgroundColor: node.size === 'lg' ? '#FFB800'
                      : node.size === 'md' ? 'rgba(255,184,0,0.6)'
                      : 'rgba(255,255,255,0.35)',
                    boxShadow: node.size === 'lg' ? '0 0 8px rgba(255,184,0,0.6)' : 'none',
                  }}
                />
                {/* Label */}
                <span
                  className="font-bold tracking-widest whitespace-nowrap text-center group-hover:text-[#FFB800] transition-colors duration-300"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize,
                    color: node.size === 'lg' ? 'rgba(255,255,255,0.85)'
                      : node.size === 'md' ? 'rgba(255,255,255,0.55)'
                      : 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {node.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Footer label */}
        <p className="text-white/15 text-[10px] tracking-[0.4em] uppercase mt-10 text-center">
          SAMSUNG · HYUNDAI · PEPSI · EMIRATES · AMOREPACIFIC · OLIVE YOUNG +{NODES.length - 6} MORE
        </p>
      </motion.div>
    </section>
  );
};

export default Clients;
