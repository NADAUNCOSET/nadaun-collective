import React, { useRef, useEffect, useLayoutEffect } from 'react';
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
  'SAMSUNG', 'HD HYUNDAI', 'HYUNDAI STEEL', 'KIA', 'EMIRATES', 'PEPSI', 'COWAY',
  'AMOREPACIFIC', 'DIOR BEAUTY', 'CALVIN KLEIN', 'OLIVE YOUNG', 'NUMBUZIN',
  'DASIQUE', 'SKINFOOD', 'TONYMOLY', 'ABIB', 'SKIN1004', 'JUNG SAEM MOOL',
  'GAONCHIPS', 'HECTO INNOVATION', 'ACMÉ DE LA VIE', 'THE NEW GREY', 'NUDAKE',
  'ELLE', 'THE MATTERS', 'M2', 'AENTIO', 'PAT', 'K2 SAFETY', 'KWDA', 'KOVA',
  'BEREX', 'PREED', 'MIRAEMI', '3 HOURS AHEAD', 'CESTI', 'ROOTONIX',
];

// ── Shared sticky panel ───────────────────────────────────────────────────────
const StickyPanel: React.FC<{ children: React.ReactNode; centered?: boolean }> = ({ children, centered }) => (
  <div
    style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
    className={`flex flex-col ${centered ? 'items-center justify-center text-center' : 'justify-center px-8 md:px-16 lg:px-24'} overflow-hidden`}
  >
    {children}
  </div>
);

// ── Chapter 1: HAIEND CONTENT SOLUTION ── starts VISIBLE, exits on scroll ────
const Chapter1: React.FC<{ scrollRef: React.RefObject<HTMLElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, container: scrollRef, offset: ['start start', 'end start'] });

  const exitOp = useTransform(p, [0.5, 0.82], [1, 0]);
  const exitY  = useTransform(p, [0.5, 0.82], ['0%', '-8%']);
  const tagOp  = useTransform(p, [0.05, 0.25, 0.5, 0.78], [0, 1, 1, 0]);

  return (
    <div ref={ref} style={{ height: '250vh' }}>
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

// ── Chapter 2: 올인원 에이전시 ────────────────────────────────────────────────
const Chapter2: React.FC<{ scrollRef: React.RefObject<HTMLElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, container: scrollRef, offset: ['start start', 'end start'] });

  const line1Op = useTransform(p, [0.00, 0.18], [0, 1]);
  const line1Y  = useTransform(p, [0.00, 0.18], ['6%', '0%']);
  const line2Op = useTransform(p, [0.12, 0.30], [0, 1]);
  const line2Y  = useTransform(p, [0.12, 0.30], ['6%', '0%']);
  const bodyOp  = useTransform(p, [0.32, 0.50], [0, 1]);
  const bodyY   = useTransform(p, [0.32, 0.50], ['3%', '0%']);
  const pillOp  = useTransform(p, [0.46, 0.64], [0, 1]);
  const exitOp  = useTransform(p, [0.74, 0.94], [1, 0]);
  const exitY   = useTransform(p, [0.74, 0.94], ['0%', '-6%']);

  return (
    <div ref={ref} style={{ height: '270vh' }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, y: exitY }}>
          <p className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-10 font-bold">WHO WE ARE</p>
          <motion.h2 style={{ opacity: line1Op, y: line1Y,
            fontSize: 'clamp(4.5rem, 17vw, 14rem)' }}
            className="font-black tracking-[-0.03em] leading-[0.85] text-white block"
          >올인원</motion.h2>
          <motion.h2 style={{ opacity: line2Op, y: line2Y,
            fontSize: 'clamp(4.5rem, 17vw, 14rem)' }}
            className="font-black tracking-[-0.03em] leading-[0.85] text-white/30 block"
          >에이전시.</motion.h2>
          <motion.p style={{ opacity: bodyOp, y: bodyY }}
            className="mt-12 text-white/80 text-xl md:text-2xl font-light leading-relaxed max-w-2xl"
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

