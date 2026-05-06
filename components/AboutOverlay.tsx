import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import { X } from 'lucide-react';

const HEADER_H = 57;

// Chapter heights (vh)
const H1 = 250, H2 = 270, H3 = 360, H4 = 270, H5 = 220;
const TOTAL = H1 + H2 + H3 + H4 + H5; // 1370

// Normalized start/end for each chapter
const C1S = 0,               C1E = H1 / TOTAL;
const C2S = C1E,             C2E = (H1 + H2) / TOTAL;
const C3S = C2E,             C3E = (H1 + H2 + H3) / TOTAL;
const C4S = C3E,             C4E = (H1 + H2 + H3 + H4) / TOTAL;
const C5S = C4E,             C5E = 1;

const TIMELINE = [
  { year: '2020', title: '사진 장비 판매샵' },
  { year: '2021', title: '사진·영상 판매샵' },
  { year: '2022', title: '렌탈샵 확장 및 제작업' },
  { year: '2023', title: '브랜드 필름·VCR 제작' },
  { year: '2024', title: '난컴퍼니 설립 · MCN' },
  { year: '2025', title: 'TVC 송출 · 오프라인 광고' },
  { year: '2026', title: 'ALL IN ONE 에이전시', highlight: true },
];

const PARTNERS = [
  'SAMSUNG', 'HD HYUNDAI', 'HYUNDAI STEEL', 'KIA', 'EMIRATES', 'PEPSI', 'COWAY',
  'AMOREPACIFIC', 'DIOR BEAUTY', 'CALVIN KLEIN', 'OLIVE YOUNG', 'NUMBUZIN',
  'DASIQUE', 'SKINFOOD', 'TONYMOLY', 'ABIB', 'SKIN1004', 'JUNG SAEM MOOL',
  'GAONCHIPS', 'HECTO INNOVATION', 'ACMÉ DE LA VIE', 'THE NEW GREY', 'NUDAKE',
  'ELLE', 'THE MATTERS', 'M2', 'AENTIO', 'PAT', 'K2 SAFETY', 'KWDA', 'KOVA',
  'BEREX', 'PREED', 'MIRAEMI', '3 HOURS AHEAD', 'CESTI', 'ROOTONIX',
];

const StickyPanel: React.FC<{ children: React.ReactNode; centered?: boolean }> = ({ children, centered }) => (
  <div
    style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
    className={`flex flex-col ${centered ? 'items-center justify-center text-center' : 'justify-center px-8 md:px-16 lg:px-24'} overflow-hidden`}
  >
    {children}
  </div>
);

