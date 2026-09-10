import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { InsightsScrollContext, ScrollSequence, SceneObject } from './InsightsMotion';
import './insights-motion.css';

const EASE = [0.16, 1, 0.3, 1] as const;
const LIVERNOVO_POSTER = 'https://media.nadaun.co/video/%EA%B0%80%EB%A1%9C/20251020%20Livernovo%20v1%2015s%20final_%20WEB%20HIGH%20AD_1080p.jpg';
const PP = [
  { channel:'JTBC4', count:336 }, { channel:'OCN Movies2', count:243 },
  { channel:'OCN Movies', count:230 }, { channel:'OCN', count:227 },
  { channel:'JTBC', count:130 }, { channel:'tvN', count:130 },
];
const IPTV = [{ channel:'KT LiveAD', impressions:'468만' }, { channel:'LG ART', impressions:'396만' }, { channel:'SK SBA', impressions:'342만' }];
const WORK = [
  { name:'ROYAL SALUTE', type:'Brand photography', src:'/hero/royal-salute.webp', alt:'로얄살루트 제품 전시 사진', href:'https://photo.nadaun.co' },
  { name:'PEPSI FESTA', type:'Live experience', src:'/hero/pepsi-festa.webp', alt:'펩시 페스타 무대와 브랜드 그래픽', href:'https://video.nadaun.co' },
  { name:'HD HYUNDAI', type:'Corporate communication', src:'/hero/hd-hyundai.webp', alt:'HD현대 신년 행사 공간과 무대', href:'https://photo.nadaun.co' },
  { name:'LIVERNOVO', type:'TVC & media', src:LIVERNOVO_POSTER, alt:'리버노보 광고 영상 스틸', href:'https://video.nadaun.co' },
];
const PROCESS = [
  { number:'01', title:'비즈니스 과제의 정의', en:'Strategy', body:'제품의 구매 이유, 고객의 의사결정 과정, 캠페인의 역할을 먼저 정리합니다. 브랜드 인지와 구매 전환의 목표를 구분하고, 타깃·메시지·콘텐츠·매체가 같은 방향을 향하도록 실행 기준을 세웁니다.', detail:'과제 정의 · 타깃 · 메시지 구조 · KPI 설계' },
  { number:'02', title:'채널을 고려한 제작', en:'Creative', body:'사진의 제품 정보와 인물 표현, 영상의 서사와 리듬을 하나의 브랜드 언어로 연결합니다. 기획 단계부터 지면·방송·디지털의 규격과 노출 환경을 반영해 촬영, 편집, 그래픽, 소재별 버전을 설계합니다.', detail:'사진 · 브랜드 필름 · TVC · 채널별 소재' },
  { number:'03', title:'매체 집행과 성과 해석', en:'Media', body:'타깃과 캠페인 목적에 맞춰 매체, 편성, 소재 운영을 조합합니다. 집행 후에는 계약 대비 송출과 매체별 노출을 확인하고, 도달·반응·매출을 서로 다른 성과 단계로 구분해 다음 실행에 반영합니다.', detail:'미디어 플랜 · 소재 운영 · 집행 검수 · 리포팅' },
];

