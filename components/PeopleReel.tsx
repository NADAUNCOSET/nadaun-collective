import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PHOTOS = [
  { src: '/people/dong-wook-00.webp',  label: 'DONG WOOK' },
  { src: '/people/estevan-00.webp',    label: 'ESTEVAN' },
  { src: '/people/thenewgrey-00.webp', label: 'THE NEW GREY' },
  { src: '/people/dong-wook-01.webp',  label: 'DONG WOOK' },
  { src: '/people/beethoven-00.webp',  label: 'BEETHOVEN' },
  { src: '/people/estevan-01.webp',    label: 'ESTEVAN' },
  { src: '/people/thenewgrey-01.webp', label: 'THE NEW GREY' },
  { src: '/people/laon-band-00.webp',  label: 'LAON BAND' },
];

const PeopleReel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Horizontal drift: scroll down → strip moves left
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.88, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-black py-24">
      {/* Label */}
      <div className="px-8 md:px-16 lg:px-24 mb-10">
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#FFB800] font-bold">NADAUN MOMENT — PEOPLE</p>
        <h2
          className="mt-2 font-black leading-none text-white"
          style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
        >
          우리가 담은 사람들
        </h2>
      </div>

      {/* Scrolling strip */}
      <motion.div
        style={{ x, opacity }}
        className="flex gap-4 md:gap-5 pl-8 md:pl-16 lg:pl-24"
      >
        {PHOTOS.map((photo, i) => (
          <motion.div
            key={i}
            className="relative shrink-0 overflow-hidden rounded-sm"
            style={{ width: 'clamp(180px, 22vw, 320px)', aspectRatio: '3/4' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={photo.src}
              alt={photo.label}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.88) contrast(1.05)' }}
              loading="lazy"
            />
            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-[9px] tracking-[0.35em] uppercase text-white/60 font-medium">{photo.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Right fade */}
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default PeopleReel;
