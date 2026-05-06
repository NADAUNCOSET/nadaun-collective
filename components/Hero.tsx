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

// Letter-by-letter dissolve variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};
const letterVariants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 4 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

interface HeroProps {
  startAnimation?: boolean;
}

const Hero: React.FC<HeroProps> = ({ startAnimation = true }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [phase, setPhase] = useState<Phase>('c-only');
  const [xOffset, setXOffset] = useState(0);

  const h1Ref = useRef<HTMLHeadingElement>(null);
  const ollectiveRef = useRef<HTMLSpanElement>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Raw mouse position
  const rawX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const rawY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);

  // Smoothed mouse for lens (spring gives a satisfying lag)
  const mouseX = useSpring(rawX, { stiffness: 120, damping: 22, restDelta: 0.5 });
  const mouseY = useSpring(rawY, { stiffness: 120, damping: 22, restDelta: 0.5 });

  const lensMask = useMotionTemplate`radial-gradient(circle 720px at ${mouseX}px ${mouseY}px, black 35%, transparent 100%)`;
  const lensWebkit = useMotionTemplate`radial-gradient(circle 720px at ${mouseX}px ${mouseY}px, black 35%, transparent 100%)`;

  useEffect(() => {
    HERO_IMAGES.forEach((src) => { const img = new Image(); img.src = src; });
  }, []);

  const measure = useCallback(() => {
    if (!h1Ref.current || !ollectiveRef.current) return;
    const h1Rect = h1Ref.current.getBoundingClientRect();
    const ollWidth = ollectiveRef.current.getBoundingClientRect().width;
    const cWidth = h1Rect.width - ollWidth;
    const cCenterX = h1Rect.left + cWidth / 2;
    setXOffset(window.innerWidth / 2 - cCenterX);
    const pad = Math.max(16, h1Rect.left);
    document.documentElement.style.setProperty('--header-pad', `${pad}px`);
  }, []);

  useEffect(() => {
    document.fonts.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  useEffect(() => {
    if (!startAnimation) return;
    const t = setTimeout(() => setPhase('reveal'), 750);
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

  const letters = 'OLLECTIVE'.split('');

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black cursor-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* ── Base: always visible dark background ─────────────────────── */}
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
              style={{ filter: 'brightness(0.35) saturate(0.9)' }}
            />
          </div>
        ))}
      </div>

      {/* ── Lens: brighter circle following cursor ───────────────────── */}
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
              style={{ filter: 'brightness(0.85) contrast(1.06) saturate(1.08)' }}
            />
          </div>
        ))}
      </motion.div>

      {/* ── Vignette ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="z-10 relative text-center pointer-events-none w-full flex flex-col items-center">

        {/* C + OLLECTIVE letter-dissolve */}
        <motion.h1
          ref={h1Ref}
          className="text-[13vw] font-extrabold tracking-tighter leading-none text-white select-none inline-flex items-baseline"
          animate={{ x: phase === 'c-only' ? xOffset : 0 }}
          transition={
            phase === 'c-only'
              ? { duration: 0 }
              : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
          }
        >
          {/* C — always visible */}
          C

          {/* OLLECTIVE — letter-by-letter dissolve */}
          <motion.span
            ref={ollectiveRef}
            className="inline-flex"
            variants={containerVariants}
            initial="hidden"
            animate={phase === 'reveal' ? 'visible' : 'hidden'}
          >
            {letters.map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={startAnimation && phase === 'reveal' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <p className="text-xs md:text-sm text-white/40 font-medium tracking-[0.35em] uppercase flex items-center gap-4 justify-center">
            <span className="w-10 h-[1px] bg-white/25" />
            Explore the unseen
            <span className="w-10 h-[1px] bg-white/25" />
          </p>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={startAnimation && phase === 'reveal' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer pointer-events-auto"
        onClick={scrollToNext}
      >
        <div className="w-[1px] h-[56px] bg-white/15 relative overflow-hidden">
          <motion.div
            animate={{ y: [-56, 56] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-[35%] bg-[#FFB800]"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
