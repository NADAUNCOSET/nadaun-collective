import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import { X } from 'lucide-react';

const HEADER_H = 57;

const H_W = 1000, H2 = 320, H3 = 700;
const TOTAL = H_W + H2 + H3; // 2020

const CWS = 0,    CWE = H_W / TOTAL;
const C2S = CWE,  C2E = (H_W + H2) / TOTAL;
const C3S = C2E,  C3E = 1;

// Real LIVERNOVO campaign data (2025.10~11)
const PP_CHANNELS = ['JTBC', 'JTBC4', 'tvN', 'OCN', 'OCN Movies', 'OCN Movies2'];

const STATS = [
  { label: 'PP 총 송출',   value: '1,296회', sub: '계약 311회 대비 416% 달성', color: '#FFB800' },
  { label: 'IPTV 3사',     value: '1,206만', sub: 'KT · LG · SK 통합 노출',    color: '#ffffff' },
  { label: '딜라이브 재핑', value: '2,983만', sub: '가구 도달 · 전국 케이블',   color: '#FFB800' },
  { label: '광고 임프레션', value: '4,190만+', sub: '총 합산 캠페인 도달',       color: '#ffffff' },
];

const StickyPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
    className="flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden"
  >
    {children}
  </div>
);

// ── ChW — 5 campaign-impact word slides ───────────────────────────────────────
const ChW: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [CWS, CWE], [0, 1]);

  const w1Op = useTransform(p, [0.00, 0.06, 0.14, 0.18], [0, 1, 1, 0]);
  const w1X  = useTransform(p, [0.00, 0.06, 0.14, 0.18], ['80vw', '0vw', '0vw', '-80vw']);
  const w2Op = useTransform(p, [0.20, 0.26, 0.34, 0.38], [0, 1, 1, 0]);
  const w2X  = useTransform(p, [0.20, 0.26, 0.34, 0.38], ['80vw', '0vw', '0vw', '-80vw']);
  const w3Op = useTransform(p, [0.40, 0.46, 0.54, 0.58], [0, 1, 1, 0]);
  const w3X  = useTransform(p, [0.40, 0.46, 0.54, 0.58], ['80vw', '0vw', '0vw', '-80vw']);
  const w4Op = useTransform(p, [0.60, 0.66, 0.74, 0.78], [0, 1, 1, 0]);
  const w4X  = useTransform(p, [0.60, 0.66, 0.74, 0.78], ['80vw', '0vw', '0vw', '-80vw']);
  const w5Op = useTransform(p, [0.80, 0.86, 0.96, 1.00], [0, 1, 1, 0]);
  const w5X  = useTransform(p, [0.80, 0.86], ['80vw', '0vw']);

  const FS_N = { fontSize: 'clamp(6rem, 24vw, 22rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 } as const;
  const FS_W = { fontSize: 'clamp(5rem, 18vw, 16rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 } as const;

  return (
    <div style={{ height: `${H_W}vh` }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
           className="relative overflow-hidden flex items-center">
        <p className="absolute top-8 left-8 md:left-16 lg:left-24 text-xs tracking-[0.4em] uppercase text-[#FFB800]/60 font-bold">
          LIVERNOVO · 2025.10~11 캠페인 결과
        </p>

        {/* 4,190만+ */}
        <motion.div style={{ opacity: w1Op, x: w1X, y: '-50%', top: '50%', position: 'absolute', left: '2rem', willChange: 'transform' }}>
          <span style={{ ...FS_N, color: 'white', display: 'block' }}>4,190만+</span>
        </motion.div>

        {/* 도달. */}
        <motion.div style={{ opacity: w2Op, x: w2X, y: '-50%', top: '50%', position: 'absolute', left: '2rem', willChange: 'transform' }}>
          <span style={{ ...FS_W, color: '#FFB800', display: 'block' }}>도달.</span>
        </motion.div>

        {/* 1,296회 */}
        <motion.div style={{ opacity: w3Op, x: w3X, y: '-50%', top: '50%', position: 'absolute', left: '2rem', willChange: 'transform' }}>
          <span style={{ ...FS_N, color: 'white', display: 'block' }}>1,296회</span>
        </motion.div>

        {/* 송출. */}
        <motion.div style={{ opacity: w4Op, x: w4X, y: '-50%', top: '50%', position: 'absolute', left: '2rem', willChange: 'transform' }}>
          <span style={{ ...FS_W, color: '#FFB800', display: 'block' }}>송출.</span>
        </motion.div>

        {/* 초과달성. */}
        <motion.div style={{ opacity: w5Op, x: w5X, y: '-50%', top: '50%', position: 'absolute', left: '2rem', willChange: 'transform' }}>
          <span style={{ ...FS_W, color: 'white', display: 'block' }}>초과달성.</span>
        </motion.div>
      </div>
    </div>
  );
};

// ── Ch2 — Campaign summary panel ─────────────────────────────────────────────
const Ch2: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C2S, C2E], [0, 1]);

  const titleOp = useTransform(p, [0.00, 0.14], [0, 1]);
  const titleX  = useTransform(p, [0.00, 0.14], ['-5%', '0%']);
  const statsOp = useTransform(p, [0.12, 0.28], [0, 1]);
  const statsX  = useTransform(p, [0.12, 0.28], ['5%', '0%']);
  const chOp    = useTransform(p, [0.28, 0.44], [0, 1]);
  const exitOp  = useTransform(p, [0.78, 0.94], [1, 0]);
  const exitX   = useTransform(p, [0.78, 0.94], ['0%', '-5%']);

  return (
    <div style={{ height: `${H2}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, x: exitX }} className="max-w-4xl">
          <motion.p style={{ opacity: titleOp, x: titleX }}
            className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-6 font-bold">
            CAMPAIGN RESULTS · PP + IPTV + CABLE
          </motion.p>
          <motion.h2 style={{ opacity: titleOp, x: titleX, fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
            className="font-black tracking-[-0.03em] leading-[0.9] text-white mb-10">
            계약 대비<br /><span style={{ color: '#FFB800' }}>416% 초과</span> 달성.
          </motion.h2>

          <motion.div style={{ opacity: statsOp, x: statsX }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {STATS.map(s => (
              <div key={s.label} className="border border-white/8 rounded-xl p-4 bg-white/[0.02]">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-bold mb-2">{s.label}</p>
                <p className="font-black leading-none mb-1" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', color: s.color, letterSpacing: '-0.03em' }}>
                  {s.value}
                </p>
                <p className="text-white/35 text-[10px] leading-relaxed">{s.sub}</p>
              </div>
            ))}
          </motion.div>

          <motion.div style={{ opacity: chOp }}>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#FFB800]/60 font-bold mb-3">집행 채널</p>
            <div className="flex flex-wrap gap-2">
              {PP_CHANNELS.map(ch => (
                <span key={ch} className="text-xs font-bold text-white/70 border border-white/12 px-3 py-1.5 rounded-full">
                  {ch}
                </span>
              ))}
              {['KT LiveAD', 'LG ART', 'SK SBA', '딜라이브 재핑'].map(ch => (
                <span key={ch} className="text-xs font-bold text-[#FFB800]/70 border border-[#FFB800]/20 px-3 py-1.5 rounded-full">
                  {ch}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Ch3 — 4 big stat word slides ──────────────────────────────────────────────
const Ch3: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C3S, C3E], [0, 1]);

  // Slide 1: PP
  const s1Op = useTransform(p, [0.00, 0.07, 0.16, 0.22], [0, 1, 1, 0]);
  const s1X  = useTransform(p, [0.00, 0.07, 0.16, 0.22], ['80vw', '0vw', '0vw', '-80vw']);
  // Slide 2: IPTV
  const s2Op = useTransform(p, [0.23, 0.30, 0.39, 0.45], [0, 1, 1, 0]);
  const s2X  = useTransform(p, [0.23, 0.30, 0.39, 0.45], ['80vw', '0vw', '0vw', '-80vw']);
  // Slide 3: 케이블
  const s3Op = useTransform(p, [0.46, 0.53, 0.62, 0.68], [0, 1, 1, 0]);
  const s3X  = useTransform(p, [0.46, 0.53, 0.62, 0.68], ['80vw', '0vw', '0vw', '-80vw']);
  // Slide 4: 총합
  const s4Op = useTransform(p, [0.69, 0.76, 0.88, 0.94], [0, 1, 1, 0]);
  const s4X  = useTransform(p, [0.69, 0.76], ['80vw', '0vw']);

  const footerOp = useTransform(p, [0.88, 1.00], [0, 1]);

  const NUM = { fontSize: 'clamp(5rem, 20vw, 18rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 } as const;
  const LBL = { fontSize: 'clamp(2.5rem, 9vw, 8rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 } as const;

  return (
    <div style={{ height: `${H3}vh` }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
           className="relative overflow-hidden flex items-center">

        {/* Slide 1: PP 송출 */}
        <motion.div style={{ opacity: s1Op, x: s1X, y: '-50%', top: '50%', position: 'absolute', left: '2rem', willChange: 'transform' }}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#FFB800]/70 font-bold mb-3">PP · JTBC · tvN · OCN · JTBC4</p>
          <span style={{ ...NUM, color: 'white', display: 'block' }}>1,296회</span>
          <span style={{ ...LBL, color: '#FFB800', display: 'block', marginTop: '0.2em' }}>송출.</span>
          <p className="text-white/35 mt-4" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)' }}>계약 311회 대비 <strong className="text-[#FFB800]">416%</strong> 달성</p>
        </motion.div>

        {/* Slide 2: IPTV */}
        <motion.div style={{ opacity: s2Op, x: s2X, y: '-50%', top: '50%', position: 'absolute', left: '2rem', willChange: 'transform' }}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#FFB800]/70 font-bold mb-3">IPTV · KT LiveAD · LG ART · SK SBA</p>
          <span style={{ ...NUM, color: '#FFB800', display: 'block' }}>1,206만</span>
          <span style={{ ...LBL, color: 'white', display: 'block', marginTop: '0.2em' }}>노출.</span>
          <p className="text-white/35 mt-4" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)' }}>IPTV 3사 통합 광고 노출 수</p>
        </motion.div>

        {/* Slide 3: 케이블/재핑 */}
        <motion.div style={{ opacity: s3Op, x: s3X, y: '-50%', top: '50%', position: 'absolute', left: '2rem', willChange: 'transform' }}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#FFB800]/70 font-bold mb-3">CABLE · 딜라이브 재핑 · 전국</p>
          <span style={{ ...NUM, color: 'white', display: 'block' }}>2,983만</span>
          <span style={{ ...LBL, color: '#FFB800', display: 'block', marginTop: '0.2em' }}>가구.</span>
          <p className="text-white/35 mt-4" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)' }}>케이블 재핑 전국 가구 도달</p>
        </motion.div>

        {/* Slide 4: 총합 */}
        <motion.div style={{ opacity: s4Op, x: s4X, y: '-50%', top: '50%', position: 'absolute', left: '2rem', willChange: 'transform' }}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#FFB800]/70 font-bold mb-3">TOTAL CAMPAIGN IMPRESSION</p>
          <span style={{ ...NUM, color: '#FFB800', display: 'block' }}>4,190만+</span>
          <span style={{ ...LBL, color: 'white', display: 'block', marginTop: '0.2em' }}>도달.</span>
          <p className="text-white/35 mt-4" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)' }}>PP + IPTV + 케이블 전 매체 합산</p>
        </motion.div>

        {/* Footer */}
        <motion.div style={{ opacity: footerOp }}
          className="absolute bottom-8 left-8 md:left-16 right-8 md:right-16 flex items-center justify-between">
          <p className="text-white/25 text-[11px]">COPYRIGHT © 2026 NADAUN All Rights Reserved</p>
          <p className="text-[#FFB800] text-[11px] tracking-widest uppercase font-bold">NADAUN COLLECTIVE</p>
        </motion.div>
      </div>
    </div>
  );
};

// ── Main overlay ──────────────────────────────────────────────────────────────
interface InsightsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const InsightsOverlay: React.FC<InsightsOverlayProps> = ({ isOpen, onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (!isOpen) return;
    const el = scrollRef.current;
    if (!el) return;
    progress.set(0);
    el.scrollTop = 0;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max > 0) progress.set(el.scrollTop / max);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [isOpen, progress]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#070707] text-white flex flex-col overflow-hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.495, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FFB800] origin-left z-10" style={{ scaleX }} />
          <div className="shrink-0 flex items-center justify-between px-8 md:px-16 border-b border-white/10 bg-[#070707]/95 backdrop-blur-md" style={{ height: HEADER_H }}>
            <span className="text-xs font-bold tracking-[0.3em] text-[#FFB800] uppercase">Campaign Results</span>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:border-white/40 hover:bg-white/8 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-scroll" style={{ scrollbarWidth: 'none' }}>
            <ChW g={progress} />
            <Ch2 g={progress} />
            <Ch3 g={progress} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InsightsOverlay;
