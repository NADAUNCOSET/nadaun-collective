import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';

type Phase = 'c-only' | 'reveal';

const HERO_IMAGES = [
  '/hero/pepsi-festa.webp',
  '/hero/hd-hyundai.webp',
  '/hero/royal-salute.webp',
  '/hero/banyan-tree.webp',
  '/hero/varilux-seoul.webp',
];

// Letter-by-letter dissolve for COLLECTIVE
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.05 } },
};
const letterVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 6 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

interface HeroProps {
  startAnimation?: boolean;
}

const Hero: React.FC<HeroProps> = ({ startAnimation = true }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [phase, setPhase] = useState<Phase>('c-only');
  const lastMousePos = useRef({ x: 0, y: 0 });

  const rawX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const rawY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);
  const mouseX = useSpring(rawX, { stiffness: 100, damping: 20, restDelta: 0.5 });
  const mouseY = useSpring(rawY, { stiffness: 100, damping: 20, restDelta: 0.5 });

  const lensMask = useMotionTemplate`radial-gradient(circle 680px at ${mouseX}px ${mouseY}px, black 30%, transparent 100%)`;
  const lensWebkit = useMotionTemplate`radial-gradient(circle 680px at ${mouseX}px ${mouseY}px, black 30%, transparent 100%)`;

  useEffect(() => {
    HERO_IMAGES.forEach((src) => { const img = new Image(); img.src = src; });
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
    const d = Math.sqrt(
      (clientX - lastMousePos.current.x) ** 2 + (clientY - lastMousePos.current.y) ** 2
    );
    if (d > 160) {
      setActiveImage(p => (p + 1) % HERO_IMAGES.length);
      lastMousePos.current = { x: clientX, y: clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    rawX.set(clientX);
    rawY.set(clientY);
  };

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  const collectiveLetters = 'COLLECTIVE'.split('');

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black cursor-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* ── Base background (always visible, dimmed) ─────────────────── */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${activeImage === i ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.32) saturate(0.85)' }}
            />
          </div>
        ))}
      </div>

      {/* ── Lens (brighter circle around cursor) ─────────────────────── */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ maskImage: lensMask, WebkitMaskImage: lensWebkit }}
      >
        {HERO_IMAGES.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${activeImage === i ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.82) contrast(1.06) saturate(1.1)' }}
            />
          </div>
        ))}
      </motion.div>

      {/* ── Vignette ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

      {/* ── Text composition ─────────────────────────────────────────── */}
      <div className="z-10 relative pointer-events-none w-full px-8 md:px-16 lg:px-24 flex flex-col">

        {/* NADAUN — thin, wide tracking (like "About" in ref) */}
        <motion.p
          className="font-extralight text-white/70 uppercase leading-none"
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 200,
            fontSize: 'clamp(1rem, 2.4vw, 2.2rem)',
            letterSpacing: '0.52em',
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={phase === 'reveal' ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.0 }}
        >
          NADAUN
        </motion.p>

        {/* COLLECTIVE — ultra bold Barlow, letter dissolve */}
        <div className="overflow-visible leading-none mt-1">
          <motion.div
            className="inline-flex items-baseline"
            variants={containerVariants}
            initial="hidden"
            animate={phase === 'reveal' ? 'visible' : 'hidden'}
          >
            {collectiveLetters.map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                style={{
                  display: 'inline-block',
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(4.5rem, 14.5vw, 13rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  color: '#ffffff',
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          className="mt-8 text-[11px] text-white/35 tracking-[0.4em] uppercase font-light"
          initial={{ opacity: 0 }}
          animate={phase === 'reveal' ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          EST. 2020 — SEOUL, KOREA
        </motion.p>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={phase === 'reveal' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-10 right-12 md:right-20 z-20 flex flex-col items-center cursor-pointer pointer-events-auto gap-3"
        onClick={scrollToNext}
      >
        <span className="text-[9px] text-white/30 tracking-[0.35em] uppercase font-light rotate-90 origin-center mb-2">Scroll</span>
        <div className="w-[1px] h-[48px] bg-white/15 relative overflow-hidden">
          <motion.div
            animate={{ y: [-48, 48] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-[35%] bg-[#FFB800]"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
