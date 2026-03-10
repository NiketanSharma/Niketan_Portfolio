import React, { useRef, useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handle = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const submit = (e) => { e.preventDefault(); alert('Message sent! (placeholder)'); };

  return (
    <footer className={styles.contact} id="Contact">
      <div className={styles.top}>
        <h2 className={styles.bigText}>
          Let&apos;s<br />Make It<br />Happen
        </h2>

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.field}>
            <label>Name</label>
            <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handle} />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handle} />
          </div>
          <div className={styles.field}>
            <label>Project description</label>
            <textarea name="message" rows="4" placeholder="Tell me about your project..." value={formData.message} onChange={handle} />
          </div>
          <button type="submit" className={styles.submitBtn}>Get a quote ↗</button>
        </form>
      </div>

      <div className={styles.bottom}>
        <div className={styles.footerCol}>
          <span className={styles.colLabel}>MENU</span>
          {['Home', 'Services', 'Works', 'About', 'Contact'].map(l => (
            <a key={l} href={`#${l}`} className={styles.footLink}>{l}</a>
          ))}
        </div>

        <div className={styles.footerCol}>
          <span className={styles.colLabel}>SOCIALS</span>
          <a href="https://www.linkedin.com/in/zunedaalim/" target="_blank" rel="noreferrer" className={styles.footLink}>LinkedIn</a>
          <a href="https://www.instagram.com/zuned_aalim/" target="_blank" rel="noreferrer" className={styles.footLink}>Instagram</a>
          <a href="https://github.com/zunedaalim" target="_blank" rel="noreferrer" className={styles.footLink}>Github</a>
        </div>

        <div className={styles.footerRight}>
          <p className={styles.copy}>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
