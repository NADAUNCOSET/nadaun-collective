import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';

const SECTION_H = 320;
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// shuffle helper (per-load 변경) — Math.random 사용 (런타임만)
const shuffle = <T,>(a: T[]) => a.map(v => [Math.random(), v] as const).sort((x, y) => x[0] - y[0]).map(([, v]) => v);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [vids, setVids] = useState<string[]>([]);
  const [vIdx, setVIdx] = useState(0);
  const [inView, setInView] = useState(true); // 화면 밖이면 영상 멈춤 (경량화)

  // LIVERNOVO 프록시 영상 배경 (R2) — 새로고침마다 셔플
  useEffect(() => {
    fetch('/livernovo-videos.json')
      .then(r => r.json())
      .then((m: any[]) => {
        const list = (Array.isArray(m) ? m : []).map(x => x?.src).filter(Boolean);
        if (list.length) setVids(shuffle(list));
      })
      .catch(() => {});
  }, []);

  // 뷰포트 밖이면 배경영상 디코딩 중단 (CPU/배터리 절약)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {}); else v.pause();
  }, [inView, vIdx, vids.length]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  // ── Word entries (stacking top → bottom) ─────────────────────
  const w1Op = useTransform(scrollYProgress, [0.00, 0.08], [0, 1]);
  const w1Y  = useTransform(scrollYProgress, [0.00, 0.08], ['28px', '0px']);
  const w2Op = useTransform(scrollYProgress, [0.10, 0.20], [0, 1]);
  const w2Y  = useTransform(scrollYProgress, [0.10, 0.20], ['28px', '0px']);
  const w3Op = useTransform(scrollYProgress, [0.24, 0.34], [0, 1]);
  const w3Y  = useTransform(scrollYProgress, [0.24, 0.34], ['28px', '0px']);

  // TTL — letter by letter
  const ttl0Op = useTransform(scrollYProgress, [0.38, 0.43], [0, 1]);
  const ttl0Y  = useTransform(scrollYProgress, [0.38, 0.43], ['24px', '0px']);
  const ttl1Op = useTransform(scrollYProgress, [0.44, 0.49], [0, 1]);
  const ttl1Y  = useTransform(scrollYProgress, [0.44, 0.49], ['24px', '0px']);
  const ttl2Op = useTransform(scrollYProgress, [0.50, 0.55], [0, 1]);
  const ttl2Y  = useTransform(scrollYProgress, [0.50, 0.55], ['24px', '0px']);
  const ttlSpacingNum = useTransform(scrollYProgress, [0.50, 0.67], [0.35, -0.03]);
  const ttlSpacing = useMotionTemplate`${ttlSpacingNum}em`;

  // ── exit ──
  const dissolveOp   = useTransform(scrollYProgress, [0.72, 0.92], [1, 0]);
  const dissolveBlur = useTransform(scrollYProgress, [0.72, 0.92], [0, isMobile ? 0 : 12]);
  const dissolveFilter = useMotionTemplate`blur(${dissolveBlur}px)`;
  const taglineOp = useTransform(scrollYProgress, [0.68, 0.82], [1, 0]);
  const lineX = useTransform(scrollYProgress, [0.68, 0.90], ['-100%', '220%']);
  const lineOp = useTransform(scrollYProgress, [0.68, 0.72, 0.86, 0.90], [0, 0.7, 0.7, 0]);

  useEffect(() => {
    const setpad = () => {
      const vw = window.innerWidth;
      const px = vw >= 1024 ? 96 : vw >= 768 ? 64 : 32;
      document.documentElement.style.setProperty('--header-pad', `${px}px`);
    };
    setpad();
    window.addEventListener('resize', setpad);
    return () => window.removeEventListener('resize', setpad);
  }, []);

  const wordBase: React.CSSProperties = {
    fontFamily: 'Manrope, sans-serif', fontWeight: 900,
    fontSize: 'clamp(2.8rem, 8vw, 7.5rem)', letterSpacing: '-0.03em',
    lineHeight: 0.88, color: '#ffffff', display: 'block',
  };

  const curSrc  = vids.length ? vids[vIdx % vids.length] : null;
  const nextSrc = vids.length ? vids[(vIdx + 1) % vids.length] : null;

  return (
    <div ref={sectionRef} style={{ height: `${SECTION_H}vh` }} className="relative">
      <div className="sticky top-0 w-full overflow-hidden bg-black" style={{ height: '100vh' }}>
        {/* ── LIVERNOVO 영상 배경 ──────────────────────── */}
        <div className="absolute inset-0 z-0 bg-black">
          {curSrc && (
            <video
              key={curSrc}
              ref={videoRef}
              src={curSrc}
              autoPlay muted playsInline preload="auto"
              onEnded={() => setVIdx(i => (i + 1) % vids.length)}
              onError={() => setVIdx(i => (i + 1) % vids.length)}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.4) saturate(0.92)' }}
            />
          )}
          {nextSrc && nextSrc !== curSrc && (
            <video key={`pre-${nextSrc}`} src={nextSrc} muted preload="auto" className="hidden" aria-hidden />
          )}
        </div>

        {/* ── Vignette ────────────────────────────────── */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/75 via-black/15 to-black/35 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />

        {/* ── Words — stacking top → bottom ───────────── */}
        <motion.div
          className="z-10 pointer-events-none absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 flex flex-col"
          style={{ opacity: dissolveOp, filter: dissolveFilter }}
        >
          <motion.span style={{ ...wordBase, opacity: w1Op, y: w1Y }}>Seamless</motion.span>
          <motion.span style={{ ...wordBase, opacity: w2Op, y: w2Y }}>Brand</motion.span>
          <motion.span style={{ ...wordBase, opacity: w3Op, y: w3Y }}>Experience</motion.span>
          <div style={{ display: 'flex', marginTop: '0.32em' }}>
            {(['T', 'T', 'L'] as const).map((char, i) => {
              const ops = [ttl0Op, ttl1Op, ttl2Op];
              const ys  = [ttl0Y,  ttl1Y,  ttl2Y];
              return (
                <motion.span key={i} style={{ ...wordBase, fontSize: 'clamp(3.2rem, 10vw, 9rem)', letterSpacing: ttlSpacing, opacity: ops[i], y: ys[i] }}>
                  {char}
                </motion.span>
              );
            })}
          </div>
        </motion.div>

        {/* ── Tagline ─────────────────────────────────── */}
        <motion.p
          className="z-10 pointer-events-none absolute bottom-6 left-8 md:left-16 lg:left-24 text-[11px] text-white/35 tracking-[0.4em] uppercase font-light"
          style={{ opacity: taglineOp }}
        >
          EST. 2020 — SEOUL, KOREA
        </motion.p>

        {/* ── Sweep line ── */}
        <motion.div className="absolute inset-x-0 h-[1.5px] bg-white pointer-events-none z-20" style={{ top: '50%', x: lineX, opacity: lineOp }} />

        {/* ── Bottom blend ── */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};

export default Hero;
