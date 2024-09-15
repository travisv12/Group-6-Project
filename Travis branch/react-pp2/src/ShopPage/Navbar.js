import React from "react";
import "./ShopPage.css";
import image from "../images/ShopPage/profilepic.png";
import image2 from "../images/ShopPage/cart.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/">
        <div className="navbar-logo">ReFoodify</div>
      </a>
      <div className="navbar-links">
        <a href="/Recipes" className="navbar-link">
          Recipes
        </a>
        <a href="/Shop" className="navbar-link">
          Shop
        </a>
        <a href="/userprofile" className="navbar-link">
          <b>Mahnoor</b>
        </a>
        <a href="/userprofile">
          <img src={image} alt="Profile" className="profile-image" />
        </a>
        <a href="/cart">
          <img src={image2} alt="Cart" className="cart-image" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
