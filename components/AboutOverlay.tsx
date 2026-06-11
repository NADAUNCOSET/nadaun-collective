import React, { useRef, useEffect, useMemo, Suspense } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion';
import { X } from 'lucide-react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { WORLD_LAND } from './worldGeo';

const HEADER_H = 57;

// Chapter heights (vh)
// 스크롤 총량 단축 (2720→~1430vh): 챕터별 "차례대로 한 화면" 느낌, 내부 연출은 정규화라 유지 (대표 룰 2026-06-11)
const H1 = 170, H2 = 180, H3 = 340, H4 = 380, H5 = 360;
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

// ── Chapter 1 — 차례대로 한 화면에 (세로 스택 순차 등장, 모두 머무름) 대표 룰 2026-06-11 ──
const Chapter1: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C1S, C1E], [0, 1]);

  // 세 단어가 순서대로 나타나 한 화면에 모두 남음 (이전: 가로로 지나가며 사라짐)
  const w1Op = useTransform(p, [0.04, 0.16], [0, 1]);
  const w1Y  = useTransform(p, [0.04, 0.16], ['40px', '0px']);
  const w2Op = useTransform(p, [0.20, 0.32], [0, 1]);
  const w2Y  = useTransform(p, [0.20, 0.32], ['40px', '0px']);
  const w3Op = useTransform(p, [0.36, 0.48], [0, 1]);
  const w3Y  = useTransform(p, [0.36, 0.48], ['40px', '0px']);

  // Sub text fades in after SOLUTION
  const subOp = useTransform(p, [0.54, 0.68], [0, 1]);
  const subY  = useTransform(p, [0.54, 0.68], ['20px', '0px']);

  const FS = { fontSize: 'clamp(3rem, 11vw, 9rem)' } as const;

  return (
    <div style={{ height: `${H1}vh` }}>
      <div
        style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
        className="relative overflow-hidden flex flex-col justify-center px-8 md:px-16 lg:px-24"
      >
        <p className="absolute top-8 left-8 md:left-16 lg:left-24 text-[13px] tracking-[0.35em] uppercase text-[#FFB800] font-bold">
          NADAUN COLLECTIVE — Since 2020, Seoul
        </p>

        <motion.h1
          style={{ opacity: w1Op, y: w1Y, color: 'white', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-[0.95] whitespace-nowrap"
        ><span style={FS}>HIGH-END</span></motion.h1>

        <motion.h1
          style={{ opacity: w2Op, y: w2Y, color: 'white', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-[0.95] whitespace-nowrap"
        ><span style={FS}>CONTENT</span></motion.h1>

        <motion.h1
          style={{ opacity: w3Op, y: w3Y, color: '#FFB800', willChange: 'transform' }}
          className="font-black tracking-[-0.04em] leading-[0.95] whitespace-nowrap"
        ><span style={FS}>SOLUTION.</span></motion.h1>

        <motion.p
          style={{ opacity: subOp, y: subY }}
          className="mt-10 text-white/70 text-lg md:text-2xl font-light leading-relaxed max-w-xl"
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

  // Line 2 — seg*0.12 (빠른 stagger: 2~3문장 거의 동시, 대표 룰 2026-06-11)
  const l2S   = start + seg * 0.12;
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

// ── Chapter 4 — 3D Gold Dot Globe · Descent to Seoul → IP CONNECT ─────────────
const DEG = Math.PI / 180;
const SEOUL = { lat: 37.5665, lon: 126.978 };

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// Matches THREE.SphereGeometry UV so markers/arcs land on the real texture geography
function latLonToVec3(lat: number, lon: number, r = 1): THREE.Vector3 {
  const u = (lon + 180) / 360;
  const v = (90 - lat) / 180;
  const phi = u * Math.PI * 2;
  const theta = v * Math.PI;
  return new THREE.Vector3(
    -r * Math.cos(phi) * Math.sin(theta),
    r * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

// 11 global cities — IP CONNECT network endpoints
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
  { name: 'SAO PAULO', lat: -23.5558, lon: -46.6396  },
];

// Korea peninsula outline — drawn as a glowing loop so the descent target reads unmistakably as KOREA
const KOREA_OUTLINE: [number, number][] = [
  [34.39, 126.22], [34.48, 126.80], [34.58, 127.44], [34.72, 128.04], [34.88, 128.59],
  [35.10, 129.10], [35.42, 129.30], [35.60, 129.40], [36.10, 129.43], [36.55, 129.46],
  [36.82, 129.49], [37.15, 129.30], [37.46, 129.38], [37.74, 129.08], [38.00, 128.60],
  [38.31, 128.50], [38.25, 128.00], [38.30, 127.50], [38.25, 127.00], [38.30, 126.50],
  [38.10, 126.35], [37.88, 126.20], [37.68, 125.69], [37.50, 126.62], [37.26, 126.50],
  [37.00, 126.55], [36.70, 126.40], [36.50, 126.27], [36.20, 126.51], [35.90, 126.55],
  [35.70, 126.48], [35.40, 126.50], [35.20, 126.55], [34.85, 126.45], [34.60, 126.00],
  [34.39, 126.22],
];
function buildKoreaLine(r = 1.005): Float32Array {
  const out = new Float32Array(KOREA_OUTLINE.length * 3);
  KOREA_OUTLINE.forEach(([lat, lon], i) => {
    const v = latLonToVec3(lat, lon, r);
    out[i * 3] = v.x; out[i * 3 + 1] = v.y; out[i * 3 + 2] = v.z;
  });
  return out;
}
// Fine WHITE dot fill over the Korean peninsula — pops against the gold world dots
function buildKoreaDots(step = 0.3): Float32Array {
  const inKorea = (lon: number, lat: number) => {
    let inside = false;
    for (let i = 0, j = KOREA_OUTLINE.length - 1; i < KOREA_OUTLINE.length; j = i++) {
      const yi = KOREA_OUTLINE[i][0], xi = KOREA_OUTLINE[i][1];
      const yj = KOREA_OUTLINE[j][0], xj = KOREA_OUTLINE[j][1];
      if (((yi > lat) !== (yj > lat)) && (lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi)) inside = !inside;
    }
    return inside;
  };
  const pos: number[] = [];
  for (let lat = 34; lat <= 38.4; lat += step) {
    for (let lon = 125.6; lon <= 129.6; lon += step) {
      if (inKorea(lon, lat)) {
        const v = latLonToVec3(lat, lon, 1.006);
        pos.push(v.x, v.y, v.z);
      }
    }
  }
  return new Float32Array(pos);
}

// ── Land dot matrix: lat/lon grid filtered by point-in-land (computed once) ────
let _landCache: Float32Array | null = null;
function buildLandPositions(step = 1.4): Float32Array {
  if (_landCache) return _landCache;
  // ring bounding boxes for fast rejection
  const bboxes = WORLD_LAND.map(ring => {
    let mnx = 1e9, mny = 1e9, mxx = -1e9, mxy = -1e9;
    for (const [x, y] of ring) {
      if (x < mnx) mnx = x; if (x > mxx) mxx = x;
      if (y < mny) mny = y; if (y > mxy) mxy = y;
    }
    return [mnx, mny, mxx, mxy];
  });
  const inRing = (lon: number, lat: number, ring: [number, number][]) => {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
      if (((yi > lat) !== (yj > lat)) && (lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi)) inside = !inside;
    }
    return inside;
  };
  const onLand = (lon: number, lat: number) => {
    for (let k = 0; k < WORLD_LAND.length; k++) {
      const b = bboxes[k];
      if (lon < b[0] || lon > b[2] || lat < b[1] || lat > b[3]) continue;
      if (inRing(lon, lat, WORLD_LAND[k])) return true;
    }
    return false;
  };
  const pos: number[] = [];
  for (let lat = -82; lat <= 82; lat += step) {
    const lonStep = step / Math.max(0.18, Math.cos(lat * DEG)); // even spacing
    for (let lon = -180; lon <= 180; lon += lonStep) {
      if (onLand(lon, lat)) {
        const v = latLonToVec3(lat, lon, 1.0);
        pos.push(v.x, v.y, v.z);
      }
    }
  }
  _landCache = new Float32Array(pos);
  return _landCache;
}

// star field (fixed in space)
function buildStars(n = 900): Float32Array {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    // deterministic scatter (no Math.random — keeps it stable)
    const t = i * 2.399963; // golden angle
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const rad = 14 + ((i * 53) % 11);
    a[i * 3]     = Math.cos(t) * r * rad;
    a[i * 3 + 1] = y * rad;
    a[i * 3 + 2] = Math.sin(t) * r * rad;
  }
  return a;
}

// great-circle arc points Seoul → city, lifted into an over-the-horizon curve
function buildArc(from: THREE.Vector3, to: THREE.Vector3, segments = 56): Float32Array {
  const a = from.clone().normalize();
  const b = to.clone().normalize();
  const dot = Math.max(-1, Math.min(1, a.dot(b)));
  const omega = Math.acos(dot);
  const sinO = Math.sin(omega) || 1e-6;
  const out = new Float32Array((segments + 1) * 3);
  const dist = omega / Math.PI;                 // 0..1 angular distance
  const lift = 0.14 + dist * 0.42;              // farther city → higher arc
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const s1 = Math.sin((1 - t) * omega) / sinO;
    const s2 = Math.sin(t * omega) / sinO;
    const x = a.x * s1 + b.x * s2;
    const y = a.y * s1 + b.y * s2;
    const z = a.z * s1 + b.z * s2;
    const v = new THREE.Vector3(x, y, z).normalize();
    const r = 1 + Math.sin(Math.PI * t) * lift;
    v.multiplyScalar(r);
    out[i * 3] = v.x; out[i * 3 + 1] = v.y; out[i * 3 + 2] = v.z;
  }
  return out;
}

// Atmosphere — fresnel rim glow (gold/blue) for the "from space" look
const AtmosphereGlow: React.FC = () => {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uInner: { value: new THREE.Color('#4a86e8') },
      uOuter: { value: new THREE.Color('#bcd8ff') },
    },
    vertexShader: `
      varying vec3 vN; varying vec3 vP;
      void main(){ vN = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position,1.0); vP = mv.xyz;
        gl_Position = projectionMatrix * mv; }
    `,
    fragmentShader: `
      varying vec3 vN; varying vec3 vP;
      uniform vec3 uInner; uniform vec3 uOuter;
      void main(){
        vec3 V = normalize(-vP);
        float f = pow(1.0 - max(dot(vN, V), 0.0), 3.4);
        vec3 c = mix(uInner, uOuter, clamp(f, 0.0, 1.0));
        gl_FragColor = vec4(c, f * 0.9);
      }
    `,
  }), []);
  return (
    <mesh scale={1.11}>
      <sphereGeometry args={[1, 48, 48]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
};

const RealGlobe: React.FC<{ progressRef: React.MutableRefObject<number> }> = ({ progressRef }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const cloudMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const arcRefs = useRef<(THREE.BufferGeometry | null)[]>([]);
  const arcMatRefs = useRef<(THREE.LineBasicMaterial | null)[]>([]);
  const { camera } = useThree();

  const [dayMap, cloudMap] = useLoader(THREE.TextureLoader, [
    '/earth_day_8k.jpg', '/earth_clouds.png',
  ]);
  dayMap.colorSpace = THREE.SRGBColorSpace;
  dayMap.anisotropy = 8;

  const stars = useMemo(() => buildStars(), []);
  const seoulVec = useMemo(() => latLonToVec3(SEOUL.lat, SEOUL.lon, 1), []);
  const seoulDir = useMemo(() => seoulVec.clone().normalize(), [seoulVec]);

  // bring Seoul to the camera (+Z) AND keep north up (+Y) — familiar "Korea from above" view
  const qSeoul = useMemo(() => {
    const fwd = seoulDir.clone();
    const up0 = new THREE.Vector3(0, 1, 0);
    const up = up0.clone().sub(fwd.clone().multiplyScalar(up0.dot(fwd))).normalize();
    const right = new THREE.Vector3().crossVectors(up, fwd).normalize();
    const m = new THREE.Matrix4().makeBasis(right, up, fwd);
    return new THREE.Quaternion().setFromRotationMatrix(m).invert();
  }, [seoulDir]);
  const qStart = useMemo(() => {
    const off = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.30, 1.05, 0.06));
    return qSeoul.clone().premultiply(off);
  }, [qSeoul]);

  const arcs = useMemo(
    () => GLOBE_CITIES.map(c => buildArc(seoulVec, latLonToVec3(c.lat, c.lon, 1))),
    [seoulVec],
  );
  const markerQuat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), seoulDir),
    [seoulDir],
  );

  useFrame((state) => {
    const p = progressRef.current;
    const g = groupRef.current;
    if (!g) return;

    const de = easeOutExpo(clamp01(p / 0.45));
    g.quaternion.slerpQuaternions(qStart, qSeoul, de);

    let camZ: number, camY: number;
    if (p < 0.45) {
      camZ = lerp(5.2, 2.25, de);
      camY = lerp(1.25, 0.02, de);
    } else if (p < 0.62) {
      const t = easeInOut(clamp01((p - 0.45) / 0.17));
      camZ = lerp(2.25, 2.15, t);
      camY = 0.02;
    } else {
      const t = easeInOut(clamp01((p - 0.62) / 0.38));
      camZ = lerp(2.15, 3.7, t);
      camY = lerp(0.02, 0.3, t);
    }
    camera.position.set(0, camY, camZ);
    camera.lookAt(0, 0, 0);

    // clouds part as we descend toward Korea
    if (cloudRef.current) cloudRef.current.rotation.y += 0.0003;
    if (cloudMatRef.current) cloudMatRef.current.opacity = 0.34 * (1 - de);

    if (pulseRef.current) {
      const beat = 0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 2.2);
      const sc = 1 + beat * 1.8;
      pulseRef.current.scale.set(sc, sc, sc);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - beat) * 0.6 * clamp01((p - 0.2) / 0.12);
    }

    arcs.forEach((_, i) => {
      const geo = arcRefs.current[i];
      const mat = arcMatRefs.current[i];
      if (!geo || !mat) return;
      const start = 0.64 + i * 0.018;
      const prog = clamp01((p - start) / 0.12);
      const total = arcs[i].length / 3;
      geo.setDrawRange(0, Math.max(0, Math.floor(total * prog)));
      mat.opacity = 0.9 * clamp01((p - start) / 0.05);
    });
  });

  return (
    <>
      {/* stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#9fb4e0" sizeAttenuation transparent opacity={0.5} depthWrite={false} />
      </points>

      {/* even daylight on the camera-facing hemisphere */}
      <directionalLight position={[0.2, 0.35, 1.5]} intensity={1.5} color="#fff6e8" />
      <ambientLight intensity={1.15} />

      <AtmosphereGlow />

      {/* globe */}
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[1, 96, 96]} />
          <meshStandardMaterial map={dayMap} roughness={1} metalness={0} />
        </mesh>

        {/* clouds — thin, clear away on descent */}
        <mesh ref={cloudRef} scale={1.01}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial ref={cloudMatRef} color="#ffffff" alphaMap={cloudMap} transparent opacity={0.34} depthWrite={false} roughness={1} metalness={0} />
        </mesh>

        {/* Seoul marker + pulse */}
        <group position={seoulDir.clone().multiplyScalar(1.014)} quaternion={markerQuat}>
          <mesh>
            <sphereGeometry args={[0.012, 16, 16]} />
            <meshBasicMaterial color="#FFB800" />
          </mesh>
          <mesh ref={pulseRef}>
            <ringGeometry args={[0.018, 0.025, 32]} />
            <meshBasicMaterial color="#FFB800" transparent opacity={0.6} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
        </group>

        {/* IP CONNECT arcs */}
        {arcs.map((arc, i) => (
          <line key={i}>
            <bufferGeometry ref={(el) => (arcRefs.current[i] = el)}>
              <bufferAttribute attach="attributes-position" args={[arc, 3]} />
            </bufferGeometry>
            <lineBasicMaterial
              ref={(el) => (arcMatRefs.current[i] = el)}
              color="#FFB800"
              transparent
              opacity={0}
              depthWrite={false}
            />
          </line>
        ))}
      </group>
    </>
  );
};

