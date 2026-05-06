import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import { X, Sparkles, Loader2, Brain, TrendingUp, Target, Zap } from 'lucide-react';
import { generateMarketingInsight } from '../services/geminiService';

const HEADER_H = 57;

const H1 = 300, H2 = 280, H3 = 300;
const TOTAL = H1 + H2 + H3;

const C1S = 0,   C1E = H1 / TOTAL;
const C2S = C1E, C2E = (H1 + H2) / TOTAL;
const C3S = C2E, C3E = 1;

const CAPABILITIES = [
  { icon: TrendingUp, title: 'Market Prediction', desc: '실시간 데이터 기반으로 시장 트렌드를 예측하고 브랜드 기회를 발굴합니다.', tags: ['Trend Forecasting', 'Market Sizing', 'Opportunity Analysis'] },
  { icon: Target, title: 'Hyper-Personalization', desc: '오디언스 데이터를 분석하여 초개인화된 마케팅 메시지를 자동 생성합니다.', tags: ['Audience Segmentation', 'Message Optimization', 'A/B Testing'] },
  { icon: Brain, title: 'Creative Intelligence', desc: 'AI가 카피라이팅, 비주얼 컨셉, 캠페인 아이디어를 실시간으로 제안합니다.', tags: ['Copy Generation', 'Visual Concept', 'Campaign Ideation'] },
  { icon: Zap, title: 'Auto-Optimization', desc: '캠페인 성과를 실시간 분석하고 예산 배분 및 타겟팅을 자동 최적화합니다.', tags: ['Budget Allocation', 'Bid Optimization', 'ROAS Maximization'] },
];

const INDUSTRIES = ['뷰티 & 코스메틱', 'F&B 브랜드', '패션 & 라이프스타일', '테크 스타트업', '엔터테인먼트'];

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
    >
      <span style={{ fontSize: 'clamp(5.5rem, 20vw, 17rem)', display: 'block' }}>{text}</span>
    </motion.h1>
  );
};

