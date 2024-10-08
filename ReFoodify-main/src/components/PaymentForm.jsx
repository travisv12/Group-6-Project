import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { clearCart } from "@/redux/cart/actions";
import { useDispatch, useSelector } from "react-redux";
import { checkout } from "@/redux/order/actions";
import "./PaymentForm.style.css";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart_order = useSelector((state) => state.cart.cart_order);


  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1-");
  };

  const formatExpiryDate = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{2})/, "$1/$2")
      .slice(0, 5);
  };

  // Handle card number input change
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

// Handle expiry date input change
  const handleExpiryDateChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
  };

// handle payment method and checking out logic for reedem points 
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkout(cart_order))
      .unwrap()
      .then((response) => {
        console.log("Checkout successful:", response);
      })
      .catch((error) => {
        console.error("Checkout failed:", error);
      });
    dispatch(clearCart());
    toast.success("Payment successful!");
    navigate("/thank-you");
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form-content">
        <h1 className="payment-form-title">Payment</h1>
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
              maxLength="19"
              placeholder="XXXX-XXXX-XXXX-XXXX"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardName">Cardholder Name</label>
            <input
              type="text"
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              required
              maxLength="5"
              placeholder="MM/YY"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="payment-form-button">
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
