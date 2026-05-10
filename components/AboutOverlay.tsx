import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion';
import { X } from 'lucide-react';

const HEADER_H = 57;

// Chapter heights (vh) — H3/H4/H5 increased for better pacing
const H1 = 250, H2 = 270, H3 = 420, H4 = 600, H5 = 900;
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

// ── Chapter 1 ─────────────────────────────────────────────────────────────────
const Chapter1: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C1S, C1E], [0, 1]);

  const h1Op = useTransform(p, [0.00, 0.16], [0, 1]);
  const h1Y  = useTransform(p, [0.00, 0.16], ['6%', '0%']);
  const h2Op = useTransform(p, [0.18, 0.34], [0, 1]);
  const h2Y  = useTransform(p, [0.18, 0.34], ['6%', '0%']);
  const h3Op = useTransform(p, [0.36, 0.52], [0, 1]);
  const h3Y  = useTransform(p, [0.36, 0.52], ['6%', '0%']);
  const tagOp = useTransform(p, [0.54, 0.70], [0, 1]);
  const tagY  = useTransform(p, [0.54, 0.70], ['3%', '0%']);
  const exitOp = useTransform(p, [0.80, 0.96], [1, 0]);
  const exitY  = useTransform(p, [0.80, 0.96], ['0%', '-5%']);

  return (
    <div style={{ height: `${H1}vh` }}>
      <StickyPanel>
        <motion.div style={{ opacity: exitOp, y: exitY }}>
          <p className="text-[13px] tracking-[0.35em] uppercase text-[#FFB800] mb-10 font-bold">
            NADAUN COLLECTIVE — Since 2020, Seoul
          </p>
          <motion.h1 style={{ opacity: h1Op, y: h1Y, fontSize: 'clamp(5rem, 19vw, 15rem)' as string }}
            className="font-black tracking-[-0.03em] leading-[0.85] text-white block"
          >HIGH-END</motion.h1>
          <motion.h1 style={{ opacity: h2Op, y: h2Y, fontSize: 'clamp(5rem, 19vw, 15rem)' as string, color: '#FFB800' }}
            className="font-black tracking-[-0.03em] leading-[0.85] block"
          >CONTENT</motion.h1>
          <motion.h1 style={{ opacity: h3Op, y: h3Y, fontSize: 'clamp(5rem, 19vw, 15rem)' as string }}
            className="font-black tracking-[-0.03em] leading-[0.85] text-white block"
          >SOLUTION</motion.h1>
          <motion.p style={{ opacity: tagOp, y: tagY }}
            className="mt-10 text-white/75 text-lg md:text-2xl font-light leading-relaxed max-w-xl"
          >
            최첨단 장비와 기술, 정제된 디자인 감각이 결합된<br />
            하이엔드 콘텐츠 솔루션 그룹
          </motion.p>
        </motion.div>
      </StickyPanel>
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
  const ov = seg * 0.28; // overlap for soft cross-dissolve

  // Last slide stays visible; others dissolve out
  const opStops = index === total - 1
    ? [0, 1, 1, 1]
    : [0, 1, 1, 0];
  const op = useTransform(
    p,
    [Math.max(0, start - ov * 0.4), start + ov, Math.max(start + ov + 0.001, end - ov), Math.min(1, end + ov * 0.4)],
    opStops,
  );
  const yVal = useTransform(p, [Math.max(0, start - ov * 0.4), start + ov], ['32px', '0px']);

  const titleLines = item.title.split('\n');

  return (
    <motion.div
      style={{ opacity: op, y: yVal, position: 'absolute', inset: 0 }}
      className="flex flex-col justify-center px-8 md:px-16 lg:px-24"
    >
      <span className="text-[11px] tracking-[0.45em] uppercase font-bold mb-5 block"
        style={{ color: item.highlight ? '#FFB800' : 'rgba(255,255,255,0.35)' }}>
        {String(index + 1).padStart(2, '0')} · {item.year}
      </span>
      <h2
        className="font-black tracking-[-0.03em] leading-[0.88]"
        style={{
          fontSize: 'clamp(4rem, 13.5vw, 11.5rem)',
          color: item.highlight ? '#FFB800' : 'white',
        }}
      >
        {titleLines.map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h2>
    </motion.div>
  );
};

// ── Chapter 3 — One-by-one dissolve timeline ───────────────────────────────────
const Chapter3: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C3S, C3E], [0, 1]);
  const exitOp     = useTransform(p, [0.88, 0.98], [1, 0]);
  const lineScaleX = useTransform(p, [0, 1], [0, 1]);

  return (
    <div style={{ height: `${H3}vh` }}>
      <div style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }} className="relative overflow-hidden">
        <motion.div style={{ opacity: exitOp }} className="absolute inset-0">

          {/* Section label */}
          <div className="absolute top-8 left-8 md:left-16 lg:left-24 z-10">
            <p className="text-[13px] tracking-[0.35em] uppercase text-[#FFB800] font-bold">
              OUR STORY · 2020–2026
            </p>
          </div>

          {/* Progress bar at bottom */}
          <div className="absolute bottom-8 left-8 md:left-16 lg:left-24 right-8 md:right-16 lg:right-24 z-10">
            <div className="h-[1px] w-full bg-white/10 relative">
              <motion.div className="absolute inset-0 bg-[#FFB800] origin-left" style={{ scaleX: lineScaleX }} />
            </div>
          </div>

          {/* Dissolving slides — all stacked absolute */}
          {TIMELINE.map((item, i) => (
            <TimelineSlide key={item.year} item={item} index={i} total={TIMELINE.length} p={p} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// ── Globe helpers ─────────────────────────────────────────────────────────────
function latLonToVec3(lat: number, lon: number): [number, number, number] {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = lon * Math.PI / 180;
  return [Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)];
}

function slerp(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  const dot = Math.min(1, Math.max(-1, a[0]*b[0] + a[1]*b[1] + a[2]*b[2]));
  const omega = Math.acos(dot);
  if (omega < 0.001) return a;
  const sinO = Math.sin(omega);
  const s0 = Math.sin((1 - t) * omega) / sinO;
  const s1 = Math.sin(t * omega) / sinO;
  return [s0*a[0]+s1*b[0], s0*a[1]+s1*b[1], s0*a[2]+s1*b[2]];
}

function projectGlobe(
  vec: [number, number, number],
  rotX: number, rotY: number,
  cx: number, cy: number, radius: number,
): [number, number, boolean] {
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const x1 =  vec[0] * cosY + vec[2] * sinY;
  const z1 = -vec[0] * sinY + vec[2] * cosY;
  const y1 =  vec[1];
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const x2 = x1;
  const y2 = y1 * cosX - z1 * sinX;
  const z2 = y1 * sinX + z1 * cosX;
  return [cx + x2 * radius, cy - y2 * radius, z2 > 0];
}

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

// ── Chapter 4 — Korea Map → Globe ────────────────────────────────────────────
const Chapter4: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C4S, C4E], [0, 1]);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef  = useRef(0);
  const rotRef       = useRef({ x: 0.28, y: 0.645 });
  const targetRef    = useRef({ x: 0.28, y: 0.645 });
  const rafRef       = useRef(0);

  useMotionValueEvent(p, 'change', (v) => { progressRef.current = v; });

  const textOp = useTransform(p, [0.00, 0.10, 0.22, 0.50], [0, 1, 1, 0]);
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

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width  - 0.5;
      const ny = (e.clientY - rect.top)  / rect.height - 0.5;
      targetRef.current.y = 0.645 + nx * 2.2;
      targetRef.current.x = 0.28  + ny * 0.6;
    };
    container.addEventListener('mousemove', onMouseMove);

    const SEOUL = latLonToVec3(37.5665, 126.978);
    const SEOUL_ROT = { x: 0.28, y: 0.645 };
    // LINE_START + 10×LINE_GAP + LINE_DUR = 0.48 + 0.38 + 0.075 = 0.935 — all complete before exit
    const LINE_START = 0.48, LINE_GAP = 0.038, LINE_DUR = 0.075;

    const draw = () => {
      if (cancelled) return;
      rafRef.current = requestAnimationFrame(draw);

      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const pv = progressRef.current;

      // zoomPhase: 1 = Korea zoomed in, 0 = full globe
      const zoomRaw = Math.max(0, Math.min(1, 1 - (pv - 0.10) / 0.44));
      const zoomPhase = zoomRaw < 0.5
        ? 2 * zoomRaw * zoomRaw
        : 1 - Math.pow(-2 * zoomRaw + 2, 2) / 2;

      const baseRadius = Math.min(w, h) * 0.40;
      const radius = baseRadius * (1 + zoomPhase * 6.2);
      const cx = w * 0.5, cy = h * 0.5;

      const rot = rotRef.current, tgt = targetRef.current;
      const blendX = zoomPhase * SEOUL_ROT.x + (1 - zoomPhase) * tgt.x;
      const blendY = zoomPhase * SEOUL_ROT.y + (1 - zoomPhase) * tgt.y;
      rot.x += (blendX - rot.x) * 0.05;
      rot.y += (blendY - rot.y) * 0.05;
      if (zoomPhase < 0.05) tgt.y += 0.0007;

      const koreaAlpha = zoomPhase;
      const globeAlpha = 1 - zoomPhase;

      // ── Globe ──────────────────────────────────────────────────────────────
      if (globeAlpha > 0.01) {
        ctx.globalAlpha = globeAlpha;

        const sphGrad = ctx.createRadialGradient(
          cx - baseRadius * 0.28, cy - baseRadius * 0.28, 0, cx, cy, baseRadius,
        );
        sphGrad.addColorStop(0,   'rgba(35,35,48,0.94)');
        sphGrad.addColorStop(0.6, 'rgba(10,10,16,0.98)');
        sphGrad.addColorStop(1,   'rgba(3,3,6,1)');
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = sphGrad;
        ctx.fill();

        const glowGrad = ctx.createRadialGradient(cx, cy, baseRadius * 0.82, cx, cy, baseRadius * 1.18);
        glowGrad.addColorStop(0,   'rgba(255,184,0,0)');
        glowGrad.addColorStop(0.5, 'rgba(255,184,0,0.04)');
        glowGrad.addColorStop(1,   'rgba(255,184,0,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius * 1.18, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        ctx.globalAlpha = globeAlpha * 0.045;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
        ctx.clip();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = 'rgba(255,255,255,1)';
        for (let lat = -60; lat <= 60; lat += 30) {
          ctx.beginPath();
          let first = true;
          for (let lon = 0; lon <= 360; lon += 4) {
            const [px, py, vis] = projectGlobe(latLonToVec3(lat, lon), rot.x, rot.y, cx, cy, baseRadius);
            if (!vis) { first = true; continue; }
            first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
            first = false;
          }
          ctx.stroke();
        }
        for (let lon = 0; lon < 180; lon += 30) {
          ctx.beginPath();
          let first = true;
          for (let lat = -85; lat <= 85; lat += 4) {
            const [px, py, vis] = projectGlobe(latLonToVec3(lat, lon), rot.x, rot.y, cx, cy, baseRadius);
            if (!vis) { first = true; continue; }
            first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
            first = false;
          }
          ctx.stroke();
        }
        ctx.restore();
        ctx.globalAlpha = 1;

        // Connection lines from Seoul to each city
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
        ctx.clip();

        GLOBE_CITIES.forEach((dest, i) => {
          const prog = Math.max(0, Math.min(1, (pv - LINE_START - i * LINE_GAP) / LINE_DUR));
          if (prog <= 0) return;
          const destVec = latLonToVec3(dest.lat, dest.lon);
          const STEPS = 80;
          const endStep = Math.round(STEPS * prog);
          ctx.beginPath();
          let first = true, lastX = 0, lastY = 0;
          for (let s = 0; s <= endStep; s++) {
            const pt = slerp(SEOUL, destVec, s / STEPS);
            const [px, py, vis] = projectGlobe(pt, rot.x, rot.y, cx, cy, baseRadius);
            if (!vis) { first = true; continue; }
            first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
            first = false; lastX = px; lastY = py;
          }
          const a = Math.min(1, prog * 4);
          ctx.strokeStyle = `rgba(255,184,0,${0.6 * a})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();

          if (prog > 0.04 && prog < 0.97) {
            ctx.beginPath();
            ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,184,0,${a})`;
            ctx.fill();
          }
          if (prog >= 0.97) {
            const [dpx, dpy, dvis] = projectGlobe(destVec, rot.x, rot.y, cx, cy, baseRadius);
            if (dvis) {
              ctx.beginPath(); ctx.arc(dpx, dpy, 3.5, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255,184,0,0.9)'; ctx.fill();
              ctx.beginPath(); ctx.arc(dpx, dpy, 7.5, 0, Math.PI * 2);
              ctx.strokeStyle = 'rgba(255,184,0,0.22)'; ctx.lineWidth = 0.8; ctx.stroke();
              ctx.font = 'bold 9px Manrope, sans-serif';
              ctx.fillStyle = 'rgba(255,255,255,0.75)';
              ctx.fillText(dest.name, dpx + 12, dpy + 3);
            }
          }
        });
        ctx.restore();
      }

      // ── Korea outline (strongly visible) ───────────────────────────────────
      if (koreaAlpha > 0.01) {
        // Background glow circle (warm ambient)
        ctx.globalAlpha = koreaAlpha * 0.18;
        const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.42);
        bgGlow.addColorStop(0, 'rgba(255,184,0,0.25)');
        bgGlow.addColorStop(1, 'rgba(255,184,0,0)');
        ctx.fillStyle = bgGlow;
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 1;

        // Local lat/lon grid for Korea area
        ctx.globalAlpha = koreaAlpha * 0.12;
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = 'rgba(255,255,255,1)';
        for (let lat = 33; lat <= 40; lat += 2) {
          ctx.beginPath(); let first = true;
          for (let lon = 124; lon <= 132; lon += 0.5) {
            const [px, py] = projectGlobe(latLonToVec3(lat, lon), rot.x, rot.y, cx, cy, radius);
            first ? ctx.moveTo(px, py) : ctx.lineTo(px, py); first = false;
          }
          ctx.stroke();
        }
        for (let lon = 124; lon <= 132; lon += 2) {
          ctx.beginPath(); let first = true;
          for (let lat = 33; lat <= 41; lat += 0.5) {
            const [px, py] = projectGlobe(latLonToVec3(lat, lon), rot.x, rot.y, cx, cy, radius);
            first ? ctx.moveTo(px, py) : ctx.lineTo(px, py); first = false;
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        const traceProgress = Math.min(1, Math.max(0, pv / 0.10));
        const traceCount = Math.floor(traceProgress * KOREA_OUTLINE.length);

        // Korea filled area
        ctx.beginPath();
        KOREA_OUTLINE.forEach(([lat, lon], i) => {
          const [px, py] = projectGlobe(latLonToVec3(lat, lon), rot.x, rot.y, cx, cy, radius);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.fillStyle = `rgba(255,184,0,${koreaAlpha * 0.18})`;
        ctx.fill();

        // Korea outline — traces itself with strong glow
        ctx.save();
        ctx.shadowColor = '#FFB800';
        ctx.shadowBlur = 32 * koreaAlpha;
        ctx.beginPath();
        for (let i = 0; i < traceCount; i++) {
          const [lat, lon] = KOREA_OUTLINE[i];
          const [px, py] = projectGlobe(latLonToVec3(lat, lon), rot.x, rot.y, cx, cy, radius);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        if (traceCount >= KOREA_OUTLINE.length) ctx.closePath();
        ctx.strokeStyle = `rgba(255,184,0,${koreaAlpha * 0.98})`;
        ctx.lineWidth = 5;
        ctx.stroke();

        // Second pass — bright center line
        ctx.shadowBlur = 0;
        ctx.beginPath();
        for (let i = 0; i < traceCount; i++) {
          const [lat, lon] = KOREA_OUTLINE[i];
          const [px, py] = projectGlobe(latLonToVec3(lat, lon), rot.x, rot.y, cx, cy, radius);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        if (traceCount >= KOREA_OUTLINE.length) ctx.closePath();
        ctx.strokeStyle = `rgba(255,255,255,${koreaAlpha * 0.60})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // ── Seoul pulse dot ────────────────────────────────────────────────────
      if (pv > 0.01) {
        const [spx, spy, svis] = projectGlobe(SEOUL, rot.x, rot.y, cx, cy, radius);
        if (svis) {
          const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 600);
          const dotAlpha = Math.min(1, pv * 20);
          const dotSize = 4 + zoomPhase * 4;

          for (let r = 1; r <= 3; r++) {
            ctx.beginPath();
            ctx.arc(spx, spy, dotSize + r * (5 + zoomPhase * 5) * pulse, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255,184,0,${(0.2 / r) * dotAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.arc(spx, spy, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,184,0,${dotAlpha})`;
          ctx.fill();
          ctx.font = `bold ${9 + zoomPhase * 4}px Manrope, sans-serif`;
          ctx.fillStyle = `rgba(255,184,0,${0.95 * dotAlpha})`;
          ctx.fillText('SEOUL', spx + dotSize + 6, spy + 4);
        }
      }
    };

    draw();
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
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
  { label: '지하철 스크린도어', spec: '1,470 × 470mm · 전국 주요역', color: '#FFB800' },
  { label: '옥외 전광판',      spec: 'Full HD/4K · 가로·세로형',    color: '#FFB800' },
  { label: '택시 미디어',      spec: '후면 LED · 측면 랩핑 · 전국', color: '#FFB800' },
  { label: '버스 외부광고',    spec: '슈퍼사이드·풀백·측면랩 · 1M+', color: '#FFB800' },
];

const FANCLUB_ITEMS = [
  { label: 'K-POP 팬클럽 광고', spec: '공항·지하철·옥외 팬이벤트 집행' },
  { label: '해외 광고',          spec: '일본·중국·동남아·미국·유럽 집행' },
];

// ── Chapter 5 — Full scroll-scrubbing TTL showcase ────────────────────────────
const Chapter5: React.FC<{ g: MotionValue<number>; onContactClick?: () => void }> = ({ g, onContactClick }) => {
  const p = useTransform(g, [C5S, C5E], [0, 1]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const labelOp    = useTransform(p, [0.00, 0.08], [0, 1]);
  const h1Op       = useTransform(p, [0.04, 0.16], [0, 1]);
  const h1Y        = useTransform(p, [0.04, 0.16], ['7%', '0%']);
  const h2Op       = useTransform(p, [0.11, 0.23], [0, 1]);
  const h2Y        = useTransform(p, [0.11, 0.23], ['7%', '0%']);
  const bodyOp     = useTransform(p, [0.23, 0.35], [0, 1]);
  const bodyY      = useTransform(p, [0.23, 0.35], ['4%', '0%']);
  const videoOp    = useTransform(p, [0.32, 0.42], [0, 1]);
  const videoScale = useTransform(p, [0.32, 0.62], [0.22, 1.0]);
  const tvOp       = useTransform(p, [0.50, 0.60], [0, 1]);
  const iptvOp     = useTransform(p, [0.56, 0.66], [0, 1]);
  const btlOp      = useTransform(p, [0.63, 0.73], [0, 1]);
  const btlY       = useTransform(p, [0.63, 0.73], ['4%', '0%']);
  const fanOp      = useTransform(p, [0.72, 0.81], [0, 1]);
  const fanY       = useTransform(p, [0.72, 0.81], ['4%', '0%']);
  const ctaOp      = useTransform(p, [0.86, 0.95], [0, 1]);
  const ctaY       = useTransform(p, [0.86, 0.95], ['4%', '0%']);

  return (
    <div style={{ height: `${H5}vh` }}>
      <StickyPanel>
        {/* Section label */}
        <motion.p style={{ opacity: labelOp }} className="text-[11px] tracking-[0.35em] uppercase text-[#FFB800] mb-5 font-bold">
          THROUGH THE LINE — TTL CAMPAIGN
        </motion.p>

        {/* Giant headline — two lines dissolve in */}
        <div className="mb-5">
          <div className="overflow-hidden">
            <motion.h2
              style={{ opacity: h1Op, y: h1Y, fontSize: 'clamp(3rem, 10vw, 8.5rem)' }}
              className="font-black tracking-[-0.03em] leading-[0.85] text-white block"
            >TVC 제작부터</motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              style={{ opacity: h2Op, y: h2Y, fontSize: 'clamp(3rem, 10vw, 8.5rem)', color: '#FFB800' }}
              className="font-black tracking-[-0.03em] leading-[0.85] block"
            >전국 송출까지.</motion.h2>
          </div>
        </div>

        {/* Body text */}
        <motion.p style={{ opacity: bodyOp, y: bodyY }}
          className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl mb-6 font-light"
        >
          공영·케이블·IPTV부터 지하철·옥외·택시·버스까지 —<br className="hidden md:block" />
          모든 매체를 단 하나의 파트너로 완성합니다.
        </motion.p>

        {/* Video + channels row */}
        <div className="flex gap-5 items-start mb-5">
          {/* Video — grows from small to large via scale */}
          <motion.div style={{ opacity: videoOp, scale: videoScale }} className="shrink-0 origin-top-left">
            <div
              className="relative bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden shadow-2xl"
              style={{ width: 'clamp(160px, 26vw, 280px)', aspectRatio: '16/9' }}
            >
              <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-black/75 backdrop-blur-sm px-2 py-1 rounded text-[9px] font-bold text-white">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" style={{ animation: 'pulse 1.2s ease-in-out infinite' }} />
                JTBC ON-AIR
              </div>
              <div className="absolute bottom-1.5 right-2 z-10 text-[8px] font-black text-white/40 tracking-wider">LIVERNOVO</div>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="/livernovo-jtbc.mp4"
                muted loop playsInline autoPlay
                onLoadedMetadata={() => { if (videoRef.current) videoRef.current.currentTime = 29; }}
              />
            </div>
            <p className="text-[9px] text-white/22 mt-1.5 font-light">실제 방영 모니터링 영상 · 2025.11</p>
          </motion.div>

          {/* Channel badges */}
          <div className="flex-1 min-w-0 space-y-3">
            <motion.div style={{ opacity: tvOp }}>
              <p className="text-[9px] text-white/28 tracking-[0.2em] uppercase mb-1.5">공영 · 케이블 · 종편</p>
              <div className="flex flex-wrap gap-1">
                {BROADCAST_CHANNELS.tv.map(ch => (
                  <span key={ch} className="text-[9px] font-bold border border-white/10 px-2 py-0.5 rounded text-white/50 hover:border-[#FFB800]/40 hover:text-[#FFB800]/80 transition-colors cursor-default">
                    {ch}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div style={{ opacity: iptvOp }}>
              <p className="text-[9px] text-white/28 tracking-[0.2em] uppercase mb-1.5">IPTV</p>
              <div className="flex flex-wrap gap-1">
                {BROADCAST_CHANNELS.iptv.map(ch => (
                  <span key={ch} className="text-[9px] font-bold border border-white/10 px-2 py-0.5 rounded text-white/50">
                    {ch}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* BTL Offline — 4 items with specs */}
        <motion.div style={{ opacity: btlOp, y: btlY }} className="mb-4">
          <p className="text-[9px] text-white/28 tracking-[0.2em] uppercase mb-2">오프라인 BTL 광고</p>
          <div className="flex flex-wrap gap-2">
            {BTL_ITEMS.map(item => (
              <div key={item.label} className="flex flex-col border border-[#FFB800]/18 rounded px-3 py-2 bg-[#FFB800]/[0.04]">
                <span className="text-[10px] font-bold text-[#FFB800]/75">{item.label}</span>
                <span className="text-[8px] text-white/30 mt-0.5">{item.spec}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Fanclub + Overseas — partnership with newad.kr */}
        <motion.div style={{ opacity: fanOp, y: fanY }} className="mb-5">
          <p className="text-[9px] text-white/28 tracking-[0.2em] uppercase mb-2">팬클럽 광고 · 해외 광고</p>
          <div className="flex flex-wrap gap-2">
            {FANCLUB_ITEMS.map(item => (
              <div key={item.label} className="flex flex-col border border-white/10 rounded px-3 py-2">
                <span className="text-[10px] font-bold text-white/60">{item.label}</span>
                <span className="text-[8px] text-white/25 mt-0.5">{item.spec}</span>
              </div>
            ))}
            <div className="flex flex-col justify-center border border-white/8 rounded px-3 py-2">
              <span className="text-[8px] text-white/20 font-light">협력사 · NEWAD.KR</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div style={{ opacity: ctaOp, y: ctaY }} className="flex items-center justify-between border-t border-white/8 pt-5">
          <div>
            <p className="text-white/30 text-xs font-light mb-1 tracking-widest uppercase">ALL IN ONE 솔루션</p>
            <p className="text-white font-bold leading-tight" style={{ fontSize: 'clamp(1.1rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
              프로젝트 문의하기
            </p>
          </div>
          <button
            onClick={onContactClick}
            className="shrink-0 ml-6 flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            문의하기 <span className="text-base leading-none">→</span>
          </button>
        </motion.div>
      </StickyPanel>
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
