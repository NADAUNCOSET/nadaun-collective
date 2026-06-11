import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ArrowRight } from 'lucide-react';

const WORKS_DATA = [
  { 
    id: 1, 
    client: "SAMSUNG", 
    title: "Galaxy S24 Unpacked", 
    category: "Global Campaign", 
    year: "2024",
    youtubeId: "Jd2GK0qAN_k", 
    image: "https://images.unsplash.com/photo-1610945265078-38584e12e278?q=80&w=2600&auto=format&fit=crop"
  },
  { 
    id: 2, 
    client: "HYUNDAI MOTORS", 
    title: "IONIQ 6 The Awakening", 
    category: "Interactive Film", 
    year: "2023",
    youtubeId: "uCIEc55r5_0", 
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop"
  },
  { 
    id: 3, 
    client: "NIKE", 
    title: "Run Forward", 
    category: "Brand Film", 
    year: "2023",
    youtubeId: "rR4n-0KYeKQ", 
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
  },
  { 
    id: 4, 
    client: "APPLE", 
    title: "Vision Pro", 
    category: "Product Reveal", 
    year: "2024",
    youtubeId: "TX9qSaGXFyg", 
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2670&auto=format&fit=crop"
  },
  { 
    id: 5, 
    client: "GENTLE MONSTER", 
    title: "Bold Collection", 
    category: "Digital Art", 
    year: "2023",
    youtubeId: "Jd2GK0qAN_k", 
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2680&auto=format&fit=crop"
  },
];

interface WorkProps {
  isOverlay?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.66, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

const Work: React.FC<WorkProps> = ({ isOverlay = false }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [hoveredWork, setHoveredWork] = useState<number>(0);

  return (
    <section id="work" className={`relative overflow-hidden ${isOverlay ? 'min-h-screen py-24 bg-transparent' : 'h-screen flex flex-col justify-center bg-transparent'}`}>
      
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {WORKS_DATA.map((work, index) => (
            index === hoveredWork && (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.4, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }} // Slower crossfade
                className="absolute inset-0"
              >
                <img 
                  src={work.image} 
                  alt={work.title} 
                  className="w-full h-full object-cover filter grayscale brightness-50 contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-6 z-10 relative h-full flex flex-col justify-center">
        {/* Header */}
        <motion.div 
          className="mb-12 border-b border-white/20 pb-4 flex justify-between items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#FFB800] uppercase">
            Selected Works
          </h2>
          <span className="text-xs text-gray-500 hidden md:block">
            HOVER TO PREVIEW / CLICK TO WATCH
          </span>
        </motion.div>

        {/* Work List */}
        <motion.div 
          className="flex flex-col"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {WORKS_DATA.map((work, index) => (
            <motion.div
              key={work.id}
              variants={itemVariants}
              className="group relative border-b border-white/10 last:border-none py-6 md:py-8 cursor-pointer flex items-center justify-between"
              onMouseEnter={() => setHoveredWork(index)}
              onClick={() => setSelectedVideo(work.youtubeId)}
            >
              <div className="flex items-baseline gap-6 md:gap-12 z-10">
                <span className={`text-sm md:text-base font-mono transition-colors duration-300 ${hoveredWork === index ? 'text-[#FFB800]' : 'text-gray-600'}`}>
                  0{index + 1}
                </span>
                <div>
                  <h3 className={`text-3xl md:text-6xl font-bold tracking-tight transition-all duration-300 ${hoveredWork === index ? 'text-white translate-x-4' : 'text-gray-500'}`}>
                    {work.title}
                  </h3>
                  <p className={`text-xs md:text-sm font-bold tracking-widest uppercase mt-2 transition-all duration-300 ${hoveredWork === index ? 'text-[#FFB800] translate-x-4 opacity-100' : 'text-gray-600 opacity-0 h-0 overflow-hidden'}`}>
                    {work.client} — {work.category}
                  </p>
                </div>
              </div>

              <div className={`hidden md:flex items-center gap-4 transition-all duration-300 ${hoveredWork === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                 <span className="text-sm font-mono text-gray-400">{work.year}</span>
                 <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Play className="w-4 h-4 fill-current" />
                 </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedVideo(null);
            }}
          >
            <button 
              className="absolute top-6 right-6 md:top-12 md:right-12 text-white hover:text-[#FFB800] transition-colors z-50 p-2"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={40} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 relative"
              onClick={(e) => e.stopPropagation()}
            >
               <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&showinfo=0&modestbranding=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;