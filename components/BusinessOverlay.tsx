import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import { X, Lightbulb, Zap, Globe, Sparkles } from 'lucide-react';

const HEADER_H = 57;

// Ch1 intro + Ch2 도메인 리스트 + Ch3 문의하기 (상세 immersive/global은 별도 새창 오버레이)
const H1 = 120, H2 = 240, H3 = 180; // 인트로 → 도메인 → 문의하기 (상세는 새창 오버레이) 대표 룰 2026-06-13
const TOTAL = H1 + H2 + H3;

const C1S = 0,   C1E = H1 / TOTAL;
const C2S = C1E, C2E = (H1 + H2) / TOTAL;
const C3S = C2E, C3E = 1;

const DOMAINS = [
  { id: '01', title: 'INTEGRATED SOLUTION', subtitle: 'IP Strategy & Planning',        tags: ['IP Architecture', 'Brand Strategy', 'Market Positioning'], icon: Lightbulb },
  { id: '02', title: 'IMMERSIVE CREATIVE',  subtitle: 'High-End IP Production',        tags: ['TVC · CF', '브랜드필름', '기업 VCR', '3D · 모션', '사진 촬영', '영상 촬영', '지면 · 앨범'], icon: Zap },
  { id: '03', title: 'GLOBAL NETWORK',      subtitle: 'Nationwide & Global Media',     tags: ['Broadcast · IPTV · BTL', 'Global Media', 'Overseas'],      icon: Globe     },
  { id: '04', title: 'AI INNOVATION LAB',   subtitle: 'Next-Gen Tech Enhancement',     tags: ['AI Production', 'VFX Pipeline', 'Gen AI'],                 icon: Sparkles  },
];



const StickyPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
    className="flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden"
  >
    {children}
  </div>
);

