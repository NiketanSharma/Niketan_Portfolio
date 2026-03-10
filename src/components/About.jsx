import React, { useEffect, useRef } from 'react';
import styles from './About.module.css';

const words = ['DEVELOPER', 'DESIGNER', 'CREATOR'];

const skillGroups = [
  {
    title: 'Languages & Tools',
    skills: ['Python', 'SQL', 'C++', 'Java', 'TypeScript', 'JavaScript', 'Git', 'Postman', 'Docker', 'Firebase'],
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['React', 'Node.js', 'Express.js', 'Flask', 'Bootstrap', 'jQuery', 'TailwindCSS', 'Framer Motion', 'GSAP'],
  },
  {
    title: 'Core CS Concepts',
    skills: ['DSA', 'DBMS', 'OOP', 'Operating Systems', 'System Design'],
  },
];

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';

/**
 * Text scramble effect on hover — character-by-character random flicker
 */
const ScrambleText = ({ text }) => {
  const ref = useRef(null);
  const frameRef = useRef(null);

  const scramble = () => {
    let iter = 0;
    const original = text;
    clearInterval(frameRef.current);
    frameRef.current = setInterval(() => {
      if (!ref.current) return;
      ref.current.innerText = original
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < iter) return original[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
      if (iter >= original.length) clearInterval(frameRef.current);
      iter += 0.5;
    }, 40);
  };

  return (
    <span
      ref={ref}
      className={styles.skillName}
      onMouseEnter={scramble}
    >
      {text}
    </span>
  );
};

const About = () => {
  return (
    <section className={styles.about} id="About">
      {/* Big marquee words */}
      <div className={styles.marqueeLine}>
        {[...words, ...words].map((w, i) => (
          <span key={i} className={styles.marqueeWord}>{w}<span className={styles.slash}>/</span></span>
        ))}
      </div>

      {/* Skills grid */}
      <div className={styles.skillsGrid}>
        {skillGroups.map((group) => (
          <div key={group.title} className={styles.skillGroup}>
            <h4 className={styles.groupTitle}>{group.title}</h4>
            <ul className={styles.skillList}>
              {group.skills.map((s) => (
                <li key={s}><ScrambleText text={s} /></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
