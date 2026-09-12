import React, { lazy, Suspense, useEffect, useState } from 'react';
import Header from './components/Header';
import './components/navigation-shell.css';
import './components/editorial-system.css';
import Hero from './components/Hero';
import Clients from './components/Clients';
import Footer from './components/Footer';
const StarloginOverlay = lazy(() => import('./components/StarloginOverlay'));
const AboutOverlay = lazy(() => import('./components/AboutOverlay'));
const AiInnovationLabOverlay = lazy(() => import('./components/AiInnovationLabOverlay'));
const ContactOverlay = lazy(() => import('./components/ContactOverlay'));
const InsightsOverlay = lazy(() => import('./components/InsightsOverlay'));
import Intro from './components/Intro';
import ServiceHub from './components/ServiceHub';
import ServiceHubV2 from './components/ServiceHubV2';
import VideoReel from './components/VideoReel';
const IntegratedSolutionOverlay = lazy(() => import('./components/IntegratedSolutionOverlay'));
const ImmersiveCreativeOverlay = lazy(() => import('./components/ImmersiveCreativeOverlay'));
const GlobalNetworkOverlay = lazy(() => import('./components/GlobalNetworkOverlay'));
const PortfolioOverlay = lazy(() => import('./components/PortfolioOverlay'));
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [cursorVisible, setCursorVisible] = useState(false);
  const rawCursorX = useMotionValue(-100);
  const rawCursorY = useMotionValue(-100);
  const cursorX = useSpring(rawCursorX, { stiffness: 300, damping: 26, mass: 0.5 });
  const cursorY = useSpring(rawCursorY, { stiffness: 300, damping: 26, mass: 0.5 });

  const [introFinished, setIntroFinished] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hubRevealStarted, setHubRevealStarted] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [inquiryPreset, setInquiryPreset] = useState<'signage'|'solution'|undefined>();
  const [labSection, setLabSection] = useState<'overview'|'production'|'signage'>('overview');
  // 기본 2안(이미지 타일). 1안 리스트 비교는 ?hub=1 로만 접근 (검수용)
  const [hubVersion] = useState<1 | 2>(() =>
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('hub') === '1' ? 1 : 2
  );

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hideCursor = () => setCursorVisible(false);
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const nativeControl = target?.closest('input, textarea, select, [contenteditable="true"], iframe');
      if (!finePointer.matches || reducedMotion.matches || nativeControl || !document.hasFocus()) {
        hideCursor();
        return;
      }
      rawCursorX.set(e.clientX);
      rawCursorY.set(e.clientY);
      setCursorVisible(true);
    };
    const handleVisibility = () => { if (document.hidden) hideCursor(); };
    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', hideCursor);
    window.addEventListener('blur', hideCursor);
    document.addEventListener('visibilitychange', handleVisibility);
    finePointer.addEventListener('change', hideCursor);
    reducedMotion.addEventListener('change', hideCursor);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', hideCursor);
      window.removeEventListener('blur', hideCursor);
      document.removeEventListener('visibilitychange', handleVisibility);
      finePointer.removeEventListener('change', hideCursor);
      reducedMotion.removeEventListener('change', hideCursor);
    };
  }, [rawCursorX, rawCursorY]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = activeOverlay ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeOverlay]);

  const openLab = (section:'overview'|'production'|'signage') => { setLabSection(section); setActiveOverlay('ai-lab'); };
  const handleNavClick = (id: string) => {
    if(id==='contact')setInquiryPreset(undefined);
    if(id==='production-solution'){openLab('production');return;}
    if(id==='digital-signage'){openLab('signage');return;}
    if(id==='ai-lab')setLabSection('overview');
    setActiveOverlay(id);
  };
  const backToHub = () => setActiveOverlay(null);
  const closeOverlay = () => setActiveOverlay(null);

  return (
    <div className="collective-shell bg-[var(--nadaun-bg)] min-h-screen text-white selection:bg-[#FFB800] selection:text-black" data-custom-cursor={cursorVisible}>

      <AnimatePresence mode="sync">
        {!introFinished && <Intro onReveal={() => setHubRevealStarted(true)} onComplete={() => setIntroFinished(true)} />}
      </AnimatePresence>

      <div className="relative z-0">
        <Header onNavClick={handleNavClick} show introFinished={introFinished} activeSection={activeOverlay} onHome={closeOverlay} />

        {introFinished && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-[#FFB800] origin-left z-[60]"
            style={{ scaleX }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.234 }}
          />
        )}

        {/* Cursor ring — spring trail */}
        <motion.div
          className="nadaun-cursor fixed top-0 left-0 w-7 h-7 border border-white/70 rounded-full pointer-events-none z-[9999]"
          aria-hidden="true"
          style={{ opacity: cursorVisible ? 1 : 0, x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%', mixBlendMode: 'difference' }}
        />
        {/* Cursor dot — instant */}
        <motion.div
          className="nadaun-cursor fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999]"
          aria-hidden="true"
          style={{ opacity: cursorVisible ? 1 : 0, x: rawCursorX, y: rawCursorY, translateX: '-50%', translateY: '-50%' }}
        />

        {/* Fetch each detail view only when requested. */}
        <div className="collective-overlays"><Suspense fallback={<div className="fixed inset-0 z-[100] grid place-items-center bg-[#1a1a1a]" role="status"><span className="text-sm text-white/60">Loading…</span><button type="button" onClick={closeOverlay} className="absolute top-4 right-4 w-11 h-11" aria-label="닫기">×</button></div>}>
        {activeOverlay === 'starlogin' && <StarloginOverlay onClose={closeOverlay} onContactClick={() => {setInquiryPreset(undefined);setActiveOverlay('contact');}}/>}
        {activeOverlay === 'about' && (<AboutOverlay isOpen={activeOverlay === 'about'} onClose={closeOverlay} onNavigate={handleNavClick} onContactClick={() => {setInquiryPreset(undefined);setActiveOverlay('contact');}} />)}
        {activeOverlay === 'ai-lab' && (<AiInnovationLabOverlay initialSection={labSection} isOpen={activeOverlay === 'ai-lab'} onClose={closeOverlay} onBack={backToHub} onContactClick={() => {setInquiryPreset(labSection==='signage'?'signage':labSection==='production'?'solution':undefined);setActiveOverlay('contact');}} />)}
        {activeOverlay === 'insights' && (<InsightsOverlay
          isOpen={activeOverlay === 'insights'}
          onClose={closeOverlay}
          onContactClick={() => {setInquiryPreset(undefined);setActiveOverlay('contact');}}
        />)}
        {activeOverlay === 'contact' && (<ContactOverlay initialType={inquiryPreset} isOpen={activeOverlay === 'contact'} onClose={closeOverlay} />)}
        {activeOverlay === 'portfolio' && (<PortfolioOverlay isOpen={activeOverlay === 'portfolio'} onClose={closeOverlay} />)}
        {activeOverlay === 'integrated-solution' && (<IntegratedSolutionOverlay
          isOpen={activeOverlay === 'integrated-solution'}
          onClose={closeOverlay}
          onBack={backToHub}
          onContactClick={() => {setInquiryPreset(undefined);setActiveOverlay('contact');}}
        />)}
        {activeOverlay === 'immersive-creative' && (<ImmersiveCreativeOverlay
          isOpen={activeOverlay === 'immersive-creative'}
          onClose={closeOverlay}
          onBack={backToHub}
          onContactClick={() => {setInquiryPreset(undefined);setActiveOverlay('contact');}}
          onGlobalClick={() => setActiveOverlay('global-network')}
        />)}
        {activeOverlay === 'global-network' && (<GlobalNetworkOverlay
          isOpen={activeOverlay === 'global-network'}
          onClose={closeOverlay}
          onBack={backToHub}
          onContactClick={() => {setInquiryPreset(undefined);setActiveOverlay('contact');}}
        />)}

        </Suspense></div>

        <main>
          <div className="relative">
            {hubVersion === 1 ? (
              <ServiceHub onOverlay={handleNavClick} />
            ) : (
              <ServiceHubV2 onOverlay={handleNavClick} introFinished={introFinished} revealStarted={hubRevealStarted || introFinished} />
            )}
          </div>
          <Hero />
          <VideoReel paused={!!activeOverlay} />
          <Clients />
        </main>

        <Footer onContactClick={() => {setInquiryPreset(undefined);setActiveOverlay('contact');}} />
      </div>
    </div>
  );
};

export default App;
