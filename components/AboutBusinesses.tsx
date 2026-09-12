import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import './about-businesses.css';

type Business = { id:string; title:string; name:string; description:string; scope:string[]; image:string; alt:string; links:{label:string; url?:string; overlay?:string}[] };
const BUSINESSES:Business[] = [
  {id:'moment',title:'NADAUN MOMENT',name:'사진 · 영상 기획과 제작',description:'브랜드의 메시지를 사진과 영상의 장면으로 만듭니다. 제품과 인물의 표현, 브랜드 필름의 서사, 기업 행사와 공연의 현장감을 목적에 맞게 설계합니다.',scope:['브랜드 · 제품 · 인물 사진','TVC · 브랜드 필름 · VCR','기업 행사 · 공연 기록','촬영 · 편집 · 색보정 · 모션그래픽'],image:'/hero/pepsi-festa.webp',alt:'펩시 페스타 무대와 브랜드 그래픽',links:[{label:'PHOTO',url:'https://photo.nadaun.co'},{label:'VIDEO',url:'https://video.nadaun.co'}]},
  {id:'space',title:'NADAUN SPACE',name:'해외 소싱 · 장비 제작 · 판매 · 렌탈',description:'촬영 현장에서 필요한 장비와 공간을 구성합니다. 해외 제품 소싱, 장비 제작과 유통, 판매·렌탈을 운영하며 사용 목적과 현장 조건에 맞는 구성을 제안합니다.',scope:['해외 제품 소싱','촬영 장비 제작 · 판매','카메라 · 조명 · 기자재 렌탈','스튜디오 · 촬영 환경 구성'],image:'https://media.nadaun.co/collective/space/15.webp',alt:'촬영 현장의 조명 리그',links:[{label:'자사몰',url:'https://www.rainbowbene.com/'},{label:'스토어',url:'https://smartstore.naver.com/rainbowbene'}]},
  {id:'signage',title:'DIGITAL SIGNAGE',name:'사이니지 플랫폼 제작과 운영',description:'스마트 TV에서 콘텐츠를 편성하고 배포하는 사이니지 플랫폼을 구축합니다. 설치 환경과 네트워크를 정리하고 매장의 사진·영상 운영을 온라인으로 연결합니다.',scope:['스마트 TV 기반 플랫폼','설치 · 네트워크 관리','콘텐츠 편성 · 원격 배포','제작비 300만 원 · TV 및 설치 인건비 별도'],image:'https://media.nadaun.co/collective/btl/02-outdoor.webp',alt:'옥외 디지털 매체',links:[{label:'플랫폼 살펴보기',overlay:'digital-signage'}]},
  {id:'wedding',title:'NADAUN WEDDING',name:'웨딩 스냅과 필름',description:'두 사람의 표정과 관계, 그날의 공기를 사진과 필름으로 기록합니다. 촬영 장소와 본식의 흐름을 살펴 자연스러운 순간이 남도록 준비합니다.',scope:['웨딩 스냅','본식 사진 촬영','웨딩 필름'],image:'https://media.nadaun.co/wedding/gallery/05.jpg',alt:'가든 웨딩 촬영',links:[{label:'WEDDING',url:'https://wedding.nadaun.co'}]},
  {id:'production',title:'ALL IN ONE SOLUTION',name:'프리프로덕션 운영 시스템',description:'기획안·스토리보드·콘티·애니메틱·샷리스트의 정보를 하나의 제작 흐름으로 연결합니다. 단계별 판단과 수정 내용을 공유하며 촬영에 필요한 준비 자료를 정리합니다.',scope:['기획안 · 스토리보드','콘티 · 애니메틱','샷리스트 · 제작 정보 연결','제작 단계별 검토와 공유'],image:'https://media.nadaun.co/allinone/projects/NIKE-OLIVE-BURGUNDY-12-SCENE-MAGAZINE-FILM/01_STILL/S01_HERO-26ec0115fb772ac7.webp',alt:'ALL IN ONE 제작 워크스페이스의 Nike 콘셉트 프리뷰',links:[{label:'솔루션 살펴보기',overlay:'production-solution'}]},
  {id:'starlogin',title:'STARLOGIN',name:'국내 · 글로벌 에이전시',description:'브랜드와 아티스트·크리에이터의 협업을 기획합니다. 캠페인의 목적과 인물의 적합성을 검토하고 국내외 협업, 초청, 홍보의 실행을 연결합니다.',scope:['아티스트 · 셀럽 협업','인플루언서 · 유튜버 · 왕홍','브랜드 협업 · 행사 초청','국내외 캠페인 커뮤니케이션'],image:'/starlogin/cellreturn-launch-2022.jpeg',alt:'STARLOGIN 소개자료에 수록된 과거 셀리턴 론칭 행사',links:[{label:'에이전시 살펴보기',overlay:'starlogin'}]},
  {id:'marketing',title:'MARKETING',name:'온라인 · 오프라인 광고대행',description:'브랜드 전략과 캠페인 기획을 콘텐츠·매체 집행으로 연결합니다. 채널의 특성에 맞춰 소재와 편성을 설계하고, 실제 송출과 노출 등 확인 가능한 결과를 기록합니다.',scope:['브랜드 전략 · 캠페인 기획','디지털 · 방송 · IPTV · 옥외 광고','광고 협찬 · PPL · 언론홍보','집행 검수 · 성과 리포팅'],image:'https://media.nadaun.co/collective/btl/01-subway.webp',alt:'지하철 스크린도어 광고 매체',links:[{label:'통합 솔루션',overlay:'integrated-solution'},{label:'미디어 · 매체',overlay:'global-network'},{label:'INSIGHTS',overlay:'insights'}]},
];

