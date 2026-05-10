import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Cpu, Globe, Lightbulb, Zap, Sparkles } from 'lucide-react';

const businessAreas = [
  {
    id: '01',
    stage: 'STRATEGY',
    title: 'INTEGRATED SOLUTION',
    subtitle: 'IP Strategy & Planning',
    shortTitle: 'STRATEGY',
    desc: 'IP의 핵심 가치를 날카롭게 정의하고 시장을 관통하는 전략을 수립합니다. 기획 단계부터 모든 크리에이티브 방향이 하나의 목표로 수렴되도록 IP 아키텍처를 설계합니다.',
    detail: '단순한 브랜드 컨설팅을 넘어, IP의 세계관과 타겟 오디언스를 정밀하게 분석해 제작·배포·확산까지 이어지는 통합 로드맵을 제시합니다.',
    tags: ['IP Architecture', 'Brand Strategy', 'Market Positioning'],
    icon: <Lightbulb className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: '02',
    stage: 'PRODUCTION',
    title: 'IMMERSIVE CREATIVE',
    subtitle: 'High-End IP Production',
    shortTitle: 'CREATIVE',
    desc: '시각적 한계를 뛰어넘는 하이엔드 콘텐츠를 직접 제작합니다. TVC부터 시네마틱 브랜드 필름, 3D 모션, 인터랙티브 웹 경험까지 — IP의 세계관을 최고 수준의 영상미로 구현합니다.',
    detail: '국내외 최정상급 감독·아티스트와 자체 프로덕션 인프라를 결합해, 외주 프로덕션의 품질 리스크를 원천 차단합니다.',
    tags: ['TVC Production', 'Brand Film', '3D Motion', 'Interactive'],
    icon: <Zap className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
  },
  {
    id: '03',
    stage: 'TECH',
    title: 'AI INNOVATION LAB',
    subtitle: 'Next-Gen Tech Enhancement',
    shortTitle: 'AI LAB',
    desc: '자체 개발 AI 엔진과 최신 VFX 파이프라인으로 IP 제작의 효율과 시각적 완성도를 동시에 극대화합니다. 기술이 크리에이티브의 경계를 확장하고, IP의 가치를 기하급수적으로 높입니다.',
    detail: 'Gen AI 기반 콘텐츠 최적화, 실시간 렌더링 파이프라인, 예측 분석 엔진을 통해 제작 비용은 줄이고 임팩트는 키웁니다.',
    tags: ['AI Production', 'VFX Pipeline', 'Predictive Analytics', 'Gen AI'],
    icon: <Sparkles className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop"
  },
  {
    id: '04',
    stage: 'DISTRIBUTION',
    title: 'AD-TECH PLATFORM',
    subtitle: 'Targeted IP Distribution',
    shortTitle: 'AD-TECH',
    desc: '정밀한 데이터 분석과 독자적 애드테크 플랫폼으로 타겟 오디언스에게 IP를 정확하게 도달시킵니다. 단순한 노출이 아닌, 브랜드와 소비자 사이의 진정한 공명(Resonance)을 추구합니다.',
    detail: 'DMP 기반 초정밀 타겟팅과 프로그래매틱 바잉으로 미디어 예산의 낭비를 최소화하고, IP가 가장 필요한 사람에게 가장 효과적인 방식으로 도달합니다.',
    tags: ['Programmatic Buying', 'DMP Analytics', 'Performance Marketing'],
    icon: <Cpu className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: '05',
    stage: 'GLOBAL',
    title: 'GLOBAL NETWORK',
    subtitle: 'Global Scale-Up',
    shortTitle: 'GLOBAL',
    desc: '언어와 국경을 넘어 IP를 세계 시장으로 확장합니다. 검증된 글로벌 파트너 네트워크를 통한 정밀한 로컬라이제이션과 글로벌 미디어 바잉으로, IP의 영향력을 무한히 키웁니다.',
    detail: '현지 문화와 시장 특성을 반영한 IP 재해석부터 글로벌 OTT·미디어 플랫폼 진출 전략까지 — 원스톱으로 지원합니다.',
    tags: ['Localization', 'Global Media Buying', 'IP Expansion', 'Cross-border'],
    icon: <Globe className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  },
];

interface BusinessProps {
  onAiLabClick?: () => void;
  onIntegratedClick?: () => void;
}

