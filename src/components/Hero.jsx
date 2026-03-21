import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import { smoothScrollTo } from './MenuOverlay';

const name1 = 'NIKETAN';
const name2 = 'SHARMA';
const chars = [...name1.split(''), ' ', ...name2.split('')];


const ContactBtn = () => (
  <a
    href="#Contact"
    onClick={(e) => {
      e.preventDefault();
      smoothScrollTo('Contact');
    }}
    className={styles.contactBtn}
  >
    CONTACT ↗
  </a>
);

const Hero = ({ ready }) => {
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    if (ready) {
      // Start loading Spline sooner so the robot appears faster
      const timer = setTimeout(() => setShowSpline(true), 800);
      return () => clearTimeout(timer);
    }
  }, [ready]);

  return (
  <section className={styles.hero} id="Home">

    {/* ── Full-width name ── */}
    <div className={styles.nameWrap}>
      <h1 className={styles.name} aria-label="Niketan">
        {chars.map((ch, i) => (
          <span key={i} className={ch === ' ' ? styles.space : styles.charClip}>
            {ch === ' ' ? (
              <span className={styles.spaceChar}>&nbsp;</span>
            ) : (
              <motion.span
                className={styles.char}
                initial={{ y: '110%' }}
                animate={ready ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.76, 0, 0.24, 1] }}
              >
                {ch}
              </motion.span>
            )}
          </span>
        ))}
      </h1>
    </div>

    {/* ── 3D Spline Robot — Massive Background Element ── */}
    <motion.div
      className={styles.imageWrap}
      initial={{ opacity: 0 }}
      animate={showSpline ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Wrapper to crop out the bottom Spline watermark and capture full screen mouse movements */}
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        {showSpline && (
          <iframe
            src="https://my.spline.design/nexbotrobotcharacterconcept-p6Ci2u51nhdo2SKld1GsSodb/"
            frameBorder="0"
            title="Spline 3D Robot"
            style={{
              pointerEvents: 'auto',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: 'calc(100vh + 80px)',
              border: 'none',
            }}
          ></iframe>
        )}
      </div>
    </motion.div>

    {/* ── Bottom row ── */}
    <div className={styles.bottomRow}>
      <motion.div
        className={styles.bottomLeft}
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.65 }}
      >
        <span className={styles.arrow}>↘</span>
        <p className={styles.tagline}>
          I build fast, modern, and scalable web applications with clean design and strong performance, open to freelance opportunities worldwide.
        </p>
        <ContactBtn />
      </motion.div>

      <motion.div
        className={styles.bottomRight}
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.75 }}
      >
        <span className={styles.availLabel}>AVAILABLE FOR WORK</span>
        <span className={styles.availDate}>
          {new Date().toLocaleString('default', { month: 'short' }).toUpperCase()}&apos;{new Date().getFullYear().toString().slice(-2)}
        </span>
      </motion.div>
    </div>
  </section>
  );
};

export default Hero;
