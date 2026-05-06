import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';

const PHOTOS = [
  'https://framerusercontent.com/images/8iDqSjerVvrJdO3XmbmCqnQ3eHI.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/baj0VsRrAiBlnAcClysX8JOmXk.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/FxxtlPcNMxXKMiSQ5KYvnDITQ.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/WalxNKWEtizgPdzgDgJqwzg5u4Y.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/1z68aA8IVtTXqPCcZzZnjoqyrbY.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/QllGUMDkWAUR6xJgI8Qg44fwoZ4.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/deQ27myQIMb4tVVDQPCxwUw7Iw.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/spwqlYBLDlE9xpoHQcO45j3kQhA.jpg?scale-down-to=2048',
  // Second pass — same shots, tighter crop via objectPosition shift
  'https://framerusercontent.com/images/8iDqSjerVvrJdO3XmbmCqnQ3eHI.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/FxxtlPcNMxXKMiSQ5KYvnDITQ.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/1z68aA8IVtTXqPCcZzZnjoqyrbY.jpg?scale-down-to=2048',
  'https://framerusercontent.com/images/QllGUMDkWAUR6xJgI8Qg44fwoZ4.jpg?scale-down-to=2048',
];

// Different object-positions for each slot to vary the crop
const POSITIONS = [
  'center 10%',
  'center 15%',
  'center 8%',
  'center 20%',
  'center 12%',
  'center 18%',
  'center 10%',
  'center 14%',
  'center 30%', // second pass — closer crop
  'center 25%',
  'center 35%',
  'center 20%',
];

const SCROLL_PER_PHOTO = 55; // vh — fast pace

// Separate component per photo so useTransform is at component scope (not in a loop)
const PhotoSlide: React.FC<{
  src: string;
  objectPos: string;
  idx: number;
  total: number;
  rawIndex: MotionValue<number>;
}> = ({ src, objectPos, idx, total, rawIndex }) => {
  // Opacity peaks at 1 when rawIndex === idx, crossfades ±0.9 on each side
  const opacity = useTransform(
    rawIndex,
    [idx - 0.9, idx - 0.1, idx + 0.1, idx + 0.9],
    [0,         1,          1,          0],
  );

  // Subtle scale: slightly zoomed out during transition, full at center
  const scale = useTransform(rawIndex, [idx - 1, idx, idx + 1], [1.04, 1, 1.04]);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{ opacity, zIndex: idx }}
    >
      <motion.img
        src={src}
        alt=""
        draggable={false}
        className="w-full h-full object-cover select-none"
        style={{ objectPosition: objectPos, scale }}
      />

      {/* Cinematic gradient — dark top + bottom + soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 28%)',
            'linear-gradient(to top,   rgba(0,0,0,0.65) 0%, transparent 35%)',
            'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.38) 100%)',
          ].join(', '),
        }}
      />
    </motion.div>
  );
};

const PeopleReel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // rawIndex: continuous float 0 → PHOTOS.length - 1
  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, PHOTOS.length - 1]);

  // Track current for progress dots only
  useMotionValueEvent(rawIndex, 'change', (v) => {
    const next = Math.max(0, Math.min(Math.round(v), PHOTOS.length - 1));
    if (next !== current) setCurrent(next);
  });

  return (
    <div ref={containerRef} style={{ height: `${PHOTOS.length * SCROLL_PER_PHOTO}vh` }}>
      <div className="sticky top-0 w-full bg-black overflow-hidden" style={{ height: '100vh' }}>

        {PHOTOS.map((src, i) => (
          <PhotoSlide
            key={i}
            src={src}
            objectPos={POSITIONS[i] ?? 'center 15%'}
            idx={i}
            total={PHOTOS.length}
            rawIndex={rawIndex}
          />
        ))}

        {/* Top / bottom section blend */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black to-transparent z-[999] pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black to-transparent z-[999] pointer-events-none" />

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 z-[999]">
          {PHOTOS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === current ? 20 : 4,
                backgroundColor: i === current ? '#FFB800' : 'rgba(255,255,255,0.2)',
              }}
              transition={{ duration: 0.3 }}
              className="h-[2px] rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeopleReel;
