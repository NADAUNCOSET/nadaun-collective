import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';

type Phase = 'idle' | 'reveal';

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

const WORD_BASE: React.CSSProperties = {
  fontFamily: 'Manrope, sans-serif',
  fontWeight: 900,
  fontSize: 'clamp(4rem, 14vw, 11rem)',
  letterSpacing: '-0.03em',
  lineHeight: 0.9,
  color: '#ffffff',
  display: 'block',
  whiteSpace: 'nowrap',
};

interface HeroProps {
  startAnimation?: boolean;
}

const Hero: React.FC<HeroProps> = ({ startAnimation = true }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
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

  // ── Word scroll transforms ────────────────────────────────────
  // W1 "Seamless" — phase-reveal in, scroll out
  const w1Out  = useTransform(scrollYProgress, [0.11, 0.21], [1, 0]);
  const w1OutY = useTransform(scrollYProgress, [0.11, 0.21], ['0%', '-5%']);

  // W2 "Brand"
  const w2In  = useTransform(scrollYProgress, [0.17, 0.27], [0, 1]);
  const w2InY = useTransform(scrollYProgress, [0.17, 0.27], ['7%', '0%']);
  const w2Out  = useTransform(scrollYProgress, [0.34, 0.44], [1, 0]);
  const w2OutY = useTransform(scrollYProgress, [0.34, 0.44], ['0%', '-5%']);

  // W3 "Experience"
  const w3In  = useTransform(scrollYProgress, [0.40, 0.50], [0, 1]);
  const w3InY = useTransform(scrollYProgress, [0.40, 0.50], ['7%', '0%']);
  const w3Out  = useTransform(scrollYProgress, [0.57, 0.67], [1, 0]);
  const w3OutY = useTransform(scrollYProgress, [0.57, 0.67], ['0%', '-5%']);

  // W4 "through" — thin weight
  const w4In  = useTransform(scrollYProgress, [0.62, 0.70], [0, 1]);
  const w4InY = useTransform(scrollYProgress, [0.62, 0.70], ['7%', '0%']);
  const w4Out  = useTransform(scrollYProgress, [0.75, 0.83], [1, 0]);
  const w4OutY = useTransform(scrollYProgress, [0.75, 0.83], ['0%', '-5%']);

  // W5 "TTL" — stays
  const w5In  = useTransform(scrollYProgress, [0.77, 0.88], [0, 1]);
  const w5InY = useTransform(scrollYProgress, [0.77, 0.88], ['7%', '0%']);

  // tagline
  const taglineOp = useTransform(scrollYProgress, [0.55, 0.72], [1, 0]);

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

  useEffect(() => {
    if (!startAnimation) return;
    const t = setTimeout(() => setPhase('reveal'), 800);
    return () => clearTimeout(t);
  }, [startAnimation]);

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
                style={{ objectPosition: pos, filter: 'brightness(0.32) saturate(0.85)' }} />
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
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* ── Words ───────────────────────────────────── */}
        <div className="z-10 pointer-events-none absolute inset-0">

          {/* All words stack at bottom-left */}
          <div className="absolute bottom-16 md:bottom-20 left-8 md:left-16 lg:left-24">

            {/* W1: Seamless — phase entry, scroll exit */}
            <motion.div className="absolute bottom-0 left-0" style={{ opacity: w1Out, y: w1OutY }}>
              <motion.span
                style={WORD_BASE}
                initial={{ opacity: 0, y: '7%' }}
                animate={phase === 'reveal' ? { opacity: 1, y: '0%' } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                Seamless
              </motion.span>
            </motion.div>

            {/* W2: Brand */}
            <motion.div className="absolute bottom-0 left-0" style={{ opacity: w2Out, y: w2OutY }}>
              <motion.span style={{ ...WORD_BASE, opacity: w2In, y: w2InY }}>
                Brand
              </motion.span>
            </motion.div>

            {/* W3: Experience */}
            <motion.div className="absolute bottom-0 left-0" style={{ opacity: w3Out, y: w3OutY }}>
              <motion.span style={{ ...WORD_BASE, opacity: w3In, y: w3InY }}>
                Experience
              </motion.span>
            </motion.div>

            {/* W4: through — thin */}
            <motion.div className="absolute bottom-0 left-0" style={{ opacity: w4Out, y: w4OutY }}>
              <motion.span style={{
                ...WORD_BASE,
                fontWeight: 200,
                fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                color: 'rgba(255,255,255,0.55)',
                opacity: w4In,
                y: w4InY,
              }}>
                through
              </motion.span>
            </motion.div>

            {/* W5: TTL — big, stays */}
            <motion.span style={{
              ...WORD_BASE,
              fontSize: 'clamp(4.5rem, 16vw, 13rem)',
              opacity: w5In,
              y: w5InY,
            }}>
              TTL
            </motion.span>
          </div>

          {/* Tagline */}
          <motion.p
            className="absolute bottom-6 left-8 md:left-16 lg:left-24 text-[11px] text-white/35 tracking-[0.4em] uppercase font-light"
            initial={{ opacity: 0 }}
            animate={phase === 'reveal' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{ opacity: taglineOp }}
          >
            EST. 2020 — SEOUL, KOREA
          </motion.p>
        </div>

        {/* ── Bottom blend ────────────────────────────── */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};

export default Hero;
