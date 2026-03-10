import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIDo from './components/WhatIDo';
import Works from './components/Works';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  // ── Lenis smooth scroll ─────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15 });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // ── Hero scale + fade on scroll ─────────────────────
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroScale   = useTransform(scrollY, [0, 500], [1, 0.88]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const heroBR      = useTransform(scrollY, [0, 300], ['0px', '24px']);

  const handlePreloaderDone = () => setPreloaderDone(true);

  return (
    <>
      {/* Preloader overlay — rendered above everything */}
      {!preloaderDone && (
        <Preloader onComplete={handlePreloaderDone} />
      )}

      {/* Navbar — always in DOM, fades in after preloader */}
      <Navbar visible={preloaderDone} />

      {/* Sticky hero that dims as WhatIDo card slides up over it */}
      <motion.div
        ref={heroRef}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          scale: heroScale,
          opacity: heroOpacity,
          transformOrigin: 'center center',
          borderRadius: heroBR,
          overflow: 'hidden',
          height: '100vh',
        }}
      >
        <Hero ready={preloaderDone} />
      </motion.div>

      {/* Sections scroll over the sticky hero */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <WhatIDo />
        <Works />
        <About />
        <Contact />
      </div>
    </>
  );
}