// ── Ch1 — word-by-word horizontal slide ──────────────────────────────────────
const Ch1: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C1S, C1E], [0, 1]);

  // 세 단어가 순서대로 나타나 한 화면에 모두 남음 (대표 룰: 차례대로 한 화면에, About Ch1 패턴 통일 2026-06-12)
  const w1Op = useTransform(p, [0.04, 0.16], [0, 1]);
  const w1Y  = useTransform(p, [0.04, 0.16], ['40px', '0px']);
  const w2Op = useTransform(p, [0.20, 0.32], [0, 1]);
  const w2Y  = useTransform(p, [0.20, 0.32], ['40px', '0px']);
  const w3Op = useTransform(p, [0.36, 0.48], [0, 1]);
  const w3Y  = useTransform(p, [0.36, 0.48], ['40px', '0px']);
  const subOp = useTransform(p, [0.50, 0.62], [0, 1]);
  const subY  = useTransform(p, [0.50, 0.62], ['20px', '0px']);
  const exitOp = useTransform(p, [0.74, 0.98], [1, 0]);
  const exitY  = useTransform(p, [0.74, 0.98], ['0px', '-60px']);

  const FS = { fontSize: 'clamp(3rem, 11vw, 9rem)' } as const;

  return (
    <div style={{ height: `${H1}vh` }}>
      <div
        style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
        className="relative overflow-hidden flex flex-col justify-center px-8 md:px-16 lg:px-24"
      >
        <p className="absolute top-8 left-8 md:left-16 lg:left-24 text-xs tracking-[0.4em] uppercase text-[#FFB800] font-bold">
          Business Overview
        </p>
        <motion.div style={{ opacity: exitOp, y: exitY, willChange: 'transform, opacity' }} className="flex flex-col">
          <motion.h1 style={{ opacity: w1Op, y: w1Y, color: '#ffffff', willChange: 'transform' }}
            className="font-black tracking-[-0.04em] leading-[0.95] whitespace-nowrap">
            <span style={FS}>WE BUILD</span>
          </motion.h1>
          <motion.h1 style={{ opacity: w2Op, y: w2Y, color: 'rgba(255,255,255,0.22)', willChange: 'transform' }}
            className="font-black tracking-[-0.04em] leading-[0.95] whitespace-nowrap">
            <span style={FS}>THE NEXT</span>
          </motion.h1>
          <motion.h1 style={{ opacity: w3Op, y: w3Y, color: '#FFB800', willChange: 'transform' }}
            className="font-black tracking-[-0.04em] leading-[0.95] whitespace-nowrap">
            <span style={FS}>LEVEL.</span>
          </motion.h1>
          <motion.p
            style={{ opacity: subOp, y: subY }}
            className="mt-10 text-white/60 text-base md:text-xl font-light leading-relaxed max-w-xl"
          >
            커머스 제품 개발부터 유통 판매, 하이엔드 콘텐츠 제작까지 —<br />
            단 하나의 파트너로 브랜드의 모든 것을 완성합니다.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

// ── Ch2 — domain list (clickable) ────────────────────────────────────────────
const Ch2: React.FC<{
  g: MotionValue<number>;
  onAiLabClick?: () => void;
  onIntegratedClick?: () => void;
  onCreativeClick?: () => void;
  onGlobalClick?: () => void;
}> = ({ g, onAiLabClick, onIntegratedClick, onCreativeClick, onGlobalClick }) => {
  const p = useTransform(g, [C2S, C2E], [0, 1]);

  const titleOp = useTransform(p, [0.00, 0.10], [0, 1]);
  const titleX  = useTransform(p, [0.00, 0.10], ['-5%', '0%']);

  const d0Op = useTransform(p, [0.08, 0.18], [0, 1]); const d0X = useTransform(p, [0.08, 0.18], ['5%', '0%']);
  const d1Op = useTransform(p, [0.18, 0.28], [0, 1]); const d1X = useTransform(p, [0.18, 0.28], ['5%', '0%']);
  const d2Op = useTransform(p, [0.28, 0.38], [0, 1]); const d2X = useTransform(p, [0.28, 0.38], ['5%', '0%']);
  const d3Op = useTransform(p, [0.38, 0.48], [0, 1]); const d3X = useTransform(p, [0.38, 0.48], ['5%', '0%']);
  const d4Op = useTransform(p, [0.48, 0.58], [0, 1]); const d4X = useTransform(p, [0.48, 0.58], ['5%', '0%']);

  const exitOp = useTransform(p, [0.76, 0.94], [1, 0]);
  const exitX  = useTransform(p, [0.76, 0.94], ['0%', '-6%']);

  const dOps = [d0Op, d1Op, d2Op, d3Op, d4Op];
  const dXs  = [d0X, d1X, d2X, d3X, d4X];

  return (
    <div style={{ height: `${H2}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, x: exitX }}>
          <motion.p style={{ opacity: titleOp, x: titleX }}
            className="text-sm md:text-base tracking-[0.4em] uppercase text-[#FFB800] mb-8 md:mb-12 font-bold"
          >BUSINESS DOMAINS</motion.p>
          <div className="flex flex-col gap-0">
            {DOMAINS.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.id}
                  style={{ opacity: dOps[i], x: dXs[i] }}
                  className="group border-t border-white/12 py-6 md:py-9 flex items-center gap-4 md:gap-8 cursor-pointer hover:bg-white/[0.03] -mx-4 px-4 rounded-lg transition-colors"
                  onClick={() => {
                    if (d.id === '01' && onIntegratedClick) onIntegratedClick();
                    if (d.id === '02' && onCreativeClick) onCreativeClick();
                    if (d.id === '03' && onGlobalClick) onGlobalClick();
                    if (d.id === '04' && onAiLabClick) onAiLabClick();
                  }}
                >
                  <span className="font-mono text-xs md:text-sm text-white/25 shrink-0 w-6 md:w-8">{d.id}</span>
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-white/30 group-hover:text-[#FFB800] transition-colors shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black tracking-[-0.02em] text-white/85 group-hover:text-white transition-colors leading-[0.95]"
                      style={{ fontSize: 'clamp(2.3rem, 7vw, 6rem)' }}>
                      {d.title}
                    </h3>
                    <p className="text-[10px] md:text-[12px] tracking-[0.2em] uppercase text-[#FFB800]/55 font-bold mt-2 block">
                      {d.subtitle}
                    </p>
                  </div>
                  <div className="hidden lg:flex flex-wrap gap-1.5 ml-auto max-w-[46%] justify-end">
                    {d.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-[#FFB800]/60 border border-[#FFB800]/20 px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-white/25 group-hover:text-[#FFB800] group-hover:translate-x-1 transition-all text-xl md:text-3xl ml-3 md:ml-5 shrink-0">→</span>
                </motion.div>
              );
            })}
            <div className="border-t border-white/10" />
          </div>
          <motion.p style={{ opacity: d3Op }} className="mt-6 text-[11px] text-white/22 font-light tracking-widest uppercase">
            도메인을 클릭하여 상세 확인 — 02 IMMERSIVE CREATIVE · 03 GLOBAL NETWORK
          </motion.p>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Ch3 — 문의하기 (도메인 다음, 메인 스크롤 끝) — 상세는 새창 오버레이 대표 룰 2026-06-13 ──
const Ch3: React.FC<{ g: MotionValue<number>; onContactClick?: () => void }> = ({ g, onContactClick }) => {
  const p = useTransform(g, [C3S, C3E], [0, 1]);
  const op = useTransform(p, [0.04, 0.24], [0, 1]);
  const y  = useTransform(p, [0.04, 0.24], ['6%', '0%']);
  const subOp = useTransform(p, [0.20, 0.40], [0, 1]);
  return (
    <div style={{ height: `${H3}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: op, y }}>
          <p className="text-sm md:text-base tracking-[0.4em] uppercase text-[#FFB800] mb-6 font-bold">CONTACT</p>
          <h2 className="font-black text-white leading-[0.9] mb-8" style={{ fontSize: 'clamp(3rem, 11vw, 9.5rem)', letterSpacing: '-0.04em' }}>
            프로젝트<br />문의하기
          </h2>
          <motion.p style={{ opacity: subOp }} className="text-white/50 text-base md:text-2xl font-light leading-relaxed max-w-2xl mb-12">
            기획부터 하이엔드 제작, AI 테크 솔루션, 글로벌 마케팅까지 —<br className="hidden md:block" />
            단 하나의 파트너로 브랜드의 모든 것을 완성합니다.
          </motion.p>
          <motion.button style={{ opacity: subOp }} onClick={onContactClick}
            className="flex items-center gap-3 bg-[#FFB800] text-black font-black px-10 md:px-12 py-5 md:py-6 rounded-full hover:bg-white hover:scale-105 transition-all text-base md:text-lg tracking-wide">
            문의하기 →
          </motion.button>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Main overlay ──────────────────────────────────────────────────────────────
interface BusinessOverlayProps {
  isOpen: boolean;
  startAtDomains?: boolean;
  onClose: () => void;
  onAiLabClick?: () => void;
  onIntegratedClick?: () => void;
  onCreativeClick?: () => void;
  onGlobalClick?: () => void;
  onContactClick?: () => void;
}

const BusinessOverlay: React.FC<BusinessOverlayProps> = ({ isOpen, startAtDomains, onClose, onAiLabClick, onIntegratedClick, onCreativeClick, onGlobalClick, onContactClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (!isOpen) return;
    const el = scrollRef.current;
    if (!el) return;
    progress.set(0);
    if (startAtDomains) {
      // 상세 새창에서 백 → 인트로 건너뛰고 도메인(사업영역) 화면으로 바로
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const max = el.scrollHeight - el.clientHeight;
        if (max > 0) el.scrollTop = (C2S + 0.05) * max;
      }));
    } else {
      el.scrollTop = 0;
    }
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max > 0) progress.set(el.scrollTop / max);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [isOpen, startAtDomains, progress]);

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
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-[#FFB800] origin-left z-10"
            style={{ scaleX }}
          />
          <div
            className="shrink-0 flex items-center justify-between px-8 md:px-16 border-b border-white/10 bg-[#070707]/95 backdrop-blur-md"
            style={{ height: HEADER_H }}
          >
            <span className="text-xs font-bold tracking-[0.3em] text-[#FFB800] uppercase">Business</span>
            <div className="flex items-center gap-3">
              <button onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:border-white/40 hover:bg-white/8 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-scroll"
            style={{ scrollbarWidth: 'none' }}
          >
            <Ch1 g={progress} />
            <Ch2 g={progress} onAiLabClick={onAiLabClick} onIntegratedClick={onIntegratedClick} onCreativeClick={onCreativeClick} onGlobalClick={onGlobalClick} />
            <Ch3 g={progress} onContactClick={onContactClick} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BusinessOverlay;
