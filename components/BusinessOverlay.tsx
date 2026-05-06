import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { X, Lightbulb, Cpu, Zap, Globe, Sparkles } from 'lucide-react';

const HEADER_H = 57;

const DOMAINS = [
  { id: '01', title: 'INTEGRATED SOLUTION', desc: '온/오프라인의 경계를 허무는 통합 마케팅 전략. 데이터 기반의 미디어 믹스와 퍼널 설계로 브랜드의 성장을 가속화합니다.', tags: ['Media Planning', 'Brand Consulting', 'Performance Funnel'], icon: Lightbulb },
  { id: '02', title: 'AD-TECH PLATFORM', desc: '독자적인 AI 알고리즘과 DMP를 통해 타겟 오디언스를 정밀 타격하고 광고 효율을 극대화합니다.', tags: ['AI Optimization', 'Programmatic Buying', 'DMP Analysis'], icon: Cpu },
  { id: '03', title: 'IMMERSIVE CREATIVE', desc: '3D, WebGL, AR/VR 등 최첨단 기술과 예술적 감각을 결합하여 단순한 광고를 넘어선 브랜드 경험을 창조합니다.', tags: ['Interactive Web', '3D Motion', 'Virtual Experience'], icon: Zap },
  { id: '04', title: 'GLOBAL NETWORK', desc: '전 세계 파트너사 네트워크로 로컬라이제이션부터 글로벌 미디어 바잉까지 국경 없는 비즈니스를 지원합니다.', tags: ['Global Media', 'Localization', 'Cross-border'], icon: Globe },
  { id: '05', title: 'AI INNOVATION LAB', desc: 'Gemini 기반 AI 엔진으로 시장의 흐름을 예측하고 초개인화 마케팅 전략을 실시간으로 제안합니다.', tags: ['Gen AI', 'Predictive Analytics', 'Auto-Optimization'], icon: Sparkles },
];

const TEAMS = [
  { name: 'AE', role: 'Account Executive', desc: '클라이언트 커뮤니케이션 및 미디어 디지털 컨텐츠 전략을 총괄합니다.', items: ['클라이언트 커뮤니케이션', '미디어 & 디지털컨텐츠', '이슈 매니지먼트'] },
  { name: 'CREATIVE', role: 'Creative Planning', desc: 'TVC/Brand/기업PR/Viral/SNS & Mobile 등 다양한 영상을 기획하는 크리에이터.', items: ['TVC / Brand / 기업PR', 'Viral / SNS & Mobile', '컨셉 & 아이디어 개발'] },
  { name: 'PRODUCING', role: 'Content Producing', desc: '촬영, 편집, CG, 녹음 등 컨텐츠 제작 진행 및 퀄리티 컨트롤.', items: ['영상 제작 전문', '컬러 그레이딩', 'ATL / BTL 전 과정'] },
  { name: 'DESIGN', role: 'Visual Design', desc: '온오프라인 광고 전반의 디자인 — 임팩트 있는 비주얼을 만들어냅니다.', items: ['온라인 배너 / 옥외광고', '키비주얼 / SNS컨텐츠', '디지털 캠페인'] },
];

const PROCESS = [
  { num: '01', title: '제작의뢰', desc: 'OT를 통해 영상 제작에 대한 고객의 니즈를 확실하게 파악합니다.' },
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

// ── Ch1: 올인원 에이전시 ──────────────────────────────────────────────────────
const Ch1: React.FC<{ scrollRef: React.RefObject<HTMLElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, container: scrollRef, offset: ['start start', 'end start'] });

  const exitOp = useTransform(p, [0.5, 0.82], [1, 0]);
  const exitY  = useTransform(p, [0.5, 0.82], ['0%', '-8%']);
  const subOp  = useTransform(p, [0.06, 0.25, 0.5, 0.78], [0, 1, 1, 0]);

  return (
    <div ref={ref} style={{ height: '260vh' }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, y: exitY }}>
          <p className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-8 font-bold">Business Overview</p>
          <h1 className="font-black tracking-[-0.03em] leading-[0.85] text-white"
            style={{ fontSize: 'clamp(5rem, 18vw, 14rem)' }}>WE BUILD</h1>
          <h1 className="font-black tracking-[-0.03em] leading-[0.85] text-white/25"
            style={{ fontSize: 'clamp(5rem, 18vw, 14rem)' }}>THE NEXT</h1>
          <h1 className="font-black tracking-[-0.03em] leading-[0.85] text-white"
            style={{ fontSize: 'clamp(5rem, 18vw, 14rem)' }}>LEVEL.</h1>
          <motion.p style={{ opacity: subOp }}
            className="mt-10 text-white/75 text-xl md:text-2xl font-light leading-relaxed max-w-2xl"
          >
            커머스 제품 개발부터 유통 판매, 하이엔드 콘텐츠 제작까지 —<br />
            단 하나의 파트너로 브랜드의 모든 것을 완성합니다.
          </motion.p>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Ch2: 5 Domains (전체 리스트) ─────────────────────────────────────────────
