import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import styles from './MenuOverlay.module.css';

const navItems = [
  { label: 'HOME', id: 'Home' },
  { label: 'SERVICES', id: 'Services' },
  { label: 'PROJECTS', id: 'Works' },
  { label: 'ABOUT', id: 'About' },
  { label: 'CONTACT', id: 'Contact' },
];

// Smooth scroll helper — uses Lenis if available, else native
export function smoothScrollTo(id) {
  if (id === 'Home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, {
      offset: 0,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

const overlayVariants = {
  hidden: {
    clipPath: 'circle(0% at calc(100% - 3rem) 3.2rem)',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
  visible: {
    clipPath: 'circle(170% at calc(100% - 3rem) 3.2rem)',
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.28 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const linkVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    y: '-60%',
    opacity: 0,
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.55, ease: 'easeOut' } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
};

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (v) => {
      setVisible(v > window.innerHeight * 0.8);
    });
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNav = useCallback((id) => {
    setOpen(false);
    setTimeout(() => smoothScrollTo(id), 680);
  }, []);

  return (
    <>
      {/* ── FAB toggle ─────────────────────────────── */}
      <AnimatePresence>
        {visible && !open && (
          <motion.button
            key="fab"
            className={styles.fab}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <span className={styles.hamLine} />
            <span className={styles.hamLine} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Fullscreen overlay ─────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className={styles.overlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Right decorative circle */}
            <div className={styles.decorCircle} />

            {/* Close button */}
            <motion.button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              ×
            </motion.button>

            {/* Nav links */}
            <nav className={styles.navLinks}>
              <motion.div
                className={styles.linkList}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {navItems.map((item) => (
                  <div key={item.id} className={styles.linkClip}>
                    <motion.button
                      className={styles.navLink}
                      variants={linkVariants}
                      onClick={() => handleNav(item.id)}
                    >
                      {item.label}
                    </motion.button>
                  </div>
                ))}
              </motion.div>
            </nav>

            {/* Footer */}
            <motion.div
              className={styles.footer}
              variants={footerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.footerBlock}>
                <span className={styles.footerLabel}>EMAIL ADDRESS</span>
                <a href="mailto:niketansharma18@gmail.com" className={styles.footerEmail}>
                  niketansharma18@gmail.com
                </a>
              </div>
              <div className={styles.footerSocials}>
                <a href="https://www.linkedin.com/in/niketansharma05/" target="_blank" rel="noreferrer" className={styles.socialLink}>LinkedIn</a>
                <a href="https://github.com/NiketanSharma" target="_blank" rel="noreferrer" className={styles.socialLink}>Github</a>
                <a href="https://leetcode.com/u/NiketanSharma/" target="_blank" rel="noreferrer" className={styles.socialLink}>Leetcode</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
