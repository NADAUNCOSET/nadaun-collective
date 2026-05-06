import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';

const ALL_IMAGES = [
  { src: '/hero/pepsi-festa.webp',    pos: 'center 35%' },
  { src: '/hero/hd-hyundai.webp',     pos: 'center 40%' },
  { src: '/hero/royal-salute.webp',   pos: 'center 30%' },
  { src: '/hero/banyan-tree.webp',    pos: 'center 30%' },
  { src: '/people/dong-wook-00.webp', pos: 'center 20%' },
  { src: '/hero/varilux-seoul.webp',  pos: 'center 40%' },
  { src: '/people/laon-band-00.webp', pos: 'center 25%' },
];

const SECTION_H = 320;

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = React.useState(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const scrollLocked = useRef(false);

  const rawX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const rawY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);
  const mouseX = useSpring(rawX, { stiffness: 100, damping: 20, restDelta: 0.5 });
  const mouseY = useSpring(rawY, { stiffness: 100, damping: 20, restDelta: 0.5 });

  const lensMask   = useMotionTemplate`radial-gradient(circle 680px at ${mouseX}px ${mouseY}px, black 30%, transparent 100%)`;
  const lensWebkit = useMotionTemplate`radial-gradient(circle 680px at ${mouseX}px ${mouseY}px, black 30%, transparent 100%)`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollLocked.current = v > 0.01;
    const idx = Math.min(Math.floor(v * ALL_IMAGES.length), ALL_IMAGES.length - 1);
    setActiveImage(idx);
  });

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

  // ── All-words dissolve exit ────────────────────────────────────
  const dissolveOp   = useTransform(scrollYProgress, [0.72, 0.92], [1, 0]);
  const dissolveBlur = useTransform(scrollYProgress, [0.72, 0.92], [0, 12]);
  const dissolveFilter = useMotionTemplate`blur(${dissolveBlur}px)`;

  const taglineOp = useTransform(scrollYProgress, [0.68, 0.82], [1, 0]);

  // ── White sweep line — passes through the screen during transition
  const lineX = useTransform(scrollYProgress, [0.68, 0.90], ['-100%', '220%']);
  const lineOp = useTransform(scrollYProgress, [0.68, 0.72, 0.86, 0.90], [0, 0.7, 0.7, 0]);

  useEffect(() => {
    ALL_IMAGES.forEach(({ src }) => { const img = new Image(); img.src = src; });
  }, []);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    rawX.set(clientX);
    rawY.set(clientY);
    if (!scrollLocked.current) {
      const d = Math.sqrt(
        (clientX - lastMousePos.current.x) ** 2 + (clientY - lastMousePos.current.y) ** 2
      );
      if (d > 160) {
        setActiveImage(p => (p + 1) % ALL_IMAGES.length);
        lastMousePos.current = { x: clientX, y: clientY };
      }
    }
  };

  const wordBase: React.CSSProperties = {
    fontFamily: 'Manrope, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(2.8rem, 8vw, 7.5rem)',
    letterSpacing: '-0.03em',
    lineHeight: 0.88,
    color: '#ffffff',
    display: 'block',
  };

  return (
    <div ref={sectionRef} style={{ height: `${SECTION_H}vh` }} className="relative">
      <div
        ref={stickyRef}
        className="sticky top-0 w-full overflow-hidden bg-black cursor-none"
        style={{ height: '100vh' }}
        onMouseMove={handleMouseMove}
      >
        {/* ── Background ──────────────────────────────── */}
        <div className="absolute inset-0 z-0">
          {ALL_IMAGES.map(({ src, pos }, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${activeImage === i ? 'opacity-100' : 'opacity-0'}`}>
              <img src={src} alt="" className="w-full h-full object-cover"
                style={{ objectPosition: pos, filter: 'brightness(0.30) saturate(0.85)' }} />
            </div>
          ))}
        </div>

        {/* ── Lens ────────────────────────────────────── */}
        <motion.div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ maskImage: lensMask, WebkitMaskImage: lensWebkit }}>
          {ALL_IMAGES.map(({ src, pos }, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${activeImage === i ? 'opacity-100' : 'opacity-0'}`}>
              <img src={src} alt="" className="w-full h-full object-cover"
                style={{ objectPosition: pos, filter: 'brightness(0.82) contrast(1.06) saturate(1.1)' }} />
            </div>
          ))}
        </motion.div>

        {/* ── Vignette ────────────────────────────────── */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

        {/* ── Words — stacking top → bottom ───────────── */}
        <motion.div
          className="z-10 pointer-events-none absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 flex flex-col"
          style={{ opacity: dissolveOp, filter: dissolveFilter }}
        >
          {/* W1: Seamless — scroll-triggered */}
          <motion.span style={{ ...wordBase, opacity: w1Op, y: w1Y }}>
            Seamless
          </motion.span>

          {/* W2: Brand */}
          <motion.span style={{ ...wordBase, opacity: w2Op, y: w2Y }}>
            Brand
          </motion.span>

          {/* W3: Experience */}
          <motion.span style={{ ...wordBase, opacity: w3Op, y: w3Y }}>
            Experience
          </motion.span>

          {/* W4: TTL — letter by letter with wide tracking */}
          <div style={{ display: 'flex', marginTop: '-0.04em' }}>
            {(['T', 'T', 'L'] as const).map((char, i) => {
              const ops = [ttl0Op, ttl1Op, ttl2Op];
              const ys  = [ttl0Y,  ttl1Y,  ttl2Y];
              return (
                <motion.span
                  key={i}
                  style={{
                    ...wordBase,
                    fontSize: 'clamp(3.2rem, 10vw, 9rem)',
                    letterSpacing: '0.35em',
                    opacity: ops[i],
                    y: ys[i],
                  }}
                >
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

        {/* ── Sweep line — passes through as section exits ── */}
        <motion.div
          className="absolute inset-x-0 h-[1.5px] bg-white pointer-events-none z-20"
          style={{ top: '50%', x: lineX, opacity: lineOp }}
        />

        {/* ── Bottom blend ────────────────────────────── */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};

export default Hero;
