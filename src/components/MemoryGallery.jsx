import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const memories = [
  { id: 1, message: "A laugh that lights up the city.", image: "/images/model_5.png", title: "Radiance" },
  { id: 2, message: "The quiet strength behind every goal.", image: "/images/model_6.png", title: "Strength" },
  { id: 3, message: "Unforgettable moments in the spotlight.", image: "/images/model_7.png", title: "Spotlight" },
  { id: 4, message: "The dreamer who became the dream.", image: "/images/model_8.png", title: "Dreams" },
  { id: 5, message: "Grace in every step, fire in every soul.", image: "/images/model_9.png", title: "Grace" },
  { id: 6, message: "The heart that beats for the people around her.", image: "/images/model_1.png", title: "Heart" },
  { id: 7, message: "Pure elegance in every editorial shot.", image: "/images/model_2.png", title: "Elegance" },
  { id: 8, message: "Vulnerability is where true strength lies.", image: "/images/model_3.png", title: "Soul" },
  { id: 9, message: "A vision of beauty and confidence.", image: "/images/model_4.png", title: "Vision" },
  { id: 10, message: "Capturing the vintage soul within.", image: "/images/model_10.jpg", title: "Vintage" },
  { id: 11, message: "Modern luxe and effortless style.", image: "/images/model_11.jpg", title: "Modern" },
  { id: 12, message: "A moment of pure, unadulterated joy.", image: "/images/ChatGPT Image May 9, 2026, 12_27_03 PM.png", title: "Joy" },
  { id: 13, message: "The beauty in the everyday snapshots.", image: "/images/Screenshot 2026-05-09 at 12.33.19.png", title: "Captures" },
  { id: 14, message: "Reflecting on the journey so far.", image: "/images/Screenshot 2026-05-09 at 12.35.10.png", title: "Journey" },
  { id: 15, message: "The final touch to a perfect gallery.", image: "/images/Screenshot 2026-05-09 at 12.35.21.png", title: "Finale" },
];

const MemorySection = ({ memory, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-[#020202]">
      {/* Blurred Background Layer */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]) }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src={memory.image} 
          className="w-full h-full object-cover blur-2xl scale-110 opacity-30"
          alt="blur background"
        />
      </motion.div>

      {/* Main Image Layer (Zero Cropping) */}
      <motion.div 
        style={{ opacity, scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]) }}
        className="absolute inset-0 w-full h-full flex items-center justify-center p-8 md:p-16"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src={memory.image} 
            alt={memory.title} 
            className="max-w-full max-h-full object-contain shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/5 rounded-sm"
          />
          {/* Subtle light overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>

      <div className="relative h-full flex flex-col items-center justify-end text-center pb-20 md:pb-32 px-6 pointer-events-none">
        <motion.div
          style={{ y: springY }}
          className="max-w-4xl"
        >
          <span className="font-poppins text-[10px] tracking-[0.8em] text-luxury-gold uppercase mb-6 block">
            Archive 0{index + 1}
          </span>
          <h2 className="font-playfair text-6xl md:text-[10vw] text-white italic leading-tight mb-8">
            {memory.title}
          </h2>
          <div className="w-24 h-[1px] bg-luxury-gold/30 mx-auto mb-8" />
          <p className="font-cormorant text-2xl md:text-4xl text-white/80 italic leading-relaxed max-w-2xl mx-auto">
            "{memory.message}"
          </p>
        </motion.div>
      </div>

      {/* Decorative large number */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 pointer-events-none opacity-[0.03]">
        <span className="font-playfair text-[30vw] text-white font-bold italic">{index + 1}</span>
      </div>

      {/* Light sweep / flare */}
      <motion.div 
        animate={{ 
          x: ["-100%", "200%"],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 pointer-events-none"
      />
    </section>
  );
};

const MemoryGallery = () => {
  return (
    <div className="bg-luxury-black">
      <div className="h-[50vh] flex flex-col items-center justify-center text-center px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-playfair text-5xl md:text-8xl gold-gradient italic mb-4"
        >
          Memory Anthology
        </motion.h2>
        <p className="font-poppins text-xs tracking-[0.5em] text-white/30 uppercase">Scroll to explore her essence</p>
      </div>
      
      {memories.map((memory, index) => (
        <MemorySection key={memory.id} memory={memory} index={index} />
      ))}

      <div className="h-[20vh] flex items-center justify-center bg-gradient-to-t from-[#080808] to-transparent">
        <div className="w-[1px] h-20 bg-luxury-gold/30" />
      </div>
    </div>
  );
};

export default MemoryGallery;
