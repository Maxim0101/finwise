import styles from './Home.module.css'; // Reusing styles
import { Link } from 'react-router-dom';
import Logo from '../assets/finwise-logo.jpg';
import { useAuth } from '../context/AuthContext';

const Community = () => {
  const { user } = useAuth();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.left}>
          <Link to="/">
            <img src={Logo} alt="Logo" className={styles.logo} />
          </Link>
          <h1 className={styles.title}>FinWise</h1>
        </div>

        <nav className={styles.centerNav}>
          <Link to="/lessons">Learn</Link>
          <Link to="/community">Community</Link>
          <Link to="/resources">Resources</Link>
        </nav>

        <div className={styles.right}>
          {user ? (
            <>
              <Link to="/login" className={styles.authBtn}>Log Out</Link>
              <Link to="/settings" className={styles.authBtn}>Settings</Link>
            </>
          ) : (
            <>
              <Link to="/signup" className={styles.authBtn}>Sign Up</Link>
              <Link to="/login" className={styles.authBtn}>Log In</Link>
            </>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.aboutSection}>
          <h2 style={{ color: '#000', textAlign: 'center', marginBottom: '1.5rem' }}>Connect With Others</h2>
          <p style={{ textAlign: 'center', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            We're building a safe, supportive space where you can ask questions, share tips, and grow together. 
            Stay tuned for forums, Q&A threads, and direct messaging. 💬
          </p>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#006ACF', fontWeight: 500 }}>
            Coming soon: FinWise Community Forums!
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          <a href="mailto:maximailin1@gmail.com" className={styles.contactLink}>Contact us</a> • © 2025 FinWise • All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default Community;
