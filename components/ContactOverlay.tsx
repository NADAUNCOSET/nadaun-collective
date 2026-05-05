import React, { useState } from 'react';
import { CheckCircle, Loader2, Mail, CheckSquare, Square, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactOverlay: React.FC<ContactOverlayProps> = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [inquiryTypes, setInquiryTypes] = useState({
    production: false,
    promotion: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');

    const accessKey = "47df068a-03bd-415b-907e-c3acf6e3fc02";
    
    try {
      const formData = new FormData(e.currentTarget);
      const object = Object.fromEntries(formData.entries());
      
      // Add access key
      object.access_key = accessKey;
      
      // Handle inquiry types
      const types = [];
      if (inquiryTypes.production) types.push("광고 제작");
      if (inquiryTypes.promotion) types.push("광고 홍보");
      object["문의_분야"] = types.join(", ");

      const json = JSON.stringify(object);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      if (response.ok) {
        setFormState('sent');
        setTimeout(() => {
          setFormState('idle');
          onClose();
        }, 2000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setFormState('idle');
      alert("메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const toggleType = (type: 'production' | 'promotion') => {
    setInquiryTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact-overlay-wrapper"
          className="fixed inset-0 z-[105]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { duration: 0.8 } }}
        >
          {/* Yellow Intro Circle Effect */}
          <motion.div
            initial={{ clipPath: "circle(0% at 50%)" }}
            animate={{ clipPath: "circle(150% at 50%)" }}
            exit={{ clipPath: "circle(0% at 50%)" }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-[105] bg-[#FFB800] pointer-events-none flex items-center justify-center overflow-hidden"
          >
             {/* Text revealed during Yellow transition */}
             <div className="relative overflow-hidden w-full text-center">
                 <h1 className="text-[13vw] font-extrabold tracking-tighter leading-none text-black select-none">
                     COLLECTIVE
                 </h1>
             </div>
          </motion.div>
          
          {/* Main Contact Form Overlay */}
          <motion.div
            initial={{ clipPath: "circle(0% at 50%)" }}
            animate={{ clipPath: "circle(150% at 50%)" }}
            exit={{ clipPath: "circle(0% at 50%)" }}
            transition={{ duration: 0.35, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-[110] bg-black text-white overflow-y-auto custom-scrollbar"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="fixed top-8 right-8 md:top-12 md:right-12 z-[120] p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group backdrop-blur-md"
            >
              <X size={24} className="text-white group-hover:text-[#FFB800] transition-colors" />
            </button>

            <div className="w-full min-h-screen flex flex-col md:flex-row">
              
              {/* Left Side: Contact Info */}
              <div className="w-full md:w-4/12 bg-black p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10">
                 <div className="mb-12">
                    <h3 className="text-sm font-bold text-[#FFB800] mb-8 tracking-widest uppercase">
                      CONTACT US
                    </h3>
                    
                    <div className="space-y-8">
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-500 text-xs font-bold">A.</span>
                        <span className="text-lg md:text-xl font-medium text-white break-keep">
                          1F-2F, 18, Yeongdeungpo-ro 33-gil, Yeongdeungpo-gu, Seoul, Republic of Korea
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-gray-500 text-xs font-bold">E.</span>
                        <a href="mailto:rbsent.info@gmail.com" className="text-xl md:text-2xl font-medium text-white hover:text-[#FFB800] transition-colors break-words">
                          rbsent.info@gmail.com
                        </a>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-500 text-xs font-bold">T.</span>
                        <span className="text-xl md:text-2xl font-medium text-white">
                          02-6053-6231
                        </span>
                      </div>
                    </div>
                 </div>
                 
                 <div className="mt-auto pt-12 border-t border-white/10">
                   <p className="text-gray-500 text-sm leading-relaxed">
                     Mon - Fri 10:00 - 18:00 <br/>
                     (Closed on Weekends/Holidays)
                   </p>
                 </div>
              </div>

              {/* Right Side: Detailed Form */}
              <div className="w-full md:w-8/12 bg-[#1a1a1a] p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                
                {formState === 'sent' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <CheckCircle className="w-20 h-20 text-[#FFB800] mb-6" />
                    <h3 className="text-3xl font-bold text-white mb-2">Message Sent</h3>
                    <p className="text-gray-400">We will get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <div className="max-w-3xl mx-auto w-full">
                     {/* Header Icon & Text */}
                     <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#FFB800] rounded-xl flex items-center justify-center text-black shrink-0">
                          <Mail size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Project Inquiry</span>
                          <h2 className="text-2xl font-bold text-white leading-none">광고 문의</h2>
                        </div>
                     </div>

                     {/* Form Fields */}
                     <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Inquiry Type Selection */}
                        <div className="bg-[#2C2C2C] p-6 rounded-xl border border-white/5">
                          <label className="block text-sm font-bold text-white mb-4">문의 분야 (다중 선택 가능) <span className="text-[#FFB800]">*</span></label>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <button
                              type="button"
                              onClick={() => toggleType('production')}
                              className={`flex-1 flex items-center gap-3 p-4 rounded-lg border transition-all ${
                                inquiryTypes.production ? 'border-[#FFB800] bg-[#FFB800]/10' : 'border-white/10 bg-black/20 hover:border-white/30'
                              }`}
                            >
                              {inquiryTypes.production ? <CheckSquare className="text-[#FFB800] w-5 h-5" /> : <Square className="text-gray-500 w-5 h-5" />}
                              <div className="text-left">
                                <span className={`block font-bold ${inquiryTypes.production ? 'text-[#FFB800]' : 'text-white'}`}>광고 제작</span>
                                <span className="text-xs text-gray-500 mt-1 block">영상, 3D, 웹/앱, 디자인 등</span>
                              </div>
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => toggleType('promotion')}
                              className={`flex-1 flex items-center gap-3 p-4 rounded-lg border transition-all ${
                                inquiryTypes.promotion ? 'border-[#FFB800] bg-[#FFB800]/10' : 'border-white/10 bg-black/20 hover:border-white/30'
                              }`}
                            >
                              {inquiryTypes.promotion ? <CheckSquare className="text-[#FFB800] w-5 h-5" /> : <Square className="text-gray-500 w-5 h-5" />}
                              <div className="text-left">
                                <span className={`block font-bold ${inquiryTypes.promotion ? 'text-[#FFB800]' : 'text-white'}`}>광고 홍보</span>
                                <span className="text-xs text-gray-500 mt-1 block">퍼포먼스, 바이럴, 미디어 믹스 등</span>
                              </div>
                            </button>
                          </div>
                        </div>

                        {/* Client Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">회사명 / 브랜드명 <span className="text-[#FFB800]">*</span></label>
                            <input 
                              required 
                              name="회사명_브랜드명"
                              type="text" 
                              className="w-full bg-[#2C2C2C] border border-transparent rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#FFB800] focus:outline-none transition-colors text-sm" 
                              placeholder="Company Name" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">담당자 성함 / 직급 <span className="text-[#FFB800]">*</span></label>
                            <input 
                              required 
                              name="담당자_성함_직급"
                              type="text" 
                              className="w-full bg-[#2C2C2C] border border-transparent rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#FFB800] focus:outline-none transition-colors text-sm" 
                              placeholder="Manager Name" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">연락처 <span className="text-[#FFB800]">*</span></label>
                            <input 
                              required 
                              name="연락처"
                              type="tel" 
                              className="w-full bg-[#2C2C2C] border border-transparent rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#FFB800] focus:outline-none transition-colors text-sm" 
                              placeholder="Phone Number" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">이메일 <span className="text-[#FFB800]">*</span></label>
                            <input 
                              required 
                              name="email"
                              type="email" 
                              className="w-full bg-[#2C2C2C] border border-transparent rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#FFB800] focus:outline-none transition-colors text-sm" 
                              placeholder="Email Address" 
                            />
                          </div>
                        </div>

                        {/* Project Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">예산 (Budget)</label>
                            <select name="예산" className="w-full bg-[#2C2C2C] border border-transparent rounded-lg px-4 py-3 text-white focus:border-[#FFB800] focus:outline-none appearance-none cursor-pointer text-sm">
                              <option value="">예산 범위를 선택해주세요</option>
                              <option value="1000만원 미만">1,000만원 미만</option>
                              <option value="1000만원 ~ 3000만원">1,000만원 ~ 3,000만원</option>
                              <option value="3000만원 ~ 5000만원">3,000만원 ~ 5,000만원</option>
                              <option value="5000만원 ~ 1억원">5,000만원 ~ 1억원</option>
                              <option value="1억원 이상">1억원 이상</option>
                              <option value="미정 (협의 필요)">미정 (협의 필요)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">희망 일정 (Timeline)</label>
                            <input 
                              name="희망_일정"
                              type="text" 
                              className="w-full bg-[#2C2C2C] border border-transparent rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#FFB800] focus:outline-none transition-colors text-sm" 
                              placeholder="예: 2026년 5월 런칭 목표" 
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">프로젝트 상세 내용 <span className="text-[#FFB800]">*</span></label>
                          <textarea 
                            required 
                            name="프로젝트_상세내용"
                            rows={6} 
                            className="w-full bg-[#2C2C2C] border border-transparent rounded-lg px-4 py-4 text-white placeholder-gray-600 focus:border-[#FFB800] focus:outline-none transition-colors resize-none text-sm" 
                            placeholder="프로젝트의 목적, 타겟, 원하시는 레퍼런스 등 상세한 내용을 적어주시면 더 정확한 상담이 가능합니다." 
                          />
                        </div>

                        <button 
                          type="submit" 
                          disabled={formState === 'sending' || (!inquiryTypes.production && !inquiryTypes.promotion)}
                          className="w-full bg-[#FFB800] text-black font-bold py-4 rounded-lg hover:bg-[#ffc933] transition-colors flex items-center justify-center gap-2 text-base mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {formState === 'sending' ? <Loader2 className="animate-spin" /> : '문의 접수하기'}
                        </button>
                        {(!inquiryTypes.production && !inquiryTypes.promotion) && (
                          <p className="text-center text-[#FF4D4D] text-xs mt-2">문의 분야를 최소 1개 이상 선택해주세요.</p>
                        )}
                     </form>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactOverlay;