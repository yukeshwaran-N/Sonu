import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const videos = [
  { src: "/images/video_2.mp4", title: "Cinema of Dreams", subtitle: "Every movement, a masterpiece." },
  { src: "/images/video_1.mp4", title: "Golden Essence", subtitle: "Where light meets soul." },
  { src: "/images/video_3.mp4", title: "Editorial Motion", subtitle: "Grace in every frame." },
  { src: "/images/video_4.mp4", title: "The Runway Walk", subtitle: "Owning the spotlight." },
];

const CinematicCinema = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVideo = () => setCurrentIndex((prev) => (prev + 1) % videos.length);
  const prevVideo = () => setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);

  return (
    <section className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Film Grain Texture Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-noise" />

      {/* Dynamic Blurred Backdrop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`blur-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <video 
            src={videos[currentIndex].src} 
            autoPlay muted loop playsInline 
            className="w-full h-full object-cover blur-[100px] scale-110 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Technical Elements */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="absolute top-12 left-12 font-poppins text-[10px] tracking-[0.5em] text-white/20 uppercase flex flex-col gap-2">
           <span>REC [00:00:00:00]</span>
           <span>ISO 800 // 4K RAW</span>
        </div>
        <div className="absolute bottom-12 right-12 font-poppins text-[10px] tracking-[0.5em] text-white/20 uppercase flex flex-col items-end gap-2">
           <span>BATTERY 88%</span>
           <span>FRAME {currentIndex + 1} / {videos.length}</span>
        </div>
        
        {/* Viewfinder Corners */}
        <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-white/20" />
        <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-white/20" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-white/20" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-white/20" />
      </div>

      {/* Main Reel Frame (9:16) */}
      <div className="relative z-10 w-full max-w-7xl h-full flex items-center justify-center px-4 md:px-20 gap-16">
        
        {/* Navigation - Left */}
        <button 
          onClick={prevVideo}
          className="hidden md:flex w-16 h-16 rounded-full border border-white/10 items-center justify-center text-white hover:bg-luxury-gold hover:text-black transition-all group backdrop-blur-md"
        >
          <svg className="w-8 h-8 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* The Reel Frame */}
        <div className="relative h-[80vh] aspect-[9/16] bg-neutral-900 rounded-2xl p-2 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative rounded-xl overflow-hidden"
            >
              <video 
                src={videos[currentIndex].src} 
                autoPlay muted loop playsInline 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 flex flex-col justify-end p-8 pb-12">
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4 }}
                 >
                   <span className="font-poppins text-[10px] tracking-[0.5em] text-luxury-gold uppercase mb-4 block">
                     Digital Archive // SONU
                   </span>
                   <h3 className="font-playfair text-4xl md:text-5xl text-white italic mb-2 leading-tight">
                     {videos[currentIndex].title}
                   </h3>
                   <p className="font-cormorant text-lg md:text-xl text-white/60 italic leading-relaxed">
                     {videos[currentIndex].subtitle}
                   </p>
                 </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation - Right */}
        <button 
          onClick={nextVideo}
          className="hidden md:flex w-16 h-16 rounded-full border border-white/10 items-center justify-center text-white hover:bg-luxury-gold hover:text-black transition-all group backdrop-blur-md"
        >
          <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Sidebar Info (Desktop Only) */}
        <div className="hidden lg:flex flex-col gap-12 w-80 border-l border-white/5 pl-12 text-left">
           <div className="space-y-4">
              <p className="font-poppins text-[10px] tracking-[0.5em] text-white/20 uppercase">Catalogue</p>
              <h4 className="font-playfair text-3xl text-white italic">The Vision <br/> In Motion</h4>
           </div>
           
           <div className="space-y-6">
              {videos.map((v, i) => (
                <div 
                  key={i} 
                  className="flex flex-col gap-2 group cursor-pointer" 
                  onClick={() => setCurrentIndex(i)}
                >
                   <div className="flex items-center gap-4">
                      <span className={`font-poppins text-[10px] transition-colors ${currentIndex === i ? 'text-luxury-gold' : 'text-white/20'}`}>
                        0{i + 1}
                      </span>
                      <p className={`font-playfair text-lg italic transition-all ${currentIndex === i ? 'text-white translate-x-2' : 'text-white/40 group-hover:text-white/60 group-hover:translate-x-1'}`}>
                        {v.title}
                      </p>
                   </div>
                   <div className={`h-[1px] transition-all duration-700 ${currentIndex === i ? 'w-full bg-luxury-gold/50' : 'w-4 bg-white/5'}`} />
                </div>
              ))}
           </div>

           <div className="mt-auto pt-12 border-t border-white/5">
              <p className="font-cormorant text-sm text-white/30 italic leading-relaxed">
                "Her journey isn't just recorded—it's authored."
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicCinema;
