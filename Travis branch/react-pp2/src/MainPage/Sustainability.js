import React from "react";
import "./MainPage.css";
import image from "../images/MainPage/sustainability.png";

const Sustainability = () => {
  return (
    <div className="sustainability-box">
      <div className="sustainability-content">
        <div className="sustainability-header">
          <h2>REDUCE FOOD WASTAGE FOR SUSTAINABLE LIVING</h2>
        </div>
        <div className="sustainability-body">
          <div className="sustainability-text">
            <p>
              Using existing food instead of dining out significantly reduces
              food waste, lowers the carbon footprint associated, conserves
              resources by minimizing the energy and packaging waste.{" "}
            </p>
          </div>
          <div className="sustainability-future">
            <button className="sustainability-button">BECOME A MEMBER</button>
            <button className="sustainability-button">LEARN MORE</button>
          </div>
        </div>
      </div>
      <div className="sustainability-image">
        <img src={image} alt="Sustainability" />
      </div>
    </div>
  );
};

export default Sustainability;
