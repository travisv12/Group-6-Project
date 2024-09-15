import React from "react";
import "./MainPage.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/">
        <div className="navbar-logo">ReFoodify</div>
      </a>
      <div className="navbar-links">
        <a href="/about" className="navbar-link">
          About
        </a>
        <a href="/vision" className="navbar-link">
          Vision
        </a>
        <a href="/contact" className="navbar-link">
          Contact
        </a>
        <a href="/login" className="navbar-link">
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
