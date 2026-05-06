import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, useCursor, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

// --- DATA CONFIGURATION ---
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
    url: '', // Coming Soon
    color: '#00FF94', 
    position: [0, 0, -2.5] as [number, number, number], 
    height: 5.2
  },
  { 
    id: 'project', 
    title: 'NADAUN PROJECT', 
    subtitle: 'CREATIVE PERFORMANCE',
    desc: '시장을 뒤흔드는\n압도적 퍼포먼스',
    url: '', // Coming Soon
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

// --- 3D COMPONENTS ---

const Building: React.FC<{ data: typeof UNIVERSE_DATA[0], onAiLabClick?: () => void }> = ({ data, onAiLabClick }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Change cursor on hover
  useCursor(hovered);

  const { scale, color, lift } = useSpring({
    scale: hovered ? 1.1 : 1,
    lift: hovered ? 0.5 : 0,
    color: hovered ? data.color : '#444',
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const handleClick = () => {
    if (data.id === 'ailab' && onAiLabClick) {
      onAiLabClick();
    } else if (data.url) {
      window.open(data.url, '_blank');
    } else {
      // Intentionally empty logic or a specific alert can be used
      // The label already shows "Coming Soon"
    }
  };

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  const boxGeometry = useMemo(() => new THREE.BoxGeometry(2, data.height, 2), [data.height]);

  return (
    <group position={data.position}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <animated.mesh
          ref={meshRef}
          position-y={lift}
          scale={scale}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[2, data.height, 2]} />
          <animated.meshPhysicalMaterial 
            color={color}
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
            transparent
            opacity={0.9}
            emissive={data.color}
            emissiveIntensity={hovered ? 0.5 : 0.1}
          />
          <lineSegments>
            <edgesGeometry args={[boxGeometry]} />
            <meshBasicMaterial color={data.color} transparent opacity={0.3} />
          </lineSegments>
        </animated.mesh>
      </Float>

      {/* Adjusted label position to be slightly tighter to the building */}
      <Html position={[0, data.height / 2 + 1.8, 0]} center distanceFactor={15} style={{ pointerEvents: 'none' }}>
        <div 
          className={`transition-all duration-300 flex flex-col items-center text-center w-[280px] select-none ${hovered ? 'scale-110 opacity-100 z-50' : 'scale-100 opacity-60 z-0'}`}
        >
          <div className="bg-black/90 backdrop-blur-md border border-white/10 p-4 rounded-lg shadow-2xl pointer-events-auto">
            <h3 
              className="text-lg font-bold tracking-tight mb-1"
              style={{ color: data.color }}
            >
              {data.title}
            </h3>
            <p className="text-[9px] font-bold tracking-[0.2em] text-gray-500 mb-2 uppercase">
              {data.subtitle}
            </p>
            <div className={`h-[1px] w-full bg-gradient-to-r from-transparent via-${data.color} to-transparent mb-2 opacity-50`}></div>
            <p className="text-[11px] text-gray-300 font-light leading-relaxed whitespace-pre-line">
              {data.desc}
            </p>
            {hovered && (
               <div className="mt-3 text-[9px] uppercase tracking-widest text-white bg-white/10 py-1 px-3 rounded-full border border-white/10 inline-block">
                 {data.id === 'ailab' ? 'Click to Explore' : (data.url ? 'Click to Enter' : 'Coming Soon')}
               </div>
            )}
          </div>
          <div className="w-[1px] h-6 bg-gradient-to-b from-white/30 to-transparent"></div>
        </div>
      </Html>

      <ContactShadows opacity={0.6} scale={10} blur={2.5} far={4} color={data.color} resolution={256} />
    </group>
  );
};

// Mouse parallax camera — replaces OrbitControls entirely
// Scroll events are no longer captured by the canvas
const CameraController: React.FC = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 5 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth - 0.5;  // -0.5 ~ 0.5
      mouse.current.y = e.clientY / window.innerHeight - 0.5; // -0.5 ~ 0.5
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame(() => {
    // Lerp camera toward mouse-driven target (stiffness: 0.04 = soft spring feel)
    current.current.x += (mouse.current.x * 5 - current.current.x) * 0.04;
    current.current.y += (5 - mouse.current.y * 2 - current.current.y) * 0.04;
    camera.position.set(current.current.x, current.current.y, 16);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Scene: React.FC<{ onAiLabClick?: () => void }> = ({ onAiLabClick }) => {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 20, -10]} angle={0.3} penumbra={1} intensity={2} color="#4444ff" />
      <Environment preset="city" />

      <group position={[0, -2.0, 0]}>
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
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />

      {/* Title positioned at top */}
      <div className="absolute top-16 left-0 w-full z-10 pointer-events-none">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl">
            NADAUN <span className="text-[#FFB800]">UNIVERSE</span>
          </h2>
        </div>
      </div>

      <div className="w-full h-full absolute inset-0 z-0 mt-0">
        <Canvas
          camera={{ position: [0, 5, 16], fov: 35 }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
        >
          <Scene onAiLabClick={onAiLabClick} />
        </Canvas>
      </div>
      
      {/* Bottom Gradient for seamless transition to Business section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default IsoWorld;