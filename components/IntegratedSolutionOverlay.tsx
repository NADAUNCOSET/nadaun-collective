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
    id: 'strategy',
    icon: <Layers className="w-8 h-8 md:w-10 md:h-10" />,
    title: 'Strategy & Planning',
    subtitle: '전략 기획',
    desc: '브랜드의 본질을 분석하고 시장의 흐름을 읽어, 타겟의 마음을 움직이는 최적의 캠페인 전략을 수립합니다.',
    features: ['브랜드 포지셔닝', '캠페인 기획', '타겟 분석', '크리에이티브 전략'],
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'creative',
    icon: <MonitorPlay className="w-8 h-8 md:w-10 md:h-10" />,
    title: 'Creative Production',
    subtitle: '크리에이티브 제작',
    desc: '시선을 사로잡는 영상, 압도적인 3D 비주얼, 그리고 직관적인 웹/앱 환경까지. 상상을 현실로 구현합니다.',
    features: ['TV/디지털 CF', '3D 모션그래픽', '웹/앱 UI·UX', '브랜드 필름'],
    color: 'from-[#FFB800] to-orange-500'
  },
  {
    id: 'media',
    icon: <TrendingUp className="w-8 h-8 md:w-10 md:h-10" />,
    title: 'Media Execution',
    subtitle: '미디어 집행',
    desc: '가장 효율적인 매체 믹스를 통해 타겟에게 도달하며, 퍼포먼스 마케팅과 바이럴로 확산의 극대화를 이끌어냅니다.',
    features: ['퍼포먼스 마케팅', 'SNS 바이럴', 'OOH (옥외광고)', '인플루언서 마케팅'],
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'data',
    icon: <BarChart3 className="w-8 h-8 md:w-10 md:h-10" />,
    title: 'Data Analysis',
    subtitle: '데이터 분석 및 최적화',
    desc: '캠페인 진행 중 발생하는 모든 데이터를 실시간으로 트래킹하고 분석하여, ROAS를 극대화하는 솔루션을 제공합니다.',
    features: ['실시간 성과 측정', 'A/B 테스트', '고객 여정 분석', '인사이트 리포팅'],
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
          {/* Back → 사업영역 */}
          {onBack && (
            <button onClick={onBack}
              className="fixed top-8 left-8 md:top-12 md:left-12 z-[110] flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md text-xs md:text-sm font-bold tracking-wider uppercase text-white/70 hover:text-[#FFB800] transition-all"
            >
              <ArrowLeft size={16} /> 사업영역
            </button>
          )}
          {/* Close Button → 홈 */}
          <button
            onClick={onClose}
            className="fixed top-8 right-8 md:top-12 md:right-12 z-[110] p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group backdrop-blur-md"
          >
            <X size={24} className="text-white group-hover:text-[#FFB800] transition-colors" />
          </button>

          {/* Intro Section */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
            <FadeIn>
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#FFB800] to-orange-500 rounded-full flex items-center justify-center mb-12 shadow-[0_0_60px_rgba(255,184,0,0.3)]">
                <Layers className="w-10 h-10 text-black" />
              </div>
              <h2 className="text-6xl md:text-[10rem] font-bold tracking-tighter mb-8 leading-[0.85]">
                INTEGRATED <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800">SOLUTION.</span>
              </h2>
              <p className="text-gray-400 text-xl md:text-3xl max-w-4xl mx-auto font-light leading-relaxed tracking-tight">
                나다운은 기획부터 제작, 매체 집행, 데이터 분석까지 <br className="hidden md:block"/>
                브랜드의 성공을 위한 모든 과정을 하나로 연결합니다.
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
