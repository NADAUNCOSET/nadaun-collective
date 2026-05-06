import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

type Phase = 'c-only' | 'reveal';

const HERO_IMAGES = [
  "https://nadaun-portfolio.vercel.app/images/portfolio/hd-hyundai/00.webp",
  "https://nadaun-portfolio.vercel.app/images/portfolio/pepsi-festa/00.webp",
  "https://nadaun-portfolio.vercel.app/images/portfolio/royal-salute/00.webp",
  "https://nadaun-portfolio.vercel.app/images/portfolio/banyan-tree/00.webp",
  "https://nadaun-portfolio.vercel.app/images/portfolio/varilux-seoul/00.webp",
];

interface HeroProps {
  startAnimation?: boolean;
}

const Hero: React.FC<HeroProps> = ({ startAnimation = true }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [phase, setPhase] = useState<Phase>('c-only');
  const [xOffset, setXOffset] = useState(0);

  const h1Ref = useRef<HTMLHeadingElement>(null);
  const ollectiveRef = useRef<HTMLSpanElement>(null);

  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const maskImage = useMotionTemplate`radial-gradient(circle 500px at ${mouseX}px ${mouseY}px, black 50%, transparent 100%)`;
  const webkitMaskImage = useMotionTemplate`radial-gradient(circle 500px at ${mouseX}px ${mouseY}px, black 50%, transparent 100%)`;

  useEffect(() => {
    HERO_IMAGES.forEach((src) => { new Image().src = src; });
  }, []);

  // Measure C's actual viewport position vs viewport center
  // Also sets --header-pad CSS var so Header aligns to COLLECTIVE edges
  const measure = useCallback(() => {
    if (!h1Ref.current || !ollectiveRef.current) return;
    const h1Rect = h1Ref.current.getBoundingClientRect();
    const ollWidth = ollectiveRef.current.getBoundingClientRect().width;
    const cWidth = h1Rect.width - ollWidth;

    // Offset needed to place C at exact viewport center
    const cCenterX = h1Rect.left + cWidth / 2;
    setXOffset(window.innerWidth / 2 - cCenterX);

    // Share COLLECTIVE left-edge position with Header via CSS variable
    const pad = Math.max(16, h1Rect.left);
    document.documentElement.style.setProperty('--header-pad', `${pad}px`);
  }, []);

  useEffect(() => {
    document.fonts.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // C → COLLECTIVE reveal sequence
  useEffect(() => {
    if (!startAnimation) return;
    const t = setTimeout(() => setPhase('reveal'), 750);
    return () => clearTimeout(t);
  }, [startAnimation]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
    const d = Math.sqrt(
      (clientX - lastMousePos.current.x) ** 2 + (clientY - lastMousePos.current.y) ** 2
    );
    if (d > 200) {
      setActiveImage(p => (p + 1) % HERO_IMAGES.length);
      lastMousePos.current = { x: clientX, y: clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const scrollToNext = () => {
    document.getElementById('clients')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="snap-section relative h-screen w-full flex items-center justify-center overflow-hidden bg-black cursor-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0 bg-black"
        style={{ maskImage, WebkitMaskImage: webkitMaskImage }}
      >
        {HERO_IMAGES.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              activeImage === i ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={src}
              alt="Hero Background"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.7) contrast(1.1) grayscale(0.2)' }}
            />
          </div>
        ))}
      </motion.div>

      {/* Content */}
      <div className="z-20 relative text-center pointer-events-none mix-blend-difference w-full flex flex-col items-center">

        {/* C → COLLECTIVE animation
            overflow-hidden removed intentionally — section clips overflow instead.
            h1 shifts right so C sits at viewport center during c-only phase. */}
        <motion.h1
          ref={h1Ref}
          className="text-[13vw] font-extrabold tracking-tighter leading-none text-white select-none inline-flex items-baseline"
          animate={{ x: phase === 'c-only' ? xOffset : 0 }}
          transition={
            phase === 'c-only'
              ? { duration: 0 }
              : { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
          }
        >
          C
          <motion.span
            ref={ollectiveRef}
            animate={{
              opacity: phase === 'reveal' ? 1 : 0,
              x: phase === 'reveal' ? 0 : 28,
            }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            style={{ display: 'inline-block' }}
          >
            OLLECTIVE
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={startAnimation && phase === 'reveal' ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <p className="text-sm md:text-lg text-gray-300 font-medium tracking-widest uppercase flex items-center gap-4 justify-center">
            <span className="w-12 h-[1px] bg-gray-500"></span>
            Explore the unseen
            <span className="w-12 h-[1px] bg-gray-500"></span>
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={startAnimation && phase === 'reveal' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer pointer-events-auto group"
        onClick={scrollToNext}
      >
        <div className="w-[1px] h-[60px] bg-white/20 relative overflow-hidden group-hover:h-[80px] transition-all duration-300">
          <motion.div
            animate={{ y: [-60, 60] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-[30%] bg-[#FFB800]"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
