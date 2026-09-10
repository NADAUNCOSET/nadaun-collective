import React, { createContext, useContext, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, MotionValue, MotionStyle } from 'framer-motion';

export const InsightsScrollContext=createContext<React.RefObject<HTMLElement>|undefined>(undefined);
const SceneProgress=createContext<MotionValue<number>|null>(null);

export function ScrollReveal({children,className=''}:{children:React.ReactNode;className?:string}) {
  const container=useContext(InsightsScrollContext);
  const target=useRef<HTMLDivElement>(null);
  const reduce=useReducedMotion();
  const {scrollYProgress}=useScroll({container,target,layoutEffect:false,offset:['start 0.96','start 0.66']});
  const opacity=useTransform(scrollYProgress,[0,1],[0,1]);
  const y=useTransform(scrollYProgress,[0,1],[36,0]);
  return <motion.div ref={target} className={className} style={reduce?undefined:{opacity,y}}>{children}</motion.div>;
}

export function SceneLine({children,visible=false}:{children:React.ReactNode;visible?:boolean}) {
  const scene=useContext(SceneProgress);
  const finalProgress=useMotionValue(1);
  const reduce=useReducedMotion();
  const progress=scene??finalProgress;
  const y=useTransform(progress,[0,.22],visible?['0%','0%']:['105%','0%']);
  const opacity=useTransform(progress,[0,.16],visible?[1,1]:[0,1]);
  return <span className="insights-line"><motion.span style={reduce?undefined:{y,opacity}}>{children}</motion.span></span>;
}

export function ScrollStory({intro,impact}:{intro:React.ReactNode;impact:React.ReactNode}) {
  const container=useContext(InsightsScrollContext);
  const target=useRef<HTMLDivElement>(null);
  const reduce=useReducedMotion();
  const {scrollYProgress}=useScroll({container,target,layoutEffect:false,offset:['start start','end end']});
  // One shared transition preserves velocity and acceleration across both scenes.
  // The 200/30 response follows the original Collective motion system.
  const transitionTarget=useTransform(scrollYProgress,[.30,.66],[0,1]);
  const transition=useSpring(transitionTarget,{stiffness:200,damping:30,restDelta:.001});
  const introOpacity=useTransform(transition,[0,1],[1,0]);
  const impactOpacity=transition;
  const introY=useTransform(transition,[0,1],['0%','-12%']);
  const impactY=useTransform(transition,[0,1],['12%','0%']);
  const introScale=useTransform(transition,[0,1],[1,1.5]);
  const impactScale=useTransform(transition,[0,1],[.5,1]);
  const [impactActive,setImpactActive]=useState(false);
  useMotionValueEvent(transition,'change',value=>setImpactActive(value>=.5));
  return <SceneProgress.Provider value={scrollYProgress}>
    <div ref={target} id="insights-story" className={`insights-story${reduce?' insights-story-static':''}`}>
      <div className="insights-story-pin">
        <motion.div className="insights-scene" aria-hidden={!reduce&&impactActive} style={reduce?undefined:{opacity:introOpacity,y:introY,scale:introScale,pointerEvents:impactActive?'none':'auto'}}>{intro}</motion.div>
        <motion.div className="insights-scene insights-impact" aria-hidden={!reduce&&!impactActive} style={reduce?undefined:{opacity:impactOpacity,y:impactY,scale:impactScale,pointerEvents:impactActive?'auto':'none'}}>{impact}</motion.div>
      </div>
    </div>
  </SceneProgress.Provider>;
}

// A shared clock drives each hand-off. Adjacent layers use the same travel and
// interval; the motif changes with the content rather than restarting an effect.
const SequenceProgress=createContext<MotionValue<number>|null>(null);
type TransitionKind='zoom'|'drop'|'cover'|'dissolve';
const HANDOFFS:TransitionKind[]=['zoom','drop','drop','drop','cover','zoom','dissolve','drop','zoom'];

export function SceneObject({children,order=0}:{children:React.ReactNode;order?:number}) {
  const scene=useContext(SequenceProgress);
  const settled=useMotionValue(0);
  const reduce=useReducedMotion();
  const offset=order*.035;
  const y=useTransform(scene??settled,[-.35+offset,offset,.65+offset,1+offset],[64,0,0,-64]);
  return <motion.div style={reduce?undefined:{y}}>{children}</motion.div>;
}

