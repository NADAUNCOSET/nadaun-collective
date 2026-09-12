import React, {useEffect,useRef} from 'react';
import {motion,useScroll} from 'framer-motion';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import {InsightsScrollContext,ScrollReveal,ScrollStory,SceneLine,StoryMedia} from './InsightsMotion';
import './insights-motion.css';
import './lab-production.css';
import './starlogin-editorial.css';

const SERVICES = [
  {n:'01',title:'스타 캐스팅',en:'Talent & casting',body:'브랜드 모델, 광고 출연자와 행사 게스트를 캠페인 목적에 맞게 제안합니다. 인물의 이미지, 타깃 적합성, 출연 일정과 매체 사용 범위를 검토해 캐스팅 조건을 조율합니다.',items:['광고 모델 · 브랜드 앰배서더','행사 출연 · 제품 협찬','초상 사용 범위 · 계약 조건 협의']},
  {n:'02',title:'MCN · 크리에이터',en:'Creator partnership',body:'인플루언서, 유튜버와 셀럽의 콘텐츠 특성 및 주요 시청자층을 분석합니다. 중국 시장은 현지 왕홍의 채널 특성과 브랜드 적합성을 검토하고, 협업 콘텐츠의 메시지와 공개 일정을 설계합니다.',items:['인플루언서 · 유튜버','셀럽 · 전문가 협업','중국 왕홍 · 현지 콘텐츠']},
  {n:'03',title:'방송 · 언론홍보',en:'Broadcast & public relations',body:'브랜드의 이슈와 제품 소구점을 방송 및 언론의 콘텐츠 문맥에 맞게 정리합니다. 협찬·PPL의 노출 조건과 보도자료, 취재 및 행사 운영을 조율하며 일관된 메시지가 전달되도록 관리합니다.',items:['광고 협찬 · PPL','보도자료 · 미디어 대응','론칭 행사 · 브랜드 어워드 참여 전략']},
  {n:'04',title:'통합 광고 운영',en:'Integrated campaign',body:'타깃의 미디어 이용 행태와 캠페인 목표를 기준으로 온라인·오프라인 매체를 구성합니다. 검색, 소셜, 동영상과 옥외 매체의 역할을 나누고 소재·게재 일정·성과 지표를 함께 관리합니다.',items:['디지털 · 소셜 · 동영상 광고','방송 · 교통 · 옥외 매체','미디어 플랜 · 소재 운영 · 성과 검토']},
  {n:'05',title:'커머스 · 유통',en:'Commerce & distribution',body:'제품의 판매 조건과 고객의 구매 맥락을 검토해 홈쇼핑·라이브커머스의 방송 구성을 기획합니다. 온라인 및 오프라인 유통 채널과 프로모션을 연계하고, 상품 소개와 판매 실행에 필요한 자료를 정리합니다.',items:['홈쇼핑 · 라이브커머스 기획','온라인·오프라인 유통 제안','상품 소개 · 프로모션 운영']},
  {n:'06',title:'브랜드 · 콘텐츠',en:'Brand communication',body:'브랜드 포지셔닝과 핵심 메시지를 바탕으로 네이밍, 스토리텔링 및 시각적 방향을 정리합니다. 사진·광고 영상·디지털 콘텐츠의 제작 기준을 수립하고 매체별 커뮤니케이션에 반영합니다.',items:['브랜드 전략 · 스토리텔링','사진 · CF · 디지털 콘텐츠','매체별 메시지 · 제작 가이드']},
];
interface Props {onClose:()=>void;onContactClick:()=>void;}
export default function StarloginOverlay({onClose,onContactClick}:Props){
  const scrollRef=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({container:scrollRef});
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[onClose]);
  return <InsightsScrollContext.Provider value={scrollRef}>
    <motion.section ref={scrollRef} role="dialog" aria-label="STARLOGIN" className="lab-page starlogin-page collective-editorial fixed inset-0 z-[105] overflow-y-auto overflow-x-hidden" initial={{y:'100%'}} animate={{y:0}} transition={{duration:.4,ease:[.16,1,.3,1]}}>
      <header className="lab-header"><motion.div className="lab-progress" aria-hidden="true" style={{scaleX:scrollYProgress}}/><span className="lab-wordmark">STARLOGIN</span><button className="lab-icon" onClick={onClose} aria-label="메인으로 돌아가기"><ArrowLeft size={19}/></button></header>
      <div className="lab-content">
        <ScrollStory intro={<div className="lab-opening"><div><p className="lab-eyebrow">Talent · Media · Commerce</p><h1><SceneLine visible>브랜드와 사람.</SceneLine><SceneLine>적합한 연결.</SceneLine></h1><p className="lab-lead">캐스팅의 적합성, 콘텐츠의 설득력, 매체의 실행력. 스타로그인은 인물과 브랜드의 접점을 설계하고 캠페인의 커뮤니케이션을 운영합니다.</p></div><StoryMedia src="/starlogin/agency-editorial-2022.jpeg" alt="스타로그인 소개 자료의 캐스팅·브랜드 비주얼" caption="STARLOGIN · Agency archive (2022)"/></div>} impact={<div className="lab-statement"><p className="lab-eyebrow">Campaign architecture</p><h2>누가 이야기하는가.<br/>어디에서 만나는가.<br/>무엇을 남기는가.</h2><p>인물의 유명세만으로 캠페인을 설계하지 않습니다. 타깃과의 접점, 제품의 소구점, 콘텐츠가 소비되는 환경을 함께 검토합니다. 캐스팅과 제작, 미디어 운영의 판단 기준을 하나의 캠페인 안에서 정렬합니다.</p></div>}/>
        <section className="lab-section"><ScrollReveal><p className="lab-eyebrow">Scope of work</p><h2>전문 영역.</h2></ScrollReveal><div className="starlogin-services">{SERVICES.map(service=><ScrollReveal className="starlogin-service" key={service.n}><span className="lab-stage-number">{service.n}</span><div><h3>{service.title}</h3><p className="lab-output">{service.en}</p></div><div><p>{service.body}</p><ul>{service.items.map(item=><li key={item}>{item}</li>)}</ul></div></ScrollReveal>)}</div></section>
        <section className="lab-section"><ScrollReveal><p className="lab-eyebrow">Selected archive</p><div className="lab-section-heading"><h2>캠페인의<br/>실행 장면.</h2><p className="lab-lead">스타로그인 소개 자료에 수록된 프로젝트를 수행 업무 중심으로 정리했습니다.</p></div></ScrollReveal><ScrollReveal className="starlogin-case"><figure><img src="/starlogin/cellreturn-launch-2022.jpeg" width="531" height="520" alt="셀리턴 제품 론칭 행사에 참석한 모델들의 포토콜" loading="lazy" decoding="async"/></figure><div><p className="lab-eyebrow">CELLRETURN</p><h3>제품 론칭과<br/>미디어 커뮤니케이션.</h3><p>셀럽 및 중국 왕홍 캐스팅, 신제품 론칭 행사와 언론홍보, 방송·온라인 콘텐츠를 연계한 캠페인 사례입니다. 현장 노출과 채널별 전달 내용을 함께 구성했습니다.</p></div></ScrollReveal><div className="starlogin-archive"><ScrollReveal><h3>PLABENE</h3><p>방송 협찬과 PPL, 제품 커뮤니케이션을 연계한 브랜드 홍보 사례.</p></ScrollReveal><ScrollReveal><h3>ZAIGLE · ZWC</h3><p>브랜드 포지셔닝, 영상·소셜 콘텐츠와 언론홍보를 구성한 캠페인 사례.</p></ScrollReveal></div><p className="starlogin-source">STARLOGIN 소개 자료(2022) 수록 사례. 이미지와 수행 내역은 당시 프로젝트 기준입니다.</p></section>
        <section className="lab-section lab-final"><ScrollReveal><p className="lab-eyebrow">Work with STARLOGIN</p><h2>브랜드에 맞는<br/>협업을 설계합니다.</h2><button className="lab-link" onClick={onContactClick}>프로젝트 문의 <ArrowUpRight size={18}/></button></ScrollReveal></section>
      </div>
    </motion.section>
  </InsightsScrollContext.Provider>;
}
