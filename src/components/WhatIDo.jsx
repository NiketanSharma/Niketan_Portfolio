import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './WhatIDo.module.css';

const services = [
  {
    num: '01',
    title: 'Full-Stack Development',
    desc: 'From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.',
    tags: ['React', 'Node.js', 'Express.js', 'Databases']
  },
  {
    num: '02',
    title: 'UI/UX & Frontend',
    desc: 'Good design feels effortless. I design and develop responsive, intuitive interfaces that work smoothly across devices, with a strong focus on clarity, accessibility, and performance.',
    tags: ['Next.js', 'TailwindCSS', 'GSAP', 'Framer Motion']
  },
  {
    num: '03',
    title: 'Optimization',
    desc: 'I focus on building systems that stay reliable as things scale. From handling data efficiently to designing clean architecture, I apply core CS principles to keep applications fast and future-ready.',
    tags: ['DSA', 'DBMS', 'OOP', 'System Design']
  },
];

const WhatIDo = () => {
  const sectionRef = useRef(null);

  /**
   * As this section enters the viewport from the bottom,
   * the card slides up (translateY: 100% → 0) and simultaneously
   * we track scrollYProgress to dim the hero behind it.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  // Card translates from 60% down to 0 as scroll progresses
  const cardY = useTransform(scrollYProgress, [0, 1], ['60%', '0%']);

  return (
    <section className={styles.wrapper} ref={sectionRef} id="Services">
      <motion.div
        className={styles.card}
        style={{ translateY: cardY }}
      >
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>What I Do /</h2>
        </div>

        <div className={styles.list}>
          {services.map((s) => (
            <div key={s.num} className={styles.serviceRow}>
              <span className={styles.num}>{s.num}</span>
              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <div className={styles.tags}>
                  {s.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhatIDo;
