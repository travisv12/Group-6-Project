import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  // getCartTotal,
  // applyDiscount,
} from "@/redux/slices/cartSlice";
import { useEffect } from "react";
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
  // const appliedDiscount = useSelector((state) => state.cart.appliedDiscount) || 0;
  const userInfo = useSelector((state) => state.user.userInfo);
  const [cartTotal, setCartTotal] = useState(0);

  const totalDiscount = cart.reduce((sum, item) => {
    const originalPrice = parseFloat(item.price);
    const discountedPrice = parseFloat(item.discountedPrice);
    return sum + (originalPrice - discountedPrice) * item.quantity;
  }, 0);

  console.log("Cart items:", cart);
  console.log("Cart total:", cartTotal);
  console.log("Total discount:", totalDiscount);

  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    points: userInfo?.rewardPoints || 0,
  });
  const [estimatedTotal, setEstimateTotal] = useState(0);


  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    setCartTotal(calculateCartTotal());
  };

  const calculateCartTotal = () => {
    const itemsTotal = cart.reduce((total, item) => {
      const price = parseFloat( item.price);
      console.log(
        `Item: ${item.name}, Price: ${price}, Quantity: ${item.quantity}`
      );
      if (isNaN(price)) {
        console.warn(`Invalid price for item: ${item.name}`);
        return total;
      }
      return total + price * item.quantity;
    }, 0);

    console.log(`Items Total in get CArt total: ${itemsTotal}`);

    // const appliedDiscountValue = parseFloat(appliedDiscount) || 0;
    // console.log("CHECKING FOR appliec discount : ", appliedDiscountValue);
    console.log(
      "CHECKING FOR MAX: ",
      Math.max(0, itemsTotal)
    );
    return Math.max(0, itemsTotal);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
    setCartTotal(calculateCartTotal());
  };

  useEffect(() => {
    setCartTotal(calculateCartTotal());
    console.log("Cart total IN USE EFFECT:", cartTotal);
  }, []);

    useEffect(() => {
      setEstimateTotal(
        (cartTotal - totalDiscount).toFixed(2)
      );
    }, [cartTotal, totalDiscount]);

  const handleRedeemPoints = async () => {
    if (userInfo.rewardPoints >= 5000) {
   const discount = 5;

      try {
        const updatedUser = await dispatch(
          updateUser({
            ...userInfo,
            rewardPoints: userInfo.rewardPoints - 5000,
          })
        ).unwrap();
        console.log("Updated user:", updatedUser);

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

  const handleCheckout = () => {
    console.log("Checking out...");
    const discountedTotal = (cartTotal - totalDiscount).toFixed(2);
    const checkoutData = {
      cart: cart,
      cartTotal: discountedTotal, // Use the calculated discounted total
    };

    console.log("Checkout data:", checkoutData);
     navigate("/payment", { state: checkoutData });

    // dispatch(checkout(checkoutData))
    //   .unwrap()
    //   .then((response) => {
    //     console.log("Checkout successful:", response);
    //     navigate("/payment", { state: checkoutData });
    //   })
    //   .catch((error) => {
    //     console.error("Checkout failed:", error);
    //   });
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

  //  setEstimateTotal((cartTotal - totalDiscount - appliedDiscount).toFixed(2));

  
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
                <span>{cartTotal} €</span>
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
