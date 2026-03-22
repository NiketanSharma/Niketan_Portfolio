import React, { useState } from 'react';
import styles from './Contact.module.css';
import { smoothScrollTo } from './MenuOverlay';
import AnimatedText from './AnimatedText';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

  const handle = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('sending');

    try {
      const response = await fetch("https://formsubmit.co/ajax/niketansharma18@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'box' // use a nice email template
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <footer className={styles.contact} id="Contact">
      <div className={styles.top}>
        <h2 className={styles.bigText}>
          <AnimatedText text={["Let's", "Make It", "Happen"]} />
        </h2>

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.field}>
            <label>Name</label>
            <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handle} required />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handle} required />
          </div>
          <div className={styles.field}>
            <label>Your Message</label>
            <textarea name="message" rows="4" placeholder="Let's Connect!" value={formData.message} onChange={handle} required />
          </div>
          <button type="submit" className={styles.contactBtn} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Error. Try Again.' : 'Send Message ↗'}
          </button>
        </form>
      </div>
      <div className={styles.bottom}>
        <div className={styles.footerCol}>
          <span className={styles.colLabel}>MENU</span>
          {['Home', 'Services', 'Projects', 'About', 'Contact'].map(l => (
            <a
              key={l}
              href={`#${l}`}
              onClick={(e) => { e.preventDefault(); smoothScrollTo(l); }}
              className={styles.footLink}
            >
              {l}
            </a>
          ))}
        </div>

        <div className={styles.footerCol}>
          <span className={styles.colLabel}>PROBLEM SOLVING STATS</span>
          <a href="https://codolio.com/profile/Niketan" target="_blank" rel="noreferrer" className={styles.footLink}>Codolio</a>
          <a href="https://leetcode.com/u/NiketanSharma/" target="_blank" rel="noreferrer" className={styles.footLink}>LeetCode</a>
          <a href="https://www.hackerrank.com/profile/sharmaniketan201" target="_blank" rel="noreferrer" className={styles.footLink}>HackerRank</a>
          <a href="https://www.geeksforgeeks.org/profile/niketan05?tab=activity" target="_blank" rel="noreferrer" className={styles.footLink}>GeeksForGeeks</a>
          <a href="https://codeforces.com/profile/sharmaniketan2005" target="_blank" rel="noreferrer" className={styles.footLink}>Codeforces</a>
        </div>

        <div className={styles.footerCol}>
          <span className={styles.colLabel}>SOCIALS</span>
          <a href="https://www.linkedin.com/in/niketansharma05/" target="_blank" rel="noreferrer" className={styles.footLink}>LinkedIn</a>
          <a href="https://github.com/NiketanSharma" target="_blank" rel="noreferrer" className={styles.footLink}>Github</a>
          <a href="https://www.instagram.com/niketan.__/" target="_blank" rel="noreferrer" className={styles.footLink}>Instagram</a>
        </div>

        <div className={styles.footerRight}>
          <button
            className={styles.scrollTopBtn}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            <div className={styles.arrowWrapper}>
              <span className={styles.arrowIcon}>↑</span>
              <span className={styles.arrowIcon}>↑</span>
            </div>
          </button>
        </div>
      </div>
    </footer >
  );
};

export default Contact;
