import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VIDEO_SERVER = 'http://localhost:3456';
const DURATION_MS  = 2500; // each video plays for 2.5s before crossfade

interface VideoEntry {
  title: string;
  filename: string;
}

const VideoReel: React.FC = () => {
  const [videos, setVideos]   = useState<VideoEntry[]>([]);
  const [index, setIndex]     = useState(0);
  const [ready, setReady]     = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch video list from local server
  useEffect(() => {
    fetch(`${VIDEO_SERVER}/api/videos`, { signal: AbortSignal.timeout(3000) })
      .then(r => r.json())
      .then(d => {
        if (d.videos?.length) {
          setVideos(d.videos);
          setReady(true);
        }
      })
      .catch(() => {}); // server not running — silently hide section
  }, []);

  // Advance to next video every DURATION_MS
  useEffect(() => {
    if (!ready || !videos.length) return;
    const t = setTimeout(() => setIndex(i => (i + 1) % videos.length), DURATION_MS);
    return () => clearTimeout(t);
  }, [index, ready, videos.length]);

  // Replay from start on each index change
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  }, [index]);

  if (!ready) return null;

  const current = videos[index];
  const next    = videos[(index + 1) % videos.length];
  const src     = (v: VideoEntry) => `${VIDEO_SERVER}/videos/${encodeURIComponent(v.filename)}`;

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* ── Video crossfade ───────────────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.video
          key={index}
          ref={videoRef}
          src={src(current)}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Preload next video silently */}
      <video
        key={`pre-${next.filename}`}
        src={src(next)}
        muted
        preload="auto"
        className="hidden"
        aria-hidden
      />

      {/* ── Gradient overlays ────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />

      {/* ── Top label ────────────────────────────────────────────── */}
      <div className="absolute top-8 left-8 md:left-16 pointer-events-none">
        <p className="text-[#FFB800] font-bold tracking-[0.3em] text-xs uppercase">
          PORTFOLIO REEL
        </p>
      </div>

      {/* ── Bottom: title + progress dots ────────────────────────── */}
      <div className="absolute bottom-10 left-8 md:left-16 right-8 md:right-16 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.p
            key={current.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-white font-bold text-xl md:text-3xl tracking-tight mb-5"
          >
            {current.title}
          </motion.p>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex gap-2">
          {videos.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === index ? 28 : 6,
                backgroundColor: i === index ? '#FFB800' : 'rgba(255,255,255,0.3)',
              }}
              transition={{ duration: 0.3 }}
              className="h-[3px] rounded-full"
            />
          ))}
        </div>
      </div>

      {/* ── Video counter ─────────────────────────────────────────── */}
      <div className="absolute bottom-10 right-8 md:right-16 pointer-events-none">
        <p className="text-white/30 font-mono text-xs tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
        </p>
      </div>
    </section>
  );
};

export default VideoReel;
