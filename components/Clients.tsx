import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

// ── 최고의 파트너 배경: 사진 포폴 메인컷 빠르게 순환 (대표 룰 2026-06-13) ──
const PHOTOS = [
  '/hero/pepsi-festa.webp', '/hero/hd-hyundai.webp', '/hero/royal-salute.webp', '/hero/banyan-tree.webp', '/hero/varilux-seoul.webp',
  '/people/beethoven-00.webp', '/people/dong-wook-00.webp', '/people/dong-wook-01.webp', '/people/estevan-00.webp', '/people/estevan-01.webp',
  '/people/laon-band-00.webp', '/people/thenewgrey-00.webp', '/people/thenewgrey-01.webp',
];

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;

const PhotoReel: React.FC = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % PHOTOS.length), 1600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {PHOTOS.map((src, idx) => (
        <div key={src} className={`absolute inset-0 transition-opacity duration-[1100ms] ${i === idx ? 'opacity-100' : 'opacity-0'}`}>
          <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" style={{ filter: 'brightness(0.26) saturate(0.9)' }} />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/45" />
    </div>
  );
};

interface ClientNode {
  name: string;
  x: number;
  y: number;
  size?: 'lg' | 'md' | 'sm';
}

const CX = 50;
const CY = 52;

const NODES: ClientNode[] = [
  { name: 'SAMSUNG',        x: 12,  y: 18,  size: 'lg' },
  { name: 'HYUNDAI',        x: 28,  y: 8,   size: 'lg' },
  { name: 'PEPSI',          x: 50,  y: 12,  size: 'lg' },
  { name: 'EMIRATES',       x: 72,  y: 7,   size: 'lg' },
  { name: 'KIA',            x: 88,  y: 22,  size: 'md' },
  { name: 'DIOR',           x: 82,  y: 40,  size: 'md' },
  { name: 'CALVIN KLEIN',   x: 92,  y: 58,  size: 'md' },
  { name: 'ELLE',           x: 80,  y: 72,  size: 'md' },
  { name: 'OLIVE YOUNG',    x: 62,  y: 83,  size: 'md' },
  { name: 'AMOREPACIFIC',   x: 44,  y: 89,  size: 'md' },
  { name: 'COWAY',          x: 26,  y: 80,  size: 'md' },
  { name: 'JUNG SAEM MOOL', x: 10,  y: 70,  size: 'sm' },
  { name: 'KBS',            x: 6,   y: 52,  size: 'md' },
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
  { name: 'POSCO',          x: 14,  y: 94,  size: 'md' },
  { name: 'INNOCEAN',       x: 38,  y: 4,   size: 'md' },
  { name: 'CHEIL',          x: 62,  y: 96,  size: 'md' },
  { name: 'SBS',            x: 80,  y: 56,  size: 'md' },
  { name: 'tvN',            x: 76,  y: 17,  size: 'md' },
  { name: 'TBC',            x: 90,  y: 46,  size: 'md' },
  { name: 'CJ',             x: 6,   y: 82,  size: 'md' },
  { name: 'HANATOUR',       x: 48,  y: 40,  size: 'md' },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [4, 5], [5, 6], [6, 7],
  [7, 8], [8, 9], [9, 10], [10, 11],
  [11, 12], [12, 13], [13, 0],
  [1, 14], [14, 15], [15, 16], [16, 17],
  [17, 18], [18, 19], [19, 20],
  [20, 21], [21, 22], [22, 23],
  [23, 24], [24, 25],
  [10, 22], [9, 21], [2, 16],
  [13, 32], [12, 26], [8, 28],
];

const NodeLabel: React.FC<{ node: ClientNode }> = ({ node }) => (
  <span
    style={{
      fontFamily: 'Manrope, sans-serif',
      fontSize: node.size === 'lg'
        ? 'clamp(11px, 1.3vw, 15px)'
        : node.size === 'md'
        ? 'clamp(9px, 1.1vw, 13px)'
        : 'clamp(8px, 0.9vw, 11px)',
      fontWeight: node.size === 'lg' ? 800 : node.size === 'md' ? 700 : 600,
      letterSpacing: '0.06em',
      color: node.size === 'lg'
        ? 'rgba(255,255,255,1)'
        : node.size === 'md'
        ? 'rgba(255,255,255,0.85)'
        : 'rgba(255,255,255,0.6)',
      whiteSpace: 'nowrap',
      textShadow: node.size === 'lg' ? '0 0 20px rgba(255,255,255,0.15)' : 'none',
    }}
  >
    {node.name}
  </span>
);

const Clients: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // tier visibility (lg → md → sm)
  const [lgVisible, setLgVisible] = useState(false);
  const [mdVisible, setMdVisible] = useState(false);
  const [smVisible, setSmVisible] = useState(false);

  // spread: 2.6 (scattered) → 1.0 (final constellation)
  const [spread, setSpread] = useState(2.6);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // tier gates
    // 한 번 스크롤에 쫙 모이게 — 게이트·수렴 앞당김 (대표 룰 2026-06-11)
    if (v >= 0.04)  setLgVisible(true);
    if (v >= 0.16)  setMdVisible(true);
    if (v >= 0.30)  setSmVisible(true);

    // spread converges 0.06 → 0.48 (빠르게 모이고 지나감)
    const sp = Math.max(0, Math.min(1, (v - 0.06) / 0.42));
    // easeOutExpo — "슈우웅" 확 들어와서 부드럽게 감속 (리니어/약한 S곡선 제거, NADAUN out-expo 룰)
    const eased = sp >= 1 ? 1 : 1 - Math.pow(2, -10 * sp);
    setSpread(2.6 - eased * 1.6);
  });

  // 스프링 댐핑 — 스크러빙 부드럽게 (대표 룰 2026-06-13)
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.0005 });
  const headerOp   = useTransform(smooth, [0.00, 0.08], [0, 1]);
  const headerY    = useTransform(smooth, [0.00, 0.08], ['20px', '0px']);
  const lineOp     = useTransform(smooth, [0.55, 0.85], [0, 0.35]);
  const counterOp  = useTransform(smooth, [0.70, 0.90], [0, 1]);

  // live count label: "4 BRANDS" → "11 BRANDS" → "37 BRANDS"
  const lgCount = NODES.filter(n => n.size === 'lg').length;
  const mdCount = NODES.filter(n => n.size !== 'sm').length;
  const count = smVisible ? NODES.length : mdVisible ? mdCount : lgVisible ? lgCount : 0;

  const computed = NODES.map(n => ({
    ...n,
    cx: CX + (n.x - CX) * spread,
    cy: CY + (n.y - CY) * spread,
  }));

  // per-tier node indices for stagger delays
  const lgNodes = NODES.map((n, i) => ({ ...n, i })).filter(n => n.size === 'lg');
  const mdNodes = NODES.map((n, i) => ({ ...n, i })).filter(n => n.size === 'md');
  const smNodes = NODES.map((n, i) => ({ ...n, i })).filter(n => n.size === 'sm');

  const getDelay = (node: { size?: string; i: number }) => {
    if (node.size === 'lg') return lgNodes.findIndex(n => n.i === node.i) * 0.06;
    if (node.size === 'md') return mdNodes.findIndex(n => n.i === node.i) * 0.04;
    return smNodes.findIndex(n => n.i === node.i) * 0.025;
  };

  const isVisible = (size?: string) =>
    size === 'lg' ? lgVisible : size === 'md' ? mdVisible : smVisible;

  return (
    // Tall outer — provides scroll distance
    <div ref={sectionRef} style={{ height: '150vh' }} className="relative">

      <div className="sticky top-0 w-full h-screen bg-black overflow-hidden">

        {/* 사진 포폴 메인컷 빠른 순환 배경 */}
        <PhotoReel />

        {/* Dot grid */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        <div className="relative z-10 h-full flex flex-col px-8 md:px-16 lg:px-24 pt-16 pb-10">

          {/* Header */}
          <motion.div style={{ opacity: headerOp, y: headerY }} className="mb-8 flex items-baseline justify-between shrink-0">
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-white/40 font-light mb-3">
                OUR PARTNERS
              </p>
              <h2
                className="font-black leading-none text-white"
                style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
              >
                최고의 파트너
              </h2>
            </div>
            <motion.p style={{ opacity: counterOp }} className="text-white/20 text-xs tracking-widest hidden md:block tabular-nums">
              {count}+ BRANDS
            </motion.p>
          </motion.div>

          {/* Constellation (PC) / 파트너 리스트 (모바일) */}
          {/* 클러스터 호흡 — 펼쳐졌다 모여드는 왔다갔다 (PC만) 대표 룰 2026-06-13 */}
          <motion.div
            className="relative flex-1"
            style={{ transformOrigin: 'center center' }}
            animate={IS_MOBILE ? undefined : { scale: [1, 1.14, 1] }}
            transition={IS_MOBILE ? undefined : { duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          >

            {IS_MOBILE && (
              <div className="absolute inset-0 flex flex-wrap content-center justify-center items-center gap-x-4 gap-y-3.5 px-2">
                {NODES.map((n, i) => (
                  <motion.span
                    key={n.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5%' }}
                    transition={{ duration: 0.34, delay: Math.min(i * 0.018, 0.5), ease: [0.16, 1, 0.3, 1] }}
                    className="font-bold tracking-tight leading-none"
                    style={{
                      color: n.size === 'lg' ? 'rgba(255,255,255,0.95)' : n.size === 'md' ? 'rgba(255,255,255,0.62)' : 'rgba(255,255,255,0.4)',
                      fontSize: n.size === 'lg' ? '1.2rem' : n.size === 'md' ? '0.98rem' : '0.82rem',
                    }}
                  >
                    {n.name}
                  </motion.span>
                ))}
              </div>
            )}

            {/* SVG lines (PC only) */}
            {!IS_MOBILE && <motion.svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible', opacity: lineOp }}>
              {EDGES.map(([ai, bi], ei) => {
                const a = computed[ai];
                const b = computed[bi];
                if (!a || !b) return null;
                return (
                  <line
                    key={ei}
                    x1={`${a.cx}%`} y1={`${a.cy}%`}
                    x2={`${b.cx}%`} y2={`${b.cy}%`}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="0.5"
                  />
                );
              })}
            </motion.svg>}

            {/* Nodes (PC only) */}
            {!IS_MOBILE && computed.map((node, i) => {
              const dotSize = node.size === 'lg' ? 7 : node.size === 'md' ? 5 : 3;
              const dotColor = node.size === 'lg' ? 'rgba(255,255,255,0.9)'
                : node.size === 'md' ? 'rgba(255,255,255,0.5)'
                : 'rgba(255,255,255,0.25)';
              const visible = isVisible(node.size);
              const delay = getDelay({ ...node, i });

              return (
                <motion.div
                  key={node.name}
                  className="absolute flex flex-col items-center cursor-default"
                  style={{
                    left: `${node.cx}%`,
                    top: `${node.cy}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: node.size === 'lg' ? 3 : node.size === 'md' ? 2 : 1,
                  }}
                  animate={visible
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.7 }
                  }
                  transition={{ duration: 0.234, delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* 은은한 부유 모션 — 집약된 채 살아있게 */}
                  <motion.div
                    className="flex flex-col items-center"
                    animate={{ y: [0, -6 - (i % 3) * 2, 0], x: [0, (i % 2 ? 3 : -3), 0] }}
                    transition={{ duration: 4.5 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: (i % 7) * 0.28 }}
                  >
                    <div
                      className="rounded-full mb-1.5"
                      style={{ width: dotSize, height: dotSize, backgroundColor: dotColor }}
                    />
                    <NodeLabel node={node} />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Clients;
