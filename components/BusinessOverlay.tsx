import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Lightbulb, Cpu, Zap, Globe, Sparkles } from 'lucide-react';

interface BusinessOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAiLabClick?: () => void;
  onIntegratedClick?: () => void;
}

const PAGE_LABELS = ['OVERVIEW', 'DOMAINS', 'TEAM', 'PROCESS'];

const DOMAINS = [
  {
    id: '01', title: 'INTEGRATED SOLUTION', shortTitle: 'SOLUTION',
    desc: '온/오프라인의 경계를 허무는 통합 마케팅 전략. 데이터 기반의 미디어 믹스와 퍼널 설계로 브랜드의 성장을 가속화합니다.',
    tags: ['Media Planning', 'Brand Consulting', 'Performance Funnel'],
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    id: '02', title: 'AD-TECH PLATFORM', shortTitle: 'AD-TECH',
    desc: '독자적인 AI 알고리즘과 DMP를 통해 타겟 오디언스를 정밀 타격하고 광고 효율을 극대화합니다.',
    tags: ['AI Optimization', 'Programmatic Buying', 'DMP Analysis'],
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    id: '03', title: 'IMMERSIVE CREATIVE', shortTitle: 'CREATIVE',
    desc: '3D, WebGL, AR/VR 등 최첨단 기술과 예술적 감각을 결합하여 단순한 광고를 넘어선 브랜드 경험을 창조합니다.',
    tags: ['Interactive Web', '3D Motion', 'Virtual Experience'],
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: '04', title: 'GLOBAL NETWORK', shortTitle: 'GLOBAL',
    desc: '전 세계 파트너사와의 네트워크를 통해 로컬라이제이션부터 글로벌 미디어 바잉까지 국경 없는 비즈니스를 지원합니다.',
    tags: ['Global Media', 'Localization', 'Cross-border'],
    icon: <Globe className="w-5 h-5" />,
  },
  {
    id: '05', title: 'AI INNOVATION LAB', shortTitle: 'AI LAB',
    desc: 'Gemini 기반의 AI 엔진으로 시장의 흐름을 예측하고 초개인화 마케팅 전략을 실시간으로 제안합니다.',
    tags: ['Gen AI', 'Predictive Analytics', 'Auto-Optimization'],
    icon: <Sparkles className="w-5 h-5" />,
  },
];

const TEAMS = [
  {
    name: 'AE',
    role: 'Account Executive',
    desc: '클라이언트 커뮤니케이션 및 미디어 디지털 컨텐츠 전략을 총괄합니다.',
    items: ['클라이언트 커뮤니케이션', '미디어 & 디지털컨텐츠', '이슈 매니지먼트'],
  },
  {
    name: 'CREATIVE',
    role: 'Creative Planning',
    desc: 'TVC/Brand/기업PR/Viral/SNS & Mobile 등 다양한 영상을 기획하는 크리에이터.',
    items: ['TVC / Brand / 기업PR', 'Viral / SNS & Mobile', '컨셉 & 아이디어 개발'],
  },
  {
    name: 'PRODUCING',
    role: 'Content Producing',
    desc: '촬영, 편집, CG, 녹음 등 컨텐츠 제작 진행 및 퀄리티 컨트롤.',
    items: ['영상 제작 전문', '컬러 그레이딩', 'ATL / BTL 전 과정'],
  },
  {
    name: 'DESIGN',
    role: 'Visual Design',
    desc: '온오프라인 광고 전반의 디자인 — 임팩트 있는 비주얼을 만들어냅니다.',
    items: ['온라인 배너 / 옥외광고', '키비주얼 / SNS컨텐츠', '디지털 캠페인'],
  },
];

