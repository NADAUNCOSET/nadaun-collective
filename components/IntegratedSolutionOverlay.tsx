import React, { useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { X, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { InsightsScrollContext, ScrollStory, SceneLine, StoryMedia, ScrollReveal } from './InsightsMotion';
import './insights-motion.css';
import './marketing-motion.css';
import { blogGroups, socialChannels, jamesChannel } from './marketingChannels';
interface IntegratedSolutionOverlayProps {isOpen:boolean;onClose:()=>void;onBack?:()=>void;onContactClick:()=>void;onAnnualContact:()=>void;onSignageClick:()=>void;}
const SERVICES = [
  {
    id: 'plan',
    title: 'CREATIVE STRATEGY',
    subtitle: '크리에이티브 기획',
    desc: '제작 이전에 전략으로 승부합니다. 브랜드의 본질과 시장을 읽어, 어떤 IP로 · 누구에게 · 어떤 메시지로 닿을지 캠페인의 큰 그림을 설계합니다.',
    features: ['IP · 브랜드 전략', '캠페인 설계', '타겟 오디언스 정의', '메시지 · 컨셉 도출'],
  },
  {
    id: 'produce',
    title: 'CONTENT PRODUCTION',
    subtitle: '비주얼 콘텐츠 제작',
    desc: '기획을 압도적인 비주얼로 구현합니다. TVC · 브랜드필름 · 기업 VCR · 3D 모션, 사진·영상 촬영부터 후반작업, On-Air까지 한 흐름으로.',
    features: ['TVC · CF · 브랜드필름', '기업 VCR', '3D · 모션그래픽', '사진 · 영상 촬영'],
  },
  {
    id: 'audience',
    title: 'TARGET AUDIENCE',
    subtitle: '블로그 · SNS · 유튜브 타깃 오디언스',
    desc: '브랜드가 만나고 싶은 고객을 기준으로 채널을 고릅니다. 관심사별 블로그 기사와 유튜브 영상, SNS 게시물을 기획하고 제작해 제품과 서비스를 소개합니다.',
    features: [],
  },
  {
    id: 'broadcast',
    title: 'MEDIA & BROADCAST',
    subtitle: '전국 · 글로벌 송출',
    desc: '제작물을 전국 방송 · IPTV · 케이블 · 오프라인 BTL, 그리고 해외 매체까지 직접 송출합니다. LIVERNOVO 캠페인은 계약 대비 416%의 송출 달성률을 기록했습니다.',
    features: ['방송 · IPTV · 케이블', '오프라인 BTL', '해외 · 글로벌', '퍼포먼스 · 바이럴'],
  },
  {
    id: 'ip',
    title: 'IP & INFLUENCER',
    subtitle: 'IP · 인플루언서 타겟팅',
    desc: '난컴퍼니 MCN과 AI 데이터를 기반으로, 브랜드 IP와 인플루언서가 정확한 타겟에게 닿는 방법을 설계하고 운영합니다. 도달에서 끝나지 않고 팬덤으로 이어집니다.',
    features: ['MCN · 크리에이터 운영', '인플루언서 매칭', 'IP 타겟 오디언스', 'AI 데이터 타겟팅'],
  },
  {id:'signage',title:'DIGITAL SIGNAGE',subtitle:'공간 콘텐츠 운영',desc:'스마트 TV 기반 사이니지 플랫폼을 제작합니다. 현장 설치와 네트워크, 사진·영상 편성과 원격 배포를 연결합니다. 제작비 300만 원, TV와 설치 인건비는 별도입니다.',features:['스마트 TV 기반 플랫폼','설치 · 네트워크 관리','사진 · 영상 제작 플로우','콘텐츠 편성 · 원격 배포']},
];


function AudienceChannels({ onContact }: { onContact: () => void }) {
  return (
    <div className="audience-channels">
      <div className="audience-channel">
        <h3>블로그</h3>
        <p>직접 운영하는 블로그 32곳 중 브랜드와 독자층이 맞는 곳에 제품 소개, 사용법, 인터뷰를 싣습니다.</p>
        <details className="annual-directory">
          <summary>운영 블로그 32개 전체 보기</summary>
          {blogGroups.map(group=><div key={group.platform} className="annual-platform">
            <h3>{group.platform} <small>{group.channels.length}개</small></h3>
            <ul>{group.channels.map(channel=><li key={channel.href}><a href={channel.href} target="_blank" rel="noopener noreferrer">{channel.name} <ArrowUpRight size={14}/></a></li>)}</ul>
          </div>)}
        </details>
      </div>
      <div className="audience-channel">
        <h3>유튜브 · 장비맨 제임스</h3>
        <p>제품을 직접 써 보고, 브랜드를 만드는 사람과 현장을 영상으로 소개합니다.</p>
        <div className="audience-links">
          <a href={jamesChannel} target="_blank" rel="noopener noreferrer">장비맨 제임스 채널 <ArrowUpRight size={15}/></a>
          <a href="https://www.youtube.com/watch?v=Cot77dRuJ6c" target="_blank" rel="noopener noreferrer">뷰티 촬영 현장 보기 <ArrowUpRight size={15}/></a>
        </div>
      </div>
      <div className="audience-channel">
        <h3>SNS 연계</h3>
        <p>블로그와 유튜브에서 다룬 내용을 사진과 짧은 영상으로 편집해 SNS로 이어갑니다.</p>
        <div className="audience-links">{socialChannels.map(channel =>
          <a key={channel.href} href={channel.href} target="_blank" rel="noopener noreferrer">{channel.name} <ArrowUpRight size={15}/></a>
        )}</div>
      </div>
      <div className="audience-channel">
        <h3>연간 브랜드 콘텐츠 파트너십</h3>
        <p>꾸준한 홍보가 필요한 브랜드라면 제품과 일정을 알려주세요. 예산에 맞춰 제작 형식과 채널, 발행 횟수를 함께 정합니다.</p>
        <button className="marketing-link" onClick={onContact}>연간 계약 문의하기 <ArrowUpRight size={18}/></button>
      </div>
    </div>
  );
}

export default function IntegratedSolutionOverlay({isOpen,onClose,onBack,onContactClick,onAnnualContact,onSignageClick}:IntegratedSolutionOverlayProps) {
  const scrollRef=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({container:scrollRef});
  useEffect(()=>{if(!isOpen)return;const key=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[isOpen,onClose]);
  useEffect(() => {
    if (!isOpen) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    scrollRef.current?.focus({preventScroll: true});
    return () => { if (trigger?.isConnected) trigger.focus({preventScroll: true}); };
  }, [isOpen]);
  if(!isOpen)return null;
  return <InsightsScrollContext.Provider value={scrollRef}><motion.section ref={scrollRef} tabIndex={-1} role="dialog" aria-label="통합 마케팅 솔루션" className="marketing-page collective-editorial fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden" initial={{y:'100%'}} animate={{y:0}} transition={{duration:.495,ease:[.22,1,.36,1]}}>
    <header className="marketing-header"><motion.div className="marketing-progress" style={{scaleX:scrollYProgress}}/><span>MARKETING · 통합 솔루션</span>{onBack&&<button onClick={onBack} aria-label="메인으로 돌아가기"><ArrowLeft size={18}/></button>}<button onClick={onClose} aria-label="통합 솔루션 닫기"><X size={20}/></button></header>
    <div className="marketing-content">
      <ScrollStory intro={<div className="marketing-opening"><div><p className="marketing-kicker">Integrated solution</p><h1><SceneLine visible>INTEGRATED</SceneLine><SceneLine order={1}>SOLUTION.</SceneLine></h1><p className="editorial-body">크리에이티브 기획 · 콘텐츠 제작 · 미디어 실행.<br/>브랜드의 메시지를 하나의 캠페인으로 연결합니다.</p></div><StoryMedia src="/hero/pepsi-festa.webp" alt="펩시 페스타 무대와 브랜드 콘텐츠" caption="NADAUN · Pepsi Festa"/></div>} impact={<div className="marketing-statement"><p className="marketing-kicker">Strategy · Contents · Media</p><h2>어떤 이야기인가.<br/>어떻게 보여주는가.<br/>누구에게 닿는가.</h2><p className="editorial-body">브랜드 전략과 제작 방향, 매체별 실행 계획을 함께 검토합니다. 캠페인의 목적에 맞는 콘텐츠를 만들고 실제 집행 결과를 확인합니다.</p></div>}/>
      {SERVICES.map((service,index)=><section className="marketing-service" key={service.id} data-service={service.id}>
        <ScrollReveal className="marketing-service-heading"><p className="marketing-kicker">0{index+1} · {service.subtitle}</p><h2>{service.title.split(' ').map((word,i)=><React.Fragment key={i}>{i>0&&<> <br/></>}{word}</React.Fragment>)}</h2></ScrollReveal>
        <div><ScrollReveal><p className="editorial-body">{service.desc}</p></ScrollReveal>{service.id === 'audience' ? <AudienceChannels onContact={onAnnualContact}/> : <div className="marketing-features">{service.features.map((feature,i)=><ScrollReveal key={feature}><span>0{i+1}</span><h3>{feature}</h3></ScrollReveal>)}</div>}{service.id==='signage'&&<ScrollReveal><button className="marketing-link" onClick={onSignageClick}>사이니지 플랫폼 살펴보기 <ArrowUpRight size={18}/></button></ScrollReveal>}</div>
      </section>)}
      <section className="marketing-final"><ScrollReveal><p className="marketing-kicker">Contact</p><h2>캠페인의 방향을<br/>함께 설계합니다.</h2><button className="marketing-link" onClick={onContactClick}>광고 문의하기 <ArrowUpRight size={18}/></button></ScrollReveal></section>
    </div>
  </motion.section></InsightsScrollContext.Provider>;
}