// ── Chapter 1 ─────────────────────────────────────────────────────────────────
const Chapter1: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C1S, C1E], [0, 1]);
  const exitOp = useTransform(p, [0.5, 0.82], [1, 0]);
  const exitY  = useTransform(p, [0.5, 0.82], ['0%', '-8%']);
  const tagOp  = useTransform(p, [0.05, 0.28, 0.5, 0.78], [0, 1, 1, 0]);

  return (
    <div style={{ height: `${H1}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, y: exitY }}>
          <p className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-8 font-bold">
            NADAUN COLLECTIVE — Since 2020, Seoul
          </p>
          <h1 className="font-black tracking-[-0.03em] leading-[0.85] text-white"
            style={{ fontSize: 'clamp(5rem, 19vw, 15rem)' }}>HAIEND</h1>
          <h1 className="font-black tracking-[-0.03em] leading-[0.85]"
            style={{ fontSize: 'clamp(5rem, 19vw, 15rem)', color: '#FFB800' }}>CONTENT</h1>
          <h1 className="font-black tracking-[-0.03em] leading-[0.85] text-white"
            style={{ fontSize: 'clamp(5rem, 19vw, 15rem)' }}>SOLUTION</h1>
          <motion.p style={{ opacity: tagOp }}
            className="mt-10 text-white/75 text-lg md:text-2xl font-light leading-relaxed max-w-xl"
          >
            최첨단 장비와 기술, 정제된 디자인 감각이 결합된<br />
            하이엔드 콘텐츠 솔루션 그룹
          </motion.p>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Chapter 2 ─────────────────────────────────────────────────────────────────
const Chapter2: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C2S, C2E], [0, 1]);

  // "올인원" — enters early, stays
  const line1Op = useTransform(p, [0.00, 0.16], [0, 1]);
  const line1Y  = useTransform(p, [0.00, 0.16], ['5%', '0%']);

  // "에이전시." — starts very faint, progressively darkens with scroll
  const line2Y   = useTransform(p, [0.10, 0.22], ['5%', '0%']);
  const agencyColor = useTransform(p, [0.10, 0.68], [
    'rgba(255,255,255,0.06)',
    'rgba(255,255,255,1.00)',
  ]);

  // Body text + pills — appear after "에이전시" is mostly visible
  const bodyOp = useTransform(p, [0.42, 0.60], [0, 1]);
  const bodyY  = useTransform(p, [0.42, 0.60], ['3%', '0%']);
  const pillOp = useTransform(p, [0.56, 0.74], [0, 1]);

  // Exit
  const exitOp = useTransform(p, [0.78, 0.96], [1, 0]);
  const exitY  = useTransform(p, [0.78, 0.96], ['0%', '-5%']);

  return (
    <div style={{ height: `${H2}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, y: exitY }}>
          <p className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-10 font-bold">WHO WE ARE</p>
          <motion.h2
            style={{ opacity: line1Op, y: line1Y, fontSize: 'clamp(4.5rem, 17vw, 14rem)' }}
            className="font-black tracking-[-0.03em] leading-[0.85] text-white block"
          >올인원</motion.h2>
          <motion.h2
            style={{ y: line2Y, color: agencyColor, fontSize: 'clamp(4.5rem, 17vw, 14rem)' }}
            className="font-black tracking-[-0.03em] leading-[0.85] block"
          >에이전시.</motion.h2>
          <motion.p style={{ opacity: bodyOp, y: bodyY }}
            className="mt-12 text-white/75 text-xl md:text-2xl font-light leading-relaxed max-w-2xl"
          >
            커머스 제품 개발부터 유통 판매, 하이엔드 콘텐츠 제작까지 —<br />
            단 하나의 파트너로 브랜드의 모든 것을 완성합니다.
          </motion.p>
          <motion.div style={{ opacity: pillOp }} className="flex flex-wrap gap-3 mt-10">
            {['COMMERCE', 'CONTENT', 'DISTRIBUTION', 'AI STRATEGY'].map(tag => (
              <span key={tag} className="text-xs font-bold uppercase tracking-wider px-5 py-2.5 border border-white/25 rounded-full text-white/70">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Chapter 3 ─────────────────────────────────────────────────────────────────
const Chapter3: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C3S, C3E], [0, 1]);
  const titleOp    = useTransform(p, [0.00, 0.12], [0, 1]);
  const titleY     = useTransform(p, [0.00, 0.12], ['5%', '0%']);
  const lineScaleX = useTransform(p, [0.10, 0.75], [0, 1]);
  const exitOp     = useTransform(p, [0.80, 0.96], [1, 0]);

  const op0 = useTransform(p, [0.10, 0.20], [0, 1]); const y0 = useTransform(p, [0.10, 0.20], ['30px', '0px']);
  const op1 = useTransform(p, [0.20, 0.30], [0, 1]); const y1 = useTransform(p, [0.20, 0.30], ['30px', '0px']);
  const op2 = useTransform(p, [0.30, 0.40], [0, 1]); const y2 = useTransform(p, [0.30, 0.40], ['30px', '0px']);
  const op3 = useTransform(p, [0.40, 0.50], [0, 1]); const y3 = useTransform(p, [0.40, 0.50], ['30px', '0px']);
  const op4 = useTransform(p, [0.50, 0.60], [0, 1]); const y4 = useTransform(p, [0.50, 0.60], ['30px', '0px']);
  const op5 = useTransform(p, [0.60, 0.70], [0, 1]); const y5 = useTransform(p, [0.60, 0.70], ['30px', '0px']);
  const op6 = useTransform(p, [0.70, 0.78], [0, 1]); const y6 = useTransform(p, [0.70, 0.78], ['30px', '0px']);
  const ops = [op0, op1, op2, op3, op4, op5, op6];
  const ys  = [y0,  y1,  y2,  y3,  y4,  y5,  y6];

  return (
    <div style={{ height: `${H3}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp }}>
          <p className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-8 font-bold">OUR STORY</p>
          <motion.h2 style={{ opacity: titleOp, y: titleY, fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
            className="font-black tracking-[-0.03em] leading-none text-white mb-12"
          >2020 <span className="text-white/25">→</span> 2026</motion.h2>
          <div className="relative mb-12">
            <div className="h-[1px] w-full bg-white/10" />
            <motion.div className="absolute top-0 left-0 h-[1px] bg-[#FFB800] origin-left w-full"
              style={{ scaleX: lineScaleX }} />
          </div>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4 md:gap-6">
            {TIMELINE.map((item, i) => (
              <motion.div key={item.year} style={{ opacity: ops[i], y: ys[i] }} className="flex flex-col gap-2">
                <span className="font-mono font-black leading-none"
                  style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)', color: item.highlight ? '#FFB800' : 'rgba(255,255,255,0.12)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/50 font-medium">{item.year}</span>
                <p className={`text-xs md:text-sm font-semibold leading-tight ${item.highlight ? 'text-white' : 'text-white/60'}`}>
                  {item.title}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

const GLOBAL_NODES = [
  'SEOUL', 'TOKYO', 'NEW YORK', 'LONDON', 'PARIS', 'DUBAI', 'LOS ANGELES', 'SINGAPORE',
];

// ── Chapter 4 ─────────────────────────────────────────────────────────────────
const Chapter4: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C4S, C4E], [0, 1]);

  const word1Op = useTransform(p, [0.00, 0.18], [0, 1]);
  const word1Y  = useTransform(p, [0.00, 0.18], ['6%', '0%']);
  const word2Op = useTransform(p, [0.12, 0.30], [0, 1]);
  const word2Y  = useTransform(p, [0.12, 0.30], ['6%', '0%']);
  const bodyOp  = useTransform(p, [0.32, 0.50], [0, 1]);
  const nodesOp = useTransform(p, [0.44, 0.62], [0, 1]);
  const nodesY  = useTransform(p, [0.44, 0.62], ['12px', '0px']);
  const exitOp  = useTransform(p, [0.80, 0.96], [1, 0]);

  return (
    <div style={{ height: `${H4}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp }}>
          <p className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-10 font-bold">IP CONNECT — GLOBAL</p>
          <motion.h2 style={{ opacity: word1Op, y: word1Y, fontSize: 'clamp(5rem, 16vw, 13rem)' }}
            className="font-black tracking-[-0.03em] leading-[0.85] text-white block"
          >IP</motion.h2>
          <motion.h2 style={{ opacity: word2Op, y: word2Y, fontSize: 'clamp(5rem, 16vw, 13rem)', color: '#FFB800' }}
            className="font-black tracking-[-0.03em] leading-[0.85] block"
          >CONNECT.</motion.h2>
          <motion.p style={{ opacity: bodyOp }}
            className="mt-8 text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl font-light"
          >
            핵심 IP부터 글로벌 에이전시 네트워크까지 — 모든 것을 하나로 연결하는<br className="hidden md:block" />
            올인원 파트너. 세계 어디서도, 어떤 브랜드든 완성합니다.
          </motion.p>
          {/* Global nodes */}
          <motion.div style={{ opacity: nodesOp, y: nodesY }} className="flex flex-wrap gap-2 mt-8">
            {GLOBAL_NODES.map((city, i) => (
              <span
                key={city}
                className="text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-2 border border-white/15 rounded-full"
                style={{ color: i === 0 ? '#FFB800' : 'rgba(255,255,255,0.45)' }}
              >
                {i === 0 ? '● ' : '○ '}{city}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Chapter 5 ─────────────────────────────────────────────────────────────────
const Chapter5: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C5S, C5E], [0, 1]);
  const titleOp = useTransform(p, [0.00, 0.18], [0, 1]);
  const titleY  = useTransform(p, [0.00, 0.18], ['5%', '0%']);
  const gridOp  = useTransform(p, [0.14, 0.38], [0, 1]);
  const gridY   = useTransform(p, [0.14, 0.38], ['4%', '0%']);

  return (
    <div style={{ height: `${H5}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: titleOp, y: titleY }}
          className="flex items-baseline justify-between mb-12"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#FFB800] font-bold">OUR PARTNERS</p>
          <p className="text-white/40 text-xs font-mono">{PARTNERS.length}+ BRANDS</p>
        </motion.div>
        <motion.div style={{ opacity: gridOp, y: gridY }}
          className="grid grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-5"
        >
          {PARTNERS.map(name => (
            <span key={name}
              className="text-xs font-bold text-white/50 hover:text-white transition-colors tracking-wider uppercase truncate cursor-default"
            >{name}</span>
          ))}
        </motion.div>
        <motion.div style={{ opacity: gridOp }}
          className="mt-16 pt-6 border-t border-white/10 flex items-center justify-between"
        >
          <p className="text-white/30 text-[11px]">COPYRIGHT © 2026 NADAUN All Rights Reserved</p>
          <p className="text-[#FFB800] text-[11px] tracking-widest uppercase font-bold">NADAUN COLLECTIVE</p>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Main overlay ──────────────────────────────────────────────────────────────
interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutOverlay: React.FC<AboutOverlayProps> = ({ isOpen, onClose }) => {
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
          className="fixed inset-0 z-[100] bg-[#070707] text-white flex flex-col overflow-hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-[#FFB800] origin-left z-10"
            style={{ scaleX }}
          />
          <div
            className="shrink-0 flex items-center justify-between px-8 md:px-16 border-b border-white/10 bg-[#070707]/95 backdrop-blur-md"
            style={{ height: HEADER_H }}
          >
            <span className="text-xs font-bold tracking-[0.3em] text-[#FFB800] uppercase">About</span>
            <button onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:border-white/40 hover:bg-white/8 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-scroll"
            style={{ scrollbarWidth: 'none' }}
          >
            <Chapter1 g={progress} />
            <Chapter2 g={progress} />
            <Chapter3 g={progress} />
            <Chapter4 g={progress} />
            <Chapter5 g={progress} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutOverlay;
