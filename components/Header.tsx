import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'ABOUT', id: 'about' },
  { label: 'PORTFOLIO', id: 'portfolio' },
];
interface HeaderProps { onNavClick: (id: string) => void; show?: boolean; introFinished?: boolean; activeSection?:string|null; onHome?:()=>void; }

const Header: React.FC<HeaderProps> = ({ onNavClick, introFinished = true, activeSection, onHome }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 50);
    update(); window.addEventListener('scroll', update, { passive:true });
    return () => window.removeEventListener('scroll', update);
  }, []);
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
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-[300] transition-colors ${isScrolled || activeSection ? 'border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-md' : 'bg-[#1a1a1a] lg:bg-transparent'}`} style={{ opacity:introFinished ? 1 : 0, visibility:introFinished ? 'visible' : 'hidden', transition:'opacity .25s' }}>
      <div className="h-16 lg:h-[76px] px-4 lg:px-[var(--header-pad,1.5rem)] flex items-center justify-between gap-4">
        <a href="#" onClick={(event)=>{event.preventDefault();setIsMenuOpen(false);onHome?.();window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}} aria-label="NADAUN COLLECTIVE 홈" className="flex items-center gap-2 min-h-[44px] shrink-0">
          <img src="/nadaun_logo.png" alt="" width="80" height="40" className="lg:hidden w-20 h-10 object-contain brightness-0 invert" />
          <span className="hidden lg:inline text-3xl font-extrabold text-white leading-none tracking-tight">NADAUN</span>
          <span className="text-[10px] lg:text-3xl font-medium lg:font-light leading-none tracking-normal lg:tracking-tight text-white/50 lg:text-[#FFB800]">COLLECTIVE</span>
        </a>
        <div className="hidden lg:flex items-center gap-10">
          <nav aria-label="Main navigation" className="flex items-center gap-10">
            {navItems.map(item => <button key={item.id} type="button" aria-current={item.id===activeSection?'page':undefined} onClick={() => navigate(item.id)} className={`min-h-[44px] text-lg font-bold tracking-normal transition-colors ${item.id === (activeSection || 'portfolio') ? 'text-[#FFB800] hover:text-white' : 'text-white hover:text-[#FFB800]'}`}>{item.label}</button>)}
          </nav>
          <button type="button" onClick={() => navigate('contact')} className="min-h-[44px] px-6 py-2 rounded-full bg-white text-[#1a1a1a] text-sm font-bold tracking-normal hover:bg-[#FFB800] transition-colors">CONTACT</button>
        </div>
        <div className="flex lg:hidden items-center gap-2">
          <button type="button" onClick={() => navigate('contact')} className="min-h-[44px] px-2 text-xs font-medium text-white hover:text-[#FBB200] transition-colors">Contact</button>
          <button ref={menuRef} type="button" aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-11 h-11 flex items-center justify-center text-white">
            {isMenuOpen ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
          </button>
        </div>
      </div>
      {isMenuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="lg:hidden absolute top-full right-4 mt-2 w-64 p-4 bg-[#222] border border-white/10 shadow-lg">
        {navItems.map(item => <button key={item.id} type="button" aria-current={item.id===activeSection?'page':undefined} onClick={() => navigate(item.id)} className="block w-full min-h-[48px] px-3 text-left text-sm font-medium tracking-normal text-white/70 hover:text-[#FBB200] transition-colors">{item.label}</button>)}
      </nav>}
    </header>
  );
};
export default Header;
