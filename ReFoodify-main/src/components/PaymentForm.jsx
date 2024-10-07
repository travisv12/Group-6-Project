import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { clearCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { checkout } from "@/redux/slices/orderSlice";
import "./PaymentForm.style.css";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart = [], cartTotal = 0 } = location.state || {};

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1-");
  };

    const formatExpiryDate = (value) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{2})/, "$1/$2")
        .slice(0, 5);
    };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

   const handleExpiryDateChange = (e) => {
     const formattedValue = formatExpiryDate(e.target.value);
     setExpiryDate(formattedValue);
   };

  const handleSubmit = (e) => {
    e.preventDefault();
     const checkoutData = {
       cart,
       cartTotal,
     };
    dispatch(checkout(checkoutData))
      .unwrap()
      .then((response) => {
        console.log("Checkout successful:", response);
        // navigate("/payment", { state: checkoutData });
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
