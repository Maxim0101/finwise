import styles from './Settings.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, get, update, remove } from 'firebase/database';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, signOut } from 'firebase/auth';

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      get(userRef).then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFirst(data.first || '');
          setLast(data.last || '');
        }
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (user) {
      try {
        await update(ref(db, `users/${user.uid}`), { first, last });
        setMessage('Profile updated!');
      } catch (err) {
        setMessage('Failed to update profile.');
      }
    }
  };

  const handleChangePassword = async () => {
    const currentPassword = prompt('Enter your current password:');
    if (!currentPassword) return;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setMessage('Password updated!');
      setNewPassword('');
    } catch (err) {
      setMessage('Failed to update password.');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await remove(ref(db, `users/${user.uid}`));
        await user.delete();
        navigate('/');
      } catch (err) {
        setMessage('Account deletion failed.');
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.style.backgroundColor = newTheme === 'dark' ? '#121212' : 'white';
    document.body.style.color = newTheme === 'dark' ? 'white' : 'black';
  };

  const handleLogout = async () => {
    await signOut(user.auth);
    navigate('/');
  };

  return (
    <div className={styles.settingsContainer}>
      <h2>Settings</h2>

      <div className={styles.section}>
        <h3>🔐 Security</h3>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleChangePassword}>Change Password</button>
      </div>

      <div className={styles.section}>
        <h3>🎨 Preferences</h3>
        <button className={styles.button} onClick={toggleTheme}>Toggle Theme</button>
      </div>

      <div className={styles.section}>
        <h3>📧 Account Info</h3>
        <div className={styles.accountInfo}>
          <p>Email: {user?.email}</p>
        </div>
      </div>

      <div className={`${styles.section} ${styles.dangerZone}`}>
        <h3>⚠️ Danger Zone</h3>
        <div style={{ textAlign: "left" }}>
            <button className={styles.dangerButton} onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>

      <div className={styles.footerBtns}>
        <Link to="/" className={styles.button}>← Back to Home</Link>
        <button className={styles.button} onClick={handleLogout}>Log Out</button>
      </div>

      {message && <p style={{ marginTop: "1rem", color: "#1e4fc3" }}>{message}</p>}
    </div>
  );
};

export default Settings;