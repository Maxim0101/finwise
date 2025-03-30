import styles from './Home.module.css'; // Reusing Home page styles
import { Link } from 'react-router-dom';
import Logo from '../assets/finwise-logo.jpg';
import { useAuth } from '../context/AuthContext';

const Resources = () => {
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
        <h2 style={{ color: '#000', textAlign: 'center', marginBottom: '2.5rem' }}>Resources</h2>

        <div className={styles.aboutSection}>
          {/* Section Block */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h3 className={styles.missionTitle}>📚 Free Financial Courses</h3>
            <p><a href="https://www.coursera.org/learn/financial-planning" target="_blank" rel="noreferrer">Financial Planning for Young Adults – Coursera</a></p>
            <p><a href="https://learn.financialeducatorscouncil.org" target="_blank" rel="noreferrer">National Financial Educators Council – Free Modules</a></p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h3 className={styles.missionTitle}>🌐 Trusted Websites</h3>
            <p><a href="https://www.investopedia.com" target="_blank" rel="noreferrer">Investopedia – Learn any finance topic</a></p>
            <p><a href="https://www.consumerfinance.gov/" target="_blank" rel="noreferrer">CFPB – Consumer Finance Protection Bureau</a></p>
            <p><a href="https://www.nerdwallet.com/" target="_blank" rel="noreferrer">NerdWallet – Compare loans, cards, savings</a></p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h3 className={styles.missionTitle}>📱 Recommended Apps</h3>
            <p><strong>Mint:</strong> Budget tracking and goals</p>
            <p><strong>You Need a Budget (YNAB):</strong> Hands-on budgeting app</p>
            <p><strong>Fidelity / Robinhood:</strong> Start investing with $1</p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h3 className={styles.missionTitle}>📄 Downloadable Tools</h3>
            <p><a href="https://docs.google.com/spreadsheets/d/1QGAbRfh0v7KDFHvbZDP-budget-template" target="_blank" rel="noreferrer">Google Sheets Budget Template</a></p>
            <p><a href="https://www.vertex42.com/ExcelTemplates/personal-budget-spreadsheet.html" target="_blank" rel="noreferrer">Excel Personal Budget Template – Vertex42</a></p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h3 className={styles.missionTitle}>🧠 Get Expert Help</h3>
            <p><a href="https://www.afcpe.org/" target="_blank" rel="noreferrer">AFCPE – Find Certified Financial Coaches</a></p>
            <p><a href="https://www.nfcc.org/" target="_blank" rel="noreferrer">NFCC – Free Credit Counseling</a></p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h3 className={styles.missionTitle}>🩹 Mental Health</h3>
            <p><a href="https://www.crisistextline.org/" target="_blank" rel="noreferrer">Crisis Text Line – Text HOME to 741741</a></p>
            <p><a href="https://988lifeline.org/" target="_blank" rel="noreferrer">988 Suicide & Crisis Lifeline – Call or chat 24/7</a></p>
            <p><a href="https://openpathcollective.org/" target="_blank" rel="noreferrer">Open Path Collective – Affordable therapy</a></p>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          <a href="mailto:maximailin1@gmail.com" className={styles.contactLink}>Contact us</a> • © 2025 FinWise • All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default Resources;
