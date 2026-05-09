import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  "Preparing the runway...",
  "Capturing the essence...",
  "Polishing the crown...",
  "Igniting the spotlight...",
  "Final touches of grace..."
];

const Loader = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        // Random increments for a more natural feel
        const inc = Math.floor(Math.random() * 3) + 1;
        return Math.min(prev + inc, 100);
      });
    }, 40);

    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  const name = "SONU";

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center"
    >
      {/* Background large number */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.03, scale: 1 }}
          className="font-playfair text-[40vw] text-white font-bold italic"
        >
          {progress}
        </motion.span>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Name */}
        <div className="flex mb-4">
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.1,
                ease: [0.215, 0.61, 0.355, 1]
              }}
              className="font-playfair text-6xl md:text-8xl gold-gradient italic font-black"
            >
              {char}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center"
        >
          <div className="h-[1px] w-48 bg-white/10 relative overflow-hidden mb-8">
            <motion.div
              className="absolute inset-0 bg-luxury-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]"
              initial={{ x: "-100%" }}
              animate={{ x: `${progress - 100}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="h-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="font-poppins text-[10px] tracking-[0.5em] text-white/30 uppercase text-center"
              >
                {quotes[quoteIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="h-24 mt-12 flex items-center justify-center">
          <AnimatePresence>
            {isComplete && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.05, letterSpacing: "0.6em" }}
                whileTap={{ scale: 0.95 }}
                onClick={onFinished}
                className="group relative px-12 py-4 overflow-hidden"
              >
                <div className="absolute inset-0 border border-luxury-gold/50 group-hover:border-luxury-gold transition-colors" />
                <motion.div 
                  className="absolute inset-0 bg-luxury-gold/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                />
                <span className="relative z-10 font-poppins text-xs tracking-[0.5em] text-luxury-gold group-hover:text-white uppercase transition-colors">
                  Enter Experience
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Light sweep effect */}
      <motion.div 
        animate={{ 
          x: ["-100%", "200%"],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
      />
    </motion.div>
  );
};

export default Loader;
