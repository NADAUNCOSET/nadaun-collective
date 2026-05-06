import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHOTOS = [
  { src: 'https://framerusercontent.com/images/8iDqSjerVvrJdO3XmbmCqnQ3eHI.jpg?scale-down-to=2048',  pos: 'center 18%' },
  { src: 'https://framerusercontent.com/images/baj0VsRrAiBlnAcClysX8JOmXk.jpg?scale-down-to=2048',  pos: 'center 15%' },
  { src: 'https://framerusercontent.com/images/FxxtlPcNMxXKMiSQ5KYvnDITQ.jpg?scale-down-to=2048',  pos: 'center 12%' },
  { src: 'https://framerusercontent.com/images/WalxNKWEtizgPdzgDgJqwzg5u4Y.jpg?scale-down-to=2048', pos: 'center 20%' },
  { src: 'https://framerusercontent.com/images/1z68aA8IVtTXqPCcZzZnjoqyrbY.jpg?scale-down-to=2048', pos: 'center 10%' },
  { src: 'https://framerusercontent.com/images/QllGUMDkWAUR6xJgI8Qg44fwoZ4.jpg?scale-down-to=2048', pos: 'center 18%' },
  { src: 'https://framerusercontent.com/images/deQ27myQIMb4tVVDQPCxwUw7Iw.jpg?scale-down-to=2048',  pos: 'center 14%' },
  { src: 'https://framerusercontent.com/images/spwqlYBLDlE9xpoHQcO45j3kQhA.jpg?scale-down-to=2048', pos: 'center 22%' },
];

const INTERVAL = 4200;

const PeopleReel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent(p => (p + 1) % PHOTOS.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full bg-black overflow-hidden" style={{ height: '100vh' }}>

      {/* Photo stack — crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <img
            src={PHOTOS[current].src}
            alt=""
            draggable={false}
            className="w-full h-full object-cover select-none pointer-events-none"
            style={{ objectPosition: PHOTOS[current].pos }}
          />
          {/* Cinematic overlays */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: [
                'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 25%)',
                'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 30%)',
                'radial-gradient(ellipse 130% 110% at 50% 50%, transparent 40%, rgba(0,0,0,0.38) 100%)',
              ].join(', '),
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Top blend with Hero */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      {/* Bottom blend with next section */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

      {/* Counter */}
      <div
        className="absolute bottom-8 right-8 font-mono text-white/25 z-20 pointer-events-none"
        style={{ fontSize: 11, letterSpacing: '0.15em' }}
      >
        {String(current + 1).padStart(2, '0')} / {String(PHOTOS.length).padStart(2, '0')}
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-none">
        {PHOTOS.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-700"
            style={{
              width: i === current ? 20 : 4,
              height: 4,
              backgroundColor: i === current ? '#FFB800' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PeopleReel;
