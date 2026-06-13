import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, animate } from 'framer-motion';

interface IntroProps {
  onComplete: () => void;
}

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  const maskRadius = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(circle at center, transparent ${maskRadius}%, black ${maskRadius}%)`;
  const fade = useMotionValue(1); // 모바일 컨테이너 페이드아웃

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (isMobile) {
        // 모바일: 골드 글로우 위 로고 부드러운 페이드 인 → 홀드 → 페이드 아웃 (튐 없음)
        await wait(120); if (cancelled) return; setStage(2);
        await wait(1250); if (cancelled) return;
        animate(fade, 0, { duration: 0.85, ease: [0.16, 1, 0.3, 1], onComplete: () => { if (!cancelled) onComplete(); } });
        return;
      }

      // 데스크탑: 기존 연출 (점 → 심볼 → 옐로우 와이프 → 마스크 오픈)
      await wait(150); if (cancelled) return; setStage(1);
      await wait(480); if (cancelled) return; setStage(2);
      await wait(620); if (cancelled) return; setStage(3);
      await wait(560); if (cancelled) return; setStage(4);
      animate(maskRadius, 150, {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        onComplete: () => { if (!cancelled) onComplete(); },
      });
    };

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none flex flex-col"
      style={isMobile ? { opacity: fade } : { maskImage, WebkitMaskImage: maskImage }}
    >
      <div className="relative w-full h-full bg-black">

        {/* 모바일: 은은한 골드 그라데이션 글로우 */}
        {isMobile && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: 'radial-gradient(circle at 50% 46%, rgba(255,184,0,0.16), transparent 62%)' }}
          />
        )}

        {/* ── Layer 1: 점 (데스크탑만) ── */}
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <AnimatePresence>
              {stage === 1 && (
                <motion.div
                  className="absolute bg-white rounded-full z-20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.187, type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ width: 16, height: 16 }}
                />
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ── 심볼 (공통) ── */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <motion.div
            className="z-10 relative"
            initial={{ opacity: 0, scale: isMobile ? 0.92 : 0.88 }}
            animate={stage >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: isMobile ? 0.92 : 0.88 }}
            transition={{ duration: isMobile ? 1.0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/symbol-white.webp"
              alt=""
              aria-hidden="true"
              className="w-[42vw] max-w-[42vw] min-w-[200px] select-none"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* ── Layer 2: 옐로우 와이프 (데스크탑만) ── */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 bg-[#FFB800] flex items-center justify-center overflow-hidden z-20"
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={stage >= 3 ? { clipPath: 'circle(150% at 50% 50%)' } : { clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/symbol-black.webp"
              alt=""
              aria-hidden="true"
              className="w-[42vw] max-w-[42vw] min-w-[200px] select-none"
              draggable={false}
            />
          </motion.div>
        )}

      </div>
    </motion.div>
  );
};

export default Intro;
