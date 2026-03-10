import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

// Each character animates from below via stagger
const name1 = 'NIKETAN';
const name2 = 'SHARMA';
const chars = [...name1.split(''), ' ', ...name2.split('')];


const Hero = ({ ready }) => (
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

    {/* ── Dummy image — bottom center ── */}
    <motion.div
      className={styles.imageWrap}
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.5 }}
    >
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
        alt="Placeholder — replace later"
        className={styles.heroImg}
      />
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
          I build fast, modern websites that help businesses grow,
          available for freelance projects worldwide.
        </p>
        <a href="#Contact" className={styles.contactBtn}>CONTACT ↗</a>
      </motion.div>

      <motion.div
        className={styles.bottomRight}
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.75 }}
      >
        <span className={styles.availLabel}>AVAILABLE FOR WORK</span>
        <span className={styles.availDate}>MAR&apos;26</span>
      </motion.div>
    </div>
  </section>
);

export default Hero;
