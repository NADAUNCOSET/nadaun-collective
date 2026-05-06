import React, { useEffect, useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
const IsoWorld = lazy(() => import('./components/IsoWorld'));
import Business from './components/Business';
import Clients from './components/Clients';
import Work from './components/Work';
import Insights from './components/Insights';
import Footer from './components/Footer';
import AboutOverlay from './components/AboutOverlay';
import AiInnovationLabOverlay from './components/AiInnovationLabOverlay';
import ContactOverlay from './components/ContactOverlay';
import Overlay from './components/Overlay';
import Intro from './components/Intro';
import Manifesto from './components/Manifesto';
import IntegratedSolutionOverlay from './components/IntegratedSolutionOverlay';
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';

// Wraps each major section with a scroll-triggered slide-up entrance
const ScrollSection: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // PERFORMANCE FIX: Use MotionValue instead of State for cursor
  // This prevents the entire App from re-rendering on every mouse move
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const [introFinished, setIntroFinished] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  // Overlay States
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Directly update motion values without triggering React render cycle
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorX, cursorY]);

  const handleNavClick = (id: string) => {
    setActiveOverlay(id);
  };

  const closeOverlay = () => {
    setActiveOverlay(null);
  };

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
            className="fixed top-0 left-0 right-0 h-1 bg-[#FFB800] origin-left z-[60]"
            style={{ scaleX }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        
        {/* Custom Cursor - Optimized with Motion Values */}
        <motion.div 
          className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none mix-blend-difference z-[9999] hidden md:block"
          style={{ 
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%'
          }}
        />
        
        {/* --- OVERLAYS --- */}
        <AboutOverlay isOpen={activeOverlay === 'about'} onClose={closeOverlay} />
        
        <AiInnovationLabOverlay isOpen={activeOverlay === 'ai-lab'} onClose={closeOverlay} />
        
        <Overlay isOpen={activeOverlay === 'business'} onClose={closeOverlay} title="Business Domain">
           <Business 
             onAiLabClick={() => setActiveOverlay('ai-lab')} 
             onIntegratedClick={() => setActiveOverlay('integrated-solution')}
           />
        </Overlay>

        <Overlay isOpen={activeOverlay === 'work'} onClose={closeOverlay} title="Selected Works">
           <Work isOverlay={true} />
        </Overlay>

        <Overlay isOpen={activeOverlay === 'insights'} onClose={closeOverlay} title="AI Insights">
           <Insights onAiLabClick={() => setActiveOverlay('ai-lab')} />
        </Overlay>

        <ContactOverlay isOpen={activeOverlay === 'contact'} onClose={closeOverlay} />
        
        <IntegratedSolutionOverlay 
          isOpen={activeOverlay === 'integrated-solution'} 
          onClose={closeOverlay} 
          onContactClick={() => setActiveOverlay('contact')}
        />

        <main>
          <Hero startAnimation={introFinished} />
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