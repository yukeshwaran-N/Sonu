import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const FinalEnding = () => {
  useEffect(() => {
    const end = Date.now() + 3 * 1000;
    const colors = ['#D4AF37', '#ffffff', '#F5E0A3'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-luxury-black overflow-hidden px-8">
      {/* Cinematic Star Field */}
      <div className="absolute inset-0 z-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() 
            }}
            animate={{ 
              opacity: [null, 0.2, 0.8, 0.2],
              scale: [null, 1, 1.5, 1]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="space-y-12"
        >
          <p className="font-cormorant text-2xl md:text-3xl text-white/80 italic leading-relaxed">
            “You are art.<br/>
            Not because of how you look…<br/>
            But because of how you make people feel.”
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <h2 className="font-playfair text-6xl md:text-8xl gold-gradient italic font-black mb-4">
              Happy Birthday
            </h2>
            <h3 className="font-playfair text-4xl md:text-5xl text-white tracking-[0.2em] uppercase">
              Sonu ❤️
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
            className="pt-12"
          >
            <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-8" />
            <p className="font-poppins text-xs tracking-[0.5em] text-white/30 uppercase italic">
              A tribute to an extraordinary soul
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-luxury-gold/30" />
      <div className="absolute top-12 right-12 w-24 h-24 border-t border-r border-luxury-gold/30" />
      <div className="absolute bottom-12 left-12 w-24 h-24 border-b border-l border-luxury-gold/30" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-luxury-gold/30" />
    </section>
  );
};

export default FinalEnding;