// ── Ch1 — word-by-word horizontal slide ──────────────────────────────────────
const Ch1: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C1S, C1E], [0, 1]);

  const w1Op = useTransform(p, [0.28, 0.42], [1, 0]);
  const w1X  = useTransform(p, [0.28, 0.42], ['0vw', '-80vw']);
  const w2Op = useTransform(p, [0.28, 0.44, 0.58, 0.68], [0, 1, 1, 0]);
  const w2X  = useTransform(p, [0.28, 0.44, 0.58, 0.68], ['80vw', '0vw', '0vw', '-80vw']);
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
          AI INNOVATION LAB
        </p>

        <motion.h1 style={{ opacity: w1Op, x: w1X, y: '-50%', top: '50%', position: 'absolute', color: '#ffffff', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-none whitespace-nowrap left-8 md:left-16 lg:left-24">
          <span style={FS}>INSIGHT</span>
        </motion.h1>

        <motion.h1 style={{ opacity: w2Op, x: w2X, y: '-50%', top: '50%', position: 'absolute', color: 'rgba(255,255,255,0.22)', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-none whitespace-nowrap left-8 md:left-16 lg:left-24">
          <span style={FS}>DRIVEN</span>
        </motion.h1>

        <motion.h1 style={{ opacity: w3Op, x: w3X, y: '-50%', top: '50%', position: 'absolute', color: '#FFB800', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-none whitespace-nowrap left-8 md:left-16 lg:left-24">
          <span style={FS}>GROWTH.</span>
        </motion.h1>

        <motion.p
          style={{ opacity: subOp, x: subX, position: 'absolute', bottom: '18%', left: '2rem' }}
          className="text-white/60 text-base md:text-xl font-light leading-relaxed max-w-xl"
        >
          Gemini 기반 AI 엔진으로 시장의 흐름을 예측하고,<br />
          초개인화 마케팅 전략을 실시간으로 제안합니다.
        </motion.p>
      </div>
    </div>
  );
};

// ── Ch2 ───────────────────────────────────────────────────────────────────────
const Ch2: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C2S, C2E], [0, 1]);

  const titleOp = useTransform(p, [0.00, 0.14], [0, 1]);
  const titleX  = useTransform(p, [0.00, 0.14], ['-5%', '0%']);
  const bodyOp  = useTransform(p, [0.10, 0.26], [0, 1]);
  const bodyX   = useTransform(p, [0.10, 0.26], ['5%', '0%']);
  const exitOp  = useTransform(p, [0.76, 0.94], [1, 0]);
  const exitX   = useTransform(p, [0.76, 0.94], ['0%', '-5%']);

  const [industry, setIndustry] = useState('');
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (ind: string) => {
    setIndustry(ind);
    setInsight('');
    setLoading(true);
    const result = await generateMarketingInsight(ind);
    setInsight(result);
    setLoading(false);
  };

  return (
    <div style={{ height: `${H2}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, x: exitX }} className="max-w-3xl">
          <motion.p style={{ opacity: titleOp, x: titleX }}
            className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-8 font-bold"
          >AI INSIGHT ENGINE</motion.p>
          <motion.h2 style={{ opacity: titleOp, x: titleX, fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            className="font-black tracking-[-0.03em] leading-[0.88] text-white mb-10"
          >MARKET<br />INTELLIGENCE.</motion.h2>

          <motion.div style={{ opacity: bodyOp, x: bodyX }}>
            <p className="text-white/65 text-base mb-6 font-light">업종을 선택하면 AI가 맞춤형 인사이트를 생성합니다.</p>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {INDUSTRIES.map(ind => (
                <button
                  key={ind}
                  onClick={() => handleGenerate(ind)}
                  className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                    industry === ind
                      ? 'border-[#FFB800] text-[#FFB800] bg-[#FFB800]/10'
                      : 'border-white/15 text-white/50 hover:border-white/35 hover:text-white/80'
                  }`}
                >{ind}</button>
              ))}
            </div>
            {loading && (
              <div className="flex items-center gap-3 text-[#FFB800]/70">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs tracking-widest uppercase font-bold">AI 인사이트 생성 중...</span>
              </div>
            )}
            {insight && !loading && (
              <motion.div
                initial={{ opacity: 0, x: '4%' }}
                animate={{ opacity: 1, x: '0%' }}
                transition={{ duration: 0.6 }}
                className="border border-[#FFB800]/20 bg-[#FFB800]/5 rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-[#FFB800]" />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#FFB800] font-bold">AI Generated Insight</span>
                </div>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">{insight}</p>
              </motion.div>
            )}
          </motion.div>
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

  const c0Op = useTransform(p, [0.12, 0.24], [0, 1]); const c0X = useTransform(p, [0.12, 0.24], ['6%', '0%']);
  const c1Op = useTransform(p, [0.24, 0.36], [0, 1]); const c1X = useTransform(p, [0.24, 0.36], ['6%', '0%']);
  const c2Op = useTransform(p, [0.36, 0.48], [0, 1]); const c2X = useTransform(p, [0.36, 0.48], ['6%', '0%']);
  const c3Op = useTransform(p, [0.48, 0.60], [0, 1]); const c3X = useTransform(p, [0.48, 0.60], ['6%', '0%']);
  const cOps = [c0Op, c1Op, c2Op, c3Op];
  const cXs  = [c0X, c1X, c2X, c3X];

  return (
    <div style={{ height: `${H3}vh` }}>
      <StickyPanel>
        <motion.p style={{ opacity: titleOp, x: titleX }}
          className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-10 font-bold"
        >AI CAPABILITIES</motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                style={{ opacity: cOps[i], x: cXs[i] }}
                className="border border-white/10 bg-white/[0.02] rounded-2xl p-7 flex flex-col gap-4 hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#FFB800]" />
                  <h3 className="text-lg md:text-xl font-bold text-white">{cap.title}</h3>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{cap.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {cap.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-[#FFB800]/70 border border-[#FFB800]/20 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div style={{ opacity: cOps[3] }}
          className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between"
        >
          <p className="text-white/30 text-[11px]">COPYRIGHT © 2026 NADAUN All Rights Reserved</p>
          <p className="text-[#FFB800] text-[11px] tracking-widest uppercase font-bold">NADAUN COLLECTIVE</p>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Main overlay ──────────────────────────────────────────────────────────────
interface InsightsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAiLabClick?: () => void;
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
            <span className="text-xs font-bold tracking-[0.3em] text-[#FFB800] uppercase">Insights</span>
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
            <Ch2 g={progress} />
            <Ch3 g={progress} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InsightsOverlay;
