import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// All from nadaun.framer.website — mixed portrait & commercial shots
const SLIDES = [
  { src: 'https://framerusercontent.com/images/8iDqSjerVvrJdO3XmbmCqnQ3eHI.jpg?scale-down-to=2048',  pos: 'center 12%' },
  { src: 'https://framerusercontent.com/images/baj0VsRrAiBlnAcClysX8JOmXk.jpg?scale-down-to=2048',  pos: 'center 8%'  },
  { src: 'https://framerusercontent.com/images/FxxtlPcNMxXKMiSQ5KYvnDITQ.jpg?scale-down-to=2048',  pos: 'center 10%' },
  { src: 'https://framerusercontent.com/images/WalxNKWEtizgPdzgDgJqwzg5u4Y.jpg?scale-down-to=2048', pos: 'center 18%' },
  { src: 'https://framerusercontent.com/images/1z68aA8IVtTXqPCcZzZnjoqyrbY.jpg?scale-down-to=2048', pos: 'center 5%'  },
  { src: 'https://framerusercontent.com/images/QllGUMDkWAUR6xJgI8Qg44fwoZ4.jpg?scale-down-to=2048', pos: 'center 15%' },
  { src: 'https://framerusercontent.com/images/deQ27myQIMb4tVVDQPCxwUw7Iw.jpg?scale-down-to=2048',  pos: 'center 8%'  },
  { src: 'https://framerusercontent.com/images/spwqlYBLDlE9xpoHQcO45j3kQhA.jpg?scale-down-to=2048', pos: 'center 20%' },
];

// Each section: tall outer (200vh) + sticky inner (100vh)
// → as next section enters, its sticky frame slides up from bottom and covers the previous one
const SECTION_HEIGHT = 200; // vh

const PhotoSection: React.FC<{
  src: string;
  objectPos: string;
  idx: number;
  total: number;
}> = ({ src, objectPos, idx, total }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Image is 118% tall → parallax pan: moves up by 18% over the scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);

  const isFirst = idx === 0;
  const isLast  = idx === total - 1;

  return (
    <div
      ref={ref}
      style={{
        height: `${SECTION_HEIGHT}vh`,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          zIndex: idx + 1, // higher index = covers previous
          backgroundColor: '#000',
        }}
      >
        {/* Parallax image — taller than viewport so it pans */}
        <motion.img
          src={src}
          alt=""
          draggable={false}
          className="select-none pointer-events-none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '118%',
            objectFit: 'cover',
            objectPosition: objectPos,
            y: imageY,
          }}
        />

        {/* Cinematic gradient overlay — vignette + top/bottom fades */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: [
              'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.0) 28%)',
              'linear-gradient(to top,   rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.0) 32%)',
              'radial-gradient(ellipse 130% 110% at 50% 50%, transparent 38%, rgba(0,0,0,0.42) 100%)',
            ].join(', '),
            pointerEvents: 'none',
          }}
        />

        {/* Top blend with Hero (first slide only) */}
        {isFirst && (
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        )}

        {/* Bottom blend with VideoReel (last slide only) */}
        {isLast && (
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        )}

        {/* Slide counter — bottom right */}
        <div
          className="absolute bottom-8 right-8 font-mono text-white/25 pointer-events-none"
          style={{ fontSize: 11, letterSpacing: '0.15em' }}
        >
          {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>

        {/* Progress bar — bottom */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/8 pointer-events-none">
          <motion.div
            className="h-full bg-[#FFB800]"
            style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
          />
        </div>
      </div>
    </div>
  );
};

const PeopleReel: React.FC = () => (
  <div className="bg-black">
    {SLIDES.map((slide, i) => (
      <PhotoSection
        key={i}
        src={slide.src}
        objectPos={slide.pos}
        idx={i}
        total={SLIDES.length}
      />
    ))}
  </div>
);

export default PeopleReel;
