import image1 from "@/assets/purHisIm-1.png";
import image2 from "@/assets/purHisIm-2.png";
import image3 from "@/assets/purHisIm-3.png";

import "./purchaseHistory.style.css";

const PurchaseHistory = () => {
  return (
    <div className="purchase-history-container">

      <div className=" p-4 md:p-10">
        <h1 className="purchase-history-title">
          Purchase <span className="title-primary">History</span>
        </h1>

        <div className="flex flex-col gap-y-2 mt-10 w-full">
          <div className="purchase-card purchase-card-horizontal">
            <img
              src={image1}
              alt=""
              className="purchase-image purchase-image-large"
            />
            <div className="purchase-details purchase-details-left">
              <div className="text-center md:text-left">
                <p className="text-lg font-bold text-black">
                  K-Supermarket Iso Omena
                </p>
                <p>19.02.2024</p>
              </div>
              <div className="purchase-buttons purchase-buttons-between">
                <p className="purchase-price">16.95 €</p>
                <button className="button-check-order">Check order</button>
              </div>
            </div>
          </div>
          <div className="purchase-card purchase-card-horizontal">
            <img
              src={image2}
              alt=""
              className="purchase-image purchase-image-large"
            />
            <div className="purchase-details purchase-details-left">
              <div className="text-center md:text-left">
                <p className="text-lg font-bold text-black">
                  K-Supermarket Iso Omena
                </p>
                <p>19.02.2024</p>
              </div>
              <div className="purchase-buttons purchase-buttons-between">
                <p className="purchase-price">16.95 €</p>
                <button className="button-check-order">Check order</button>
              </div>
            </div>
          </div>
          <div className="purchase-card purchase-card-horizontal">
            <img
              src={image3}
              alt=""
              className="purchase-image purchase-image-large"
            />
            <div className="purchase-details purchase-details-left">
              <div className="text-center md:text-left">
                <p className="text-lg font-bold text-black">
                  K-Supermarket Iso Omena
                </p>
                <p>19.02.2024</p>
              </div>
              <div className="purchase-buttons purchase-buttons-between">
                <p className="purchase-price">16.95 €</p>
                <button className="button-check-order">Check order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
