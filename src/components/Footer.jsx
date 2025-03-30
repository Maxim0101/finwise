import styles from './HeaderFooter.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <a href="mailto:maximailin1@gmail.com" className={styles.contactLink}>Contact us</a> • © 2025 FinWise • All rights reserved
      </p>
    </footer>
  );
};
