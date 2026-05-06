import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

// Mixed shots from nadaun.framer.website — models, Hyundai, Coway, B-Ready etc.
const PHOTOS = [
  'https://framerusercontent.com/images/8iDqSjerVvrJdO3XmbmCqnQ3eHI.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/baj0VsRrAiBlnAcClysX8JOmXk.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/FxxtlPcNMxXKMiSQ5KYvnDITQ.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/WalxNKWEtizgPdzgDgJqwzg5u4Y.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/1z68aA8IVtTXqPCcZzZnjoqyrbY.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/QllGUMDkWAUR6xJgI8Qg44fwoZ4.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/deQ27myQIMb4tVVDQPCxwUw7Iw.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/spwqlYBLDlE9xpoHQcO45j3kQhA.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/fZngR5hO32M7PGE7XcFWZaNV1g.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/6a4CWX9gdepzFplQj2ZpwcMVck.jpg?scale-down-to=1024',
];

// Stack depth config: depth 0 = front (current), 1 = mid, 2 = back
const STACK = [
  { scale: 1.00, y: 0,   opacity: 1.00, brightness: 1.00, z: 30 },
  { scale: 0.93, y: -18, opacity: 0.70, brightness: 0.75, z: 20 },
  { scale: 0.86, y: -34, opacity: 0.38, brightness: 0.55, z: 10 },
];

const SCROLL_PER_PHOTO = 55; // vh per photo

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

  // Render current + up to 2 behind as a visible stack
  const visiblePhotos = PHOTOS.slice(Math.max(0, current - 2), current + 1)
    .reverse() // back of stack first (lowest z-index)
    .map((src, idx, arr) => ({
      src,
      depth: arr.length - 1 - idx, // 0 = front
      photoIndex: current - idx,
    }));

  return (
    <div ref={containerRef} style={{ height: `${PHOTOS.length * SCROLL_PER_PHOTO}vh` }}>
      <div className="sticky top-0 w-full bg-black overflow-hidden" style={{ height: '100vh' }}>
        {/* Top / bottom fade — seamless blend with surrounding sections */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black to-transparent z-50 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black to-transparent z-50 pointer-events-none" />

        {/* Stack of photos */}
        <div className="absolute inset-0 flex items-center justify-center">
          {visiblePhotos.map(({ src, depth, photoIndex }) => {
            const cfg = STACK[depth] ?? STACK[STACK.length - 1];
            return (
              <motion.div
                key={photoIndex}
                className="absolute"
                style={{ zIndex: cfg.z, width: '72vw', maxWidth: 880, aspectRatio: '3/4' }}
                initial={depth === 0 ? { y: '62%', opacity: 0, scale: 1.06 } : false}
                animate={{
                  y: cfg.y,
                  scale: cfg.scale,
                  opacity: cfg.opacity,
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="w-full h-full overflow-hidden rounded-sm shadow-2xl">
                  <img
                    src={src}
                    alt=""
                    draggable={false}
                    className="w-full h-full object-cover select-none"
                    style={{
                      filter: `brightness(${cfg.brightness}) saturate(0.9)`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {PHOTOS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === current ? 24 : 5,
                backgroundColor: i === current ? '#FFB800' : 'rgba(255,255,255,0.2)',
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
