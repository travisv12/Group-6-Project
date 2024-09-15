import React from "react";
import "./MainPage.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>ReFoodify</h3>
        </div>
        <div className="footer-column">
          <h4>ReFoodify</h4>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/vision">Vision</a>
          <a href="/login">Log In</a>
        </div>
        <div className="footer-column">
          <h4>Market</h4>
          <a href="/buy">Buy products</a>
          <a href="/recipes">Share recipes</a>
        </div>
        <div className="footer-column">
          <h4>Contact</h4>
          <a href="mailto:info@refoodify.com">Email</a>
          <a href="https://instagram.com/refoodify">Instagram</a>
          <a href="https://facebook.com/refoodify">Facebook</a>
        </div>
        <div className="footer-column newsletter">
          <h4>Join our newsletter</h4>
          <input type="email" placeholder="Enter your email" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
