import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

type Phase = 'c-only' | 'reveal';

// High-quality creative studio and advertising agency images
const HERO_IMAGES = [
  // 1. Creative Team / Strategy Meeting
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop", 
  // 2. Commercial / Video Production Set
  "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop",
  // 3. Design / Branding works
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
  // 4. Performance Marketing / Data Analysis
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  // 5. Fashion / Campaign Photo Shoot
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop"
];

interface HeroProps {
  startAnimation?: boolean;
}

const Hero: React.FC<HeroProps> = ({ startAnimation = true }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [phase, setPhase] = useState<Phase>('c-only');
  const [xOffset, setXOffset] = useState(0);
  const ollectiveRef = useRef<HTMLSpanElement>(null);

  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);

  const lastMousePos = useRef({ x: 0, y: 0 });

  const maskImage = useMotionTemplate`radial-gradient(circle 500px at ${mouseX}px ${mouseY}px, black 50%, transparent 100%)`;
  const webkitMaskImage = useMotionTemplate`radial-gradient(circle 500px at ${mouseX}px ${mouseY}px, black 50%, transparent 100%)`;

  useEffect(() => {
    HERO_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Measure OLLECTIVE span width — used to offset C to screen center
  useEffect(() => {
    if (ollectiveRef.current) {
      setXOffset(ollectiveRef.current.offsetWidth / 2);
    }
  }, []);

  // C → COLLECTIVE reveal sequence, triggered once intro finishes
  useEffect(() => {
    if (!startAnimation) return;
    const t = setTimeout(() => setPhase('reveal'), 750);
    return () => clearTimeout(t);
  }, [startAnimation]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);

    const diffX = Math.abs(clientX - lastMousePos.current.x);
    const diffY = Math.abs(clientY - lastMousePos.current.y);
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);

    if (distance > 200) {
      setActiveImage((prev) => (prev + 1) % HERO_IMAGES.length);
      lastMousePos.current = { x: clientX, y: clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    mouseX.set(touch.clientX);
    mouseY.set(touch.clientY);
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('clients');
    if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black cursor-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Background Layer - Instant Reveal behind the mask */}
      <motion.div 
        className="absolute inset-0 z-0 bg-black"
        style={{
          maskImage,
          WebkitMaskImage: webkitMaskImage,
        }}
        // No scale animation on entry to keep it stable during the mask dissolve
        initial={{ scale: 1 }} 
        animate={{ scale: 1 }}
      >
        {HERO_IMAGES.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              activeImage === index ? 'opacity-100' : 'opacity-0'
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

      {/* Main Content Layer */}
      <div className="container mx-auto px-6 z-20 relative text-center pointer-events-none mix-blend-difference">
        <div className="flex flex-col items-center justify-center h-full">

          {/* C → COLLECTIVE slide animation */}
          <div className="overflow-hidden">
            <motion.h1
              className="text-[13vw] font-extrabold tracking-tighter leading-none text-white select-none inline-flex items-baseline"
              // c-only: instantly offset so "C" sits at viewport center
              // reveal: slide back to natural centered position
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
          </div>

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