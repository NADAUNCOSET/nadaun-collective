import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Cpu, Image as ImageIcon, Video, Search, Palette, Music, Box } from 'lucide-react';

const CATEGORIES = ['ALL', 'LLM', 'IMAGE', 'VIDEO', 'AUDIO', 'DESIGN & 3D'];

const AI_TOOLS = [
  { name: 'ChatGPT', url: 'https://chat.openai.com', category: 'LLM', desc: 'OpenAI의 대화형 인공지능 서비스입니다.', icon: <Cpu className="w-5 h-5" />, color: '#10a37f' },
  { name: 'Claude', url: 'https://claude.ai', category: 'LLM', desc: 'Anthropic의 안전하고 강력한 AI 모델입니다.', icon: <Cpu className="w-5 h-5" />, color: '#d97757' },
  { name: 'Gemini', url: 'https://gemini.google.com', category: 'LLM', desc: 'Google의 가장 범용적이고 강력한 AI입니다.', icon: <Sparkles className="w-5 h-5" />, color: '#4285f4' },
  { name: 'Perplexity', url: 'https://www.perplexity.ai', category: 'LLM', desc: '실시간 정보를 제공하는 AI 검색 엔진입니다.', icon: <Search className="w-5 h-5" />, color: '#20b2aa' },
  
  { name: 'Midjourney', url: 'https://www.midjourney.com', category: 'IMAGE', desc: '예술적인 고퀄리티 이미지를 생성합니다.', icon: <ImageIcon className="w-5 h-5" />, color: '#ffffff' },
  { name: 'Stable Diffusion', url: 'https://stability.ai', category: 'IMAGE', desc: '오픈 소스 기반의 강력한 이미지 생성 모델입니다.', icon: <ImageIcon className="w-5 h-5" />, color: '#9b51e0' },
  { name: 'Leonardo AI', url: 'https://leonardo.ai', category: 'IMAGE', desc: '게임 에셋 및 예술 작품 생성에 특화된 AI입니다.', icon: <ImageIcon className="w-5 h-5" />, color: '#ff9900' },
  
  { name: 'Sora', url: 'https://openai.com/sora', category: 'VIDEO', desc: '텍스트를 고해상도 비디오로 변환합니다.', icon: <Video className="w-5 h-5" />, color: '#ff4b4b' },
  { name: 'Runway', url: 'https://runwayml.com', category: 'VIDEO', desc: '차세대 비디오 생성 및 편집 도구입니다.', icon: <Video className="w-5 h-5" />, color: '#ffffff' },
  { name: 'Pika', url: 'https://pika.art', category: 'VIDEO', desc: '아이디어를 생동감 넘치는 비디오로 만듭니다.', icon: <Video className="w-5 h-5" />, color: '#f3d23a' },
  { name: 'Luma Dream Machine', url: 'https://lumalabs.ai/dream-machine', category: 'VIDEO', desc: '고품질의 사실적인 비디오를 빠르게 생성합니다.', icon: <Video className="w-5 h-5" />, color: '#000000' },
  
  { name: 'Suno AI', url: 'https://suno.com', category: 'AUDIO', desc: '간단한 텍스트로 완성도 높은 음악을 생성합니다.', icon: <Music className="w-5 h-5" />, color: '#ff8c00' },
  { name: 'Udio', url: 'https://www.udio.com', category: 'AUDIO', desc: '감정을 담은 고품질 AI 음악 생성기입니다.', icon: <Music className="w-5 h-5" />, color: '#2563eb' },
  { name: 'ElevenLabs', url: 'https://elevenlabs.io', category: 'AUDIO', desc: '가장 자연스러운 AI 음성 합성 플랫폼입니다.', icon: <Music className="w-5 h-5" />, color: '#ffffff' },
  
  { name: 'Gamma', url: 'https://gamma.app', category: 'DESIGN & 3D', desc: 'AI를 활용해 프레젠테이션과 웹사이트를 제작합니다.', icon: <Palette className="w-5 h-5" />, color: '#ff69b4' },
  { name: 'Canva Magic', url: 'https://www.canva.com', category: 'DESIGN & 3D', desc: '디자인 프로세스를 혁신하는 AI 도구 모음입니다.', icon: <Palette className="w-5 h-5" />, color: '#00c4cc' },
  { name: 'Spline', url: 'https://spline.design', category: 'DESIGN & 3D', desc: '웹 기반의 3D 디자인 및 AI 생성 도구입니다.', icon: <Box className="w-5 h-5" />, color: '#ff00ff' },
];

interface AiInnovationLabOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiInnovationLabOverlay: React.FC<AiInnovationLabOverlayProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-black text-white overflow-y-auto"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="fixed top-8 right-8 md:top-12 md:right-12 z-[110] p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group backdrop-blur-md"
          >
            <X size={24} className="text-white group-hover:text-[#FFB800] transition-colors" />
          </button>

          <div className="min-h-screen container mx-auto px-6 py-24 md:py-32">
            
            {/* Header Section */}
            <div className="mb-12 md:mb-16 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.44 }}
                className="flex items-center gap-3 text-[#FFB800] mb-6"
              >
                <Sparkles className="w-6 h-6" />
                <span className="font-bold tracking-[0.3em] text-sm uppercase">Innovation Lab</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.44 }}
                className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]"
              >
                EXPLORE <br/>
                <span className="text-gray-600">AI UNIVERSE.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.44 }}
                className="text-gray-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
              >
                NADAUN AI LAB에서 엄선한 글로벌 AI 솔루션들을 만나보세요. 
                비즈니스의 혁신을 이끄는 최첨단 도구들이 여러분의 상상력을 현실로 만듭니다.
              </motion.p>
            </div>

            {/* Category Filter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.44 }}
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
                    transition={{ duration: 0.275 }}
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
                            transition={{ duration: 0.22 }}
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
