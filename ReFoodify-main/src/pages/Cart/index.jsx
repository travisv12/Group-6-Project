import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useCart from "@/hooks/useCart";
import { Link } from "react-router-dom";

import "./index.style.css";

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const cartTotal = useSelector((state) => state.cart.total);

      useEffect(() => {
        dispatch(fetchCart());
      }, [dispatch]);

       const handleRemoveFromCart = (productId) => {
         dispatch(removeItem(productId));
       };
       
       
  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateItemQuantity({ productId, quantity }));
  };

    const handleCheckout = () => {
      dispatch(checkout(cart));
    };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">My shopping cart</h1>
        <p>Your cart is empty.</p>
        <Link
          to="/shop"
          className="bg-yellow-500 text-white px-4 py-2 rounded inline-block mt-4"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-header">
          <Link to="/shop" className="cart-back-button">
            Go back
          </Link>
          <h1 className="cart-title">My shopping cart</h1>
        </div>

        <div className="cart-grid">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-select">
                  <input type="radio" name="select-item" />
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">{item.price}</p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    className="cart-item-quantity-button"
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    className="cart-item-quantity-button"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="cart-item-remove"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="cart-summary-title">Order Summary</h2>
            <div className="cart-summary-details">
              <div className="cart-summary-item">
                <span>Items Total:</span>
                <span>{getCartTotal().toFixed(2)} €</span>
              </div>
              <div className="cart-summary-item">
                <span>Items Discount:</span>
                <span className="cart-summary-discount">-16.80 €</span>
              </div>
              <div className="cart-summary-total">
                <span>Estimated Total</span>
                <span>{(getCartTotal() - 16.8).toFixed(2)} €</span>
              </div>
            </div>
            <button className="cart-summary-button">Check out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
