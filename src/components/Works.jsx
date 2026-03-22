import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './Works.module.css';
import AnimatedText from './AnimatedText';

// Single dummy image — user will replace later
const DUMMY = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop';

const projects = [
  {
    num: '01',
    tag: 'Development · 2026',
    category: 'Marketing Website',
    title: 'BigBite - Restaurant Website',
    link: 'https://www.bigbitefoods.shop/',
    video: 'assets/BigBite.mp4'
  },
  {
    num: '02',
    tag: 'Development · 2026',
    category: 'Code To Image Tool',
    title: 'SnapCode',
    link: 'https://snapcode18.vercel.app/',
    video: 'assets/SnapCode.mp4'
  },
  {
    num: '03',
    tag: 'Development · 2025',
    category: 'Tax Calculator with ChatBot',
    title: 'TaxEase',
    link: 'https://niketansharma.github.io/TaxEase/',
    video: 'assets/TaxEase.mp4'
  },
  {
    num: '04',
    tag: 'Development · 2025',
    category: 'Task Management',
    title: 'TaskMate',
    link: 'https://taskmate-frontend-ns0h.onrender.com/',
    video: 'assets/TaskMate.mp4'
  },
  {
    num: '05',
    tag: 'Development · 2025',
    category: 'Code-to-Image Tool',
    title: 'Code2Img',
    link: '',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
];

const ProjectVideo = ({ src, y }) => {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { amount: 0.3 });

  React.useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(e => console.log("Video play failed:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <motion.video
      ref={videoRef}
      style={{ y }}
      src={src}
      className={styles.projectVideo}
      loop
      muted
      playsInline
      tabIndex="-1"
    />
  );
};

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
        <ProjectVideo
          src={project.video}
          y={imgY}
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
  <section className={styles.works} id="Projects">
    <div className={styles.worksHeader}>
      <span className={styles.label}><AnimatedText text="PROJECTS /" /></span>
    </div>
    <div className={styles.grid}>
      {projects.map((p) => <ProjectCard key={p.num} project={p} />)}
    </div>
  </section>
);

export default Works;