// ── Chapter 3: Timeline 2020→2026 ─────────────────────────────────────────────
const Chapter3: React.FC<{ scrollRef: React.RefObject<HTMLElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, container: scrollRef, offset: ['start start', 'end start'] });

  const titleOp    = useTransform(p, [0.00, 0.12], [0, 1]);
  const titleY     = useTransform(p, [0.00, 0.12], ['5%', '0%']);
  const lineScaleX = useTransform(p, [0.10, 0.75], [0, 1]);
  const exitOp     = useTransform(p, [0.80, 0.96], [1, 0]);

  const op0 = useTransform(p, [0.10, 0.20], [0, 1]);
  const op1 = useTransform(p, [0.20, 0.30], [0, 1]);
  const op2 = useTransform(p, [0.30, 0.40], [0, 1]);
  const op3 = useTransform(p, [0.40, 0.50], [0, 1]);
  const op4 = useTransform(p, [0.50, 0.60], [0, 1]);
  const op5 = useTransform(p, [0.60, 0.70], [0, 1]);
  const op6 = useTransform(p, [0.70, 0.78], [0, 1]);
  const y0  = useTransform(p, [0.10, 0.20], ['30px', '0px']);
  const y1  = useTransform(p, [0.20, 0.30], ['30px', '0px']);
  const y2  = useTransform(p, [0.30, 0.40], ['30px', '0px']);
  const y3  = useTransform(p, [0.40, 0.50], ['30px', '0px']);
  const y4  = useTransform(p, [0.50, 0.60], ['30px', '0px']);
  const y5  = useTransform(p, [0.60, 0.70], ['30px', '0px']);
  const y6  = useTransform(p, [0.70, 0.78], ['30px', '0px']);

  const ops = [op0, op1, op2, op3, op4, op5, op6];
  const ys  = [y0,  y1,  y2,  y3,  y4,  y5,  y6];

  return (
    <div ref={ref} style={{ height: '360vh' }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp }}>
          <p className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-8 font-bold">OUR STORY</p>
          <motion.h2 style={{ opacity: titleOp, y: titleY,
            fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
            className="font-black tracking-[-0.03em] leading-none text-white mb-12"
          >
            2020 <span className="text-white/25">→</span> 2026
          </motion.h2>

          {/* Scroll-drawn line */}
          <div className="relative mb-12">
            <div className="h-[1px] w-full bg-white/10" />
            <motion.div className="absolute top-0 left-0 h-[1px] bg-[#FFB800] origin-left w-full"
              style={{ scaleX: lineScaleX }} />
          </div>

          <div className="grid grid-cols-4 md:grid-cols-7 gap-4 md:gap-6">
            {TIMELINE.map((item, i) => (
              <motion.div key={item.year} style={{ opacity: ops[i], y: ys[i] }} className="flex flex-col gap-2">
                <span className="font-mono font-black leading-none"
                  style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
                    color: item.highlight ? '#FFB800' : 'rgba(255,255,255,0.12)' }}>
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

// ── Chapter 4: IP Partnership ─────────────────────────────────────────────────
const Chapter4: React.FC<{ scrollRef: React.RefObject<HTMLElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, container: scrollRef, offset: ['start start', 'end start'] });

  const word1Op = useTransform(p, [0.00, 0.18], [0, 1]);
  const word1Y  = useTransform(p, [0.00, 0.18], ['6%', '0%']);
  const word2Op = useTransform(p, [0.12, 0.30], [0, 1]);
  const word2Y  = useTransform(p, [0.12, 0.30], ['6%', '0%']);
  const bodyOp  = useTransform(p, [0.32, 0.50], [0, 1]);
  const cardOp  = useTransform(p, [0.40, 0.58], [0, 1]);
  const cardX   = useTransform(p, [0.40, 0.58], ['6%', '0%']);
  const exitOp  = useTransform(p, [0.78, 0.96], [1, 0]);

  return (
    <div ref={ref} style={{ height: '270vh' }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
        >
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-10 font-bold">IP PARTNERSHIP</p>
            <motion.h2 style={{ opacity: word1Op, y: word1Y,
              fontSize: 'clamp(5rem, 16vw, 13rem)' }}
              className="font-black tracking-[-0.03em] leading-[0.85] text-white block"
            >IP</motion.h2>
            <motion.h2 style={{ opacity: word2Op, y: word2Y,
              fontSize: 'clamp(5rem, 16vw, 13rem)' }}
              className="font-black tracking-[-0.03em] leading-[0.85] block"
              style={{ fontSize: 'clamp(5rem, 16vw, 13rem)', color: '#FFB800' }}
            >CONNECT.</motion.h2>
            <motion.p style={{ opacity: bodyOp }}
              className="mt-10 text-white/75 text-lg md:text-xl leading-relaxed max-w-md font-light"
            >
              중요 IP가 필요한 클라이언트에게 최적의 가격에 IP를 연결하여
              콘텐츠를 제작합니다. 협력사 STAR LOGIN과 함께합니다.
            </motion.p>
          </div>
          <motion.div style={{ opacity: cardOp, x: cardX }}
            className="border border-white/15 rounded-2xl overflow-hidden bg-white/[0.03]"
          >
            <img src="https://starlogin.com/wp-content/uploads/2024/10/스타로그인_홈페이지.png"
              alt="Star Login" className="w-full h-48 object-cover opacity-60"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="p-7">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#FFB800] font-bold">IP Partner</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">STAR LOGIN</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-5">
                핵심 인물 네트워크와 IP 포트폴리오로 최고의 콘텐츠 솔루션을 제공하는 파트너사.
              </p>
              <a href="https://starlogin.com" target="_blank" rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white border-b border-white/20 pb-0.5 transition-colors"
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
  const { scrollYProgress: p } = useScroll({ target: ref, container: scrollRef, offset: ['start start', 'end start'] });

  const titleOp = useTransform(p, [0.00, 0.18], [0, 1]);
  const titleY  = useTransform(p, [0.00, 0.18], ['5%', '0%']);
  const gridOp  = useTransform(p, [0.14, 0.38], [0, 1]);
  const gridY   = useTransform(p, [0.14, 0.38], ['4%', '0%']);

  return (
    <div ref={ref} style={{ height: '220vh' }}>
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
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (isOpen && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [isOpen, scrollRef]);

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
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Yellow scroll progress bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-[#FFB800] origin-left z-10"
            style={{ scaleX }}
          />

          {/* Header */}
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