const Chapter4: React.FC<{ g: MotionValue<number> }> = ({ g }) => {
  const p = useTransform(g, [C4S, C4E], [0, 1]);
  const progressRef = useRef(0);
  useMotionValueEvent(p, 'change', (v) => { progressRef.current = v; });

  const headOp = useTransform(p, [0.00, 0.08, 0.36, 0.52], [0, 1, 1, 0]);
  const koreaLabelOp = useTransform(p, [0.20, 0.32, 0.50, 0.60], [0, 1, 1, 0]);
  const koreaLabelY = useTransform(p, [0.20, 0.32], ['18px', '0px']);
  const titleOp = useTransform(p, [0.50, 0.60, 0.86, 0.94], [0, 1, 1, 0]);
  const exitOp = useTransform(p, [0.90, 0.99], [1, 0]);

  return (
    <div style={{ height: `${H4}vh` }}>
      <motion.div
        style={{ position: 'sticky', top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)`, opacity: exitOp }}
        className="relative overflow-hidden bg-[#04060d]"
      >
        <Canvas
          className="absolute inset-0"
          style={{ pointerEvents: 'none' }}
          camera={{ position: [0, 1.35, 5.4], fov: 42, near: 0.01, far: 100 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <RealGlobe progressRef={progressRef} />
          </Suspense>
        </Canvas>

        {/* Descent target label — 대한민국 / KOREA */}
        <motion.div style={{ opacity: koreaLabelOp, y: koreaLabelY }}
          className="absolute inset-x-0 top-[57%] flex flex-col items-center text-center pointer-events-none">
          <p className="text-[11px] md:text-[13px] tracking-[0.6em] uppercase text-[#FFB800] font-bold mb-2">KOREA</p>
          <h2 className="font-black text-white tracking-[-0.02em] leading-none"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 6rem)' }}>대한민국</h2>
          <p className="mt-3 text-white/55 text-[11px] md:text-xs tracking-[0.35em] font-light">SEOUL · 37.5°N 127.0°E</p>
        </motion.div>

        {/* DOM overlay text */}
        <div className="absolute inset-0 flex flex-col justify-between px-8 md:px-16 lg:px-24 py-10 pointer-events-none">
          <motion.p style={{ opacity: headOp }}
            className="text-[13px] tracking-[0.35em] uppercase text-[#FFB800] font-bold">
            IP CONNECT — GLOBAL
          </motion.p>

          <motion.div style={{ opacity: titleOp }} className="mb-2">
            <p className="text-[11px] tracking-[0.45em] uppercase text-[#FFB800] font-bold mb-5">SEOUL · KOREA</p>
            <h2 className="font-black tracking-[-0.03em] leading-[0.86] text-white block"
              style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}>IP</h2>
            <h2 className="font-black tracking-[-0.03em] leading-[0.86] block"
              style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)', color: '#FFB800' }}>CONNECT.</h2>
            <p className="mt-6 text-white/65 text-base md:text-xl leading-relaxed max-w-2xl font-light">
              핵심 IP부터 글로벌 에이전시 네트워크까지 — 서울에서 세계 11개 도시로,<br className="hidden md:block" />
              모든 것을 하나로 연결하는 올인원 파트너.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// ── Broadcast data ────────────────────────────────────────────────────────────
// 전국 송출 가능 채널 — 공영·지역민방·종편·케이블·보도·IPTV·위성 전체 커버리지
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

  // ── Intro phrase — one screen, quick reveal (like the About opening) ──
  const phraseOp = useTransform(p, [0.01, 0.08, 0.50, 0.58], [0, 1, 1, 0]);
  const l1Y = useTransform(p, [0.01, 0.10], ['10%', '0%']);
  const l2Op = useTransform(p, [0.07, 0.16], [0, 1]);
  const l2Y = useTransform(p, [0.07, 0.16], ['12%', '0%']);

  // ── S1: Channels ──
  const s1Op  = useTransform(p, [0.61, 0.66, 0.72, 0.76], [0, 1, 1, 0]);
  const s1Y   = useTransform(p, [0.61, 0.66], ['4%', '0%']);
  const aOp   = useTransform(p, [0.62, 0.68], [0, 1]);
  const bOp   = useTransform(p, [0.67, 0.73], [0, 1]);

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

        {/* ── INTRO PHRASE — one screen, quick reveal ── */}
        <motion.div style={{ opacity: phraseOp }}
          className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 will-change-transform">
          <motion.h2 style={{ y: l1Y, fontSize: 'clamp(3rem, 11vw, 9.5rem)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 900 }}
            className="text-white block">
            TVC 제작부터
          </motion.h2>
          <motion.h2 style={{ opacity: l2Op, y: l2Y, fontSize: 'clamp(3rem, 11vw, 9.5rem)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 900, color: '#FFB800' }}
            className="block mt-1">
            전국 송출까지.
          </motion.h2>
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

          {/* Channel categories — 전국 송출 채널 전체 커버리지 */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-2">
              공영 · 지역민방 · 종편 · 케이블 · 보도 · IPTV · 위성
            </p>
            <p className="text-white/45 text-xs md:text-sm font-light mb-7">전국 모든 송출 채널 — 어디든 닿습니다</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-5xl">
              {BROADCAST_CHANNELS.map((grp, gi) => (
                <motion.div key={grp.cat} style={{ opacity: gi < 4 ? aOp : bOp }}
                  className="border-l-2 border-[#FFB800]/40 pl-4">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-[#FFB800] font-bold mb-1.5">{grp.cat}</p>
                  <p className="font-black leading-tight text-white/90"
                    style={{ fontSize: 'clamp(1.05rem, 2vw, 1.85rem)', letterSpacing: '-0.01em' }}>
                    {grp.items.join(' · ')}
                  </p>
                </motion.div>
              ))}
            </div>
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
