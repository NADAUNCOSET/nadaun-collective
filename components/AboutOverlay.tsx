import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X } from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────

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

const HEADER_H = 57; // px

// ── Scroll-scrubbed chapter components ───────────────────────────────────────

// Each chapter: a tall div (= scroll distance) + sticky content panel inside

const Chapter1: React.FC<{ scrollRef: React.RefObject<HTMLDivElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    container: scrollRef as React.RefObject<HTMLElement>,
    offset: ['start start', 'end start'],
  });

  const word1Op = useTransform(p, [0.00, 0.10], [0, 1]);
  const word1Y  = useTransform(p, [0.00, 0.10], [60, 0]);
  const word2Op = useTransform(p, [0.08, 0.18], [0, 1]);
  const word2Y  = useTransform(p, [0.08, 0.18], [60, 0]);
  const word3Op = useTransform(p, [0.16, 0.26], [0, 1]);
  const word3Y  = useTransform(p, [0.16, 0.26], [60, 0]);
  const tagOp   = useTransform(p, [0.30, 0.45], [0, 1]);
  const exitOp  = useTransform(p, [0.75, 0.95], [1, 0]);
  const exitY   = useTransform(p, [0.75, 0.95], [0, -60]);

  return (
    <div ref={ref} style={{ height: '250vh' }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
        className="flex flex-col justify-center px-8 md:px-16 lg:px-20 overflow-hidden"
      >
        <motion.div style={{ opacity: exitOp, y: exitY }}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#FFB800]/60 mb-8">
            NADAUN COLLECTIVE — Since 2020, Seoul
          </p>

          <div className="overflow-hidden">
            <motion.h1 style={{ opacity: word1Op, y: word1Y }}
              className="font-extrabold tracking-tighter leading-[0.88] text-white select-none"
              css-size="true"
              style={{ fontSize: 'clamp(5rem, 17vw, 15rem)', opacity: word1Op, y: word1Y }}
            >HAIEND</motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              style={{ fontSize: 'clamp(5rem, 17vw, 15rem)', opacity: word2Op, y: word2Y, color: '#FFB800' }}
              className="font-extrabold tracking-tighter leading-[0.88] select-none"
            >CONTENT</motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              style={{ fontSize: 'clamp(5rem, 17vw, 15rem)', opacity: word3Op, y: word3Y, color: 'white' }}
              className="font-extrabold tracking-tighter leading-[0.88] select-none"
            >SOLUTION</motion.h1>
          </div>

          <motion.p style={{ opacity: tagOp }}
            className="mt-10 text-white/35 text-base md:text-xl font-light leading-relaxed max-w-xl"
          >
            최첨단 장비와 기술, 그리고 정제된 디자인 감각이 결합된<br />
            하이엔드 콘텐츠 솔루션 그룹
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

const Chapter2: React.FC<{ scrollRef: React.RefObject<HTMLDivElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    container: scrollRef as React.RefObject<HTMLElement>,
    offset: ['start start', 'end start'],
  });

  const line1Op = useTransform(p, [0.00, 0.12], [0, 1]);
  const line1Y  = useTransform(p, [0.00, 0.12], [70, 0]);
  const line2Op = useTransform(p, [0.10, 0.22], [0, 1]);
  const line2Y  = useTransform(p, [0.10, 0.22], [70, 0]);
  const bodyOp  = useTransform(p, [0.28, 0.42], [0, 1]);
  const bodyY   = useTransform(p, [0.28, 0.42], [30, 0]);
  const pillOp  = useTransform(p, [0.40, 0.60], [0, 1]);
  const exitOp  = useTransform(p, [0.78, 0.96], [1, 0]);
  const exitY   = useTransform(p, [0.78, 0.96], [0, -50]);

  return (
    <div ref={ref} style={{ height: '250vh' }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
        className="flex flex-col justify-center px-8 md:px-16 lg:px-20 overflow-hidden"
      >
        <motion.div style={{ opacity: exitOp, y: exitY }}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/20 mb-10">WHO WE ARE</p>

          <div className="overflow-hidden">
            <motion.h2 style={{ opacity: line1Op, y: line1Y,
              fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
              className="font-extrabold tracking-tighter leading-[0.9] text-white"
            >올인원</motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2 style={{ opacity: line2Op, y: line2Y,
              fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
              className="font-extrabold tracking-tighter leading-[0.9] text-white/20"
            >에이전시.</motion.h2>
          </div>

          <motion.p style={{ opacity: bodyOp, y: bodyY }}
            className="mt-10 text-white/40 text-base md:text-lg font-light leading-relaxed max-w-2xl"
          >
            커머스 제품 개발부터 유통 판매, 하이엔드 콘텐츠 제작까지 —
            단 하나의 파트너로 브랜드의 모든 것을 완성합니다.
          </motion.p>

          <motion.div style={{ opacity: pillOp }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {['COMMERCE', 'CONTENT', 'DISTRIBUTION', 'AI STRATEGY'].map(tag => (
              <span key={tag} className="text-[11px] font-bold uppercase tracking-wider px-4 py-2 border border-white/10 rounded-full text-white/35">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const Chapter3: React.FC<{ scrollRef: React.RefObject<HTMLDivElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    container: scrollRef as React.RefObject<HTMLElement>,
    offset: ['start start', 'end start'],
  });

  const titleOp  = useTransform(p, [0.00, 0.08], [0, 1]);
  const titleY   = useTransform(p, [0.00, 0.08], [40, 0]);
  const lineScaleX = useTransform(p, [0.08, 0.70], [0, 1]);
  const exitOp   = useTransform(p, [0.80, 0.96], [1, 0]);

  // Each year appears as line draws to it
  const totalItems = TIMELINE.length;
  const itemOpacities = TIMELINE.map((_, i) => {
    const start = 0.08 + (i / totalItems) * 0.62;
    const end   = start + 0.09;
    return useTransform(p, [start, end], [0, 1]);
  });
  const itemYs = TIMELINE.map((_, i) => {
    const start = 0.08 + (i / totalItems) * 0.62;
    const end   = start + 0.09;
    return useTransform(p, [start, end], [20, 0]);
  });

  return (
    <div ref={ref} style={{ height: '320vh' }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
        className="flex flex-col justify-center px-8 md:px-16 lg:px-20 overflow-hidden"
      >
        <motion.div style={{ opacity: exitOp }}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/20 mb-8">OUR STORY</p>

          <div className="overflow-hidden mb-12">
            <motion.h2 style={{ opacity: titleOp, y: titleY,
              fontSize: 'clamp(3rem, 9vw, 8rem)' }}
              className="font-extrabold tracking-tighter leading-none text-white"
            >
              2020 <span className="text-white/15">→</span> 2026
            </motion.h2>
          </div>

          {/* Horizontal scroll-drawn line */}
          <div className="relative mb-8">
            <div className="h-[1px] w-full bg-white/8" />
            <motion.div
              className="absolute top-0 left-0 h-[1px] bg-[#FFB800] origin-left"
              style={{ scaleX: lineScaleX, width: '100%' }}
            />
          </div>

          {/* Timeline items */}
          <div className="grid grid-cols-4 md:grid-cols-7 gap-3 md:gap-4">
            {TIMELINE.map((item, i) => (
              <motion.div key={item.year}
                style={{ opacity: itemOpacities[i], y: itemYs[i] }}
                className="flex flex-col gap-2"
              >
                <span className="font-mono font-bold leading-none"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                    color: item.highlight ? '#FFB800' : 'rgba(255,255,255,0.08)',
                  }}
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
      </div>
    </div>
  );
};

const Chapter4: React.FC<{ scrollRef: React.RefObject<HTMLDivElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    container: scrollRef as React.RefObject<HTMLElement>,
    offset: ['start start', 'end start'],
  });

  const word1Op = useTransform(p, [0.00, 0.12], [0, 1]);
  const word1Y  = useTransform(p, [0.00, 0.12], [60, 0]);
  const word2Op = useTransform(p, [0.08, 0.20], [0, 1]);
  const word2Y  = useTransform(p, [0.08, 0.20], [60, 0]);
  const bodyOp  = useTransform(p, [0.25, 0.40], [0, 1]);
  const cardOp  = useTransform(p, [0.38, 0.55], [0, 1]);
  const cardX   = useTransform(p, [0.38, 0.55], [40, 0]);
  const exitOp  = useTransform(p, [0.80, 0.96], [1, 0]);

  return (
    <div ref={ref} style={{ height: '250vh' }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
        className="flex flex-col justify-center px-8 md:px-16 lg:px-20 overflow-hidden"
      >
        <motion.div style={{ opacity: exitOp }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
        >
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/20 mb-10">IP PARTNERSHIP</p>
            <div className="overflow-hidden">
              <motion.h2 style={{ opacity: word1Op, y: word1Y,
                fontSize: 'clamp(4rem, 12vw, 10rem)' }}
                className="font-extrabold tracking-tighter leading-[0.88] text-white"
              >IP</motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2 style={{ opacity: word2Op, y: word2Y,
                fontSize: 'clamp(4rem, 12vw, 10rem)' }}
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
            <img
              src="https://starlogin.com/wp-content/uploads/2024/10/스타로그인_홈페이지.png"
              alt="Star Login"
              className="w-full h-44 object-cover opacity-50"
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
                className="text-[11px] font-bold uppercase tracking-widest text-white/30 hover:text-white border-b border-white/10 hover:border-white pb-0.5 transition-colors"
              >
                starlogin.com →
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const Chapter5: React.FC<{ scrollRef: React.RefObject<HTMLDivElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    container: scrollRef as React.RefObject<HTMLElement>,
    offset: ['start start', 'end start'],
  });

  const titleOp  = useTransform(p, [0.00, 0.12], [0, 1]);
  const gridOp   = useTransform(p, [0.10, 0.30], [0, 1]);
  const gridY    = useTransform(p, [0.10, 0.30], [30, 0]);

  return (
    <div ref={ref} style={{ height: '200vh' }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
        className="flex flex-col justify-center px-8 md:px-16 lg:px-20 overflow-hidden"
      >
        <motion.div style={{ opacity: titleOp }}
          className="flex items-baseline justify-between mb-10"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/20">OUR PARTNERS</p>
          <p className="text-white/12 text-xs font-mono">{PARTNERS.length}+ BRANDS</p>
        </motion.div>

        <motion.div style={{ opacity: gridOp, y: gridY }}
          className="grid grid-cols-3 md:grid-cols-6 gap-x-5 gap-y-4"
        >
          {PARTNERS.map(p => (
            <span key={p}
              className="text-[10px] font-bold text-white/18 hover:text-white/55 transition-colors tracking-wider uppercase truncate cursor-default"
            >
              {p}
            </span>
          ))}
        </motion.div>

        <motion.div style={{ opacity: gridOp }}
          className="mt-12 pt-6 border-t border-white/6 flex items-center justify-between"
        >
          <p className="text-white/12 text-[10px]">COPYRIGHT © 2026 NADAUN All Rights Reserved</p>
          <p className="text-[#FFB800] text-[10px] tracking-widest uppercase font-bold">NADAUN COLLECTIVE</p>
        </motion.div>
      </div>
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
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Fixed header */}
          <div
            className="shrink-0 flex items-center justify-between px-8 md:px-16 border-b border-white/8 bg-[#080808]/95 backdrop-blur-md"
            style={{ height: HEADER_H }}
          >
            <span className="text-xs font-bold tracking-[0.25em] text-[#FFB800] uppercase">About</span>
            <button
              onClick={onClose}
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
            <Chapter1 scrollRef={scrollRef} />
            <Chapter2 scrollRef={scrollRef} />
            <Chapter3 scrollRef={scrollRef} />
            <Chapter4 scrollRef={scrollRef} />
            <Chapter5 scrollRef={scrollRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutOverlay;
