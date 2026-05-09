import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const items = [
  { type: 'image', src: '/images/model_10.jpg', label: 'Vintage Soul' },
  { type: 'video', src: '/images/video_3.mp4', label: 'Golden Hour' },
  { type: 'image', src: '/images/model_11.jpg', label: 'Editorial Luxe' },
  { type: 'video', src: '/images/video_4.mp4', label: 'The Runway' },
  { type: 'image', src: '/images/model_6.png', label: 'Classic Grace' },
  { type: 'video', src: '/images/video_1.mp4', label: 'Behind Scenes' },
];

const FilmStrip = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-luxury-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-8 md:px-24">
          <div className="flex-shrink-0 w-[300px] md:w-[500px] h-[400px] md:h-[600px] flex flex-col justify-center pr-24">
            <h2 className="font-playfair text-5xl md:text-8xl text-white italic mb-8 whitespace-nowrap">
              Film <span className="gold-gradient italic">Strip</span>
            </h2>
            <p className="font-cormorant text-2xl text-white/50 italic leading-relaxed">
              A cinematic journey through time and style. Scrolling becomes an exploration of your essence.
            </p>
          </div>

          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] md:w-[500px] h-[400px] md:h-[600px] relative group overflow-hidden rounded-sm border border-white/5"
            >
              <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
              ) : (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              )}

              <div className="absolute bottom-6 left-6 z-20">
                <p className="font-poppins text-[10px] tracking-[0.4em] uppercase text-white/40 mb-2">Item 0{index + 1}</p>
                <h3 className="font-playfair text-2xl text-white italic">{item.label}</h3>
              </div>
            </div>
          ))}

          <div className="flex-shrink-0 w-[200px] md:w-[400px]" /> {/* Spacer */}
        </motion.div>
      </div>
    </section>
  );
};

export default FilmStrip;
