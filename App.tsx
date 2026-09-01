import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Clients from './components/Clients';
import Footer from './components/Footer';
import AboutOverlay from './components/AboutOverlay';
import AiInnovationLabOverlay from './components/AiInnovationLabOverlay';
import ContactOverlay from './components/ContactOverlay';
import BusinessOverlay from './components/BusinessOverlay';
import InsightsOverlay from './components/InsightsOverlay';
import Intro from './components/Intro';
import ServiceHub from './components/ServiceHub';
import ServiceHubV2 from './components/ServiceHubV2';
import VideoReel from './components/VideoReel';
import IntegratedSolutionOverlay from './components/IntegratedSolutionOverlay';
import ImmersiveCreativeOverlay from './components/ImmersiveCreativeOverlay';
import GlobalNetworkOverlay from './components/GlobalNetworkOverlay';
import PortfolioOverlay from './components/PortfolioOverlay';
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const rawCursorX = useMotionValue(-100);
  const rawCursorY = useMotionValue(-100);
  const cursorX = useSpring(rawCursorX, { stiffness: 300, damping: 26, mass: 0.5 });
  const cursorY = useSpring(rawCursorY, { stiffness: 300, damping: 26, mass: 0.5 });

  const [introFinished, setIntroFinished] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  // 기본 2안(이미지 타일). 1안 리스트 비교는 ?hub=1 로만 접근 (검수용)
  const [hubVersion] = useState<1 | 2>(() =>
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('hub') === '1' ? 1 : 2
  );
  const [bizFromBack, setBizFromBack] = useState(false); // 상세 새창 백버튼 → 도메인으로 복귀

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawCursorX.set(e.clientX);
      rawCursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawCursorX, rawCursorY]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = activeOverlay ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeOverlay]);

  const handleNavClick = (id: string) => { if (id === 'business') setBizFromBack(false); setActiveOverlay(id); };
  const backToDomains = () => { setBizFromBack(true); setActiveOverlay('business'); };
  const closeOverlay = () => setActiveOverlay(null);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#FFB800] selection:text-black cursor-none">

      <AnimatePresence mode="sync">
        {!introFinished && <Intro onComplete={() => setIntroFinished(true)} />}
      </AnimatePresence>

      <div className="relative z-0">
        <Header onNavClick={handleNavClick} show introFinished={introFinished} />

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
          className="fixed top-0 left-0 w-7 h-7 border border-white/70 rounded-full pointer-events-none z-[9999] hidden md:block"
          style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%', mixBlendMode: 'difference' }}
        />
        {/* Cursor dot — instant */}
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
          style={{ x: rawCursorX, y: rawCursorY, translateX: '-50%', translateY: '-50%' }}
        />

        {/* OVERLAYS */}
        <AboutOverlay isOpen={activeOverlay === 'about'} onClose={closeOverlay} onContactClick={() => setActiveOverlay('contact')} />
        <AiInnovationLabOverlay isOpen={activeOverlay === 'ai-lab'} onClose={closeOverlay} onBack={backToDomains} />
        <BusinessOverlay
          isOpen={activeOverlay === 'business'}
          startAtDomains={bizFromBack}
          onClose={closeOverlay}
          onAiLabClick={() => setActiveOverlay('ai-lab')}
          onIntegratedClick={() => setActiveOverlay('integrated-solution')}
          onCreativeClick={() => setActiveOverlay('immersive-creative')}
          onGlobalClick={() => setActiveOverlay('global-network')}
          onContactClick={() => setActiveOverlay('contact')}
        />
        <InsightsOverlay
          isOpen={activeOverlay === 'insights'}
          onClose={closeOverlay}
          onContactClick={() => setActiveOverlay('contact')}
        />
        <ContactOverlay isOpen={activeOverlay === 'contact'} onClose={closeOverlay} />
        <PortfolioOverlay isOpen={activeOverlay === 'portfolio'} onClose={closeOverlay} />
        <IntegratedSolutionOverlay
          isOpen={activeOverlay === 'integrated-solution'}
          onClose={closeOverlay}
          onBack={backToDomains}
          onContactClick={() => setActiveOverlay('contact')}
        />
        <ImmersiveCreativeOverlay
          isOpen={activeOverlay === 'immersive-creative'}
          onClose={closeOverlay}
          onBack={backToDomains}
          onContactClick={() => setActiveOverlay('contact')}
          onGlobalClick={() => setActiveOverlay('global-network')}
        />
        <GlobalNetworkOverlay
          isOpen={activeOverlay === 'global-network'}
          onClose={closeOverlay}
          onBack={backToDomains}
          onContactClick={() => setActiveOverlay('contact')}
        />

        <main>
          <div className="relative">
            {hubVersion === 1 ? (
              <ServiceHub onOverlay={(id) => setActiveOverlay(id)} />
            ) : (
              <ServiceHubV2 onOverlay={(id) => setActiveOverlay(id)} introFinished={introFinished} />
            )}
          </div>
          <Hero />
          <VideoReel />
          <Clients />
        </main>

        <Footer onContactClick={() => setActiveOverlay('contact')} />
      </div>
    </div>
  );
};

export default App;
