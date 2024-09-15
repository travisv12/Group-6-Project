import React from "react";
import "./MainPage.css";
import recipeImage from "../images/MainPage/recipe.png";

const Recipe = () => {
  return (
    <div className="recipe-box">
      <div className="recipe-content">
        <div className="recipe-header">
          <h2>
            GENERATE RECIPE FROM YOUR INGREDIENTS AND SHARE YOUR RECIPE WITH US
          </h2>
        </div>
        <div className="recipe-text">
          <p>
            Discover mouthwatering recipes that are delicious help you reduce
            food waste. Submit your recipe to win amazing rewards.
          </p>
        </div>
      </div>
      <div className="recipe-image">
        <img src={recipeImage} alt="Recipe" />
      </div>
    </div>
  );
};

export default Recipe;
