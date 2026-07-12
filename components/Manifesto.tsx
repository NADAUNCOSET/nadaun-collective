import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const KO_LINES = [
  '최첨단 장비와 기술,',
  '그리고 정제된 디자인 감각이',
  '결합된',
];

const EN_WORDS = ['HIGH-END', 'CONTENT', 'SOLUTION', 'GROUP'];

// Each Korean line stagger-reveals on scroll
const ManifestoLine: React.FC<{ text: string; delay: number }> = ({ text, delay }) => (
  <div className="overflow-hidden">
    <motion.p
      className="text-2xl md:text-4xl lg:text-5xl font-light text-white/60 tracking-tight leading-snug"
      initial={{ y: '100%', opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.421, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {text}
    </motion.p>
  </div>
);

const Manifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax on the noise overlay
  const noiseY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      ref={sectionRef}
      className="snap-section relative w-full h-screen bg-[#080808] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Video background — desktop only (mobile saves bandwidth) */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none hidden md:block"
        src="/manifesto-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark overlay on video */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none" />

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: noiseY }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,184,0,0.06) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-24 flex flex-col gap-16">

        {/* Korean lines */}
        <div className="flex flex-col gap-3">
          {KO_LINES.map((line, i) => (
            <ManifestoLine key={i} text={line} delay={i * 0.12} />
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.561, ease: [0.16, 1, 0.3, 1], delay: 0.096 }}
          style={{ originX: 0 }}
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#FFB800]/60 to-transparent" />
          <span className="text-[#FFB800] text-xs tracking-[0.4em] uppercase font-medium shrink-0">
            NADAUN COLLECTIVE
          </span>
        </motion.div>

        {/* English brand statement — large kinetic type */}
        <div className="flex flex-col gap-1">
          {EN_WORDS.map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h2
                className="font-extrabold tracking-tighter leading-none select-none"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 9rem)',
                  color: i === 2 ? '#FFB800' : 'white',
                }}
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.398,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.032 + i * 0.08,
                }}
              >
                {word}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Tag line bottom */}
        <motion.p
          className="text-xs tracking-[0.35em] uppercase text-white/25 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.468, delay: 0.192 }}
        >
          Since 2020 — Seoul, Korea
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default Manifesto;
