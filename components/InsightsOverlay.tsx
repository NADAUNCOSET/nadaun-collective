import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import { X } from 'lucide-react';

const HEADER_H = 57;

// ── 송출영상 풀스크린 배경 (LIVERNOVO 송출분) — R2 website/video, 무음 순환, 어둡게 ──
const VideoBg: React.FC = () => {
  const [vids, setVids] = useState<{ src: string; channel: string }[]>([]);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    fetch('/livernovo-videos.json')
      .then(r => r.json())
      .then((m: any[]) => {
        const list = (Array.isArray(m) ? m : [])
          .filter(x => x && x.src && String(x.project || '').includes('livernovo'));
        if (list.length) setVids(list);
      })
      .catch(() => {});
  }, []);
  if (!vids.length) return null;
  const cur = vids[idx % vids.length];
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        key={cur.src}
        src={cur.src}
        autoPlay muted playsInline preload="auto"
        onEnded={() => setIdx(i => (i + 1) % vids.length)}
        onError={() => setIdx(i => (i + 1) % vids.length)}
        className="w-full h-full object-cover"
        style={{ opacity: 0.42 }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(7,7,7,0.55) 0%, rgba(7,7,7,0.32) 45%, rgba(7,7,7,0.7) 100%)' }} />
    </div>
  );
};

