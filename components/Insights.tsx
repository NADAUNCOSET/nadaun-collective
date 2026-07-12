import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { generateMarketingInsight } from '../services/geminiService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.561, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

interface InsightsProps {
  onAiLabClick?: () => void;
}

const Insights: React.FC<InsightsProps> = ({ onAiLabClick }) => {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<{ text: string, trends: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setResult(null);

    const data = await generateMarketingInsight(topic);
    setResult(data);
    setLoading(false);
  };

  return (
    <section id="insights" className="py-24 border-t border-white/5 relative overflow-hidden bg-transparent">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#FFB800]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2 text-[#FFB800] mb-6">
              <Sparkles className="w-5 h-5" />
              <button 
                onClick={onAiLabClick}
                className="font-bold tracking-widest text-sm uppercase hover:underline cursor-pointer"
              >
                NADAUN AI Lab
              </button>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Predict the Future <br/>
              <span className="text-gray-500">of Your Brand</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-gray-400 mb-12 text-lg leading-relaxed">
              Leverage our proprietary AI engine powered by Gemini to extract instant marketing insights and trend forecasts tailored to your industry.
            </motion.p>

            <motion.div variants={itemVariants} className="mb-12">
               <button 
                onClick={onAiLabClick}
                className="group flex items-center gap-2 text-white font-bold text-sm tracking-widest hover:text-[#FFB800] transition-colors"
               >
                 EXPLORE AI UNIVERSE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </motion.div>

            <motion.form variants={itemVariants} onSubmit={handleGenerate} className="relative max-w-md">
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter industry (e.g., EV Cars, K-Beauty)"
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800] transition-all pr-16"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 p-2 bg-[#FFB800] rounded-full hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin text-black" /> : <ArrowRight className="w-6 h-6 text-black" />}
              </button>
            </motion.form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.561, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative backdrop-blur-sm"
          >
            {!result && !loading && (
              <div className="text-center text-gray-500">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter a topic to generate AI insights.</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFB800] animate-progress"></div>
                </div>
                <p className="text-sm text-gray-400 animate-pulse">Analyzing market trends...</p>
              </div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.374 }}
              >
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-[#FFB800] uppercase tracking-widest mb-3">Strategic Insight</h4>
                  <p className="text-xl md:text-2xl font-light leading-relaxed text-white">
                    "{result.text}"
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Trending Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.trends.map((trend, i) => (
                      <span key={i} className="px-4 py-2 bg-white/10 rounded-lg text-sm text-[#FFB800] border border-[#FFB800]/20">
                        #{trend}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      <style>{`
        @keyframes progress {
          0% { width: 0%; transform: translateX(-100%); }
          100% { width: 100%; transform: translateX(0%); }
        }
        .animate-progress {
          animation: progress 1s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Insights;