import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TheMuse = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const img1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={targetRef} className="relative min-h-screen py-24 px-8 md:px-24 flex flex-col items-center justify-center overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full max-w-7xl">
        
        {/* Left Editorial Card */}
        <motion.div 
          style={{ y: img1Y }}
          className="md:col-span-4 aspect-[3/4] relative group"
        >
          <div className="absolute inset-0 border border-luxury-gold/30 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
          <div className="absolute inset-0 overflow-hidden">
             <img src="/images/model_1.png" alt="Bhoomika Editorial I" className="w-full h-full object-cover object-[center_20%] grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          <div className="absolute bottom-4 left-4">
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-luxury-gold">Grace Personified</p>
          </div>
        </motion.div>

        {/* Center Text */}
        <motion.div 
          style={{ y: textY }}
          className="md:col-span-4 text-center z-10"
        >
          <h2 className="font-playfair text-4xl md:text-6xl text-white mb-8 italic">
            The Muse
          </h2>
          <p className="font-cormorant text-xl md:text-2xl text-white/70 leading-relaxed italic">
            “The title said runner-up.<br/>
            But the way you inspire people deserves first place.”
          </p>
          <div className="mt-8 h-[1px] w-24 bg-luxury-gold mx-auto" />
        </motion.div>

        {/* Right Editorial Card */}
        <motion.div 
          style={{ y: img2Y }}
          className="md:col-span-4 aspect-[3/4] relative group mt-12 md:mt-24"
        >
          <div className="absolute inset-0 border border-luxury-gold/30 -translate-x-4 translate-y-4 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
          <div className="absolute inset-0 overflow-hidden">
             <img src="/images/model_2.png" alt="Bhoomika Editorial II" className="w-full h-full object-cover object-[center_20%] grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          <div className="absolute top-4 right-4 text-right">
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-luxury-gold">Inspiration</p>
          </div>
        </motion.div>

      </div>

      {/* Decorative text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left opacity-[0.03] pointer-events-none">
        <h3 className="font-playfair text-[15vw] whitespace-nowrap uppercase">SONU</h3>
      </div>
    </section>
  );
};

export default TheMuse;