const H_W = 320, H2 = 240, H3 = 320; // 스크러빙 더 단축 — 빨리 지나가게 (대표 룰 2026-06-13)
const TOTAL = H_W + H2 + H3;

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

  // 세로 스택 — 차례대로 나타나 한 화면에 모두 남음 (대표 룰, About Ch1 패턴 통일 2026-06-12)
  const l1Op = useTransform(p, [0.06, 0.18], [0, 1]);
  const l1Y  = useTransform(p, [0.06, 0.18], ['40px', '0px']);
  const l2Op = useTransform(p, [0.24, 0.36], [0, 1]);
  const l2Y  = useTransform(p, [0.24, 0.36], ['40px', '0px']);
  const l3Op = useTransform(p, [0.42, 0.54], [0, 1]);
  const l3Y  = useTransform(p, [0.42, 0.54], ['40px', '0px']);
  const exitOp = useTransform(p, [0.84, 0.96], [1, 0]);
  const exitY  = useTransform(p, [0.84, 0.96], ['0px', '-50px']);

  const FS_L = { fontSize: 'clamp(2.6rem, 9vw, 7.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05 } as const;

  return (
    <div style={{ height: `${H_W}vh` }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
           className="relative overflow-hidden flex items-center">
        <p className="absolute top-8 left-8 md:left-16 lg:left-24 text-xs tracking-[0.4em] uppercase text-[#FFB800]/60 font-bold">
          LIVERNOVO · 2025.10~11 캠페인 결과
        </p>

        {/* 캠페인 임팩트 — 세로 스택, 차례대로 나타나 한 화면에 모두 남음 */}
        <motion.div style={{ opacity: exitOp, y: exitY, willChange: 'transform, opacity' }}
          className="absolute inset-0 flex flex-col justify-center gap-1 px-8 md:px-16 lg:px-24">
          <motion.div style={{ opacity: l1Op, y: l1Y, ...FS_L, willChange: 'transform' }} className="whitespace-nowrap">
            <span style={{ color: 'white' }}>4,190만+</span> <span style={{ color: '#FFB800' }}>도달.</span>
          </motion.div>
          <motion.div style={{ opacity: l2Op, y: l2Y, ...FS_L, willChange: 'transform' }} className="whitespace-nowrap">
            <span style={{ color: 'white' }}>1,296회</span> <span style={{ color: '#FFB800' }}>송출.</span>
          </motion.div>
          <motion.div style={{ opacity: l3Op, y: l3Y, ...FS_L, color: 'white', willChange: 'transform' }} className="whitespace-nowrap">
            초과달성.
          </motion.div>
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

  // 4개 스탯 세로 스택 — 차례대로 나타나 한 화면에 모두 남음 (대표 룰, About Ch1 패턴 통일 2026-06-12)
  const titleOp = useTransform(p, [0.00, 0.08], [0, 1]);
  const r1Op = useTransform(p, [0.06, 0.16], [0, 1]); const r1Y = useTransform(p, [0.06, 0.16], ['40px', '0px']);
  const r2Op = useTransform(p, [0.18, 0.28], [0, 1]); const r2Y = useTransform(p, [0.18, 0.28], ['40px', '0px']);
  const r3Op = useTransform(p, [0.30, 0.40], [0, 1]); const r3Y = useTransform(p, [0.30, 0.40], ['40px', '0px']);
  const r4Op = useTransform(p, [0.42, 0.52], [0, 1]); const r4Y = useTransform(p, [0.42, 0.52], ['40px', '0px']);

  const footerOp = useTransform(p, [0.80, 0.94], [0, 1]);

  const NUM = { fontSize: 'clamp(2.4rem, 7vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 } as const;
  const LBL = { fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em' } as const;

  return (
    <div style={{ height: `${H3}vh` }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
           className="relative overflow-hidden flex flex-col justify-center px-8 md:px-16 lg:px-24">

        <motion.p style={{ opacity: titleOp }}
          className="text-[11px] tracking-[0.4em] uppercase text-[#FFB800]/70 font-bold mb-8 md:mb-10">
          CAMPAIGN RESULTS — 전 매체 합산
        </motion.p>

        <div className="flex flex-col gap-5 md:gap-7 max-w-5xl">
          {/* PP */}
          <motion.div style={{ opacity: r1Op, y: r1Y, willChange: 'transform' }} className="border-t border-white/10 pt-4 md:pt-5">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#FFB800]/70 font-bold mb-2">PP · JTBC · tvN · OCN · JTBC4</p>
            <div className="flex items-baseline gap-x-4 gap-y-1 flex-wrap">
              <span style={{ ...NUM, color: 'white' }}>1,296회</span>
              <span style={{ ...LBL, color: '#FFB800' }}>송출.</span>
              <span className="text-white/35 ml-auto" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.2rem)' }}>계약 311회 대비 <strong className="text-[#FFB800]">416%</strong> 달성</span>
            </div>
          </motion.div>
          {/* IPTV */}
          <motion.div style={{ opacity: r2Op, y: r2Y, willChange: 'transform' }} className="border-t border-white/10 pt-4 md:pt-5">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#FFB800]/70 font-bold mb-2">IPTV · KT LiveAD · LG ART · SK SBA</p>
            <div className="flex items-baseline gap-x-4 gap-y-1 flex-wrap">
              <span style={{ ...NUM, color: '#FFB800' }}>1,206만</span>
              <span style={{ ...LBL, color: 'white' }}>노출.</span>
              <span className="text-white/35 ml-auto" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.2rem)' }}>IPTV 3사 통합 광고 노출 수</span>
            </div>
          </motion.div>
          {/* CABLE */}
          <motion.div style={{ opacity: r3Op, y: r3Y, willChange: 'transform' }} className="border-t border-white/10 pt-4 md:pt-5">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#FFB800]/70 font-bold mb-2">CABLE · 딜라이브 재핑 · 전국</p>
            <div className="flex items-baseline gap-x-4 gap-y-1 flex-wrap">
              <span style={{ ...NUM, color: 'white' }}>2,983만</span>
              <span style={{ ...LBL, color: '#FFB800' }}>가구.</span>
              <span className="text-white/35 ml-auto" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.2rem)' }}>케이블 재핑 전국 가구 도달</span>
            </div>
          </motion.div>
          {/* TOTAL */}
          <motion.div style={{ opacity: r4Op, y: r4Y, willChange: 'transform' }} className="border-t border-[#FFB800]/30 pt-4 md:pt-5">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#FFB800] font-bold mb-2">TOTAL CAMPAIGN IMPRESSION</p>
            <div className="flex items-baseline gap-x-4 gap-y-1 flex-wrap">
              <span style={{ ...NUM, color: '#FFB800' }}>4,190만+</span>
              <span style={{ ...LBL, color: 'white' }}>도달.</span>
              <span className="text-white/35 ml-auto" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.2rem)' }}>PP + IPTV + 케이블 전 매체 합산</span>
            </div>
          </motion.div>
        </div>

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
          transition={{ duration: 0.421, ease: [0.22, 1, 0.36, 1] }}
        >
          <VideoBg />
          <motion.div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FFB800] origin-left z-20" style={{ scaleX }} />
          <div className="relative z-10 shrink-0 flex items-center justify-between px-8 md:px-16 border-b border-white/10 bg-[#070707]/95 backdrop-blur-md" style={{ height: HEADER_H }}>
            <span className="text-xs font-bold tracking-[0.3em] text-[#FFB800] uppercase">Campaign Results</span>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:border-white/40 hover:bg-white/8 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-scroll" style={{ scrollbarWidth: 'none' }}>
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
