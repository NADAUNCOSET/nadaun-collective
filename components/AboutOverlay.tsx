import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion';
import { X } from 'lucide-react';

const HEADER_H = 57;

// Chapter heights (vh)
const H1 = 250, H2 = 270, H3 = 500, H4 = 600, H5 = 1100;
const TOTAL = H1 + H2 + H3 + H4 + H5;

const C1S = 0,               C1E = H1 / TOTAL;
const C2S = C1E,             C2E = (H1 + H2) / TOTAL;
const C3S = C2E,             C3E = (H1 + H2 + H3) / TOTAL;
const C4S = C3E,             C4E = (H1 + H2 + H3 + H4) / TOTAL;
const C5S = C4E,             C5E = 1;

const TIMELINE = [
  { year: '2020', title: '사진 장비\n판매샵' },
  { year: '2021', title: '기자재\n유통' },
  { year: '2022', title: '렌탈샵\n확장' },
  { year: '2023', title: '브랜드 필름\nVCR 제작' },
  { year: '2024', title: '난컴퍼니\nMCN 설립' },
  { year: '2025', title: 'TVC 송출\n오프라인 광고' },
  { year: '2026', title: 'ALL IN ONE\n솔루션', highlight: true },
];

const PARTNERS = [
  'SAMSUNG', 'HD HYUNDAI', 'HYUNDAI STEEL', 'KIA', 'EMIRATES', 'PEPSI', 'COWAY',
  'AMOREPACIFIC', 'DIOR BEAUTY', 'CALVIN KLEIN', 'OLIVE YOUNG', 'NUMBUZIN',
  'DASIQUE', 'SKINFOOD', 'TONYMOLY', 'ABIB', 'SKIN1004', 'JUNG SAEM MOOL',
  'GAONCHIPS', 'HECTO INNOVATION', 'ACMÉ DE LA VIE', 'THE NEW GREY', 'NUDAKE',
  'ELLE', 'THE MATTERS', 'M2', 'AENTIO', 'PAT', 'K2 SAFETY', 'KWDA', 'KOVA',
  'BEREX', 'PREED', 'MIRAEMI', '3 HOURS AHEAD', 'CESTI', 'ROOTONIX',
];

const StickyPanel: React.FC<{ children: React.ReactNode; centered?: boolean }> = ({ children, centered }) => (
  <div
    style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
    className={`flex flex-col ${centered ? 'items-center justify-center text-center' : 'justify-center px-8 md:px-16 lg:px-24'} overflow-hidden`}
  >
    {children}
  </div>
);

