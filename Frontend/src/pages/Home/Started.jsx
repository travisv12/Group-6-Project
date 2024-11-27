import React from "react";
import "./Started.css";
import { Link } from "react-router-dom";

const Started = () => {
  return (
    <div className="started-container">
      <div className="started-box">
        <div className="started-text">
          <p>ARE YOU READY?</p>
        </div>
        <div className="started-header">
          <h2>SHAPE A SUSTAINABLE WORLD</h2>
        </div>
        <div className="started-button-container">
          <Link
            to="/register"
            title=""
            className="started-button"
            role="button"
          >
            <span> GET STARTED</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Started;
