import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, MonitorPlay, TrendingUp, BarChart3, ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';

interface IntegratedSolutionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  onContactClick: () => void;
}

const SERVICES = [
  {
    id: 'plan',
    icon: <Layers className="w-8 h-8 md:w-10 md:h-10" />,
    title: 'Creative Strategy',
    subtitle: '크리에이티브 기획',
    desc: '제작 이전에 전략으로 승부합니다. 브랜드의 본질과 시장을 읽어, 어떤 IP로 · 누구에게 · 어떤 메시지로 닿을지 캠페인의 큰 그림을 설계합니다.',
    features: ['IP · 브랜드 전략', '캠페인 설계', '타겟 오디언스 정의', '메시지 · 컨셉 도출'],
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'produce',
    icon: <MonitorPlay className="w-8 h-8 md:w-10 md:h-10" />,
    title: 'Content Production',
    subtitle: '하이엔드 콘텐츠 제작',
    desc: '기획을 압도적인 비주얼로 구현합니다. TVC · 브랜드필름 · 기업 VCR · 3D 모션, 사진·영상 촬영부터 후반작업, On-Air까지 한 흐름으로.',
    features: ['TVC · CF · 브랜드필름', '기업 VCR', '3D · 모션그래픽', '사진 · 영상 촬영'],
    color: 'from-[#FFB800] to-orange-500'
  },
  {
    id: 'broadcast',
    icon: <TrendingUp className="w-8 h-8 md:w-10 md:h-10" />,
    title: 'Media & Broadcast',
    subtitle: '전국 · 글로벌 송출',
    desc: '제작물을 전국 방송 · IPTV · 케이블 · 오프라인 BTL, 그리고 해외 매체까지 직접 송출합니다. LIVERNOVO 캠페인은 계약 대비 416%를 초과 달성했습니다.',
    features: ['방송 · IPTV · 케이블', '오프라인 BTL', '해외 · 글로벌', '퍼포먼스 · 바이럴'],
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'ip',
    icon: <BarChart3 className="w-8 h-8 md:w-10 md:h-10" />,
    title: 'IP & Influencer',
    subtitle: 'IP · 인플루언서 타겟팅',
    desc: '난컴퍼니 MCN과 AI 데이터를 기반으로, 브랜드 IP와 인플루언서가 정확한 타겟에게 닿는 방법을 설계하고 운영합니다. 도달에서 끝나지 않고 팬덤으로 이어집니다.',
    features: ['MCN · 크리에이터 운영', '인플루언서 매칭', 'IP 타겟 오디언스', 'AI 데이터 타겟팅'],
    color: 'from-rose-500 to-pink-500'
  }
];

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 60, filter: 'blur(15px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: false, margin: "-15%" }}
    transition={{ duration: 0.561, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const EASE = [0.16, 1, 0.3, 1] as const;
const WordSlide: React.FC<{ text: string; style?: React.CSSProperties; delay?: number }> = ({ text, style, delay = 0 }) => (
  <span className="inline-flex flex-wrap justify-center">
    {text.split(' ').map((w, i) => (
      <span key={i} className="inline-block overflow-hidden py-[0.04em]">
        <motion.span className="inline-block"
          initial={{ x: '-45%', opacity: 0 }} whileInView={{ x: '0%', opacity: 1 }}
          viewport={{ once: false, margin: '-10%' }}
          transition={{ duration: 0.72, delay: delay + i * 0.09, ease: EASE }} style={style}>
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
          {/* 우상단: 사업영역(백) + X(홈) 나란히 */}
          <div className="fixed top-8 right-8 md:top-12 md:right-12 z-[110] flex items-center gap-2 md:gap-3">
            {onBack && (
              <button onClick={onBack}
                className="flex items-center gap-2 px-4 md:px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md text-xs md:text-sm font-bold tracking-wider uppercase text-white/70 hover:text-[#FFB800] transition-all"
              >
                <ArrowLeft size={16} /> 사업영역
              </button>
            )}
            <button onClick={onClose}
              className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group backdrop-blur-md"
            >
              <X size={24} className="text-white group-hover:text-[#FFB800] transition-colors" />
            </button>
          </div>

          {/* Intro Section */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 56, opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} className="h-px bg-[#FFB800] mb-9" />
            <FadeIn><p className="text-xs md:text-sm tracking-[0.55em] uppercase text-[#FFB800] font-bold mb-9">01 — INTEGRATED SOLUTION</p></FadeIn>
            <h2 className="font-black tracking-[-0.045em] leading-[0.86] mb-10" style={{ fontSize: 'clamp(3.6rem, 13vw, 11rem)' }}>
              <WordSlide text="INTEGRATED" /><br />
              <WordSlide text="SOLUTION." delay={0.22} style={{ color: '#FFB800' }} />
            </h2>
            <FadeIn delay={0.5}>
              <p className="text-white/55 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed break-keep">
                크리에이티브 기획 → 하이엔드 제작 → 전국·글로벌 송출 → IP·인플루언서 타겟팅까지 —<br className="hidden md:block"/>
                나다운이 한 흐름으로 완성하는 올인원 솔루션.
              </p>
            </FadeIn>

            <motion.div
              animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 0.935, ease: "easeInOut" }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
              <span className="text-xs tracking-[0.4em] text-gray-500 uppercase font-bold">Scroll to Explore</span>
              <ChevronDown className="text-gray-500 w-6 h-6" />
            </motion.div>
          </section>

          {/* Services Sections */}
          {SERVICES.map((service, index) => (
            <section key={service.id} className="min-h-screen flex items-center relative py-32 border-t border-white/5">
              {/* Subtle Background Glow */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] bg-gradient-to-br ${service.color} rounded-full blur-[150px] opacity-[0.07]`} />
              </div>

              <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-24">
                  {/* Left: Number & Icon */}
                  <div className="w-full md:w-1/3 md:sticky md:top-48">
                    <FadeIn>
                      <span className="text-[10rem] md:text-[14rem] font-bold leading-none text-white/5 tracking-tighter block mb-8 md:-ml-8">
                        0{index + 1}
                      </span>
                      <div className="flex items-center gap-6">
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-[#FFB800] backdrop-blur-md">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-white tracking-tight mb-2">{service.title}</h3>
                          <p className="text-sm font-bold tracking-[0.3em] text-[#FFB800] uppercase">{service.subtitle}</p>
                        </div>
                      </div>
                    </FadeIn>
                  </div>

                  {/* Right: Content */}
                  <div className="w-full md:w-2/3 md:pt-48">
                    <FadeIn delay={0.08}>
                      <p className="text-3xl md:text-5xl text-gray-200 font-light leading-[1.5] tracking-tight mb-16 break-keep">
                        {service.desc}
                      </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {service.features.map((feature, idx) => (
                        <FadeIn key={feature} delay={0.1 + (idx * 0.04)}>
                          <div className="flex items-center gap-5 p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 backdrop-blur-sm group">
                            <div className="w-3 h-3 rounded-full bg-[#FFB800] group-hover:scale-150 transition-transform duration-500" />
                            <span className="text-lg md:text-xl font-medium text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* CTA Section */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative border-t border-white/5 bg-gradient-to-b from-transparent to-[#FFB800]/5">
            <FadeIn>
              <h3 className="text-6xl md:text-[8rem] font-bold text-white mb-8 tracking-tighter leading-none">
                READY TO <br/>
                <span className="text-[#FFB800]">START?</span>
              </h3>
              <p className="text-xl md:text-3xl text-gray-400 mb-16 font-light">
                나다운의 전문가들이 브랜드의 고민을 해결해 드립니다.
              </p>
              <button 
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
                className="mx-auto bg-[#FFB800] text-black px-12 py-6 rounded-full font-bold tracking-widest uppercase hover:bg-white hover:scale-105 transition-all duration-500 flex items-center gap-4 group text-xl"
              >
                광고 문의하기
                <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
              </button>
            </FadeIn>
          </section>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntegratedSolutionOverlay;
