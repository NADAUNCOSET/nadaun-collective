import React, { useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { InsightsScrollContext, ScrollSequence, SceneObject, SceneType, SceneBar } from './InsightsMotion';
import './insights-motion.css';

const EASE = [0.16, 1, 0.3, 1] as const;
const PP = [
  { channel:'JTBC4', count:336 }, { channel:'OCN Movies2', count:243 },
  { channel:'OCN Movies', count:230 }, { channel:'OCN', count:227 },
  { channel:'JTBC', count:130 }, { channel:'tvN', count:130 },
];
const IPTV = [{ channel:'KT LiveAD', impressions:'468만' }, { channel:'LG ART', impressions:'396만' }, { channel:'SK SBA', impressions:'342만' }];
interface InsightsOverlayProps { isOpen:boolean; onClose:()=>void; onContactClick?:()=>void; }
export default function InsightsOverlay({isOpen,onClose,onContactClick}:InsightsOverlayProps) {
  const scrollRef=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({container:scrollRef});
  const jump=(index:number)=>{
    const scroller=scrollRef.current;
    const target=scroller?.querySelector<HTMLElement>(`[data-nav-scene="${index}"]`);
    if(!scroller||!target)return;
    scroller.scrollTo({top:target.getBoundingClientRect().top-scroller.getBoundingClientRect().top+scroller.scrollTop,behavior:'smooth'});
  };
  useEffect(()=>{
    if(!isOpen)return;
    const key=(event:KeyboardEvent)=>{if(event.key==='Escape')onClose();};
    window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
  },[isOpen,onClose]);
  if(!isOpen)return null;
  const scenes=[
    <div className="insights-impact-content" key="impact"><div><p className="insight-kicker">MARKETING · BUSINESS IMPACT</p><SceneType as="h1" className="insight-results-title">마케팅의 실행과 성과.</SceneType><p className="insights-impact-number">3,000<span className="insight-unit">억 원</span><span className="insight-gold">+</span></p><SceneType as="p" className="insight-body">사진·영상·매체 프로젝트의 누적 매출 성과</SceneType><p className="insight-source">나다운 제공 누적 성과. 개별 캠페인의 송출·노출 지표와 별도로 관리합니다.</p></div><figure className="insight-impact-image"><img src="/hero/pepsi-festa.webp" alt="펩시 페스타의 무대와 브랜드 콘텐츠" decoding="async"/><figcaption>PEPSI FESTA · 콘텐츠 제작</figcaption></figure></div>,
    <div key="case" className="insight-case"><p className="insight-kicker">Media case study · 2025.10.22 — 11.21</p><SceneType className="insight-large-title">LIVERNOVO<br/>TVC 캠페인<span className="insight-gold">.</span></SceneType><SceneType as="p" order={2} className="insight-body">남·여 15초 소재 2편을 PP, IPTV 3사, 케이블과 재핑 매체에 집행했습니다. 계약 대비 송출 이행과 매체별 집계 결과를 구분해 캠페인의 실행 성과를 확인합니다.</SceneType><div className="insight-metrics">{[
      {n:'1,296',unit:'회',label:'PP 실제 송출',detail:'계약 311회 대비 416.7% 달성'},
      {n:'1,206',unit:'만',label:'IPTV 광고 노출',detail:'KT · LG · SK 3사 합산'},
      {n:'2,984',unit:'만 가구',label:'재핑 도달 가구',detail:'딜라이브 케이블 집계'},
      {n:'322',unit:'회',label:'케이블 송출',detail:'심포니 · 계약 262회'},
    ].map((k,index)=><SceneObject key={k.label} order={index}><div><p className="insight-metric-value">{k.n}<span>{k.unit}</span></p><h3>{k.label}</h3><p>{k.detail}</p></div></SceneObject>)}</div></div>,
    <div key="report" className="insight-report"><p className="insight-kicker">LIVERNOVO · Media delivery</p><SceneType>매체별 집행 기록.</SceneType><div className="insight-report-grid"><div><h3>PP 채널별 송출</h3>{PP.map(row=><div key={row.channel} className="insight-bar"><span>{row.channel}</span><span className="insight-bar-track"><SceneBar ratio={row.count/336}/></span><span>{row.count}회</span></div>)}</div><div><h3>IPTV 사업자별 광고 노출</h3>{IPTV.map(row=><div key={row.channel} className="insight-iptv"><span>{row.channel}</span><strong>{row.impressions}</strong></div>)}</div></div><p className="insight-source">집계 기준: LIVERNOVO 캠페인 운영 리포트, 2025.11.25. 노출 건수와 도달 가구는 집계 단위가 다르므로 합산하지 않습니다. 매체 간 중복을 제거한 순도달 또는 구매 전환을 의미하지 않으며, 상단의 누적 매출 성과와 별도의 지표입니다.</p></div>,
    <div key="cellreturn" className="insight-case-editorial"><div><p className="insight-kicker">STARLOGIN · Launch communication</p><SceneType>셀리턴 플래티넘<br/>론칭 커뮤니케이션.</SceneType><p className="insight-metric-value">815<span>건</span></p><h3>론칭쇼 현장 취재 기사</h3><SceneType as="p" order={2} className="insight-body">제품 공개 행사에 셀러브리티 초청과 언론 취재를 결합한 론칭 사례입니다. 행사 현장에서 생산된 보도량을 별도로 집계해 실행 결과를 기록했습니다.</SceneType><p className="insight-source">출처: STARLOGIN 소개자료(2022), 22쪽. 론칭쇼 참석 기자의 송출 기사만 포함한 자료상 집계이며, 미참석 기자의 기사는 제외합니다. 과거 STARLOGIN 수행 사례입니다.</p></div><figure><img src="/starlogin/cellreturn-launch-2022.jpeg" alt="STARLOGIN 소개자료에 수록된 셀리턴 제품 론칭 행사" loading="lazy" decoding="async"/><figcaption>STARLOGIN · CELLRETURN launch</figcaption></figure></div>,
    <div key="contact" className="insight-final"><p className="insight-kicker">Next project</p><SceneType className="insight-large-title">다음 비즈니스 과제,<br/>함께 설계하겠습니다.</SceneType><button onClick={()=>{onClose();onContactClick?.();}}>프로젝트 문의하기 <ArrowUpRight size={20}/></button></div>,
  ];
  return <InsightsScrollContext.Provider value={scrollRef}><motion.section ref={scrollRef} role="dialog" aria-modal="false" aria-label="NADAUN Insights" className="insight-page fixed inset-0 z-[105] overflow-y-auto overflow-x-hidden bg-[var(--nadaun-bg)] text-[var(--nadaun-text)]" initial={{y:'100%'}} animate={{y:0}} transition={{duration:.4,ease:EASE}}>
    <header className="insight-header"><motion.div className="insight-progress" aria-hidden="true" style={{scaleX:scrollYProgress}}/><span>INSIGHTS</span><nav className="insights-jumps" aria-label="Insights sections"><button onClick={()=>jump(0)}>Impact</button><button onClick={()=>jump(1)}>Case study</button><button onClick={()=>jump(2)}>Media</button></nav><button className="insight-close" type="button" onClick={onClose} aria-label="인사이트 닫기"><X size={20} strokeWidth={1.5}/></button></header>
    <ScrollSequence scenes={scenes}/>
  </motion.section></InsightsScrollContext.Provider>;
}
