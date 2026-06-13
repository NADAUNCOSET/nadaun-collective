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
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  }, [index]);

  if (!ready || !clips.length) return null;

  const current = clips[index];
  const next = clips[(index + 1) % clips.length];

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.video
          key={index}
          ref={videoRef}
          src={current.src}
          autoPlay muted playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <video key={`pre-${next.src}`} src={next.src} muted preload="auto" className="hidden" aria-hidden />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

      <div className="absolute top-8 left-8 md:left-16 pointer-events-none">
        <p className="text-[#FFB800] font-bold tracking-[0.3em] text-xs uppercase">VIDEO PORTFOLIO</p>
      </div>

      <div className="absolute bottom-10 left-8 md:left-16 right-8 md:right-16 pointer-events-none">
        <div className="flex gap-2">
          {clips.map((_, i) => (
            <motion.div key={i}
              animate={{ width: i === index ? 28 : 6, backgroundColor: i === index ? '#FFB800' : 'rgba(255,255,255,0.3)' }}
              transition={{ duration: 0.14 }}
              className="h-[3px] rounded-full"
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 right-8 md:right-16 pointer-events-none">
        <p className="text-white/30 font-mono text-xs tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(clips.length).padStart(2, '0')}
        </p>
      </div>

      <a href="https://video.nadaun.co" target="_blank" rel="noopener noreferrer"
        className="absolute top-8 right-8 md:right-16 z-10 text-[11px] font-bold tracking-wider uppercase text-white/60 hover:text-[#FFB800] border border-white/15 hover:border-[#FFB800]/40 rounded-full px-4 py-2 transition-colors">
        포트폴리오 전체 →
      </a>
    </section>
  );
};

export default VideoReel;
