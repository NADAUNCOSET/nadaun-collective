import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X } from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────

const TIMELINE = [
  { year: '2020', title: '사진 장비 판매샵', desc: '카메라·조명·영상 장비 판매로 크리에이터 생태계에 첫 발을 내딛었습니다.' },
  { year: '2021', title: '사진·영상 판매샵', desc: '영상 장비 판매와 함께 현장 촬영 서비스를 시작했습니다.' },
  { year: '2022', title: '렌탈샵 확장 및 제작업', desc: '장비 렌탈 인프라를 구축하고 자체 제작팀으로 기업 콘텐츠 제작을 본격화했습니다.' },
  { year: '2023', title: '브랜드 필름·VCR 제작', desc: '기업 행사, 브랜드 필름, VCR 등 고퀄리티 비주얼 콘텐츠로 포트폴리오를 확장했습니다.' },
  { year: '2024', title: '난컴퍼니 설립 · MCN 진출', desc: '난컴퍼니를 설립하고 MCN 사업으로 크리에이터 매니지먼트·유통으로 확대했습니다.' },
  { year: '2025', title: 'TVC 송출 · 오프라인 광고', desc: 'TV CF 제작·송출과 옥외 광고를 통해 360도 통합 마케팅 역량을 완성했습니다.' },
  { year: '2026', title: 'ALL IN ONE 광고 대행', desc: '기획·제작·유통·AI를 하나로 묶은 하이엔드 콘텐츠 솔루션 그룹으로 도약합니다.', highlight: true },
];

const PARTNERS = [
  'SAMSUNG','HD HYUNDAI','HYUNDAI STEEL','KIA','EMIRATES','PEPSI','COWAY',
  'AMOREPACIFIC','DIOR BEAUTY','CALVIN KLEIN','OLIVE YOUNG','NUMBUZIN',
  'DASIQUE','SKINFOOD','TONYMOLY','ABIB','SKIN1004','JUNG SAEM MOOL',
  'GAONCHIPS','HECTO INNOVATION','ACMÉ DE LA VIE','THE NEW GREY','NUDAKE',
  'ELLE','THE MATTERS','M2','AENTIO','PAT','K2 SAFETY','KWDA','KOVA',
  'BEREX','PREED','MIRAEMI','3 HOURS AHEAD','CESTI','ROOTONIX',
];

// ── Word-by-word reveal component ─────────────────────────────────────────────

const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};
const wordItem = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const WordReveal: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => (
  <motion.span
    className={`inline ${className}`}
    variants={wordContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
  >
    {text.split(' ').map((word, i) => (
      <motion.span key={i} variants={wordItem} className="inline-block mr-[0.28em]">
        {word}
      </motion.span>
    ))}
  </motion.span>
);

// ── Scroll-drawn timeline row ─────────────────────────────────────────────────

const TimelineRow: React.FC<{ item: typeof TIMELINE[0]; index: number }> = ({ item, index }) => (
  <motion.div
    className="flex flex-col gap-2"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
  >
    {/* Number */}
    <span
      className="font-mono font-bold leading-none"
      style={{
        fontSize: 'clamp(3rem, 7vw, 5.5rem)',
        color: item.highlight ? '#FFB800' : 'rgba(255,255,255,0.08)',
      }}
    >
      {String(index + 1).padStart(2, '0')}
    </span>

    {/* Line */}
    <motion.div
      className="h-[1px] w-full origin-left"
      style={{ background: item.highlight ? '#FFB800' : 'rgba(255,255,255,0.12)' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.7, delay: index * 0.07 + 0.15, ease: [0.16, 1, 0.3, 1] }}
    />

    {/* Content */}
    <div className="pt-3">
      <span className="text-[10px] tracking-[0.25em] uppercase text-white/25 font-medium block mb-1.5">
        {item.year}
      </span>
      <h3 className={`font-bold mb-1.5 leading-tight ${item.highlight ? 'text-white' : 'text-white/60'}`}
        style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)' }}>
        {item.title}
      </h3>
      <p className="text-[11px] text-white/30 leading-relaxed">{item.desc}</p>
    </div>
  </motion.div>
);

