import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import { X, Lightbulb, Cpu, Zap, Globe, Sparkles } from 'lucide-react';

const HEADER_H = 57;

const H1 = 300, H2 = 380, H3 = 320, H4 = 340;
const TOTAL = H1 + H2 + H3 + H4;

const C1S = 0,   C1E = H1 / TOTAL;
const C2S = C1E, C2E = (H1 + H2) / TOTAL;
const C3S = C2E, C3E = (H1 + H2 + H3) / TOTAL;
const C4S = C3E, C4E = 1;

const DOMAINS = [
  { id: '01', title: 'INTEGRATED SOLUTION', tags: ['Media Planning', 'Brand Consulting', 'Performance Funnel'], icon: Lightbulb },
  { id: '02', title: 'AD-TECH PLATFORM', tags: ['AI Optimization', 'Programmatic Buying', 'DMP Analysis'], icon: Cpu },
  { id: '03', title: 'IMMERSIVE CREATIVE', tags: ['Interactive Web', '3D Motion', 'Virtual Experience'], icon: Zap },
  { id: '04', title: 'GLOBAL NETWORK', tags: ['Global Media', 'Localization', 'Cross-border'], icon: Globe },
  { id: '05', title: 'AI INNOVATION LAB', tags: ['Gen AI', 'Predictive Analytics', 'Auto-Optimization'], icon: Sparkles },
];

const TEAMS = [
  { name: 'AE', role: 'Account Executive', desc: '클라이언트 커뮤니케이션 및 미디어 디지털 컨텐츠 전략을 총괄합니다.', items: ['클라이언트 커뮤니케이션', '미디어 & 디지털컨텐츠', '이슈 매니지먼트'] },
  { name: 'CREATIVE', role: 'Creative Planning', desc: 'TVC/Brand/기업PR/Viral/SNS & Mobile 등 다양한 영상을 기획하는 크리에이터.', items: ['TVC / Brand / 기업PR', 'Viral / SNS & Mobile', '컨셉 & 아이디어 개발'] },
  { name: 'PRODUCING', role: 'Content Producing', desc: '촬영, 편집, CG, 녹음 등 컨텐츠 제작 진행 및 퀄리티 컨트롤.', items: ['영상 제작 전문', '컬러 그레이딩', 'ATL / BTL 전 과정'] },
  { name: 'DESIGN', role: 'Visual Design', desc: '온오프라인 광고 전반의 디자인 — 임팩트 있는 비주얼을 만들어냅니다.', items: ['온라인 배너 / 옥외광고', '키비주얼 / SNS컨텐츠', '디지털 캠페인'] },
];

const PROCESS = [
  { num: '01', title: '제작의뢰', desc: 'OT를 통해 영상 제작에 대한 고객의 니즈를 파악합니다.' },
  { num: '02', title: '기획', desc: '고객의 니즈를 바탕으로 아이디어를 구상하고 컨셉을 도출합니다.' },
  { num: '03', title: 'PPM / 촬영', desc: '사전 미팅으로 세부 의견을 조율한 후 전문 촬영진이 진행합니다.' },
  { num: '04', title: '후반작업', desc: '전문 영상 편집자들이 고객의 요청에 맞추어 편집을 진행합니다.' },
  { num: '05', title: '시사 및 수정', desc: '고객과 함께 시사를 통해 피드백을 받은 후 수정사항을 반영합니다.' },
  { num: '06', title: 'On-Air', desc: '최종 확인 후 완성된 제작물을 매체로 On-Air합니다.' },
];

const StickyPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
    className="flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden"
  >
    {children}
  </div>
);

// Word that enters from right, stays, then exits left
const SlideWord: React.FC<{
  p: MotionValue<number>;
  enter: [number, number];
  exit: [number, number];
  text: string;
  color?: string;
}> = ({ p, enter, exit, text, color = '#ffffff' }) => {
  const op = useTransform(p, [enter[0], enter[1], exit[0], exit[1]], [0, 1, 1, 0]);
  const x  = useTransform(p, [enter[0], enter[1], exit[0], exit[1]], ['80vw', '0vw', '0vw', '-80vw']);
  return (
    <motion.h1
      style={{ opacity: op, x, color, position: 'absolute', willChange: 'transform' }}
      className="font-black tracking-[-0.04em] leading-none whitespace-nowrap left-8 md:left-16 lg:left-24"
      // font-size set via inline style so it's not overridden
    >
      <span style={{ fontSize: 'clamp(5.5rem, 20vw, 17rem)', display: 'block' }}>{text}</span>
    </motion.h1>
  );
};

