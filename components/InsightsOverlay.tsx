import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles, Loader2, ArrowRight, Brain, TrendingUp, Target, Zap } from 'lucide-react';
import { generateMarketingInsight } from '../services/geminiService';

interface InsightsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAiLabClick?: () => void;
}

const PAGE_LABELS = ['AI LAB', 'INSIGHT ENGINE', 'CAPABILITIES'];

const CAPABILITIES = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Market Prediction',
    desc: '실시간 데이터 기반으로 시장 트렌드를 예측하고 브랜드 기회를 발굴합니다.',
    tags: ['Trend Forecasting', 'Market Sizing', 'Opportunity Analysis'],
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: 'Hyper-Personalization',
    desc: '오디언스 데이터를 분석하여 초개인화된 마케팅 메시지를 자동 생성합니다.',
    tags: ['Audience Segmentation', 'Message Optimization', 'A/B Testing'],
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: 'Creative Intelligence',
    desc: 'AI가 카피라이팅, 비주얼 컨셉, 캠페인 아이디어를 실시간으로 제안합니다.',
    tags: ['Copy Generation', 'Visual Concept', 'Campaign Ideation'],
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Auto-Optimization',
    desc: '캠페인 성과를 실시간 분석하고 예산 배분 및 타겟팅을 자동 최적화합니다.',
    tags: ['Budget Allocation', 'Bid Optimization', 'ROAS Maximization'],
  },
];

const pageVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '6%' : '-6%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-6%' : '6%', opacity: 0 }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const InsightsOverlay: React.FC<InsightsOverlayProps> = ({ isOpen, onClose, onAiLabClick }) => {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<{ text: string; trends: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const go = useCallback((next: number) => {
    if (next < 0 || next >= PAGE_LABELS.length) return;
    setDir(next > page ? 1 : -1);
    setPage(next);
  }, [page]);

  useEffect(() => {
    if (!isOpen) return;
    setPage(0);
    setDir(1);
    setResult(null);
    setTopic('');
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(page + 1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(page - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, page, go, onClose]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);
    const data = await generateMarketingInsight(topic);
    setResult(data);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col overflow-hidden"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          exit={{ clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/8 shrink-0">
            <div className="flex items-center gap-6 md:gap-10">
              <span className="text-xs font-bold tracking-[0.25em] text-[#FFB800] uppercase">Insights</span>
              <div className="hidden md:flex gap-6">
                {PAGE_LABELS.map((label, i) => (
                  <button
                    key={label}
                    onClick={() => go(i)}
                    className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors ${
                      i === page ? 'text-white' : 'text-white/25 hover:text-white/50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[11px] text-white/25 tracking-widest font-mono hidden md:block">
                {String(page + 1).padStart(2, '0')} / {String(PAGE_LABELS.length).padStart(2, '0')}
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={page}
                custom={dir}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 overflow-y-auto"
              >

                {/* PAGE 0 — AI LAB INTRO */}
                {page === 0 && (
                  <motion.div
                    className="min-h-full px-6 md:px-16 lg:px-24 py-14 md:py-20 flex flex-col justify-between"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex flex-col gap-10 max-w-4xl">
                      <motion.div variants={fadeUp} className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-[#FFB800]" />
                        <span className="text-[11px] tracking-[0.35em] uppercase text-[#FFB800]/70 font-bold">
                          AI Innovation Lab — Powered by Gemini
                        </span>
                      </motion.div>

                      <div className="overflow-hidden">
                        <motion.h1
                          variants={fadeUp}
                          className="font-extrabold tracking-tighter leading-none text-white"
                          style={{ fontSize: 'clamp(3.5rem, 10vw, 8.5rem)' }}
                        >
                          PREDICT<br />
                          <span className="text-white/20">THE</span><br />
                          FUTURE.
                        </motion.h1>
                      </div>

                      <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/50 leading-relaxed max-w-xl font-light">
                        독자적인 AI 엔진으로 시장의 흐름을 예측하고,
                        데이터에 기반한 초개인화 마케팅 전략을 실시간으로 제안합니다.
                      </motion.p>

                      <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                        {['Gen AI', 'Predictive Analytics', 'Auto-Optimization', 'Real-time Insights'].map(tag => (
                          <span key={tag} className="text-[11px] font-bold tracking-wider uppercase px-4 py-2 border border-[#FFB800]/20 rounded-full text-[#FFB800]/60 bg-[#FFB800]/5">
                            {tag}
                          </span>
                        ))}
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <button
                          onClick={onAiLabClick}
                          className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-white hover:text-[#FFB800] transition-colors"
                        >
                          EXPLORE AI UNIVERSE
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    </div>

                    {/* Ambient glow */}
                    <div className="absolute top-1/2 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse, rgba(255,184,0,0.05) 0%, transparent 70%)' }} />
                  </motion.div>
                )}

                {/* PAGE 1 — INSIGHT ENGINE */}
                {page === 1 && (
                  <motion.div
                    className="min-h-full px-6 md:px-16 lg:px-24 py-14 md:py-20"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.p variants={fadeUp} className="text-[11px] tracking-[0.35em] uppercase text-white/30 mb-8">
                      AI Insight Engine
                    </motion.p>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-4 leading-none">
                      GENERATE<br /><span className="text-white/20">INSTANT INSIGHT.</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-sm text-white/35 mb-12 max-w-lg leading-relaxed">
                      산업 키워드를 입력하면 Gemini AI가 즉시 마케팅 인사이트와 트렌드 키워드를 제안합니다.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                      {/* Input */}
                      <motion.div variants={fadeUp}>
                        <form onSubmit={handleGenerate} className="relative mb-6">
                          <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Enter industry (e.g., EV Cars, K-Beauty)"
                            className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:border-[#FFB800]/60 focus:ring-1 focus:ring-[#FFB800]/30 transition-all pr-16 text-sm"
                          />
                          <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-2 top-2 p-2 bg-[#FFB800] rounded-full hover:bg-yellow-400 transition-colors disabled:opacity-40"
                          >
                            {loading
                              ? <Loader2 className="w-6 h-6 animate-spin text-black" />
                              : <ArrowRight className="w-6 h-6 text-black" />
                            }
                          </button>
                        </form>

                        <div className="flex flex-wrap gap-2">
                          {['K-Beauty', 'EV Cars', 'AI SaaS', 'F&B', 'Luxury Fashion'].map(sample => (
                            <button
                              key={sample}
                              onClick={() => setTopic(sample)}
                              className="text-[10px] text-white/30 hover:text-white/60 border border-white/10 hover:border-white/25 px-3 py-1.5 rounded-full transition-colors"
                            >
                              {sample}
                            </button>
                          ))}
                        </div>
                      </motion.div>

                      {/* Result */}
                      <motion.div
                        variants={fadeUp}
                        className="border border-white/8 bg-white/[0.02] rounded-2xl p-8 min-h-[280px] flex flex-col justify-center"
                      >
                        {!result && !loading && (
                          <div className="text-center">
                            <Sparkles className="w-10 h-10 mx-auto mb-4 text-white/10" />
                            <p className="text-sm text-white/25">인사이트를 생성하려면 키워드를 입력하세요.</p>
                          </div>
                        )}
                        {loading && (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-[2px] bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-[#FFB800] rounded-full"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                              />
                            </div>
                            <p className="text-xs text-white/30 animate-pulse">Analyzing market trends...</p>
                          </div>
                        )}
                        {result && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#FFB800]/60 mb-4">Strategic Insight</p>
                            <p className="text-base md:text-lg font-light text-white/80 leading-relaxed mb-8">
                              "{result.text}"
                            </p>
                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-3">Trending Keywords</p>
                            <div className="flex flex-wrap gap-2">
                              {result.trends.map((trend, i) => (
                                <span key={i} className="text-[11px] text-[#FFB800] border border-[#FFB800]/20 bg-[#FFB800]/5 px-3 py-1.5 rounded-lg">
                                  #{trend}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* PAGE 2 — CAPABILITIES */}
                {page === 2 && (
                  <motion.div
                    className="min-h-full px-6 md:px-16 lg:px-24 py-14 md:py-20"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.p variants={fadeUp} className="text-[11px] tracking-[0.35em] uppercase text-white/30 mb-8">
                      AI Capabilities
                    </motion.p>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-4 leading-none">
                      WHAT AI<br /><span className="text-white/20">CAN DO.</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-sm text-white/35 mb-14 max-w-md leading-relaxed">
                      나다운 AI Lab의 핵심 기능 — 브랜드의 성장을 가속하는 인텔리전스.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                      {CAPABILITIES.map((cap, i) => (
                        <motion.div
                          key={cap.title}
                          variants={fadeUp}
                          className="group border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl p-8 flex flex-col gap-5 relative overflow-hidden transition-colors duration-400"
                        >
                          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#FFB800]/50 via-[#FFB800]/15 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl border border-[#FFB800]/20 bg-[#FFB800]/5 flex items-center justify-center text-[#FFB800] shrink-0">
                              {cap.icon}
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-white mb-1.5">{cap.title}</h3>
                              <p className="text-xs text-white/40 leading-relaxed">{cap.desc}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 pl-14">
                            {cap.tags.map(tag => (
                              <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-[#FFB800]/60 border border-[#FFB800]/15 px-2.5 py-1 rounded-full bg-[#FFB800]/5">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div variants={fadeUp} className="mt-12">
                      <button
                        onClick={onAiLabClick}
                        className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-white hover:text-[#FFB800] border-b border-white/20 hover:border-[#FFB800]/50 pb-1 transition-colors"
                      >
                        EXPLORE FULL AI UNIVERSE
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  </motion.div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Nav */}
          <div className="flex items-center justify-between px-6 md:px-12 py-5 border-t border-white/8 shrink-0">
            <div className="flex gap-2">
              {PAGE_LABELS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === page
                      ? 'w-6 h-2 bg-[#FFB800]'
                      : 'w-2 h-2 bg-white/15 hover:bg-white/35'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => go(page - 1)}
                disabled={page === 0}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-colors disabled:opacity-20"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => go(page + 1)}
                disabled={page === PAGE_LABELS.length - 1}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/8 hover:bg-white/15 border border-white/15 hover:border-white/35 transition-colors disabled:opacity-20"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InsightsOverlay;
