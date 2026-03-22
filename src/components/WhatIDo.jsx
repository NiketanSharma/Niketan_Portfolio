import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhatIDo.module.css';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const TITLE_ROW_HEIGHT = 130; // px — height of the pinned header area

const services = [
  {
    num: '01',
    title: 'Full-Stack Development',
    desc: 'From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.',
    skills: [
      { id: '01', text: 'React, Node.js, Express.js' },
      { id: '02', text: 'REST APIs, Firebase, Docker' },
      { id: '03', text: 'Git, GitHub, Postman' },
    ],
  },
  {
    num: '02',
    title: 'UI/UX & Frontend',
    desc: 'Good design feels effortless. I design and develop responsive, intuitive interfaces that work smoothly across devices, with a strong focus on clarity, accessibility, and performance.',
    skills: [
      { id: '01', text: 'NextJs, TailwindCSS, GSAP' },
      { id: '02', text: 'Figma → Pixel-perfect code' },
      { id: '03', text: 'HTML, CSS, JavaScript' },
    ],
  },
  {
    num: '03',
    title: 'Optimization',
    desc: 'I build scalable, reliable systems with efficient data handling and clean, high-performance architecture.',
    skills: [
      { id: '01', text: 'Data Structures & Algorithms' },
      { id: '02', text: 'DBMS, OOP, OS Fundamentals' },
      { id: '03', text: 'Scalable systems & data pipelines' },
    ],
  },
];

/* ── Individual service card ─────────────────────────────────── */
const ServiceCard = React.forwardRef(({ service, index }, ref) => (
  <div
    ref={ref}
    className={styles.stickyCard}
  >
    <div className={styles.cardContent}>
      <div className={styles.leftCol}>
        <span className={styles.num}>({service.num})</span>
      </div>

      <div className={styles.rightCol}>
        {/* The title stays in the "pinned" area (top staggerOffset) */}
        <h3 className={styles.serviceTitle}>{service.title}</h3>

        {/* The body will be covered by next card */}
        <div className={styles.cardBody}>
          <p className={styles.serviceDesc}>{service.desc}</p>
          <div className={styles.skillsList}>
            {service.skills.map((skill) => (
              <div key={skill.id} className={styles.skillRow}>
                <span className={styles.skillNum}>{skill.id}</span>
                <span className={styles.skillText}>{skill.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
));

ServiceCard.displayName = 'ServiceCard';

/* ── Main Section ───────────────────────────────────────────── */
const WhatIDo = () => {
  const cardRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      cards.forEach((card, i) => {
        const staggerOffset = i * TITLE_ROW_HEIGHT;

        ScrollTrigger.create({
          trigger: card,
          start: `top ${staggerOffset}`,
          endTrigger: containerRef.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: i === cards.length - 1,
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section className={styles.wrapper} ref={containerRef} id="Services">
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}><AnimatedText text="WHAT I DO /" /></h2>
        </div>

        <div className={styles.introRow}>
          <span className={styles.introLabel}>(SERVICES)</span>
          <p className={styles.introText}>
            I focus on building fast, reliable, and user-friendly full-stack web applications, turning ideas into practical, scalable products with clean design and strong performance.
          </p>
        </div>

        {/* Service cards — pinned via GSAP ScrollTrigger */}
        <div className={styles.stickyContainer}>
          {services.map((s, i) => (
            <ServiceCard
              key={s.num}
              ref={(el) => (cardRefs.current[i] = el)}
              service={s}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
