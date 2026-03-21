import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIDo from './components/WhatIDo';
import Works from './components/Works';
import About from './components/About';
import Contact from './components/Contact';
import MenuOverlay from './components/MenuOverlay';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  // ── Lenis smooth scroll + GSAP ScrollTrigger sync ────────
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15 });
    // Expose Lenis globally so MenuOverlay can use it for smooth nav
    window.__lenis = lenis;

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      window.__lenis = null;
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
      <Navbar ready={preloaderDone} />

      {/* Floating menu button + fullscreen overlay */}
      <MenuOverlay />

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
          willChange: 'transform, opacity',
        }}
      >
        <Hero ready={preloaderDone} />
      </motion.div>

      {/* Sections scroll over the sticky hero */}
      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <WhatIDo />
        <Works />
        <About />
        <Contact />
      </div>

    </>
  );
}
