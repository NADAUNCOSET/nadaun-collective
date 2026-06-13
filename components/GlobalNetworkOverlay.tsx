import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Globe, ChevronDown } from 'lucide-react';

interface GlobalNetworkOverlayProps {
  isOpen: boolean;
  onClose: () => void;   // 홈으로
  onBack: () => void;    // 사업영역(도메인)으로
  onContactClick: () => void;
}

const BROADCAST = [
  { cat: '공영 · 지상파',     items: ['KBS', 'MBC', 'SBS', 'EBS'] },
  { cat: '지역 민방',         items: ['TBC', 'KNN', 'KBC', 'TJB', 'JTV', 'UBC', 'CJB', 'G1', 'JIBS'] },
  { cat: '종합편성',          items: ['JTBC', '채널A', 'TV조선', 'MBN'] },
  { cat: '케이블 PP',         items: ['tvN', 'tvN SHOW', 'OCN', 'ENA', 'Mnet', 'E채널', 'OtvN', '코미디TV', 'MBC every1', 'MBC ON', '채널S'] },
  { cat: '보도 전문',         items: ['YTN', '연합뉴스TV'] },
  { cat: 'IPTV',              items: ['KT 지니TV', 'SK Btv', 'LG U+tv'] },
  { cat: '위성 · 케이블 SO',  items: ['KT 스카이라이프', 'LG헬로비전', '딜라이브', 'CMB', 'HCN'] },
];

const BTL = [
  { label: '지하철 스크린도어', spec: '1,470 × 470mm · 전국 주요역', img: 'https://media.nadaun.co/collective/btl/01-subway.webp' },
  { label: '옥외 전광판',      spec: 'Full HD / 4K · 가로·세로형',  img: 'https://media.nadaun.co/collective/btl/02-outdoor.webp' },
  { label: '택시 미디어',      spec: '후면 LED · 측면 랩핑 · 전국', img: 'https://media.nadaun.co/collective/btl/03-taxi.webp' },
  { label: '버스 외부광고',    spec: '슈퍼사이드 · 풀백 · 측면랩',  img: 'https://media.nadaun.co/collective/btl/04-bus.webp' },
];

const OVERSEAS = [
  { label: '일본 · 중국', spec: '도쿄 · 오사카 · 상하이 옥외/디지털',  img: 'https://media.nadaun.co/collective/ad-media/overseas-01.webp' },
  { label: '동남아',      spec: '베트남 · 태국 · 인니 미디어 집행',     img: 'https://media.nadaun.co/collective/ad-media/overseas-02.webp' },
  { label: '미국 · 유럽', spec: '뉴욕 · LA · 런던 · 파리 캠페인',       img: 'https://media.nadaun.co/collective/ad-media/overseas-03.webp' },
  { label: '글로벌 팬덤', spec: 'K-POP 팬클럽 · 공항 · 글로벌 옥외',    img: 'https://media.nadaun.co/collective/ad-media/overseas-04.webp' },
];

