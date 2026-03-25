import React, { useEffect } from 'react';
import { motion, useScroll, useMotionValue, useTransform, animate } from 'framer-motion';
import styles from './Navbar.module.css';
import { smoothScrollTo } from './MenuOverlay';

const links = ['Services', 'Projects', 'About', 'Certifications', 'Contact'];

const NavLink = ({ label }) => (
  <button
    className={styles.navLink}
    onClick={() => smoothScrollTo(label)}
    aria-label={`Navigate to ${label}`}
  >
    <span className={styles.cube}>
      <span className={styles.cubeFront}>{label}</span>
    </span>
  </button>
);

const Navbar = ({ ready }) => {
  const { scrollY } = useScroll();
  // Preloader reveal & Scroll tracking
  const scrollOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const opacity = useMotionValue(0);
  const y = useTransform(scrollY, [0, 450], [0, -16]);

  useEffect(() => {
    if (!ready) return;
    // Initial fade in
    animate(opacity, 1, { duration: 0.7, ease: 'easeOut' });

    // Sync with scroll after reveal
    return scrollOpacity.on('change', (v) => {
      if (ready) opacity.set(v);
    });
  }, [ready, scrollOpacity, opacity]);

  return (
    <motion.header className={styles.navbar} style={{ opacity, y }}>
      <span 
        className={styles.brand} 
        style={{ cursor: 'pointer' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Web Developer &amp; Software Engineer
      </span>
      <nav className={styles.nav}>
        {links.map(l => <NavLink key={l} label={l} />)}
      </nav>
    </motion.header>
  );
};

export default Navbar;