interface InsightsOverlayProps { isOpen:boolean; onClose:()=>void; onContactClick?:()=>void; }
export default function InsightsOverlay({isOpen,onClose,onContactClick}:InsightsOverlayProps) {
  const reduce=useReducedMotion();
  const scrollRef=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({container:scrollRef});
  const jump=(index:number)=>{
    const scroller=scrollRef.current;
    const target=scroller?.querySelector<HTMLElement>(`[data-nav-scene="${index}"]`);
    if(!scroller||!target)return;
    scroller.scrollTo({top:target.getBoundingClientRect().top-scroller.getBoundingClientRect().top+scroller.scrollTop-64,behavior:reduce?'auto':'smooth'});
  };
  useEffect(()=>{
    if(!isOpen)return;
    const key=(event:KeyboardEvent)=>{if(event.key==='Escape')onClose();};
    window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
  },[isOpen,onClose]);
  if(!isOpen)return null;
  const scenes=[
    <div className="insights-scene-intro" key="intro"><div><p className="insight-kicker">Creative · Media · Business</p><h1>콘텐츠의 힘.<br/>비즈니스의 성과<span className="insight-gold">.</span></h1><p className="insight-body">크리에이티브의 완성도를 비즈니스의 성과로 연결합니다. 사진·영상 제작과 매체 운영에 일관된 기준을 적용해 브랜드 메시지가 고객 접점에서 명확하게 전달되도록 설계합니다.</p></div><div className="insights-visual"><img src="/hero/royal-salute.webp" alt="로얄살루트 제품 촬영" width="667" height="1000" decoding="async"/><div><img src="/hero/pepsi-festa.webp" alt="펩시 페스타 무대" width="1000" height="667" decoding="async"/><img src={LIVERNOVO_POSTER} alt="리버노보 TVC 영상 스틸" width="1920" height="1080" decoding="async"/></div></div></div>,
    <div className="insights-impact-content" key="impact"><div><p className="insight-kicker">Business impact</p><p className="insights-impact-number">3,000<span className="insight-unit">억 원</span><span className="insight-gold">+</span></p><p className="insight-body">사진·영상·매체 프로젝트의 누적 매출 성과</p></div><div><h2>브랜드가 보여야 할 장면과<br/>고객이 선택할 이유를 연결합니다.</h2><p className="insight-body">콘텐츠는 고객 접점에서 역할을 수행해야 합니다. 제품의 차별성을 보여주는 사진, 메시지의 맥락을 전달하는 영상, 적절한 시점에 도달하는 매체를 연결해 비즈니스의 실행력을 높입니다.</p></div></div>,
    ...PROCESS.map(item=><div className="insight-process" key={item.number}><p className="insight-kicker">How we work · {item.number} / 03</p><div className="insight-process-layout"><div><p className="insight-process-en">{item.en}<span className="insight-gold">.</span></p><h2>{item.title}</h2></div><div><p className="insight-body">{item.body}</p><p className="insight-detail">{item.detail}</p></div></div></div>),
    <div key="work" className="insight-work"><div className="insight-heading-row"><div><p className="insight-kicker">Selected work</p><h2>실행의 장면들.</h2></div><p className="insight-caption">제품의 차별성, 브랜드 경험, 기업의 메시지.<br/>목적과 접점에 따라 제작의 언어를 조율합니다.</p></div><div className="insight-work-grid">{WORK.map((work,index)=><SceneObject key={work.name} order={index}><a href={work.href} target="_blank" rel="noreferrer"><div><img src={work.src} alt={work.alt} loading="lazy" decoding="async"/></div><h3>{work.name}<ArrowUpRight size={16}/></h3><p>{work.type}</p></a></SceneObject>)}</div></div>,
    <div key="case" className="insight-case"><p className="insight-kicker">Media case study · 2025.10.22 — 11.21</p><h2 className="insight-large-title">LIVERNOVO<br/>TVC 캠페인<span className="insight-gold">.</span></h2><p className="insight-body">남·여 15초 소재 2편을 PP, IPTV 3사, 케이블과 재핑 매체에 집행했습니다. 계약 대비 송출 이행과 매체별 집계 결과를 구분해 캠페인의 실행 성과를 확인합니다.</p><div className="insight-metrics">{[
      {n:'1,296',unit:'회',label:'PP 실제 송출',detail:'계약 311회 대비 416.7% 달성'},
      {n:'1,206',unit:'만',label:'IPTV 광고 노출',detail:'KT · LG · SK 3사 합산'},
      {n:'2,984',unit:'만 가구',label:'재핑 도달 가구',detail:'딜라이브 케이블 집계'},
      {n:'322',unit:'회',label:'케이블 송출',detail:'심포니 · 계약 262회'},
    ].map(k=><div key={k.label}><p className="insight-metric-value">{k.n}<span>{k.unit}</span></p><h3>{k.label}</h3><p>{k.detail}</p></div>)}</div></div>,
    <div key="report" className="insight-report"><p className="insight-kicker">LIVERNOVO · Media delivery</p><h2>매체별 집행 기록.</h2><div className="insight-report-grid"><div><h3>PP 채널별 송출</h3>{PP.map(row=><div key={row.channel} className="insight-bar"><span>{row.channel}</span><span className="insight-bar-track"><span style={{width:(row.count/336*100)+'%'}}/></span><span>{row.count}회</span></div>)}</div><div><h3>IPTV 사업자별 광고 노출</h3>{IPTV.map(row=><div key={row.channel} className="insight-iptv"><span>{row.channel}</span><strong>{row.impressions}</strong></div>)}</div></div><p className="insight-source">집계 기준: LIVERNOVO 캠페인 운영 리포트, 2025.11.25. 노출 건수와 도달 가구는 집계 단위가 다르므로 합산하지 않습니다. 매체 간 중복을 제거한 순도달 또는 구매 전환을 의미하지 않으며, 상단의 누적 매출 성과와 별도의 지표입니다.</p></div>,
    <div key="principles" className="insight-principles"><p className="insight-kicker">Measurement principles</p><h2>좋은 리포트는<br/>지표의 경계를 명확히 합니다.</h2><div>{[
      ['집행 이행','계약 편수, 실제 송출, 기간과 소재를 대조해 계획이 어떻게 실행되었는지 확인합니다.'],
      ['미디어 성과','노출과 도달의 정의, 집계 단위, 중복 처리 범위를 명시해 서로 다른 매체를 해석합니다.'],
      ['비즈니스 성과','매출·전환 데이터의 측정 기간과 귀속 기준을 정한 뒤 콘텐츠와 매체의 기여를 검토합니다. 노출 수만으로 매출 효과를 단정하지 않습니다.'],
    ].map(([title,body])=><section key={title}><h3>{title}</h3><p className="insight-body">{body}</p></section>)}</div></div>,
    <div key="contact" className="insight-final"><p className="insight-kicker">Next project</p><h2 className="insight-large-title">다음 비즈니스 과제,<br/>함께 설계하겠습니다.</h2><button onClick={()=>{onClose();onContactClick?.();}}>프로젝트 문의하기 <ArrowUpRight size={20}/></button></div>,
  ];
  return <InsightsScrollContext.Provider value={scrollRef}><motion.section ref={scrollRef} role="dialog" aria-modal="false" aria-label="NADAUN Insights" className="insight-page fixed inset-0 z-[105] overflow-y-auto overflow-x-hidden bg-[var(--nadaun-bg)] text-[var(--nadaun-text)]" initial={reduce?false:{y:'100%'}} animate={{y:0}} transition={{duration:.4,ease:EASE}}>
    <header className="insight-header"><motion.div className="insight-progress" aria-hidden="true" style={{scaleX:scrollYProgress}}/><span>INSIGHTS</span><nav className="insights-jumps" aria-label="Insights sections"><button onClick={()=>jump(1)}>Impact</button><button onClick={()=>jump(5)}>Work</button><button onClick={()=>jump(6)}>Case study</button></nav><button className="insight-close" type="button" onClick={onClose} aria-label="인사이트 닫기"><X size={20} strokeWidth={1.5}/></button></header>
    <ScrollSequence scenes={scenes}/>
  </motion.section></InsightsScrollContext.Provider>;
}
