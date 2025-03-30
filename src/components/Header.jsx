import { Link } from "react-router-dom";
import styles from "./HeaderFooter.module.css";
import Logo from "../assets/finwise-logo.jpg";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
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
  );
};

export { Header };
