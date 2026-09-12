import React, { createContext, useContext, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, MotionValue, MotionStyle } from 'framer-motion';

export const InsightsScrollContext=createContext<React.RefObject<HTMLElement>|undefined>(undefined);
const SceneProgress=createContext<MotionValue<number>|null>(null);

/** Native scroll supplies one reversible clock; the 200/30 spring is About's response. */
export function ScrollReveal({children,className=''}:{children:React.ReactNode;className?:string}) {
  const container=useContext(InsightsScrollContext);
  const target=useRef<HTMLDivElement>(null);
  const {scrollYProgress}=useScroll({container,target,layoutEffect:false,offset:['start 0.98','end 0.04']});
  const p=useSpring(scrollYProgress,{stiffness:200,damping:30,restDelta:.001});
  const opacity=useTransform(p,[0,.20,.78,1],[0,1,1,0]);
  const y=useTransform(p,[0,.20,.78,1],[64,12,-16,-64]);
  return <motion.div ref={target} className={className} data-scroll-reveal style={{opacity,y}}>{children}</motion.div>;
}

export function SceneLine({children,visible=false,order=0}:{children:React.ReactNode;visible?:boolean;order?:number}) {
  const scene=useContext(SceneProgress);
  const finalProgress=useMotionValue(.22);
  const progress=scene??finalProgress;
  const delay=order*.035;
  const y=useTransform(progress,[0,.16+delay,.30,.48],visible?['0%','-4%','-12%','-105%']:['105%','0%','-8%','-105%']);
  const opacity=useTransform(progress,[0,.12+delay,.32,.46],visible?[1,1,1,0]:[0,1,1,0]);
  return <span className="insights-line"><motion.span style={{y,opacity}}>{children}</motion.span></span>;
}

export function StoryMedia({src,alt,caption}:{src:string;alt:string;caption?:string}) {
  const scene=useContext(SceneProgress);
  const settled=useMotionValue(0);
  const p=scene??settled;
  const y=useTransform(p,[0,.25,.58,1],[56,0,-48,-80]);
  const scale=useTransform(p,[0,.35,.60,1],[1.15,1.02,1.22,1.32]);
  const filter=useTransform(p,[0,.34,.50,.68],['brightness(1)','brightness(1)','brightness(.2)','brightness(.12)']);
  const clipPath=useTransform(p,[0,.30,.58],['inset(10% 8% 10% 8%)','inset(0% 0% 0% 0%)','inset(0% 0% 0% 0%)']);
  return <motion.figure className="story-media" style={{y,clipPath}}><motion.img src={src} alt={alt} decoding="async" style={{scale,filter}}/>{caption&&<figcaption>{caption}</figcaption>}</motion.figure>;
}

export function ScrollStory({intro,impact}:{intro:React.ReactNode;impact:React.ReactNode}) {
  const container=useContext(InsightsScrollContext);
  const target=useRef<HTMLDivElement>(null);
  const {scrollYProgress}=useScroll({container,target,layoutEffect:false,offset:['start start','end end']});
  const p=useSpring(scrollYProgress,{stiffness:200,damping:30,restDelta:.001});
  const introOpacity=useTransform(p,[0,.52,.68],[1,1,0]);
  const introCopy=useTransform(p,[0,.32,.45],[1,1,0]);
  const impactOpacity=useTransform(p,[.46,.55,1],[0,1,1]);
  const introY=useTransform(p,[0,.30,.52],[0,-20,-100]);
  const impactY=useTransform(p,[.45,.70,1],[100,12,-32]);
  const introScale=useTransform(p,[0,.52],[1,1.16]);
  const impactScale=useTransform(p,[.45,1],[.92,1.025]);
  const [impactActive,setImpactActive]=useState(false);
  useMotionValueEvent(p,'change',value=>setImpactActive(value>=.48));
  return <SceneProgress.Provider value={p}>
    <div ref={target} className="insights-story" data-scroll-story>
      <div className="insights-story-pin">
        <motion.div className="insights-scene" aria-hidden={impactActive} {...(impactActive?{inert:''}:{})} style={{opacity:introOpacity,y:introY,scale:introScale,transformOrigin:'left center',pointerEvents:impactActive?'none':'auto','--story-copy-opacity':introCopy} as MotionStyle}>{intro}</motion.div>
        <motion.div className="insights-scene insights-impact" aria-hidden={!impactActive} {...(!impactActive?{inert:''}:{})} style={{opacity:impactOpacity,y:impactY,scale:impactScale,transformOrigin:'left center',pointerEvents:impactActive?'auto':'none'}}>{impact}</motion.div>
      </div>
    </div>
  </SceneProgress.Provider>;
}

// Each scene shares the same scroll clock, with a different role for type, figures and media.
// Scroll choreography is the approved content structure, including on hosts with reduced motion.
const SequenceProgress=createContext<MotionValue<number>|null>(null);

