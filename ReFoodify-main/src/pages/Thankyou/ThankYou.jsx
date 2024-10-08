import React from "react";
import { Link } from "react-router-dom";
import "./ThankYou.style.css"; // Create a CSS file for styling

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <h1 className="thank-you-title">Thank You for Your Order!</h1>
        <p className="thank-you-message">
          Your order has been placed successfully. We appreciate your business!
        </p>
        <Link to="/shop" className="thank-you-button">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
