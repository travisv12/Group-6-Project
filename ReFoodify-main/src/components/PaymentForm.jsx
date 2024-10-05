import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import "./PaymentForm.style.css";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1-");
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
              onChange={(e) => setExpiryDate(e.target.value)}
              required
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
