import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const scenes = [
  {
    id: "01",
    label: "THE PERSPECTIVE",
    quote: "The world sees the runway and the crown. They see the runner-up title and the beauty.",
    image: "/images/model_3.png",
    alignment: "left"
  },
  {
    id: "02",
    label: "THE TRUTH",
    quote: "But I see the heart that refuses to give up. The girl who dreams bigger than any stage.",
    image: "/images/model_4.png",
    alignment: "right"
  }
];

const Scene = ({ scene, index }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      {/* Letterboxing */}
      <div className="absolute top-0 inset-x-0 h-[10vh] bg-black z-30 flex items-center px-12 border-b border-white/5">
        <p className="font-poppins text-[10px] tracking-[0.6em] text-white/20 uppercase">Digital Narrative // Sonu</p>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-[10vh] bg-black z-30 flex items-center justify-between px-12 border-t border-white/5">
        <p className="font-poppins text-[10px] tracking-[0.6em] text-luxury-gold uppercase">Scene {scene.id}</p>
        <p className="font-poppins text-[10px] tracking-[0.6em] text-white/20 uppercase">Billionaire Vision 2026</p>
      </div>

      {/* Main Visual */}
      <motion.div 
        style={{ opacity, scale }}
        className="absolute inset-0 w-full h-full flex items-center justify-center"
      >
        <div className="h-[80vh] aspect-[9/16] relative rounded-lg overflow-hidden border border-white/10 shadow-2xl">
           <img 
             src={scene.image} 
             alt={scene.label} 
             className="w-full h-full object-cover grayscale brightness-50"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
      </motion.div>

      {/* Content Overlay */}
      <div className={`relative z-20 max-w-6xl w-full px-12 flex flex-col ${scene.alignment === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
        <motion.div
          style={{ y }}
          className="max-w-2xl"
        >
          <span className="font-poppins text-[10px] tracking-[1em] text-luxury-gold uppercase mb-6 block">
            {scene.label}
          </span>
          <h2 className="font-playfair text-4xl md:text-6xl text-white italic leading-tight mb-12">
            "{scene.quote}"
          </h2>
          <div className={`flex items-center gap-6 ${scene.alignment === 'right' ? 'flex-row-reverse' : ''}`}>
             <div className="w-16 h-[1px] bg-luxury-gold" />
             <p className="font-cormorant text-xl text-white/40 italic">Chapter of the Soul</p>
          </div>
        </motion.div>
      </div>

      {/* Cinematic Glint */}
      <motion.div 
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent skew-x-12 pointer-events-none"
      />
    </section>
  );
};

const BehindTheSpotlight = () => {
  return (
    <div className="bg-black">
      <div className="h-[40vh] flex flex-col items-center justify-center border-b border-white/5">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-playfair text-5xl md:text-7xl gold-gradient italic"
        >
          Behind the Lens
        </motion.h2>
        <p className="font-poppins text-[10px] tracking-[0.8em] text-white/20 uppercase mt-4">Exploring the Unseen</p>
      </div>

      {scenes.map((scene, index) => (
        <Scene key={scene.id} scene={scene} index={index} />
      ))}
      
      {/* Final Transition */}
      <div className="h-[20vh] bg-gradient-to-b from-black to-luxury-black" />
    </div>
  );
};

export default BehindTheSpotlight;