const Business: React.FC<BusinessProps> = ({ onAiLabClick, onIntegratedClick }) => {
  const [activeId, setActiveId] = useState<string>('01');

  const handleExploreClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (id === '03' && onAiLabClick) onAiLabClick();
    else if (id === '01' && onIntegratedClick) onIntegratedClick();
  };

  return (
    <section id="business" className="py-24 md:py-36 relative overflow-hidden bg-transparent">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FFB800]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6">

        {/* ── Section Header ── */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-[#FFB800] font-bold tracking-[0.25em] text-[11px] uppercase mb-7">
            IP PIPELINE — 5 STAGES
          </span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">
            <h2
              className="font-black tracking-tight leading-[0.9] text-white"
              style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)' }}
            >
              From Blueprint<br />
              <span style={{ color: '#FFB800' }}>to Global Impact.</span>
            </h2>

            <div className="max-w-sm md:max-w-xs lg:max-w-sm shrink-0">
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                수많은 대행사를 오가며 IP의 정체성이 희석되는 시대는 끝났습니다.
                기획부터 글로벌 확산까지 — 단 하나의 파이프라인으로.
              </p>
              <p className="text-[#FFB800]/80 text-xs font-bold tracking-[0.15em] uppercase">
                소통 비용은 줄이고, IP 퀄리티는 높입니다.
              </p>
            </div>
          </div>

          {/* Pipeline flow indicator */}
          <div className="flex items-center gap-0 mt-12 overflow-x-auto pb-2">
            {businessAreas.map((area, i) => (
              <React.Fragment key={area.id}>
                <button
                  onClick={() => setActiveId(area.id)}
                  className={`shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeId === area.id
                      ? 'bg-[#FFB800] text-black'
                      : 'text-white/35 hover:text-white/60'
                  }`}
                >
                  <span className={`font-mono text-[10px] ${activeId === area.id ? 'text-black/60' : 'text-white/25'}`}>
                    {area.id}
                  </span>
                  {area.stage}
                </button>
                {i < businessAreas.length - 1 && (
                  <div className={`shrink-0 w-8 h-[1px] mx-1 transition-all duration-500 ${
                    parseInt(area.id) < parseInt(activeId)
                      ? 'bg-[#FFB800]/60'
                      : 'bg-white/12'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* ── Accordion ── */}
        <motion.div
          className="flex flex-col md:flex-row h-auto md:h-[600px] gap-3 md:gap-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {businessAreas.map((area) => (
            <motion.div
              key={area.id}
              layout
              onClick={() => {
                setActiveId(area.id);
                if (area.id === '03' && onAiLabClick) onAiLabClick();
                else if (area.id === '01' && onIntegratedClick) onIntegratedClick();
              }}
              onMouseEnter={() => setActiveId(area.id)}
              className={`relative group cursor-pointer overflow-hidden
                border border-white/8 md:border-l md:border-y md:border-r-0 last:md:border-r
                transition-colors duration-700
                ${activeId === area.id
                  ? 'md:flex-[3.2] flex-[3] bg-[#0A0A0A]'
                  : 'md:flex-[1] flex-[0.5] bg-transparent hover:bg-white/[0.03]'}
                flex flex-col rounded-xl md:rounded-none
              `}
              initial={false}
              transition={{ type: 'spring', stiffness: 180, damping: 28 }}
            >
              {/* Background image */}
              <AnimatePresence>
                {activeId === area.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.22 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9 }}
                    className="absolute inset-0 z-0"
                  >
                    <img src={area.image} alt="" className="w-full h-full object-cover grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10 p-6 md:p-9 flex flex-col h-full justify-between">

                {/* Top */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`font-mono text-[11px] tracking-[0.3em] transition-colors duration-300 ${activeId === area.id ? 'text-[#FFB800]' : 'text-white/20'}`}>
                      {area.id}
                    </span>
                    {activeId !== area.id && (
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/18 mt-1 font-medium">
                        {area.stage}
                      </p>
                    )}
                  </div>
                  <div className={`transition-colors duration-300 ${activeId === area.id ? 'text-[#FFB800]' : 'text-white/20'}`}>
                    {activeId === area.id ? <ArrowUpRight className="w-5 h-5" /> : area.icon}
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-auto">
                  {activeId !== area.id && (
                    <motion.div layout="position">
                      <h3 className="text-base font-bold text-white/30 mt-4 whitespace-nowrap hidden md:block"
                          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                        {area.shortTitle}
                      </h3>
                      <h3 className="text-lg font-bold text-white/30 mt-4 md:hidden">
                        {area.shortTitle}
                      </h3>
                    </motion.div>
                  )}

                  {activeId === area.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Subtitle */}
                      <p className="text-[11px] tracking-[0.25em] uppercase text-[#FFB800]/70 font-bold mb-3">
                        {area.subtitle}
                      </p>

                      <h3 className="text-2xl md:text-4xl lg:text-5xl font-black mb-5 leading-tight text-white tracking-tight">
                        {area.title}
                      </h3>

                      <p className="text-white/60 leading-relaxed mb-3 max-w-md text-sm md:text-[15px]">
                        {area.desc}
                      </p>
                      <p className="text-white/35 leading-relaxed mb-7 max-w-md text-xs md:text-sm">
                        {area.detail}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {area.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] font-bold text-[#FFB800] border border-[#FFB800]/25 px-3 py-1.5 rounded-full bg-[#FFB800]/[0.05] uppercase tracking-wide">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={(e) => handleExploreClick(area.id, e)}
                        className="text-xs font-bold border-b border-white/30 pb-1 hover:text-[#FFB800] hover:border-[#FFB800] transition-all duration-300 flex items-center gap-2 group text-white/70 uppercase tracking-wider"
                      >
                        EXPLORE SOLUTION
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom killer copy ── */}
        <motion.div
          className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-white/8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="text-white/22 text-xs tracking-[0.3em] uppercase font-medium">
            NADAUN COLLECTIVE — All-in-One IP Engine
          </p>
          <p className="text-white/35 text-sm leading-relaxed max-w-lg text-right">
            기획부터 하이엔드 제작, AI 테크 솔루션, 글로벌 마케팅까지 한 호흡으로 —<br className="hidden md:block" />
            오리지널 IP 가치의 100%를 온전하게 증폭시킵니다.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Business;
