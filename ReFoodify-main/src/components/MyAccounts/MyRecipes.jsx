import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import poached_eggs from "@/assets/poached_eggs.png"; // Fallback image

import "./myRecipes.style.css";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Load recipes from localStorage on component mount
  useEffect(() => {
    try {
      const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      setRecipes(storedRecipes);
    } catch (error) {
      console.error("Failed to load recipes:", error);
      setRecipes([]);
    }
  }, []);

  // Handle edit button click, navigate to update page with recipe ID in the URL
  const handleEdit = (id) => {
    navigate(`/recipes/update/${id}`);
  };


  const handleDelete = (id) => {
    
    const recipeToDelete = recipes.find((recipe) => recipe.id === id);
    
    if (recipeToDelete) {
 
      console.log(`Deleted recipe: "${recipeToDelete.recipeName}"`);
      
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
      
     
      setRecipes(updatedRecipes);
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    } else {
      console.log(`Recipe with ID: ${id} not found.`);
    }
  };

  return (
    <div className="recipes-container-unique">
      <div className="recipes-wrapper-unique p-4 md:p-10">
        <h1 className="recipes-title-unique">
          My <span className="title-highlight-unique">Recipes</span>
        </h1>

        {recipes.length === 0 ? (
          <p className="recipes-no-data-unique">No recipes found.</p>
        ) : (
          <div className="recipe-list-unique">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="recipe-card-unique recipe-card-horizontal-unique"
              >
                <img
                  src={recipe.image || poached_eggs} 
                  alt={recipe.recipeName || "Recipe image"}
                  className="recipe-image-unique recipe-image-large-unique"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = poached_eggs; 
                  }}
                />
                <div className="recipe-details-unique recipe-details-left-unique">
                  <div className="recipe-name-unique">{recipe.recipeName}</div>
                  <div className="recipe-date-unique">
                    {recipe.createdAt || "Unknown Date"}
                  </div>
                  <div className="recipe-buttons-unique">
                    <button
                      className="button-edit-unique"
                      onClick={() => handleEdit(recipe.id)}
                    >
                      Edit Recipe
                    </button>
                    <button
                      className="button-delete-unique"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      Delete Recipe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;