// ── Section wrapper ───────────────────────────────────────────────────────────

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => (
  <section id={id} className={`min-h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 md:py-28 ${className}`}>
    {children}
  </section>
);

// ── Main overlay ──────────────────────────────────────────────────────────────

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutOverlay: React.FC<AboutOverlayProps> = ({ isOpen, onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset scroll on open
  useEffect(() => {
    if (isOpen && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [isOpen]);

  // Keyboard close
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
          className="fixed inset-0 z-[100] bg-[#080808] text-white overflow-hidden flex flex-col"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          exit={{ clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Fixed top bar */}
          <div className="shrink-0 flex items-center justify-between px-6 md:px-16 py-5 border-b border-white/8 z-10 bg-[#080808]/95 backdrop-blur-md">
            <span className="text-xs font-bold tracking-[0.25em] text-[#FFB800] uppercase">About</span>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable content */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto">

            {/* ── 01 INTRO ─────────────────────────────────────────────── */}
            <Section>
              <motion.p
                className="text-[10px] tracking-[0.35em] uppercase text-[#FFB800]/70 mb-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                NADAUN COLLECTIVE — Since 2020, Seoul
              </motion.p>

              <div className="overflow-hidden mb-4">
                {['HAIEND', 'CONTENT', 'SOLUTION'].map((word, i) => (
                  <div key={word} className="overflow-hidden">
                    <motion.h1
                      className="font-extrabold tracking-tighter leading-[0.9] select-none"
                      style={{
                        fontSize: 'clamp(4rem, 14vw, 11rem)',
                        color: i === 1 ? '#FFB800' : 'white',
                      }}
                      initial={{ y: '105%' }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                    >
                      {word}
                    </motion.h1>
                  </div>
                ))}
              </div>

              <motion.div
                className="mt-12 pt-8 border-t border-white/8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p className="text-white/40 text-base md:text-lg font-light leading-relaxed max-w-md">
                  <WordReveal text="최첨단 장비와 기술, 그리고 정제된 디자인 감각이 결합된 하이엔드 콘텐츠 솔루션 그룹" />
                </p>
                <p className="text-white/15 text-[10px] tracking-widest uppercase shrink-0">GROUP</p>
              </motion.div>
            </Section>

            {/* ── 02 WHO WE ARE ─────────────────────────────────────────── */}
            <Section className="border-t border-white/8">
              <motion.p
                className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-14"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                WHO WE ARE
              </motion.p>

              <div className="max-w-4xl">
                <p
                  className="font-extrabold tracking-tighter leading-[1.05] text-white mb-12"
                  style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
                >
                  <WordReveal text="올인원 에이전시." />
                  <br />
                  <span className="text-white/20">
                    <WordReveal text="커머스 제품 개발부터 유통 판매, 하이엔드 콘텐츠 제작까지" />
                  </span>
                </p>

                <motion.p
                  className="text-white/40 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-16"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  에이전시를 통해 단 하나의 파트너로 브랜드의 모든 것을 완성합니다.
                  기획, 제작, 유통, AI — 나다운 콜렉티브가 함께합니다.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/8 pt-12">
                  {[
                    { n: '01', label: 'COMMERCE', sub: '커머스 제품 개발 · 유통 판매' },
                    { n: '02', label: 'CONTENT', sub: '하이엔드 영상 · 브랜드 콘텐츠' },
                    { n: '03', label: 'STRATEGY', sub: 'AI 기반 통합 마케팅 전략' },
                  ].map((v, i) => (
                    <motion.div
                      key={v.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                      <p className="text-[10px] text-white/15 mb-3 font-mono">{v.n}</p>
                      <h3 className="text-sm font-bold text-white mb-1.5 tracking-wide">{v.label}</h3>
                      <p className="text-white/30 text-xs">{v.sub}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            {/* ── 03 OUR STORY ─────────────────────────────────────────── */}
            <Section className="border-t border-white/8">
              <motion.p
                className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                OUR STORY
              </motion.p>

              <div className="overflow-hidden mb-12">
                <motion.h2
                  className="font-extrabold tracking-tighter leading-none text-white"
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
                  initial={{ y: '105%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                >
                  2020 <span className="text-white/15">→</span> 2026
                </motion.h2>
              </div>

              {/* Timeline grid — scroll-drawn lines + numbers */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 md:gap-4">
                {TIMELINE.map((item, i) => (
                  <TimelineRow key={item.year} item={item} index={i} />
                ))}
              </div>
            </Section>

            {/* ── 04 IP PARTNERSHIP ─────────────────────────────────────── */}
            <Section className="border-t border-white/8">
              <motion.p
                className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-14"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                IP PARTNERSHIP
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-5xl">
                <div>
                  <div className="overflow-hidden mb-8">
                    <motion.h2
                      className="font-extrabold tracking-tighter leading-none text-white"
                      style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
                      initial={{ y: '105%' }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    >
                      IP<br /><span className="text-[#FFB800]">CONNECT.</span>
                    </motion.h2>
                  </div>

                  <motion.p
                    className="text-white/40 text-base leading-relaxed mb-8 max-w-md font-light"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    중요 IP가 필요한 클라이언트에게 최적의 가격에 IP를 연결하여 콘텐츠를 제작합니다.
                    <br className="hidden md:block" /><br className="hidden md:block" />
                    협력사 <span className="text-white">STAR LOGIN</span>과의 파트너십으로 엔터테인먼트 IP 기반의 고퀄리티 콘텐츠를 제공합니다.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {['IP 발굴 및 연결', '엔터테인먼트 콘텐츠', '최적 가격 매칭', '아이돌 · 배우 · 셀럽'].map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border border-[#FFB800]/20 rounded-full text-[#FFB800]/60 bg-[#FFB800]/5">
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Partner card */}
                <motion.div
                  className="border border-white/8 rounded-2xl overflow-hidden bg-white/[0.02] relative"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Background image from starlogin.com */}
                  <img
                    src="https://starlogin.com/wp-content/uploads/2024/10/스타로그인_홈페이지.png"
                    alt="Star Login - IP Partnership"
                    className="w-full h-56 object-cover opacity-60"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-[#FFB800]" />
                      <span className="text-[10px] tracking-[0.25em] uppercase text-[#FFB800]/70 font-bold">IP Partner</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">STAR LOGIN</h3>
                    <p className="text-xs text-white/35 leading-relaxed mb-5">
                      핵심 인물 네트워크와 IP 포트폴리오를 기반으로 최고의 콘텐츠 솔루션을 제공하는 파트너사.
                    </p>
                    <a
                      href="https://starlogin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white border-b border-white/15 hover:border-white pb-0.5 transition-colors"
                    >
                      starlogin.com →
                    </a>
                  </div>
                </motion.div>
              </div>
            </Section>

            {/* ── 05 PARTNERS ──────────────────────────────────────────── */}
            <Section className="border-t border-white/8">
              <motion.div
                className="flex items-baseline justify-between mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-[10px] tracking-[0.35em] uppercase text-white/25">OUR PARTNERS</p>
                <p className="text-white/15 text-xs tabular-nums font-mono">{PARTNERS.length}+ BRANDS</p>
              </motion.div>

              <motion.div
                className="grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-5 mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {PARTNERS.map((p, i) => (
                  <motion.span
                    key={p}
                    className="text-[10px] font-bold text-white/20 hover:text-white/60 transition-colors tracking-wider uppercase truncate cursor-default"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.015 }}
                  >
                    {p}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                className="border-t border-white/8 pt-8 flex items-center justify-between"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-white/15 text-[10px]">COPYRIGHT © 2026 NADAUN All Rights Reserved</p>
                <p className="text-[#FFB800] text-[10px] tracking-widest uppercase font-bold">NADAUN COLLECTIVE</p>
              </motion.div>
            </Section>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutOverlay;
