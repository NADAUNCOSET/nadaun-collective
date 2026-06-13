import React, { useState } from 'react';
import { CheckCircle, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTION_H = 'min-h-[85vh]';

const SectionReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 0.374, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const BigInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="w-full bg-transparent border-b border-white/15 focus:border-white pb-3 text-white font-light outline-none placeholder-white/20 transition-colors duration-300"
    style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)', ...(props.style ?? {}) }}
  />
);

const BigSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full bg-transparent border-b border-white/15 focus:border-white pb-3 text-white font-light outline-none appearance-none cursor-pointer transition-colors duration-300"
    style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}
  >
    {children}
  </select>
);

const SectionNum: React.FC<{ n: string; label: string }> = ({ n, label }) => (
  <p className="text-[11px] tracking-[0.45em] uppercase text-white/30 font-light mb-8">
    {n} — {label}
  </p>
);

const BigQ: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    className="text-white font-black leading-[1.08] tracking-tight mb-14 break-keep pb-1"
    style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
  >
    {children}
  </p>
);

const ContactOverlay: React.FC<ContactOverlayProps> = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [inquiryTypes, setInquiryTypes] = useState({ production: false, promotion: false });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');
    try {
      const formData = new FormData(e.currentTarget);
      const object: Record<string, string> = Object.fromEntries(
        [...formData.entries()].map(([k, v]) => [k, String(v)])
      );
      object.access_key = '47df068a-03bd-415b-907e-c3acf6e3fc02';
      const types = [
        inquiryTypes.production && '광고 제작',
        inquiryTypes.promotion && '광고 홍보',
      ].filter(Boolean).join(', ');
      object['문의_분야'] = types;

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(object),
      });
      if (res.ok) {
        setFormState('sent');
        setTimeout(() => { setFormState('idle'); onClose(); }, 2500);
      } else throw new Error();
    } catch {
      setFormState('idle');
      alert('전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const toggle = (t: 'production' | 'promotion') =>
    setInquiryTypes(p => ({ ...p, [t]: !p[t] }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[105] bg-black text-white overflow-y-auto"
          style={{ scrollbarWidth: 'none' }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.398, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="sticky top-0 left-0 right-0 h-[57px] flex items-center justify-between px-8 md:px-16 border-b border-white/8 bg-black/95 backdrop-blur-md z-10">
            <span className="text-[11px] font-bold tracking-[0.4em] text-white/50 uppercase">
              NADAUN COLLECTIVE — 문의하기
            </span>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:border-white/40 hover:bg-white/8 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {formState === 'sent' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="min-h-screen flex flex-col items-center justify-center text-center px-8"
            >
              <CheckCircle className="w-16 h-16 text-[#FFB800] mb-8" />
              <p className="text-white font-black mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: 'Manrope, sans-serif' }}>
                문의가 접수됐습니다.
              </p>
              <p className="text-white/40 text-lg font-light">빠른 시일 내에 연락드리겠습니다.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="px-8 md:px-16 lg:px-24">

                {/* ── Section 01: Brand */}
                <section className={`${SECTION_H} flex flex-col justify-center py-20 border-b border-white/6`}>
                  <SectionReveal>
                    <SectionNum n="01" label="브랜드" />
                    <BigQ>브랜드명이<br />무엇인가요?</BigQ>
                    <BigInput
                      required
                      name="회사명_브랜드명"
                      type="text"
                      placeholder="Brand / Company Name"
                    />
                  </SectionReveal>
                </section>

                {/* ── Section 02: Contact person */}
                <section className={`${SECTION_H} flex flex-col justify-center py-20 border-b border-white/6`}>
                  <SectionReveal>
                    <SectionNum n="02" label="담당자" />
                    <BigQ>연락 주실<br />분은 누구인가요?</BigQ>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                      <BigInput
                        required
                        name="담당자_성함_직급"
                        type="text"
                        placeholder="성함 / 직급"
                      />
                      <BigInput
                        required
                        name="연락처"
                        type="tel"
                        placeholder="010-0000-0000"
                      />
                    </div>
                    <div className="mt-8">
                      <BigInput
                        required
                        name="email"
                        type="email"
                        placeholder="이메일 주소"
                      />
                    </div>
                  </SectionReveal>
                </section>

                {/* ── Section 03: Inquiry type */}
                <section className={`${SECTION_H} flex flex-col justify-center py-20 border-b border-white/6`}>
                  <SectionReveal>
                    <SectionNum n="03" label="문의 분야" />
                    <BigQ>어떤 도움이<br />필요하신가요?</BigQ>
                    <div className="flex flex-col sm:flex-row gap-6">
                      {[
                        { key: 'production' as const, label: '광고 제작', items: ['영상 촬영', '사진 촬영', 'TVC · CF', '브랜드 필름', '기업 VCR', '3D · 모션그래픽', '지면 · 앨범', '웹 · 디자인'] },
                        { key: 'promotion' as const, label: '광고 홍보 · 송출', items: ['공영 · 지상파', '종합편성', '케이블 PP', 'IPTV 3사', '위성 · 케이블 SO', '지하철 스크린도어', '옥외 전광판', '택시 · 버스', '해외 · 글로벌', '퍼포먼스 · 바이럴'] },
                      ].map(({ key, label, items }) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggle(key)}
                          className="flex-1 text-left p-8 border transition-all duration-300 rounded-sm"
                          style={{
                            borderColor: inquiryTypes[key] ? 'rgba(255,184,0,0.6)' : 'rgba(255,255,255,0.10)',
                            backgroundColor: inquiryTypes[key] ? 'rgba(255,184,0,0.05)' : 'transparent',
                          }}
                        >
                          <p className="font-black mb-5" style={{
                            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                            fontFamily: 'Manrope, sans-serif',
                            color: inquiryTypes[key] ? '#FFB800' : 'rgba(255,255,255,0.9)',
                          }}>
                            {label}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {items.map(it => (
                              <span key={it} className="text-[11px] md:text-xs font-light px-3 py-1.5 rounded-full border"
                                style={{
                                  borderColor: inquiryTypes[key] ? 'rgba(255,184,0,0.3)' : 'rgba(255,255,255,0.12)',
                                  color: inquiryTypes[key] ? 'rgba(255,184,0,0.85)' : 'rgba(255,255,255,0.5)',
                                }}>
                                {it}
                              </span>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </SectionReveal>
                </section>

                {/* ── Section 04: Budget + timeline */}
                <section className={`${SECTION_H} flex flex-col justify-center py-20 border-b border-white/6`}>
                  <SectionReveal>
                    <SectionNum n="04" label="예산 & 일정" />
                    <BigQ>프로젝트<br />규모를 알려주세요.</BigQ>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                      <div>
                        <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4 font-light">예산 (Budget)</p>
                        <BigSelect name="예산" defaultValue="">
                          <option value="" disabled style={{ color: '#888', background: '#0a0a0a' }}>예산 범위 선택</option>
                          <option value="1000만원 미만" style={{ color: '#fff', background: '#0a0a0a' }}>1,000만원 미만</option>
                          <option value="1000만원 ~ 3000만원" style={{ color: '#fff', background: '#0a0a0a' }}>1,000만원 ~ 3,000만원</option>
                          <option value="3000만원 ~ 5000만원" style={{ color: '#fff', background: '#0a0a0a' }}>3,000만원 ~ 5,000만원</option>
                          <option value="5000만원 ~ 1억원" style={{ color: '#fff', background: '#0a0a0a' }}>5,000만원 ~ 1억원</option>
                          <option value="1억원 이상" style={{ color: '#fff', background: '#0a0a0a' }}>1억원 이상</option>
                          <option value="미정" style={{ color: '#fff', background: '#0a0a0a' }}>미정 (협의 필요)</option>
                        </BigSelect>
                      </div>
                      <div>
                        <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4 font-light">희망 일정 (Timeline)</p>
                        <BigInput
                          name="희망_일정"
                          type="text"
                          placeholder="예: 2026년 7월 런칭"
                        />
                      </div>
                    </div>
                  </SectionReveal>
                </section>

                {/* ── Section 05: Detail */}
                <section className={`${SECTION_H} flex flex-col justify-center py-20`}>
                  <SectionReveal>
                    <SectionNum n="05" label="상세 내용" />
                    <BigQ>프로젝트를<br />소개해주세요.</BigQ>
                    <textarea
                      required
                      name="프로젝트_상세내용"
                      rows={6}
                      placeholder="목적, 타겟, 레퍼런스 등 자유롭게 적어주세요."
                      className="w-full bg-transparent border-b border-white/15 focus:border-white pb-4 text-white font-light outline-none placeholder-white/15 transition-colors duration-300 resize-none leading-relaxed"
                      style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}
                    />
                  </SectionReveal>

                  {/* Submit */}
                  <SectionReveal delay={0.15}>
                    <div className="mt-16 flex flex-col md:flex-row items-start md:items-center gap-6">
                      <button
                        type="submit"
                        disabled={formState === 'sending' || (!inquiryTypes.production && !inquiryTypes.promotion)}
                        className="flex items-center gap-4 group disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <span
                          className="font-black group-hover:text-white/70 transition-colors duration-300"
                          style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
                        >
                          {formState === 'sending' ? '전송 중...' : '문의 접수하기'}
                        </span>
                        {formState === 'sending'
                          ? <Loader2 className="animate-spin w-8 h-8 text-white/40" />
                          : <span className="text-white/40 group-hover:text-white/70 group-hover:translate-x-2 transition-all duration-300" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>→</span>
                        }
                      </button>
                      {!inquiryTypes.production && !inquiryTypes.promotion && (
                        <p className="text-white/30 text-sm font-light">문의 분야(03)를 선택해주세요</p>
                      )}
                    </div>
                    <div className="mt-16 pt-8 border-t border-white/8 flex flex-col md:flex-row gap-2 text-white/25 text-xs font-light tracking-wider">
                      <span>info@nadaun.co</span>
                      <span className="hidden md:inline mx-3">·</span>
                      <span>02-6053-6231</span>
                      <span className="hidden md:inline mx-3">·</span>
                      <span>서울 영등포구 영등포로33길 18, 1층</span>
                    </div>
                  </SectionReveal>
                </section>

              </div>
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactOverlay;
