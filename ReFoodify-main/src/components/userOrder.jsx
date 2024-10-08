import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderDetails } from "@/redux/order/actions";
import Spinner from "@/components/Spinner"; // Adjust the import path as needed
import "./userOrders.style.css"; // Import the CSS file for styling

const UserOrders = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const {
    currentOrder: order,
    loading,
    error,
  } = useSelector((state) => state.order);

  // Fetch order details when the component mounts or when the orderId changes
  useEffect(() => {
    dispatch(fetchOrderDetails(orderId));
  }, [orderId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>No order details found.</div>;
  }

  return (
    <div className="user-orders-container">
      <h1 className="user-orders-title">Order Details</h1>

      <div className="order-card">
        <h2 className="order-id">Order ID: {order._id}</h2>
        <p className="order-date">
          Date: {new Date(order.purchaseDate).toLocaleDateString()}
        </p>
        <p className="order-total">Total: {order.totalPrice} €</p>
        <div className="order-items">
          <h3>Items:</h3>
          <ul>
            {order.items.map((item, index) => (
              <li key={index} className="order-item">
                <p>Name: {item.productId.name}</p>
                <p>Original Price: {item.productId.price} €</p>
                <p>Discounted Price: {item.productId.discountedPrice} €</p>
                <p>Quantity: {item.quantity}</p>
                <p>Store: {item.productId.store}</p>
                <p>Location: {item.productId.location}</p>
              </li>
            ))}
          </ul>
          {order.earnedPoints > 0 && (
            <p className="reward-points-display">
              Reward Points Earned for this Order:{" "}
              <span className="points-value">{order.earnedPoints}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
