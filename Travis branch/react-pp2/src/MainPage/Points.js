import React from "react";
import "./MainPage.css";
import pointsImage from "../images/MainPage/points.png";

const Points = () => {
  return (
    <div className="points-container">
      <div className="points-image-container">
        <img src={pointsImage} alt="Points" />
      </div>
      <div className="points-content">
        <div className="points-box">
          <div className="points-header">
            <h2>BUY DISCOUNTED ITEMS AND CLAIM YOUR POINTS </h2>
          </div>
          <div className="points-text">
            <p>
              Order discounted products from collaborators in just one click.
              Earn points by reducing food wastage and use those points as you
              shop.
            </p>
          </div>
          <div className="points-button-container">
            <button className="points-button">CLAIM YOUR POINTS</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Points;
