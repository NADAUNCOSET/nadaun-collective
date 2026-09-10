import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
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
  const reduce=useReducedMotion();

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
          className="collective-editorial collective-portfolio fixed inset-0 z-[100] overflow-y-auto bg-[#1a1a1a] text-white"
          initial={reduce?false:{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{duration:.3,ease}}
          aria-modal="true"
          role="dialog"
          aria-label="NADAUN portfolio"
        >
          <header className="editorial-header sticky top-0 z-30 flex h-[64px] items-center justify-between border-b border-white/15 bg-[#1a1a1a]/90 px-6 backdrop-blur-md md:px-12">
            <div className="flex items-center gap-3">
              <span className="text-sm font-extrabold tracking-[-0.02em]">NADAUN</span>
              <span className="text-sm font-medium tracking-normal text-[#FFB800]">PORTFOLIO</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="group flex items-center gap-3 text-xs font-bold tracking-normal text-white/70 transition-colors hover:text-[#FFB800]"
              aria-label="포트폴리오 닫기"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/25 transition-colors group-hover:border-[#FFB800]">
                <X size={17} />
              </span>
            </button>
          </header>

          <div className="editorial-page-content mx-auto flex flex-col">
            <div className="editorial-intro">
              <div className="md:col-span-8">
                <motion.p
                  className="editorial-kicker mb-5 text-[11px] font-bold tracking-normal text-[#FFB800]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.5, ease }}
                >
                  SELECT A DISCIPLINE
                </motion.p>
                <motion.h1
                  className="font-black leading-[0.84] tracking-[-0.055em]"
                  style={{ fontSize: 'var(--editorial-title)', fontFamily: 'SUIT, Pretendard, sans-serif' }}
                  initial={false}
                >
                  {['OUR','WORK.'].map((word,index)=><span key={word} className="portfolio-word-mask"><motion.span initial={reduce?false:{y:'105%'}} animate={{y:'0%'}} transition={{type:'spring',stiffness:200,damping:30,delay:.18+index*.09}}>{word}</motion.span></span>)}
                </motion.h1>
              </div>
              <motion.p
                className="editorial-body max-w-sm text-sm font-light leading-7 text-white/55 md:col-span-4 md:justify-self-end md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                브랜드의 이야기를 장면과 이미지로 구현합니다.<br />
                사진과 영상에 담긴 나다운의 작업을 확인하세요.
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
                    initial={reduce?false:{opacity:0,y:44}}
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
                        <span className="text-xs font-bold tracking-normal text-white/65">{card.number}</span>
                        <span className="grid h-11 w-11 place-items-center rounded-full border border-white/40 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-[#1a1a1a]">
                          <ArrowUpRight size={20} />
                        </span>
                      </div>

                      <motion.div initial={reduce?false:{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{type:'spring',stiffness:200,damping:30,delay:.54+index*.09}}>
                        <p className="mb-4 text-[10px] font-bold tracking-normal text-[#FFB800] md:text-xs">{card.eyebrow}</p>
                        <h2
                          className="font-black leading-none tracking-[-0.05em]"
                          style={{ fontSize: 'var(--editorial-heading)', fontFamily: 'SUIT, Pretendard, sans-serif' }}
                        >
                          {card.title}
                        </h2>
                        <p className="editorial-body mt-4 text-sm font-light text-white/65 md:text-base">{card.description}</p>
                      </motion.div>
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
