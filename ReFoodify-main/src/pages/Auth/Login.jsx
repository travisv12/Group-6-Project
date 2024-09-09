import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "@/hooks/useUser";
import './login.style.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (success) {
      navigate("/"); // Redirect to dashboard on successful login
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <section
      className="login-section"
      style={{ backgroundImage: "url('/images/auth/auth.png')" }}
    >
      <div className="login-grid">
        <div className="login-form-container">
          <h2 className="login-title">Welcome</h2>
          <div className="login-links">
            <Link className="login-link" to={"/login"}>
              Login
            </Link>
            <Link className="login-link" to={"/register"}>Sign Up</Link>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
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
            <div className="form-remember">
              <div className="form-remember-checkbox">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="form-checkbox"
                />
                <label htmlFor="remember-me" className="form-remember-label ml-2">
                  Remember me
                </label>
              </div>
              <div className="form-forgot">
                <a href="#" className="form-forgot-link">
                  Forgot password?
                </a>
              </div>
            </div>
            {error && <p className="form-error">{error}</p>}
            <div className="form-submit">
              <button
                type="submit"
                disabled={loading}
                className="form-button"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="form-social">
              <p className="form-social-text">Or login with</p>
              <div className="form-social-buttons">
                <button className="form-social-button facebook">
                  Facebook
                </button>
                <button className="form-social-button google">
                  Google
                </button>
              </div>
            </div>
          </form>
        </div>

        <h1 className="login-heading">
          Reduce Food Wastage for Sustainable Living
        </h1>
      </div>
    </section>
  );
};

export default Login;