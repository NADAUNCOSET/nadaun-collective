import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import './company-pages.css';

const EASE = [0.16, 1, 0.3, 1] as const;
type SectionLink = { id: string; label: string };
interface CompanyOverlayProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  sections?: SectionLink[];
  startSection?: string;
}

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .06 }} transition={{ duration: .45, ease: EASE }}>{children}</motion.div>;
}

export function ContactLine({ onClick }: { onClick?: () => void }) {
  if (!onClick) return null;
  return <footer className="cp-contact"><div><p className="cp-label">Start a conversation</p><h2>다음 프로젝트를<br className="cp-mobile-break"/> 이야기해 주세요.</h2></div><button type="button" onClick={onClick} className="cp-text-link">Contact <ArrowUpRight size={20} strokeWidth={1.5}/></button></footer>;
}

export default function CompanyOverlay({ title, onClose, children, sections = [], startSection }: CompanyOverlayProps) {
  const root = useRef<HTMLElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    close.current?.focus({ preventScroll: true });
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab') return;
      const nodes = Array.from(root.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]') ?? []).filter(el => el.getClientRects().length > 0);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (!first) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', keydown);
    return () => { window.removeEventListener('keydown', keydown); if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, [onClose]);
  useEffect(() => {
    if (!startSection) return;
    const frame = requestAnimationFrame(() => {
      const section = root.current?.querySelector<HTMLElement>(`#${startSection}`);
      section?.scrollIntoView({ block: 'start', behavior: 'auto' });
      section?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [startSection]);
  const jump = (id: string) => {
    const section = root.current?.querySelector<HTMLElement>(`#${id}`);
    section?.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
    section?.focus({ preventScroll: true });
  };
  return <motion.section ref={root} className="company-page" role="dialog" aria-modal="true" aria-label={`NADAUN ${title}`} initial={reduce ? false : { y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .35, ease: EASE }}>
    <header className="cp-header"><span className="cp-brand">NADAUN COLLECTIVE <span>{title}</span></span><nav aria-label={`${title} sections`}>{sections.map(section => <button key={section.id} type="button" onClick={() => jump(section.id)}>{section.label}</button>)}</nav><button ref={close} type="button" className="cp-close" onClick={onClose} aria-label={`${title} 닫기`}><X size={21} strokeWidth={1.5}/></button></header>
    <div className="cp-container">{children}</div>
  </motion.section>;
}
