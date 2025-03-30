import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(email, password, first, last);
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.authContainer}>
        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="First Name"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={last}
          onChange={(e) => setLast(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Create Account</button>

        {error && <p className={styles.error}>{error}</p>}

        <Link to="/" className={styles.homeLink}>← Back to Home</Link>
      </form>
    </div>
  );
};

export default SignUp;