import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 비디오 포트폴리오(가로) — R2. 새로고침마다 셔플. 모바일도 가로(세로클립 회전 이슈로 가로 통일) 대표 룰 2026-06-13
const R2_BASE = `https://media.nadaun.co/video/${encodeURIComponent('가로')}`;
const DURATION_MS = 2800;
const MAX_CLIPS = 12;

const shuffle = <T,>(a: T[]) => a.map(v => [Math.random(), v] as const).sort((x, y) => x[0] - y[0]).map(([, v]) => v);

interface Clip { name: string; src: string; }

const VideoReel: React.FC = () => {
  const [clips, setClips] = useState<Clip[]>([]);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetch('/video-portfolio.json', { signal: AbortSignal.timeout(6000) })
      .then(r => r.json())
      .then((d: any) => {
        const list = Array.isArray(d?.['가로']) ? d['가로'] : [];
        const mapped: Clip[] = list
          .filter((x: any) => x?.file)
          .map((x: any) => ({ name: String(x.name || ''), src: `${R2_BASE}/${encodeURIComponent(x.file)}` }));
        if (mapped.length) { setClips(shuffle(mapped).slice(0, MAX_CLIPS)); setReady(true); }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!ready || !clips.length) return;
    const t = setTimeout(() => setIndex(i => (i + 1) % clips.length), DURATION_MS);
    return () => clearTimeout(t);
  }, [index, ready, clips.length]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = true;
    videoRef.current.volume = 0;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  }, [index]);

  if (!ready || !clips.length) return null;

  const current = clips[index];
  const next = clips[(index + 1) % clips.length];

  return (
    // 모바일: 가로영상 16:9 밴드(잘림 없이) 중앙 / PC: 풀스크린
    <section className="relative w-full bg-black overflow-hidden flex items-center justify-center min-h-[60vh] md:min-h-0 md:h-screen">
      {/* 영상 래퍼 — 모바일 aspect-video, PC 풀 */}
      <div className="relative w-full aspect-video md:aspect-auto md:absolute md:inset-0 md:h-full">
        <AnimatePresence mode="sync">
          <motion.video
            key={index}
            ref={videoRef}
            src={current.src}
            autoPlay muted playsInline preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
      </div>

      <video key={`pre-${next.src}`} src={next.src} muted preload="auto" className="hidden" aria-hidden />
    </section>
  );
};

export default VideoReel;
