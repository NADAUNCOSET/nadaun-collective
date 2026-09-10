import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import CompanyOverlay from './CompanyOverlay';

const VIDEO_SITE = 'https://video.nadaun.co';
const PHOTO_SITE = 'https://photo.nadaun.co';
const film = (file:string) => ({ src:`https://media.nadaun.co/video/${encodeURIComponent('가로')}/${encodeURIComponent(file.replace(/\.mp4$/,'.jpg'))}`,href:`${VIDEO_SITE}/?lib=${encodeURIComponent('가로')}&video=${encodeURIComponent(file)}` });
const WORK = [
  { title:'PEPSI FESTA', type:'Film', detail:'Live experience · Sketch film', ...film('20241022 PEPSI FESTA SKETCH FILM v3_1080p.mp4') },
  { title:'ROYAL SALUTE', type:'Photography', detail:'Brand experience', src:'/hero/royal-salute.webp',href:PHOTO_SITE },
  { title:'LIVERNOVO', type:'Film', detail:'TVC · Commercial', ...film('20251020 Livernovo v1 15s final_ WEB HIGH AD_1080p.mp4') },
  { title:'HD HYUNDAI', type:'Photography', detail:'Corporate communication', src:'/hero/hd-hyundai.webp',href:PHOTO_SITE },
  { title:'HYUNDAI', type:'Film', detail:'HMG Driving Experience', ...film('Hyundai Driving Experience｜HMG 드라이빙 익스피리언스 AD_1080p.mp4') },
  { title:'BANYAN TREE', type:'Photography', detail:'Corporate event', src:'/hero/banyan-tree.webp',href:PHOTO_SITE },
];
interface PortfolioOverlayProps { isOpen:boolean; onClose:()=>void; }
export default function PortfolioOverlay({isOpen,onClose}:PortfolioOverlayProps) {
  const [active,setActive] = useState('All');
  if(!isOpen) return null;
  const works = WORK.filter(item=>active==='All'||item.type===active);
  return <CompanyOverlay title="Portfolio" onClose={onClose}>
    <section className="cp-hero cp-work-hero"><div><p className="cp-label accent">Selected work</p><h1 className="cp-work-title">OUR WORK<span>.</span></h1></div><p className="cp-description">브랜드 캠페인, 기업 커뮤니케이션, 라이브 경험.<br/>사진과 영상으로 완성한 나다운의 작업을 만나보세요.</p></section>
    <div className="cp-work-toolbar"><div className="cp-work-tabs" role="group" aria-label="Work format">{['All','Film','Photography'].map(type=><button key={type} type="button" aria-pressed={active===type} onClick={()=>setActive(type)}>{type}</button>)}</div><div className="cp-work-links"><a className="cp-text-link" href={VIDEO_SITE} target="_blank" rel="noopener noreferrer">All films <ArrowUpRight size={16}/></a><a className="cp-text-link" href={PHOTO_SITE} target="_blank" rel="noopener noreferrer">All photography <ArrowUpRight size={16}/></a></div></div>
    <div className="cp-work-grid">{works.map((item,i)=><a key={item.title} className="cp-work-card" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} · ${item.type}${item.type==='Film'?' 재생':' 포토 포트폴리오'}`}><figure><div className="cp-work-image"><img src={item.src} alt={`${item.title} ${item.detail}`} loading={i<3?'eager':'lazy'} decoding="async" width="1000" height="750"/></div><figcaption><h2>{item.title}</h2><ArrowUpRight size={17} strokeWidth={1.5}/></figcaption><p>{item.type} · {item.detail}</p></figure></a>)}</div>
    <div className="cp-work-bottom"><a href={VIDEO_SITE} target="_blank" rel="noopener noreferrer">Video portfolio <ArrowUpRight size={22}/></a><a href={PHOTO_SITE} target="_blank" rel="noopener noreferrer">Photo portfolio <ArrowUpRight size={22}/></a></div>
  </CompanyOverlay>;
}
