import React, { createContext, useContext, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';

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

function SequenceLayer({position,index,active,children}:{position:MotionValue<number>;index:number;active:boolean;children:React.ReactNode}) {
  const incoming=HANDOFFS[index-1]??'dissolve';
  const outgoing=HANDOFFS[index]??'dissolve';
  const local=useTransform(position,value=>value-index);
  const opacity=useTransform(local,[-.35,0,.65,1],[0,1,1,0]);
  const scale=useTransform(local,[-.35,0,.65,1],[incoming==='zoom'?.4:1,1,1,outgoing==='zoom'?1.6:1]);
  const travel=(kind:TransitionKind)=>kind==='drop'?120:kind==='zoom'?48:0;
  const y=useTransform(local,[-.35,0,.65,1],[travel(incoming),0,0,-travel(outgoing)]);
  return <SequenceProgress.Provider value={local}><motion.div className="insights-deck-scene" data-scene={index} aria-hidden={!active} {...(!active?{inert:''}:{})} style={{opacity,scale,y,pointerEvents:active?'auto':'none'}}><div className="insights-deck-inner">{children}</div></motion.div></SequenceProgress.Provider>;
}
function ImageBridge({position}:{position:MotionValue<number>}) {
  // The image takes over the viewport before the work tiles settle independently.
  const opacity=useTransform(position,[4.6,4.8,4.92,5],[0,1,1,0]);
  const scale=useTransform(position,[4.6,5],[1.18,1]);
  const clipPath=useTransform(position,[4.6,4.88],['inset(38% 24% 38% 24%)','inset(0% 0% 0% 0%)']);
  return <motion.div className="insights-image-bridge" aria-hidden="true" style={{opacity,clipPath}}><motion.img src="/hero/pepsi-festa.webp" alt="" style={{scale}}/></motion.div>;
}
function ScenePair({scenes,start}:{scenes:React.ReactNode[];start:number}) {
  const container=useContext(InsightsScrollContext);
  const target=useRef<HTMLDivElement>(null);
  const {scrollYProgress}=useScroll({container,target,layoutEffect:false,offset:['start start','end end']});
  const {scrollYProgress:departure}=useScroll({container,target,layoutEffect:false,offset:['end end','end start']});
  const positionTarget=useTransform(scrollYProgress,value=>start+Math.min(1,value/0.76));
  const position=useSpring(positionTarget,{stiffness:200,damping:30,restDelta:.001});
  const exit=useSpring(departure,{stiffness:200,damping:30,restDelta:.001});
  const opacity=useTransform(exit,[0,.72],[1,0]);
  const [active,setActive]=useState(start);
  useMotionValueEvent(position,'change',value=>setActive(Math.max(start,Math.min(start+1,Math.floor(value+.175)))));
  return <div ref={target} className="insights-deck insights-scene-pair">
    <span className="insights-scroll-anchor" data-nav-scene={start}/>
    <span className="insights-scroll-anchor insights-scroll-anchor-end" data-nav-scene={start+1}/>
    <motion.div className="insights-deck-pin" style={{opacity}}>{scenes.map((scene,i)=><SequenceLayer key={i} position={position} index={start+i} active={active===start+i}>{scene}</SequenceLayer>)}{start===4&&<ImageBridge position={position}/>}</motion.div>
  </div>;
}
function FlowScene({scene,index,last=false}:{scene:React.ReactNode;index:number;last?:boolean}) {
  const container=useContext(InsightsScrollContext);
  const target=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({container,target,layoutEffect:false,offset:['start end','end start']});
  const progress=useSpring(scrollYProgress,{stiffness:200,damping:30,restDelta:.001});
  const opacity=useTransform(progress,[0,.28,.72,1],last?[0,1,1,1]:[0,1,1,0]);
  const y=useTransform(progress,[0,.28,.72,1],last?[48,0,0,0]:[48,0,0,-48]);
  return <section ref={target} data-nav-scene={index} className="insights-flow-scene"><motion.div style={{opacity,y}}>{scene}</motion.div></section>;
}
export function ScrollSequence({scenes}:{scenes:React.ReactNode[]}) {
  const reduce=useReducedMotion();
  if(reduce)return <div id="insights-sequence" className="insights-deck-static">{scenes.map((scene,i)=><section key={i} data-nav-scene={i}>{scene}</section>)}</div>;
  return <div id="insights-sequence">
    <ScenePair scenes={scenes.slice(0,2)} start={0}/>
    <FlowScene scene={scenes[2]} index={2}/>
    <FlowScene scene={scenes[3]} index={3}/>
    <ScenePair scenes={scenes.slice(4,6)} start={4}/>
    {scenes.slice(6).map((scene,i)=><FlowScene key={i} scene={scene} index={i+6} last={i===scenes.length-7}/>)}
  </div>;
}
