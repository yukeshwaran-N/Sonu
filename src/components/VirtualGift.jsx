import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const VirtualGift = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#FFFFFF', '#000000']
    });
  };

  return (
    <section className="relative py-32 bg-luxury-black overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center mb-20 px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-playfair text-5xl md:text-8xl gold-gradient italic mb-6"
        >
          A Final Surprise
        </motion.h2>
        <p className="font-cormorant text-2xl text-white/50 italic leading-relaxed">Because you deserve all the magic in the world.</p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[400px]">
        {!isOpen && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="flex flex-col items-center"
           >
             <p className="font-poppins text-[10px] tracking-[0.5em] text-luxury-gold uppercase mb-12 animate-pulse">
               Tap to unwrap
             </p>
             
             {/* The Box */}
             <motion.div 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="relative w-64 h-64 cursor-pointer group"
               onClick={handleOpen}
             >
               {/* Box Body */}
               <div className="absolute inset-0 bg-[#0a0a0a] border-2 border-luxury-gold shadow-[0_0_50px_rgba(212,175,55,0.1)] rounded-sm z-10 flex items-center justify-center">
                  {/* Ribbons */}
                  <div className="absolute inset-y-0 left-1/2 w-8 bg-luxury-gold/80 -translate-x-1/2" />
                  <div className="absolute inset-x-0 top-1/2 h-8 bg-luxury-gold/80 -translate-y-1/2" />
                  <div className="w-16 h-16 bg-luxury-gold rounded-full shadow-2xl relative z-20 flex items-center justify-center">
                     <div className="w-12 h-12 border border-white/20 rounded-full animate-ping" />
                  </div>
               </div>
             </motion.div>
           </motion.div>
        )}
      </div>

      {/* The Reveal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000000] bg-[#050505] flex flex-col md:flex-row overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-luxury-gold hover:text-black transition-all duration-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left: Image Side */}
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-1/2 h-[50vh] md:h-full p-8 md:p-20 flex items-center justify-center bg-black"
            >
              <div className="relative w-full h-full">
                 <div className="absolute inset-0 bg-luxury-gold/5 blur-3xl rounded-full" />
                 <img 
                   src="/images/ChatGPT Image May 9, 2026, 12_27_03 PM.png" 
                   alt="The Surprise" 
                   className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]" 
                 />
              </div>
            </motion.div>

            {/* Right: Text Side */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="w-full md:w-1/2 h-[50vh] md:h-full p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-[#080808] border-l border-white/5"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="font-poppins text-[10px] tracking-[0.8em] text-luxury-gold uppercase mb-8 block">Special Destiny</span>
                <h3 className="font-playfair text-6xl lg:text-8xl text-white italic mb-10 gold-gradient">Surprise!</h3>
                
                <div className="w-20 h-[1px] bg-luxury-gold/50 mb-10" />
                
                <p className="font-cormorant text-2xl lg:text-4xl text-white/90 leading-relaxed italic mb-12">
                  "To the girl who will one day lead empires. May this year be the first chapter in your journey to becoming the CEO and Billionaire you were born to be."
                </p>

                <div className="flex items-center gap-6 mb-16">
                   <div className="w-12 h-[1px] bg-white/20" />
                   <p className="font-poppins text-xs tracking-[0.4em] text-white/30 uppercase">With love • Sonu</p>
                </div>
                
                {/* Motivation Box */}
                <div className="p-8 border border-white/5 bg-white/[0.02] rounded-sm">
                   <p className="font-cormorant text-xl text-luxury-gold/60 italic leading-relaxed">
                     "Success isn't just about what you accomplish, it's about what you inspire. Keep building your empire, Sonu. The world is waiting."
                   </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VirtualGift;
