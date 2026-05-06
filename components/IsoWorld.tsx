import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

const UNIVERSE_DATA = [
  {
    id: 'space',
    title: 'NADAUN SPACE',
    subtitle: 'INFRA SOLUTION',
    desc: '모든 창작의 시작,\n압도적 기술력의 인프라',
    url: 'https://www.rainbowbene.com/',
    color: '#00C2FF',
    position: [-7, 0, 1.5] as [number, number, number],
    height: 3.5
  },
  {
    id: 'studio',
    title: 'NADAUN STUDIO',
    subtitle: 'VISUAL MASTERPIECE',
    desc: '찰나를 영원으로 기록하는\n비주얼 디렉팅',
    url: 'https://nadaun.framer.website/',
    color: '#FFB800',
    position: [-3.5, 0, -0.5] as [number, number, number],
    height: 4.5
  },
  {
    id: 'ailab',
    title: 'AI INNOVATION LAB',
    subtitle: 'FUTURE INTELLIGENCE',
    desc: '데이터로 예측하는\n마케팅의 새로운 차원',
    url: '',
    color: '#00FF94',
    position: [0, 0, -2.5] as [number, number, number],
    height: 5.2
  },
  {
    id: 'project',
    title: 'NADAUN PROJECT',
    subtitle: 'CREATIVE PERFORMANCE',
    desc: '시장을 뒤흔드는\n압도적 퍼포먼스',
    url: '',
    color: '#FF4D4D',
    position: [3.5, 0, -0.5] as [number, number, number],
    height: 4.0
  },
  {
    id: 'agency',
    title: 'NAN AGENCY',
    subtitle: 'FUTURE ENTERTAINMENT',
    desc: '뉴미디어 시대의\n아이콘을 육성',
    url: 'https://nanofficial.imweb.me/',
    color: '#9D4DFF',
    position: [7, 0, 1.5] as [number, number, number],
    height: 3.8
  }
];

// Static building — no mesh interaction (canvas is non-interactive for scroll passthrough)
const Building: React.FC<{ data: typeof UNIVERSE_DATA[0]; onAiLabClick?: () => void }> = ({ data, onAiLabClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.25;
  });

  const handleCardClick = () => {
    if (data.id === 'ailab' && onAiLabClick) {
      onAiLabClick();
    } else if (data.url) {
      window.open(data.url, '_blank');
    }
  };

  return (
    <group position={data.position}>
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.18}>
        <mesh ref={meshRef}>
          <boxGeometry args={[2, data.height, 2]} />
          <meshPhysicalMaterial
            color={data.color}
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
            transparent
            opacity={0.85}
            emissive={data.color}
            emissiveIntensity={0.18}
          />
        </mesh>
      </Float>

      {/* Html renders in a DOM portal — pointer-events: auto overrides parent's none */}
      <Html
        position={[0, data.height / 2 + 1.8, 0]}
        center
        distanceFactor={15}
        style={{ pointerEvents: 'auto' }}
      >
        <div
          className="flex flex-col items-center text-center w-[180px] select-none group cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:border-white/20 shadow-2xl">
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
      </Html>

      <ContactShadows opacity={0.4} scale={8} blur={2} far={4} color={data.color} resolution={128} />
    </group>
  );
};

// Entire universe slowly rotates — no user interaction needed
const Scene: React.FC<{ onAiLabClick?: () => void }> = ({ onAiLabClick }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 20, -10]} angle={0.3} penumbra={1} intensity={2} color="#4444ff" />
      <Environment preset="city" />

      <group ref={groupRef} position={[0, -2.0, 0]}>
        {UNIVERSE_DATA.map((item) => (
          <Building key={item.id} data={item} onAiLabClick={onAiLabClick} />
        ))}
      </group>
    </>
  );
};

interface IsoWorldProps {
  onAiLabClick?: () => void;
}

const IsoWorld: React.FC<IsoWorldProps> = ({ onAiLabClick }) => {
  return (
    <section id="isoworld" className="h-[100vh] w-full bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-black z-0" />
      <div
        className="absolute inset-0 z-0 opacity-20"
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

      {/* pointer-events: none → scroll passes through canvas to page */}
      <div className="w-full h-full absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
        <Canvas
          camera={{ position: [0, 5, 16], fov: 35 }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
        >
          <Scene onAiLabClick={onAiLabClick} />
        </Canvas>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default IsoWorld;
