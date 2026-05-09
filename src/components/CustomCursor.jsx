import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-luxury-gold rounded-full pointer-events-none z-[100001] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          marginLeft: "-1rem", // half of w-8
          marginTop: "-1rem",  // half of h-8
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-luxury-gold rounded-full pointer-events-none z-[100001]"
        style={{
          x: cursorX,
          y: cursorY,
          marginLeft: "-0.1875rem", // half of w-1.5
          marginTop: "-0.1875rem",  // half of h-1.5
        }}
      />
    </>
  );
};

export default CustomCursor;
