import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onContactClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  // ── Phase 1: LET'S BE TOGETHER
  const h1Op  = useTransform(scrollYProgress, [0.00, 0.14], [0, 1]);
  const h1Y   = useTransform(scrollYProgress, [0.00, 0.14], ['6%', '0%']);
  const h2Op  = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);
  const h2Y   = useTransform(scrollYProgress, [0.08, 0.22], ['6%', '0%']);
  const subOp = useTransform(scrollYProgress, [0.20, 0.32], [0, 1]);

  // ── Phase 2: CTA cards
  const card1Op = useTransform(scrollYProgress, [0.36, 0.50], [0, 1]);
  const card1X  = useTransform(scrollYProgress, [0.36, 0.50], ['-4%', '0%']);
  const card2Op = useTransform(scrollYProgress, [0.46, 0.60], [0, 1]);
  const card2X  = useTransform(scrollYProgress, [0.46, 0.60], ['4%', '0%']);

  // ── Footer bar
  const barOp = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);

  return (
    <footer ref={sectionRef} id="contact" className="relative bg-black text-white overflow-hidden"
      style={{ minHeight: '100vh', paddingTop: '15vh', paddingBottom: '8vh' }}
    >
      {/* Ambient glow */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-white/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[50vw] h-[50vw] bg-white/2 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-16 relative z-10">

        {/* ── Headline ──────────────────────────────── */}
        <div className="mb-20 md:mb-28">
          <p className="text-[13px] tracking-[0.35em] uppercase text-white/40 mb-8 font-light">
            GET IN TOUCH
          </p>
          <div className="overflow-hidden">
            <motion.h2 style={{ opacity: h1Op, y: h1Y }}>
              <span style={{ fontSize: 'clamp(4rem, 12vw, 11rem)', display: 'block', fontFamily: 'Manrope, sans-serif', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>
                LET'S BE
              </span>
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2 style={{ opacity: h2Op, y: h2Y }}>
              <span style={{ fontSize: 'clamp(4rem, 12vw, 11rem)', display: 'block', fontFamily: 'Manrope, sans-serif', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.9, color: 'rgba(255,255,255,0.9)' }}>
                TOGETHER.
              </span>
            </motion.h2>
          </div>
          <motion.p
            style={{ opacity: subOp }}
            className="mt-8 text-white/45 text-base md:text-lg font-light max-w-lg"
          >
            최고의 캠페인은 대화에서 시작됩니다.<br />
            나다운 컬렉티브와 함께 브랜드를 완성하세요.
          </motion.p>
        </div>

        {/* ── CTA Cards ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">

          {/* Contact */}
          <motion.div
            style={{ opacity: card1Op, x: card1X }}
            className="group cursor-pointer border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-colors duration-500"
            onClick={onContactClick}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-white/50 mb-5 block">
              Contact
            </span>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-6 text-white">
              광고 · 캠페인 문의
            </h3>
            <div className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold text-sm group-hover:gap-5 transition-all duration-300">
              문의하기
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.div>

          {/* Careers */}
          <motion.div
            style={{ opacity: card2Op, x: card2X }}
            className="group cursor-pointer border border-white/10 rounded-2xl p-8 hover:border-white/25 transition-colors duration-500"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-white/50 mb-5 block">
              Careers
            </span>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-6 text-white">
              나다운과 함께하는<br />No.1 인재채용
            </h3>
            <div className="inline-flex items-center gap-3 bg-white/8 border border-white/15 text-white px-6 py-3 rounded-full font-bold text-sm group-hover:bg-white/15 transition-all duration-300">
              채용공고
              <ArrowUpRight size={16} />
            </div>
          </motion.div>

        </div>

        {/* ── Footer bar ────────────────────────────── */}
        <motion.div
          style={{ opacity: barOp }}
          className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 text-sm text-gray-500"
        >
          <div className="flex flex-col gap-1">
            <span className="font-bold text-base text-white mb-2">NADAUN COLLECTIVE</span>
            <p>서울특별시 영등포구 영등포로33길 18, 1층</p>
            <p className="mt-2">T. 02-6053-6231 · E. rbsent.info@gmail.com</p>
          </div>
          <div className="flex flex-col md:items-end gap-3">
            <div className="flex gap-5 text-white/60 text-xs tracking-widest uppercase">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Youtube</a>
              <a href="#" className="hover:text-white transition-colors">Behance</a>
            </div>
            <p className="text-xs text-gray-700">© 2026 NADAUN COLLECTIVE. All Rights Reserved.</p>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
