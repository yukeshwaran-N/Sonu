import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const InteractivePlay = () => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isScratchingRef = useRef(false);
  const lastCheckTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // Set canvas size
    const updateSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;

      // Draw the "Gold" cover
      ctx.fillStyle = '#D4AF37';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add some texture to the gold
      ctx.globalCompositeOperation = 'source-atop';
      for (let i = 0; i < 1000; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
      }
      ctx.globalCompositeOperation = 'source-over';

      // Text on top of gold
      ctx.font = 'italic 24px "Playfair Display", serif';
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.textAlign = 'center';
      ctx.fillText('Scratch to reveal a secret', canvas.width / 2, canvas.height / 2);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const checkReveal = () => {
      const now = Date.now();
      if (now - lastCheckTime.current < 250) return; // Only check every 250ms
      lastCheckTime.current = now;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let clearPixels = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clearPixels++;
      }

      if (clearPixels / (pixels.length / 4) > 0.4) {
        setIsRevealed(true);
      }
    };

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.fill();
      checkReveal();
    };

    const handleMouseMove = (e) => {
      if (!isScratchingRef.current) return;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleTouchMove = (e) => {
      if (!isScratchingRef.current) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      scratch(touch.clientX - rect.left, touch.clientY - rect.top);
    };

    const startScratching = () => {
      isScratchingRef.current = true;
    };

    const stopScratching = () => {
      isScratchingRef.current = false;
    };

    canvas.addEventListener('mousedown', startScratching);
    window.addEventListener('mouseup', stopScratching);
    canvas.addEventListener('mousemove', handleMouseMove);

    canvas.addEventListener('touchstart', startScratching);
    window.addEventListener('touchend', stopScratching);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('mousedown', startScratching);
      window.removeEventListener('mouseup', stopScratching);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchstart', startScratching);
      window.removeEventListener('touchend', stopScratching);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    if (isRevealed) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFFFFF', '#F97316']
      });
    }
  }, [isRevealed]);

  return (
    <section className="py-24 px-8 md:px-24 bg-luxury-black flex flex-col items-center">
      <div className="max-w-4xl w-full text-center mb-16">
        <h2 className="font-playfair text-5xl md:text-7xl gold-gradient italic mb-6">Interactive Moment</h2>
        <p className="font-cormorant text-2xl text-white/60 italic">Because some secrets are worth uncovering.</p>
      </div>

      <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden border border-luxury-gold/20 shadow-2xl">
        {/* The Hidden Content (A special photo + message) */}
        <div className="absolute inset-0 z-0">
          <img src="/images/Screenshot 2026-05-09 at 12.35.10.png" alt="Secret Reveal" className="w-full h-full object-cover object-[center_20%]" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-12 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isRevealed ? { scale: 1, opacity: 1 } : {}}
              className="glass p-8 rounded-lg"
            >
              <h3 className="font-playfair text-3xl text-luxury-gold italic mb-4">You are the real prize.</h3>
              <p className="font-cormorant text-xl text-white/80">Every title, every runway, every crown... they all pale in comparison to your heart.</p>
            </motion.div>
          </div>
        </div>

        {/* The Scratch Layer */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 z-10 cursor-none transition-opacity duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        />
      </div>


      {/* Love Letters Section */}
      <div className="mt-32 w-full max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl text-white italic">The Wall of Love</h2>
          <p className="font-poppins text-[10px] tracking-[0.4em] text-white/30 uppercase mt-2">Tap an envelope to read a note</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { id: 1, note: "Your smile is my favorite scene." },
            { id: 2, note: "You define elegance in everything you do." },
            { id: 3, note: "The world is brighter because you're in it." },
            { id: 4, note: "Keep dreaming, keep shining, keep being YOU." }
          ].map((letter) => (
            <motion.div
              key={letter.id}
              whileHover={{ y: -10, rotate: letter.id % 2 === 0 ? 2 : -2 }}
              className="group relative"
            >
              <div className="aspect-square glass flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-500 hover:border-luxury-gold/50">
                <div className="mb-4 text-luxury-gold opacity-50 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="font-cormorant text-lg text-white italic leading-relaxed">
                    "{letter.note}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractivePlay;
