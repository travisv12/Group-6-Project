import { useState } from "react";
import { mockPurchaseHistory } from "./mockPurchaseHistory";
import "./purchaseHistory.style.css";

const PurchaseHistory = () => {
  const [visibleItems, setVisibleItems] = useState(4);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const sortedPurchaseHistory = [...mockPurchaseHistory].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const showMoreItems = () => {
    setVisibleItems((prevVisible) =>
      Math.min(prevVisible + 4, sortedPurchaseHistory.length)
    );
  };

  const handleCheckOrder = (purchase) => {
    setSelectedPurchase(purchase);
  };

  const handleBackToList = () => {
    setSelectedPurchase(null);
  };

  if (selectedPurchase) {
    return (
      <div className="purchase-history-container">
        <div className="p-4 md:p-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="purchase-history-title">
              Purchase <span className="title-primary">Details</span>
            </h1>
            <button
              onClick={handleBackToList}
              className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600 transition-colors"
            >
              Back to Purchase History
            </button>
          </div>
          <div className="flex flex-col gap-y-2 mt-4">
            <hr className="border-t-2 border-gray-300 my-4" />
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">
                Date: {selectedPurchase.date.toLocaleDateString()}
              </p>
              <p className="text-lg font-bold">
                Total Price: {selectedPurchase.totalPrice.toFixed(2)} €
              </p>
            </div>
            {selectedPurchase.items.map((item) => (
              <div
                key={item.id}
                className="border p-2 rounded flex items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div>
                  <p>{item.name}</p>
                  <p>Price: {item.price.toFixed(2)} €</p>
                  <p>Amount: {item.amount}</p>
                  <p>Total: {(item.price * item.amount).toFixed(2)} €</p>
                  <p>Supermarket: {item.supermarket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="purchase-history-container">
      <div className="p-4 md:p-10">
        <h1 className="purchase-history-title">
          Purchase <span className="title-primary">History</span>
        </h1>

        <div className="flex flex-col gap-y-2 mt-10 w-full">
          {sortedPurchaseHistory.slice(0, visibleItems).map((purchase) => (
            <div
              key={purchase.id}
              className="purchase-card purchase-card-horizontal"
            >
              <img
                src={purchase.image}
                alt=""
                className="purchase-image purchase-image-large"
              />
              <div className="purchase-details purchase-details-left">
                <div className="text-center md:text-left">
                  <p className="text-lg font-bold text-black">
                    Purchase at {purchase.date.toLocaleDateString()}
                  </p>
                </div>
                <div className="purchase-buttons purchase-buttons-between">
                  <p className="purchase-price">
                    {purchase.totalPrice.toFixed(2)} €
                  </p>
                  <button
                    className="button-check-order"
                    onClick={() => handleCheckOrder(purchase)}
                  >
                    Check order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleItems < sortedPurchaseHistory.length && (
          <div className="flex justify-center mt-4">
            <button
              className="bg-primary text-white px-4 py-2 rounded"
              onClick={showMoreItems}
            >
              SHOW MORE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
