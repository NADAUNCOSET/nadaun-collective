import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Overlay: React.FC<OverlayProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.468, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#111] text-white overflow-y-auto custom-scrollbar"
        >
            {/* Close Button - Fixed position for seamless look */}
            <button 
              onClick={onClose}
              className="fixed top-8 right-8 md:top-12 md:right-12 z-[110] p-2 hover:bg-white/10 rounded-full transition-colors group mix-blend-difference"
            >
              <X size={32} className="text-white group-hover:text-[#FFB800] transition-colors" />
            </button>

            {/* Content Container */}
            <div className="w-full min-h-screen">
               {children}
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;