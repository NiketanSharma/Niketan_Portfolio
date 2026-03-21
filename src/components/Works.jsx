import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Works.module.css';

// Single dummy image — user will replace later
const DUMMY = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop';

const projects = [
  { num: '01', tag: 'Development · 2025', category: 'Modern Marketing Website', title: 'NURA', link: 'https://nurabyzuned.netlify.app/' },
  { num: '02', tag: 'Development · 2025', category: 'Full-Stack Recruitment Platform', title: 'Job Portal', link: 'https://zunedjobs.netlify.app/' },
  { num: '03', tag: 'Development · 2025', category: 'SAAS Platform', title: 'Productivity SAAS', link: 'https://productivity-saas-zuned.netlify.app/' },
  { num: '04', tag: 'Development · 2025', category: 'ML Recommendation Engine', title: 'CineRec', link: 'https://movierecommendation-sbjn.onrender.com/' },
  { num: '05', tag: 'Development · 2025', category: 'Code-to-Image Tool', title: 'Code2Img', link: 'https://code2img-zuned.netlify.app/' },
];

const ProjectCard = ({ project }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className={styles.projectCard}
    >
      <div className={styles.projectMeta}>
        <span className={styles.projectNum}>{project.num}</span>
        <div>
          <p className={styles.projectCat}>{project.category}</p>
          <p className={styles.projectTag}>{project.tag}</p>
        </div>
      </div>

      <div className={styles.imageWrap}>
        <motion.img
          style={{ y: imgY }}
          src={DUMMY}
          alt={`${project.title} placeholder`}
          className={styles.projectImg}
        />
        <div className={styles.imageOverlay}>
          <span className={styles.viewBtn}>View Project ↗</span>
        </div>
      </div>

      <h3 className={styles.projectTitle}>{project.title}</h3>
    </a>
  );
};

const Works = () => (
  <section className={styles.works} id="Works">
    <div className={styles.worksHeader}>
      <span className={styles.label}>PROJECTS /</span>
    </div>
    <div className={styles.grid}>
      {projects.map((p) => <ProjectCard key={p.num} project={p} />)}
    </div>
  </section>
);

export default Works;
