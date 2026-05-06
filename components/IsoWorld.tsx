import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Environment } from '@react-three/drei';
import * as THREE from 'three';

const UNIVERSE_DATA = [
  { id: 'space',   title: 'NADAUN SPACE',        subtitle: 'INFRA SOLUTION',         desc: '모든 창작의 시작,\n압도적 기술력의 인프라',   url: 'https://www.rainbowbene.com/',                                         color: '#00C2FF', position: [-7,   0,  1.5] as [number,number,number], height: 3.5 },
  { id: 'studio',  title: 'NADAUN STUDIO',       subtitle: 'VISUAL MASTERPIECE',     desc: '찰나를 영원으로 기록하는\n비주얼 디렉팅',       url: 'https://nadaun.framer.website/',                                        color: '#FFB800', position: [-3.5, 0, -0.5] as [number,number,number], height: 4.5 },
  { id: 'ailab',   title: 'AI INNOVATION LAB',   subtitle: 'FUTURE INTELLIGENCE',    desc: '데이터로 예측하는\n마케팅의 새로운 차원',       url: '',                                                                      color: '#00FF94', position: [0,    0, -2.5] as [number,number,number], height: 5.2 },
  { id: 'project', title: 'NADAUN PROJECT',      subtitle: 'CREATIVE PERFORMANCE',   desc: '시장을 뒤흔드는\n압도적 퍼포먼스',             url: '',                                                                      color: '#FF4D4D', position: [3.5,  0, -0.5] as [number,number,number], height: 4.0 },
  { id: 'agency',  title: 'NAN AGENCY',          subtitle: 'FUTURE ENTERTAINMENT',   desc: '뉴미디어 시대의\n아이콘을 육성',               url: 'https://nanofficial.imweb.me/',                                         color: '#9D4DFF', position: [7,    0,  1.5] as [number,number,number], height: 3.8 },
  { id: 'moment',  title: 'NADAUN MOMENT',       subtitle: 'CORPORATE VISUAL ARCHIVE',desc: '기업의 순간을 정제된\n감각으로 영원히 기록',  url: 'https://nadaun-portfolio.vercel.app/nadaun-portfolio.html',            color: '#FF8C00', position: [10.5, 0,  4.5] as [number,number,number], height: 3.2 },
];

// Shared geometry cache
const BOX_GEOMETRIES: Record<number, THREE.BoxGeometry> = {};
const getBoxGeometry = (height: number) => {
  if (!BOX_GEOMETRIES[height]) BOX_GEOMETRIES[height] = new THREE.BoxGeometry(2, height, 2);
  return BOX_GEOMETRIES[height];
};

const Building: React.FC<{ data: typeof UNIVERSE_DATA[0]; onAiLabClick?: () => void; showLabel?: boolean }> = ({ data, onAiLabClick, showLabel = true }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Individual slow spin — group also rotates, so keep this subtle
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
  });

  const handleCardClick = () => {
    if (data.id === 'ailab' && onAiLabClick) onAiLabClick();
    else if (data.url) window.open(data.url, '_blank');
  };

  return (
    <group position={data.position}>
      <mesh ref={meshRef} geometry={getBoxGeometry(data.height)}>
        <meshStandardMaterial
          color={data.color}
          metalness={0.6}
          roughness={0.3}
          emissive={data.color}
          emissiveIntensity={0.12}
          transparent
          opacity={0.88}
        />
      </mesh>

      {showLabel && <Html
        position={[0, data.height / 2 + 1.8, 0]}
        center
        distanceFactor={15}
        style={{ pointerEvents: 'auto' }}
      >
        <div
          className="flex flex-col items-center text-center w-[170px] select-none group cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:border-white/20 shadow-xl">
            <h3 className="text-sm font-bold tracking-tight mb-0.5" style={{ color: data.color }}>
              {data.title}
            </h3>
            <p className="text-[8px] font-bold tracking-[0.2em] text-gray-500 uppercase">
              {data.subtitle}
            </p>
            <div className="h-[1px] w-full my-2" style={{ background: `linear-gradient(to right, transparent, ${data.color}44, transparent)` }} />
            <p className="text-[10px] text-gray-300 leading-relaxed whitespace-pre-line">
              {data.desc}
            </p>
            <div className="mt-2 text-[8px] uppercase tracking-widest transition-colors" style={{ color: data.url || data.id === 'ailab' ? data.color : '#555' }}>
              {data.id === 'ailab' ? 'Explore →' : (data.url ? 'Enter →' : 'Coming Soon')}
            </div>
          </div>
          <div className="w-[1px] h-5 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </Html>}
    </group>
  );
};

