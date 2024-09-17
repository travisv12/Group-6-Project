import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './register.style.css';


const formFields = [
  { id: "username", label: "Username", type: "text", placeholder: "Enter your username" },
  { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
  { id: "password", label: "Password", type: "password", placeholder: "Enter your password" },
  { id: "confirmPassword", label: "Re-enter Password", type: "password", placeholder: "Re-enter your password" },
];

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
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
          username: formData.username,
          email: formData.email,
          password: formData.password,
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
            <Link className="register-link" to="/login">Login</Link>
            <Link className="register-link" to="/register">Sign Up</Link>
          </div>
          <form onSubmit={handleSubmit} className="register-form">
            {formFields.map(({ id, label, type, placeholder }) => (
              <div key={id} className="form-group">
                <label htmlFor={id} className="form-label">{label}</label>
                <input
                  type={type}
                  id={id}
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="form-input"
                  required
                />
              </div>
            ))}
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
