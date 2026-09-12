import React, { useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { X, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { InsightsScrollContext, ScrollStory, SceneLine, StoryMedia, ScrollReveal } from './InsightsMotion';
import './insights-motion.css';
import './marketing-motion.css';
interface Props {isOpen:boolean;onClose:()=>void;onBack:()=>void;onContactClick:()=>void;}
const BROADCAST = [
  { cat: '공영 · 지상파',     items: ['KBS', 'MBC', 'SBS', 'EBS'] },
  { cat: '지역 민방',         items: ['TBC', 'KNN', 'KBC', 'TJB', 'JTV', 'UBC', 'CJB', 'G1', 'JIBS'] },
  { cat: '종합편성',          items: ['JTBC', '채널A', 'TV조선', 'MBN'] },
  { cat: '케이블 PP',         items: ['tvN', 'tvN SHOW', 'OCN', 'ENA', 'Mnet', 'E채널', 'OtvN', '코미디TV', 'MBC every1', 'MBC ON', '채널S'] },
  { cat: '보도 전문',         items: ['YTN', '연합뉴스TV'] },
  { cat: 'IPTV',              items: ['KT 지니TV', 'SK Btv', 'LG U+tv'] },
  { cat: '위성 · 케이블 SO',  items: ['KT 스카이라이프', 'LG헬로비전', '딜라이브', 'CMB', 'HCN'] },
];

const BTL = [
  { label: '지하철 스크린도어', spec: '1,470 × 470mm · 전국 주요역', img: 'https://media.nadaun.co/collective/btl/01-subway.webp' },
  { label: '옥외 전광판',      spec: 'Full HD / 4K · 가로·세로형',  img: 'https://media.nadaun.co/collective/btl/02-outdoor.webp' },
  { label: '택시 미디어',      spec: '후면 LED · 측면 랩핑 · 전국', img: 'https://media.nadaun.co/collective/btl/03-taxi.webp' },
  { label: '버스 외부광고',    spec: '슈퍼사이드 · 풀백 · 측면랩',  img: 'https://media.nadaun.co/collective/btl/04-bus.webp' },
];

const OVERSEAS = [
  { label: '일본 · 중국', spec: '도쿄 · 오사카 · 상하이 옥외/디지털',  img: 'https://media.nadaun.co/collective/ad-media/overseas-01.webp' },
  { label: '동남아',      spec: '베트남 · 태국 · 인니 미디어 집행',     img: 'https://media.nadaun.co/collective/ad-media/overseas-02.webp' },
  { label: '미국 · 유럽', spec: '뉴욕 · LA · 런던 · 파리 캠페인',       img: 'https://media.nadaun.co/collective/ad-media/overseas-03.webp' },
  { label: '글로벌 팬덤', spec: 'K-POP 팬클럽 · 공항 · 글로벌 옥외',    img: 'https://media.nadaun.co/collective/ad-media/overseas-04.webp' },
];


export default function GlobalNetworkOverlay({isOpen,onClose,onBack,onContactClick}:Props) {
  const scrollRef=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({container:scrollRef});
  useEffect(()=>{if(!isOpen)return;const key=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[isOpen,onClose]);
  if(!isOpen)return null;
  return <InsightsScrollContext.Provider value={scrollRef}><motion.section ref={scrollRef} role="dialog" aria-label="미디어 · 매체" className="marketing-page collective-editorial fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden" initial={{y:'100%'}} animate={{y:0}} transition={{duration:.495,ease:[.22,1,.36,1]}}>
    <header className="marketing-header"><motion.div className="marketing-progress" style={{scaleX:scrollYProgress}}/><span>MARKETING · 미디어 · 매체</span><button onClick={onBack} aria-label="메인으로 돌아가기"><ArrowLeft size={18}/></button><button onClick={onClose} aria-label="미디어 상세 닫기"><X size={20}/></button></header>
    <div className="marketing-content">
      <ScrollStory intro={<div className="marketing-opening"><div><p className="marketing-kicker">Media network</p><h1><SceneLine visible>전국에서.</SceneLine><SceneLine order={1}>전세계로.</SceneLine></h1><p className="editorial-body">방송 · IPTV · 케이블 · 오프라인 BTL.<br/>브랜드와 타깃이 만나는 매체를 설계합니다.</p></div><StoryMedia src={BTL[0].img} alt={BTL[0].label} caption="Media · 지하철 스크린도어"/></div>} impact={<div className="marketing-statement"><p className="marketing-kicker">Nationwide · Global</p><h2>매체의 특성에 맞게.<br/>지역의 맥락에 맞게.</h2><p className="editorial-body">전국 방송과 오프라인 매체, 해외 미디어의 규격과 집행 조건을 검토합니다. 캠페인 목적과 지역별 접점을 기준으로 송출 계획을 구성합니다.</p></div>}/>
      <section className="marketing-media-section"><ScrollReveal><p className="marketing-kicker">Nationwide broadcast</p><h2>전국 방송 송출.</h2><p className="editorial-body">공영 · 지역민방 · 종편 · 케이블 · 보도 · IPTV · 위성</p></ScrollReveal><div className="marketing-broadcast">{BROADCAST.map(group=><ScrollReveal key={group.cat}><h3>{group.cat}</h3><p>{group.items.join(' · ')}</p></ScrollReveal>)}</div></section>
      {[{title:'오프라인 매체.',label:'Offline BTL',items:BTL},{title:'해외 광고.',label:'Overseas',items:OVERSEAS}].map(group=><section className="marketing-media-section" key={group.label}><ScrollReveal><p className="marketing-kicker">{group.label}</p><h2>{group.title}</h2></ScrollReveal><div className="marketing-media-grid">{group.items.map((item,i)=><ScrollReveal key={item.label}><figure><img src={item.img} alt={item.label} loading="lazy" decoding="async"/></figure><div><span>0{i+1}</span><h3>{item.label}</h3></div><p>{item.spec}</p></ScrollReveal>)}</div></section>)}
      <section className="marketing-final"><ScrollReveal><h2>브랜드가 닿을 곳을<br/>함께 설계합니다.</h2><button className="marketing-link" onClick={onContactClick}>광고 문의하기 <ArrowUpRight size={18}/></button></ScrollReveal></section>
    </div>
  </motion.section></InsightsScrollContext.Provider>;
}
