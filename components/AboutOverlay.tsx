import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { X } from 'lucide-react';

const HEADER_H = 57;

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
  'SAMSUNG','HD HYUNDAI','HYUNDAI STEEL','KIA','EMIRATES','PEPSI','COWAY',
  'AMOREPACIFIC','DIOR BEAUTY','CALVIN KLEIN','OLIVE YOUNG','NUMBUZIN',
  'DASIQUE','SKINFOOD','TONYMOLY','ABIB','SKIN1004','JUNG SAEM MOOL',
  'GAONCHIPS','HECTO INNOVATION','ACMÉ DE LA VIE','THE NEW GREY','NUDAKE',
  'ELLE','THE MATTERS','M2','AENTIO','PAT','K2 SAFETY','KWDA','KOVA',
  'BEREX','PREED','MIRAEMI','3 HOURS AHEAD','CESTI','ROOTONIX',
];

// ── Sticky wrapper ────────────────────────────────────────────────────────────
const StickyPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
    className="flex flex-col justify-center px-8 md:px-16 lg:px-20 overflow-hidden"
  >
    {children}
  </div>
);

// ── Chapter 1: HAIEND CONTENT SOLUTION ────────────────────────────────────────
// Words START visible → exit as you scroll
const Chapter1: React.FC<{ scrollRef: React.RefObject<HTMLElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    container: scrollRef,
    offset: ['start start', 'end start'],
  });

  // All 3 words visible at start, exit together
  const exitOp = useTransform(p, [0.55, 0.85], [1, 0]);
  const exitY  = useTransform(p, [0.55, 0.85], [0, -80]);
  // Tagline: fades in early, exits with the rest
  const tagOp  = useTransform(p, [0.08, 0.22, 0.55, 0.82], [0, 1, 1, 0]);

  return (
    <div ref={ref} style={{ height: '220vh' }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, y: exitY }}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#FFB800]/50 mb-6">
            NADAUN COLLECTIVE — Since 2020, Seoul
          </p>
          <h1 className="font-extrabold tracking-tighter leading-[0.88] text-white select-none"
            style={{ fontSize: 'clamp(4.5rem, 16vw, 13rem)' }}>HAIEND</h1>
          <h1 className="font-extrabold tracking-tighter leading-[0.88] select-none"
            style={{ fontSize: 'clamp(4.5rem, 16vw, 13rem)', color: '#FFB800' }}>CONTENT</h1>
          <h1 className="font-extrabold tracking-tighter leading-[0.88] text-white select-none"
            style={{ fontSize: 'clamp(4.5rem, 16vw, 13rem)' }}>SOLUTION</h1>
          <motion.p style={{ opacity: tagOp }}
            className="mt-8 text-white/35 text-base md:text-xl font-light leading-relaxed max-w-lg"
          >
            최첨단 장비와 기술, 그리고 정제된 디자인 감각이 결합된<br />
            하이엔드 콘텐츠 솔루션 그룹
          </motion.p>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Chapter 2: 올인원 에이전시 ────────────────────────────────────────────────
