import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const TIMELINE = [
  { year: '2020', title: '사진 장비 판매샵',                     desc: '나다운의 시작. 카메라·조명·영상 장비 판매를 통해 크리에이터 생태계에 첫 발을 내딛었습니다.' },
  { year: '2021', title: '사진·영상 판매샵',                     desc: '사진에서 영상으로 사업 영역을 확장. 영상 장비 판매와 함께 현장 촬영 서비스를 시작했습니다.' },
  { year: '2022', title: '렌탈샵 확장 및 사진·영상 제작업',       desc: '장비 렌탈 인프라를 구축하고 자체 제작팀을 꾸려 기업 전용 사진·영상 콘텐츠 제작을 본격화했습니다.' },
  { year: '2023', title: '브랜드 필름·기업 스케치·VCR 제작',      desc: '기업 행사 스케치, 브랜드 필름, VCR 등 고퀄리티 비주얼 콘텐츠로 포트폴리오를 확장했습니다.' },
  { year: '2024', title: '난컴퍼니 설립 · MCN 진출',              desc: '난컴퍼니(NAN Company)를 설립하고 MCN 사업을 통해 크리에이터 매니지먼트·콘텐츠 유통으로 확대했습니다.' },
  { year: '2025', title: 'TVC 송출 및 오프라인 광고 시작',        desc: 'TV CF 제작·송출과 옥외·인쇄 오프라인 광고를 통해 360도 통합 마케팅 역량을 완성했습니다.' },
  { year: '2026', title: 'ALL IN ONE 광고 대행 · 에이전시 활성화', desc: '기획·제작·유통·AI를 하나로 묶은 하이엔드 콘텐츠 솔루션 그룹. 올인원 광고대행사로 완전히 도약합니다.', highlight: true },
];

const PARTNERS = [
  'SAMSUNG','HD HYUNDAI','HYUNDAI STEEL','KIA','EMIRATES','PEPSI','COWAY',
  'AMOREPACIFIC','DIOR BEAUTY','CALVIN KLEIN','OLIVE YOUNG','NUMBUZIN',
  'DASIQUE','SKINFOOD','TONYMOLY','ABIB','SKIN1004','JUNG SAEM MOOL',
  'GAONCHIPS','HECTO INNOVATION','ACMÉ DE LA VIE','THE NEW GREY','NUDAKE',
  'ELLE','THE MATTERS','M2','AENTIO','PAT','K2 SAFETY','KWDA','KOVA',
  'BEREX','PREED','MIRAEMI','3 HOURS AHEAD','CESTI','ROOTONIX',
];

const TOTAL_PAGES = 4;

// ─── Page transition variants ─────────────────────────────────────────────────
// direction: 1 = forward (slide left), -1 = backward (slide right)

const pageVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '6%' : '-6%',
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? '-6%' : '6%',
    opacity: 0,
  }),
};

const pageTransition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] };

// Stagger container
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ─── Individual pages ─────────────────────────────────────────────────────────

const Page1: React.FC = () => (
  <div className="flex flex-col justify-end h-full pb-16 md:pb-24">
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.p variants={fadeIn} className="text-[#FFB800] text-[10px] tracking-[0.4em] uppercase mb-8">
        ABOUT NADAUN COLLECTIVE
      </motion.p>

      {['HAIEND', 'CONTENT', 'SOLUTION'].map((word, i) => (
        <div key={word} className="overflow-hidden">
          <motion.h1
            variants={fadeUp}
            className="font-extrabold tracking-tighter leading-[0.92] select-none"
            style={{
              fontSize: 'clamp(3.5rem, 13vw, 10rem)',
              color: i === 1 ? '#FFB800' : 'white',
            }}
          >
            {word}
          </motion.h1>
        </div>
      ))}

      <motion.div variants={fadeUp} className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-md">
          최첨단 장비와 기술, 그리고 정제된 디자인 감각이 결합된<br />
          하이엔드 콘텐츠 솔루션 그룹
        </p>
        <p className="text-gray-600 text-[10px] tracking-widest uppercase shrink-0">Seoul, Korea · Since 2020</p>
      </motion.div>
    </motion.div>
  </div>
);

