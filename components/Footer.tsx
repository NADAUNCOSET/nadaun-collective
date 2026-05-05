import React from 'react';
import { ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-black text-white pt-32 pb-12 relative overflow-hidden">
      
      {/* Decorative Circles (Bottom) - Adapted for Dark Theme */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Main Headline */}
        <div className="mb-24 md:mb-40">
           <h2 className="text-[12vw] md:text-[10vw] font-bold tracking-tighter leading-none select-none">
             Let's be Together
           </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 mb-32">
          
          {/* Column 1: Contact */}
          <div className="flex flex-col items-start group cursor-pointer">
             <span className="text-sm font-bold tracking-widest uppercase mb-4 text-[#FFB800]">
               Contact
             </span>
             <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
               최고의 캠페인을 위한 <br />
               첫 단추
             </h3>
             <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-full group-hover:bg-[#FFB800] group-hover:border-[#FFB800] group-hover:text-black transition-all duration-300">
                <span className="text-sm font-bold">광고문의 바로가기</span>
                <ArrowRight size={16} />
             </div>
          </div>

          {/* Column 2: Careers */}
          <div className="flex flex-col items-start group cursor-pointer">
             <span className="text-sm font-bold tracking-widest uppercase mb-4 text-[#FFB800]">
               Careers
             </span>
             <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
               나다운 컬렉티브와 함께하는 <br />
               No.1 인재채용
             </h3>
             <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-full group-hover:bg-[#FFB800] group-hover:border-[#FFB800] group-hover:text-black transition-all duration-300">
                <span className="text-sm font-bold">채용공고 바로가기</span>
                <ArrowRight size={16} />
             </div>
          </div>

        </div>

        {/* Bottom Footer Info */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 text-sm font-medium text-gray-400">
          
          <div className="flex flex-col gap-1">
             <span className="font-bold text-lg text-white mb-2">NADAUN COLLECTIVE</span>
             <p>Seoul, Republic of Korea</p>
             <p>Yeongdeungpo-ro 33-gil, 18</p>
             <p className="mt-2">T. 02-6053-6231</p>
             <p>E. rbsent.info@gmail.com</p>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <div className="flex gap-6 text-white">
               <a href="#" className="hover:text-[#FFB800] transition-colors">Instagram</a>
               <a href="#" className="hover:text-[#FFB800] transition-colors">Youtube</a>
               <a href="#" className="hover:text-[#FFB800] transition-colors">Behance</a>
            </div>
            <p className="text-xs text-gray-600">
              © 2026 NADAUN COLLECTIVE. All Rights Reserved.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;