import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import CompanyOverlay, { ContactLine, Reveal } from './CompanyOverlay';

const SERVICES = [
  { id:'integrated',number:'01',en:'Integrated Solution',title:'브랜드 전략과 사업 설계',body:'제품과 브랜드의 과제를 정의하고, IP 전략부터 시장 포지셔닝, 커머스와 유통까지 실행 구조를 설계합니다. 기획의 방향이 제작과 운영에 일관되게 이어지도록 연결합니다.',scope:['IP Architecture','Brand Strategy','Market Positioning','Commerce & Distribution'] },
  { id:'creative',number:'02',en:'Immersive Creative',title:'사진·영상 크리에이티브',body:'브랜드의 메시지와 매체의 특성에 맞춰 표현 방식을 설계합니다. 연출, 촬영, 편집, 3D와 모션그래픽을 조율해 사진과 영상의 제작 완성도를 높입니다.',scope:['TVC · CF','Brand Film · VCR','Photography','3D · Motion Graphics','지면 · 앨범'] },
  { id:'global',number:'03',en:'Global Network',title:'국내외 미디어 실행',body:'콘텐츠가 고객을 만나는 채널과 시점을 설계합니다. 방송과 IPTV, 오프라인 광고, 해외 매체를 프로젝트 목적에 맞게 구성하고 소재 제작부터 송출까지 연결합니다.',scope:['Broadcast · IPTV','BTL · Outdoor','Global Media','Overseas Network'] },
  { id:'ai',number:'04',en:'AI Innovation Lab',title:'AI를 활용한 제작 확장',body:'기획 시각화와 콘텐츠 제작 과정에 생성형 AI를 적용합니다. 기존 촬영·VFX 제작 방식과 결합해 표현의 선택지를 넓히고, 프로젝트별 제작 흐름을 설계합니다.',scope:['AI Production','VFX Pipeline','Generative AI'] },
];
const PROCESS = [
  { label:'01 · Brief', title:'과제와 목표', body:'프로젝트 목적, 타깃, 일정과 예산을 확인하고 필요한 실행 범위를 정의합니다.' },
  { label:'02 · Plan', title:'전략과 설계', body:'핵심 메시지, 크리에이티브 방향, 채널과 산출물의 기준을 구체화합니다.' },
  { label:'03 · Produce', title:'제작과 검수', body:'기획을 촬영과 후반 제작으로 구현하고, 사용 규격과 품질을 검수합니다.' },
  { label:'04 · Deliver', title:'납품과 실행', body:'합의한 규격으로 결과물을 납품하고, 매체 집행 범위에 따라 실행을 연결합니다.' },
];
interface BusinessOverlayProps {
  isOpen:boolean; startAtDomains?:boolean; onClose:()=>void;
  onAiLabClick?:()=>void; onIntegratedClick?:()=>void; onCreativeClick?:()=>void;
  onGlobalClick?:()=>void; onContactClick?:()=>void;
}
export default function BusinessOverlay({isOpen,startAtDomains,onClose,onAiLabClick,onIntegratedClick,onCreativeClick,onGlobalClick,onContactClick}:BusinessOverlayProps) {
  if (!isOpen) return null;
  const actions:Record<string,(()=>void)|undefined> = { integrated:onIntegratedClick,creative:onCreativeClick,global:onGlobalClick,ai:onAiLabClick };
  return <CompanyOverlay title="Business" onClose={onClose} startSection={startAtDomains?'business-services':undefined} sections={[{id:'business-services',label:'Services'},{id:'business-process',label:'Process'}]}>
    <section className="cp-hero"><div><p className="cp-label accent">Four disciplines. One team.</p><h1 className="cp-title">브랜드의 과제를<br/><em>실행 가능한 결과로.</em></h1></div><p className="cp-description">전략, 제작, 매체, 기술. 네 가지 전문 영역을 프로젝트에 맞춰 연결합니다. 필요한 분야의 개별 협업부터 기획·제작·집행을 통합한 운영까지, 목표와 범위에 맞는 팀을 구성합니다.</p></section>
    <section id="business-services" tabIndex={-1} aria-label="Business services" className="cp-services">{SERVICES.map(item=><Reveal key={item.id}><article className="cp-service"><div className="cp-service-top"><p className="cp-label accent">{item.en}</p><span className="cp-label">{item.number}</span></div><h2>{item.title}</h2><p className="cp-description">{item.body}</p><ul>{item.scope.map(scope=><li key={scope}>{scope}</li>)}</ul>{actions[item.id]&&<button type="button" onClick={actions[item.id]} className="cp-text-link" aria-label={`${item.en} 자세히 보기`}>자세히 보기 <ArrowUpRight size={18} strokeWidth={1.5}/></button>}</article></Reveal>)}</section>
    <section id="business-process" tabIndex={-1} className="cp-section"><div className="cp-section-heading"><p className="cp-label">How we work</p><h2>시작부터 전달까지,<br/>명확한 실행 순서.</h2></div><ol className="cp-process">{PROCESS.map(item=><li key={item.label}><p className="cp-label accent">{item.label}</p><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol></section>
    <ContactLine onClick={onContactClick}/>
  </CompanyOverlay>;
}
