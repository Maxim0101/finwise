import { useState } from 'react';
import styles from './Lessons.module.css';
import { Link } from 'react-router-dom';  // Import Link component to navigate between pages
import Logo from '../assets/finwise-logo.jpg';
import { useAuth } from '../context/AuthContext';

const Lessons = () => {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(null);

  const toggleSection = (level) => {
    setExpanded(expanded === level ? null : level);
  };

  // Lesson data
  const lessons = {
    beginner: [
      { name: "Money and Income Basics", link: "/beginner/lesson1" },
      { name: "Spending Wisely & Budgeting", link: "/lessons/beginner/lesson2" },
      { name: "Saving & Banking Basics", link: "/lessons/beginner/lesson3" },
      { name: "Basics of Debt & Loans", link: "/lessons/beginner/lesson4" }
    ],    
    intermediate: [
      { name: "Credit and Credit Scores", link: "/lessons/intermediate/lesson1" },
      { name: "Managing Debt and Loans", link: "/lessons/intermediate/lesson2" },
      { name: "Taxes and Income", link: "/lessons/intermediate/lesson3" },
      { name: "Insurance and Risk Management", link: "/lessons/intermediate/lesson4" },
      { name: "Staying Safe from Scams and Fraud", link: "/lessons/intermediate/lesson5" }
    ],
    advanced: [
      { name: "Investing Basics: Stocks, Bonds, and More", link: "/lessons/advanced/lesson1" },
      { name: "Retirement Planning and Compound Interest", link: "/lessons/advanced/lesson2" },
      { name: "Major Purchases: Cars and Homes", link: "/lessons/advanced/lesson3" },
      { name: "Net Worth and Financial Planning", link: "/lessons/advanced/lesson4" }
    ]
  };

  const lessonStatus = {
    beginner: ['completed', 'inProgress', 'notStarted', 'completed'],
    intermediate: ['notStarted', 'notStarted', 'inProgress', 'completed', 'notStarted'],
    advanced: ['notStarted', 'completed', 'notStarted', 'inProgress']
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return styles.statusCompleted;
      case 'inProgress':
        return styles.statusInProgress;
      default:
        return styles.statusNotStarted;
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
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
              <Link to="/settings" className={styles.authBtn}>Settings</Link>
              <Link to="/login" className={styles.authBtn}>Log Out</Link>
            </>
          ) : (
            <>
              <Link to="/signup" className={styles.authBtn}>Sign Up</Link>
              <Link to="/login" className={styles.authBtn}>Log In</Link>
            </>
          )}
        </div>
      </header>

      {/* Body */}
      <main className={styles.main}>
        <h2 className={styles.learnTitle}>Learn</h2>  

        {/* Beginner Section */}
        <div className={styles.section} onClick={() => toggleSection('beginner')}>
          <h3 className={styles.sectionHeader}>Beginner</h3>
          {expanded === 'beginner' && (
            <ul className={styles.lessonList}>
              {lessons.beginner.map((lesson, i) => (
                <li key={i} className={styles.lessonItem}>
                  <span className={`${styles.statusCircle} ${getStatusClass(lessonStatus.beginner[i])}`}></span>
                  <Link to={lesson.link} className={styles.lessonTitle}>{lesson.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Intermediate Section */}
        <div className={styles.section} onClick={() => toggleSection('intermediate')}>
          <h3 className={styles.sectionHeader}>Intermediate</h3>
          {expanded === 'intermediate' && (
            <ul className={styles.lessonList}>
              {lessons.intermediate.map((lesson, i) => (
                <li key={i} className={styles.lessonItem}>
                  <span className={`${styles.statusCircle} ${getStatusClass(lessonStatus.intermediate[i])}`}></span>
                  <Link to={lesson.link} className={styles.lessonTitle}>{lesson.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Advanced Section */}
        <div className={styles.section} onClick={() => toggleSection('advanced')}>
          <h3 className={styles.sectionHeader}>Advanced</h3>
          {expanded === 'advanced' && (
            <ul className={styles.lessonList}>
              {lessons.advanced.map((lesson, i) => (
                <li key={i} className={styles.lessonItem}>
                  <span className={`${styles.statusCircle} ${getStatusClass(lessonStatus.advanced[i])}`}></span>
                  <Link to={lesson.link} className={styles.lessonTitle}>{lesson.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          <a href="mailto:maximailin1@gmail.com" className={styles.contactLink}>Contact us</a> • © 2025 FinWise • All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default Lessons;
