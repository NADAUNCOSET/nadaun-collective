import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';

type Phase = 'c-only' | 'reveal';

// Portfolio & campaign shots + people folder portraits
const ALL_IMAGES = [
  { src: '/hero/pepsi-festa.webp',          pos: 'center 35%' },
  { src: '/hero/hd-hyundai.webp',           pos: 'center 40%' },
  { src: '/people/estevan-00.webp',         pos: 'center 20%' },
  { src: '/hero/royal-salute.webp',         pos: 'center 30%' },
  { src: '/people/thenewgrey-00.webp',      pos: 'center 25%' },
  { src: '/hero/banyan-tree.webp',          pos: 'center 30%' },
  { src: '/people/dong-wook-00.webp',       pos: 'center 20%' },
  { src: '/hero/varilux-seoul.webp',        pos: 'center 40%' },
  { src: '/people/laon-band-00.webp',       pos: 'center 25%' },
  { src: 'https://framerusercontent.com/images/QllGUMDkWAUR6xJgI8Qg44fwoZ4.jpg?scale-down-to=2048', pos: 'center 18%' },
];

const SECTION_H = 320; // vh — outer scroll height

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.05 } },
};
const letterVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 6 },
  visible: {
    opacity: 1, filter: 'blur(0px)', y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// COLLECTIVE letter: scroll-exit (dissolves out letter by letter)
const LetterSpan: React.FC<{
  char: string;
  index: number;
  dissolve: MotionValue<number>;
  phase: Phase;
}> = ({ char, index, dissolve, phase }) => {
  const exitOpacity = useTransform(dissolve, [index, index + 0.8], [1, 0]);
  const exitY       = useTransform(dissolve, [index, index + 0.8], [0, -18]);
  const exitBlur    = useTransform(dissolve, [index, index + 0.8], [0, 8]);
  const filter      = useMotionTemplate`blur(${exitBlur}px)`;
  return (
    <motion.span
      variants={letterVariants}
      initial="hidden"
      animate={phase === 'reveal' ? 'visible' : 'hidden'}
      style={{
        display: 'inline-block',
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 600,
        fontSize: 'clamp(4rem, 13.5vw, 12rem)',
        letterSpacing: '-0.01em',
        lineHeight: 0.92,
        color: '#ffffff',
        opacity: exitOpacity,
        y: exitY,
        filter,
      }}
    >
      {char}
    </motion.span>
  );
};


interface HeroProps {
  startAnimation?: boolean;
}

const Hero: React.FC<HeroProps> = ({ startAnimation = true }) => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [phase, setPhase] = useState<Phase>('c-only');
  const lastMousePos = useRef({ x: 0, y: 0 });
  const scrollLocked = useRef(false); // true once user has scrolled past hero

  const rawX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const rawY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);
  const mouseX = useSpring(rawX, { stiffness: 100, damping: 20, restDelta: 0.5 });
  const mouseY = useSpring(rawY, { stiffness: 100, damping: 20, restDelta: 0.5 });

  const lensMask    = useMotionTemplate`radial-gradient(circle 680px at ${mouseX}px ${mouseY}px, black 30%, transparent 100%)`;
  const lensWebkit  = useMotionTemplate`radial-gradient(circle 680px at ${mouseX}px ${mouseY}px, black 30%, transparent 100%)`;

  // Scroll drives background cycling
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollLocked.current = v > 0.01;
    const idx = Math.min(Math.floor(v * ALL_IMAGES.length), ALL_IMAGES.length - 1);
    setActiveImage(idx);
  });

  // COLLECTIVE dissolve on exit (scroll 0.60→0.92, C exits first)
  const dissolveProgress = useTransform(scrollYProgress, [0.60, 0.92], [0, 10]);

  // tagline fades out earlier
  const taglineOpacity = useTransform(scrollYProgress, [0.55, 0.72], [1, 0]);

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
    // Mouse still changes image when not scrolled
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

  const collectiveLetters = 'COLLECTIVE'.split('');

  return (
    // Outer tall div — provides scroll distance
    <div ref={sectionRef} style={{ height: `${SECTION_H}vh` }} className="relative">

      {/* Sticky viewport — stays fixed while scrolling through outer */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full overflow-hidden bg-black cursor-none"
        style={{ height: '100vh' }}
        onMouseMove={handleMouseMove}
      >
        {/* ── Background images ─────────────────────────── */}
        <div className="absolute inset-0 z-0">
          {ALL_IMAGES.map(({ src, pos }, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${activeImage === i ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                style={{ objectPosition: pos, filter: 'brightness(0.32) saturate(0.85)' }}
              />
            </div>
          ))}
        </div>

        {/* ── Lens ──────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ maskImage: lensMask, WebkitMaskImage: lensWebkit }}
        >
          {ALL_IMAGES.map(({ src, pos }, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${activeImage === i ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                style={{ objectPosition: pos, filter: 'brightness(0.82) contrast(1.06) saturate(1.1)' }}
              />
            </div>
          ))}
        </motion.div>

        {/* ── Vignette ──────────────────────────────────── */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* ── Text ──────────────────────────────────────── */}
        <div className="z-10 pointer-events-none w-full px-8 md:px-16 lg:px-24 flex flex-col absolute inset-0 justify-end pb-16 md:pb-20">
          <div className="overflow-visible leading-none">
            <motion.div
              className="inline-flex items-baseline"
              variants={containerVariants}
              initial="hidden"
              animate={phase === 'reveal' ? 'visible' : 'hidden'}
            >
              {collectiveLetters.map((char, i) => (
                <LetterSpan
                  key={i}
                  char={char}
                  index={i}
                  dissolve={dissolveProgress}
                  phase={phase}
                />
              ))}
            </motion.div>
          </div>

          <motion.p
            className="mt-8 text-[11px] text-white/35 tracking-[0.4em] uppercase font-light"
            initial={{ opacity: 0 }}
            animate={phase === 'reveal' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ opacity: taglineOpacity }}
          >
            EST. 2020 — SEOUL, KOREA
          </motion.p>
        </div>

        {/* ── Bottom blend to next section ──────────────── */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};

export default Hero;
