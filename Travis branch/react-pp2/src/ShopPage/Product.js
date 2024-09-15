import React, { useState } from "react";
import "./ShopPage.css";

const Product = ({ id, image, name, price }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  return (
    <div className="product-box">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">€ {price.toFixed(2)}</p>
      <div className="quantity-control">
        <button className="quantity-button" onClick={handleDecrement}>
          -
        </button>
        <span className="quantity-display">{quantity}</span>
        <button className="quantity-button2" onClick={handleIncrement}>
          +
        </button>
      </div>
      <button className="add-button">ADD</button>
    </div>
  );
};

export default Product;
