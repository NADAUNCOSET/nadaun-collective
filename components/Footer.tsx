import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FooterProps {
  onContactClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // ── Word 1: "LET'S" ─ slides in from left
  const w1Op  = useTransform(scrollYProgress, [0.00, 0.12], [0, 1]);
  const w1X   = useTransform(scrollYProgress, [0.00, 0.12], ['-8%', '0%']);
  const w1Out = useTransform(scrollYProgress, [0.52, 0.64], [1, 0]);
  const w1OutY = useTransform(scrollYProgress, [0.52, 0.64], ['0%', '-6%']);

  // ── Word 2: "BE" ─ slides in from right
  const w2Op  = useTransform(scrollYProgress, [0.10, 0.22], [0, 1]);
  const w2X   = useTransform(scrollYProgress, [0.10, 0.22], ['8%', '0%']);
  const w2Out = useTransform(scrollYProgress, [0.55, 0.67], [1, 0]);
  const w2OutY = useTransform(scrollYProgress, [0.55, 0.67], ['0%', '-6%']);

  // ── Word 3: "TOGETHER." ─ slides up from below
  const w3Op  = useTransform(scrollYProgress, [0.20, 0.34], [0, 1]);
  const w3Y   = useTransform(scrollYProgress, [0.20, 0.34], ['8%', '0%']);
  const w3Out = useTransform(scrollYProgress, [0.58, 0.70], [1, 0]);
  const w3OutY = useTransform(scrollYProgress, [0.58, 0.70], ['0%', '-6%']);

  // ── Sub copy ─ brief appearance then fades
  const subOp = useTransform(scrollYProgress, [0.32, 0.44, 0.50, 0.60], [0, 1, 1, 0]);

  // ── CTA ─ appears last, stays
  const ctaOp = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const ctaY  = useTransform(scrollYProgress, [0.72, 0.88], ['6%', '0%']);

  // ── Bottom info bar
  const barOp = useTransform(scrollYProgress, [0.88, 0.97], [0, 1]);

  return (
    <div ref={sectionRef} id="contact" style={{ height: '400vh' }} className="relative">
      <div className="sticky top-0 w-full h-screen bg-black overflow-hidden flex flex-col justify-center">

        {/* Ambient glow */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-white/2 rounded-full blur-3xl pointer-events-none" />

        {/* ── Words layer ─────────────────────────── */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">

          {/* LET'S */}
          <motion.div style={{ opacity: w1Out, y: w1OutY }}>
            <motion.p
              style={{
                opacity: w1Op,
                x: w1X,
                fontSize: 'clamp(4.5rem, 17vw, 14rem)',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                color: 'rgba(255,255,255,0.92)',
              }}
            >
              LET'S
            </motion.p>
          </motion.div>

          {/* BE */}
          <motion.div style={{ opacity: w2Out, y: w2OutY }}>
            <motion.p
              style={{
                opacity: w2Op,
                x: w2X,
                fontSize: 'clamp(4.5rem, 17vw, 14rem)',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                color: 'rgba(255,255,255,0.92)',
              }}
            >
              BE
            </motion.p>
          </motion.div>

          {/* TOGETHER. */}
          <motion.div style={{ opacity: w3Out, y: w3OutY }}>
            <motion.p
              style={{
                opacity: w3Op,
                y: w3Y,
                fontSize: 'clamp(4.5rem, 17vw, 14rem)',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                color: '#ffffff',
              }}
            >
              TOGETHER.
            </motion.p>
          </motion.div>

          {/* Sub copy */}
          <motion.p
            style={{ opacity: subOp }}
            className="mt-8 text-white/40 text-base md:text-lg font-light max-w-lg"
          >
            최고의 캠페인은 대화에서 시작됩니다.<br />
            나다운 컬렉티브와 함께 브랜드를 완성하세요.
          </motion.p>
        </div>

        {/* ── CTA layer ───────────────────────────── */}
        <motion.div
          style={{ opacity: ctaOp, y: ctaY }}
          className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24"
        >
          <p className="text-white/30 text-sm tracking-[0.3em] uppercase mb-6 font-light">
            Contact
          </p>
          <button
            onClick={onContactClick}
            className="group flex items-center gap-6 w-fit"
          >
            <span
              style={{
                fontSize: 'clamp(3rem, 10vw, 8rem)',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: '#ffffff',
              }}
              className="group-hover:text-white/70 transition-colors duration-300"
            >
              문의하기
            </span>
            <span
              className="text-white/40 group-hover:text-white/70 transition-all duration-300 group-hover:translate-x-2"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
            >
              →
            </span>
          </button>

          {/* Footer info bar */}
          <motion.div
            style={{ opacity: barOp }}
            className="absolute bottom-8 left-8 right-8 md:left-16 md:right-16 lg:left-24 lg:right-24 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-xs text-gray-600"
          >
            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm text-white/70 mb-1">NADAUN COLLECTIVE</span>
              <p>서울특별시 영등포구 영등포로33길 18, 1층</p>
              <p>T. 02-6053-6231 · E. rbsent.info@gmail.com</p>
            </div>
            <div className="flex flex-col md:items-end gap-2">
              <div className="flex gap-5 text-white/40 tracking-widest uppercase">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Youtube</a>
                <a href="#" className="hover:text-white transition-colors">Behance</a>
              </div>
              <p className="text-gray-700">© 2026 NADAUN COLLECTIVE. All Rights Reserved.</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Footer;
