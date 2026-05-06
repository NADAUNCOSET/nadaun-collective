import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
const IsoWorld = lazy(() => import('./components/IsoWorld'));
import Business from './components/Business';
import Clients from './components/Clients';
import Footer from './components/Footer';
import AboutOverlay from './components/AboutOverlay';
import AiInnovationLabOverlay from './components/AiInnovationLabOverlay';
import ContactOverlay from './components/ContactOverlay';
import BusinessOverlay from './components/BusinessOverlay';
import InsightsOverlay from './components/InsightsOverlay';
import Intro from './components/Intro';
import Manifesto from './components/Manifesto';
import VideoReel from './components/VideoReel';
import IntegratedSolutionOverlay from './components/IntegratedSolutionOverlay';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';

// Scroll-driven enter + exit per section — cinematic parallax feel
const ScrollSection: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.88, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.08, 0.88, 1], [40, 0, 0, -20]);
  return (
    <motion.div ref={ref} id={id} style={{ opacity, y }} className="snap-section">
      {children}
    </motion.div>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const rawCursorX = useMotionValue(-100);
  const rawCursorY = useMotionValue(-100);
  // Spring so cursor ring trails smoothly behind the dot
  const cursorX = useSpring(rawCursorX, { stiffness: 300, damping: 26, mass: 0.5 });
  const cursorY = useSpring(rawCursorY, { stiffness: 300, damping: 26, mass: 0.5 });

  const [introFinished, setIntroFinished] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);

  // Lenis smooth scroll
  const lenisRef = useRef<Lenis | null>(null);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Pause Lenis when overlays are open
  useEffect(() => {
    if (!lenisRef.current) return;
    if (activeOverlay) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [activeOverlay]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawCursorX.set(e.clientX);
      rawCursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  const handleNavClick = (id: string) => setActiveOverlay(id);
  const closeOverlay = () => setActiveOverlay(null);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#FFB800] selection:text-black cursor-none">

      {/* Intro Animation Layer */}
      <AnimatePresence mode="sync">
        {!introFinished && (
          <Intro onComplete={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-0">
        <Header
          onNavClick={handleNavClick}
          show={showHeader}
          introFinished={introFinished}
        />

        {/* Progress Bar */}
        {introFinished && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-[#FFB800] origin-left z-[60]"
            style={{ scaleX }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Custom Cursor */}
        <motion.div
          className="fixed top-0 left-0 w-7 h-7 border border-white/80 rounded-full pointer-events-none z-[9999] hidden md:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
            mixBlendMode: 'difference',
          }}
        />

        {/* Cursor dot */}
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />

        {/* --- OVERLAYS --- */}
        <AboutOverlay isOpen={activeOverlay === 'about'} onClose={closeOverlay} />
        <AiInnovationLabOverlay isOpen={activeOverlay === 'ai-lab'} onClose={closeOverlay} />
        <BusinessOverlay
          isOpen={activeOverlay === 'business'}
          onClose={closeOverlay}
          onAiLabClick={() => setActiveOverlay('ai-lab')}
          onIntegratedClick={() => setActiveOverlay('integrated-solution')}
        />
        <InsightsOverlay
          isOpen={activeOverlay === 'insights'}
          onClose={closeOverlay}
          onAiLabClick={() => setActiveOverlay('ai-lab')}
        />
        <ContactOverlay isOpen={activeOverlay === 'contact'} onClose={closeOverlay} />
        <IntegratedSolutionOverlay
          isOpen={activeOverlay === 'integrated-solution'}
          onClose={closeOverlay}
          onContactClick={() => setActiveOverlay('contact')}
        />

        <main>
          <Hero startAnimation={introFinished} />
          <VideoReel />
          <Manifesto />
          <ScrollSection>
            <Clients />
          </ScrollSection>
          <ScrollSection id="isoworld">
            <Suspense fallback={<div className="h-screen w-full bg-black" />}>
              <IsoWorld onAiLabClick={() => setActiveOverlay('ai-lab')} />
            </Suspense>
          </ScrollSection>
          <ScrollSection>
            <Business
              onAiLabClick={() => setActiveOverlay('ai-lab')}
              onIntegratedClick={() => setActiveOverlay('integrated-solution')}
            />
          </ScrollSection>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
