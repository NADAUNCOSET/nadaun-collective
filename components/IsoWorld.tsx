import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

type LinkItem = { label: string; url: string };

type BuildingData = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  url?: string;
  b2b?: string;
  b2c?: string;
  btnLabels?: { b2b: string; b2c: string };
  links?: LinkItem[];  // multi-link grid (e.g. 4 links for SPACE)
  color: string;
  position: [number, number, number];
  height: number;
};

const UNIVERSE_DATA: BuildingData[] = [
  {
    id: 'space',
    title: 'NADAUN SPACE',
    subtitle: 'INFRA SOLUTION',
    desc: '모든 창작의 시작,\n압도적 기술력의 인프라',
    links: [
      { label: '자사몰',    url: 'https://www.rainbowbene.com/' },
      { label: '스토어',    url: 'https://smartstore.naver.com/rainbowbene' },
      { label: '블로그',    url: 'https://blog.naver.com/nadaunstudio' },
      { label: '블로그스팟', url: 'https://nadaunspace.blogspot.com/' },
    ],
    color: '#00C2FF',
    position: [-7, 0, 1.5],
    height: 3.5,
  },
  {
    id: 'ailab',
    title: 'AI INNOVATION LAB',
    subtitle: 'FUTURE INTELLIGENCE',
    desc: '데이터로 예측하는\n마케팅의 새로운 차원',
    color: '#00FF94',
    position: [-2, 0, -3],
    height: 5.2,
  },
  {
    id: 'moment',
    title: 'NADAUN MOMENT',
    subtitle: 'CORPORATE VISUAL ARCHIVE',
    desc: '기업의 순간을 정제된\n감각으로 영원히 기록',
    b2b: 'https://photo.nadaun.co',
    b2c: 'https://video.nadaun.co',
    btnLabels: { b2b: 'PHOTO →', b2c: 'VIDEO →' },
    color: '#FF8C00',
    position: [3, 0, -2],
    height: 4.0,
  },
  {
    id: 'agency',
    title: 'NAN AGENCY',
    subtitle: 'FUTURE ENTERTAINMENT',
    desc: '뉴미디어 시대의\n아이콘을 육성',
    url: 'https://nanofficial.imweb.me/',
    color: '#9D4DFF',
    position: [7, 0, 1.5],
    height: 3.8,
  },
  {
    id: 'starlogin',
    title: 'IP CONNECT',
    subtitle: 'GLOBAL IP NETWORK',
    desc: '글로벌 IP 네트워크로\n브랜드를 세계와 연결',
    b2b: 'https://starlogin.com',
    b2c: 'https://starlogin.com',
    btnLabels: { b2b: 'IP 네트워크 →', b2c: 'Global Agency →' },
    color: '#FF6B35',
    position: [0, 0, 5],
    height: 2.8,
  },
];

// Shared geometry cache
const BOX_GEOMETRIES: Record<number, THREE.BoxGeometry> = {};
const getBoxGeometry = (h: number) => {
  if (!BOX_GEOMETRIES[h]) BOX_GEOMETRIES[h] = new THREE.BoxGeometry(2, h, 2);
  return BOX_GEOMETRIES[h];
};

const Building: React.FC<{ data: BuildingData; onAiLabClick?: () => void; showLabel?: boolean }> = ({ data, onAiLabClick, showLabel = true }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
  });

  const isMoment = data.id === 'moment';
  const hasLinks = !!data.links && data.links.length > 0;
  const hasTwoLinks = (isMoment || data.id === 'starlogin') && !hasLinks;

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

      {showLabel && (
        <Html
          position={[0, data.height / 2 + 1.8, 0]}
          center
          distanceFactor={15}
          style={{ pointerEvents: 'auto' }}
        >
          <div className="flex flex-col items-center text-center select-none" style={{ width: hasLinks ? 200 : hasTwoLinks ? 200 : 170 }}>
            <div className="bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl w-full">
              <h3 className="text-sm font-bold tracking-tight mb-0.5" style={{ color: data.color }}>
                {data.title}
              </h3>
              <p className="text-[8px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                {data.subtitle}
              </p>
              <div className="h-[1px] w-full my-2" style={{ background: `linear-gradient(to right, transparent, ${data.color}44, transparent)` }} />
              <p className="text-[10px] text-gray-300 leading-relaxed whitespace-pre-line mb-2">
                {data.desc}
              </p>

              {/* 4-link grid (SPACE) */}
              {hasLinks ? (
                <div className="grid grid-cols-2 gap-1 mt-1">
                  {data.links!.map(link => (
                    <button
                      key={link.label}
                      className="text-[8px] font-bold uppercase tracking-wider py-1 px-1.5 rounded border transition-colors cursor-pointer"
                      style={{ borderColor: data.color + '50', color: data.color }}
                      onClick={() => window.open(link.url, '_blank')}
                    >
                      {link.label} →
                    </button>
                  ))}
                </div>
              ) : hasTwoLinks ? (
                <div className="flex gap-1.5 mt-1">
                  <button
                    className="flex-1 text-[8px] font-bold uppercase tracking-wider py-1 px-2 rounded border transition-colors cursor-pointer"
                    style={{ borderColor: data.color + '60', color: data.color }}
                    onClick={() => data.b2b && window.open(data.b2b, '_blank')}
                  >
                    {data.btnLabels?.b2b ?? 'B2B →'}
                  </button>
                  <button
                    className="flex-1 text-[8px] font-bold uppercase tracking-wider py-1 px-2 rounded border transition-colors"
                    style={data.b2c ? { borderColor: data.color + '60', color: data.color, cursor: 'pointer' } : { borderColor: '#333', color: '#555', cursor: 'default' }}
                    onClick={() => data.b2c && window.open(data.b2c, '_blank')}
                  >
                    {data.b2c ? (data.btnLabels?.b2c ?? 'B2C →') : 'Coming Soon'}
                  </button>
                </div>
              ) : (
                <div
                  className="mt-1 text-[8px] uppercase tracking-widest cursor-pointer"
                  style={{ color: data.url || data.id === 'ailab' ? data.color : '#555' }}
                  onClick={() => {
                    if (data.id === 'ailab' && onAiLabClick) onAiLabClick();
                    else if (data.url) window.open(data.url, '_blank');
                  }}
                >
                  {data.id === 'ailab' ? 'Explore →' : (data.url ? 'Enter →' : 'Coming Soon')}
                </div>
              )}
            </div>
            <div className="w-[1px] h-5 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </Html>
      )}
    </group>
  );
};

