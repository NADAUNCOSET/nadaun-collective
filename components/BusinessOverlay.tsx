import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion';
import { X, Lightbulb, Zap, Globe, Sparkles } from 'lucide-react';

const HEADER_H = 57;

// Ch1 intro + Ch2 domain list + Ch3 IMMERSIVE CREATIVE process + Ch4 GLOBAL NETWORK (채널·BTL·해외)
const H1 = 120, H2 = 200, H3 = 280, H4 = 420; // 대표 룰 2026-06-13: GLOBAL NETWORK 허브 신설
const TOTAL = H1 + H2 + H3 + H4;

const C1S = 0,   C1E = H1 / TOTAL;
const C2S = C1E, C2E = (H1 + H2) / TOTAL;
const C3S = C2E, C3E = (H1 + H2 + H3) / TOTAL;
const C4S = C3E, C4E = 1;

const DOMAINS = [
  { id: '01', title: 'INTEGRATED SOLUTION', subtitle: 'IP Strategy & Planning',        tags: ['IP Architecture', 'Brand Strategy', 'Market Positioning'], icon: Lightbulb },
  { id: '02', title: 'IMMERSIVE CREATIVE',  subtitle: 'High-End IP Production',        tags: ['TVC Production', 'Brand Film', '3D Motion'],               icon: Zap       },
  { id: '03', title: 'GLOBAL NETWORK',      subtitle: 'Nationwide & Global Media',     tags: ['Broadcast · IPTV · BTL', 'Global Media', 'Overseas'],      icon: Globe     },
  { id: '04', title: 'AI INNOVATION LAB',   subtitle: 'Next-Gen Tech Enhancement',     tags: ['AI Production', 'VFX Pipeline', 'Gen AI'],                 icon: Sparkles  },
];

const PROCESS = [
  { num: '01', title: '제작의뢰', desc: 'OT를 통해 영상 제작에 대한 고객의 니즈를 파악합니다.' },
  { num: '02', title: '기획',     desc: '고객의 니즈를 바탕으로 아이디어를 구상하고 컨셉을 도출합니다.' },
  { num: '03', title: 'PPM / 촬영', desc: '사전 미팅으로 세부 의견을 조율한 후 전문 촬영진이 진행합니다.' },
  { num: '04', title: '후반작업', desc: '전문 영상 편집자들이 고객의 요청에 맞추어 편집을 진행합니다.' },
  { num: '05', title: '시사 및 수정', desc: '고객과 함께 시사를 통해 피드백을 받은 후 수정사항을 반영합니다.' },
  { num: '06', title: 'On-Air',   desc: '최종 확인 후 완성된 제작물을 매체로 On-Air합니다.' },
];

// ── GLOBAL NETWORK 데이터 (About에서 이동) ───────────────────────────────────
const BROADCAST_CHANNELS = [
  { cat: '공영 · 지상파',     items: ['KBS', 'MBC', 'SBS', 'EBS'] },
  { cat: '지역 민방',         items: ['TBC', 'KNN', 'KBC', 'TJB', 'JTV', 'UBC', 'CJB', 'G1', 'JIBS'] },
  { cat: '종합편성',          items: ['JTBC', '채널A', 'TV조선', 'MBN'] },
  { cat: '케이블 PP',         items: ['tvN', 'tvN SHOW', 'OCN', 'ENA', 'Mnet', 'E채널', 'OtvN', '코미디TV', 'MBC every1', 'MBC ON', '채널S'] },
  { cat: '보도 전문',         items: ['YTN', '연합뉴스TV'] },
  { cat: 'IPTV',              items: ['KT 지니TV', 'SK Btv', 'LG U+tv'] },
  { cat: '위성 · 케이블 SO',  items: ['KT 스카이라이프', 'LG헬로비전', '딜라이브', 'CMB', 'HCN'] },
];

const BTL_ITEMS = [
  { label: '지하철 스크린도어', spec: '1,470 × 470mm · 전국 주요역', img: 'https://media.nadaun.co/collective/btl/01-subway.webp' },
  { label: '옥외 전광판',      spec: 'Full HD / 4K · 가로·세로형',  img: 'https://media.nadaun.co/collective/btl/02-outdoor.webp' },
  { label: '택시 미디어',      spec: '후면 LED · 측면 랩핑 · 전국', img: 'https://media.nadaun.co/collective/btl/03-taxi.webp' },
  { label: '버스 외부광고',    spec: '슈퍼사이드 · 풀백 · 측면랩',  img: 'https://media.nadaun.co/collective/btl/04-bus.webp' },
];

const OVERSEAS_ITEMS = [
  { label: '일본 · 중국', spec: '도쿄 · 오사카 · 상하이 옥외/디지털',  img: 'https://media.nadaun.co/collective/ad-media/overseas-01.webp' },
  { label: '동남아',      spec: '베트남 · 태국 · 인니 미디어 집행',     img: 'https://media.nadaun.co/collective/ad-media/overseas-02.webp' },
  { label: '미국 · 유럽', spec: '뉴욕 · LA · 런던 · 파리 캠페인',       img: 'https://media.nadaun.co/collective/ad-media/overseas-03.webp' },
  { label: '글로벌 팬덤', spec: 'K-POP 팬클럽 · 공항 · 글로벌 옥외',    img: 'https://media.nadaun.co/collective/ad-media/overseas-04.webp' },
];

const StickyPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
    className="flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden"
  >
    {children}
  </div>
);

// ── Ch1 — word-by-word horizontal slide ──────────────────────────────────────
const Ch1: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C1S, C1E], [0, 1]);

  // 세 단어가 순서대로 나타나 한 화면에 모두 남음 (대표 룰: 차례대로 한 화면에, About Ch1 패턴 통일 2026-06-12)
  const w1Op = useTransform(p, [0.04, 0.16], [0, 1]);
  const w1Y  = useTransform(p, [0.04, 0.16], ['40px', '0px']);
  const w2Op = useTransform(p, [0.20, 0.32], [0, 1]);
  const w2Y  = useTransform(p, [0.20, 0.32], ['40px', '0px']);
  const w3Op = useTransform(p, [0.36, 0.48], [0, 1]);
  const w3Y  = useTransform(p, [0.36, 0.48], ['40px', '0px']);
  const subOp = useTransform(p, [0.50, 0.62], [0, 1]);
  const subY  = useTransform(p, [0.50, 0.62], ['20px', '0px']);
  const exitOp = useTransform(p, [0.74, 0.98], [1, 0]);
  const exitY  = useTransform(p, [0.74, 0.98], ['0px', '-60px']);

  const FS = { fontSize: 'clamp(3rem, 11vw, 9rem)' } as const;

  return (
    <div style={{ height: `${H1}vh` }}>
      <div
        style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
        className="relative overflow-hidden flex flex-col justify-center px-8 md:px-16 lg:px-24"
      >
        <p className="absolute top-8 left-8 md:left-16 lg:left-24 text-xs tracking-[0.4em] uppercase text-[#FFB800] font-bold">
          Business Overview
        </p>
        <motion.div style={{ opacity: exitOp, y: exitY, willChange: 'transform, opacity' }} className="flex flex-col">
          <motion.h1 style={{ opacity: w1Op, y: w1Y, color: '#ffffff', willChange: 'transform' }}
            className="font-black tracking-[-0.04em] leading-[0.95] whitespace-nowrap">
            <span style={FS}>WE BUILD</span>
          </motion.h1>
          <motion.h1 style={{ opacity: w2Op, y: w2Y, color: 'rgba(255,255,255,0.22)', willChange: 'transform' }}
            className="font-black tracking-[-0.04em] leading-[0.95] whitespace-nowrap">
            <span style={FS}>THE NEXT</span>
          </motion.h1>
          <motion.h1 style={{ opacity: w3Op, y: w3Y, color: '#FFB800', willChange: 'transform' }}
            className="font-black tracking-[-0.04em] leading-[0.95] whitespace-nowrap">
            <span style={FS}>LEVEL.</span>
          </motion.h1>
          <motion.p
            style={{ opacity: subOp, y: subY }}
            className="mt-10 text-white/60 text-base md:text-xl font-light leading-relaxed max-w-xl"
          >
            커머스 제품 개발부터 유통 판매, 하이엔드 콘텐츠 제작까지 —<br />
            단 하나의 파트너로 브랜드의 모든 것을 완성합니다.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

// ── Ch2 — domain list (clickable) ────────────────────────────────────────────
const Ch2: React.FC<{
  g: MotionValue<number>;
  onAiLabClick?: () => void;
  onIntegratedClick?: () => void;
  onCreativeClick?: () => void;
  onGlobalClick?: () => void;
}> = ({ g, onAiLabClick, onIntegratedClick, onCreativeClick, onGlobalClick }) => {
  const p = useTransform(g, [C2S, C2E], [0, 1]);

  const titleOp = useTransform(p, [0.00, 0.10], [0, 1]);
  const titleX  = useTransform(p, [0.00, 0.10], ['-5%', '0%']);

  const d0Op = useTransform(p, [0.08, 0.18], [0, 1]); const d0X = useTransform(p, [0.08, 0.18], ['5%', '0%']);
  const d1Op = useTransform(p, [0.18, 0.28], [0, 1]); const d1X = useTransform(p, [0.18, 0.28], ['5%', '0%']);
  const d2Op = useTransform(p, [0.28, 0.38], [0, 1]); const d2X = useTransform(p, [0.28, 0.38], ['5%', '0%']);
  const d3Op = useTransform(p, [0.38, 0.48], [0, 1]); const d3X = useTransform(p, [0.38, 0.48], ['5%', '0%']);
  const d4Op = useTransform(p, [0.48, 0.58], [0, 1]); const d4X = useTransform(p, [0.48, 0.58], ['5%', '0%']);

  const exitOp = useTransform(p, [0.76, 0.94], [1, 0]);
  const exitX  = useTransform(p, [0.76, 0.94], ['0%', '-6%']);

  const dOps = [d0Op, d1Op, d2Op, d3Op, d4Op];
  const dXs  = [d0X, d1X, d2X, d3X, d4X];

  return (
    <div style={{ height: `${H2}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, x: exitX }}>
          <motion.p style={{ opacity: titleOp, x: titleX }}
            className="text-xs tracking-[0.4em] uppercase text-[#FFB800] mb-10 font-bold"
          >BUSINESS DOMAINS</motion.p>
          <div className="flex flex-col gap-0">
            {DOMAINS.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.id}
                  style={{ opacity: dOps[i], x: dXs[i] }}
                  className="group border-t border-white/10 py-5 md:py-6 flex items-center gap-5 md:gap-8 cursor-pointer hover:bg-white/[0.02] -mx-4 px-4 rounded transition-colors"
                  onClick={() => {
                    if (d.id === '01' && onIntegratedClick) onIntegratedClick();
                    if (d.id === '02' && onCreativeClick) onCreativeClick();
                    if (d.id === '03' && onGlobalClick) onGlobalClick();
                    if (d.id === '04' && onAiLabClick) onAiLabClick();
                  }}
                >
                  <span className="font-mono text-sm text-white/25 shrink-0 w-6">{d.id}</span>
                  <Icon className="w-5 h-5 text-white/30 group-hover:text-[#FFB800] transition-colors shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black tracking-[-0.02em] text-white/80 group-hover:text-white transition-colors leading-none"
                      style={{ fontSize: 'clamp(1.6rem, 4vw, 3.5rem)' }}>
                      {d.title}
                    </h3>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#FFB800]/50 font-bold mt-1 hidden md:block">
                      {d.subtitle}
                    </p>
                  </div>
                  <div className="hidden md:flex flex-wrap gap-1.5 ml-auto">
                    {d.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-[#FFB800]/60 border border-[#FFB800]/20 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-white/20 group-hover:text-[#FFB800] transition-colors text-sm ml-4">→</span>
                </motion.div>
              );
            })}
            <div className="border-t border-white/10" />
          </div>
          <motion.p style={{ opacity: d3Op }} className="mt-6 text-[11px] text-white/22 font-light tracking-widest uppercase">
            도메인을 클릭하여 상세 확인 — 02 IMMERSIVE CREATIVE · 03 GLOBAL NETWORK
          </motion.p>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Process Slide — full-screen dissolve for each production step ─────────────
const ProcessSlide: React.FC<{
  step: { num: string; title: string; desc: string };
  index: number;
  total: number;
  p: MotionValue<number>;
  onGlobalClick?: () => void;
}> = ({ step, index, total, p, onGlobalClick }) => {
  const seg = 1 / total;
  const start = index * seg;
  const end = (index + 1) * seg;
  const fadeLen = seg * 0.09;

  const op = useTransform(
    p,
    index === total - 1
      ? [Math.max(0, start - fadeLen * 0.5), start + fadeLen, 1, 1]
      : [Math.max(0, start - fadeLen * 0.5), start + fadeLen, end - fadeLen, Math.min(1, end + fadeLen * 0.5)],
    index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );

  // Number appears first
  const numOp = useTransform(p, [start + fadeLen, start + fadeLen * 2.5], [0, 1]);
  const numY  = useTransform(p, [start + fadeLen, start + fadeLen * 2.5], ['40px', '0px']);

  // Title appears after number
  const titleOp = useTransform(p, [start + seg * 0.10, start + seg * 0.18], [0, 1]);
  const titleY  = useTransform(p, [start + seg * 0.10, start + seg * 0.18], ['30px', '0px']);

  // Desc appears last
  const descOp  = useTransform(p, [start + seg * 0.18, start + seg * 0.28], [0, 1]);

  return (
    <motion.div
      style={{ opacity: op, position: 'absolute', inset: 0 }}
      className="flex flex-col justify-center px-8 md:px-16 lg:px-24 pointer-events-none"
    >
      <p className="text-[11px] tracking-[0.45em] uppercase text-[#FFB800]/60 font-bold mb-6">
        IMMERSIVE CREATIVE · PRODUCTION PROCESS
      </p>
      <motion.div style={{ opacity: numOp, y: numY }}>
        <span
          className="block font-black leading-none tabular-nums"
          style={{
            fontSize: 'clamp(6rem, 22vw, 18rem)',
            color: 'rgba(255,255,255,0.06)',
            letterSpacing: '-0.04em',
            fontFamily: 'Manrope, sans-serif',
          }}
        >{step.num}</span>
      </motion.div>
      <motion.h2
        style={{
          opacity: titleOp, y: titleY,
          fontSize: 'clamp(3rem, 10vw, 9rem)',
          color: 'white',
          marginTop: '-0.15em',
        }}
        className="font-black tracking-[-0.03em] leading-none block"
      >{step.title}</motion.h2>
      <motion.p style={{ opacity: descOp }} className="mt-8 text-white/55 text-base md:text-xl font-light leading-relaxed max-w-lg">
        {step.desc}
      </motion.p>

      {/* On-Air 단계: 포트폴리오 + GLOBAL NETWORK 링크 (대표 룰 2026-06-13) */}
      {step.num === '06' && (
        <motion.div style={{ opacity: descOp }} className="mt-9 flex flex-wrap gap-3 pointer-events-auto">
          <a href="https://photo.nadaun.co" target="_blank" rel="noopener noreferrer"
            className="text-xs md:text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-full border border-[#FFB800]/40 text-[#FFB800] hover:bg-[#FFB800] hover:text-black transition-colors">
            사진 포트폴리오 →
          </a>
          <a href="https://video.nadaun.co" target="_blank" rel="noopener noreferrer"
            className="text-xs md:text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-full border border-[#FFB800]/40 text-[#FFB800] hover:bg-[#FFB800] hover:text-black transition-colors">
            영상 포트폴리오 →
          </a>
          <button onClick={onGlobalClick}
            className="text-xs md:text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-colors">
            GLOBAL NETWORK →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

// ── Ch3 — IMMERSIVE CREATIVE: production steps one-by-one ────────────────────
const Ch3: React.FC<{ g: MotionValue<number>; onGlobalClick?: () => void }> = ({ g, onGlobalClick }) => {
  const p = useTransform(g, [C3S, C3E], [0, 1]);
  const exitOp = useTransform(p, [0.88, 0.98], [1, 0]);

  // Step indicator — slides along like the year rail
  const seg = 1 / PROCESS.length;
  const indicatorPct = useTransform(p, [0, 1 - seg], ['0%', `${100 * (1 - seg)}%`]);

  return (
    <div style={{ height: `${H3}vh` }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }} className="relative overflow-hidden">
        <motion.div style={{ opacity: exitOp }} className="absolute inset-0">

          {/* Step rail at top */}
          <div className="absolute top-8 left-8 md:left-16 lg:left-24 right-8 md:right-16 lg:right-24 z-10">
            <p className="text-[11px] tracking-[0.35em] uppercase text-[#FFB800]/60 font-bold mb-4">
              02 · IMMERSIVE CREATIVE — PRODUCTION PROCESS
            </p>
            <div className="relative">
              <div className="absolute top-[10px] left-0 right-0 h-[1px] bg-white/10" />
              <div className="relative flex justify-between">
                {PROCESS.map((step) => (
                  <div key={step.num} className="flex flex-col items-center gap-2">
                    <div className="w-[5px] h-[5px] rounded-full bg-white/15" />
                    <span className="text-[9px] font-mono text-white/25">{step.num}</span>
                  </div>
                ))}
              </div>
              <motion.div
                className="absolute top-[7px] flex flex-col items-center"
                style={{ left: indicatorPct, translateX: '-50%' }}
              >
                <div className="w-[12px] h-[12px] rounded-full bg-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.8)]" />
              </motion.div>
            </div>
          </div>

          {/* Dissolving process slides */}
          <div className="absolute inset-0 pt-24">
            {PROCESS.map((step, i) => (
              <ProcessSlide key={step.num} step={step} index={i} total={PROCESS.length} p={p} onGlobalClick={onGlobalClick} />
            ))}
          </div>

          {/* Footer */}
          <div className="absolute bottom-8 left-8 md:left-16 lg:left-24 right-8 md:right-16 lg:right-24 flex items-center justify-between">
            <p className="text-white/18 text-[10px]">COPYRIGHT © 2026 NADAUN All Rights Reserved</p>
            <p className="text-[#FFB800] text-[10px] tracking-widest uppercase font-bold">NADAUN COLLECTIVE</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ── Ch4 — GLOBAL NETWORK: 방송채널 → 오프라인 BTL → 해외 광고 (대표 룰 2026-06-13) ──
const Ch4: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C4S, C4E], [0, 1]);

  const aOp = useTransform(p, [0.00, 0.05, 0.28, 0.34], [0, 1, 1, 0]); // 방송채널
  const bOp = useTransform(p, [0.34, 0.40, 0.62, 0.68], [0, 1, 1, 0]); // BTL
  const cOp = useTransform(p, [0.68, 0.74, 1.00, 1.00], [0, 1, 1, 1]); // 해외

  const ch1 = useTransform(p, [0.04, 0.12], [0, 1]);
  const ch2 = useTransform(p, [0.10, 0.18], [0, 1]);

  const t1 = useTransform(p, [0.36, 0.42], [0, 1]); const t1y = useTransform(p, [0.36, 0.42], ['30px', '0px']);
  const t2 = useTransform(p, [0.39, 0.45], [0, 1]); const t2y = useTransform(p, [0.39, 0.45], ['30px', '0px']);
  const t3 = useTransform(p, [0.42, 0.48], [0, 1]); const t3y = useTransform(p, [0.42, 0.48], ['30px', '0px']);
  const t4 = useTransform(p, [0.45, 0.51], [0, 1]); const t4y = useTransform(p, [0.45, 0.51], ['30px', '0px']);

  const o1 = useTransform(p, [0.70, 0.76], [0, 1]); const o1y = useTransform(p, [0.70, 0.76], ['30px', '0px']);
  const o2 = useTransform(p, [0.73, 0.79], [0, 1]); const o2y = useTransform(p, [0.73, 0.79], ['30px', '0px']);
  const o3 = useTransform(p, [0.76, 0.82], [0, 1]); const o3y = useTransform(p, [0.76, 0.82], ['30px', '0px']);
  const o4 = useTransform(p, [0.79, 0.85], [0, 1]); const o4y = useTransform(p, [0.79, 0.85], ['30px', '0px']);

  const btlT = [{ op: t1, y: t1y }, { op: t2, y: t2y }, { op: t3, y: t3y }, { op: t4, y: t4y }];
  const ovT  = [{ op: o1, y: o1y }, { op: o2, y: o2y }, { op: o3, y: o3y }, { op: o4, y: o4y }];

  return (
    <div style={{ height: `${H4}vh` }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }} className="relative overflow-hidden">
        <div className="absolute top-8 left-8 md:left-16 lg:left-24 z-10 pointer-events-none">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#FFB800]/60 font-bold">03 · GLOBAL NETWORK — 전국·전세계 송출</p>
        </div>

        {/* A. 방송채널 */}
        <motion.div style={{ opacity: aOp }} className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-2">공영 · 지역민방 · 종편 · 케이블 · 보도 · IPTV · 위성</p>
          <p className="text-white/45 text-xs md:text-sm font-light mb-7">전국 모든 송출 채널 — 어디든 닿습니다</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-5xl">
            {BROADCAST_CHANNELS.map((grp, gi) => (
              <motion.div key={grp.cat} style={{ opacity: gi < 4 ? ch1 : ch2 }} className="border-l-2 border-[#FFB800]/40 pl-4">
                <p className="text-[10px] tracking-[0.35em] uppercase text-[#FFB800] font-bold mb-1.5">{grp.cat}</p>
                <p className="font-black leading-tight text-white/90" style={{ fontSize: 'clamp(1.05rem, 2vw, 1.85rem)', letterSpacing: '-0.01em' }}>{grp.items.join(' · ')}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* B. 오프라인 BTL */}
        <motion.div style={{ opacity: bOp }} className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-2">오프라인 BTL — 전국 매체</p>
          <p className="text-white/45 text-xs md:text-sm font-light mb-6 md:mb-8">지하철 · 옥외 전광판 · 택시 · 버스</p>
          <div className="grid grid-cols-2 gap-3 md:gap-5 max-w-5xl w-full">
            {BTL_ITEMS.map((item, i) => (
              <motion.div key={item.label} style={{ opacity: btlT[i].op, y: btlT[i].y, willChange: 'transform, opacity' }} className="relative rounded-xl overflow-hidden aspect-[16/10]">
                <img src={item.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-6">
                  <p className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-[#FFB800] font-bold mb-1.5">오프라인 BTL · 0{i + 1}</p>
                  <p className="font-black text-white leading-none mb-1.5" style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.8rem)', letterSpacing: '-0.03em' }}>{item.label}</p>
                  <p className="text-white/55 font-light" style={{ fontSize: 'clamp(0.72rem, 1.1vw, 1rem)' }}>{item.spec}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* C. 해외 광고 */}
        <motion.div style={{ opacity: cOp }} className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-2">해외 광고 — 글로벌 미디어 네트워크</p>
          <p className="text-white/45 text-xs md:text-sm font-light mb-6 md:mb-8">일본 · 중국 · 동남아 · 미국 · 유럽 · 글로벌 팬덤</p>
          <div className="grid grid-cols-2 gap-3 md:gap-5 max-w-5xl w-full">
            {OVERSEAS_ITEMS.map((item, i) => (
              <motion.div key={item.label} style={{ opacity: ovT[i].op, y: ovT[i].y, willChange: 'transform, opacity' }} className="relative rounded-xl overflow-hidden aspect-[16/10]">
                <img src={item.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-6">
                  <p className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-[#FFB800] font-bold mb-1.5">OVERSEAS · 0{i + 1}</p>
                  <p className="font-black text-white leading-none mb-1.5" style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.8rem)', letterSpacing: '-0.03em' }}>{item.label}</p>
                  <p className="text-white/55 font-light" style={{ fontSize: 'clamp(0.72rem, 1.1vw, 1rem)' }}>{item.spec}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ── Main overlay ──────────────────────────────────────────────────────────────
interface BusinessOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAiLabClick?: () => void;
  onIntegratedClick?: () => void;
}

const BusinessOverlay: React.FC<BusinessOverlayProps> = ({ isOpen, onClose, onAiLabClick, onIntegratedClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const [inCh3, setInCh3] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const el = scrollRef.current;
    if (!el) return;
    progress.set(0);
    el.scrollTop = 0;
    setInCh3(false);
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max > 0) {
        const v = el.scrollTop / max;
        progress.set(v);
        setInCh3(v > C3S - 0.04);
      }
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

  const scrollToProgress = (target: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: target * (el.scrollHeight - el.clientHeight), behavior: 'smooth' });
  };

  const handleBack = () => scrollToProgress(C2S + 0.01);
  const handleCreativeClick = () => scrollToProgress(C3S + 0.01);
  const handleGlobalClick = () => scrollToProgress(C4S + 0.01);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#070707] text-white flex flex-col overflow-hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.421, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-[#FFB800] origin-left z-10"
            style={{ scaleX }}
          />
          <div
            className="shrink-0 flex items-center justify-between px-8 md:px-16 border-b border-white/10 bg-[#070707]/95 backdrop-blur-md"
            style={{ height: HEADER_H }}
          >
            <span className="text-xs font-bold tracking-[0.3em] text-[#FFB800] uppercase">Business</span>
            <div className="flex items-center gap-3">
              <AnimatePresence>
                {inCh3 && (
                  <motion.button
                    key="back"
                    initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.14 }}
                    onClick={handleBack}
                    className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    ← BACK
                  </motion.button>
                )}
              </AnimatePresence>
              <button onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:border-white/40 hover:bg-white/8 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-scroll"
            style={{ scrollbarWidth: 'none' }}
          >
            <Ch1 g={progress} />
            <Ch2 g={progress} onAiLabClick={onAiLabClick} onIntegratedClick={onIntegratedClick} onCreativeClick={handleCreativeClick} onGlobalClick={handleGlobalClick} />
            <Ch3 g={progress} onGlobalClick={handleGlobalClick} />
            <Ch4 g={progress} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BusinessOverlay;
