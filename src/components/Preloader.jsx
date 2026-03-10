import React, { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

/**
 * Clean, GPU-accelerated preloader:
 * - Beige panel slides UP from below (transform: translateY — most performant)
 * - One smooth motion, covers entire black screen
 * - Once fully covering, the overlay is removed (same beige as site bg = seamless)
 */
const Preloader = ({ onComplete }) => {
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    // Brief pause so first paint renders, then start slide
    const t1 = setTimeout(() => setSlide(true), 80);
    // Remove preloader once animation completes (1.5s slide + 80ms delay)
    const t2 = setTimeout(onComplete, 1750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div className={styles.overlay}>
      <div className={`${styles.panel} ${slide ? styles.up : ''}`} />
    </div>
  );
};

export default Preloader;
