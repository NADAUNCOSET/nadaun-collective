import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PARTNERS = [
  "SAMSUNG", "HYUNDAI STEEL", "HYUNDAI", "GAONCHIPS",
  "MIRAE", "M2", "PEPSI", "COWAY",
  "PAT", "PREED", "BEREX", "K2 SAFETY",
  "KWDA", "KOVA", "TR", "EMIRATES",
  "AMOREPACIFIC", "NUMBUZIN", "HECTO INNOVATION", "JUNG SAEM MOOL",
  "ACMÉ DE LA VIE", "OLIVE YOUNG", "AENTIO", "THE NEW GREY",
  "NUDAKE", "MIRAEMI", "KIA", "THE MATTERS",
  "3 HOURS AHEAD", "HD HYUNDAI", "CESTI", "ELLE",
  "HD HYUNDAI C.E.", "DASIQUE", "SKINFOOD", "TONYMOLY",
  "ABIB", "ROOTONIX", "SKIN1004", "SKEDERM",
  "THE SAEM", "2aN", "CALVIN KLEIN", "TORHOP", "DIOR BEAUTY"
];

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Slower stagger
      delayChildren: 0.4
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 }, // Slightly more travel for elegance
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.2, // Slower duration
      ease: [0.16, 1, 0.3, 1] // Very smooth bezier
    } 
  }
};

const AboutOverlay: React.FC<AboutOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#111] text-white overflow-y-auto custom-scrollbar"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="fixed top-8 right-8 md:top-12 md:right-12 z-50 p-2 hover:bg-white/10 rounded-full transition-colors group mix-blend-difference"
          >
            <X size={32} className="text-white group-hover:text-[#FFB800] transition-colors" />
          </button>

          <div className="min-h-screen container mx-auto px-6 py-24 md:py-32 flex flex-col justify-between">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* LEFT: Vision & Philosophy */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-6xl md:text-8xl font-bold tracking-tighter mb-12"
                >
                  ABOUT <br/> NADAUN
                </motion.h2>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl md:text-4xl font-bold leading-snug mb-12">
                      우리는 가장 <span className="text-[#FFB800] px-1 inline-block">나다운</span> 시선을 디자인합니다.
                  </h3>

                  <div className="space-y-10 text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                      <p>
                          나다운은 딱딱한 콘텐츠 대행이 아닌, <br className="hidden md:block"/>
                          사람의 <span className="text-white border-b border-[#FF4D4D] pb-0.5 font-medium">내면적 시선</span>을 분석하고 가장 자기다운 콘텐츠를 기획하는 브랜드입니다.
                      </p>
                      <p>
                          우리는 사람이 '자신을 인식하는 <span className="text-white border-b border-[#FF4D4D] pb-0.5 font-medium">감각</span>'이 곧 브랜드의 시작점이 된다고 믿습니다. 
                          그 시선이 곧 존재의 방향을 만들고, 콘텐츠는 그 시선을 <span className="text-white border-b border-[#FF4D4D] pb-0.5 font-medium">시각화</span>하는 작업입니다.
                      </p>
                      <p>
                          나다운은 콘서트, IP & IT 글로벌 & Beauty 브랜드와 많은 협업을 진행하고 있습니다. 
                          차별화된 콘텐츠, 캠페인을 통해 브랜드의 니즈를 최대한 반영하여 좋은 성과를 만들고 있습니다.
                      </p>
                  </div>

                  <div className="mt-16 pt-12 border-t border-white/10 space-y-6 text-gray-500 text-sm md:text-base font-medium leading-relaxed">
                       <p>
                          <strong className="text-gray-400 block mb-2">NADAUN is not a conventional content agency.</strong>
                          We are a creative studio that explores the <em>inner perspective</em> of individuals and curates content that reflects their most authentic self.
                       </p>
                       <p>
                          We believe that a person's ability to perceive themselves — their inner gaze is the very starting point of a brand.
                          That perspective defines the direction of one's presence, and content is the visual translation of that gaze.
                       </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* RIGHT: Partners Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:pt-32"
              >
                <div className="bg-[#1a1a1a] p-8 md:p-12 rounded-xl border border-white/5">
                  <h4 className="text-xs font-bold text-[#FFB800] tracking-widest uppercase mb-8 opacity-70">
                    Trusted by Industry Leaders
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 text-center items-center">
                      {PARTNERS.map((partner, i) => (
                          <div key={i} className="group flex items-center justify-start sm:justify-center">
                              <span className="text-xs md:text-sm font-semibold text-gray-500 group-hover:text-white transition-colors duration-300 uppercase tracking-wider text-left sm:text-center w-full">
                                {partner}
                              </span>
                          </div>
                      ))}
                  </div>
                </div>

                <div className="mt-12 text-right">
                    <p className="text-xl md:text-3xl font-bold text-white leading-tight">
                    “100개 이상의 기업과 함께 <br/> 나다운 가치를 만들어갑니다.”
                    </p>
                    <div className="w-32 h-2 bg-[#FFB800] ml-auto mt-6"></div>
                    <p className="mt-4 text-sm font-bold tracking-widest text-[#FFB800]">NADAUN COLLECTIVE</p>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-24 text-center text-xs text-gray-600 border-t border-white/10 pt-8">
                COPYRIGHT©2026 NADAUN All Rights Reserved
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutOverlay;