import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  getCartTotal,
  appliedDiscount,
} from "@/redux/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { checkout } from "@/redux/slices/orderSlice";
import { updateUser } from "@/redux/user/actions";
import React, { useState } from "react";
import { toast } from "react-toastify";

import "./index.style.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const userInfo = useSelector((state) => state.user.userInfo);
  const cartTotal = useSelector(getCartTotal) || 0;
  const totalDiscount = cart.reduce((sum, item) => {
    const originalPrice = parseFloat(item.price);
    const discountedPrice = parseFloat(item.discountedPrice);
    return sum + (originalPrice - discountedPrice) * item.quantity;
  }, 0);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleRedeemPoints = async () => {
    if (userInfo.rewardPoints >= 5000) {
      const discount = 5;
      try {
        const updatedUserInfo = await dispatch(
          updateUser({
            ...userInfo,
            rewardPoints: userInfo.rewardPoints - 5000,
          })
        ).unwrap();

        // dispatch(setUserInfo(updatedUserInfo));
        // dispatch(applyDiscount(discount));
        setAppliedDiscount((prevDiscount) => prevDiscount + discount);
        toast.success(`You've redeemed a ${discount}€ discount!`);
      } catch (err) {
        console.error("Redeem points failed:", err.message);
        toast.error("Failed to redeem points. Please try again.");
      }
    } else {
      toast.warning("You need at least 5000 points to redeem a discount.");
    }
  };

  const handleCheckout = () => {
    const discountedTotal = (cartTotal - totalDiscount).toFixed(2);
    const checkoutData = {
      cart: cart,
      cartTotal: discountedTotal,
    };

    console.log("Checkout data:", checkoutData);

    dispatch(checkout(checkoutData))
      .unwrap()
      .then((response) => {
        console.log("Checkout successful:", response);
        navigate("/payment", { state: checkoutData });
      })
      .catch((error) => {
        console.error("Checkout failed:", error);
      });
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
                <div className="cart-item-details space-y-2">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">{item.salePrice}</p>
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
            <h2 className="cart-summary-title">
              Order <em>Summary</em>
            </h2>
            <div className="cart-summary-details">
              <div className="cart-summary-item">
                <span>Items Total:</span>
                <span>{cartTotal.toFixed(2)} €</span>
              </div>
              <div className="cart-summary-item">
                <span>Items Discount:</span>
                <span className="cart-summary-discount">
                  -{totalDiscount.toFixed(2)} €
                </span>
              </div>
              <div className="cart-summary-total">
                <span>Estimated Total</span>
                {/* <span>{(cartTotal - 16.8).toFixed(2)} €</span> */}
                <span>
                  {(cartTotal - totalDiscount - appliedDiscount).toFixed(2)} €
                </span>
              </div>
            </div>
            <button
              className="cart-summary-button"
              onClick={handleRedeemPoints}
            >
              Redeem Points
            </button>
            <button className="cart-summary-button" onClick={handleCheckout}>
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
