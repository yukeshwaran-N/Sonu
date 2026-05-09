import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="font-playfair text-2xl text-white tracking-tighter italic font-bold">B.</h1>
        </div>
        <div className="hidden md:flex gap-12 pointer-events-auto">
          {['The Muse', 'Cinema', 'Collection', 'Film Strip', 'Play', 'Mini Games', 'Memories', 'Wishes', 'Spotlight', 'The Gift'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="font-poppins text-[10px] tracking-[0.4em] uppercase text-white/70 hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="pointer-events-auto">
          <p className="font-poppins text-[10px] tracking-[0.2em] uppercase text-white/50 italic">Est. 2026</p>
        </div>
      </nav>
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-luxury-gold origin-left z-[101]"
        style={{ scaleX }}
      />
    </>
  );
};

export default Navbar;
