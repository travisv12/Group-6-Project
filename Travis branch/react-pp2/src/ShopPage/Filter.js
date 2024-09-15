import React from "react";
import "./ShopPage.css";
import filterImage from "../images/ShopPage/filter.png";

const Filter = () => {
  return (
    <div className="filter-container">
      <div className="filter-content">
        <div className="filter-header">
          <h2>Filter</h2>
          <a href="#">
            <img src={filterImage} alt="Filter" className="filter-image" />
          </a>
        </div>
        <div className="filter-buttons">
          <button className="filter-button">Supermarket</button>
          <button className="filter-button">Price (From Highest) </button>
          <button className="filter-button">Price (From Lowest)</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
