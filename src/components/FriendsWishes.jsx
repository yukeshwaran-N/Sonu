import React from 'react';
import { motion } from 'framer-motion';

const wishes = [
  { name: "Aditi", message: "Happy Birthday to the most graceful person I know! Keep shining.", relation: "Best Friend" },
  { name: "Rahul", message: "The runway is yours today and every day. Have a blast!", relation: "Friend" },
  { name: "Sneha", message: "You define elegance. May your year be as beautiful as your soul.", relation: "Cousin" },
  { name: "Vikram", message: "To the girl who dreams big—keep inspiring us all!", relation: "Friend" },
  { name: "Ananya", message: "Happy Birthday Sonu! Your smile is literally magic.", relation: "Bestie" },
  { name: "Karan", message: "Cheers to another year of being iconic. Stay you!", relation: "Friend" },
];

const FriendsWishes = () => {
  return (
    <section className="py-24 px-8 md:px-24 bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl md:text-7xl gold-gradient italic mb-4"
          >
            The Wish Wall
          </motion.h2>
          <p className="font-poppins text-xs tracking-[0.5em] text-white/30 uppercase">
            Messages from your favorites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishes.map((wish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
              className="glass p-8 relative group"
            >
              <div className="absolute top-4 right-6 text-4xl text-luxury-gold/10 font-playfair italic group-hover:text-luxury-gold/20 transition-colors">
                “
              </div>
              
              <div className="mb-6">
                <p className="font-cormorant text-xl text-white/80 leading-relaxed italic">
                  {wish.message}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-luxury-gold/40" />
                <div>
                  <h4 className="font-playfair text-white text-lg">{wish.name}</h4>
                  <p className="font-poppins text-[10px] tracking-widest text-luxury-gold uppercase opacity-60">
                    {wish.relation}
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

export default FriendsWishes;
