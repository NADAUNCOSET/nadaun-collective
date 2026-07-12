import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ExternalLink, Sparkles, Cpu, Image as ImageIcon, Video, Search, Palette, Music, Box } from 'lucide-react';

const CATEGORIES = ['ALL', 'LLM', 'IMAGE', 'VIDEO', 'AUDIO', 'DESIGN & 3D'];

// 2026-07 기준 최신 핫리스트 (시장 점유율·아레나 리더보드 기반)
const AI_TOOLS = [
  { name: 'ChatGPT', url: 'https://chat.openai.com', category: 'LLM', desc: '점유율 1위(글로벌 54%) — OpenAI 대화형 AI의 표준입니다.', icon: <Cpu className="w-5 h-5" />, color: '#10a37f' },
  { name: 'Gemini', url: 'https://gemini.google.com', category: 'LLM', desc: '점유율 2위 — 1년 새 450% 성장한 Google 멀티모달 AI입니다.', icon: <Sparkles className="w-5 h-5" />, color: '#4285f4' },
  { name: 'Claude', url: 'https://claude.ai', category: 'LLM', desc: '최고 성장세(연 855%↑) — 에이전틱 작업·코딩 최강 Anthropic AI입니다.', icon: <Cpu className="w-5 h-5" />, color: '#d97757' },
  { name: 'DeepSeek', url: 'https://www.deepseek.com', category: 'LLM', desc: '오픈소스 추론(reasoning) 모델의 대표주자입니다.', icon: <Cpu className="w-5 h-5" />, color: '#4d6bfe' },
  { name: 'Grok', url: 'https://grok.com', category: 'LLM', desc: 'xAI의 실시간 정보 결합 대화형 AI입니다.', icon: <Cpu className="w-5 h-5" />, color: '#ffffff' },
  { name: 'Perplexity', url: 'https://www.perplexity.ai', category: 'LLM', desc: '출처 기반 실시간 AI 검색 엔진입니다.', icon: <Search className="w-5 h-5" />, color: '#20b2aa' },

  { name: 'GPT Image 2', url: 'https://openai.com', category: 'IMAGE', desc: '이미지 아레나 1위 — OpenAI의 최신 이미지 생성 모델입니다.', icon: <ImageIcon className="w-5 h-5" />, color: '#10a37f' },
  { name: 'Nano Banana', url: 'https://gemini.google.com', category: 'IMAGE', desc: 'Google 화제의 이미지 생성·편집 모델(Gemini Flash Image)입니다.', icon: <ImageIcon className="w-5 h-5" />, color: '#ffd400' },
  { name: 'Midjourney', url: 'https://www.midjourney.com', category: 'IMAGE', desc: 'v7 — 예술적 미감·시네마틱 라이팅의 골드 스탠다드입니다.', icon: <ImageIcon className="w-5 h-5" />, color: '#ffffff' },
  { name: 'FLUX', url: 'https://bfl.ai', category: 'IMAGE', desc: '오픈소스 이미지 1위 — Black Forest Labs의 대표 모델입니다.', icon: <ImageIcon className="w-5 h-5" />, color: '#ffffff' },
  { name: 'Ideogram', url: 'https://ideogram.ai', category: 'IMAGE', desc: '텍스트·타이포 표현에 가장 강한 이미지 AI입니다.', icon: <ImageIcon className="w-5 h-5" />, color: '#ff7a00' },
  { name: 'Krea', url: 'https://www.krea.ai', category: 'IMAGE', desc: '실시간 생성·업스케일 크리에이티브 툴입니다.', icon: <ImageIcon className="w-5 h-5" />, color: '#ffffff' },

  { name: 'Kling 3.0', url: 'https://klingai.com', category: 'VIDEO', desc: '영상 아레나 1위 — 사실적 모션의 최강 영상 생성 AI입니다.', icon: <Video className="w-5 h-5" />, color: '#ff4d6d' },
  { name: 'Veo 3.1', url: 'https://deepmind.google/models/veo/', category: 'VIDEO', desc: 'Google의 시네마틱 영상 생성 — 오디오 동시 생성 지원.', icon: <Video className="w-5 h-5" />, color: '#4285f4' },
  { name: 'Sora 2', url: 'https://sora.com', category: 'VIDEO', desc: 'OpenAI의 소셜 숏폼형 영상 생성 — 사운드·대사까지 한 번에.', icon: <Video className="w-5 h-5" />, color: '#ff4b4b' },
  { name: 'Seedance', url: 'https://seed.bytedance.com', category: 'VIDEO', desc: 'ByteDance — 롱폼 이미지-투-비디오의 최신 강자입니다.', icon: <Video className="w-5 h-5" />, color: '#00f0ff' },
  { name: 'Runway', url: 'https://runwayml.com', category: 'VIDEO', desc: 'Gen-4.5 — 프로덕션 컨트롤에 가장 강한 영상 툴입니다.', icon: <Video className="w-5 h-5" />, color: '#ffffff' },
  { name: 'Wan', url: 'https://wan.video', category: 'VIDEO', desc: '오픈소스 영상 1위 — Alibaba의 공개 가중치 모델입니다.', icon: <Video className="w-5 h-5" />, color: '#7c3aed' },

  { name: 'Suno', url: 'https://suno.com', category: 'AUDIO', desc: '텍스트 한 줄로 완성곡을 만드는 음악 생성 1위입니다.', icon: <Music className="w-5 h-5" />, color: '#ff8c00' },
  { name: 'ElevenLabs', url: 'https://elevenlabs.io', category: 'AUDIO', desc: '가장 자연스러운 AI 음성 합성·더빙 플랫폼입니다.', icon: <Music className="w-5 h-5" />, color: '#ffffff' },
  { name: 'Udio', url: 'https://www.udio.com', category: 'AUDIO', desc: '감정을 담은 고품질 AI 음악 생성기입니다.', icon: <Music className="w-5 h-5" />, color: '#2563eb' },

  { name: 'Gamma', url: 'https://gamma.app', category: 'DESIGN & 3D', desc: 'AI로 프레젠테이션·웹사이트를 제작합니다.', icon: <Palette className="w-5 h-5" />, color: '#ff69b4' },
  { name: 'Spline', url: 'https://spline.design', category: 'DESIGN & 3D', desc: '웹 기반 3D 디자인 및 AI 생성 도구입니다.', icon: <Box className="w-5 h-5" />, color: '#ff00ff' },
  { name: 'Meshy', url: 'https://www.meshy.ai', category: 'DESIGN & 3D', desc: '텍스트·이미지를 3D 모델로 생성합니다.', icon: <Box className="w-5 h-5" />, color: '#7c3aed' },
  { name: 'Canva Magic', url: 'https://www.canva.com', category: 'DESIGN & 3D', desc: '디자인 프로세스를 혁신하는 AI 도구 모음입니다.', icon: <Palette className="w-5 h-5" />, color: '#00c4cc' },
];