// ── Chapter 1 — horizontal word slides (same pattern as BusinessOverlay Ch1) ──
const Chapter1: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C1S, C1E], [0, 1]);

  // HIGH-END: visible from start, exits left
  const w1Op = useTransform(p, [0.26, 0.40], [1, 0]);
  const w1X  = useTransform(p, [0.26, 0.40], ['0vw', '-80vw']);

  // CONTENT: slides in from right, exits left
  const w2Op = useTransform(p, [0.26, 0.42, 0.56, 0.66], [0, 1, 1, 0]);
  const w2X  = useTransform(p, [0.26, 0.42, 0.56, 0.66], ['80vw', '0vw', '0vw', '-80vw']);

  // SOLUTION: slides in, stays (gold)
  const w3Op = useTransform(p, [0.56, 0.70, 0.90, 1.00], [0, 1, 1, 0]);
  const w3X  = useTransform(p, [0.56, 0.70], ['80vw', '0vw']);

  // Sub text fades in after SOLUTION
  const subOp = useTransform(p, [0.66, 0.78], [0, 1]);
  const subX  = useTransform(p, [0.66, 0.78], ['4%', '0%']);

  const FS = { fontSize: 'clamp(5rem, 18vw, 15rem)' } as const;

  return (
    <div style={{ height: `${H1}vh` }}>
      <div
        style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
        className="relative overflow-hidden flex items-center"
      >
        <p className="absolute top-8 left-8 md:left-16 lg:left-24 text-[13px] tracking-[0.35em] uppercase text-[#FFB800] font-bold">
          NADAUN COLLECTIVE — Since 2020, Seoul
        </p>

        <motion.h1
          style={{ opacity: w1Op, x: w1X, y: '-50%', top: '50%', position: 'absolute', color: 'white', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-none whitespace-nowrap left-8 md:left-16 lg:left-24"
        ><span style={FS}>HIGH-END</span></motion.h1>

        <motion.h1
          style={{ opacity: w2Op, x: w2X, y: '-50%', top: '50%', position: 'absolute', color: 'rgba(255,255,255,0.22)', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-none whitespace-nowrap left-8 md:left-16 lg:left-24"
        ><span style={FS}>CONTENT</span></motion.h1>

        <motion.h1
          style={{ opacity: w3Op, x: w3X, y: '-50%', top: '50%', position: 'absolute', color: '#FFB800', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-none whitespace-nowrap left-8 md:left-16 lg:left-24"
        ><span style={FS}>SOLUTION.</span></motion.h1>

        <motion.p
          style={{ opacity: subOp, x: subX, position: 'absolute', bottom: '18%', left: '2rem' }}
          className="text-white/65 text-lg md:text-2xl font-light leading-relaxed max-w-xl"
        >
          최첨단 장비와 기술, 정제된 디자인 감각이 결합된<br />
          하이엔드 콘텐츠 솔루션 그룹
        </motion.p>
      </div>
    </div>
  );
};

// ── Chapter 2 ─────────────────────────────────────────────────────────────────
const Chapter2: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C2S, C2E], [0, 1]);

  const line1Op = useTransform(p, [0.00, 0.16], [0, 1]);
  const line1Y  = useTransform(p, [0.00, 0.16], ['5%', '0%']);
  const line2Y  = useTransform(p, [0.10, 0.22], ['5%', '0%']);
  const agencyColor = useTransform(p, [0.10, 0.68], [
    'rgba(255,255,255,0.06)',
    'rgba(255,255,255,1.00)',
  ]);
  const bodyOp = useTransform(p, [0.42, 0.60], [0, 1]);
  const bodyY  = useTransform(p, [0.42, 0.60], ['3%', '0%']);
  const pillOp = useTransform(p, [0.56, 0.74], [0, 1]);
  const exitOp = useTransform(p, [0.78, 0.96], [1, 0]);
  const exitY  = useTransform(p, [0.78, 0.96], ['0%', '-5%']);

  return (
    <div style={{ height: `${H2}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, y: exitY }}>
          <p className="text-[13px] tracking-[0.35em] uppercase text-[#FFB800] mb-10 font-bold">WHO WE ARE</p>
          <motion.h2
            style={{ opacity: line1Op, y: line1Y, fontSize: 'clamp(4.5rem, 17vw, 14rem)' }}
            className="font-black tracking-[-0.03em] leading-[0.85] text-white block"
          >올인원</motion.h2>
          <motion.h2
            style={{ y: line2Y, color: agencyColor, fontSize: 'clamp(4.5rem, 17vw, 14rem)', marginTop: '0.12em' }}
            className="font-black tracking-[-0.03em] leading-[0.85] block"
          >솔루션.</motion.h2>
          <motion.p style={{ opacity: bodyOp, y: bodyY }}
            className="mt-12 text-white/75 text-xl md:text-2xl font-light leading-relaxed max-w-2xl"
          >
            커머스 제품 개발부터 유통 판매, 하이엔드 콘텐츠 제작까지 —<br />
            단 하나의 파트너로 브랜드의 모든 것을 완성합니다.
          </motion.p>
          <motion.div style={{ opacity: pillOp }} className="flex flex-wrap gap-3 mt-10">
            {['COMMERCE', 'CONTENT', 'DISTRIBUTION', 'AI STRATEGY'].map(tag => (
              <span key={tag} className="text-xs font-bold uppercase tracking-wider px-5 py-2.5 border border-white/25 rounded-full text-white/70">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </StickyPanel>
    </div>
  );
};

// ── Timeline Slide — separate component so hooks are called at component top ──
const TimelineSlide: React.FC<{
  item: { year: string; title: string; highlight?: boolean };
  index: number;
  total: number;
  p: MotionValue<number>;
}> = ({ item, index, total, p }) => {
  const seg = 1 / total;
  const start = index * seg;
  const end = (index + 1) * seg;
  const fadeLen = seg * 0.09; // fast fade in/out — gives wide stable plateau

  // Container cross-dissolve (wide plateau between fadeLen and end-fadeLen)
  const op = useTransform(
    p,
    index === total - 1
      ? [Math.max(0, start - fadeLen * 0.5), start + fadeLen, 1, 1]
      : [Math.max(0, start - fadeLen * 0.5), start + fadeLen, end - fadeLen, Math.min(1, end + fadeLen * 0.5)],
    index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );

  // Line 1 — appears as soon as slide is visible
  const l1Op = useTransform(p, [start + fadeLen, start + fadeLen * 2.2], [0, 1]);
  const l1Y  = useTransform(p, [start + fadeLen, start + fadeLen * 2.2], ['32px', '0px']);

  // Line 2 — appears seg*0.24 after line 1 (sequential stagger)
  const l2S   = start + seg * 0.24;
  const l2Op  = useTransform(p, [l2S, l2S + fadeLen * 1.4], [0, 1]);
  const l2Y   = useTransform(p, [l2S, l2S + fadeLen * 1.4], ['32px', '0px']);

  const lines = item.title.split('\n');

  return (
    <motion.div
      style={{ opacity: op, position: 'absolute', inset: 0 }}
      className="flex flex-col justify-center px-8 md:px-16 lg:px-24"
    >
      <span
        className="text-[11px] tracking-[0.45em] uppercase font-bold mb-6 block"
        style={{ color: item.highlight ? '#FFB800' : 'rgba(255,255,255,0.35)' }}
      >
        {String(index + 1).padStart(2, '0')} · {item.year}
      </span>
      {/* Two lines reveal sequentially with vertical gap */}
      <div className="flex flex-col gap-4 md:gap-5">
        <motion.h2
          style={{
            opacity: l1Op, y: l1Y,
            fontSize: 'clamp(4.2rem, 14vw, 12rem)',
            color: item.highlight ? '#FFB800' : 'white',
          }}
          className="font-black tracking-[-0.03em] leading-[0.88] block"
        >{lines[0]}</motion.h2>
        {lines[1] && (
          <motion.h2
            style={{
              opacity: l2Op, y: l2Y,
              fontSize: 'clamp(4.2rem, 14vw, 12rem)',
              color: item.highlight ? '#FFB800' : 'white',
            }}
            className="font-black tracking-[-0.03em] leading-[0.88] block"
          >{lines[1]}</motion.h2>
        )}
      </div>
    </motion.div>
  );
};

// ── Chapter 3 — One-by-one dissolve timeline with year rail ───────────────────
const Chapter3: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C3S, C3E], [0, 1]);
  // exitOp delayed so ALL IN ONE 솔루션 (last slide) is fully visible before fade
  const exitOp = useTransform(p, [0.94, 1.00], [1, 0]);

  // Year indicator slides along the rail (from 0% to ~86% then anchors at last)
  const seg = 1 / TIMELINE.length;
  const indicatorPct = useTransform(p, [0, 1 - seg], ['0%', `${100 * (1 - seg)}%`]);

  return (
    <div style={{ height: `${H3}vh` }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }} className="relative overflow-hidden">
        <motion.div style={{ opacity: exitOp }} className="absolute inset-0">

          {/* ── Year rail at top ── */}
          <div className="absolute top-8 left-8 md:left-16 lg:left-24 right-8 md:right-16 lg:right-24 z-10">
            <p className="text-[11px] tracking-[0.35em] uppercase text-[#FFB800]/60 font-bold mb-4">OUR STORY</p>
            <div className="relative">
              {/* Track line */}
              <div className="absolute top-[10px] left-0 right-0 h-[1px] bg-white/10" />
              {/* Year label dots */}
              <div className="relative flex justify-between">
                {TIMELINE.map((item, i) => {
                  const dotPct = i / (TIMELINE.length - 1);
                  return (
                    <div key={item.year} className="flex flex-col items-center gap-2">
                      <div className="w-[6px] h-[6px] rounded-full bg-white/15" />
                      <span className="text-[10px] font-mono text-white/28 tracking-wider">{item.year}</span>
                    </div>
                  );
                })}
              </div>
              {/* Sliding indicator */}
              <motion.div
                className="absolute top-[7px] flex flex-col items-center"
                style={{ left: indicatorPct, translateX: '-50%' }}
              >
                <div className="w-[12px] h-[12px] rounded-full bg-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.8)]" />
              </motion.div>
            </div>
          </div>

          {/* Dissolving slides — stacked absolute, centered vertically */}
          <div className="absolute inset-0 pt-28">
            {TIMELINE.map((item, i) => (
              <TimelineSlide key={item.year} item={item} index={i} total={TIMELINE.length} p={p} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ── Globe helpers ─────────────────────────────────────────────────────────────
// ── 2D flat-map projection ────────────────────────────────────────────────────
function latLonToXY(
  lat: number, lon: number,
  cx: number, cy: number,
  scale: number, cLat: number, cLon: number,
): [number, number] {
  return [cx + (lon - cLon) * scale, cy - (lat - cLat) * scale];
}

// Simplified continent coastlines [lat, lon][]
const CONTINENTS: [number, number][][] = [
  // North America
  [[71,-165],[71,-140],[60,-140],[58,-137],[55,-130],[50,-125],[46,-124],
   [40,-124],[36,-122],[32,-117],[30,-110],[22,-105],[16,-92],[16,-88],
   [22,-80],[30,-80],[35,-76],[40,-74],[45,-67],[47,-53],[50,-56],[60,-65],
   [65,-64],[70,-78],[72,-80],[72,-100],[70,-117],[71,-128],[71,-155],[71,-165]],
  // South America
  [[12,-71],[11,-63],[8,-60],[5,-52],[0,-50],[-5,-35],[-10,-37],[-15,-39],
   [-20,-40],[-25,-48],[-30,-51],[-35,-57],[-40,-62],[-45,-65],[-53,-69],
   [-55,-69],[-55,-63],[-50,-58],[-45,-58],[-40,-58],[-35,-58],[-30,-55],
   [-25,-50],[-18,-46],[-10,-48],[-5,-48],[0,-48],[5,-52],[8,-60],[12,-71]],
  // Eurasia
  [[71,28],[65,14],[58,5],[51,2],[48,-5],[44,-9],[36,-9],[36,-5],[38,0],
   [36,5],[37,10],[38,15],[38,22],[42,28],[42,35],[38,40],[36,36],[32,35],
   [30,34],[22,38],[12,45],[12,51],[22,60],[27,57],[25,62],[25,68],[8,77],
   [8,78],[14,80],[22,88],[24,90],[22,92],[22,93],[16,100],[10,100],
   [4,104],[4,107],[14,108],[14,110],[20,110],[22,114],[22,120],
   [24,122],[30,122],[37,122],[41,121],[41,130],[45,135],[48,135],
   [52,141],[55,135],[60,140],[65,141],[68,160],[70,170],[71,180],
   [71,175],[68,170],[65,170],[62,165],[60,165],[60,155],[62,140],
   [60,128],[57,120],[55,110],[55,100],[57,90],[55,80],[55,68],[57,60],
   [55,50],[50,46],[48,38],[45,38],[46,35],[43,33],[42,30],[42,28]],
  // Africa
  [[37,10],[37,12],[31,32],[22,37],[12,44],[11,42],[4,42],[0,42],
   [-5,40],[-11,40],[-26,34],[-34,26],[-34,18],[-30,17],[-26,15],
   [-22,14],[-18,12],[-14,12],[-4,9],[4,2],[4,7],[6,2],[5,-4],
   [4,-9],[6,-14],[10,-15],[14,-17],[20,-17],[26,-15],[30,-10],[37,-6],
   [37,0],[37,5],[37,10]],
  // Australia
  [[-14,129],[-13,136],[-12,137],[-14,140],[-16,145],[-20,149],
   [-24,154],[-28,154],[-32,152],[-38,147],[-40,148],[-43,147],
   [-39,146],[-38,142],[-36,140],[-38,140],[-35,137],[-32,134],
   [-34,122],[-32,116],[-28,115],[-22,114],[-20,119],[-18,122],
   [-16,122],[-14,127],[-14,129]],
];

// 11 cities covering all continents — all arcs complete before Ch4 exits
const GLOBE_CITIES = [
  { name: 'TOKYO',     lat: 35.6762,  lon: 139.6503  },
  { name: 'BEIJING',   lat: 39.9042,  lon: 116.4074  },
  { name: 'SINGAPORE', lat:  1.3521,  lon: 103.8198  },
  { name: 'SYDNEY',    lat: -33.8688, lon: 151.2093  },
  { name: 'MUMBAI',    lat: 19.0760,  lon: 72.8777   },
  { name: 'DUBAI',     lat: 25.2048,  lon: 55.2708   },
  { name: 'LONDON',    lat: 51.5074,  lon: -0.1278   },
  { name: 'PARIS',     lat: 48.8566,  lon:  2.3522   },
  { name: 'NEW YORK',  lat: 40.7128,  lon: -74.006   },
  { name: 'L.A.',      lat: 34.0522,  lon: -118.2437 },
  { name: 'SÃO PAULO', lat: -23.5558, lon: -46.6396  },
];

const KOREA_OUTLINE: [number, number][] = [
  [34.39, 126.22], [34.48, 126.80], [34.58, 127.44], [34.72, 128.04],
  [34.88, 128.59], [35.10, 129.10], [35.42, 129.30], [35.60, 129.40],
  [36.10, 129.43], [36.55, 129.46], [36.82, 129.49], [37.15, 129.30],
  [37.46, 129.38], [37.74, 129.08], [38.00, 128.60], [38.31, 128.50],
  [38.25, 128.00], [38.30, 127.50], [38.25, 127.00], [38.30, 126.50],
  [38.10, 126.35], [37.88, 126.20], [37.68, 125.69],
  [37.50, 126.62], [37.26, 126.50], [37.00, 126.55], [36.70, 126.40],
  [36.50, 126.27], [36.20, 126.51], [35.90, 126.55], [35.70, 126.48],
  [35.40, 126.50], [35.20, 126.55], [34.85, 126.45], [34.60, 126.00],
  [34.39, 126.22],
];

// ── Chapter 4 — Korea → 2D Flat World Map ────────────────────────────────────
const Chapter4: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C4S, C4E], [0, 1]);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef  = useRef(0);
  const rafRef       = useRef(0);

  useMotionValueEvent(p, 'change', (v) => { progressRef.current = v; });

  const textOp = useTransform(p, [0.00, 0.10, 0.38, 0.68], [0, 1, 1, 0]);
  const exitOp = useTransform(p, [0.84, 0.97], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d')!;
    let cancelled = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const SEOUL_LAT = 37.5665, SEOUL_LON = 126.978;
    const LINE_START = 0.48, LINE_GAP = 0.038, LINE_DUR = 0.075;
    const eio = (t: number) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2;

    const draw = () => {
      if (cancelled) return;
      rafRef.current = requestAnimationFrame(draw);

      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const pv = progressRef.current;
      const cx = w * 0.5, cy = h * 0.52;

      // zoomPhase: 1=Korea zoomed in, 0=world flat map
      const zoomRaw = Math.max(0, Math.min(1, 1 - (pv - 0.30) / 0.36));
      const zoomPhase = eio(zoomRaw);

      // Scale: world = w/360 px/deg, Korea = 20× zoom
      const worldScale = w / 360;
      const koreaScale = worldScale * 20;
      const scale = worldScale + (koreaScale - worldScale) * zoomPhase;
      // Center drifts from Seoul to (lat=20, lon=0) standard
      const cLat = 20 + (SEOUL_LAT - 20) * zoomPhase;
      const cLon = 0  + (SEOUL_LON - 0)  * zoomPhase;

      const ll = (lat: number, lon: number) => latLonToXY(lat, lon, cx, cy, scale, cLat, cLon);

      // ── Ocean background ─────────────────────────────────────────────────────
      const oceanGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.7);
      oceanGrad.addColorStop(0,   'rgba(8, 22, 52, 0.55)');
      oceanGrad.addColorStop(0.6, 'rgba(4, 12, 32, 0.40)');
      oceanGrad.addColorStop(1,   'rgba(2,  6, 18, 0.20)');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Grid ────────────────────────────────────────────────────────────────
      ctx.globalAlpha = 0.09;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(60,140,255,1)';
      for (let lat = -60; lat <= 90; lat += 30) {
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 3) {
          const [px, py] = ll(lat, lon);
          lon === -180 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      for (let lon = -180; lon <= 180; lon += 30) {
        ctx.beginPath();
        for (let lat = -80; lat <= 85; lat += 3) {
          const [px, py] = ll(lat, lon);
          lat === -80 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // ── Continent outlines ───────────────────────────────────────────────────
      CONTINENTS.forEach(outline => {
        ctx.beginPath();
        outline.forEach(([lat, lon], i) => {
          const [px, py] = ll(lat, lon);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.fillStyle = 'rgba(45, 50, 68, 0.72)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(100, 120, 180, 0.22)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
      });

      // ── Korea filled + traced outline ────────────────────────────────────────
      const traceProgress = Math.min(1, pv / 0.10);
      const traceCount = Math.floor(traceProgress * KOREA_OUTLINE.length);

      ctx.beginPath();
      KOREA_OUTLINE.forEach(([lat, lon], i) => {
        const [px, py] = ll(lat, lon);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fillStyle = `rgba(255,184,0,${0.04 + zoomPhase * 0.14})`;
      ctx.fill();

      if (traceCount > 0) {
        ctx.save();
        ctx.shadowColor = '#FFB800';
        ctx.shadowBlur = 28;
        ctx.beginPath();
        for (let i = 0; i < traceCount; i++) {
          const [lat, lon] = KOREA_OUTLINE[i];
          const [px, py] = ll(lat, lon);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        if (traceCount >= KOREA_OUTLINE.length) ctx.closePath();
        ctx.strokeStyle = 'rgba(255,184,0,0.95)';
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        for (let i = 0; i < traceCount; i++) {
          const [lat, lon] = KOREA_OUTLINE[i];
          const [px, py] = ll(lat, lon);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        if (traceCount >= KOREA_OUTLINE.length) ctx.closePath();
        ctx.strokeStyle = 'rgba(255,255,255,0.55)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // ── Connection lines Seoul → cities ──────────────────────────────────────
      GLOBE_CITIES.forEach((dest, i) => {
        const prog = Math.max(0, Math.min(1, (pv - LINE_START - i * LINE_GAP) / LINE_DUR));
        if (prog <= 0) return;
        const STEPS = 60;
        const endStep = Math.round(STEPS * prog);
        const dLat = dest.lat - SEOUL_LAT;
        let dLon = dest.lon - SEOUL_LON;
        if (dLon > 180) dLon -= 360;
        if (dLon < -180) dLon += 360;

        ctx.beginPath();
        for (let s = 0; s <= endStep; s++) {
          const t = s / STEPS;
          const [px, py] = ll(SEOUL_LAT + dLat * t, SEOUL_LON + dLon * t);
          s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        const a = Math.min(1, prog * 4);
        ctx.strokeStyle = `rgba(255,184,0,${0.65 * a})`;
        ctx.lineWidth = 1.3;
        ctx.stroke();

        if (prog >= 0.97) {
          const [dpx, dpy] = ll(dest.lat, dest.lon);
          ctx.beginPath(); ctx.arc(dpx, dpy, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,184,0,0.9)'; ctx.fill();
          ctx.beginPath(); ctx.arc(dpx, dpy, 7, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255,184,0,0.22)'; ctx.lineWidth = 0.8; ctx.stroke();
          ctx.font = 'bold 9px Manrope, sans-serif';
          ctx.fillStyle = 'rgba(255,255,255,0.75)';
          ctx.fillText(dest.name, dpx + 10, dpy + 3);
        } else if (prog > 0.04) {
          const t = endStep / STEPS;
          const [lpx, lpy] = ll(SEOUL_LAT + dLat * t, SEOUL_LON + dLon * t);
          ctx.beginPath(); ctx.arc(lpx, lpy, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,184,0,${a})`; ctx.fill();
        }
      });

      // ── Seoul pulse dot ──────────────────────────────────────────────────────
      if (pv > 0.01) {
        const [spx, spy] = ll(SEOUL_LAT, SEOUL_LON);
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 600);
        const dotAlpha = Math.min(1, pv * 20);
        const dotSize = 4 + zoomPhase * 5;
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath();
          ctx.arc(spx, spy, dotSize + r * (5 + zoomPhase * 6) * pulse, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,184,0,${(0.2/r) * dotAlpha})`;
          ctx.lineWidth = 0.7; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(spx, spy, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,184,0,${dotAlpha})`; ctx.fill();
        ctx.font = `bold ${9 + Math.round(zoomPhase * 4)}px Manrope, sans-serif`;
        ctx.fillStyle = `rgba(255,184,0,${0.95 * dotAlpha})`;
        ctx.fillText('SEOUL', spx + dotSize + 6, spy + 4);
      }
    };

    draw();
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div style={{ height: `${H4}vh` }}>
      <motion.div
        ref={containerRef}
        style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)`, opacity: exitOp }}
        className="relative overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 pointer-events-none">
          <motion.div style={{ opacity: textOp }}>
            <p className="text-[13px] tracking-[0.35em] uppercase text-[#FFB800] mb-10 font-bold">
              IP CONNECT — GLOBAL
            </p>
            <h2 className="font-black tracking-[-0.03em] leading-[0.85] text-white block"
              style={{ fontSize: 'clamp(5rem, 16vw, 13rem)' }}>IP</h2>
            <h2 className="font-black tracking-[-0.03em] leading-[0.85] block"
              style={{ fontSize: 'clamp(5rem, 16vw, 13rem)', color: '#FFB800' }}>CONNECT.</h2>
            <p className="mt-8 text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
              핵심 IP부터 글로벌 에이전시 네트워크까지 — 모든 것을 하나로 연결하는<br className="hidden md:block" />
              올인원 파트너. 세계 어디서도, 어떤 브랜드든 완성합니다.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// ── Broadcast data ────────────────────────────────────────────────────────────
const BROADCAST_CHANNELS = {
  tv: ['KBS', 'MBC', 'SBS', 'JTBC', 'TV조선', 'MBN', 'tvN', 'tvN SHOW', 'E채널', 'MNET', 'MBC ON', '채널A', 'YTN'],
  iptv: ['KT 올레TV', 'SK Btv', 'LG U+TV'],
};

const BTL_ITEMS = [
  { label: '지하철 스크린도어', spec: '1,470 × 470mm · 전국 주요역',  img: 'http://www.newad.kr/upload_board_files/code_5/20210222092921-6b25109b040389ce5b4d35fc426d17e4.jpg' },
  { label: '옥외 전광판',      spec: 'Full HD / 4K · 가로·세로형',   img: 'http://www.newad.kr/upload_board_files/code_10/20210222095353-6b25109b040389ce5b4d35fc426d17e4.jpg' },
  { label: '택시 미디어',      spec: '후면 LED · 측면 랩핑 · 전국',  img: 'http://www.newad.kr/upload_board_files/code_11/20210222101310-6b25109b040389ce5b4d35fc426d17e4.jpg' },
  { label: '버스 외부광고',    spec: '슈퍼사이드 · 풀백 · 측면랩',   img: 'http://www.newad.kr/upload_board_files/code_7/20210222093425-6b25109b040389ce5b4d35fc426d17e4.jpg' },
];

const FANCLUB_ITEMS = [
  { label: 'K-POP 팬클럽 광고', spec: '공항·지하철·옥외 팬이벤트 집행' },
  { label: '해외 광고',          spec: '일본·중국·동남아·미국·유럽 집행' },
];

// ── Chapter 5 — word slides → channels → 4 BTL image slides → CTA ────────────
const Chapter5: React.FC<{ g: MotionValue<number>; onContactClick?: () => void }> = ({ g, onContactClick }) => {
  const p = useTransform(g, [C5S, C5E], [0, 1]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ── 4 word slides (fast) — each ~16% ──
  const w1Op = useTransform(p, [0.00, 0.06, 0.12, 0.16], [0, 1, 1, 0]);
  const w1X  = useTransform(p, [0.00, 0.06, 0.12, 0.16], ['80vw', '0vw', '0vw', '-80vw']);
  const w2Op = useTransform(p, [0.17, 0.22, 0.28, 0.32], [0, 1, 1, 0]);
  const w2X  = useTransform(p, [0.17, 0.22, 0.28, 0.32], ['80vw', '0vw', '0vw', '-80vw']);
  const w3Op = useTransform(p, [0.33, 0.38, 0.44, 0.48], [0, 1, 1, 0]);
  const w3X  = useTransform(p, [0.33, 0.38, 0.44, 0.48], ['80vw', '0vw', '0vw', '-80vw']);
  const w4Op = useTransform(p, [0.49, 0.54, 0.59, 0.63], [0, 1, 1, 0]);
  const w4X  = useTransform(p, [0.49, 0.54, 0.59, 0.63], ['80vw', '0vw', '0vw', '-80vw']);

  // ── S1: Channels ──
  const s1Op  = useTransform(p, [0.61, 0.66, 0.72, 0.76], [0, 1, 1, 0]);
  const s1Y   = useTransform(p, [0.61, 0.66], ['4%', '0%']);
  const tvL   = useTransform(p, [0.62, 0.68], [0, 1]);
  const iptvL = useTransform(p, [0.67, 0.73], [0, 1]);

  // ── S2: BTL 4 image slides — declared individually (no useTransform in .map) ──
  // Slide 1: 지하철 스크린도어
  const btl1Op = useTransform(p, [0.74, 0.78, 0.82, 0.85], [0, 1, 1, 0]);
  const btl1LabelOp = useTransform(p, [0.76, 0.80], [0, 1]);
  // Slide 2: 옥외 전광판
  const btl2Op = useTransform(p, [0.83, 0.86, 0.89, 0.92], [0, 1, 1, 0]);
  const btl2LabelOp = useTransform(p, [0.84, 0.88], [0, 1]);
  // Slide 3: 택시 미디어
  const btl3Op = useTransform(p, [0.90, 0.93, 0.95, 0.97], [0, 1, 1, 0]);
  const btl3LabelOp = useTransform(p, [0.91, 0.94], [0, 1]);
  // Slide 4: 버스 외부광고 (stays as background for S3)
  const btl4Op = useTransform(p, [0.95, 0.98, 1.00, 1.00], [0, 1, 1, 1]);
  const btl4LabelOp = useTransform(p, [0.96, 0.99], [0, 1]);

  // ── S3: CTA — fades in over slide 4 ──
  const s3Op = useTransform(p, [0.97, 1.00, 1, 1], [0, 1, 1, 1]);
  const s3Y  = useTransform(p, [0.97, 1.00], ['4%', '0%']);

  const FS_SHORT = { fontSize: 'clamp(9rem, 32vw, 28rem)' } as const;
  const FS_LONG  = { fontSize: 'clamp(6rem, 21vw, 18rem)' } as const;

  return (
    <div style={{ height: `${H5}vh` }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
           className="relative overflow-hidden">

        {/* Fixed context label */}
        <div className="absolute top-8 left-8 md:left-16 lg:left-24 z-10 pointer-events-none">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#FFB800]/55 font-bold">
            THROUGH THE LINE — TTL CAMPAIGN
          </p>
        </div>

        {/* ── WORD SLIDES ── */}
        <motion.div style={{ opacity: w1Op, x: w1X }}
          className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24 will-change-transform">
          <h2 style={{ ...FS_SHORT, color: 'white', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1 }}>TVC</h2>
        </motion.div>
        <motion.div style={{ opacity: w2Op, x: w2X }}
          className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24 will-change-transform">
          <h2 style={{ ...FS_LONG, color: 'white', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>제작부터</h2>
        </motion.div>
        <motion.div style={{ opacity: w3Op, x: w3X }}
          className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24 will-change-transform">
          <h2 style={{ ...FS_SHORT, color: '#FFB800', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1 }}>전국</h2>
        </motion.div>
        <motion.div style={{ opacity: w4Op, x: w4X }}
          className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24 will-change-transform">
          <h2 style={{ ...FS_LONG, color: '#FFB800', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>송출까지.</h2>
        </motion.div>

        {/* ── S1: CHANNELS — video background + channel list text ── */}
        <motion.div style={{ opacity: s1Op, y: s1Y }} className="absolute inset-0">
          {/* Full-screen background video */}
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover"
            src="/livernovo-jtbc.mp4" muted loop playsInline autoPlay
            onLoadedMetadata={() => { if (videoRef.current) videoRef.current.currentTime = 0; }} />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

          {/* ON-AIR badge */}
          <div className="absolute top-8 right-8 md:right-16 lg:right-24 flex items-center gap-2 bg-black/70 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" style={{ animation: 'pulse 1.2s ease-in-out infinite' }} />
            <span className="text-[9px] font-bold text-white tracking-wider">JTBC ON-AIR</span>
          </div>

          {/* Channel text */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-8">공영 · 케이블 · 종편</p>
            <motion.p style={{ opacity: tvL, fontSize: 'clamp(2.2rem, 6vw, 6.5rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
              className="font-black leading-tight text-white/90 mb-10">
              {BROADCAST_CHANNELS.tv.join(' · ')}
            </motion.p>
            <motion.div style={{ opacity: iptvL }}>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-5">IPTV</p>
              <p className="font-black leading-tight text-white/90"
                style={{ fontSize: 'clamp(2rem, 5.5vw, 6rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
                {BROADCAST_CHANNELS.iptv.join(' · ')}
              </p>
            </motion.div>
          </div>
          <p className="absolute bottom-5 right-8 md:right-16 lg:right-24 text-[8px] text-white/20 font-light">
            실제 방영 모니터링 영상 · 2025.11
          </p>
        </motion.div>

        {/* ── S2: BTL IMAGE SLIDES (4 sequential full-screen) ── */}

        {/* Slide 1 — 지하철 스크린도어 */}
        <motion.div style={{ opacity: btl1Op }} className="absolute inset-0 will-change-transform">
          <img src={BTL_ITEMS[0].img} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
          <motion.div style={{ opacity: btl1LabelOp }}
            className="absolute bottom-14 left-8 md:left-16 lg:left-24">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-3">오프라인 BTL · 01</p>
            <p className="font-black text-white leading-none mb-3"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}>
              {BTL_ITEMS[0].label}
            </p>
            <p className="text-white/50 font-light" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.2rem)' }}>
              {BTL_ITEMS[0].spec}
            </p>
          </motion.div>
        </motion.div>

        {/* Slide 2 — 옥외 전광판 */}
        <motion.div style={{ opacity: btl2Op }} className="absolute inset-0 will-change-transform">
          <img src={BTL_ITEMS[1].img} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
          <motion.div style={{ opacity: btl2LabelOp }}
            className="absolute bottom-14 left-8 md:left-16 lg:left-24">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-3">오프라인 BTL · 02</p>
            <p className="font-black text-white leading-none mb-3"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}>
              {BTL_ITEMS[1].label}
            </p>
            <p className="text-white/50 font-light" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.2rem)' }}>
              {BTL_ITEMS[1].spec}
            </p>
          </motion.div>
        </motion.div>

        {/* Slide 3 — 택시 미디어 */}
        <motion.div style={{ opacity: btl3Op }} className="absolute inset-0 will-change-transform">
          <img src={BTL_ITEMS[2].img} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
          <motion.div style={{ opacity: btl3LabelOp }}
            className="absolute bottom-14 left-8 md:left-16 lg:left-24">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-3">오프라인 BTL · 03</p>
            <p className="font-black text-white leading-none mb-3"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}>
              {BTL_ITEMS[2].label}
            </p>
            <p className="text-white/50 font-light" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.2rem)' }}>
              {BTL_ITEMS[2].spec}
            </p>
          </motion.div>
        </motion.div>

        {/* Slide 4 — 버스 외부광고 (stays as bg for S3) */}
        <motion.div style={{ opacity: btl4Op }} className="absolute inset-0 will-change-transform">
          <img src={BTL_ITEMS[3].img} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/40" />
          <motion.div style={{ opacity: btl4LabelOp }}
            className="absolute top-24 right-8 md:right-16 lg:right-24 text-right">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-3">오프라인 BTL · 04</p>
            <p className="font-black text-white leading-none mb-3"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}>
              {BTL_ITEMS[3].label}
            </p>
            <p className="text-white/50 font-light" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.2rem)' }}>
              {BTL_ITEMS[3].spec}
            </p>
          </motion.div>
        </motion.div>

        {/* ── S3: CTA — fades in over slide 4 background ── */}
        <motion.div style={{ opacity: s3Op, y: s3Y }}
          className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-16">
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-4">
            팬클럽 광고 · 해외 광고 · 공항 · 일본 · 동남아 · 미국 · 유럽
          </p>
          <h2 className="font-black text-white leading-none mb-6" style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', letterSpacing: '-0.04em' }}>
            프로젝트<br />문의하기
          </h2>
          <p className="text-white/45 font-light max-w-lg mb-10" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.4rem)' }}>
            기획부터 하이엔드 제작, AI 테크 솔루션, 글로벌 마케팅까지 —<br className="hidden md:block" />
            단 하나의 파트너로 모든 것을 완성합니다.
          </p>
          <button onClick={onContactClick}
            className="self-start flex items-center gap-3 bg-[#FFB800] text-black font-black px-10 py-5 rounded-full hover:scale-105 transition-transform text-base tracking-wide">
            문의하기 →
          </button>
        </motion.div>

      </div>
    </div>
  );
};

// ── Main overlay ──────────────────────────────────────────────────────────────
interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick?: () => void;
}

const AboutOverlay: React.FC<AboutOverlayProps> = ({ isOpen, onClose, onContactClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (!isOpen) return;
    const el = scrollRef.current;
    if (!el) return;
    progress.set(0);
    el.scrollTop = 0;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max > 0) progress.set(el.scrollTop / max);
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#070707] text-white flex flex-col overflow-hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-[#FFB800] origin-left z-10"
            style={{ scaleX }}
          />
          <div
            className="shrink-0 flex items-center justify-between px-8 md:px-16 border-b border-white/10 bg-[#070707]/95 backdrop-blur-md"
            style={{ height: HEADER_H }}
          >
            <span className="text-xs font-bold tracking-[0.3em] text-[#FFB800] uppercase">About</span>
            <button onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:border-white/40 hover:bg-white/8 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-scroll"
            style={{ scrollbarWidth: 'none' }}
          >
            <Chapter1 g={progress} />
            <Chapter2 g={progress} />
            <Chapter3 g={progress} />
            <Chapter4 g={progress} />
            <Chapter5 g={progress} onContactClick={onContactClick} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutOverlay;
