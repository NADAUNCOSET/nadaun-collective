import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-40 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.374 }}
              className="text-sm font-bold tracking-[0.2em] text-[#FFB800] mb-6 uppercase"
            >
              Who We Are
            </motion.h2>
          </div>
          
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.374 }}
            >
              <h3 className="text-3xl md:text-5xl font-medium leading-tight mb-12">
                We are a <span className="text-white border-b-2 border-[#FFB800]">Digital Intelligence</span> group that redefines the relationship between brands and consumers through data and creativity.
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.064, duration: 0.374 }}
              >
                <h4 className="text-xl font-bold mb-4 text-white">Data Driven</h4>
                <p className="text-gray-400 leading-relaxed">
                  We analyze massive datasets to discover hidden opportunities. 
                  Our strategies are built on precision, not just intuition, ensuring measurable growth for our partners.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.128, duration: 0.374 }}
              >
                <h4 className="text-xl font-bold mb-4 text-white">Creative Tech</h4>
                <p className="text-gray-400 leading-relaxed">
                  Merging art with technology. From immersive web experiences to AI-generated content, 
                  we push the boundaries of what is possible in digital advertising.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;