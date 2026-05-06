import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Cpu, Globe, Lightbulb, Zap, Sparkles } from 'lucide-react';

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

const PROCESS_STEPS = [
  { num: '01', title: '제작의뢰', desc: 'OT를 통해 영상 제작에 대한 고객의 니즈를 확실하게 파악합니다.' },
  { num: '02', title: '기획', desc: '고객의 니즈를 바탕으로 아이디어를 구상하고 컨셉을 도출합니다.' },
  { num: '03', title: 'PPM / 촬영', desc: '사전 미팅으로 세부 의견을 조율한 후 전문 촬영진이 진행합니다.' },
  { num: '04', title: '후반작업', desc: '전문 영상 편집자들이 고객의 요청에 맞추어 편집을 진행합니다.' },
  { num: '05', title: '시사 및 수정', desc: '고객과 함께 시사를 통해 피드백을 받은 후 수정사항을 반영합니다.' },
  { num: '06', title: 'On-Air', desc: '최종 확인 후 완성된 제작물을 매체로 On-Air합니다.' },
];

const businessAreas = [
  {
    id: '01',
    title: 'INTEGRATED SOLUTION',
    shortTitle: 'SOLUTION',
    desc: '온/오프라인의 경계를 허무는 통합 마케팅 전략. 데이터 기반의 미디어 믹스와 퍼널 설계로 브랜드의 성장을 가속화합니다.',
    tags: ['Media Planning', 'Brand Consulting', 'Performance Funnel'],
    icon: <Lightbulb className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: '02',
    title: 'AD-TECH PLATFORM',
    shortTitle: 'AD-TECH',
    desc: '독자적인 AI 알고리즘과 DMP(Data Management Platform)를 통해 타겟 오디언스를 정밀 타격하고 광고 효율을 극대화합니다.',
    tags: ['AI Optimization', 'Programmatic Buying', 'DMP Analysis'],
    icon: <Cpu className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: '03',
    title: 'IMMERSIVE CREATIVE',
    shortTitle: 'CREATIVE',
    desc: '3D, WebGL, AR/VR 등 최첨단 기술과 예술적 감각을 결합하여, 단순한 광고를 넘어선 경이로운 브랜드 경험을 창조합니다.',
    tags: ['Interactive Web', '3D Motion', 'Virtual Experience'],
    icon: <Zap className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
  },
  {
    id: '04',
    title: 'GLOBAL NETWORK',
    shortTitle: 'GLOBAL',
    desc: '전 세계 40개국 파트너사와의 네트워크를 통해, 로컬라이제이션부터 글로벌 미디어 바잉까지 국경 없는 비즈니스를 지원합니다.',
    tags: ['Global Media', 'Localization', 'Cross-border'],
    icon: <Globe className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  },
  {
    id: '05',
    title: 'AI INNOVATION LAB',
    shortTitle: 'AI LAB',
    desc: 'Gemini 기반의 독자적인 AI 엔진으로 시장의 흐름을 예측하고, 데이터에 기반한 초개인화 마케팅 전략을 실시간으로 제안합니다.',
    tags: ['Gen AI', 'Predictive Analytics', 'Auto-Optimization'],
    icon: <Sparkles className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

interface BusinessProps {
  onAiLabClick?: () => void;
  onIntegratedClick?: () => void;
}

const Business: React.FC<BusinessProps> = ({ onAiLabClick, onIntegratedClick }) => {
  const [activeId, setActiveId] = useState<string>('01');

  const handleExploreClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (id === '05' && onAiLabClick) {
      onAiLabClick();
    } else if (id === '01' && onIntegratedClick) {
      onIntegratedClick();
    }
  };

  return (
    <section id="business" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      
      {/* Background Ambience - only visible if parent has color, but here it blends */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FFB800]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 h-full flex flex-col">
        {/* Section Header */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div>
             <motion.span 
                variants={itemVariants}
                className="block text-[#FFB800] font-bold tracking-[0.2em] text-xs uppercase mb-4"
              >
                Business Domain
              </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-white"
            >
              WE BUILD <br/> <span className="text-gray-600">THE NEXT LEVEL.</span>
            </motion.h2>
          </div>
          <motion.div 
            variants={itemVariants}
            className="hidden md:block max-w-sm text-right pb-2"
          >
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              We provide integrated digital solutions driven by data and creativity, <br/> pushing your business to the global stage.
            </p>
          </motion.div>
        </motion.div>

        {/* Interactive Accordion */}
        <motion.div 
          className="flex flex-col md:flex-row h-auto md:h-[600px] gap-4 md:gap-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {businessAreas.map((area) => (
            <motion.div
              key={area.id}
              layout
              onClick={() => {
                setActiveId(area.id);
                if (area.id === '05' && onAiLabClick) {
                  onAiLabClick();
                } else if (area.id === '01' && onIntegratedClick) {
                  onIntegratedClick();
                }
              }}
              onMouseEnter={() => setActiveId(area.id)}
              className={`relative group cursor-pointer overflow-hidden border border-white/10 md:border-l md:border-y md:border-r-0 last:md:border-r transition-colors duration-700
                ${activeId === area.id ? 'md:flex-[3] flex-[3] bg-[#0A0A0A]' : 'md:flex-[1] flex-[0.5] bg-transparent hover:bg-white/5'}
                flex flex-col rounded-xl md:rounded-none
              `}
              initial={false}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              {/* Background Image */}
              <AnimatePresence>
                {activeId === area.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 z-0"
                  >
                    <img src={area.image} alt={area.title} className="w-full h-full object-cover filter grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10 p-6 md:p-10 flex flex-col h-full justify-between">
                {/* Top: ID & Icon */}
                <div className="flex justify-between items-start">
                  <span className={`font-mono text-sm tracking-widest transition-colors duration-300 ${activeId === area.id ? 'text-[#FFB800]' : 'text-gray-600'}`}>
                    {area.id}
                  </span>
                  <div className={`transition-colors duration-300 ${activeId === area.id ? 'text-[#FFB800]' : 'text-gray-600'}`}>
                    {activeId === area.id ? <ArrowUpRight /> : area.icon}
                  </div>
                </div>

                {/* Middle/Bottom: Content */}
                <div className="mt-auto">
                   {/* Inactive State Title */}
                   {activeId !== area.id && (
                      <motion.h3 
                        layout="position"
                        className="text-xl font-bold text-gray-500 mt-4 md:rotate-0 whitespace-nowrap"
                      >
                        {area.shortTitle}
                      </motion.h3>
                   )}

                   {/* Active State Content */}
                   {activeId === area.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white tracking-tight">
                        {area.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-8 max-w-md text-sm md:text-base">
                        {area.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {area.tags.map((tag, i) => (
                          <span key={i} className="text-xs font-bold text-[#FFB800] border border-[#FFB800]/30 px-3 py-1 rounded-full bg-[#FFB800]/5 uppercase tracking-wide">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8">
                         <button 
                          onClick={(e) => handleExploreClick(area.id, e)}
                          className="text-sm font-bold border-b border-white pb-1 hover:text-[#FFB800] hover:border-[#FFB800] transition-colors flex items-center gap-2 group text-white"
                         >
                           EXPLORE SOLUTION <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                         </button>
                      </div>
                    </motion.div>
                   )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── CONTENT PRODUCTION SUB-SECTION ── */}
      <div className="container mx-auto px-6 mt-32 md:mt-40">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="block text-[#FFB800] font-bold tracking-[0.2em] text-xs uppercase mb-4">
              Content Production
            </span>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none text-white">
              HOW WE <br /><span className="text-gray-600">PRODUCE.</span>
            </h2>
          </div>
          <p className="hidden md:block max-w-xs text-right text-gray-400 text-sm leading-relaxed pb-2">
            각 분야별 전문가들이 모여 체계적인 시스템으로 클라이언트가 원하는 최적의 영상 콘텐츠를 구축합니다.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-20 md:mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {TEAMS.map((team, i) => (
            <motion.div
              key={team.name}
              className="group relative border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] rounded-xl p-6 md:p-8 flex flex-col gap-4 overflow-hidden transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Gold accent top line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#FFB800]/60 via-[#FFB800]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div>
                <span className="block text-[#FFB800] font-extrabold text-2xl md:text-3xl tracking-tighter leading-none mb-1">
                  {team.name}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium">
                  {team.role}
                </span>
              </div>

              <p className="text-gray-400 text-xs leading-relaxed hidden md:block">
                {team.desc}
              </p>

              <ul className="flex flex-col gap-1.5 mt-auto">
                {team.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[11px] text-gray-500">
                    <span className="w-1 h-1 rounded-full bg-[#FFB800]/60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-600 font-medium">Production Process</span>
        </motion.div>

        {/* Horizontal rule with dots */}
        <div className="relative mb-12 md:mb-16">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/8" />
          <div className="relative flex justify-between">
            {PROCESS_STEPS.map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white/20 border border-white/10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-3 pb-24 md:pb-32">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-5xl md:text-6xl font-bold text-white/10 leading-none tracking-tight">
                {step.num}
              </span>
              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">{step.title}</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Business;