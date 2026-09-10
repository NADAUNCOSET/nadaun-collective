import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

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

function Reveal({ children, className='' }: { children:React.ReactNode; className?:string }) {
  const reduce=useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : {opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.5,ease:EASE}}>{children}</motion.div>;
}

interface InsightsOverlayProps { isOpen:boolean; onClose:()=>void; onContactClick?:()=>void; }
export default function InsightsOverlay({isOpen,onClose,onContactClick}:InsightsOverlayProps) {
  const reduce=useReducedMotion();
  useEffect(() => {
    if(!isOpen) return;
    const handleKey=(event:KeyboardEvent)=>{if(event.key==='Escape')onClose();};
    window.addEventListener('keydown',handleKey);
    return ()=>window.removeEventListener('keydown',handleKey);
  },[isOpen,onClose]);
  if(!isOpen)return null;
  return <motion.section role="dialog" aria-modal="true" aria-label="NADAUN Insights" className="fixed inset-0 z-[105] overflow-y-auto overflow-x-hidden bg-[var(--nadaun-bg)] text-[var(--nadaun-text)]" initial={reduce ? false : {y:'100%'}} animate={{y:0}} transition={{duration:.4,ease:EASE}}>
    <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-[var(--nadaun-bg)] px-6 md:px-12">
      <span className="text-xs font-medium">NADAUN COLLECTIVE — INSIGHTS</span>
      <button onClick={onClose} type="button" aria-label="인사이트 닫기" className="grid h-11 w-11 place-items-center text-white/70 transition-colors hover:text-[#FBB200]"><X size={20} strokeWidth={1.5}/></button>
    </div>
    <div className="mx-auto max-w-[1680px] px-6 md:px-12 lg:px-20">
      <section className="grid min-h-[78svh] items-center gap-12 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
        <Reveal>
          <p className="mb-8 text-xs font-medium text-[#FBB200]">Creative · Media · Business</p>
          <h1 className="mb-10 font-black leading-[1.06] tracking-[-0.045em]" style={{fontFamily:'SUIT, Pretendard, sans-serif',fontSize:'clamp(3.4rem,6.7vw,7.2rem)'}}>콘텐츠에서<br/>매출까지<span className="text-[#FBB200]">.</span></h1>
          <p className="max-w-lg text-base leading-8 text-white/65 md:text-lg">크리에이티브의 완성도를 비즈니스의 성과로 연결합니다. 사진·영상 제작부터 매체 설계와 집행까지, 브랜드 메시지와 고객 접점을 하나의 실행 구조로 설계합니다.</p>
        </Reveal>
        <div className="grid grid-cols-5 items-start gap-3 md:gap-4">
          <img src="/hero/royal-salute.webp" alt="로얄살루트 제품 촬영" width="667" height="1000" className="col-span-2 mt-14 w-full" decoding="async"/>
          <div className="col-span-3 space-y-3 md:space-y-4">
            <img src="/hero/pepsi-festa.webp" alt="펩시 페스타 무대" width="1000" height="667" className="w-full" decoding="async"/>
            <img src={LIVERNOVO_POSTER} alt="리버노보 TVC 영상 스틸" width="1920" height="1080" className="w-full" decoding="async"/>
          </div>
        </div>
      </section>

      <section className="border-y border-white/15 py-16 md:py-24">
        <Reveal className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div><p className="mb-6 text-xs text-white/50">Business impact</p><p className="font-black leading-none tracking-[-0.055em]" style={{fontSize:'clamp(4rem,10vw,10rem)'}}>3,000<span className="ml-2 text-[.33em] tracking-tight">억 원</span><span className="text-[#FBB200]">+</span></p><p className="mt-6 text-base text-white/70">사진·영상·매체 프로젝트의 누적 매출 성과</p></div>
          <div className="max-w-lg"><h2 className="mb-5 text-2xl font-bold leading-snug tracking-tight md:text-3xl">브랜드가 보여야 할 장면과<br/>고객이 선택할 이유를 연결합니다.</h2><p className="text-sm leading-7 text-white/55 md:text-base">콘텐츠는 고객 접점에서 역할을 수행해야 합니다. 제품의 차별성을 보여주는 사진, 메시지의 맥락을 전달하는 영상, 적절한 시점에 도달하는 매체를 연결해 비즈니스의 실행력을 높입니다.</p></div>
        </Reveal>
      </section>

      <section className="py-20 md:py-28">
        <Reveal><p className="mb-5 text-xs text-white/50">How we work</p><h2 className="mb-12 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">전략과 제작,<br/>집행의 기준을 하나로.</h2></Reveal>
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">{PROCESS.map(item=><Reveal key={item.number} className="border-t border-white/15 pt-6"><p className="mb-8 text-xs text-[#FBB200]">{item.number} — {item.en}</p><h3 className="mb-5 text-2xl font-bold tracking-tight">{item.title}</h3><p className="text-sm leading-7 text-white/60 md:text-base">{item.body}</p><p className="mt-8 text-xs leading-6 text-white/40">{item.detail}</p></Reveal>)}</div>
      </section>

      <section className="border-t border-white/15 py-20 md:py-28">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="mb-5 text-xs text-white/50">Selected work</p><h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">실행의 장면들.</h2></div><p className="max-w-md text-sm leading-7 text-white/55">제품, 브랜드 경험, 기업 커뮤니케이션, 방송 광고까지.<br/>목적과 접점에 따라 제작의 언어를 조율합니다.</p></Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6">{WORK.map((work,i)=><a key={work.name} href={work.href} target="_blank" rel="noreferrer" className={'group block '+(i%2?'md:mt-16':'')}><div className="aspect-[4/3] overflow-hidden bg-white/5"><img src={work.src} alt={work.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"/></div><div className="mt-4 flex items-center justify-between gap-2"><h3 className="text-xs font-semibold md:text-sm">{work.name}</h3><ArrowUpRight size={17} className="shrink-0 text-white/40"/></div><p className="mt-2 text-xs text-white/45">{work.type}</p></a>)}</div>
      </section>

      <section className="border-t border-white/15 py-20 md:py-28">
        <Reveal><p className="mb-5 text-xs text-[#FBB200]">Media case study · 2025.10.22 — 11.21</p><h2 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">LIVERNOVO<br/>TVC 캠페인.</h2><p className="mb-12 max-w-2xl text-base leading-8 text-white/60">남·여 15초 소재 2편을 PP, IPTV 3사, 케이블과 재핑 매체에 집행했습니다. 계약 대비 송출 이행과 매체별 집계 결과를 구분해 캠페인의 실행 성과를 확인합니다.</p></Reveal>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">{[
          {n:'1,296',unit:'회',label:'PP 실제 송출',detail:'계약 311회 대비 416.7% 달성'},
          {n:'1,206',unit:'만',label:'IPTV 광고 노출',detail:'KT · LG · SK 3사 합산'},
          {n:'2,984',unit:'만 가구',label:'재핑 도달 가구',detail:'딜라이브 케이블 집계'},
          {n:'322',unit:'회',label:'케이블 송출',detail:'심포니 · 계약 262회'},
        ].map(k=><Reveal key={k.label} className="border-t border-white/15 pt-6"><p className="font-bold leading-none tracking-[-0.04em]" style={{fontSize:'clamp(2.3rem,4.3vw,4.6rem)'}}>{k.n}<span className="ml-1 text-[.3em] tracking-normal text-white/50">{k.unit}</span></p><p className="mt-5 text-sm font-medium">{k.label}</p><p className="mt-2 text-xs leading-6 text-white/45">{k.detail}</p></Reveal>)}</div>
        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div><h3 className="mb-8 text-lg font-semibold">PP 채널별 송출</h3><div className="space-y-5">{PP.map(row=><div key={row.channel} className="grid grid-cols-[100px_1fr_56px] items-center gap-4 text-sm"><span className="text-white/65">{row.channel}</span><div className="h-1.5 bg-white/10"><div className="h-full bg-[#FBB200]" style={{width:(row.count/336*100)+'%'}}/></div><span className="text-right tabular-nums">{row.count}회</span></div>)}</div></div>
          <div><h3 className="mb-6 text-lg font-semibold">IPTV 사업자별 광고 노출</h3>{IPTV.map(row=><div key={row.channel} className="flex items-center justify-between border-b border-white/10 py-5 text-sm"><span className="text-white/65">{row.channel}</span><span className="text-2xl font-semibold tabular-nums">{row.impressions}</span></div>)}</div>
        </div>
        <p className="mt-12 max-w-4xl text-xs leading-6 text-white/45">집계 기준: LIVERNOVO 캠페인 운영 리포트, 2025.11.25. 노출 건수와 도달 가구는 집계 단위가 다르므로 합산하지 않습니다. 매체 간 중복을 제거한 순도달 또는 구매 전환을 의미하지 않으며, 상단의 누적 매출 성과와 별도의 지표입니다.</p>
      </section>

      <section className="border-t border-white/15 py-20 md:py-28">
        <Reveal className="grid gap-10 lg:grid-cols-2 lg:gap-20"><div><p className="mb-5 text-xs text-white/50">Measurement principles</p><h2 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">좋은 리포트는<br/>지표의 경계를<br/>명확히 합니다.</h2></div><div className="space-y-8">{[
          ['집행 이행','계약 편수, 실제 송출, 기간과 소재를 대조해 계획이 어떻게 실행되었는지 확인합니다.'],
          ['미디어 성과','노출과 도달의 정의, 집계 단위, 중복 처리 범위를 명시해 서로 다른 매체를 해석합니다.'],
          ['비즈니스 성과','매출·전환 데이터의 측정 기간과 귀속 기준을 정한 뒤 콘텐츠와 매체의 기여를 검토합니다. 노출 수만으로 매출 효과를 단정하지 않습니다.'],
        ].map(([title,body])=><div key={title} className="border-t border-white/15 pt-5"><h3 className="mb-3 text-lg font-semibold">{title}</h3><p className="text-sm leading-7 text-white/60 md:text-base">{body}</p></div>)}</div></Reveal>
      </section>
      <section className="border-t border-white/15 py-20 md:py-28"><p className="mb-6 text-xs text-white/50">Next project</p><h2 className="mb-10 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">다음 비즈니스 과제,<br/>함께 설계하겠습니다.</h2><button type="button" onClick={()=>{onClose();onContactClick?.();}} className="inline-flex min-h-11 items-center gap-4 border-b border-white/40 pb-3 text-lg font-semibold transition-colors hover:text-[#FBB200]">프로젝트 문의하기 <ArrowUpRight size={20}/></button></section>
    </div>
  </motion.section>;
}
