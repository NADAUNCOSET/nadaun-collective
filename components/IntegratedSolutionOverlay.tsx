import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, ArrowUpRight, ChevronDown } from 'lucide-react';

interface IntegratedSolutionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  onContactClick: () => void;
}

const SERVICES = [
  {
    id: 'plan',
    title: 'CREATIVE STRATEGY',
    subtitle: '크리에이티브 기획',
    desc: '제작 이전에 전략으로 승부합니다. 브랜드의 본질과 시장을 읽어, 어떤 IP로 · 누구에게 · 어떤 메시지로 닿을지 캠페인의 큰 그림을 설계합니다.',
    features: ['IP · 브랜드 전략', '캠페인 설계', '타겟 오디언스 정의', '메시지 · 컨셉 도출'],
  },
  {
    id: 'produce',
    title: 'CONTENT PRODUCTION',
    subtitle: '하이엔드 콘텐츠 제작',
    desc: '기획을 압도적인 비주얼로 구현합니다. TVC · 브랜드필름 · 기업 VCR · 3D 모션, 사진·영상 촬영부터 후반작업, On-Air까지 한 흐름으로.',
    features: ['TVC · CF · 브랜드필름', '기업 VCR', '3D · 모션그래픽', '사진 · 영상 촬영'],
  },
  {
    id: 'broadcast',
    title: 'MEDIA & BROADCAST',
    subtitle: '전국 · 글로벌 송출',
    desc: '제작물을 전국 방송 · IPTV · 케이블 · 오프라인 BTL, 그리고 해외 매체까지 직접 송출합니다. LIVERNOVO 캠페인은 계약 대비 416%를 초과 달성했습니다.',
    features: ['방송 · IPTV · 케이블', '오프라인 BTL', '해외 · 글로벌', '퍼포먼스 · 바이럴'],
  },
  {
    id: 'ip',
    title: 'IP & INFLUENCER',
    subtitle: 'IP · 인플루언서 타겟팅',
    desc: '난컴퍼니 MCN과 AI 데이터를 기반으로, 브랜드 IP와 인플루언서가 정확한 타겟에게 닿는 방법을 설계하고 운영합니다. 도달에서 끝나지 않고 팬덤으로 이어집니다.',
    features: ['MCN · 크리에이터 운영', '인플루언서 매칭', 'IP 타겟 오디언스', 'AI 데이터 타겟팅'],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const PAD = { paddingLeft: 'var(--header-pad, 1.5rem)', paddingRight: 'var(--header-pad, 1.5rem)' } as const;
const DISPLAY = { fontFamily: 'Manrope, sans-serif', fontWeight: 800, letterSpacing: '-0.035em' } as const;

const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: false, margin: '-12%' }}
    transition={{ duration: 0.561, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

const WordSlide: React.FC<{ text: string; style?: React.CSSProperties; delay?: number }> = ({ text, style, delay = 0 }) => (
  <span className="inline-flex flex-wrap">
    {text.split(' ').map((w, i) => (
      <span key={i} className="inline-block overflow-hidden py-[0.04em]">
        <motion.span
          className="inline-block"
          initial={{ x: '-45%', opacity: 0 }}
          whileInView={{ x: '0%', opacity: 1 }}
          viewport={{ once: false, margin: '-10%' }}
          transition={{ duration: 0.72, delay: delay + i * 0.09, ease: EASE }}
          style={style}
        >
          {w}&nbsp;
        </motion.span>
      </span>
    ))}
  </span>
);

const IntegratedSolutionOverlay: React.FC<IntegratedSolutionOverlayProps> = ({ isOpen, onClose, onBack, onContactClick }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.374 }}
          className="fixed inset-0 z-[100] bg-[#050505] text-white overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          {/* 우상단: 사업영역(백) + X(홈) */}
          <div className="fixed top-8 right-8 md:top-12 md:right-12 z-[110] flex items-center gap-2 md:gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 md:px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md text-xs md:text-sm font-bold tracking-wider uppercase text-white/70 hover:text-[#FFB800] transition-all"
              >
                <ArrowLeft size={16} /> 사업영역
              </button>
            )}
            <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group backdrop-blur-md">
              <X size={24} className="text-white group-hover:text-[#FFB800] transition-colors" />
            </button>
          </div>

          {/* Intro — 메인과 같은 좌측 정렬 에디토리얼 */}
          <section className="min-h-screen flex flex-col justify-center relative" style={PAD}>
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 56, opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} className="h-px bg-[#FFB800] mb-8" />
            <FadeIn>
              <p className="text-[11px] md:text-xs tracking-[0.55em] uppercase text-[#FFB800] font-bold mb-8">01 — INTEGRATED SOLUTION</p>
            </FadeIn>
            <h2 className="leading-[0.86] mb-10 text-white" style={{ ...DISPLAY, fontWeight: 900, fontSize: 'clamp(3.2rem, 11vw, 10rem)' }}>
              <WordSlide text="INTEGRATED" />
              <br />
              <WordSlide text="SOLUTION." delay={0.22} style={{ color: '#FFB800' }} />
            </h2>
            <FadeIn delay={0.5}>
              <p className="text-white/60 text-xl md:text-3xl max-w-3xl font-light leading-relaxed break-keep">
                크리에이티브 기획 → 하이엔드 제작 → 전국·글로벌 송출 → IP·인플루언서 타겟팅까지,
                <br className="hidden md:block" />
                나다운이 한 흐름으로 완성하는 올인원 솔루션.
              </p>
            </FadeIn>

            <motion.div
              animate={{ y: [0, 12, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="absolute bottom-14 flex items-center gap-3"
            >
              <span className="text-[10px] tracking-[0.4em] text-white/35 uppercase font-bold">Scroll to Explore</span>
              <ChevronDown className="text-white/35 w-4 h-4" />
            </motion.div>
          </section>

          {/* Services — 에디토리얼 그리드 (블랙 + 골드 단일 팔레트) */}
          {SERVICES.map((service, index) => (
            <section key={service.id} className="min-h-screen flex items-center relative py-28 border-t border-white/[0.07]" style={PAD}>
              {/* ghost number */}
              <span
                aria-hidden
                className="absolute top-16 right-[4%] select-none pointer-events-none leading-none text-white/[0.04]"
                style={{ ...DISPLAY, fontSize: 'clamp(10rem, 24vw, 22rem)' }}
              >
                0{index + 1}
              </span>

              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative z-10">
                {/* Left — label + title */}
                <div className="lg:col-span-5">
                  <FadeIn>
                    <div className="flex items-center gap-4 mb-7">
                      <span className="text-[14px] font-bold tracking-[0.25em] text-[#FFB800]">0{index + 1}</span>
                      <span className="h-px w-12 bg-[#FFB800]/50" />
                      <span className="text-[14px] font-bold tracking-[0.3em] uppercase text-white/50">{service.subtitle}</span>
                    </div>
                    <h3 className="text-white leading-[0.95] mb-6" style={{ ...DISPLAY, fontSize: 'clamp(2.6rem, 5.4vw, 4.8rem)' }}>
                      {service.title.split(' ').map((w, i) => (
                        <span key={i} className="block">
                          {w}
                        </span>
                      ))}
                    </h3>
                  </FadeIn>
                </div>

                {/* Right — desc + feature table */}
                <div className="lg:col-span-7 lg:pt-2">
                  <FadeIn delay={0.08}>
                    <p className="text-white/85 font-light leading-[1.5] tracking-tight mb-14 break-keep" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}>
                      {service.desc}
                    </p>
                  </FadeIn>

                  <div className="border-t border-white/10">
                    {service.features.map((feature, idx) => (
                      <FadeIn key={feature} delay={0.1 + idx * 0.05}>
                        <div className="group relative flex items-center justify-between py-6 border-b border-white/10 transition-all duration-300 hover:pl-5 cursor-default">
                          <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FFB800] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
                          <div className="flex items-baseline gap-7">
                            <span className="text-[13px] font-bold tracking-[0.2em] text-white/30 group-hover:text-[#FFB800] transition-colors duration-300">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="text-xl md:text-2xl font-semibold text-white/85 group-hover:text-white transition-colors duration-300 tracking-tight">
                              {feature}
                            </span>
                          </div>
                          <ArrowUpRight size={22} className="text-white/20 group-hover:text-[#FFB800] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* CTA — 좌측 정렬, 메인과 동일 톤 */}
          <section className="min-h-screen flex flex-col justify-center relative border-t border-white/[0.07]" style={PAD}>
            <FadeIn>
              <p className="text-[11px] tracking-[0.45em] uppercase font-bold mb-8" style={{ color: '#FFB800' }}>
                Contact
              </p>
              <h3 className="text-white mb-8 leading-[0.9]" style={{ ...DISPLAY, fontWeight: 900, fontSize: 'clamp(3rem, 9vw, 8rem)' }}>
                READY TO
                <br />
                <span className="text-[#FFB800]">START?</span>
              </h3>
              <p className="text-lg md:text-2xl text-white/50 mb-14 font-light break-keep">나다운의 전문가들이 브랜드의 고민을 해결해 드립니다.</p>
              <button
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
                className="bg-[#FFB800] text-black px-10 py-5 rounded-full font-bold tracking-widest uppercase hover:bg-white transition-all duration-500 flex items-center gap-4 group text-base md:text-lg w-fit"
              >
                광고 문의하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </button>
            </FadeIn>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntegratedSolutionOverlay;