const Ch2: React.FC<{ scrollRef: React.RefObject<HTMLElement | null>; onAiLabClick?: () => void; onIntegratedClick?: () => void }> = ({ scrollRef, onAiLabClick, onIntegratedClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, container: scrollRef, offset: ['start start', 'end start'] });

  const titleOp = useTransform(p, [0.00, 0.10], [0, 1]);
  const titleY  = useTransform(p, [0.00, 0.10], ['5%', '0%']);
  const d0Op = useTransform(p, [0.08, 0.18], [0, 1]); const d0Y = useTransform(p, [0.08, 0.18], ['3%', '0%']);
  const d1Op = useTransform(p, [0.18, 0.28], [0, 1]); const d1Y = useTransform(p, [0.18, 0.28], ['3%', '0%']);
  const d2Op = useTransform(p, [0.28, 0.38], [0, 1]); const d2Y = useTransform(p, [0.28, 0.38], ['3%', '0%']);
  const d3Op = useTransform(p, [0.38, 0.48], [0, 1]); const d3Y = useTransform(p, [0.38, 0.48], ['3%', '0%']);
  const d4Op = useTransform(p, [0.48, 0.58], [0, 1]); const d4Y = useTransform(p, [0.48, 0.58], ['3%', '0%']);
  const exitOp = useTransform(p, [0.76, 0.94], [1, 0]);
  const exitY  = useTransform(p, [0.76, 0.94], ['0%', '-6%']);

  const dOps = [d0Op, d1Op, d2Op, d3Op, d4Op];
  const dYs  = [d0Y,  d1Y,  d2Y,  d3Y,  d4Y];

  return (
    <div ref={ref} style={{ height: '380vh' }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, y: exitY }}>
          <motion.p style={{ opacity: titleOp, y: titleY }}
            className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-10 font-bold"
          >BUSINESS DOMAINS</motion.p>

          <div className="flex flex-col gap-0">
            {DOMAINS.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.id}
                  style={{ opacity: dOps[i], y: dYs[i] }}
                  className="group border-t border-white/10 py-5 md:py-6 flex items-center gap-5 md:gap-8 cursor-default"
                  onClick={() => {
                    if (d.id === '05' && onAiLabClick) onAiLabClick();
                    if (d.id === '01' && onIntegratedClick) onIntegratedClick();
                  }}
                >
                  <span className="font-mono text-sm text-white/25 shrink-0 w-6">{d.id}</span>
                  <Icon className="w-5 h-5 text-white/30 group-hover:text-[#FFB800] transition-colors shrink-0" />
                  <h3 className="font-black tracking-[-0.02em] text-white/80 group-hover:text-white transition-colors"
                    style={{ fontSize: 'clamp(1.4rem, 3.5vw, 3rem)' }}>
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

// ── Ch3: Team ─────────────────────────────────────────────────────────────────
const Ch3: React.FC<{ scrollRef: React.RefObject<HTMLElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, container: scrollRef, offset: ['start start', 'end start'] });

  const titleOp = useTransform(p, [0.00, 0.14], [0, 1]);
  const titleY  = useTransform(p, [0.00, 0.14], ['5%', '0%']);
  const t0Op = useTransform(p, [0.12, 0.24], [0, 1]); const t0Y = useTransform(p, [0.12, 0.24], ['4%', '0%']);
  const t1Op = useTransform(p, [0.22, 0.34], [0, 1]); const t1Y = useTransform(p, [0.22, 0.34], ['4%', '0%']);
  const t2Op = useTransform(p, [0.32, 0.44], [0, 1]); const t2Y = useTransform(p, [0.32, 0.44], ['4%', '0%']);
  const t3Op = useTransform(p, [0.42, 0.54], [0, 1]); const t3Y = useTransform(p, [0.42, 0.54], ['4%', '0%']);
  const exitOp = useTransform(p, [0.76, 0.94], [1, 0]);

  const tOps = [t0Op, t1Op, t2Op, t3Op];
  const tYs  = [t0Y,  t1Y,  t2Y,  t3Y];

  return (
    <div ref={ref} style={{ height: '320vh' }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp }}>
          <motion.p style={{ opacity: titleOp, y: titleY }}
            className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-10 font-bold"
          >CONTENT PRODUCTION — TEAM</motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAMS.map((team, i) => (
              <motion.div
                key={team.name}
                style={{ opacity: tOps[i], y: tYs[i] }}
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
                      <span className="w-1 h-1 rounded-full bg-[#FFB800]/50 shrink-0" />
                      {item}
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

// ── Ch4: Process ──────────────────────────────────────────────────────────────
const Ch4: React.FC<{ scrollRef: React.RefObject<HTMLElement | null> }> = ({ scrollRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, container: scrollRef, offset: ['start start', 'end start'] });

  const titleOp    = useTransform(p, [0.00, 0.12], [0, 1]);
  const titleY     = useTransform(p, [0.00, 0.12], ['5%', '0%']);
  const lineScaleX = useTransform(p, [0.10, 0.72], [0, 1]);

  const p0Op = useTransform(p, [0.10, 0.20], [0, 1]); const p0Y = useTransform(p, [0.10, 0.20], ['30px', '0px']);
  const p1Op = useTransform(p, [0.20, 0.30], [0, 1]); const p1Y = useTransform(p, [0.20, 0.30], ['30px', '0px']);
  const p2Op = useTransform(p, [0.30, 0.40], [0, 1]); const p2Y = useTransform(p, [0.30, 0.40], ['30px', '0px']);
  const p3Op = useTransform(p, [0.40, 0.50], [0, 1]); const p3Y = useTransform(p, [0.40, 0.50], ['30px', '0px']);
  const p4Op = useTransform(p, [0.50, 0.60], [0, 1]); const p4Y = useTransform(p, [0.50, 0.60], ['30px', '0px']);
  const p5Op = useTransform(p, [0.60, 0.72], [0, 1]); const p5Y = useTransform(p, [0.60, 0.72], ['30px', '0px']);

  const pOps = [p0Op, p1Op, p2Op, p3Op, p4Op, p5Op];
  const pYs  = [p0Y,  p1Y,  p2Y,  p3Y,  p4Y,  p5Y];

  return (
    <div ref={ref} style={{ height: '340vh' }}>
      <StickyPanel>
        <motion.p style={{ opacity: titleOp, y: titleY }}
          className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-4 font-bold"
        >PRODUCTION PROCESS</motion.p>

        <div className="relative my-8">
          <div className="h-[1px] w-full bg-white/10" />
          <motion.div className="absolute top-0 left-0 h-[1px] bg-[#FFB800] origin-left w-full"
            style={{ scaleX: lineScaleX }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-5">
          {PROCESS.map((step, i) => (
            <motion.div key={step.num} style={{ opacity: pOps[i], y: pYs[i] }} className="flex flex-col gap-3">
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
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useLayoutEffect(() => {
    if (!isOpen) return;
    const el = scrollRef.current;
    if (el) { el.scrollTop = 0; }
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
            <Ch1 scrollRef={scrollRef as React.RefObject<HTMLElement | null>} />
            <Ch2 scrollRef={scrollRef as React.RefObject<HTMLElement | null>} onAiLabClick={onAiLabClick} onIntegratedClick={onIntegratedClick} />
            <Ch3 scrollRef={scrollRef as React.RefObject<HTMLElement | null>} />
            <Ch4 scrollRef={scrollRef as React.RefObject<HTMLElement | null>} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BusinessOverlay;
