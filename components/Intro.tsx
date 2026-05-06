import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, animate } from 'framer-motion';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  
  // Motion value for the Aperture Mask (The hole size)
  // 0% = Fully visible (Black mask covers nothing, or rather gradient starts at 0 so it's all black/visible part)
  // We want: radial-gradient(circle, transparent {maskRadius}%, black {maskRadius}%)
  // If maskRadius is 0: transparent 0%, black 0% -> All Black (Visible)
  // If maskRadius is 100: transparent 100%, black 100% -> All Transparent (Hidden)
  const maskRadius = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(circle at center, transparent ${maskRadius}%, black ${maskRadius}%)`;

  useEffect(() => {
    let isCancelled = false;

    const sequence = async () => {
      // 1. Dot Appearance
      await new Promise(r => setTimeout(r, 100));
      if (isCancelled) return;
      setStage(1);

      // 2. Text Reveal
      await new Promise(r => setTimeout(r, 300));
      if (isCancelled) return;
      setStage(2);

      // 3. Yellow Circle Expansion (Inversion)
      await new Promise(r => setTimeout(r, 400));
      if (isCancelled) return;
      setStage(3);

      // 4. Aperture Reveal (Hole opens up)
      await new Promise(r => setTimeout(r, 300));
      if (isCancelled) return;
      setStage(4);
      
      // Animate the mask radius from 0 to 150%
      animate(maskRadius, 150, {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.000], // Cubic Bezier for dramatic opening
        onComplete: () => {
           if (!isCancelled) onComplete();
        }
      });
    };

    sequence();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] pointer-events-none flex flex-col font-manrope"
      style={{
        maskImage: maskImage,
        WebkitMaskImage: maskImage,
      }}
    >
      <div className="relative w-full h-full bg-black">
        
        {/* === LAYER 1: BASE (Black BG, White Text) === */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          
          {/* A. The Dot */}
          <AnimatePresence>
            {stage === 1 && (
              <motion.div
                className="absolute bg-white rounded-full z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 3, opacity: 0 }} // Explodes slightly when text appears
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
                style={{ width: 16, height: 16 }}
              />
            )}
          </AnimatePresence>

          {/* B. The Text (White) */}
          <motion.div
            className="z-10 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={stage >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-[13vw] font-extrabold tracking-tighter leading-none text-white select-none">
              C
            </h1>
          </motion.div>
        </div>

        {/* === LAYER 2: SHAPE MOTION (Yellow Circle Inversion) === */}
        <motion.div
          className="absolute inset-0 bg-[#FFB800] flex items-center justify-center overflow-hidden z-20"
          initial={{ clipPath: "circle(0% at 50% 50%)" }} 
          animate={stage >= 3 ? { clipPath: "circle(150% at 50% 50%)" } : { clipPath: "circle(0% at 50% 50%)" }}
          transition={{ 
            duration: 0.7, 
            ease: [0.76, 0, 0.24, 1] // Quartic ease for snappy shape motion
          }}
        >
          {/* C. The Text (Black) - Inverted */}
          <div className="relative overflow-hidden">
            <h1 className="text-[13vw] font-extrabold tracking-tighter leading-none text-black select-none">
              C
            </h1>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Intro;