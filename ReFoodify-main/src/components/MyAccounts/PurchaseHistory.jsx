import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "@/redux/order/actions";
import Spinner from "@/components/Spinner";
import image1 from "@/assets/purHisIm-1.png";
import image2 from "@/assets/purHisIm-2.png";
import image3 from "@/assets/purHisIm-3.png";
import { useNavigate } from "react-router-dom";
import "./purchaseHistory.style.css";

const PurchaseHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderHistory, loading, error } = useSelector((state) => state.order);

  // Fetch user orders when the component mounts
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  // Handle order click and navigate to order details page
  const handleCheckOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Sort orderHistory by purchaseDate in descending order
  const sortedOrderHistory = [...orderHistory].sort(
    (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
  );

  // Filter out items without a totalPrice
  const filteredOrderHistory = sortedOrderHistory.filter(
    (order) => order.totalPrice
  );

  return (
    <div className="purchase-history-container">
      <div className="p-4 md:p-10">
        <h1 className="purchase-history-title">
          Purchase <span className="title-primary">History</span>
        </h1>

        {filteredOrderHistory.length === 0 ? (
          <p>No purchase history</p>
        ) : (
          <div className="flex flex-col gap-y-2 mt-10 w-full">
            {filteredOrderHistory.map((order, index) => (
              <div
                key={order._id}
                className="purchase-card purchase-card-horizontal"
              >
                <img
                  src={
                    index % 3 === 0 ? image1 : index % 3 === 1 ? image2 : image3
                  }
                  alt=""
                  className="purchase-image purchase-image-large"
                />
                <div className="purchase-details purchase-details-left">
                  <div className="text-center md:text-left">
                    <p className="text-lg font-bold text-black">
                      {order.storeName}
                    </p>
                    <p>{new Date(order.purchaseDate).toLocaleDateString()}</p>
                  </div>
                  <div className="purchase-buttons purchase-buttons-between">
                    <p className="purchase-price">{order.totalPrice} €</p>
                    <button
                      className="button-check-order"
                      onClick={() => handleCheckOrder(order._id)}
                    >
                      Check order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
