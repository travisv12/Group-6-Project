import React from "react";
import { Link } from "react-router-dom";
import "./index.style.css";
import useCartStore from "@/hooks/useCartStore";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getDiscountAmount,
    getRewardBonus,
  } = useCartStore();

  const totalItems = getCartItemsCount();
  const totalPrice = getCartTotal(); 
  const totalDiscount = getDiscountAmount(); 
  const rewardBonus = getRewardBonus(); 

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
                <div className="cart-item-details space-y-2">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">{item.salePrice}</p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="cart-item-quantity-button"
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="cart-item-quantity-button"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="cart-item-remove"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="cart-summary-title">Order <em>Summary</em></h2>
            <div className="cart-summary-details">
              <div className="cart-summary-item">
                <span>Items Total:</span>
                <span>{totalItems} €</span>
              </div>
              <div className="cart-summary-item">
                <span>Items Discount:</span>
                <span className="cart-summary-discount">
                  -{totalDiscount.toFixed(2)} €
                </span>
              </div>
              <div className="cart-summary-total">
                <span>Estimated Total:</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
              <div className="cart-summary-reward">
                <span>Reward Bonus:</span>
                <span>{rewardBonus.toFixed(2)} €</span>
              </div>
            </div>
            <button className="cart-summary-button" onClick={clearCart}>
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
