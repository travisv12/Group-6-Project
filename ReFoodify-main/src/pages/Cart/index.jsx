import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/redux/cart/actions";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkoutCart } from "@/redux/cart/actions";
import { updateUser, fetchUser } from "@/redux/user/actions";
import React, { useState } from "react";
import { toast } from "react-toastify";
import blueberries from "@/assets/blueberries.png";
import "./index.style.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const userR = useSelector((state) => state.user);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [cartTotal, setCartTotal] = useState(0);
  const totalDiscount = cart.reduce((sum, item) => {
    const originalPrice = parseFloat(item.product.price);
    const discountedPrice = parseFloat(item.product.discountedPrice);
    return sum + (originalPrice - discountedPrice) * item.quantity;
  }, 0);

  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    points: userInfo?.rewardPoints || 0,
  });
  const [estimatedTotal, setEstimateTotal] = useState(0);

  // to fetch User data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchUser()).unwrap();
      } catch (err) {
        console.log("Fetch user data failed:", err.message);
      }
    };
    fetchData();
  }, []);

  //  set user data
  useEffect(() => {
    if (userInfo) {
      setUpdatedUserInfo({
        points: userInfo?.rewardPoints,
      });
    }
  }, [userInfo]);

  // remove item from cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    setCartTotal(calculateCartTotal());
  };

  //  calculating cart total
  const calculateCartTotal = () => {
    const itemsTotal = cart.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      if (isNaN(price)) {
        console.warn(`Invalid price for item: ${item.product.name}`);
        return total;
      }
      return total + price * item.quantity;
    }, 0);
    return Math.max(0, itemsTotal);
  };

  // update quantity of item in cart
  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity(productId, quantity));
    setCartTotal(calculateCartTotal());
  };

  // set cart total every time cart changes
  useEffect(() => {
    setCartTotal(calculateCartTotal());
  }, []);

  // set cart estimated total every time cart changes
  useEffect(() => {
    setEstimateTotal((cartTotal - totalDiscount).toFixed(2));
  }, [cartTotal, totalDiscount]);

  // redeem points
  const handleRedeemPoints = async () => {
    if (userInfo.rewardPoints >= 5000) {
      const discount = 5;

      try {
        const updatedUser = await dispatch(
          updateUser({
            rewardPoints: userInfo.rewardPoints - 5000,
          })
        ).unwrap();

        setUpdatedUserInfo((prevInfo) => ({
          ...prevInfo,
          points: updatedUser.rewardPoints,
        }));

        toast.success(`You've redeemed a ${discount}€ discount!`);

        // Subtract the discount from the estimated total
        setEstimateTotal((prevTotal) => (prevTotal - discount).toFixed(2));
      } catch (err) {
        console.error("Redeem points failed:", err.message);
        toast.error("Failed to redeem points. Please try again.");
      }
    } else {
      toast.warning("You need at least 5000 points to redeem a discount.");
    }
  };

  // checkout
  const handleCheckout = () => {
    const checkoutData = {
      cart: cart,
      cartTotal: estimatedTotal, // Use the calculated discounted total
    };
    dispatch(checkoutCart(checkoutData));
    navigate("/payment", { state: checkoutData });
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center my-12">
        <h1 className="text-4xl font-bold mb-4 text-white">OOPS!</h1>
        <p className="text-2xl text-white">Your cart is empty.</p>
        <Link
          to="/shop"
          className="bg-yellow-500 text-white text-xl px-6 py-3 rounded inline-block mt-6 shadow-md"
          style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
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
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-select">
                  <input type="radio" name="select-item" />
                </div>
                <img
                  src={item.product.image || blueberries}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details space-y-2">
                  <h3 className="cart-item-name">{item.product.name}</h3>
                  <p className="cart-item-price">
                    {item.product.discountedPrice} €
                  </p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.product.id, item.quantity - 1)
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
                      handleUpdateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="cart-item-quantity-button"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.product.id)}
                  className="cart-item-remove"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="cart-summary-title">
              <em>Order Summary</em>
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
                {estimatedTotal} €
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
