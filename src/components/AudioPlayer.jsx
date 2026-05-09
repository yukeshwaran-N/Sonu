import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AudioPlayer = ({ autoPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef(null);

  // Using the local file uploaded by the user
  const audioUrl = "/birthday_song.mp3";
  const trackName = "Tune Kya Kiya - Bhoomika's Favorite";

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      console.log("Attempting to play:", trackName);
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setError(false);
        })
        .catch(err => {
          console.error("Playback failed:", err);
          setError(true);
        });
    }
  }, [autoPlay]);

  useEffect(() => {
    // Show the player after a short delay
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Autoplay blocked:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed bottom-8 right-8 z-[100] flex items-center gap-4"
        >
          {/* Audio Visualizer (Minimalist) */}
          <div className="flex items-end gap-[2px] h-4 mb-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: isPlaying ? [4, 12, 4] : 4
                }}
                transition={{
                  duration: 0.5 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-[2px] bg-luxury-gold"
              />
            ))}
          </div>

          <button
            onClick={togglePlay}
            className={`group relative w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 pointer-events-auto ${error ? 'border-red-500/50' : ''}`}
          >
            <div className="absolute inset-0 bg-luxury-gold/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
            
            {isPlaying ? (
              <Volume2 className="w-5 h-5 text-luxury-gold" />
            ) : error ? (
              <Music className="w-5 h-5 text-red-400/50" />
            ) : (
              <VolumeX className="w-5 h-5 text-white/40" />
            )}
            
            {/* Tooltip */}
            <div className="absolute -top-12 right-0 whitespace-nowrap bg-luxury-black/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded text-[10px] tracking-[0.2em] uppercase text-white opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-2xl">
              <p className="font-bold text-luxury-gold mb-1">{error ? "Connection Error" : isPlaying ? "Now Playing" : "Paused"}</p>
              <p className="text-white/60 lowercase italic">{trackName}</p>
            </div>
          </button>

          <audio
            ref={audioRef}
            src={audioUrl}
            loop
            preload="auto"
            playsInline
            crossOrigin="anonymous"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudioPlayer;
