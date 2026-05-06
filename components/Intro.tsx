import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, animate } from 'framer-motion';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  const maskRadius = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(circle at center, transparent ${maskRadius}%, black ${maskRadius}%)`;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await new Promise(r => setTimeout(r, 100));
      if (cancelled) return;
      setStage(1);

      await new Promise(r => setTimeout(r, 300));
      if (cancelled) return;
      setStage(2);

      await new Promise(r => setTimeout(r, 400));
      if (cancelled) return;
      setStage(3);

      await new Promise(r => setTimeout(r, 300));
      if (cancelled) return;
      setStage(4);

      animate(maskRadius, 150, {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
        onComplete: () => { if (!cancelled) onComplete(); },
      });
    };

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none flex flex-col"
      style={{ maskImage, WebkitMaskImage: maskImage }}
    >
      <div className="relative w-full h-full bg-black">

        {/* ── Layer 1: Black BG, White symbol ── */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <AnimatePresence>
            {stage === 1 && (
              <motion.div
                className="absolute bg-white rounded-full z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
                style={{ width: 16, height: 16 }}
              />
            )}
          </AnimatePresence>

          <motion.div
            className="z-10 relative"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={stage >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <img
              src="/symbol-white.webp"
              alt=""
              aria-hidden="true"
              className="w-[42vw] max-w-[42vw] min-w-[200px] select-none"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* ── Layer 2: Yellow BG, Black symbol ── */}
        <motion.div
          className="absolute inset-0 bg-[#FFB800] flex items-center justify-center overflow-hidden z-20"
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={stage >= 3 ? { clipPath: 'circle(150% at 50% 50%)' } : { clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <img
            src="/symbol-black.webp"
            alt=""
            aria-hidden="true"
            className="w-[42vw] max-w-[42vw] min-w-[200px] select-none"
            draggable={false}
          />
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Intro;
