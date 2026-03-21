import React, { useRef } from 'react';
import styles from './About.module.css';

const skillGroups = [
  {
    title: 'Languages & Tools',
    skills: ['C++', 'Java', 'Python', 'SQL', 'TypeScript', 'JavaScript', 'Git', 'Postman', 'Docker', 'Firebase'],
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

const ScrambleText = ({ text, delay = 0 }) => {
  const ref = useRef(null);
  const frameRef = useRef(null);

  const scramble = (startDelay = 0) => {
    const timer = setTimeout(() => {
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
    }, startDelay);
    return timer;
  };

  // Run on mount with staggered delay
  React.useEffect(() => {
    const timer = scramble(delay);
    return () => { clearTimeout(timer); clearInterval(frameRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className={styles.skillName}>
      {text}
    </span>
  );
};

const About = () => (
  <section className={styles.about} id="About">
    <div className={styles.inner}>

      {/* ── Left: About content ─────────────────────── */}
      <div className={styles.leftCol}>
        <span className={styles.label}>(ABOUT)</span>
        <h2 className={styles.heading}>HEY !</h2>

        <p className={styles.bio}>
          I'm Niketan Sharma, a full-stack developer and software engineer
          passionate about building clean, performant, and user-focused
          digital experiences.
        </p>
        <p className={styles.bio}>
          I thrive at the intersection of design and engineering — turning
          complex problems into elegant, scalable solutions. Currently open
          to freelance projects and full-time opportunities.
        </p>

        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>BASED IN</span>
            <span className={styles.metaValue}>India</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>AVAILABILITY</span>
            <span className={styles.metaValue}>Open to work</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>EDUCATION</span>
            <span className={styles.metaValue}>B.Tech Computer Science and Engineering</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>DEVELOPMENT EXPERIENCE</span>
            <span className={styles.metaValue}>2+ Years</span>
          </div>
        </div>
      </div>

      {/* ── Right: Skills ───────────────────────────── */}
      <div className={styles.rightCol}>
        <h3 className={styles.skillsHeading}>Skills</h3>
        <div className={styles.skillsGrid}>
          {skillGroups.map((group) => (
            <div key={group.title} className={styles.skillGroup}>
              <h4 className={styles.groupTitle}>{group.title}</h4>
              <ul className={styles.skillList}>
                {group.skills.map((s, idx) => (
                  <li key={s}>
                    <ScrambleText text={s} delay={200 + idx * 80} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  </section>
);

export default About;
