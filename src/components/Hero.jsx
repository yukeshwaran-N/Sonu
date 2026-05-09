import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover object-[center_20%] opacity-30 grayscale contrast-125"
        >
          <source src="/images/video_1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-luxury-black/60" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      <motion.div 
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-4"
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="font-cormorant text-xl md:text-2xl text-white/60 mb-6 italic"
        >
          “Some people enter life quietly…”
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <h2 className="font-playfair text-xl md:text-3xl tracking-[0.4em] text-white/40 uppercase mb-4">
            You entered like a
          </h2>
          <h1 className="font-playfair text-7xl md:text-9xl gold-gradient tracking-tighter leading-none italic font-black">
            Spotlight
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="flex flex-col items-center"
        >
          <div className="h-20 w-[1px] bg-gradient-to-b from-luxury-gold to-transparent mb-6" />
          <h3 className="font-playfair text-3xl md:text-5xl text-white tracking-widest uppercase mb-4">
            Happy Birthday, <span className="gold-gradient italic">Sonu</span> ✨
          </h3>
          <p className="font-poppins text-xs tracking-[0.8em] text-white/40 uppercase">
            Founder & Future Billionaire
          </p>
        </motion.div>
      </motion.div>

      {/* Floating Particles Placeholder */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%" 
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 100],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
