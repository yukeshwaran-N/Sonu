import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const MiniGames = () => {
  const [activeGame, setActiveGame] = useState('petals');

  return (
    <section className="py-24 px-8 md:px-24 bg-luxury-black overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl md:text-7xl gold-gradient italic mb-6">Mini Moments</h2>
          <p className="font-cormorant text-2xl text-white/60 italic">Small games, big smiles.</p>
          
          <div className="flex justify-center gap-8 mt-12">
            {['petals', 'memory'].map((game) => (
              <button
                key={game}
                onClick={() => setActiveGame(game)}
                className={`font-poppins text-xs tracking-[0.3em] uppercase transition-all duration-500 pb-2 border-b ${
                  activeGame === game ? 'text-luxury-gold border-luxury-gold' : 'text-white/30 border-transparent hover:text-white/60'
                }`}
              >
                {game === 'petals' ? 'Petal Fortune' : 'Memory Match'}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeGame === 'petals' ? (
              <PetalGame key="petals" />
            ) : (
              <MemoryGame key="memory" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const PetalGame = () => {
  const [petals, setPetals] = useState([
    { id: 1, angle: 0, text: "You are breathtakingly beautiful." },
    { id: 2, angle: 45, text: "Your kindness knows no bounds." },
    { id: 3, angle: 90, text: "The world shines brighter with you." },
    { id: 4, angle: 135, text: "You're capable of incredible things." },
    { id: 5, angle: 180, text: "Your smile is pure magic." },
    { id: 6, angle: 225, text: "You define elegance effortlessly." },
    { id: 7, angle: 270, text: "You are the muse of my heart." },
    { id: 8, angle: 315, text: "Every day with you is a gift." },
  ]);
  const [pluckedPetals, setPluckedPetals] = useState([]);
  const [lastMessage, setLastMessage] = useState("Pluck a petal to hear a truth.");

  const pluckPetal = (petal) => {
    if (pluckedPetals.includes(petal.id)) return;
    setPluckedPetals([...pluckedPetals, petal.id]);
    setLastMessage(petal.text);
    
    if (pluckedPetals.length === petals.length - 1) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFFFFF']
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-64 h-64 mb-12">
        {/* Flower Center */}
        <div className="absolute inset-0 m-auto w-12 h-12 bg-luxury-gold rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] z-10 flex items-center justify-center">
           <div className="w-8 h-8 rounded-full border border-white/20" />
        </div>

        {/* Petals */}
        {petals.map((petal) => {
          const isPlucked = pluckedPetals.includes(petal.id);
          return (
            <motion.div
              key={petal.id}
              onClick={() => pluckPetal(petal)}
              initial={false}
              animate={{
                rotate: petal.angle,
                scale: isPlucked ? 0 : 1,
                opacity: isPlucked ? 0 : 1,
                y: isPlucked ? 100 : 0,
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full origin-bottom w-12 h-24 cursor-pointer"
              style={{ rotate: `${petal.angle}deg` }}
            >
              <div className="w-full h-full bg-gradient-to-t from-luxury-gold to-luxury-gold/40 rounded-full border border-white/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-shadow" />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        key={lastMessage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="font-cormorant text-3xl text-white italic max-w-md">
          "{lastMessage}"
        </p>
        {pluckedPetals.length === petals.length && (
          <button 
            onClick={() => { setPluckedPetals([]); setLastMessage("A new bloom for you."); }}
            className="mt-8 font-poppins text-[10px] uppercase tracking-widest text-luxury-gold hover:text-white transition-colors"
          >
            Regrow Flower
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};

const MemoryGame = () => {
  const images = [
    "/images/model_1.png",
    "/images/model_5.png",
    "/images/model_6.png",
    "/images/model_7.png",
    "/images/model_8.png",
    "/images/model_9.png",
    "/images/model_2.png",
    "/images/model_3.png",
  ];

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const duplicatedImages = [...images, ...images];
    const shuffledCards = duplicatedImages
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({ id: index, img }));
    setCards(shuffledCards);
    setSolved([]);
    setFlipped([]);
  };

  const handleClick = (id) => {
    if (disabled || flipped.includes(id) || solved.includes(id)) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      setFlipped([flipped[0], id]);
      setDisabled(true);
      checkMatch(id);
    }
  };

  const checkMatch = (secondId) => {
    const firstId = flipped[0];
    if (cards[firstId].img === cards[secondId].img) {
      setSolved([...solved, firstId, secondId]);
      resetFlip();
      if (solved.length + 2 === cards.length) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
      }
    } else {
      setTimeout(() => {
        resetFlip();
      }, 1000);
    }
  };

  const resetFlip = () => {
    setFlipped([]);
    setDisabled(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl"
    >
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleClick(card.id)}
            className="aspect-square relative cursor-pointer group"
            style={{ perspective: '1000px' }}
          >
            <motion.div
              animate={{ rotateY: flipped.includes(card.id) || solved.includes(card.id) ? 180 : 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full relative preserve-3d"
            >
              {/* Front */}
              <div className="absolute inset-0 bg-white/5 border border-white/10 flex items-center justify-center backface-hidden rounded-lg group-hover:bg-white/10 transition-colors">
                <div className="w-4 h-4 rounded-full border border-luxury-gold/50" />
              </div>
              
              {/* Back */}
              <div className="absolute inset-0 bg-luxury-gold rounded-lg backface-hidden overflow-hidden transform rotate-y-180">
                <img src={card.img} alt="Memory" className="w-full h-full object-cover object-[center_20%]" />
                {solved.includes(card.id) && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      
      {solved.length === cards.length && (
        <div className="mt-12 text-center">
          <p className="font-cormorant text-2xl text-luxury-gold italic mb-4">You have a wonderful memory!</p>
          <button 
            onClick={initializeGame}
            className="font-poppins text-[10px] uppercase tracking-widest text-white hover:text-luxury-gold transition-colors"
          >
            Play Again
          </button>
        </div>
      )}

      <style jsx>{`
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </motion.div>
  );
};

export default MiniGames;