const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: false, margin: '-12%' }}
    transition={{ duration: 0.561, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const MediaCard: React.FC<{ item: { label: string; spec: string; img: string }; tag: string }> = ({ item, tag }) => (
  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] group">
    <img src={item.img} alt={item.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
    <div className="absolute bottom-0 left-0 p-5 md:p-7">
      <p className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-[#FFB800] font-bold mb-2">{tag}</p>
      <p className="font-black text-white leading-none mb-2" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.6rem)', letterSpacing: '-0.03em' }}>{item.label}</p>
      <p className="text-white/55 font-light" style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1.05rem)' }}>{item.spec}</p>
    </div>
  </div>
);

const GlobalNetworkOverlay: React.FC<GlobalNetworkOverlayProps> = ({ isOpen, onClose, onBack, onContactClick }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.374 }}
          className="fixed inset-0 z-[120] bg-[#050505] text-white overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          {/* BACK → 사업영역 */}
          <button onClick={onBack}
            className="fixed top-7 left-7 md:top-10 md:left-10 z-[130] flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md text-xs md:text-sm font-bold tracking-wider uppercase text-white/70 hover:text-[#FFB800] transition-all">
            <ArrowLeft size={16} /> 사업영역
          </button>
          {/* X → 홈 */}
          <button onClick={onClose}
            className="fixed top-7 right-7 md:top-10 md:right-10 z-[130] p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group backdrop-blur-md">
            <X size={22} className="text-white group-hover:text-[#FFB800] transition-colors" />
          </button>

          {/* Intro */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
            <FadeIn>
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#FFB800] to-orange-500 rounded-full flex items-center justify-center mb-10 shadow-[0_0_60px_rgba(255,184,0,0.3)]">
                <Globe className="w-10 h-10 text-black" />
              </div>
              <p className="text-xs md:text-sm tracking-[0.5em] uppercase text-[#FFB800] font-bold mb-6">03 · GLOBAL NETWORK</p>
              <h2 className="font-black tracking-tighter leading-[0.85] mb-8" style={{ fontSize: 'clamp(4rem, 13vw, 11rem)' }}>
                전국에서<br /><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-700">전세계로.</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed break-keep">
                방송·IPTV·케이블부터 오프라인 BTL, 해외 미디어까지 —<br className="hidden md:block" />
                어떤 매체든, 어디든 닿는 나다운의 송출 네트워크.
              </p>
            </FadeIn>
            <motion.div animate={{ y: [0, 14, 0], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.0, ease: 'easeInOut' }}
              className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <span className="text-[10px] tracking-[0.4em] text-gray-500 uppercase font-bold">Scroll</span>
              <ChevronDown className="text-gray-500 w-5 h-5" />
            </motion.div>
          </section>

          {/* 1. 전국 방송 송출 */}
          <section className="min-h-screen flex flex-col justify-center py-28 px-6 md:px-16 lg:px-24 border-t border-white/5 max-w-7xl mx-auto w-full">
            <FadeIn>
              <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-3">NATIONWIDE BROADCAST</p>
              <h3 className="font-black text-white leading-[0.9] mb-4" style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}>전국 방송 송출</h3>
              <p className="text-white/45 text-base md:text-xl font-light mb-12">공영 · 지역민방 · 종편 · 케이블 · 보도 · IPTV · 위성 — 모든 송출 채널</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {BROADCAST.map((grp, i) => (
                <FadeIn key={grp.cat} delay={0.04 * i}>
                  <div className="border-l-2 border-[#FFB800]/40 pl-5">
                    <p className="text-[11px] tracking-[0.35em] uppercase text-[#FFB800] font-bold mb-2">{grp.cat}</p>
                    <p className="font-black leading-tight text-white/90" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.6rem)', letterSpacing: '-0.01em' }}>{grp.items.join(' · ')}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* 2. 오프라인 BTL */}
          <section className="min-h-screen flex flex-col justify-center py-28 px-6 md:px-16 lg:px-24 border-t border-white/5 max-w-7xl mx-auto w-full">
            <FadeIn>
              <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-3">OFFLINE BTL</p>
              <h3 className="font-black text-white leading-[0.9] mb-4" style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}>오프라인 매체</h3>
              <p className="text-white/45 text-base md:text-xl font-light mb-12">지하철 · 옥외 전광판 · 택시 · 버스 — 전국 BTL 집행</p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7">
              {BTL.map((item, i) => (
                <FadeIn key={item.label} delay={0.05 * i}><MediaCard item={item} tag={`오프라인 BTL · 0${i + 1}`} /></FadeIn>
              ))}
            </div>
          </section>

          {/* 3. 해외 광고 */}
          <section className="min-h-screen flex flex-col justify-center py-28 px-6 md:px-16 lg:px-24 border-t border-white/5 max-w-7xl mx-auto w-full">
            <FadeIn>
              <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-3">OVERSEAS</p>
              <h3 className="font-black text-white leading-[0.9] mb-4" style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}>해외 광고</h3>
              <p className="text-white/45 text-base md:text-xl font-light mb-12">일본 · 중국 · 동남아 · 미국 · 유럽 · 글로벌 팬덤</p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7">
              {OVERSEAS.map((item, i) => (
                <FadeIn key={item.label} delay={0.05 * i}><MediaCard item={item} tag={`OVERSEAS · 0${i + 1}`} /></FadeIn>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#FFB800]/5">
            <FadeIn>
              <h3 className="font-black text-white mb-8 tracking-tighter leading-none" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}>
                전국·전세계<br /><span className="text-[#FFB800]">어디든.</span>
              </h3>
              <button onClick={() => { onClose(); onContactClick(); }}
                className="mx-auto bg-[#FFB800] text-black px-12 py-6 rounded-full font-bold tracking-widest uppercase hover:bg-white hover:scale-105 transition-all duration-500 flex items-center gap-4 group text-lg md:text-xl">
                광고 문의하기 <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
              </button>
            </FadeIn>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalNetworkOverlay;
