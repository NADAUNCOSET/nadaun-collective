import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const PHOTOS = [
  'https://framerusercontent.com/images/8iDqSjerVvrJdO3XmbmCqnQ3eHI.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/baj0VsRrAiBlnAcClysX8JOmXk.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/FxxtlPcNMxXKMiSQ5KYvnDITQ.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/WalxNKWEtizgPdzgDgJqwzg5u4Y.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/1z68aA8IVtTXqPCcZzZnjoqyrbY.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/QllGUMDkWAUR6xJgI8Qg44fwoZ4.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/deQ27myQIMb4tVVDQPCxwUw7Iw.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/spwqlYBLDlE9xpoHQcO45j3kQhA.jpg?scale-down-to=2048',
];

const SCROLL_PER_PHOTO = 70;

const PeopleReel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rawIndex = useTransform(scrollYProgress, [0, 0.999], [0, PHOTOS.length - 0.001]);

  useMotionValueEvent(rawIndex, 'change', (v) => {
    const next = Math.max(0, Math.min(Math.floor(v), PHOTOS.length - 1));
    if (next !== current) setCurrent(next);
  });

  return (
    <div ref={containerRef} style={{ height: `${PHOTOS.length * SCROLL_PER_PHOTO}vh` }}>
      <div className="sticky top-0 w-full bg-black" style={{ height: '100vh' }}>

        {/* All photos stacked — each full-screen, slides up into place */}
        {PHOTOS.map((src, i) => {
          const depth = current - i; // 0 = front, 1 = one behind, negative = not yet shown
          const isVisible = depth >= 0 && depth <= 2;

          if (!isVisible && i > current) return null; // not yet reached

          return (
            <motion.div
              key={i}
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: i }}
              initial={i === 0 ? false : { y: '100%' }}
              animate={
                i <= current
                  ? {
                      y: 0,
                      scale: depth === 0 ? 1 : depth === 1 ? 0.96 : 0.92,
                    }
                  : { y: '100%' }
              }
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                className="w-full h-full object-cover select-none"
                style={{
                  filter: `brightness(${depth === 0 ? 0.78 : 0.5}) saturate(0.88)`,
                }}
              />
              {/* Top gradient — new photo blends smoothly over the one beneath */}
              <div
                className="absolute inset-x-0 top-0 h-48 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)' }}
              />
            </motion.div>
          );
        })}

        {/* Top / bottom black gradient — blends with Hero above, VideoReel below */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent z-[999] pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent z-[999] pointer-events-none" />

        {/* Progress dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-[999]">
          {PHOTOS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === current ? 24 : 5,
                backgroundColor: i === current ? '#FFB800' : 'rgba(255,255,255,0.25)',
              }}
              transition={{ duration: 0.35 }}
              className="h-[3px] rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeopleReel;
