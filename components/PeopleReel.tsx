import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PHOTOS = [
  '/people/dong-wook-00.webp',
  '/people/estevan-00.webp',
  '/people/thenewgrey-00.webp',
  '/people/dong-wook-01.webp',
  '/people/beethoven-00.webp',
  '/people/estevan-01.webp',
  '/people/thenewgrey-01.webp',
  '/people/laon-band-00.webp',
];

const PeopleReel: React.FC = () => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = useState(0);

  useEffect(() => {
    if (rowRef.current) setTrackW(rowRef.current.scrollWidth / 2);
  }, []);

  const doubled = [...PHOTOS, ...PHOTOS];

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: '38vh' }}>
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      {/* Left / right edge fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        ref={rowRef}
        className="flex items-center gap-3 h-full"
        animate={{ x: [0, -trackW] }}
        transition={{ duration: 60, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
        style={{ willChange: 'transform' }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="shrink-0 h-[80%] overflow-hidden rounded-sm"
            style={{ aspectRatio: '3/4' }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.65) saturate(0.9)' }}
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default PeopleReel;
