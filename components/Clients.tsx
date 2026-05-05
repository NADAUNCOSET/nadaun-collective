import React, { useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Client List
const CLIENT_LIST = [
  { name: "AENTIO", category: "FASHION" },
  { name: "M2", category: "ENTERTAINMENT" },
  { name: "OLIVE YOUNG", category: "RETAIL" },
  { name: "COWAY", category: "LIFESTYLE" },
  { name: "EMIRATES", category: "AIRLINE" },
  { name: "SAMSUNG", category: "ELECTRONICS" },
  { name: "HYUNDAI STEEL", category: "INDUSTRY" },
  { name: "GAONCHIPS", category: "SEMICONDUCTOR" },
  { name: "PEPSI", category: "F&B" },
  { name: "PAT", category: "FASHION" },
  { name: "PREED", category: "SERVICE" },
  { name: "BEREX", category: "LIFESTYLE" },
  { name: "K2 SAFETY", category: "FASHION" },
  { name: "KWDA", category: "DESIGN AWARDS" },
  { name: "KOVA", category: "ORGANIZATION" },
  { name: "AMOREPACIFIC", category: "BEAUTY" },
  { name: "NUMBUZIN", category: "BEAUTY" },
  { name: "HECTO INNOVATION", category: "TECH" },
  { name: "JUNG SAEM MOOL", category: "BEAUTY" },
  { name: "ACMÉ DE LA VIE", category: "FASHION" },
  { name: "THE NEW GREY", category: "FASHION" },
  { name: "NUDAKE", category: "F&B" },
  { name: "MIRAEMI", category: "LIFESTYLE" },
  { name: "KIA", category: "MOBILITY" },
  { name: "THE MATTERS", category: "MEDIA" },
  { name: "3 HOURS AHEAD", category: "TRAVEL" },
  { name: "HD HYUNDAI", category: "HEAVY INDUSTRY" },
  { name: "CESTI", category: "FASHION" },
  { name: "ELLE", category: "MEDIA" },
  { name: "HD HYUNDAI C.E.", category: "INDUSTRIAL" },
  { name: "DASIQUE", category: "BEAUTY" },
  { name: "SKINFOOD", category: "BEAUTY" },
  { name: "TONYMOLY", category: "BEAUTY" },
  { name: "ABIB", category: "BEAUTY" },
  { name: "ROOTONIX", category: "LIFESTYLE" },
  { name: "SKIN1004", category: "BEAUTY" },
  { name: "SKEDERM", category: "BEAUTY" },
  { name: "THE SAEM", category: "BEAUTY" },
  { name: "2aN", category: "BEAUTY" },
  { name: "CALVIN KLEIN", category: "FASHION" },
  { name: "TORHOP", category: "BEAUTY" },
  { name: "DIOR BEAUTY", category: "BEAUTY" },
];

// Configuration
const SPACING = 90; 
const CANVAS_SIZE = 1200; 

interface ClientNodeProps {
  node: any;
  mouseX: any;
  mouseY: any;
}

// Individual Node Component for Physics & Interaction
const ClientNode: React.FC<ClientNodeProps> = ({ 
  node, 
  mouseX, 
  mouseY 
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // 1. Calculate Distance
  // We need distance for both Repulsion (X/Y) and Scaling
  const distance = useTransform([mouseX, mouseY], ([mx, my]) => {
    const dx = node.x - (mx as number);
    const dy = node.y - (my as number);
    return Math.sqrt(dx * dx + dy * dy);
  });

  // 2. Repulsion Logic (X/Y)
  const x = useTransform([mouseX, mouseY, distance], ([mx, my, dist]) => {
    const dx = node.x - (mx as number);
    const dy = node.y - (my as number);
    
    // Repulsion
    const radius = 400; 
    const maxRepel = 180;
    let repelX = 0;
    
    const d = dist as number;
    if (d < radius) {
      const force = (1 - d / radius) * maxRepel;
      const angle = Math.atan2(dy, dx);
      repelX = Math.cos(angle) * force;
    }

    // Sway
    const swayX = (mx as number) * 0.05; 

    return node.x + swayX + repelX;
  });

  const y = useTransform([mouseX, mouseY, distance], ([mx, my, dist]) => {
    const dx = node.x - (mx as number);
    const dy = node.y - (my as number);
    
    // Repulsion
    const radius = 400; 
    const maxRepel = 180;
    let repelY = 0;
    
    const d = dist as number;
    if (d < radius) {
      const force = (1 - d / radius) * maxRepel;
      const angle = Math.atan2(dy, dx);
      repelY = Math.sin(angle) * force;
    }

    // Sway
    const swayY = (my as number) * 0.05;

    return node.y + swayY + repelY;
  });

  // 3. Proximity Scaling Logic
  const scale = useTransform(distance, (dist) => {
    const hoverRadius = 300; // Distance where scaling starts
    const baseScale = 1;
    const maxScale = 2.5; // Grow up to 2.5x

    if (dist < hoverRadius) {
      // Create a smooth curve (quadratic ease-in-out feel)
      const factor = Math.pow(1 - dist / hoverRadius, 2); 
      return baseScale + factor * (maxScale - baseScale);
    }
    return baseScale;
  });

  // Opacity boost when close
  const opacity = useTransform(distance, (dist) => {
    return dist < 300 ? 1 : 0.6;
  });

  return (
    <motion.div
      style={{ 
        x, 
        y,
        zIndex: isHovered ? 50 : 10, // Bring strictly hovered item to very front
        willChange: 'transform' // Optimize for mobile
      }}
      className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Add touch handlers for mobile tap interaction
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <motion.div
        style={{ scale, opacity }}
        className="flex flex-col items-center justify-center"
      >
        <motion.div 
          className="w-1.5 h-1.5 rounded-full mb-2 bg-white/80"
          animate={{
            backgroundColor: isHovered ? "#FFB800" : "rgba(255,255,255,0.8)",
            boxShadow: isHovered ? "0 0 15px #FFB800" : "none"
          }}
        />
        <motion.h3 
          className="text-[10px] md:text-xs font-bold leading-none tracking-tight whitespace-nowrap text-center"
          animate={{
            color: isHovered ? "#ffffff" : "#cccccc",
          }}
        >
          {node.name}
        </motion.h3>
        <motion.span 
          className="text-[6px] uppercase tracking-widest text-[#FFB800] mt-1 absolute top-full"
          style={{ 
            opacity: useTransform(scale, s => (s > 1.5 ? 1 : 0)) // Only show category when big enough
          }}
        >
          {node.category}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

const Clients: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Spring for fluid movement
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the center of the container
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Touch Move handler for mobile interaction
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left - rect.width / 2;
    const y = touch.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  // 1. Generate positions using Golden Spiral
  const nodes = useMemo(() => {
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); 

    return CLIENT_LIST.map((client, index) => {
      // Start slightly offset to avoid perfect center overlap
      const n = index + 1; 
      const r = SPACING * Math.sqrt(n);
      const theta = n * GOLDEN_ANGLE;

      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      
      return { ...client, x, y, id: index };
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[85vh] md:h-[100vh] bg-black overflow-hidden flex flex-col justify-center"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Background Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Header - Matching Scale of Business and Reference */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none p-6 md:p-12">
        <div className="container mx-auto mt-24 md:mt-16">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
             <span className="block text-[#FFB800] font-bold tracking-[0.2em] text-xs uppercase mb-4">
                OUR PARTNERS
              </span>
             {/* Scaled up to 6xl / 8xl to match Business & Reference Grandeur */}
             <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-white">
                WE GROW <br/> TOGETHER.
             </h2>
          </motion.div>
        </div>
      </div>

      {/* Interactive Universe Area */}
      <div className="relative w-full h-full flex items-center justify-center z-10 pt-48 md:pt-0">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="relative scale-[0.45] md:scale-100 origin-center"
           style={{ width: 0, height: 0 }} // Anchor point at center
        >
          {nodes.map((node) => (
            <ClientNode 
              key={node.id} 
              node={node} 
              mouseX={smoothMouseX} 
              mouseY={smoothMouseY} 
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Clients;