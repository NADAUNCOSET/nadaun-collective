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

        <motion.h1 style={{ opacity: w1Op, x: w1X, position: 'absolute', color: '#ffffff', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-none whitespace-nowrap left-8 md:left-16 lg:left-24">
          <span style={FS}>WE BUILD</span>
        </motion.h1>

        <motion.h1 style={{ opacity: w2Op, x: w2X, position: 'absolute', color: 'rgba(255,255,255,0.22)', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-none whitespace-nowrap left-8 md:left-16 lg:left-24">
          <span style={FS}>THE NEXT</span>
        </motion.h1>

        <motion.h1 style={{ opacity: w3Op, x: w3X, position: 'absolute', color: '#FFB800', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-none whitespace-nowrap left-8 md:left-16 lg:left-24">
          <span style={FS}>LEVEL.</span>
        </motion.h1>

        <motion.p
          style={{ opacity: subOp, x: subX, position: 'absolute', bottom: '18%' }}
          className="left-8 md:left-16 lg:left-24 text-white/60 text-base md:text-xl font-light leading-relaxed max-w-xl"
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

  const titleOp = useTransform(p, [0.00, 0.14], [0, 1]);
  const titleX  = useTransform(p, [0.00, 0.14], ['-5%', '0%']);

  const t0Op = useTransform(p, [0.12, 0.26], [0, 1]); const t0X = useTransform(p, [0.12, 0.26], ['6%', '0%']);
  const t1Op = useTransform(p, [0.22, 0.36], [0, 1]); const t1X = useTransform(p, [0.22, 0.36], ['6%', '0%']);
  const t2Op = useTransform(p, [0.32, 0.46], [0, 1]); const t2X = useTransform(p, [0.32, 0.46], ['6%', '0%']);
  const t3Op = useTransform(p, [0.42, 0.56], [0, 1]); const t3X = useTransform(p, [0.42, 0.56], ['6%', '0%']);

  const exitOp = useTransform(p, [0.76, 0.94], [1, 0]);
  const exitX  = useTransform(p, [0.76, 0.94], ['0%', '-5%']);

  const tOps = [t0Op, t1Op, t2Op, t3Op];
  const tXs  = [t0X, t1X, t2X, t3X];

  return (
    <div style={{ height: `${H3}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, x: exitX }}>
          <motion.p style={{ opacity: titleOp, x: titleX }}
            className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-10 font-bold"
          >CONTENT PRODUCTION — TEAM</motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAMS.map((team, i) => (
              <motion.div
                key={team.name}
                style={{ opacity: tOps[i], x: tXs[i] }}
                className="group border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl p-7 flex flex-col gap-4 relative overflow-hidden transition-colors duration-400"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#FFB800]/50 via-[#FFB800]/15 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div>
                  <span className="block text-[#FFB800] font-black tracking-tighter leading-none mb-1.5"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                    {team.name}
                  </span>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-white/40 font-medium">{team.role}</span>
                </div>
                <p className="text-sm text-white/55 leading-relaxed">{team.desc}</p>
                <ul className="flex flex-col gap-2 mt-auto">
                  {team.items.map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-xs text-white/45">
                      <span className="w-1 h-1 rounded-full bg-[#FFB800]/50 shrink-0" />{item}
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

  const titleOp    = useTransform(p, [0.00, 0.12], [0, 1]);
  const titleX     = useTransform(p, [0.00, 0.12], ['-5%', '0%']);
  const lineScaleX = useTransform(p, [0.10, 0.72], [0, 1]);

  const p0Op = useTransform(p, [0.10, 0.20], [0, 1]); const p0X = useTransform(p, [0.10, 0.20], ['-4%', '0%']);
  const p1Op = useTransform(p, [0.20, 0.30], [0, 1]); const p1X = useTransform(p, [0.20, 0.30], ['-4%', '0%']);
  const p2Op = useTransform(p, [0.30, 0.40], [0, 1]); const p2X = useTransform(p, [0.30, 0.40], ['-4%', '0%']);
  const p3Op = useTransform(p, [0.40, 0.50], [0, 1]); const p3X = useTransform(p, [0.40, 0.50], ['-4%', '0%']);
  const p4Op = useTransform(p, [0.50, 0.60], [0, 1]); const p4X = useTransform(p, [0.50, 0.60], ['-4%', '0%']);
  const p5Op = useTransform(p, [0.60, 0.72], [0, 1]); const p5X = useTransform(p, [0.60, 0.72], ['-4%', '0%']);
  const pOps = [p0Op, p1Op, p2Op, p3Op, p4Op, p5Op];
  const pXs  = [p0X, p1X, p2X, p3X, p4X, p5X];

  return (
    <div style={{ height: `${H4}vh` }}>
      <StickyPanel>
        <motion.p style={{ opacity: titleOp, x: titleX }}
          className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-4 font-bold"
        >PRODUCTION PROCESS</motion.p>
        <div className="relative my-8">
          <div className="h-[1px] w-full bg-white/10" />
          <motion.div className="absolute top-0 left-0 h-[1px] bg-[#FFB800] origin-left w-full"
            style={{ scaleX: lineScaleX }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-5">
          {PROCESS.map((step, i) => (
            <motion.div key={step.num} style={{ opacity: pOps[i], x: pXs[i] }} className="flex flex-col gap-3">
              <span className="font-mono font-black text-white/10 leading-none"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)' }}>
                {step.num}
              </span>
              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">{step.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div style={{ opacity: pOps[5] }}
          className="mt-14 pt-6 border-t border-white/10 flex items-center justify-between"
        >
          <p className="text-white/30 text-[11px]">COPYRIGHT © 2026 NADAUN All Rights Reserved</p>
          <p className="text-[#FFB800] text-[11px] tracking-widest uppercase font-bold">NADAUN COLLECTIVE</p>
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
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
