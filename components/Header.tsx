import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'ABOUT', id: 'about' },
  { label: 'BUSINESS', id: 'business' },
  { label: 'INSIGHTS', id: 'insights' },
];

interface HeaderProps {
  onNavClick: (id: string) => void;
  show?: boolean;
  introFinished?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNavClick, show = true, introFinished = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavClick(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6 md:py-8'
        }`}
      >
        {/* padding synced to COLLECTIVE text edges via --header-pad CSS var set in Hero */}
        <div
          className="flex justify-between items-center w-full transition-[padding] duration-300 ease-out"
          style={{ paddingLeft: 'var(--header-pad, 1.5rem)', paddingRight: 'var(--header-pad, 1.5rem)' }}
        >
          {/* Logo Section */}
          <motion.a
            href="#"
            className="flex items-center gap-2 z-50 relative cursor-pointer select-none"
            initial={{ y: 100 }}
            animate={introFinished ? { y: 0 } : { y: 100 }}
            transition={{ duration: 0.281, ease: [0.22, 1, 0.36, 1], delay: 0.032 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-extrabold text-white leading-none tracking-tight">
                NADAUN
              </span>
              <span className="text-2xl md:text-3xl font-light leading-none tracking-tight" style={{ color: '#FFB800' }}>
                COLLECTIVE
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            <motion.nav 
              className="flex items-center space-x-12"
              initial={{ opacity: 0 }}
              animate={introFinished ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.234, delay: 0.096 }}
            >
              {navItems.map((item) => (
                <button 
                  key={item.label} 
                  onClick={(e) => handleItemClick(item.id, e)}
                  className="text-lg font-bold tracking-widest text-white hover:text-[#FFB800] transition-colors relative group cursor-pointer"
                >
                  {item.label}
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#FFB800] scale-x-0 group-hover:scale-x-100 transition-transform origin-right group-hover:origin-left duration-300"></span>
                </button>
              ))}
            </motion.nav>

            {/* CONTACT BUTTON */}
            <motion.button 
              onClick={(e) => handleItemClick('contact', e)}
              initial={{ y: 100 }}
              animate={introFinished ? { y: 0 } : { y: 100 }}
              transition={{ duration: 0.281, ease: [0.22, 1, 0.36, 1], delay: 0.064 }}
              className="group relative z-[60] cursor-pointer flex items-center justify-center overflow-hidden bg-white hover:bg-[#FFB800] transition-colors duration-300 px-6 py-2 rounded-full"
            >
              <span className="text-sm font-bold tracking-widest text-black transition-colors">
                CONTACT
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <button 
            className="md:hidden z-50 text-white hover:text-[#FFB800] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.234, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col space-y-8 text-center">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={(e) => handleItemClick(item.id, e)}
                  className="text-5xl font-bold tracking-tighter text-white hover:text-[#FFB800] transition-colors flex items-center justify-center gap-4 group cursor-pointer"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-8"><ArrowRight /></span>
                  {item.label}
                </button>
              ))}
               <button
                  onClick={(e) => handleItemClick('contact', e)}
                  className="text-5xl font-bold tracking-tighter text-[#FFB800] flex items-center justify-center gap-4 mt-8"
                >
                  CONTACT
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;