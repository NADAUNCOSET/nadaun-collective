import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// ─── Company growth story ────────────────────────────────────────────────────
const GROWTH_STEPS = [
  {
    phase: 'ORIGIN',
    year: '2020',
    ko: '사진·영상 장비 판매샵',
    en: 'Equipment Sales',
    desc: '최첨단 카메라·조명·영상 장비의 판매를 시작으로 나다운의 첫 걸음을 내딛었습니다.',
    color: '#888',
  },
  {
    phase: 'EXPANSION',
    year: '2021',
    ko: '렌탈샵 확장',
    en: 'Rental Studio',
    desc: '장비 렌탈 인프라를 구축하고 크리에이터와 기업을 위한 스튜디오 공간을 확장했습니다.',
    color: '#00C2FF',
  },
  {
    phase: 'PRODUCTION',
    year: '2022',
    ko: '사진·영상 제작업 구축',
    en: 'Visual Production',
    desc: '자체 제작 팀을 구성해 기업 전용 사진·영상 콘텐츠 제작 사업을 본격화했습니다.',
    color: '#FFB800',
  },
  {
    phase: 'AGENCY',
    year: '2023–',
    ko: '올인원 광고대행사',
    en: 'All-in-One Agency',
    desc: '기획·제작·유통·AI를 하나로 묶은 하이엔드 콘텐츠 솔루션 그룹으로 도약합니다.',
    color: '#FFB800',
    highlight: true,
  },
];

const VALUES = [
  { label: 'TECHNOLOGY', desc: '최첨단 장비와 기술' },
  { label: 'DESIGN', desc: '정제된 디자인 감각' },
  { label: 'SOLUTION', desc: '올인원 콘텐츠 솔루션' },
];

// ─── Side navigation dots ─────────────────────────────────────────────────────
const NavDots: React.FC<{ total: number; current: number; onDotClick: (i: number) => void }> = ({ total, current, onDotClick }) => (
  <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onDotClick(i)}
        className="w-2 h-2 rounded-full transition-all duration-300"
        style={{
          background: i === current ? '#FFB800' : 'rgba(255,255,255,0.25)',
          transform: i === current ? 'scale(1.5)' : 'scale(1)',
        }}
      />
    ))}
  </div>
);

// ─── Individual pages ─────────────────────────────────────────────────────────

const Page1Intro: React.FC = () => (
  <div className="h-screen w-full flex flex-col justify-end pb-24 px-8 md:px-20 snap-start shrink-0">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <p className="text-[#FFB800] text-xs tracking-[0.4em] uppercase mb-8">ABOUT NADAUN COLLECTIVE</p>
      <div className="overflow-hidden mb-6">
        <motion.h1
          className="text-[15vw] md:text-[11vw] font-extrabold tracking-tighter leading-none text-white"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          HAIEND
        </motion.h1>
      </div>
      <div className="overflow-hidden mb-6">
        <motion.h1
          className="text-[15vw] md:text-[11vw] font-extrabold tracking-tighter leading-none"
          style={{ color: '#FFB800' }}
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
        >
          CONTENT
        </motion.h1>
      </div>
      <div className="overflow-hidden mb-12">
        <motion.h1
          className="text-[15vw] md:text-[11vw] font-extrabold tracking-tighter leading-none text-white"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
        >
          SOLUTION
        </motion.h1>
      </div>

      <motion.div
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-white/10 pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="text-gray-400 text-base md:text-lg font-light max-w-xl leading-relaxed">
          최첨단 장비와 기술, 그리고 정제된 디자인 감각이 결합된<br />
          하이엔드 콘텐츠 솔루션 그룹
        </p>
        <p className="text-gray-600 text-xs tracking-widest uppercase shrink-0">Seoul, Korea · Since 2020</p>
      </motion.div>
    </motion.div>
  </div>
);