export function SceneType({as='h2',order=0,className,children}:{as?:'h1'|'h2'|'p';order?:number;className?:string;children:React.ReactNode}) {
  const context=useContext(SequenceProgress);
  const settled=useMotionValue(0);
  const p=context??settled;
  const delay=order*.055;
  const opacity=useTransform(p,[-.18+delay,delay,.60,.78],[0,1,1,0]);
  const y=useTransform(p,[-.18+delay,delay,.60,.78],[28,0,0,-24]);
  const Tag=as==='h1'?motion.h1:as==='p'?motion.p:motion.h2;
  return <Tag className={className} style={{opacity,y}}>{children}</Tag>;
}

function SequenceLayer({position,index,active,children}:{position:MotionValue<number>;index:number;active:boolean;children:React.ReactNode}) {
  const local=useTransform(position,value=>value-index);
  const opacity=useTransform(local,[-.38,-.05,.80,1.12],[0,1,1,0]);
  // The preceding copy is fully gone at .78; following copy starts at .82.
  // Media overlaps throughout that interval and moves independently of the type.
  const copy=useTransform(local,[-.18,0,.60,.78],[0,1,1,0]);
  const visibility=useTransform(local,value=>value>=-.38&&value<=1.12?'visible':'hidden');
  const mediaY=useTransform(local,[-.38,0,.74,1.12],['48px','0px','0px','-48px']);
  const mediaScale=useTransform(local,[-.38,0,.74,1.12],[1.07,1,1,1.05]);
  const style={opacity,visibility,pointerEvents:active?'auto':'none','--scene-copy-opacity':copy,'--scene-media-y':mediaY,'--scene-media-scale':mediaScale} as MotionStyle;
  return <SequenceProgress.Provider value={local}><motion.div className="insights-deck-scene" data-scene={index} aria-hidden={!active} {...(!active?{inert:''}:{})} style={style}><div className="insights-deck-inner">{children}</div></motion.div></SequenceProgress.Provider>;
}
function ImageBridge({position}:{position:MotionValue<number>}) {
  // The image takes over the viewport before the work tiles settle independently.
  const opacity=useTransform(position,[4.6,4.8,4.92,5],[0,1,1,0]);
  const scale=useTransform(position,[4.6,5],[1.18,1]);
  const clipPath=useTransform(position,[4.6,4.88],['inset(38% 24% 38% 24%)','inset(0% 0% 0% 0%)']);
  return <motion.div className="insights-image-bridge" aria-hidden="true" style={{opacity,clipPath}}><motion.img src="/hero/pepsi-festa.webp" alt="" style={{scale}}/></motion.div>;
}
export function ScrollSequence({scenes}:{scenes:React.ReactNode[]}) {
  const reduce=useReducedMotion();
  const container=useContext(InsightsScrollContext);
  const target=useRef<HTMLDivElement>(null);
  const {scrollYProgress}=useScroll({container,target,layoutEffect:false,offset:['start start','end end']});
  const clock=useTransform(scrollYProgress,value=>value*(scenes.length-1+.52));
  const position=useSpring(clock,{stiffness:200,damping:30,restDelta:.001});
  const [active,setActive]=useState(0);
  useMotionValueEvent(position,'change',value=>setActive(Math.max(0,Math.min(scenes.length-1,Math.floor(value+.20)))));
  if(reduce)return <div id="insights-sequence" className="insights-deck-static">{scenes.map((scene,i)=><section key={i} data-nav-scene={i}>{scene}</section>)}</div>;
  return <div ref={target} id="insights-sequence" className="insights-connected-stage" style={{height:`calc(var(--collective-view-height,100svh) * ${scenes.length*.95})`}}>
    {scenes.map((_,i)=><span key={i} className="insights-scroll-anchor" data-nav-scene={i} style={{top:`calc((100% - var(--collective-view-height,100svh)) * ${i/(scenes.length-1+.52)})`}}/>)}
    <div className="insights-deck-pin">{scenes.map((scene,index)=><SequenceLayer key={index} position={position} index={index} active={active===index}>{scene}</SequenceLayer>)}<ImageBridge position={position}/></div>
  </div>;
}
