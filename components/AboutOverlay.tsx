import React from 'react';
import CompanyOverlay, { ContactLine, Reveal } from './CompanyOverlay';

const TIMELINE = [
  ['2020', '사진 장비 판매샵'], ['2021', '기자재 유통'], ['2022', '렌탈샵 확장'],
  ['2023', '브랜드 필름 · VCR 제작'], ['2024', '난컴퍼니 MCN 설립'],
  ['2025', 'TVC 송출 · 오프라인 광고'], ['2026', 'ALL IN ONE 솔루션'],
];
const PARTNERS = [
  'SAMSUNG', 'HD HYUNDAI', 'HYUNDAI STEEL', 'KIA', 'EMIRATES', 'PEPSI', 'COWAY',
  'AMOREPACIFIC', 'DIOR BEAUTY', 'CALVIN KLEIN', 'OLIVE YOUNG', 'NUMBUZIN',
  'DASIQUE', 'SKINFOOD', 'TONYMOLY', 'ABIB', 'SKIN1004', 'JUNG SAEM MOOL',
  'GAONCHIPS', 'HECTO INNOVATION', 'ACMÉ DE LA VIE', 'THE NEW GREY', 'NUDAKE',
  'ELLE', 'THE MATTERS', 'M2', 'AENTIO', 'PAT', 'K2 SAFETY', 'KWDA', 'KOVA',
  'BEREX', 'PREED', 'MIRAEMI', '3 HOURS AHEAD', 'CESTI', 'ROOTONIX',
];
const PRINCIPLES = [
  { label: 'Strategy', title: '목적을 먼저 정의합니다.', body: '브랜드의 과제와 콘텐츠의 역할을 정리합니다. 타깃, 메시지, 활용 채널을 제작의 공통 기준으로 삼습니다.' },
  { label: 'Production', title: '현장에서 완성도를 만듭니다.', body: '사진 장비와 기자재에 대한 이해를 바탕으로 촬영, 연출, 후반 제작을 연결합니다. 결과물의 사용 환경까지 제작 과정에 반영합니다.' },
  { label: 'Connection', title: '제작 이후까지 연결합니다.', body: '커머스와 유통, 방송과 디지털 매체까지 브랜드가 고객을 만나는 접점을 함께 설계합니다. 소재와 채널을 하나의 실행 흐름으로 조율합니다.' },
];
interface AboutOverlayProps { isOpen: boolean; onClose: () => void; onContactClick?: () => void; }
export default function AboutOverlay({ isOpen, onClose, onContactClick }: AboutOverlayProps) {
  if (!isOpen) return null;
  return <CompanyOverlay title="About" onClose={onClose} sections={[{ id:'about-overview',label:'Overview' },{ id:'about-history',label:'History' },{ id:'about-partners',label:'Partners' }]}>
    <section id="about-overview" tabIndex={-1} className="cp-hero">
      <div><p className="cp-label accent">Since 2020 · Seoul</p><h1 className="cp-title">기획에서 제작,<br/>시장과의 <em>접점까지.</em></h1></div>
      <p className="cp-description">나다운 컬렉티브는 사진·영상 제작을 중심으로 커머스, 유통, 매체 실행을 연결하는 콘텐츠 솔루션 그룹입니다. 장비와 현장에 대한 이해를 브랜드의 표현력으로 확장하며, 기획부터 결과물이 쓰이는 순간까지 함께합니다.</p>
    </section>
    <figure style={{ margin:'0 0 56px' }}><img className="cp-image cp-about-image" src="/hero/hd-hyundai.webp" alt="HD현대 기업 행사 공간과 무대" width="1000" height="667" decoding="async"/><figcaption className="cp-caption"><span>NADAUN COLLECTIVE</span><span>Photography · Film · Media</span></figcaption></figure>
    <section className="cp-section"><div className="cp-section-heading"><p className="cp-label">Our approach</p><h2>서로 다른 전문성을<br/>하나의 제작 기준으로.</h2></div><div className="cp-principles">{PRINCIPLES.map(item=><Reveal key={item.label}><article><p className="cp-label accent">{item.label}</p><h3>{item.title}</h3><p>{item.body}</p></article></Reveal>)}</div></section>
    <section id="about-history" tabIndex={-1} className="cp-section cp-split"><div><p className="cp-label">Our history</p><h2>현장에서 시작해,<br/>사업의 영역을 넓히다.</h2></div><dl className="cp-history">{TIMELINE.map(([year,title])=><div key={year}><dt>{year}</dt><dd>{title}</dd></div>)}</dl></section>
    <section id="about-partners" tabIndex={-1} className="cp-section"><div className="cp-section-heading"><p className="cp-label">Selected clients & partners</p><h2>함께 만든 장면들.</h2></div><ul className="cp-partners">{PARTNERS.map(name=><li key={name}>{name}</li>)}</ul></section>
    <section className="cp-section cp-network"><div><p className="cp-label accent">IP Connect · Global network</p><h2>서울을 기반으로,<br/>세계의 접점까지.</h2><p className="cp-description">국내 제작과 전국 매체 송출에서 글로벌 에이전시 네트워크까지. 프로젝트의 시장과 목적에 맞춰 제작, 콘텐츠, 미디어를 연결합니다.</p></div><ul className="cp-cities">{['Tokyo','Beijing','Singapore','Sydney','Mumbai','Dubai','London','Paris','New York','Los Angeles','São Paulo'].map(city=><li key={city}>{city}</li>)}</ul></section>
    <ContactLine onClick={onContactClick}/>
  </CompanyOverlay>;
}
