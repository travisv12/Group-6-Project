import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconSearch, IconX } from "@tabler/icons-react";
import recipeBg from "@/assets/recipes_bg.png";
import meetStew from "@/assets/meet_stew.png";

import share_recipe_2 from "@/assets/share-recipe-2.png";

import "./index.style.css";
// Default image if there's no image

const allIngredients = [
  "Fish",
  "Carrot",
  "Beetroot",
  "Potato",
  "Garlic",
  "Eggs",
  "Butter",
  "Flour",
  "Chicken",
  "Tomato",
  "Paprika",
  "Parmesan Cheese",
  "Basil",
  "Lemon",
  "Beef",
  "Vinegar",
  "Fish Sauce",
  "Pea",
];

const Recipes = () => {
  const [formData, setFormData] = useState({
    recipeName: "",
    duration: "",
    servings: "",
    image: "",
    ingredients: [],
    instructions: "",
  });
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  // Load recipes from localStorage on component mount
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const allRecipeIngredients = savedRecipes.reduce((acc, recipe) => {
      return [...acc, ...recipe.ingredients];
    }, []);

    setRecipes(savedRecipes);
    console.log("All recipe ingredients", allRecipeIngredients);
    setFilteredIngredients(allIngredients);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchTerm(search);
    setFilteredIngredients(
      allIngredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(search)
      )
    );
  };

  // Handle adding ingredient
  const handleAddIngredient = (ingredient) => {
    if (!formData.ingredients.includes(ingredient)) {
      setFormData((prevData) => ({
        ...prevData,
        ingredients: [...prevData.ingredients, ingredient],
      }));
    }
  };

  // Handle removing ingredient
  const handleRemoveIngredient = (ingredient) => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: prevData.ingredients.filter((ing) => ing !== ingredient),
    }));
  };
  return (
    <div>
      <div
        className="recipe-header"
        style={{
          backgroundImage: `url(${recipeBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="recipe-title">
          Select what you have <br /> and we will suggest a recipe
        </h2>
      </div>

      <div className="main-container">
        <div className="recipe-grid">
          {/* Search ingredients */}
          <div className="search-container">
            <div className="recipes-search-box">
              <input
                type="text"
                className="search-input"
                placeholder="write what you have here..."
                value={searchTerm} // Search term from state
                onChange={handleSearchChange} // Handle search input
              />
              <IconSearch />
            </div>

            <div className="ingredients-list">
              {filteredIngredients.map((ingredient) => (
                <div
                  key={ingredient}
                  className="recipes-ingredient"
                  onClick={() => handleAddIngredient(ingredient)}
                >
                  {ingredient}
                </div>
              ))}
            </div>
          </div>

          {/* Selected ingredients */}
          <div className="selected-container">
            <div className="selected-header">
              <div className="recipes-selected-content">
                <p>Selected ingredients</p>
              </div>
            </div>

            <div className="ingredients-list">
              {formData.ingredients.map((ingredient) => (
                <div key={ingredient} className="recipes-ingredient selected">
                  <span>{ingredient}</span>
                  <IconX
                    className="recipes-icon-remove"
                    onClick={() => handleRemoveIngredient(ingredient)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate button */}
        <div className="btn-generate">
          <button className="btn-generate-recipe">GENERATE A RECIPE</button>
        </div>

        {/* Check out a sample recipe */}
        {recipes.length > 0 && (
          <div className="mt-[50px]">
            <div className="main-recipe-preview">
              <div className="mian-recipe-card">
                <img
                  src={recipes[0].image || meetStew}
                  alt=""
                  className="main-recipe-image"
                />
                <div>
                  <div className="flex-center">
                    <div className="flex justify-center">
                      <p className="mian-recipe-name">
                        {recipes[0].recipeName}
                      </p>
                    </div>
                  </div>
                  <div className="mian-recipe-details">
                    <p>Duration: {recipes[0].duration} mins</p>
                    <p>Servings: {recipes[0].servings} people</p>
                  </div>
                  <Link to={`/recipes/details/${recipes[0].id}`}>
                    <button className="btn-checkout-recipe">
                      CHECK OUT RECIPE
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Share your recipe */}
        <div className="share-recipe-section">
          <div className="share-recipe-image">
            <img src={share_recipe_2} alt="" />
          </div>
          <div className="share-recipe-image">
            <img src={share_recipe_2} alt="" />
          </div>
          <div className="share-recipe-box">
            <h1 className="share-title">
              SHARE YOUR RECIPE <br /> WITH US
            </h1>

            <div className="main-btn-share">
              <a href="/recipes/createRecipe">
                <button className="btn-share-recipe">SHARE NOW</button>
              </a>
            </div>
          </div>
        </div>

        {/* Recipes List */}
        <div className="main-recipes-list">
          <div className="main-recipes-container">
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <div className="main-recipe-preview" key={index}>
                  <div className="mian-recipe-card">
                    <img
                      src={recipe.image}
                      alt=""
                      className="main-recipe-image"
                    />
                    <div>
                      <div className="flex-center">
                        <div className="flex justify-center">
                          <p className="mian-recipe-name">
                            {recipe.recipeName}
                          </p>
                        </div>
                      </div>
                      <div className="mian-recipe-details">
                        <p>Duration: {recipe.duration} mins</p>
                        <p>Servings: {recipe.servings} people</p>
                      </div>
                      <Link to={`/recipes/details/${recipe.id}`}>
                        <button className="btn-checkout-recipe">
                          CHECK OUT RECIPE
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-recipes">No recipes saved yet.</p>
            )}

            {/* {recipes.length > 3 && (
              <div className="btn-show-more">
                <button className="btn-show-more-recipe">SHOW MORE</button>
              </div>
            )} */}
          </div>

          {/* show more button */}
          <div className="main-btn-show-more-recipe-container">
            <button className="main-btn-show-more-recipe">Show More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
