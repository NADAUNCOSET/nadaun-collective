import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

type PortfolioOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

type PortfolioCard = {
  id: 'video' | 'photo';
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  media: string;
  mediaType: 'video' | 'image';
};

const cards: PortfolioCard[] = [
  {
    id: 'video',
    number: '01',
    title: 'VIDEO',
    eyebrow: 'FILM · COMMERCIAL · CONTENT',
    description: '브랜드의 움직임과 온도를 설계한 필름 포트폴리오',
    href: 'https://video.nadaun.co',
    media: 'https://media.nadaun.co/video/%EA%B0%80%EB%A1%9C/20241022%20PEPSI%20FESTA%20SKETCH%20FILM%20v3_1080p.mp4',
    mediaType: 'video',
  },
  {
    id: 'photo',
    number: '02',
    title: 'PHOTO',
    eyebrow: 'CAMPAIGN · PORTRAIT · EDITORIAL',
    description: '빛과 밀도로 완성한 사진 포트폴리오',
    href: 'https://photo.nadaun.co',
    media: '/hero/royal-salute.webp',
    mediaType: 'image',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const PortfolioOverlay: React.FC<PortfolioOverlayProps> = ({ isOpen, onClose }) => {
  const [active, setActive] = useState<'video' | 'photo'>('video');

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          className="fixed inset-0 z-[100] overflow-y-auto bg-[#1a1a1a] text-white"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.72, ease }}
          aria-modal="true"
          role="dialog"
          aria-label="NADAUN portfolio"
        >
          <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/15 bg-[#1a1a1a]/90 px-6 backdrop-blur-md md:px-12">
            <div className="flex items-center gap-3">
              <span className="text-sm font-extrabold tracking-[-0.02em]">NADAUN</span>
              <span className="text-sm font-medium tracking-[0.18em] text-[#FFB800]">PORTFOLIO</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="group flex items-center gap-3 text-xs font-bold tracking-[0.22em] text-white/70 transition-colors hover:text-[#FFB800]"
              aria-label="포트폴리오 닫기"
            >
              CLOSE
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/25 transition-colors group-hover:border-[#FFB800]">
                <X size={17} />
              </span>
            </button>
          </header>

          <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1800px] flex-col px-6 pb-8 pt-12 md:px-12 md:pb-12 md:pt-16">
            <div className="mb-10 grid gap-7 md:mb-14 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <motion.p
                  className="mb-5 text-[11px] font-bold tracking-[0.35em] text-[#FFB800]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.5, ease }}
                >
                  SELECT A DISCIPLINE
                </motion.p>
                <motion.h1
                  className="font-black leading-[0.84] tracking-[-0.055em]"
                  style={{ fontSize: 'clamp(4.4rem, 12vw, 11rem)', fontFamily: 'SUIT, Pretendard, sans-serif' }}
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.72, ease }}
                >
                  OUR WORK<span className="text-[#FFB800]">.</span>
                </motion.h1>
              </div>
              <motion.p
                className="max-w-sm text-sm font-light leading-7 text-white/55 md:col-span-4 md:justify-self-end md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                나다운은 장면을 만드는 데서 멈추지 않습니다.<br />
                브랜드가 기억되는 감각을 설계합니다.
              </motion.p>
            </div>

            <div className="grid flex-1 gap-px overflow-hidden rounded-[2px] bg-white/15 md:grid-cols-2">
              {cards.map((card, index) => {
                const isActive = active === card.id;
                return (
                  <motion.a
                    key={card.id}
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setActive(card.id)}
                    onFocus={() => setActive(card.id)}
                    className="group relative min-h-[310px] overflow-hidden bg-[#222] md:min-h-[52vh]"
                    initial={{ opacity: 0, y: 44 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34 + index * 0.09, duration: 0.65, ease }}
                  >
                    {card.mediaType === 'video' ? (
                      <video
                        src={card.media}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
                      />
                    ) : (
                      <img
                        src={card.media}
                        alt="NADAUN photo portfolio preview"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />
                    <motion.div
                      className="absolute inset-0 bg-[#FFB800] mix-blend-multiply"
                      animate={{ opacity: isActive ? 0.12 : 0 }}
                      transition={{ duration: 0.35 }}
                    />

                    <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-9 lg:p-11">
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold tracking-[0.3em] text-white/65">{card.number}</span>
                        <span className="grid h-11 w-11 place-items-center rounded-full border border-white/40 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-[#1a1a1a]">
                          <ArrowUpRight size={20} />
                        </span>
                      </div>

                      <div>
                        <p className="mb-4 text-[10px] font-bold tracking-[0.25em] text-[#FFB800] md:text-xs">{card.eyebrow}</p>
                        <h2
                          className="font-black leading-none tracking-[-0.05em]"
                          style={{ fontSize: 'clamp(3.6rem, 8vw, 8.5rem)', fontFamily: 'SUIT, Pretendard, sans-serif' }}
                        >
                          {card.title}
                        </h2>
                        <p className="mt-4 text-sm font-light text-white/65 md:text-base">{card.description}</p>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default PortfolioOverlay;
