import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'ABOUT', id: 'about' }, { label: 'BUSINESS', id: 'business' },
  { label: 'PORTFOLIO', id: 'portfolio' }, { label: 'INSIGHTS', id: 'insights' },
];
interface HeaderProps { onNavClick: (id: string) => void; show?: boolean; introFinished?: boolean; }

const Header: React.FC<HeaderProps> = ({ onNavClick, introFinished = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const navigate = (id: string) => { setIsMenuOpen(false); onNavClick(id); };
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setIsMenuOpen(false); menuRef.current?.focus(); } };
    const onOutside = (e: PointerEvent) => { if (!headerRef.current?.contains(e.target as Node)) setIsMenuOpen(false); };
    window.addEventListener('keydown', onKey); window.addEventListener('pointerdown', onOutside);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onOutside); };
  }, [isMenuOpen]);
  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-md" style={{ opacity:introFinished ? 1 : 0, visibility:introFinished ? 'visible' : 'hidden', transition:'opacity .25s' }}>
      <div className="h-16 md:h-[72px] px-4 md:px-8 flex items-center justify-between gap-4">
        <a href="#" aria-label="NADAUN COLLECTIVE 홈" className="flex items-center gap-3 min-h-[44px] shrink-0">
          <img src="/nadaun_logo.png" alt="NADAUN" width="100" height="40" className="w-20 md:w-[100px] h-10 object-contain brightness-0 invert" />
          <span className="hidden sm:inline text-[10px] font-medium tracking-[.15em] text-white/50">COLLECTIVE</span>
        </a>
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6">
          {navItems.map(item => <button key={item.id} type="button" onClick={() => navigate(item.id)} className="min-h-[44px] text-[11px] font-medium tracking-[.1em] text-white/60 transition-colors hover:text-white">{item.label}</button>)}
        </nav>
        <div className="flex items-center gap-2 md:gap-5">
          <button type="button" onClick={() => navigate('contact')} className="min-h-[44px] px-2 text-xs font-medium text-white hover:text-[#FBB200] transition-colors">Contact</button>
          <button ref={menuRef} type="button" aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-11 h-11 flex items-center justify-center text-white">
            {isMenuOpen ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
          </button>
        </div>
      </div>
      {isMenuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="lg:hidden absolute top-full right-4 mt-2 w-64 p-4 bg-[#222] border border-white/10 shadow-lg">
        {navItems.map(item => <button key={item.id} type="button" onClick={() => navigate(item.id)} className="block w-full min-h-[48px] px-3 text-left text-sm font-medium tracking-[.08em] text-white/70 hover:text-[#FBB200] transition-colors">{item.label}</button>)}
      </nav>}
    </header>
  );
};
export default Header;
