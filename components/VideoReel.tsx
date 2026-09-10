import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Pause, Play, ArrowUpRight } from 'lucide-react';

const R2_BASE = `https://media.nadaun.co/video/${encodeURIComponent('가로')}`;
interface Clip { name: string; src: string; poster: string; }

const VideoReel: React.FC<{ paused?: boolean }> = ({ paused = false }) => {
  const [clips, setClips] = useState<Clip[]>([]);
  const [index, setIndex] = useState(0);
  const [nearby, setNearby] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [userPaused, setUserPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const playing = inView && pageVisible && !paused && !userPaused && !reducedMotion;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const nearbyObserver = new IntersectionObserver(([e]) => { if (e.isIntersecting) setNearby(true); }, { rootMargin:'300px' });
    const observer = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold:.01 });
    nearbyObserver.observe(section); observer.observe(section);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => { nearbyObserver.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  useEffect(() => {
    if (!nearby) return;
    const controller = new AbortController();
    fetch('/video-portfolio.json', { signal:controller.signal })
      .then(r => { if (!r.ok) throw new Error('Manifest unavailable'); return r.json(); })
      .then(d => {
        const list = (Array.isArray(d?.['가로']) ? d['가로'] : []).filter((x: {file?: string}) => x?.file);
        for (let i=list.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [list[i],list[j]]=[list[j],list[i]]; }
        setClips(list.slice(0,12).map((x: {file:string;name?:string}) => ({ name:x.name || '', src:`${R2_BASE}/${encodeURIComponent(x.file)}`, poster:`${R2_BASE}/${encodeURIComponent(x.file.replace(/\.mp4$/, '.jpg'))}` })));
      }).catch(() => {});
    return () => controller.abort();
  }, [nearby]);

  useEffect(() => {
    const v=videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {}); else v.pause();
  }, [playing, index, clips.length]);
  useEffect(() => {
    if (!playing || !clips.length) return;
    const timer=window.setTimeout(() => setIndex(i => (i+1)%clips.length), 2800);
    return () => window.clearTimeout(timer);
  }, [playing, index, clips.length]);

  const current=clips[index];
  return (
    <section ref={sectionRef} aria-label="NADAUN films" className="relative w-full bg-[#1a1a1a] overflow-hidden flex items-center justify-center min-h-[40vh] md:min-h-0 md:h-screen">
      <div className="relative w-full aspect-video md:aspect-auto md:absolute md:inset-0 md:h-full">
        {current && <AnimatePresence mode="sync"><motion.video key={current.src} ref={videoRef} src={playing ? current.src : undefined} poster={current.poster} muted playsInline preload="none" className="absolute inset-0 w-full h-full object-cover" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reducedMotion ? 0 : .4}} /></AnimatePresence>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="absolute bottom-4 md:bottom-7 left-5 md:left-8 right-5 md:right-8 flex items-center justify-between gap-4">
        <a href="https://video.nadaun.co" className="min-h-[44px] inline-flex items-center gap-2 text-xs font-medium text-white/80 hover:text-white">Watch films <ArrowUpRight size={16} /></a>
        {current && !reducedMotion && <button type="button" aria-label={userPaused ? '배경 영상 재생' : '배경 영상 일시정지'} onClick={() => setUserPaused(p => !p)} className="h-11 w-11 flex items-center justify-center text-white/80 hover:text-white">{userPaused ? <Play size={20} strokeWidth={1.6} /> : <Pause size={20} strokeWidth={1.6} />}</button>}
      </div>
    </section>
  );
};
export default VideoReel;
