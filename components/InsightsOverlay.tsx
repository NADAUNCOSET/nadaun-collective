import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

// ── 송출영상 풀스크린 배경 (LIVERNOVO 송출분) — R2, 무음 순환 ──
const VideoBg: React.FC = () => {
  const [vids, setVids] = useState<{ src: string }[]>([]);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    fetch('/livernovo-videos.json')
      .then(r => r.json())
      .then((m: any[]) => {
        const list = (Array.isArray(m) ? m : []).filter(x => x && x.src && String(x.project || '').includes('livernovo'));
        if (list.length) setVids(list);
      })
      .catch(() => {});
  }, []);
  if (!vids.length) return null;
  const cur = vids[idx % vids.length];
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video key={cur.src} src={cur.src} autoPlay muted playsInline preload="auto"
        onEnded={() => setIdx(i => (i + 1) % vids.length)}
        onError={() => setIdx(i => (i + 1) % vids.length)}
        className="w-full h-full object-cover" style={{ opacity: 0.4 }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(7,7,7,0.62) 0%, rgba(7,7,7,0.38) 45%, rgba(7,7,7,0.78) 100%)' }} />
    </div>
  );
};

// 단어별 좌→오 슬라이드 (문장 완성)
const WordSlide: React.FC<{ text: string; className?: string; style?: React.CSSProperties; delay?: number; stagger?: number }> = ({ text, className, style, delay = 0, stagger = 0.09 }) => (
  <span className={`inline-flex flex-wrap justify-center ${className ?? ''}`}>
    {text.split(' ').map((w, i) => (
      <span key={i} className="inline-block overflow-hidden py-[0.04em]">
        <motion.span className="inline-block"
          initial={{ x: '-40%', opacity: 0 }}
          whileInView={{ x: '0%', opacity: 1 }}
          viewport={{ once: false, margin: '-10%' }}
          transition={{ duration: 0.7, delay: delay + i * stagger, ease: EASE }}
          style={style}>
          {w}&nbsp;
        </motion.span>
      </span>
    ))}
  </span>
);

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 44, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: false, margin: '-12%' }}
    transition={{ duration: 0.6, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

const KPIS = [
  { value: '4,190만+', label: '총 도달 IMPRESSION', sub: 'PP + IPTV + 케이블 + 재핑 전 매체 합산', accent: true },
  { value: '416%', label: 'PP 계약 대비 달성', sub: '계약 311회 → 실송출 1,296회', accent: true },
  { value: '1,206만', label: 'IPTV 노출', sub: 'KT · LG · SK 3사 통합' },
  { value: '2,984만', label: '재핑 도달 가구', sub: '딜라이브 전국 케이블' },
];

const PP_BREAKDOWN = [
  { ch: 'JTBC4', n: 336 }, { ch: 'OCN Movies2', n: 243 }, { ch: 'OCN Movies', n: 230 },
  { ch: 'OCN', n: 227 }, { ch: 'JTBC', n: 130 }, { ch: 'tvN', n: 130 },
];
const PP_MAX = 336;

const IPTV3 = [
  { ch: 'KT LiveAD', n: '468만', pct: 39 },
  { ch: 'LG ART', n: '396만', pct: 33 },
  { ch: 'SK SBA', n: '342만', pct: 28 },
];

interface InsightsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick?: () => void;
}

const InsightsOverlay: React.FC<InsightsOverlayProps> = ({ isOpen, onClose, onContactClick }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[105] bg-[#070707] text-white overflow-y-auto overflow-x-hidden scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
          initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <VideoBg />

          <button onClick={onClose}
            className="fixed top-7 right-7 md:top-10 md:right-10 z-[130] p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group backdrop-blur-md">
            <X size={22} className="text-white group-hover:text-[#FFB800] transition-colors" />
          </button>

          <div className="relative z-10">

            {/* Intro */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
              <FadeIn>
                <p className="text-xs md:text-sm tracking-[0.5em] uppercase text-[#FFB800] font-bold mb-8">LIVERNOVO CAMPAIGN · 2025.10 — 11</p>
              </FadeIn>
              <h2 className="font-black tracking-tighter leading-[0.86] mb-10" style={{ fontSize: 'clamp(3.6rem, 13vw, 12rem)' }}>
                <WordSlide text="총 4,190만+" /><br />
                <WordSlide text="도달했습니다." delay={0.3} style={{ color: '#FFB800' }} />
              </h2>
              <FadeIn delay={0.5}>
                <p className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed break-keep">
                  PP · IPTV 3사 · 케이블 · 재핑까지 — 한 달간 전국 전 매체로 송출한<br className="hidden md:block" />
                  <span className="text-white font-medium">Livernovo TVC 캠페인</span> 실측 결과입니다.
                </p>
              </FadeIn>
              <motion.div animate={{ y: [0, 14, 0], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-[10px] tracking-[0.4em] text-gray-500 uppercase font-bold">Results</span>
                <ChevronDown className="text-gray-500 w-5 h-5" />
              </motion.div>
            </section>

            {/* KPI */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center py-28 px-6 border-t border-white/5">
              <FadeIn><p className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-4">CAMPAIGN RESULTS</p></FadeIn>
              <FadeIn delay={0.05}><h3 className="font-black leading-[0.9] mb-16" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}>핵심 성과</h3></FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-5xl w-full">
                {KPIS.map((k, i) => (
                  <FadeIn key={k.label} delay={0.08 * i}>
                    <div className="flex flex-col items-center text-center border-t border-white/10 pt-8">
                      <span className="font-black tabular-nums leading-none mb-4" style={{ fontSize: 'clamp(3.2rem, 10vw, 7rem)', letterSpacing: '-0.04em', color: k.accent ? '#FFB800' : '#fff' }}>{k.value}</span>
                      <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-white/55 font-bold mb-2">{k.label}</span>
                      <span className="text-white/40 text-sm font-light">{k.sub}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>

            {/* PP 채널별 송출 */}
            <section className="min-h-screen flex flex-col items-center justify-center py-28 px-6 border-t border-white/5">
              <FadeIn className="text-center"><p className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-4">PP BROADCAST · 1,296회</p></FadeIn>
              <FadeIn delay={0.05} className="text-center"><h3 className="font-black leading-[0.9] mb-3" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}>채널별 송출</h3></FadeIn>
              <FadeIn delay={0.1} className="text-center"><p className="text-white/40 text-sm md:text-base font-light mb-14">JTBC · JTBC4 · tvN · OCN 계열 — 계약 311회 대비 4.2배 송출</p></FadeIn>
              <div className="flex flex-col gap-5 md:gap-6 max-w-3xl w-full">
                {PP_BREAKDOWN.map((c, i) => (
                  <FadeIn key={c.ch} delay={0.05 * i}>
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className="font-bold text-white/80 w-28 md:w-40 shrink-0 text-right" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.4rem)' }}>{c.ch}</span>
                      <div className="flex-1 h-9 md:h-11 bg-white/5 rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full bg-gradient-to-r from-[#FFB800]/70 to-[#FFB800]"
                          initial={{ width: 0 }} whileInView={{ width: `${(c.n / PP_MAX) * 100}%` }} viewport={{ once: false, margin: '-10%' }}
                          transition={{ duration: 0.9, delay: 0.05 * i, ease: EASE }} />
                      </div>
                      <span className="font-black tabular-nums text-white w-16 md:w-24 shrink-0" style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.9rem)' }}>{c.n}회</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>

            {/* IPTV 3사 */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center py-28 px-6 border-t border-white/5">
              <FadeIn><p className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-4">IPTV · 1,206만 노출</p></FadeIn>
              <FadeIn delay={0.05}><h3 className="font-black leading-[0.9] mb-14" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}>IPTV 3사 통합</h3></FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 max-w-4xl w-full">
                {IPTV3.map((p, i) => (
                  <FadeIn key={p.ch} delay={0.08 * i}>
                    <div className="flex flex-col items-center border-t border-white/10 pt-8">
                      <span className="font-black tabular-nums leading-none mb-3" style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)', letterSpacing: '-0.04em', color: '#fff' }}>{p.n}</span>
                      <span className="text-[11px] tracking-[0.3em] uppercase text-[#FFB800]/70 font-bold mb-1">{p.ch}</span>
                      <span className="text-white/35 text-sm font-light">노출 {p.pct}%</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>

            {/* 집행 정보 */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center py-28 px-6 border-t border-white/5">
              <FadeIn>
                <h3 className="font-black leading-[0.9] mb-16" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}>
                  <WordSlide text="전국 전 매체," /><br /><WordSlide text="한 번에." delay={0.25} style={{ color: '#FFB800' }} />
                </h3>
              </FadeIn>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full">
                {[
                  { k: '집행 기간', v: '31일', s: '2025.10.22 — 11.21' },
                  { k: '매체', v: '4종', s: 'PP · IPTV · 케이블 · 재핑' },
                  { k: '소재', v: '2편', s: 'Livernovo 남 / 여 15초' },
                  { k: '케이블 송출', v: '322회', s: '심포니 (계약 262)' },
                ].map((x, i) => (
                  <FadeIn key={x.k} delay={0.06 * i}>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold mb-3">{x.k}</span>
                      <span className="font-black text-white tabular-nums leading-none mb-2" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)' }}>{x.v}</span>
                      <span className="text-white/35 text-xs font-light">{x.s}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <FadeIn delay={0.3}>
                <p className="mt-20 text-white/25 text-xs tracking-widest uppercase">NADAUN COLLECTIVE · Livernovo TVC 캠페인 실측 (2025.11.25 집계)</p>
              </FadeIn>
            </section>

            {/* CTA — 마지막은 문의하기로 */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#FFB800]/8">
              <FadeIn>
                <p className="text-xs md:text-sm tracking-[0.5em] uppercase text-[#FFB800] font-bold mb-9">NEXT CAMPAIGN</p>
                <h3 className="font-black text-white mb-12 tracking-tighter leading-[0.9]" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}>
                  <WordSlide text="다음 성과의" /><br /><WordSlide text="주인공은?" delay={0.22} style={{ color: '#FFB800' }} />
                </h3>
                <button onClick={() => { onClose(); onContactClick?.(); }}
                  className="mx-auto bg-[#FFB800] text-black px-12 py-6 rounded-full font-bold tracking-widest uppercase hover:bg-white hover:scale-105 transition-all duration-500 flex items-center gap-4 text-lg md:text-xl">
                  프로젝트 문의하기 →
                </button>
              </FadeIn>
            </section>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InsightsOverlay;