export default function AboutBusinesses({onNavigate}:{onNavigate:(id:string)=>void}) {
  const [selected,setSelected]=useState<string|null>('moment');
  const scroller=useRef<HTMLElement>(null);
  const revealSelected=(id:string)=>{
    const root=scroller.current;
    const button=root?.querySelector<HTMLElement>(`#business-trigger-${id}`);
    if(!root||!button||button.getAttribute('aria-expanded')!=='true')return;
    const offset=button.getBoundingClientRect().top-root.getBoundingClientRect().top;
    if(offset>root.clientHeight*.4)root.scrollTo({top:root.scrollTop+offset-24,behavior:'smooth'});
  };
  return <section ref={scroller} id="about-businesses" className="about-businesses" aria-label="우리의 7가지 사업군">
    <div className="about-business-heading"><p className="editorial-kicker">NADAUN COLLECTIVE · WHAT WE DO</p><h2>우리의 7가지 사업군<span>.</span></h2><p className="editorial-body">각 사업군을 눌러 나다운이 하는 일을 살펴보세요.</p></div>
    <div className="about-business-list">{BUSINESSES.map((item,index)=><article key={item.id}>
      <h3><button type="button" id={`business-trigger-${item.id}`} aria-expanded={selected===item.id} aria-controls={`business-panel-${item.id}`} onClick={()=>setSelected(selected===item.id?null:item.id)}><span className="about-business-number">{String(index+1).padStart(2,'0')}</span><span>{item.title}<small>{item.name}</small></span>{selected===item.id?<Minus size={18}/>:<Plus size={18}/>}</button></h3>
      <AnimatePresence initial={false}>{selected===item.id&&<motion.div id={`business-panel-${item.id}`} role="region" aria-labelledby={`business-trigger-${item.id}`} initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.5,ease:[.16,1,.3,1]}} onAnimationComplete={()=>revealSelected(item.id)} style={{overflow:'hidden'}}>
        <div className="about-business-detail"><div><motion.p className="editorial-body" initial={{y:22,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.5,delay:.08}}>{item.description}</motion.p><ul>{item.scope.map((line,i)=><motion.li key={line} initial={{y:16,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.45,delay:.12+i*.045}}>{line}</motion.li>)}</ul><div className="about-business-links">{item.links.map(link=>link.url?<a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={16}/></a>:<button key={link.label} type="button" onClick={()=>onNavigate(link.overlay!)}>{link.label}<ArrowUpRight size={16}/></button>)}</div></div><figure><motion.img src={item.image} alt={item.alt} loading="lazy" decoding="async" initial={{scale:1.08}} animate={{scale:1}} transition={{duration:.8,ease:[.16,1,.3,1]}}/>{item.id==='production'&&<figcaption>제작 워크스페이스 · 콘셉트 프리뷰</figcaption>}{item.id==='starlogin'&&<figcaption>STARLOGIN 소개자료(2022) · 과거 수행 사례</figcaption>}</figure></div>
      </motion.div>}</AnimatePresence>
    </article>)}</div>
  </section>;
}
