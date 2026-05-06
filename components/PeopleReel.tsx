import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

// Portrait photos from nadaun.framer.website
const PHOTOS = [
  'https://framerusercontent.com/images/8iDqSjerVvrJdO3XmbmCqnQ3eHI.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/1z68aA8IVtTXqPCcZzZnjoqyrbY.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/fZngR5hO32M7PGE7XcFWZaNV1g.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/deQ27myQIMb4tVVDQPCxwUw7Iw.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/baj0VsRrAiBlnAcClysX8JOmXk.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/FxxtlPcNMxXKMiSQ5KYvnDITQ.jpg?scale-down-to=1024',
  'https://framerusercontent.com/images/6a4CWX9gdepzFplQj2ZpwcMVck.jpg?scale-down-to=1024',
];

const SCROLL_PER_PHOTO = 60; // vh per photo transition

const PeopleReel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll 0→1 to photo index 0→N-1
  const rawIndex = useTransform(scrollYProgress, [0, 0.999], [0, PHOTOS.length - 0.001]);

  useMotionValueEvent(rawIndex, 'change', (v) => {
    const next = Math.floor(v);
    if (next !== current) setCurrent(next);
  });

  return (
    <div ref={containerRef} style={{ height: `${PHOTOS.length * SCROLL_PER_PHOTO}vh` }}>
      <div
        className="sticky top-0 w-full overflow-hidden bg-black"
        style={{ height: '100vh' }}
      >
        {/* Top / bottom black fades — seamless blend with Hero above and VideoReel below */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

        {/* Photo stack — crossfade on scroll */}
        <AnimatePresence mode="sync">
          <motion.img
            key={current}
            src={PHOTOS[current]}
            alt=""
            draggable={false}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover select-none"
            style={{ filter: 'brightness(0.68) saturate(0.88)' }}
          />
        </AnimatePresence>

        {/* Dot progress indicator — bottom center */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