const Page2Story: React.FC = () => (
  <div className="h-screen w-full flex flex-col justify-center px-8 md:px-20 snap-start shrink-0">
    <motion.p
      className="text-[#FFB800] text-xs tracking-[0.4em] uppercase mb-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      OUR JOURNEY
    </motion.p>

    <div className="relative flex flex-col gap-0">
      {GROWTH_STEPS.map((step, i) => (
        <motion.div
          key={step.phase}
          className="flex gap-6 md:gap-10 items-stretch"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
        >
          {/* Timeline spine */}
          <div className="flex flex-col items-center w-8 shrink-0">
            <div
              className="w-3 h-3 rounded-full shrink-0 mt-1"
              style={{ background: step.color, boxShadow: step.highlight ? `0 0 12px ${step.color}` : 'none' }}
            />
            {i < GROWTH_STEPS.length - 1 && (
              <div className="w-[1px] flex-1 my-1" style={{ background: `linear-gradient(to bottom, ${step.color}60, ${GROWTH_STEPS[i+1].color}30)` }} />
            )}
          </div>

          {/* Content */}
          <div className={`pb-8 flex-1 ${step.highlight ? 'opacity-100' : 'opacity-70'}`}>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-[10px] tracking-widest text-gray-600 font-mono">{step.year}</span>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: step.color }}>{step.phase}</span>
            </div>
            <h3 className={`font-bold tracking-tight mb-1 ${step.highlight ? 'text-2xl md:text-3xl text-white' : 'text-xl md:text-2xl text-white/80'}`}>
              {step.ko}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-lg">{step.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const Page3Vision: React.FC = () => (
  <div className="h-screen w-full flex flex-col justify-center px-8 md:px-20 snap-start shrink-0">
    <motion.p
      className="text-[#FFB800] text-xs tracking-[0.4em] uppercase mb-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      CORE VALUES
    </motion.p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 mb-16">
      {VALUES.map((v, i) => (
        <motion.div
          key={v.label}
          className="py-8 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
        >
          <p className="text-[10px] tracking-[0.3em] text-gray-600 uppercase mb-3">{`0${i + 1}`}</p>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{v.label}</h3>
          <p className="text-gray-400 text-sm">{v.desc}</p>
        </motion.div>
      ))}
    </div>

    <motion.div
      className="border-t border-white/10 pt-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <blockquote className="text-2xl md:text-4xl font-bold text-white leading-snug max-w-3xl">
        "우리는 가장 <span className="text-[#FFB800]">나다운</span> 시선으로<br />
        브랜드의 가능성을 시각화합니다."
      </blockquote>
      <p className="mt-6 text-xs tracking-widest text-gray-600 uppercase">— NADAUN COLLECTIVE</p>
    </motion.div>
  </div>
);

const Page4Partners: React.FC = () => {
  const PARTNERS = [
    "SAMSUNG","HD HYUNDAI","HYUNDAI STEEL","KIA","EMIRATES","PEPSI","COWAY",
    "AMOREPACIFIC","DIOR BEAUTY","CALVIN KLEIN","OLIVE YOUNG","NUMBUZIN",
    "DASIQUE","SKINFOOD","TONYMOLY","ABIB","SKIN1004","JUNG SAEM MOOL",
    "GAONCHIPS","HECTO INNOVATION","ACMÉ DE LA VIE","THE NEW GREY","NUDAKE",
    "ELLE","THE MATTERS","M2","AENTIO","PAT","K2 SAFETY","KWDA","KOVA",
    "BEREX","PREED","MIRAEMI","3 HOURS AHEAD","CESTI","ROOTONIX",
  ];
  return (
    <div className="h-screen w-full flex flex-col justify-center px-8 md:px-20 snap-start shrink-0">
      <motion.div
        className="flex items-baseline justify-between mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-[#FFB800] text-xs tracking-[0.4em] uppercase">OUR PARTNERS</p>
        <p className="text-gray-600 text-xs tabular-nums">{PARTNERS.length}+ BRANDS</p>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-5">
        {PARTNERS.map((p, i) => (
          <motion.span
            key={p}
            className="text-[10px] md:text-[11px] font-bold text-gray-600 hover:text-white transition-colors tracking-wider uppercase truncate"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.015 }}
          >
            {p}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-gray-600 text-xs">COPYRIGHT © 2026 NADAUN All Rights Reserved</p>
        <p className="text-[#FFB800] text-xs tracking-widest uppercase font-bold">NADAUN COLLECTIVE</p>
      </motion.div>
    </div>
  );
};

// ─── Main overlay ─────────────────────────────────────────────────────────────
interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_PAGES = 4;

const AboutOverlay: React.FC<AboutOverlayProps> = ({ isOpen, onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Track which page is visible via scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const page = Math.round(el.scrollTop / window.innerHeight);
      setCurrentPage(Math.min(page, TOTAL_PAGES - 1));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [isOpen]);

  // Reset to page 0 on open
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
      setTimeout(() => scrollRef.current?.scrollTo({ top: 0 }), 50);
    }
  }, [isOpen]);

  const scrollToPage = (i: number) => {
    scrollRef.current?.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] text-white overflow-hidden"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="fixed top-8 left-8 z-50 flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
          >
            <X size={20} />
            <span className="text-xs tracking-widest uppercase hidden md:block group-hover:text-[#FFB800] transition-colors">Close</span>
          </button>

          {/* Page indicator top-right */}
          <div className="fixed top-8 right-8 z-50 text-xs tabular-nums text-gray-600 tracking-widest">
            {String(currentPage + 1).padStart(2, '0')} / {String(TOTAL_PAGES).padStart(2, '0')}
          </div>

          {/* Side nav dots */}
          <NavDots total={TOTAL_PAGES} current={currentPage} onDotClick={scrollToPage} />

          {/* Scroll container with snap */}
          <div
            ref={scrollRef}
            className="h-full overflow-y-scroll"
            style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}
          >
            <Page1Intro />
            <Page2Story />
            <Page3Vision />
            <Page4Partners />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutOverlay;
