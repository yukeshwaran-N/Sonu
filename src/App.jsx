import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Hero from './components/Hero';
import TheMuse from './components/TheMuse';
import MagazineExperience from './components/MagazineExperience';
import MemoryGallery from './components/MemoryGallery';
import BehindTheSpotlight from './components/BehindTheSpotlight';
import CinematicCinema from './components/CinematicCinema';
import FilmStrip from './components/FilmStrip';
import InteractivePlay from './components/InteractivePlay';
import MiniGames from './components/MiniGames';
import FriendsWishes from './components/FriendsWishes';
import VirtualGift from './components/VirtualGift';
import FinalEnding from './components/FinalEnding';
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  const handleEnterExperience = () => {
    setLoading(false);
    setAutoPlayMusic(true);
  };

  useEffect(() => {
    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <div className="bg-luxury-black min-h-screen text-white selection:bg-luxury-gold selection:text-black">
      <CustomCursor />
      <AudioPlayer autoPlay={autoPlayMusic} />
      <div className="noise-bg" />
      
      <AnimatePresence>
        {loading && <Loader onFinished={handleEnterExperience} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            <div id="hero">
              <Hero />
            </div>
            <div id="the-muse">
              <TheMuse />
            </div>
            <div id="cinema">
              <CinematicCinema />
            </div>
            <div id="collection">
              <MagazineExperience />
            </div>
            <div id="film-strip">
              <FilmStrip />
            </div>
            <div id="play">
              <InteractivePlay />
            </div>
            <div id="mini-games">
              <MiniGames />
            </div>
            <div id="memories">
              <MemoryGallery />
            </div>
            <div id="wishes">
              <FriendsWishes />
            </div>
            <div id="spotlight">
              <BehindTheSpotlight />
            </div>
            <div id="gift">
              <VirtualGift />
            </div>
            <div id="ending">
              <FinalEnding />
            </div>
          </main>
          
          <footer className="py-12 px-8 text-center border-t border-white/5">
            <p className="font-poppins text-[10px] tracking-[0.5em] text-white/20 uppercase">
              Made with love for Sonu • 2026
            </p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
