import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Logo from '../assets/finwise-logo.jpg';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { ref, get } from 'firebase/database';
import { signOut } from 'firebase/auth';

const Home = () => {
  const facts = [
    "Only 57% of U.S. adults are financially literate (S&P Global FinLit Survey)",
    "The average American has over $90,000 in debt (Experian, 2022)",
    "1 in 4 Americans have no emergency savings (Bankrate, 2023)",
    "Nearly 40% of adults can't cover a $400 emergency (Federal Reserve, 2022)",
    "Compounding interest works best when you start early (Investopedia)",
    "Credit card interest rates often exceed 20% (LendingTree, 2023)",
    "The average U.S. credit score is 714 (Experian, 2023)",
    "Only 17 U.S. states require high school financial education (CEE, 2022)",
    "The average college graduate has $37,000 in student loans (Education Data Initiative)",
    "Student loan debt in the U.S. exceeds $1.7 trillion (Federal Reserve, 2023)",
    "Missed or late payments can stay on your credit report for 7 years (CFPB)",
    "Most Americans retire with less than $100,000 in savings (Transamerica, 2021)",
    "Using over 30% of your credit limit can hurt your score (Experian)",
    "Saving just $20/week can grow to over $1,000/year (NerdWallet)",
    "Many employers match 401(k) contributions — that's free money (IRS)",
    "The earlier you start investing, the more you earn over time (Vanguard)",
    "Budgeting is the #1 habit for financial success (Dave Ramsey)",
    "The average U.S. household has 4 credit cards (Experian, 2022)",
    "Paying more than the minimum on loans saves interest long term (CFPB)",
    "You can get a free credit report once a year from each bureau (annualcreditreport.com)",
    "Checking your credit score doesn’t hurt it (FICO)",
    "Buying coffee daily can cost over $1,000/year (Business Insider)",
    "75% of Americans live paycheck to paycheck (LendingClub, 2023)",
    "Setting financial goals improves savings rates (Journal of Economic Psychology)",
    "Automating savings increases consistency (Harvard Business Review)",
    "Rent is the biggest expense for most young adults (Pew Research)",
    "Teens who learn about money early have better outcomes later (CEE)",
    "Having insurance is part of smart financial planning (NAIC)",
    "Personal finance is more behavior than math (Dave Ramsey)",
    "You can start investing with as little as $1 (Fidelity, Robinhood)"
  ];

  const { user } = useAuth();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      const nameRef = ref(db, `users/${user.uid}`);
      get(nameRef).then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserName(`${data.first}`);
        }
      });
    }
  }, [user]);

  const today = new Date();
  const factIndex = today.getDate() % facts.length;
  const fact = facts[factIndex];

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
              <button onClick={handleLogout} className={styles.authBtn}>Log Out</button>
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
        {user && (
          <p style={{ textAlign: "center", marginTop: "1rem", color: "#006ACF" }}>
            Welcome, {user.email}!
          </p>
        )}
        <section className={styles.factBox}>
          <h2 className={styles.factTitle}>💡 Daily Fact</h2>
          <p>{fact}</p>
        </section>

        <section className={styles.aboutSection}>
          <h2>About FinWise</h2>

          <h3 className={styles.missionTitle}>Our Mission</h3>
          <p className={styles.mission}>
            At FinWise, our mission is to make financial literacy accessible, engaging, and empowering for people of all backgrounds. 
            We’re here to help users take control of their financial futures, one skill and one supportive connection at a time.
          </p>

          <h3 className={styles.storyTitle}>Why FinWise?</h3>
          <p className={styles.story}>
            Having no knowledge about loans and interest capitalization, my immigrant mother quickly drowned in college debt — 
            a fate all too common in the U.S. To combat this, I founded the Triple Threat Club during high school to help students fight the 
            three barriers to financial independence: financial illiteracy, student debt, and underemployment.
          </p>

          <p className={styles.story}>
            I originally began developing an iOS app called MoneyWise, but I soon scrapped that idea in favor of something more accessible to everyone — 
            regardless of device or platform. That vision became FinWise: a web app dedicated to education, support, and empowerment.
          </p>

          <p className={styles.quote}>
            "Every journey begins with a single step, and no deed is ever too small."
          </p>

          <img src="src/assets/ilin-m.jpg" alt="Founder" className={styles.founderImage} />
          <p className={styles.caption}>Maxim Ilin</p>
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

export default Home;