import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconCircleArrowLeft } from "@tabler/icons-react";
import backgroundBg from "@/assets/recipe-detail-bg.png";
import meet_stew from "@/assets/meet_stew.png";
import { useSelector } from "react-redux";
import "./recipeDetails.style.css";

const RecipeDetails = () => {
  const { id } = useParams(); // Extract the recipe ID from the URL
   const recipes = useSelector((state) => state.recipes.recipes);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null); // State to store the fetched recipe

  // Load recipe data from localStorage when component mounts
  useEffect(() => {
    const foundRecipe = recipes.find((recipe) => recipe._id === id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      console.error("Recipe not found");
    }
  }, [id, recipes]);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  // Fallback UI when recipe data is not yet available
  // if (!recipe) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div
      className="recipe-details-container"
      style={{ backgroundImage: `url(${backgroundBg})` }}
    >
      <div className="recipe-detail-header">
        <div className="recipe-gradient-header">
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="back-button"
          >
            <IconCircleArrowLeft className="w-5 h-5" />
            <span>Go back</span>
          </button>
          <div className="flex w-full justify-center">
            <button className="recipe-info-button">
              <span className="uppercase text-sm">Recipe Info</span>
            </button>
          </div>
        </div>
      </div>

      <section className="recipe-content-container">
        {/* Recipe Title */}
        <div className="recipe-title-section">
          <div>
            <h1 className="recipe-detail-title">{recipe.name}</h1>
            <div className="recipe-meta">
              <p className="-ml-8">Duration: {recipe.duration}</p>
              <p>Serving: {recipe.servings} people</p>
            </div>
          </div>
          <div className="recipe-author">
            <span className="text-green-700 mr-1">by</span>
            {recipe.author || "Unknown Author"}
          </div>
        </div>

        {/* Image */}
        <div className="recipe-image-section">
          <img
            src={recipe.image || meet_stew} // Show recipe image or fallback to meat stew
            alt={recipe.name}
            className="recipe-detail-image"
          />
        </div>

        {/* Ingredients & Instructions */}
        <div className="recipe-details-grid">
          {/* Ingredients */}
          <div className="ingredients-detail-section">
            <h2 className="ingredients-title">Ingredients</h2>
            <ul className="ingredients-detail-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <div className="ingredient-name">{ingredient.name}</div>
                  <div className="ingredient-amount">{ingredient.amount}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="instructions-section">
            <h2 className="instructions-title">Instructions</h2>
            <div>
              {typeof recipe.instructions === "string" ? (
                <p>{recipe.instructions}</p>
              ) : (
                <ol className="instructions-list">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="instructions-item">
                      {instruction}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetails;
