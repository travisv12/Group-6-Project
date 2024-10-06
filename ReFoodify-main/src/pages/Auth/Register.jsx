import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../redux/user/actions";

import "./register.style.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userAccessToken = useSelector((state) => state.user.accessToken);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    if (userAccessToken) {
      console.log("access token updated:", userAccessToken);
    }
  }, [userAccessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      const result = await dispatch(
        signup({ username, email, password })
      ).unwrap();
      // dispatch(setUser(result.userId));
      // dispatch(setAccessToken(result.accessToken));
      // dispatch(setRefreshToken(result.refreshToken));
      navigate("/");
    } catch (err) {
      console.error("SignUp failed:", err.message);
    }
  };
  // For now, just navigate to the home page
  // navigate("/");

  return (
    <section
      className="register-section"
      style={{ backgroundImage: "url('/images/auth/auth.png')" }}
    >
      <div className="register-grid">
        <div className="register-form-container">
          <h2 className="register-title">Welcome</h2>
          <div className="register-links">
            <Link className="register-link" to={"/login"}>
              Login
            </Link>
            <Link className="register-link" to={"/register"}>
              Sign Up
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="register-form">
            {/* Username Input */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
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

            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
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

            {/* Password Inputs */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
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
              <label htmlFor="confirmPassword" className="form-label">
                Re-enter Password
              </label>
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
              <button type="submit" className="form-button">
                Create account
              </button>
            </div>

            <div className="form-social">
              <p className="form-social-text">Or login with</p>
              <div className="form-social-buttons">
                <button className="form-social-button facebook">
                  Facebook
                </button>
                <button className="form-social-button google">Google</button>
              </div>
            </div>
          </form>
        </div>

        <h1 className="register-heading">
          Reduce Food Wastage for Sustainable Living
        </h1>
      </div>
    </section>
  );
};

export default Register;
