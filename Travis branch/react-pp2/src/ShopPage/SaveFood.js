import React from "react";
import backgroundImage from "../images/ShopPage/savefood.png";
import "./ShopPage.css";

const SaveFood = () => {
  return (
    <div
      className="save-food-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="save-food-box">
        <h2 className="save-food-header-1">SAVE NEAR-EXPIRED FOOD</h2>
        <h2 className="save-food-header-2">REDUCE FOOD WASTE TODAY</h2>
      </div>
    </div>
  );
};

export default SaveFood;