const Page2: React.FC = () => (
  <div className="flex flex-col justify-center h-full">
    <motion.p variants={fadeIn} initial="hidden" animate="show" className="text-[#FFB800] text-[10px] tracking-[0.4em] uppercase mb-8">
      OUR JOURNEY
    </motion.p>

    <motion.div variants={stagger} initial="hidden" animate="show" className="relative">
      {/* Vertical spine line */}
      <motion.div
        className="absolute left-[3.5rem] top-3 bottom-3 w-[1px]"
        style={{ background: 'linear-gradient(to bottom, #FFB800, #9D4DFF44)' }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      <div className="flex flex-col gap-4">
        {TIMELINE.map((item, i) => (
          <motion.div key={item.year} variants={fadeUp} className="flex gap-6 items-start">
            {/* Year */}
            <div className="w-14 shrink-0 text-right">
              <span className={`text-xs font-mono tabular-nums ${item.highlight ? 'text-[#FFB800] font-bold' : 'text-gray-600'}`}>
                {item.year}
              </span>
            </div>

            {/* Dot */}
            <div className="relative flex items-center justify-center shrink-0 mt-0.5" style={{ width: 8 }}>
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  background: item.highlight ? '#FFB800' : '#444',
                  boxShadow: item.highlight ? '0 0 10px #FFB800' : 'none',
                }}
              />
            </div>

            {/* Content */}
            <div className={`flex-1 pb-1 ${item.highlight ? '' : 'opacity-65'}`}>
              <p className={`font-bold leading-tight mb-0.5 ${item.highlight ? 'text-white text-sm md:text-base' : 'text-white/80 text-sm'}`}>
                {item.title}
              </p>
              <p className="text-gray-500 text-[11px] leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

const Page3: React.FC = () => (
  <div className="flex flex-col justify-center h-full">
    <motion.p variants={fadeIn} initial="hidden" animate="show" className="text-[#FFB800] text-[10px] tracking-[0.4em] uppercase mb-10">
      OUR VISION
    </motion.p>

    <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-12">
      <motion.blockquote variants={fadeUp} className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-snug max-w-2xl">
        "우리는 가장 <span className="text-[#FFB800]">나다운</span> 시선으로<br />
        브랜드의 가능성을 시각화합니다."
      </motion.blockquote>

      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
        {[
          { n: '01', label: 'TECHNOLOGY', sub: '최첨단 장비와 기술' },
          { n: '02', label: 'DESIGN', sub: '정제된 디자인 감각' },
          { n: '03', label: 'SOLUTION', sub: '올인원 콘텐츠 솔루션' },
        ].map(v => (
          <div key={v.label}>
            <p className="text-[10px] text-gray-700 mb-2 font-mono">{v.n}</p>
            <h3 className="text-sm md:text-base font-bold text-white mb-1">{v.label}</h3>
            <p className="text-gray-500 text-xs">{v.sub}</p>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#FFB800]/50 to-transparent" />
        <span className="text-[10px] tracking-[0.3em] text-gray-600 uppercase shrink-0">NADAUN COLLECTIVE · 2026</span>
      </motion.div>
    </motion.div>
  </div>
);

const Page4: React.FC = () => (
  <div className="flex flex-col justify-center h-full">
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={fadeIn} className="flex items-baseline justify-between mb-8">
        <p className="text-[#FFB800] text-[10px] tracking-[0.4em] uppercase">OUR PARTNERS</p>
        <p className="text-gray-600 text-xs tabular-nums">{PARTNERS.length}+ BRANDS</p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-4 mb-12">
        {PARTNERS.map(p => (
          <span key={p} className="text-[10px] font-bold text-gray-600 hover:text-white transition-colors tracking-wider uppercase truncate">
            {p}
          </span>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="border-t border-white/10 pt-8 flex items-center justify-between">
        <p className="text-gray-700 text-[10px]">COPYRIGHT © 2026 NADAUN All Rights Reserved</p>
        <p className="text-[#FFB800] text-[10px] tracking-widest uppercase font-bold">NADAUN COLLECTIVE</p>
      </motion.div>
    </motion.div>
  </div>
);

const PAGES = [Page1, Page2, Page3, Page4];
const PAGE_LABELS = ['INTRO', 'JOURNEY', 'VISION', 'PARTNERS'];

// ─── Main overlay ─────────────────────────────────────────────────────────────

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutOverlay: React.FC<AboutOverlayProps> = ({ isOpen, onClose }) => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = useCallback((next: number) => {
    if (next < 0 || next >= TOTAL_PAGES) return;
    setDirection(next > page ? 1 : -1);
    setPage(next);
  }, [page]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(page + 1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigate(page - 1);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, page, navigate, onClose]);

  // Reset on open
  useEffect(() => {
    if (isOpen) { setPage(0); setDirection(1); }
  }, [isOpen]);

  const CurrentPage = PAGES[page];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          exit={{ clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] text-white overflow-hidden flex flex-col"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 md:px-14 pt-8 pb-4 shrink-0">
            {/* Close */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors group"
            >
              <X size={18} />
              <span className="text-[10px] tracking-widest uppercase hidden md:block">Close</span>
            </button>

            {/* Page label tabs */}
            <div className="hidden md:flex items-center gap-6">
              {PAGE_LABELS.map((label, i) => (
                <button
                  key={label}
                  onClick={() => navigate(i)}
                  className="text-[10px] tracking-widest uppercase transition-colors"
                  style={{ color: i === page ? '#FFB800' : 'rgba(255,255,255,0.25)' }}
                >
                  {String(i + 1).padStart(2, '0')} {label}
                </button>
              ))}
            </div>

            {/* Page counter */}
            <p className="text-[10px] tabular-nums text-gray-600 tracking-widest">
              {String(page + 1).padStart(2, '0')} / {String(TOTAL_PAGES).padStart(2, '0')}
            </p>
          </div>

          {/* Page content */}
          <div className="flex-1 relative overflow-hidden px-6 md:px-14">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={pageTransition}
                className="absolute inset-0 px-6 md:px-14 overflow-y-auto"
              >
                <CurrentPage />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom navigation */}
          <div className="flex items-center justify-between px-6 md:px-14 py-8 shrink-0 border-t border-white/5">
            {/* Dot progress */}
            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === page ? 20 : 6,
                    height: 6,
                    background: i === page ? '#FFB800' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => navigate(page - 1)}
                disabled={page === 0}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed"
                whileTap={{ scale: 0.92 }}
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                onClick={() => navigate(page + 1)}
                disabled={page === TOTAL_PAGES - 1}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                style={{ borderColor: page < TOTAL_PAGES - 1 ? '#FFB800' : 'rgba(255,255,255,0.1)', color: page < TOTAL_PAGES - 1 ? '#FFB800' : 'white' }}
                whileTap={{ scale: 0.92 }}
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutOverlay;