// On mobile: show only 3 core buildings to reduce draw calls
const MOBILE_IDS = new Set(['studio', 'ailab', 'project']);

const Scene: React.FC<{ onAiLabClick?: () => void; isMobile?: boolean }> = ({ onAiLabClick, isMobile }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, 8, -8]} intensity={0.4} color="#4444ff" />
      {/* Single Environment (lighter than HDR city) */}
      <Environment preset="night" />

      <group ref={groupRef} position={[0, -2.0, 0]}>
        {UNIVERSE_DATA
          .filter(item => !isMobile || MOBILE_IDS.has(item.id))
          .map((item) => (
            <Building key={item.id} data={item} onAiLabClick={onAiLabClick} showLabel={!isMobile} />
          ))}
      </group>
    </>
  );
};

interface IsoWorldProps {
  onAiLabClick?: () => void;
}

const IsoWorld: React.FC<IsoWorldProps> = ({ onAiLabClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [frameloop, setFrameloop] = useState<'never' | 'always'>('never');
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFrameloop(entry.isIntersecting ? 'always' : 'never'),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Mobile: replace 3D with a 2D card grid — better UX, much lighter
  if (isMobile) {
    return (
      <section id="isoworld" className="snap-section h-screen w-full bg-black flex flex-col overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 flex flex-col h-full px-5 py-16">
          <h2 className="text-3xl font-bold tracking-tighter text-white mb-6">
            NADAUN <span className="text-[#FFB800]">UNIVERSE</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pb-4">
            {UNIVERSE_DATA.map((item) => (
              <button
                key={item.id}
                className="flex flex-col p-4 rounded-xl border border-white/10 bg-white/5 text-left active:scale-95 transition-transform"
                style={{ borderColor: item.color + '30' }}
                onClick={() => {
                  if (item.id === 'ailab' && onAiLabClick) onAiLabClick();
                  else if (item.url) window.open(item.url, '_blank');
                }}
              >
                <div className="w-2 h-2 rounded-full mb-2" style={{ background: item.color }} />
                <h3 className="text-xs font-bold leading-tight mb-1" style={{ color: item.color }}>
                  {item.title}
                </h3>
                <p className="text-[9px] text-gray-500 uppercase tracking-wider">
                  {item.subtitle}
                </p>
                <p className="text-[10px] text-gray-400 mt-2 leading-relaxed whitespace-pre-line">
                  {item.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="isoworld" className="snap-section h-[100vh] w-full bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-black z-0" />
      <div
        className="absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="absolute top-16 left-0 w-full z-10 pointer-events-none">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl">
            NADAUN <span className="text-[#FFB800]">UNIVERSE</span>
          </h2>
        </div>
      </div>

      {/* pointer-events: none → scroll passes through to page */}
      <div className="w-full h-full absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
        <Canvas
          camera={{ position: [0, 5, isMobile ? 22 : 16], fov: isMobile ? 45 : 35 }}
          dpr={isMobile ? 0.75 : 1}        // Lower DPR on mobile — biggest GPU win
          frameloop={frameloop}            // Pause GPU when section off-screen
          performance={{ min: 0.3 }}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
        >
          <Scene onAiLabClick={onAiLabClick} isMobile={isMobile} />
        </Canvas>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default IsoWorld;