// ── Ch1 — word-by-word horizontal slide ──────────────────────────────────────
const Ch1: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C1S, C1E], [0, 1]);

  // Word 1: visible from p=0 (no enter), exits left
  const w1Op = useTransform(p, [0.28, 0.42], [1, 0]);
  const w1X  = useTransform(p, [0.28, 0.42], ['0vw', '-80vw']);
  // Word 2: enters from right, exits left
  const w2Op = useTransform(p, [0.28, 0.44, 0.58, 0.68], [0, 1, 1, 0]);
  const w2X  = useTransform(p, [0.28, 0.44, 0.58, 0.68], ['80vw', '0vw', '0vw', '-80vw']);
  // Word 3: enters from right, stays
  const w3Op = useTransform(p, [0.58, 0.72, 0.92, 1.00], [0, 1, 1, 0]);
  const w3X  = useTransform(p, [0.58, 0.72], ['80vw', '0vw']);

  const subOp = useTransform(p, [0.68, 0.80], [0, 1]);
  const subX  = useTransform(p, [0.68, 0.80], ['4%', '0%']);

  const FS = { fontSize: 'clamp(5.5rem, 20vw, 17rem)' } as const;

  return (
    <div style={{ height: `${H1}vh` }}>
      <div
        style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
        className="relative overflow-hidden flex items-center"
      >
        <p className="absolute top-8 left-8 md:left-16 lg:left-24 text-xs tracking-[0.4em] uppercase text-[#FFB800] font-bold">
          Business Overview
        </p>

        <motion.h1 style={{ opacity: w1Op, x: w1X, y: '-50%', top: '50%', position: 'absolute', color: '#ffffff', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-none whitespace-nowrap left-8 md:left-16 lg:left-24">
          <span style={FS}>WE BUILD</span>
        </motion.h1>

        <motion.h1 style={{ opacity: w2Op, x: w2X, y: '-50%', top: '50%', position: 'absolute', color: 'rgba(255,255,255,0.22)', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-none whitespace-nowrap left-8 md:left-16 lg:left-24">
          <span style={FS}>THE NEXT</span>
        </motion.h1>

        <motion.h1 style={{ opacity: w3Op, x: w3X, y: '-50%', top: '50%', position: 'absolute', color: '#FFB800', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-none whitespace-nowrap left-8 md:left-16 lg:left-24">
          <span style={FS}>LEVEL.</span>
        </motion.h1>

        <motion.p
          style={{ opacity: subOp, x: subX, position: 'absolute', bottom: '18%', left: '2rem' }}
          className="text-white/60 text-base md:text-xl font-light leading-relaxed max-w-xl"
        >
          커머스 제품 개발부터 유통 판매, 하이엔드 콘텐츠 제작까지 —<br />
          단 하나의 파트너로 브랜드의 모든 것을 완성합니다.
        </motion.p>
      </div>
    </div>
  );
};

// ── Ch2 ───────────────────────────────────────────────────────────────────────
const Ch2: React.FC<{ g: MotionValue<number>; onAiLabClick?: () => void; onIntegratedClick?: () => void }> = ({ g, onAiLabClick, onIntegratedClick }) => {
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
            className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-10 font-bold"
          >BUSINESS DOMAINS</motion.p>
          <div className="flex flex-col gap-0">
            {DOMAINS.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.id}
                  style={{ opacity: dOps[i], x: dXs[i] }}
                  className="group border-t border-white/10 py-5 md:py-6 flex items-center gap-5 md:gap-8 cursor-default"
                  onClick={() => {
                    if (d.id === '05' && onAiLabClick) onAiLabClick();
                    if (d.id === '01' && onIntegratedClick) onIntegratedClick();
                  }}
                >
                  <span className="font-mono text-sm text-white/25 shrink-0 w-6">{d.id}</span>
                  <Icon className="w-5 h-5 text-white/30 group-hover:text-[#FFB800] transition-colors shrink-0" />
                  <h3 className="font-black tracking-[-0.02em] text-white/80 group-hover:text-white transition-colors"
                    style={{ fontSize: 'clamp(1.6rem, 4vw, 3.5rem)' }}>
                    {d.title}
                  </h3>
                  <div className="hidden md:flex flex-wrap gap-1.5 ml-auto">
                    {d.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-[#FFB800]/60 border border-[#FFB800]/20 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
            <div className="border-t border-white/10" />
          </div>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Ch3 ───────────────────────────────────────────────────────────────────────
const Ch3: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C3S, C3E], [0, 1]);

  const titleOp = useTransform(p, [0.00, 0.12], [0, 1]);
  const titleY  = useTransform(p, [0.00, 0.12], ['12px', '0px']);

  const t0Op = useTransform(p, [0.08, 0.22], [0, 1]); const t0Y = useTransform(p, [0.08, 0.22], ['28px', '0px']);
  const t1Op = useTransform(p, [0.18, 0.32], [0, 1]); const t1Y = useTransform(p, [0.18, 0.32], ['28px', '0px']);
  const t2Op = useTransform(p, [0.28, 0.42], [0, 1]); const t2Y = useTransform(p, [0.28, 0.42], ['28px', '0px']);
  const t3Op = useTransform(p, [0.38, 0.52], [0, 1]); const t3Y = useTransform(p, [0.38, 0.52], ['28px', '0px']);

  const exitOp = useTransform(p, [0.80, 0.96], [1, 0]);
  const exitY  = useTransform(p, [0.80, 0.96], ['0px', '-16px']);

  const tOps = [t0Op, t1Op, t2Op, t3Op];
  const tYs  = [t0Y, t1Y, t2Y, t3Y];

  return (
    <div style={{ height: `${H3}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, y: exitY }}>
          <motion.p style={{ opacity: titleOp, y: titleY }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#FFB800] mb-8 font-bold"
          >CONTENT PRODUCTION — TEAM</motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {TEAMS.map((team, i) => (
              <motion.div
                key={team.name}
                style={{ opacity: tOps[i], y: tYs[i] }}
                className="pr-6 lg:pr-8 border-r border-white/10 last:border-r-0 first:pl-0 pl-6 lg:pl-8"
              >
                <div className="pb-3 border-b border-white/15 mb-4">
                  <span
                    className="block font-black tracking-tight leading-none text-white"
                    style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}
                  >
                    {team.name}
                  </span>
                </div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#FFB800]/80 font-semibold mb-3">{team.role}</p>
                <p className="text-[11px] text-white/50 leading-relaxed mb-4">{team.desc}</p>
                <ul className="flex flex-col gap-1.5">
                  {team.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-[10px] text-white/35 leading-relaxed">
                      <span className="mt-1.5 w-[3px] h-[3px] rounded-full bg-[#FFB800]/40 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Ch4 ───────────────────────────────────────────────────────────────────────
const Ch4: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C4S, C4E], [0, 1]);

  const titleOp = useTransform(p, [0.00, 0.12], [0, 1]);
  const titleY  = useTransform(p, [0.00, 0.12], ['12px', '0px']);

  const p0Op = useTransform(p, [0.08, 0.22], [0, 1]); const p0Y = useTransform(p, [0.08, 0.22], ['32px', '0px']);
  const p1Op = useTransform(p, [0.16, 0.30], [0, 1]); const p1Y = useTransform(p, [0.16, 0.30], ['32px', '0px']);
  const p2Op = useTransform(p, [0.24, 0.38], [0, 1]); const p2Y = useTransform(p, [0.24, 0.38], ['32px', '0px']);
  const p3Op = useTransform(p, [0.38, 0.52], [0, 1]); const p3Y = useTransform(p, [0.38, 0.52], ['32px', '0px']);
  const p4Op = useTransform(p, [0.46, 0.60], [0, 1]); const p4Y = useTransform(p, [0.46, 0.60], ['32px', '0px']);
  const p5Op = useTransform(p, [0.54, 0.70], [0, 1]); const p5Y = useTransform(p, [0.54, 0.70], ['32px', '0px']);
  const pOps = [p0Op, p1Op, p2Op, p3Op, p4Op, p5Op];
  const pYs  = [p0Y, p1Y, p2Y, p3Y, p4Y, p5Y];

  return (
    <div style={{ height: `${H4}vh` }}>
      <StickyPanel>
        <motion.p style={{ opacity: titleOp, y: titleY }}
          className="text-[10px] tracking-[0.5em] uppercase text-[#FFB800] mb-8 font-bold"
        >PRODUCTION PROCESS</motion.p>
        <div className="grid grid-cols-3 gap-0">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.num}
              style={{ opacity: pOps[i], y: pYs[i] }}
              className="pr-6 lg:pr-10 border-r border-white/10 last:border-r-0 pl-0 [&:nth-child(3n+2)]:pl-6 lg:[&:nth-child(3n+2)]:pl-10 [&:nth-child(3n)]:pl-6 lg:[&:nth-child(3n)]:pl-10"
            >
              <div className="pb-3 border-b border-white/12 mb-4">
                <span
                  className="block font-black leading-none text-white/85 tabular-nums"
                  style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
                >
                  {step.num}
                </span>
              </div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-white/30 font-medium mb-2">STEP {step.num}</p>
              <h4 className="font-bold text-white mb-2" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1rem)' }}>{step.title}</h4>
              <p className="text-[11px] text-white/45 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div style={{ opacity: p5Op }}
          className="mt-10 pt-5 border-t border-white/10 flex items-center justify-between"
        >
          <p className="text-white/25 text-[10px]">COPYRIGHT © 2026 NADAUN All Rights Reserved</p>
          <p className="text-[#FFB800] text-[10px] tracking-widest uppercase font-bold">NADAUN COLLECTIVE</p>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Main overlay ──────────────────────────────────────────────────────────────
interface BusinessOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAiLabClick?: () => void;
  onIntegratedClick?: () => void;
}

const BusinessOverlay: React.FC<BusinessOverlayProps> = ({ isOpen, onClose, onAiLabClick, onIntegratedClick }) => {
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
            <span className="text-xs font-bold tracking-[0.3em] text-[#FFB800] uppercase">Business</span>
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
            <Ch1 g={progress} />
            <Ch2 g={progress} onAiLabClick={onAiLabClick} onIntegratedClick={onIntegratedClick} />
            <Ch3 g={progress} />
            <Ch4 g={progress} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BusinessOverlay;
