import React from "react";
import "./MainPage.css";
import image1 from "../images/MainPage/brand1.png";
import image2 from "../images/MainPage/brand2.png";
import image3 from "../images/MainPage/brand3.png";
import image4 from "../images/MainPage/brand4.png";

const Collaboration = () => {
  return (
    <div className="collaboration-container">
      <div className="collaboration-text">
        <h2>COLLABORATION WITH:</h2>
      </div>
      <div className="collaboration-box">
        <div className="collaboration-images">
          <img src={image1} alt="Collaboration 1" />
          <img src={image2} alt="Collaboration 2" />
          <img src={image3} alt="Collaboration 3" />
          <img src={image4} alt="Collaboration 4" />
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