const Chapter2: React.FC<{ scrollRef: React.RefObject<HTMLElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    container: scrollRef,
    offset: ['start start', 'end start'],
  });

  const line1Op = useTransform(p, [0.00, 0.14], [0, 1]);
  const line1Y  = useTransform(p, [0.00, 0.14], [70, 0]);
  const line2Op = useTransform(p, [0.10, 0.24], [0, 1]);
  const line2Y  = useTransform(p, [0.10, 0.24], [70, 0]);
  const bodyOp  = useTransform(p, [0.28, 0.44], [0, 1]);
  const bodyY   = useTransform(p, [0.28, 0.44], [30, 0]);
  const pillOp  = useTransform(p, [0.42, 0.58], [0, 1]);
  const exitOp  = useTransform(p, [0.76, 0.94], [1, 0]);
  const exitY   = useTransform(p, [0.76, 0.94], [0, -60]);

  return (
    <div ref={ref} style={{ height: '230vh' }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, y: exitY }}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/20 mb-10">WHO WE ARE</p>
          <div className="overflow-hidden">
            <motion.h2 style={{ opacity: line1Op, y: line1Y,
              fontSize: 'clamp(3.5rem, 13vw, 11rem)' }}
              className="font-extrabold tracking-tighter leading-[0.9] text-white"
            >올인원</motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2 style={{ opacity: line2Op, y: line2Y,
              fontSize: 'clamp(3.5rem, 13vw, 11rem)' }}
              className="font-extrabold tracking-tighter leading-[0.9] text-white/20"
            >에이전시.</motion.h2>
          </div>
          <motion.p style={{ opacity: bodyOp, y: bodyY }}
            className="mt-10 text-white/40 text-base md:text-xl font-light leading-relaxed max-w-2xl"
          >
            커머스 제품 개발부터 유통 판매, 하이엔드 콘텐츠 제작까지 —<br />
            단 하나의 파트너로 브랜드의 모든 것을 완성합니다.
          </motion.p>
          <motion.div style={{ opacity: pillOp }} className="flex flex-wrap gap-2 mt-8">
            {['COMMERCE', 'CONTENT', 'DISTRIBUTION', 'AI STRATEGY'].map(tag => (
              <span key={tag} className="text-[11px] font-bold uppercase tracking-wider px-4 py-2 border border-white/10 rounded-full text-white/35">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Chapter 3: Timeline 2020→2026 ─────────────────────────────────────────────
// NOTE: useTransform called explicitly (not in loop) to follow hooks rules
const Chapter3: React.FC<{ scrollRef: React.RefObject<HTMLElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    container: scrollRef,
    offset: ['start start', 'end start'],
  });

  const titleOp    = useTransform(p, [0.00, 0.10], [0, 1]);
  const titleY     = useTransform(p, [0.00, 0.10], [40, 0]);
  const lineScaleX = useTransform(p, [0.08, 0.72], [0, 1]);
  const exitOp     = useTransform(p, [0.78, 0.95], [1, 0]);

  // 7 items — explicit hooks (no loop)
  const op0 = useTransform(p, [0.08, 0.17], [0, 1]);
  const op1 = useTransform(p, [0.17, 0.26], [0, 1]);
  const op2 = useTransform(p, [0.26, 0.35], [0, 1]);
  const op3 = useTransform(p, [0.35, 0.44], [0, 1]);
  const op4 = useTransform(p, [0.44, 0.53], [0, 1]);
  const op5 = useTransform(p, [0.53, 0.62], [0, 1]);
  const op6 = useTransform(p, [0.62, 0.72], [0, 1]);
  const y0  = useTransform(p, [0.08, 0.17], [24, 0]);
  const y1  = useTransform(p, [0.17, 0.26], [24, 0]);
  const y2  = useTransform(p, [0.26, 0.35], [24, 0]);
  const y3  = useTransform(p, [0.35, 0.44], [24, 0]);
  const y4  = useTransform(p, [0.44, 0.53], [24, 0]);
  const y5  = useTransform(p, [0.53, 0.62], [24, 0]);
  const y6  = useTransform(p, [0.62, 0.72], [24, 0]);

  const ops = [op0, op1, op2, op3, op4, op5, op6];
  const ys  = [y0,  y1,  y2,  y3,  y4,  y5,  y6];

  return (
    <div ref={ref} style={{ height: '340vh' }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp }}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/20 mb-8">OUR STORY</p>
          <div className="overflow-hidden mb-10">
            <motion.h2 style={{ opacity: titleOp, y: titleY,
              fontSize: 'clamp(3rem, 9vw, 8rem)' }}
              className="font-extrabold tracking-tighter leading-none text-white"
            >
              2020 <span className="text-white/15">→</span> 2026
            </motion.h2>
          </div>

          {/* Scroll-drawn horizontal line */}
          <div className="relative mb-10">
            <div className="h-[1px] w-full bg-white/8" />
            <motion.div className="absolute top-0 left-0 h-[1px] bg-[#FFB800] origin-left w-full"
              style={{ scaleX: lineScaleX }} />
          </div>

          {/* Timeline grid */}
          <div className="grid grid-cols-4 md:grid-cols-7 gap-3 md:gap-4">
            {TIMELINE.map((item, i) => (
              <motion.div key={item.year} style={{ opacity: ops[i], y: ys[i] }}
                className="flex flex-col gap-2"
              >
                <span className="font-mono font-bold leading-none"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)',
                    color: item.highlight ? '#FFB800' : 'rgba(255,255,255,0.07)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/20">{item.year}</span>
                <p className={`text-[11px] font-semibold leading-tight ${item.highlight ? 'text-white' : 'text-white/40'}`}>
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

// ── Chapter 4: IP Partnership ─────────────────────────────────────────────────
const Chapter4: React.FC<{ scrollRef: React.RefObject<HTMLElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    container: scrollRef,
    offset: ['start start', 'end start'],
  });

  const word1Op = useTransform(p, [0.00, 0.14], [0, 1]);
  const word1Y  = useTransform(p, [0.00, 0.14], [70, 0]);
  const word2Op = useTransform(p, [0.10, 0.24], [0, 1]);
  const word2Y  = useTransform(p, [0.10, 0.24], [70, 0]);
  const bodyOp  = useTransform(p, [0.28, 0.44], [0, 1]);
  const cardOp  = useTransform(p, [0.36, 0.54], [0, 1]);
  const cardX   = useTransform(p, [0.36, 0.54], [50, 0]);
  const exitOp  = useTransform(p, [0.78, 0.95], [1, 0]);

  return (
    <div ref={ref} style={{ height: '230vh' }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
        >
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/20 mb-10">IP PARTNERSHIP</p>
            <div className="overflow-hidden">
              <motion.h2 style={{ opacity: word1Op, y: word1Y,
                fontSize: 'clamp(4rem, 13vw, 10rem)' }}
                className="font-extrabold tracking-tighter leading-[0.88] text-white"
              >IP</motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2 style={{ opacity: word2Op, y: word2Y,
                fontSize: 'clamp(4rem, 13vw, 10rem)' }}
                className="font-extrabold tracking-tighter leading-[0.88] text-[#FFB800]"
              >CONNECT.</motion.h2>
            </div>
            <motion.p style={{ opacity: bodyOp }}
              className="mt-8 text-white/40 text-base leading-relaxed max-w-md font-light"
            >
              중요 IP가 필요한 클라이언트에게 최적의 가격에 IP를 연결하여
              콘텐츠를 제작합니다. 협력사 STAR LOGIN과 함께합니다.
            </motion.p>
          </div>
          <motion.div style={{ opacity: cardOp, x: cardX }}
            className="border border-white/8 rounded-2xl overflow-hidden bg-white/[0.02]"
          >
            <img src="https://starlogin.com/wp-content/uploads/2024/10/스타로그인_홈페이지.png"
              alt="Star Login" className="w-full h-44 object-cover opacity-50"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#FFB800]/60 font-bold">IP Partner</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">STAR LOGIN</h3>
              <p className="text-xs text-white/30 leading-relaxed mb-4">
                핵심 인물 네트워크와 IP 포트폴리오로 최고의 콘텐츠 솔루션을 제공하는 파트너사.
              </p>
              <a href="https://starlogin.com" target="_blank" rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-widest text-white/30 hover:text-white border-b border-white/10 pb-0.5 transition-colors"
              >starlogin.com →</a>
            </div>
          </motion.div>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Chapter 5: Partners ───────────────────────────────────────────────────────
const Chapter5: React.FC<{ scrollRef: React.RefObject<HTMLElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    container: scrollRef,
    offset: ['start start', 'end start'],
  });

  const titleOp = useTransform(p, [0.00, 0.14], [0, 1]);
  const gridOp  = useTransform(p, [0.10, 0.32], [0, 1]);
  const gridY   = useTransform(p, [0.10, 0.32], [30, 0]);

  return (
    <div ref={ref} style={{ height: '200vh' }}>
      <StickyPanel>
        <motion.div style={{ opacity: titleOp }}
          className="flex items-baseline justify-between mb-10"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/20">OUR PARTNERS</p>
          <p className="text-white/15 text-xs font-mono">{PARTNERS.length}+ BRANDS</p>
        </motion.div>
        <motion.div style={{ opacity: gridOp, y: gridY }}
          className="grid grid-cols-3 md:grid-cols-6 gap-x-5 gap-y-4"
        >
          {PARTNERS.map(name => (
            <span key={name}
              className="text-[10px] font-bold text-white/20 hover:text-white/55 transition-colors tracking-wider uppercase truncate cursor-default"
            >{name}</span>
          ))}
        </motion.div>
        <motion.div style={{ opacity: gridOp }}
          className="mt-12 pt-6 border-t border-white/6 flex items-center justify-between"
        >
          <p className="text-white/12 text-[10px]">COPYRIGHT © 2026 NADAUN All Rights Reserved</p>
          <p className="text-[#FFB800] text-[10px] tracking-widest uppercase font-bold">NADAUN COLLECTIVE</p>
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

  // Overlay-internal scroll progress → yellow bar
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (isOpen && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [isOpen]);

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
          className="fixed inset-0 z-[100] bg-[#080808] text-white flex flex-col overflow-hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Yellow scroll progress bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-[#FFB800] origin-left z-10"
            style={{ scaleX }}
          />

          {/* Fixed header */}
          <div
            className="shrink-0 flex items-center justify-between px-8 md:px-16 border-b border-white/8 bg-[#080808]/95 backdrop-blur-md"
            style={{ height: HEADER_H }}
          >
            <span className="text-xs font-bold tracking-[0.25em] text-[#FFB800] uppercase">About</span>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-white/12 hover:border-white/35 hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-scroll"
            style={{ scrollbarWidth: 'none' }}
          >
            <Chapter1 scrollRef={scrollRef as React.RefObject<HTMLElement | null>} />
            <Chapter2 scrollRef={scrollRef as React.RefObject<HTMLElement | null>} />
            <Chapter3 scrollRef={scrollRef as React.RefObject<HTMLElement | null>} />
            <Chapter4 scrollRef={scrollRef as React.RefObject<HTMLElement | null>} />
            <Chapter5 scrollRef={scrollRef as React.RefObject<HTMLElement | null>} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutOverlay;
