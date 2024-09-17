import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './register.style.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        navigate("/login"); 
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <section className="register-section" style={{ backgroundImage: "url('/images/auth/auth.png')" }}>
      <div className="register-grid">
        <div className="register-form-container">
          <h2 className="register-title">Welcome</h2>
          <div className="register-links">
            <Link className="register-link" to={"/login"}>Login</Link>
            <Link className="register-link" to={"/register"}>Sign Up</Link>
          </div>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Re-enter Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="form-submit">
              <button type="submit" className="form-button">Create account</button>
            </div>
            <div className="form-social">
              <p className="form-social-text">Or login with</p>
              <div className="form-social-buttons">
                <button className="form-social-button facebook">Facebook</button>
                <button className="form-social-button google">Google</button>
              </div>
            </div>
          </form>
        </div>
        <h1 className="register-heading">Reduce Food Wastage for Sustainable Living</h1>
      </div>
    </section>
  );
};

export default Register;
