import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Zap, ChevronDown } from 'lucide-react';

interface ImmersiveCreativeOverlayProps {
  isOpen: boolean;
  onClose: () => void;        // 홈으로
  onBack: () => void;         // 사업영역(도메인)으로
  onContactClick: () => void;
  onGlobalClick: () => void;  // GLOBAL NETWORK 새창
}

const PROCESS = [
  { num: '01', title: '제작 의뢰', desc: 'OT를 통해 영상 제작에 대한 고객의 니즈를 파악합니다.' },
  { num: '02', title: '기획',      desc: '고객의 니즈를 바탕으로 아이디어를 구상하고 컨셉을 도출합니다.' },
  { num: '03', title: 'PPM / 촬영', desc: '사전 미팅으로 세부 의견을 조율한 후 전문 촬영진이 진행합니다.' },
  { num: '04', title: '후반 작업',  desc: '전문 영상 편집자들이 고객의 요청에 맞추어 편집을 진행합니다.' },
  { num: '05', title: '시사 및 수정', desc: '고객과 함께 시사를 통해 피드백을 받은 후 수정사항을 반영합니다.' },
  { num: '06', title: 'On-Air',    desc: '최종 확인 후 완성된 제작물을 전국·전세계 매체로 송출합니다.' },
];

const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: false, margin: '-12%' }}
    transition={{ duration: 0.561, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const ImmersiveCreativeOverlay: React.FC<ImmersiveCreativeOverlayProps> = ({ isOpen, onClose, onBack, onContactClick, onGlobalClick }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.374 }}
          className="fixed inset-0 z-[120] bg-[#050505] text-white overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          {/* 우상단: 사업영역(백) + X(홈) 나란히 */}
          <div className="fixed top-7 right-7 md:top-10 md:right-10 z-[130] flex items-center gap-2 md:gap-3">
            <button onClick={onBack}
              className="flex items-center gap-2 px-4 md:px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md text-xs md:text-sm font-bold tracking-wider uppercase text-white/70 hover:text-[#FFB800] transition-all">
              <ArrowLeft size={16} /> 사업영역
            </button>
            <button onClick={onClose}
              className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group backdrop-blur-md">
              <X size={22} className="text-white group-hover:text-[#FFB800] transition-colors" />
            </button>
          </div>

          {/* Intro */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
            <FadeIn>
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#FFB800] to-orange-500 rounded-full flex items-center justify-center mb-10 shadow-[0_0_60px_rgba(255,184,0,0.3)]">
                <Zap className="w-10 h-10 text-black" />
              </div>
              <p className="text-xs md:text-sm tracking-[0.5em] uppercase text-[#FFB800] font-bold mb-6">02 · IMMERSIVE CREATIVE</p>
              <h2 className="font-black tracking-tighter leading-[0.85] mb-8" style={{ fontSize: 'clamp(3.6rem, 12vw, 10rem)' }}>
                IMMERSIVE<br /><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-700">CREATIVE.</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed break-keep">
                TVC·브랜드필름·3D 모션 — 하이엔드 IP 제작.<br className="hidden md:block" />
                제작 의뢰부터 전국 송출까지, 한 흐름으로 완성합니다.
              </p>
            </FadeIn>
            <motion.div animate={{ y: [0, 14, 0], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.0, ease: 'easeInOut' }}
              className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <span className="text-[10px] tracking-[0.4em] text-gray-500 uppercase font-bold">Process</span>
              <ChevronDown className="text-gray-500 w-5 h-5" />
            </motion.div>
          </section>

          {/* Production process */}
          <section className="py-28 px-6 md:px-16 lg:px-24 border-t border-white/5 max-w-6xl mx-auto w-full">
            <FadeIn>
              <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#FFB800] font-bold mb-14">PRODUCTION PROCESS</p>
            </FadeIn>
            <div className="flex flex-col">
              {PROCESS.map((step, i) => (
                <FadeIn key={step.num} delay={0.03 * i}>
                  <div className={`flex items-start gap-6 md:gap-12 py-8 md:py-12 border-t border-white/8 ${step.num === '06' ? 'border-[#FFB800]/30' : ''}`}>
                    <span className="font-black tabular-nums shrink-0 leading-none" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: step.num === '06' ? '#FFB800' : 'rgba(255,255,255,0.12)', letterSpacing: '-0.04em' }}>{step.num}</span>
                    <div className="flex-1 pt-1">
                      <h3 className="font-black text-white leading-none mb-3" style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)', letterSpacing: '-0.03em' }}>{step.title}</h3>
                      <p className="text-white/55 font-light leading-relaxed max-w-xl" style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.3rem)' }}>{step.desc}</p>

                      {step.num === '06' && (
                        <div className="mt-7 flex flex-wrap gap-3">
                          <a href="https://photo.nadaun.co" target="_blank" rel="noopener noreferrer"
                            className="text-xs md:text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-full border border-[#FFB800]/40 text-[#FFB800] hover:bg-[#FFB800] hover:text-black transition-colors">사진 포트폴리오 →</a>
                          <a href="https://video.nadaun.co" target="_blank" rel="noopener noreferrer"
                            className="text-xs md:text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-full border border-[#FFB800]/40 text-[#FFB800] hover:bg-[#FFB800] hover:text-black transition-colors">영상 포트폴리오 →</a>
                          <button onClick={() => { onClose(); onGlobalClick(); }}
                            className="text-xs md:text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-colors">GLOBAL NETWORK →</button>
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#FFB800]/5">
            <FadeIn>
              <h3 className="font-black text-white mb-8 tracking-tighter leading-none" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}>
                상상을<br /><span className="text-[#FFB800]">현실로.</span>
              </h3>
              <button onClick={() => { onClose(); onContactClick(); }}
                className="mx-auto bg-[#FFB800] text-black px-12 py-6 rounded-full font-bold tracking-widest uppercase hover:bg-white hover:scale-105 transition-all duration-500 flex items-center gap-4 group text-lg md:text-xl">
                제작 문의하기 <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
              </button>
            </FadeIn>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImmersiveCreativeOverlay;
