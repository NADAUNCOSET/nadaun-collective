import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react';
import { InsightsScrollContext, ScrollReveal, ScrollStory, SceneLine } from './InsightsMotion';
import './insights-motion.css';
import './lab-production.css';

const WORKSPACE = 'https://allinone.nadaun.co';
const STAGES = [
  { n:'01', title:'브리프와 제작 기준', output:'Creative brief', body:'캠페인 목적, 타깃, 핵심 메시지와 납품 규격을 제작 기준으로 정리합니다. 클라이언트 자료와 레퍼런스를 프로젝트에 연결해 기획 판단의 근거를 공유합니다.' },
  { n:'02', title:'기획안과 트리트먼트', output:'Proposal · Treatment', body:'콘셉트, 카피, 시각적 방향과 구성안을 페이지 단위로 설계합니다. 검토 의견과 확정 상태를 구분하고, 승인된 방향을 후속 제작 문서에 반영합니다.' },
  { n:'03', title:'스토리보드와 콘티', output:'Storyboard · Shot design', body:'컷의 목적과 장면 구성을 프레임으로 구체화합니다. 구도, 렌즈, 카메라 무빙, 조명, 인물의 동선과 컷 연결을 검토해 연출 의도를 촬영팀이 해석할 수 있는 언어로 정리합니다.' },
  { n:'04', title:'애니메틱', output:'Timing · Editorial rhythm', body:'콘티를 시간축에 배치하고 컷 길이, 전환, 내레이션과 가이드 사운드를 함께 검토합니다. 촬영 전에 메시지의 전달 속도와 편집 리듬을 확인하고, 합의된 컷 배열을 제작 기준으로 확정합니다.' },
  { n:'05', title:'샷리스트와 촬영 준비', output:'Shot list · Call sheet', body:'확정 콘티의 컷 정보를 실행 샷리스트에 연결합니다. 샷 사이즈, 앵글, 렌즈, 무빙, 장소, 출연자와 장비를 정리하고, 장소별 콜시트와 부서별 준비 항목을 구성합니다.' },
  { n:'06', title:'제작 운영과 검수', output:'Production management', body:'담당자, 일정, 작업 상태와 결과물을 프로젝트 단위로 관리합니다. 선택된 소스와 편집 인계 정보를 연결하고, 현장 체크리스트와 납품 항목을 대조해 누락을 확인합니다.' },
];
const SIGNAGE = [
  ['현장 설치', '스마트 TV와 현장 설치기사 1명을 기본 구성으로 사이니지 환경을 구축합니다. 매장의 화면 배치와 인터넷 연결 환경을 확인하고, 나다운이 설치 및 초기 구동을 관리합니다.'],
  ['온라인 네트워크 관리', '설치 이후에도 나다운이 네트워크와 콘텐츠 운영 환경을 관리합니다. 지점별 사진·영상 편성, 업데이트와 배포를 온라인으로 연결해 여러 매장의 운영을 일관되게 관리할 수 있도록 설계합니다.'],
  ['사진·영상 제작 플로우 자동화', '콘텐츠 제작 정보와 매장별 편성·배포 흐름을 연결해 반복 운영을 자동화합니다. 브랜드 검토와 제작 판단은 유지하면서, 매체 규격별 준비와 전달 과정에 드는 부담을 줄입니다.'],
];

