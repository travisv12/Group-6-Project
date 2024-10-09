import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderDetails } from "@/redux/order/actions";
import Spinner from "@/components/Spinner"; // Adjust the import path as needed
import "./userOrders.style.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";
import { IconCircleArrowLeft } from "@tabler/icons-react";

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
      <div className="order-header">
        <Link to="/my-account/purchase-history" className="back-button">
          <IconCircleArrowLeft className="icon-back" />
          <span>Go back</span>
        </Link>
        <h1 className="user-orders-title">Order Details</h1>
      </div>
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
                <img
                  src={item.productId.img}
                  alt={item.productId.name}
                  className="product-image"
                />
                <div className="item-details">
                  <p>Name: {item.productId.name}</p>
                  <p>Original Price: {item.productId.price} €</p>
                  <p>Discounted Price: {item.productId.discountedPrice} €</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Store: {item.productId.store}</p>
                  <p>Location: {item.productId.location}</p>
                </div>
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