const PROCESS = [
  { num: '01', title: '제작의뢰', desc: 'OT를 통해 영상 제작에 대한 고객의 니즈를 확실하게 파악합니다.' },
  { num: '02', title: '기획', desc: '고객의 니즈를 바탕으로 아이디어를 구상하고 컨셉을 도출합니다.' },
  { num: '03', title: 'PPM / 촬영', desc: '사전 미팅으로 세부 의견을 조율한 후 전문 촬영진이 진행합니다.' },
  { num: '04', title: '후반작업', desc: '전문 영상 편집자들이 고객의 요청에 맞추어 편집을 진행합니다.' },
  { num: '05', title: '시사 및 수정', desc: '고객과 함께 시사를 통해 피드백을 받은 후 수정사항을 반영합니다.' },
  { num: '06', title: 'On-Air', desc: '최종 확인 후 완성된 제작물을 매체로 On-Air합니다.' },
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

const BusinessOverlay: React.FC<BusinessOverlayProps> = ({ isOpen, onClose, onAiLabClick, onIntegratedClick }) => {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [activeDomain, setActiveDomain] = useState(0);

  const go = useCallback((next: number) => {
    if (next < 0 || next >= PAGE_LABELS.length) return;
    setDir(next > page ? 1 : -1);
    setPage(next);
  }, [page]);

  useEffect(() => {
    if (!isOpen) return;
    setPage(0);
    setDir(1);
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
              <span className="text-xs font-bold tracking-[0.25em] text-[#FFB800] uppercase">Business</span>
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

                {/* PAGE 0 — OVERVIEW */}
                {page === 0 && (
                  <motion.div
                    className="min-h-full px-6 md:px-16 lg:px-24 py-14 md:py-20 flex flex-col justify-between"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex flex-col gap-10 max-w-4xl">
                      <motion.p variants={fadeUp} className="text-[11px] tracking-[0.35em] uppercase text-white/30">
                        NADAUN COLLECTIVE — Business Overview
                      </motion.p>

                      <div className="overflow-hidden">
                        <motion.h1
                          variants={fadeUp}
                          className="font-extrabold tracking-tighter leading-none text-white"
                          style={{ fontSize: 'clamp(3.5rem, 10vw, 8.5rem)' }}
                        >
                          WE BUILD<br />
                          <span className="text-white/20">THE NEXT</span><br />
                          LEVEL.
                        </motion.h1>
                      </div>

                      <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/50 leading-relaxed max-w-xl font-light">
                        올인원 에이전시 — 커머스 제품 개발부터 유통 판매,
                        그리고 하이엔드 콘텐츠 제작까지.
                        <br className="hidden md:block" />
                        하나의 파트너로 브랜드의 모든 것을 완성합니다.
                      </motion.p>

                      <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-2">
                        {DOMAINS.map((d) => (
                          <span
                            key={d.id}
                            className="text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 border border-white/10 rounded-full text-white/40 hover:border-[#FFB800]/50 hover:text-[#FFB800] transition-colors cursor-default"
                          >
                            {d.shortTitle}
                          </span>
                        ))}
                      </motion.div>
                    </div>

                    <motion.div variants={fadeUp} className="mt-16 text-[11px] text-white/20 tracking-widest uppercase">
                      Since 2020 — Seoul, Korea
                    </motion.div>
                  </motion.div>
                )}

                {/* PAGE 1 — DOMAINS */}
                {page === 1 && (
                  <motion.div
                    className="min-h-full px-6 md:px-16 lg:px-24 py-14 md:py-20"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.p variants={fadeUp} className="text-[11px] tracking-[0.35em] uppercase text-white/30 mb-8">
                      Business Domains
                    </motion.p>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-12 md:mb-16 leading-none">
                      WHAT WE<br /><span className="text-white/20">DO BEST.</span>
                    </motion.h2>

                    <div className="flex flex-col gap-0">
                      {DOMAINS.map((d, i) => (
                        <motion.div
                          key={d.id}
                          variants={fadeUp}
                          onClick={() => setActiveDomain(i === activeDomain ? -1 : i)}
                          className="border-t border-white/8 py-6 md:py-8 cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5 md:gap-8">
                              <span className="font-mono text-sm text-white/20">{d.id}</span>
                              <div className={`transition-colors duration-300 ${activeDomain === i ? 'text-[#FFB800]' : 'text-white/30 group-hover:text-white/60'}`}>
                                {d.icon}
                              </div>
                              <h3 className={`text-lg md:text-2xl font-bold tracking-tight transition-colors duration-300 ${activeDomain === i ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                                {d.title}
                              </h3>
                            </div>
                            <span className={`text-[#FFB800] transition-transform duration-300 ${activeDomain === i ? 'rotate-45' : ''} text-xl`}>+</span>
                          </div>

                          <AnimatePresence>
                            {activeDomain === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="pt-5 pl-16 md:pl-24 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                                  <p className="text-sm text-white/50 leading-relaxed max-w-lg">{d.desc}</p>
                                  <div className="flex flex-wrap gap-2 shrink-0">
                                    {d.tags.map((tag) => (
                                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-[#FFB800] border border-[#FFB800]/25 px-3 py-1 rounded-full bg-[#FFB800]/5">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                  {(d.id === '01' || d.id === '05') && (
                                    <button
                                      className="text-[11px] text-white/40 hover:text-white border-b border-white/20 hover:border-white pb-0.5 transition-colors self-start whitespace-nowrap uppercase tracking-widest"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (d.id === '05' && onAiLabClick) onAiLabClick();
                                        if (d.id === '01' && onIntegratedClick) onIntegratedClick();
                                      }}
                                    >
                                      Explore →
                                    </button>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                      <div className="border-t border-white/8" />
                    </div>
                  </motion.div>
                )}

                {/* PAGE 2 — TEAM */}
                {page === 2 && (
                  <motion.div
                    className="min-h-full px-6 md:px-16 lg:px-24 py-14 md:py-20"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.p variants={fadeUp} className="text-[11px] tracking-[0.35em] uppercase text-white/30 mb-8">
                      Content Production — Team
                    </motion.p>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-4 leading-none">
                      THE PEOPLE<br /><span className="text-white/20">BEHIND IT.</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-sm text-white/35 mb-12 md:mb-16 max-w-md leading-relaxed">
                      각 분야별 전문가들이 모여 체계적인 시스템으로 클라이언트가 원하는 최적의 영상 콘텐츠를 구축합니다.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                      {TEAMS.map((team, i) => (
                        <motion.div
                          key={team.name}
                          variants={fadeUp}
                          className="group border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl p-7 md:p-8 flex flex-col gap-5 relative overflow-hidden transition-colors duration-400"
                        >
                          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#FFB800]/50 via-[#FFB800]/15 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                          <div>
                            <span className="block text-[#FFB800] font-extrabold tracking-tighter leading-none mb-1.5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                              {team.name}
                            </span>
                            <span className="text-[10px] tracking-[0.22em] uppercase text-white/25 font-medium">
                              {team.role}
                            </span>
                          </div>

                          <p className="text-xs text-white/40 leading-relaxed">{team.desc}</p>

                          <ul className="flex flex-col gap-2 mt-auto">
                            {team.items.map((item) => (
                              <li key={item} className="flex items-center gap-2.5 text-[11px] text-white/35">
                                <span className="w-1 h-1 rounded-full bg-[#FFB800]/50 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* PAGE 3 — PROCESS */}
                {page === 3 && (
                  <motion.div
                    className="min-h-full px-6 md:px-16 lg:px-24 py-14 md:py-20"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.p variants={fadeUp} className="text-[11px] tracking-[0.35em] uppercase text-white/30 mb-8">
                      Content Production — Process
                    </motion.p>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-4 leading-none">
                      HOW WE<br /><span className="text-white/20">PRODUCE.</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-sm text-white/35 mb-14 md:mb-20 max-w-md leading-relaxed">
                      제작의뢰부터 On-Air까지, 6단계로 최적의 영상 콘텐츠를 완성합니다.
                    </motion.p>

                    {/* Horizontal rule */}
                    <motion.div variants={fadeUp} className="relative mb-12 md:mb-16">
                      <div className="absolute top-[7px] left-0 right-0 h-[1px] bg-white/8" />
                      <div className="relative flex justify-between">
                        {PROCESS.map((_, i) => (
                          <div key={i} className="w-3.5 h-3.5 rounded-full bg-[#0a0a0a] border border-white/20" />
                        ))}
                      </div>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
                      {PROCESS.map((step, i) => (
                        <motion.div key={step.num} variants={fadeUp} className="flex flex-col gap-4">
                          <span className="font-mono font-bold text-white/8 leading-none" style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)' }}>
                            {step.num}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-white mb-2 leading-tight">{step.title}</h4>
                            <p className="text-[11px] text-white/35 leading-relaxed">{step.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
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

export default BusinessOverlay;