const MOBILE_IDS = new Set(['ailab', 'moment', 'agency', 'starlogin']);

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
      <Environment preset="night" />

      <group ref={groupRef} position={[0, -2.0, 0]}>
        {UNIVERSE_DATA
          .filter(item => !isMobile || MOBILE_IDS.has(item.id))
          .map(item => (
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

  // Mobile: 2D card grid
  if (isMobile) {
    return (
      <section id="isoworld" className="snap-section h-screen w-full bg-black flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 flex flex-col h-full px-5 py-14">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tighter text-white leading-none">
              NADAUN <span className="text-[#FFB800]">UNIVERSE</span>
            </h2>
            <p className="mt-3 text-[10px] tracking-[0.35em] uppercase text-white/30 font-light">
              나다운이 만드는 세계
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pb-4">
            {UNIVERSE_DATA.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-6%' }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col p-4 rounded-xl border bg-white/5 text-left"
                style={{ borderColor: item.color + '30' }}
              >
                <div className="w-2 h-2 rounded-full mb-2" style={{ background: item.color }} />
                <h3 className="text-xs font-bold leading-tight mb-0.5 text-white">
                  {item.title}
                </h3>
                <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-2">
                  {item.subtitle}
                </p>
                <p className="text-[10px] text-gray-400 leading-relaxed whitespace-pre-line flex-1">
                  {item.desc}
                </p>

                {/* Multi-link grid (SPACE) */}
                {item.links ? (
                  <div className="grid grid-cols-2 gap-1 mt-3">
                    {item.links.map(link => (
                      <button
                        key={link.label}
                        className="text-[8px] font-bold uppercase tracking-wider py-1.5 rounded border active:scale-95 transition-transform"
                        style={{ borderColor: item.color + '50', color: item.color }}
                        onClick={() => window.open(link.url, '_blank')}
                      >{link.label} →</button>
                    ))}
                  </div>
                ) : (item.b2b || item.b2c) ? (
                  <div className="flex gap-1.5 mt-3">
                    <button
                      className="flex-1 text-[8px] font-bold uppercase tracking-wider py-1.5 rounded border active:scale-95 transition-transform leading-tight"
                      style={{ borderColor: item.color + '60', color: item.color }}
                      onClick={() => item.b2b && window.open(item.b2b, '_blank')}
                    >{(item.btnLabels?.b2b ?? 'PHOTO →').replace(' →', '')}</button>
                    <button
                      className="flex-1 text-[8px] font-bold uppercase tracking-wider py-1.5 rounded border active:scale-95 transition-transform leading-tight"
                      style={item.b2c ? { borderColor: item.color + '60', color: item.color } : { borderColor: '#333', color: '#555' }}
                      onClick={() => item.b2c && window.open(item.b2c, '_blank')}
                    >{item.b2c ? (item.btnLabels?.b2c ?? 'VIDEO →').replace(' →', '') : 'Soon'}</button>
                  </div>
                ) : (
                  <button
                    className="mt-3 text-[9px] uppercase tracking-wider text-left active:scale-95 transition-transform"
                    style={{ color: item.url || item.id === 'ailab' ? item.color : '#444' }}
                    onClick={() => {
                      if (item.id === 'ailab' && onAiLabClick) onAiLabClick();
                      else if (item.url) window.open(item.url, '_blank');
                    }}
                  >
                    {item.id === 'ailab' ? 'Explore →' : (item.url ? 'Enter →' : 'Coming Soon')}
                  </button>
                )}
              </motion.div>
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

      <div className="w-full h-full absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
        <Canvas
          camera={{ position: [0, 5, 16], fov: 35 }}
          dpr={1}
          frameloop={frameloop}
          performance={{ min: 0.3 }}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
        >
          <Scene onAiLabClick={onAiLabClick} isMobile={false} />
        </Canvas>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default IsoWorld;
