import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const collection = [
  { 
    title: "The CEO", 
    quote: "Strategic, fearless, and always two steps ahead of the game.",
    image: "/images/ChatGPT Image May 9, 2026, 12_27_03 PM.png",
    label: "Strategic Vision"
  },
  { 
    title: "Ambition", 
    quote: "Billionaire status isn't just a dream, it's a destiny in the making.",
    image: "/images/Screenshot 2026-05-09 at 12.33.19.png",
    label: "Empire Builder"
  },
  { 
    title: "Grace", 
    quote: "Moving through life with an effortless, quiet elegance.",
    image: "/images/model_1.png",
    label: "Ethereal Presence"
  },
  { 
    title: "The Visionary", 
    quote: "Seeing the world not for what it is, but for what it could be.",
    image: "/images/Screenshot 2026-05-09 at 12.35.10.png",
    label: "Leading the Way"
  },
  { 
    title: "Beauty", 
    quote: "More than skin deep—it's the radiant light you carry.",
    image: "/images/model_2.png",
    label: "Inner Glow"
  },
];

const CollectionCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.1 }}
      className="relative min-w-[350px] md:min-w-[450px] h-[600px] group overflow-hidden rounded-sm border border-white/5"
    >
      {/* Image Backdrop */}
      <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-110">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
        <span className="font-poppins text-[10px] tracking-[0.5em] text-luxury-gold uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {item.label}
        </span>
        <h3 className="font-playfair text-4xl md:text-5xl text-white italic mb-6">
          {item.title}
        </h3>
        
        <div className="w-12 h-[1px] bg-luxury-gold/50 mb-6 group-hover:w-full transition-all duration-700" />
        
        <p className="font-cormorant text-xl text-white/70 italic leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          "{item.quote}"
        </p>
      </div>

      {/* Numbering */}
      <div className="absolute top-8 right-8 font-playfair text-4xl text-white/10 italic">
        0{index + 1}
      </div>
    </motion.div>
  );
};

const MagazineExperience = () => {
  return (
    <section className="py-32 bg-[#050505] overflow-hidden">
      <div className="px-8 md:px-24 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="max-w-4xl"
        >
          <span className="font-poppins text-[10px] tracking-[0.8em] text-white/20 uppercase mb-4 block">The Collection</span>
          <h2 className="font-playfair text-6xl md:text-8xl gold-gradient italic mb-8">Essence & Empire</h2>
          <p className="font-cormorant text-2xl text-white/40 italic">A visual study of the traits that define Sonu's journey.</p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="flex gap-8 overflow-x-auto px-8 md:px-24 pb-12 hide-scrollbar scroll-smooth snap-x snap-mandatory">
        {collection.map((item, index) => (
          <div key={index} className="snap-center">
            <CollectionCard item={item} index={index} />
          </div>
        ))}
        {/* Spacer for scroll */}
        <div className="min-w-[100px]" />
      </div>
    </section>
  );
};

export default MagazineExperience;
