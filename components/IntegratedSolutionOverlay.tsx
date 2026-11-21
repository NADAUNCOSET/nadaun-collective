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
      <section className="annual-hero" aria-labelledby="annual-title">
        <div>
          <p className="marketing-kicker">블로그 · SNS · 유튜브 제작</p>
          <h1 id="annual-title">연간 브랜드<br/>콘텐츠 파트너십</h1>
          <p className="editorial-body">신제품을 소개하고, 만드는 사람을 만나고, 실제 사용법을 보여줍니다. 나다운이 직접 운영하는 블로그 32개와 유튜브 ‘장비맨 제임스’에서 브랜드에 맞는 채널을 고르고, SNS까지 이어지는 콘텐츠를 기획하고 제작합니다.</p>
          <button className="annual-cta" onClick={onAnnualContact}>연간 계약 문의하기 <ArrowUpRight size={18}/></button>
        </div>
        <a className="annual-episode" href="https://www.youtube.com/watch?v=Cot77dRuJ6c" target="_blank" rel="noopener noreferrer">
          <img src="/hero/gear-james-ep3.webp" width="1280" height="720" alt="장비맨 제임스 3화, 뷰티 촬영 현장"/>
          <span>장비맨 제임스 · 뷰티 촬영 현장 보기 <ArrowUpRight size={16}/></span>
        </a>
      </section>
      <section className="annual-channels" aria-labelledby="annual-channels-title">
        <h2 id="annual-channels-title">브랜드를 소개할 채널</h2>
        <div className="annual-channel-grid">
          <div><h3>블로그 32개</h3><p>제품의 특징과 사용법, 브랜드 이야기를 독자가 관심 있는 주제에 맞춰 기사로 만듭니다.</p></div>
          <div><h3>유튜브</h3><p>‘장비맨 제임스’에서 제품을 써 보고, 브랜드를 만드는 사람과 현장을 영상으로 소개합니다.</p><a href={jamesChannel} target="_blank" rel="noopener noreferrer">장비맨 제임스 채널 <ArrowUpRight size={16}/></a></div>
          <div><h3>SNS</h3><p>촬영한 사진과 영상을 짧은 클립과 게시물로 편집해 채널별로 소개합니다.</p><div className="annual-social">{socialChannels.map(channel=><a key={channel.href} href={channel.href} target="_blank" rel="noopener noreferrer">{channel.name} <ArrowUpRight size={14}/></a>)}</div></div>
        </div>
        <details className="annual-directory">
          <summary>운영 블로그 32개 전체 보기</summary>
          {blogGroups.map(group=><div key={group.platform} className="annual-platform">
            <h3>{group.platform} <small>{group.channels.length}개</small></h3>
            <ul>{group.channels.map(channel=><li key={channel.href}><a href={channel.href} target="_blank" rel="noopener noreferrer">{channel.name} <ArrowUpRight size={14}/></a></li>)}</ul>
          </div>)}
        </details>
        <p className="annual-inquiry">연간 홍보를 계획 중이라면 브랜드와 소개하고 싶은 제품을 알려주세요. 일정과 예산에 맞춰 제작 형식, 발행 채널, 운영 횟수를 함께 정합니다.</p>
        <button className="marketing-link" onClick={onAnnualContact}>연간 계약 문의하기 <ArrowUpRight size={18}/></button>
      </section>
      <ScrollStory intro={<div className="marketing-opening"><div><p className="marketing-kicker">Integrated solution</p><h2><SceneLine visible>INTEGRATED</SceneLine><SceneLine order={1}>SOLUTION.</SceneLine></h2><p className="editorial-body">크리에이티브 기획 · 콘텐츠 제작 · 미디어 실행.<br/>브랜드의 메시지를 하나의 캠페인으로 연결합니다.</p></div><StoryMedia src="/hero/pepsi-festa.webp" alt="펩시 페스타 무대와 브랜드 콘텐츠" caption="NADAUN · Pepsi Festa"/></div>} impact={<div className="marketing-statement"><p className="marketing-kicker">Strategy · Contents · Media</p><h2>어떤 이야기인가.<br/>어떻게 보여주는가.<br/>누구에게 닿는가.</h2><p className="editorial-body">브랜드 전략과 제작 방향, 매체별 실행 계획을 함께 검토합니다. 캠페인의 목적에 맞는 콘텐츠를 만들고 실제 집행 결과를 확인합니다.</p></div>}/>
      {SERVICES.map((service,index)=><section className="marketing-service" key={service.id}>
        <ScrollReveal className="marketing-service-heading"><p className="marketing-kicker">0{index+1} · {service.subtitle}</p><h2>{service.title.split(' ').map((word,i)=><React.Fragment key={i}>{i>0&&<> <br/></>}{word}</React.Fragment>)}</h2></ScrollReveal>
        <div><ScrollReveal><p className="editorial-body">{service.desc}</p></ScrollReveal><div className="marketing-features">{service.features.map((feature,i)=><ScrollReveal key={feature}><span>0{i+1}</span><h3>{feature}</h3></ScrollReveal>)}</div>{service.id==='signage'&&<ScrollReveal><button className="marketing-link" onClick={onSignageClick}>사이니지 플랫폼 살펴보기 <ArrowUpRight size={18}/></button></ScrollReveal>}</div>
      </section>)}
      <section className="marketing-final"><ScrollReveal><p className="marketing-kicker">Contact</p><h2>캠페인의 방향을<br/>함께 설계합니다.</h2><button className="marketing-link" onClick={onContactClick}>광고 문의하기 <ArrowUpRight size={18}/></button></ScrollReveal></section>
    </div>
  </motion.section></InsightsScrollContext.Provider>;
}
