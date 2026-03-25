import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Certifications.module.css';
import AnimatedText from './AnimatedText';

const certifications = [
  {
    title: 'Cloud Computing',
    organization: 'NPTEL',
    date: 'JAN-APR 2025',
    image: '/assets/nptel.png',
  },
  {
    title: 'JavaScript Web Development',
    organization: 'LPU Summer Training - Board Infinity',
    date: 'JULY 2025',
    image: '/assets/bi.png',
  },
  {
    title: 'GFG 160 - 160 Days of Problem Solving',
    organization: 'GeeksforGeeks',
    date: 'OCT 2025',
    image: '/assets/gfg.png',
  },
  {
    title: 'Responsive Web Design',
    organization: 'FreeCodeCamp',
    date: 'OCT 2023',
    image: '/assets/fcc.png',
  },
  {
    title: 'GEN-AI NASSCOM',
    organization: 'Skill Development Program - NASSCOM',
    date: 'FEB 2026',
    image: '/assets/nasscom.png',
  },
  {
    title: 'Computational Theory: Language Principle & Finite Automata Theory',
    organization: 'Infosys Springboard',
    date: 'AUG 2025',
    image: '/assets/infosys1.png',
  },
  {
    title: 'ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM',
    organization: 'Infosys Springboard',
    date: 'SEP 2025',
    image: '/assets/infosys2.png',
  },
  {
    title: 'Master Generative AI & Generative AI tools',
    organization: 'Infosys Springboard',
    date: 'SEP 2025',
    image: '/assets/infosys3.png',
  },
];

const Certifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // Calculate progress as a percentage
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(progress);
  };

  // Prevent scrolling when modal or lightbox is open
  useEffect(() => {
    const lenis = window.__lenis;
    if (isOpen || selectedCert) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = 'unset';
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      if (lenis) lenis.start();
    };
  }, [isOpen, selectedCert]);

  // We duplicate the array to create a seamless loop
  const duplicatedCerts = [...certifications, ...certifications];

  return (
    <section className={styles.certifications} id="Certifications">
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span className={styles.label}>
            <AnimatedText text="(RECOGNITION)" />
          </span>
          <h2 className={styles.sectionTitle}>
            <AnimatedText text="CERTIFICATES /" />
          </h2>
        </div>

        <motion.button
          className={styles.viewAllBtn}
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.button>
      </div>

      <div className={styles.marqueeContainer}>
        <motion.div
          className={styles.marquee}
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {duplicatedCerts.map((cert, index) => (
            <motion.div
              key={index}
              layoutId={`marquee-cert-${index}`}
              className={styles.card}
              onClick={() => setSelectedCert({ ...cert, layoutId: `marquee-cert-${index}` })}
              whileHover={{
                scale: 1.02,
                rotateY: index % 2 === 0 ? 5 : -5,
                rotateX: index % 3 === 0 ? 5 : -5,
                zIndex: 10
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className={styles.imageWrap}>
                <motion.img
                  layoutId={`img-marquee-${index}`}
                  src={cert.image}
                  alt={cert.title}
                  className={styles.certImage}
                  loading="lazy"
                />
              </div>
              <div className={styles.info}>
                <motion.h3 layoutId={`title-marquee-${index}`} className={styles.certTitle}>
                  {cert.title}
                </motion.h3>
                <div className={styles.infoSub}>
                  <span className={styles.certOrg}>{cert.organization}</span>
                  <span className={styles.certDate}>{cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scroll Progress Bar */}
              <div className={styles.scrollProgressTrack}>
                <motion.div
                  className={styles.scrollProgressBar}
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>

              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>All Certifications</h2>
                <button
                  className={styles.closeBtn}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close modal"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className={styles.modalGrid} data-lenis-prevent onScroll={handleScroll}>
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    layoutId={`grid-cert-${index}`}
                    className={styles.gridCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedCert({ ...cert, layoutId: `grid-cert-${index}` })}
                  >
                    <div className={styles.gridImageWrap}>
                      <motion.img 
                        layoutId={`img-grid-${index}`}
                        src={cert.image} 
                        alt={cert.title} 
                        className={styles.gridCertImage} 
                      />
                    </div>
                    <div className={styles.gridInfo}>
                      <motion.h3 layoutId={`title-grid-${index}`} className={styles.gridCertTitle}>
                        {cert.title}
                      </motion.h3>
                      <span className={styles.gridCertOrg}>{cert.organization}</span>
                      <span className={styles.gridCertDate}>{cert.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              layoutId={selectedCert.layoutId}
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.lightboxCloseBtn}
                onClick={() => setSelectedCert(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className={styles.lightboxImageContainer}>
                <motion.img
                  layoutId={selectedCert.layoutId.includes('marquee') ? `img-marquee-${selectedCert.layoutId.split('-').pop()}` : `img-grid-${selectedCert.layoutId.split('-').pop()}`}
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className={styles.lightboxImage}
                />
              </div>

              <div className={styles.lightboxInfo}>
                <motion.h2 
                  layoutId={selectedCert.layoutId.includes('marquee') ? `title-marquee-${selectedCert.layoutId.split('-').pop()}` : `title-grid-${selectedCert.layoutId.split('-').pop()}`}
                  className={styles.lightboxTitle}
                >
                  {selectedCert.title}
                </motion.h2>
                <span className={styles.lightboxOrg}>{selectedCert.organization}</span>
                <span className={styles.lightboxDate}>{selectedCert.date}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