interface AiInnovationLabOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const WordSlide: React.FC<{ text: string; style?: React.CSSProperties; delay?: number }> = ({ text, style, delay = 0 }) => (
  <span className="inline-flex flex-wrap">
    {text.split(' ').map((w, i) => (
      <span key={i} className="inline-block overflow-hidden py-[0.04em]">
        <motion.span className="inline-block"
          initial={{ x: '-45%', opacity: 0 }} animate={{ x: '0%', opacity: 1 }}
          transition={{ duration: 0.72, delay: delay + i * 0.09, ease: EASE }} style={style}>
          {w}&nbsp;
        </motion.span>
      </span>
    ))}
  </span>
);

const AiInnovationLabOverlay: React.FC<AiInnovationLabOverlayProps> = ({ isOpen, onClose, onBack }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.374, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-black text-white overflow-y-auto"
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
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group backdrop-blur-md"
            >
              <X size={24} className="text-white group-hover:text-[#FFB800] transition-colors" />
            </button>
          </div>

          <div className="min-h-screen container mx-auto px-6 py-24 md:py-32">
            
            {/* Header Section */}
            <div className="mb-12 md:mb-16 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.064, duration: 0.374 }}
                className="flex items-center gap-3 text-[#FFB800] mb-6"
              >
                <Sparkles className="w-6 h-6" />
                <span className="font-bold tracking-[0.3em] text-sm uppercase">Innovation Lab</span>
              </motion.div>
              
              <h2 className="font-black tracking-[-0.04em] mb-8 leading-[0.88]" style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}>
                <WordSlide text="EXPLORE" /><br />
                <WordSlide text="AI UNIVERSE." delay={0.2} style={{ color: '#FFB800' }} />
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.128, duration: 0.374 }}
                className="text-gray-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
              >
                나다운이 실제 제작 현장에서 쓰는 글로벌 AI 도구들 —
                LLM · 이미지 · 영상 · 오디오 · 3D까지, 최전선의 도구를 큐레이션해 한곳에 모았습니다.
              </motion.p>
            </div>

            {/* Category Filter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.374 }}
              className="flex flex-wrap gap-2 mb-16"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                    activeCategory === category 
                      ? 'bg-[#FFB800] text-black border-[#FFB800]' 
                      : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Grid Section Grouped by Category */}
            <div className="space-y-24">
              {CATEGORIES.filter(c => c !== 'ALL').map((category) => {
                if (activeCategory !== 'ALL' && activeCategory !== category) return null;
                
                const categoryTools = AI_TOOLS.filter(tool => tool.category === category);
                if (categoryTools.length === 0) return null;

                return (
                  <motion.div 
                    key={category}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.234 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                      <h3 className="text-2xl font-bold tracking-widest text-white">
                        {category}
                      </h3>
                      <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded-md">
                        {categoryTools.length} TOOLS
                      </span>
                    </div>
                    
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      <AnimatePresence mode="popLayout">
                        {categoryTools.map((tool, index) => (
                          <motion.a
                            layout
                            key={tool.name}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.187 }}
                            className="group relative bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 hover:border-[#FFB800]/30 transition-all duration-500 flex flex-col h-full overflow-hidden"
                          >
                            {/* Hover Background Glow */}
                            <div className="absolute -inset-px bg-gradient-to-br from-[#FFB800]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10">
                              <div className="flex justify-between items-start mb-8">
                                <div 
                                  className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500"
                                  style={{ color: tool.color }}
                                >
                                  {tool.icon}
                                </div>
                                <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-[#FFB800] transition-colors" />
                              </div>

                              <div className="mb-4">
                                <span className="text-[10px] font-bold tracking-[0.2em] text-[#FFB800] uppercase mb-2 block">
                                  {tool.category}
                                </span>
                                <h3 className="text-2xl font-bold text-white group-hover:text-[#FFB800] transition-colors">
                                  {tool.name}
                                </h3>
                              </div>

                              <p className="text-gray-500 text-sm leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
                                {tool.desc}
                              </p>
                            </div>

                            {/* Bottom Decoration */}
                            <div className="mt-auto pt-8 flex items-center gap-2">
                              <div className="h-[1px] flex-grow bg-white/5 group-hover:bg-[#FFB800]/20 transition-colors" />
                              <span className="text-[10px] font-mono text-gray-700 group-hover:text-[#FFB800]/50 transition-colors">
                                VISIT SITE
                              </span>
                            </div>
                          </motion.a>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold tracking-tighter">NADAUN</span>
                <span className="text-xs font-bold tracking-widest text-gray-600 uppercase">AI Innovation Lab</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">
                COPYRIGHT©2026 NADAUN All Rights Reserved
              </p>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AiInnovationLabOverlay;
