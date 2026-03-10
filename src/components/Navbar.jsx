import React from 'react';
import styles from './Navbar.module.css';

const links = ['Services', 'Works', 'About', 'Contact'];

const NavLink = ({ label }) => (
  <a href={`#${label}`} className={styles.navLink}>
    <span className={styles.cube}>
      <span className={styles.cubeFront}>{label}</span>
      <span className={styles.cubeTop}>{label}</span>
    </span>
  </a>
);

// Always visible — preloader overlay (z-index 9999) covers it during load
const Navbar = () => (
  <header className={styles.navbar}>
    <span className={styles.brand}>Web Developer &amp; Designer</span>
    <nav className={styles.nav}>
      {links.map(l => <NavLink key={l} label={l} />)}
    </nav>
  </header>
);

export default Navbar;