interface Props { isOpen:boolean; onClose:()=>void; onBack?:()=>void; onContactClick?:()=>void; initialSection?:'overview'|'production'|'signage'; }
export default function AiInnovationLabOverlay({isOpen,onClose,onBack,onContactClick,initialSection='overview'}:Props) {
  const reduce=useReducedMotion();
  const scrollRef=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({container:scrollRef});
  const jump=(id:string)=>{
    const container=scrollRef.current;
    const target=container?.querySelector<HTMLElement>(`#${id}`);
    if(container&&target)container.scrollTo({top:target.getBoundingClientRect().top-container.getBoundingClientRect().top+container.scrollTop-80,behavior:reduce?'auto':'smooth'});
  };
  useEffect(()=>{if(isOpen)scrollRef.current?.scrollTo({top:0,behavior:'auto'});},[isOpen,initialSection]);
  useEffect(()=>{
    if(!isOpen)return;
    const key=(event:KeyboardEvent)=>{if(event.key==='Escape')onClose();};
    window.addEventListener('keydown',key);
    return()=>window.removeEventListener('keydown',key);
  },[isOpen,onClose]);
  if(!isOpen)return null;
  return <InsightsScrollContext.Provider value={scrollRef}>
    <motion.section ref={scrollRef} role="dialog" aria-modal="false" aria-label={initialSection==='signage'?'NADAUN Digital Signage':initialSection==='production'?'ALL IN ONE SOLUTION':'NADAUN Lab'} className="lab-page fixed inset-0 z-[105] overflow-y-auto overflow-x-hidden" initial={reduce?false:{y:'100%'}} animate={{y:0}} transition={{duration:.4,ease:[.16,1,.3,1]}}>
      <header className="lab-header">
        <motion.div className="lab-progress" aria-hidden="true" style={{scaleX:scrollYProgress}}/>
        <span className="lab-wordmark">{initialSection==='signage'?'DIGITAL SIGNAGE':initialSection==='production'?'ALL IN ONE SOLUTION':'NADAUN COLLECTIVE — LAB'}</span>
        {initialSection==='overview'&&<nav aria-label="Lab sections"><button onClick={()=>jump('lab-workspace')}>Production</button><button onClick={()=>jump('lab-signage')}>Signage</button></nav>}
        {onBack&&<button className="lab-icon" onClick={onBack} aria-label="메인으로 돌아가기"><ArrowLeft size={19}/></button>}
        <button className="lab-icon" onClick={onClose} aria-label="랩 닫기"><X size={20}/></button>
      </header>
      <div className="lab-content">
        {initialSection==='overview'&&<ScrollStory intro={<div className="lab-opening">
          <div><p className="lab-eyebrow">Creative engineering</p><h1><SceneLine visible>정교한 제작.</SceneLine><SceneLine>명료한 운영<span className="lab-gold">.</span></SceneLine></h1><p className="lab-lead">나다운은 촬영과 연출의 전문성을 소프트웨어로 확장합니다. 작품의 사실감과 미적 완성도를 높이고, 복잡한 제작 업무를 일관된 기준으로 운영하는 시스템을 만듭니다.</p></div>
          <figure className="lab-hero-image"><img src="/hero/royal-salute.webp" alt="나다운이 촬영한 로얄살루트 제품과 전시 공간" width="667" height="1000" decoding="async"/><figcaption>NADAUN Photography · Royal Salute</figcaption></figure>
        </div>} impact={<div className="lab-statement"><p className="lab-eyebrow">Our standard</p><h2>빛과 질감.<br/>움직임과 리듬.<br/><span className="lab-gold">판단의 기준은 작품.</span></h2><p>기술은 연출 의도를 정확하게 구현하기 위한 제작 수단입니다. 실사 촬영의 빛, 재질과 공간감을 기준으로 시각화와 후반 작업을 정교하게 다듬습니다. 화면의 설득력과 브랜드에 적합한 미감을 최종 판단의 기준으로 삼습니다.</p></div>}/>}

        {initialSection!=='signage'&&<section id="lab-workspace" className="lab-section">
          <ScrollReveal><p className="lab-eyebrow">Production platform</p><div className="lab-section-heading"><h2>ALL IN ONE<br/>SOLUTION<span className="lab-gold">.</span></h2><div><p className="lab-lead">나다운의 프리프로덕션 자동화 시스템.</p><p>온라인·오프라인 광고 제작에 필요한 기획 문서와 촬영 준비 정보를 한 프로젝트에서 연결합니다. 기획안, 스토리보드·콘티, 애니메틱, 샷리스트의 반복 입력과 문서 정리를 자동화해 준비 시간을 줄입니다. 연출과 제작의 판단은 팀이 맡고, 확정된 컷과 수정 이력은 후속 작업의 기준으로 관리합니다.</p><a className="lab-link" href={WORKSPACE} target="_blank" rel="noopener noreferrer">워크스페이스 열기 <ArrowUpRight size={18}/></a><p className="lab-access">운영 워크스페이스 · 승인된 계정으로 접속</p></div></div></ScrollReveal>
          <ScrollReveal className="lab-signage-visual"><figure><img src="https://media.nadaun.co/allinone/projects/NIKE-OLIVE-BURGUNDY-12-SCENE-MAGAZINE-FILM/01_STILL/S01_HERO-26ec0115fb772ac7.webp" alt="올인원 솔루션의 나이키 올리브·버건디 광고 프리뷰" width="1376" height="768" decoding="async"/><figcaption>ALL IN ONE SOLUTION · NIKE 콘셉트 프리뷰</figcaption></figure></ScrollReveal>
          <div className="lab-stages">{STAGES.map(stage=><ScrollReveal key={stage.n} className="lab-stage"><span className="lab-stage-number">{stage.n}</span><div><h3>{stage.title}</h3><p className="lab-output">{stage.output}</p></div><p>{stage.body}</p></ScrollReveal>)}</div>
          <ScrollReveal className="lab-operating"><h3>문서의 정합성이<br/>실행의 속도를 만듭니다.</h3><p>자료를 반복해서 옮기거나 서로 다른 버전의 문서를 대조하는 부담을 줄입니다. 팀은 확정된 컷, 담당 업무와 준비 상태를 같은 맥락에서 확인하고, 수정이 필요한 지점을 빠르게 판단할 수 있습니다. 제작의 속도는 명확한 의사결정과 안정적인 정보 전달에서 만들어집니다.</p></ScrollReveal>
        </section>}

        {initialSection!=='production'&&<section id="lab-signage" className="lab-section">
          <ScrollReveal><p className="lab-eyebrow">Digital signage</p><div className="lab-section-heading"><h2>사이니지 제작.<br/>공간을 위한 미디어<span className="lab-gold">.</span></h2><div><p className="lab-lead">스마트 TV와 설치기사 1명. 간결한 현장 구축.</p><p>국내외 F&B·리테일·호텔과 브랜드 공간에 적용하는 사이니지 플랫폼을 제작·공급합니다. 스마트 TV와 현장 설치기사 1명을 기본 구성으로, 나다운이 설치와 네트워크를 관리합니다. 사진·영상 제작 플로우, 콘텐츠 편성과 배포를 온라인 운영 환경에 연결해 반복 업무를 자동화합니다.</p></div></div></ScrollReveal>
          <ScrollReveal className="lab-signage-offer"><div><p className="lab-eyebrow">제작비</p><p className="lab-signage-price">300<span>만 원</span></p><p className="lab-signage-exclusion">TV · 설치 인건비 별도</p></div><div><h3>설치와 네트워크.<br/>제작과 운영의 연결.</h3><p>스마트 TV 기반의 현장 구축과 온라인 콘텐츠 운영을 함께 설계합니다. 도입 매장, 설치 환경과 제작 범위를 확인해 구체적인 실행 구성을 안내합니다.</p><button className="lab-link" onClick={()=>{onClose();onContactClick?.();}}>사이니지 도입 문의 <ArrowUpRight size={18}/></button></div></ScrollReveal>
          <ScrollReveal className="lab-signage-visual"><figure><img src="/hero/pepsi-festa.webp" alt="펩시 페스타의 대형 무대 디스플레이와 브랜드 콘텐츠" width="1000" height="667" loading="lazy" decoding="async"/><figcaption>콘텐츠 제작 사례 · Pepsi Festa</figcaption></figure><div className="lab-signage-types"><span>F&B</span><span>Retail</span><span>Hospitality</span><span>Brand spaces</span></div></ScrollReveal>
          <div className="lab-signage-grid">{SIGNAGE.map(([title,body])=><ScrollReveal key={title}><h3>{title}</h3><p>{body}</p></ScrollReveal>)}</div>
        </section>}

        <section className="lab-section lab-final"><ScrollReveal><p className="lab-eyebrow">Work with NADAUN</p><h2>제작과 운영의<br/>기준을 설계합니다.</h2><button className="lab-link" onClick={()=>{onClose();onContactClick?.();}}>프로젝트 문의하기 <ArrowUpRight size={20}/></button></ScrollReveal></section>
      </div>
    </motion.section>
  </InsightsScrollContext.Provider>;
}