export function SceneObject({children,order=0}:{children:React.ReactNode;order?:number}) {
  const scene=useContext(SequenceProgress);
  const settled=useMotionValue(0);
  const offset=order*.035;
  const y=useTransform(scene??settled,[-.30+offset,offset,.62,1.05],[64,0,-20-order*4,-80]);
  return <motion.div style={{y}}>{children}</motion.div>;
}

export function SceneType({as='h2',order=0,className,children}:{as?:'h1'|'h2'|'p';order?:number;className?:string;children:React.ReactNode}) {
  const context=useContext(SequenceProgress);
  const settled=useMotionValue(0);
  const p=context??settled;
  const delay=order*.035;
  const opacity=useTransform(p,[-.18+delay,delay,.60,.78],[0,1,1,0]);
  const y=useTransform(p,[-.18+delay,delay,.60,.78],[32,0,-16,-44]);
  const Tag=as==='h1'?motion.h1:as==='p'?motion.p:motion.h2;
  return <Tag className={className} style={{opacity,y}}>{children}</Tag>;
}

export function SceneBar({ratio}:{ratio:number}) {
  const context=useContext(SequenceProgress);
  const settled=useMotionValue(.5);
  const scaleX=useTransform(context??settled,[-.12,.48],[0,1]);
  return <motion.span style={{width:`${ratio*100}%`,scaleX,transformOrigin:'left'}}/>;
}

function SequenceLayer({position,index,active,children}:{position:MotionValue<number>;index:number;active:boolean;children:React.ReactNode}) {
  const local=useTransform(position,value=>value-index);
  const opacity=useTransform(local,[-.38,-.05,.72,1],[0,1,1,0]);
  // Previous copy leaves before the next title arrives; images bridge the gap.
  const copy=useTransform(local,[-.18,0,.60,.78],[0,1,1,0]);
  const visibility=useTransform(local,value=>value>=-.38&&value<=1.12?'visible':'hidden');
  const mediaY=useTransform(local,[-.38,0,.70,1.12],['80px','16px','-32px','-96px']);
  const mediaScale=useTransform(local,[-.38,0,.70,1.12],index===0?[1.18,1.08,1,1.12]:[1.12,1.05,1,1.06]);
  const figureScale=useTransform(local,[-.2,0,.65,1.05],[.92,1,1.055,1.18]);
  const rule=useTransform(local,[-.12,.58],[0,1]);
  const style={opacity,visibility,pointerEvents:active?'auto':'none','--scene-copy-opacity':copy,'--scene-media-y':mediaY,'--scene-media-scale':mediaScale,'--scene-figure-scale':figureScale,'--scene-rule':rule} as MotionStyle;
  return <SequenceProgress.Provider value={local}><motion.div className="insights-deck-scene" data-scene={index} aria-hidden={!active} {...(!active?{inert:''}:{})} style={style}><div className="insights-deck-inner">{children}</div></motion.div></SequenceProgress.Provider>;
}
function ImageBridge({position}:{position:MotionValue<number>}) {
  const opacity=useTransform(position,[.60,.77,.87,.99],[0,1,1,0]);
  const scale=useTransform(position,[.60,1.03],[1.2,1]);
  const clipPath=useTransform(position,[.60,.88],['inset(32% 24% 32% 24%)','inset(0% 0% 0% 0%)']);
  return <motion.div className="insights-image-bridge" aria-hidden="true" style={{opacity,clipPath}}><motion.img src="https://media.nadaun.co/video/%EA%B0%80%EB%A1%9C/20251020%20Livernovo%20v1%2015s%20final_%20WEB%20HIGH%20AD_1080p.jpg" alt="" style={{scale}}/></motion.div>;
}
export function ScrollSequence({scenes}:{scenes:React.ReactNode[]}) {
  const container=useContext(InsightsScrollContext);
  const target=useRef<HTMLDivElement>(null);
  const {scrollYProgress}=useScroll({container,target,layoutEffect:false,offset:['start start','end end']});
  const clock=useTransform(scrollYProgress,value=>value*(scenes.length-1+.52));
  const position=useSpring(clock,{stiffness:200,damping:30,restDelta:.001});
  const [active,setActive]=useState(0);
  useMotionValueEvent(position,'change',value=>setActive(Math.max(0,Math.min(scenes.length-1,Math.floor(value+.20)))));
  return <div ref={target} id="insights-sequence" className="insights-connected-stage" style={{height:`calc(var(--collective-view-height,100svh) * ${scenes.length*1.35})`}}>
    {scenes.map((_,i)=><span key={i} className="insights-scroll-anchor" data-nav-scene={i} style={{top:`calc((100% - var(--collective-view-height,100svh)) * ${(i===0?0:i+.16)/(scenes.length-1+.52)})`}}/>)}
    <div className="insights-deck-pin">{scenes.map((scene,index)=><SequenceLayer key={index} position={position} index={index} active={active===index}>{scene}</SequenceLayer>)}<ImageBridge position={position}/></div>
  </div>;
}
