import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserRecipes, deleteRecipe } from "@/redux/recipe/actions";
import poached_eggs from "@/assets/poached_eggs.png"; // Fallback image
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

import "./myRecipes.style.css";

const MyRecipes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipes = useSelector((state) => state.recipes.userRecipes);
  const loading = useSelector((state) => state.recipes.loading);
  const error = useSelector((state) => state.recipes.error);
  const userInfo = useSelector((state) => state.user.userInfo);

  // Fetch recipes from the database on component mount
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchUserRecipes());
    }
  }, []);

  // Handle edit button click, navigate to update page with recipe ID in the URL
  const handleEdit = (_id) => {
    navigate(`/recipes/update/${_id}`);
  };

  // Handle delete recipe
  const handleDelete = async (_id) => {
    try {
      await dispatch(deleteRecipe(_id)).unwrap();
      toast.success("Recipe deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete recipe.");
    }
  };

  return (
    <div className="recipes-container-unique">
      <div className="recipes-wrapper-unique p-4 md:p-10">
        <h1 className="recipes-title-unique">
          My <span className="title-highlight-unique"> Recipes</span>
        </h1>

        {loading ? (
          <Spinner loading={loading} />
        ) : error ? (
          <p className="recipes-no-data-unique">Error: {error}</p>
        ) : recipes.length === 0 ? (
          <p className="recipes-no-data-unique">No recipes found.</p>
        ) : (
          <div className="recipe-list-unique">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="recipe-card-unique recipe-card-horizontal-unique"
              >
                <img
                  src={recipe.img || poached_eggs}
                  alt={recipe.recipeName || "Recipe image"}
                  className="recipe-image-unique recipe-image-large-unique"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = poached_eggs;
                  }}
                />
                <div className="recipe-details-unique recipe-details-left-unique">
                  <div className="recipe-name-unique">{recipe.name}</div>
                  <div className="recipe-date-unique">
                    {recipe.createdAt || "Unknown Date"}
                  </div>
                  <div className="recipe-buttons-unique">
                    <button
                      className="button-edit-unique"
                      onClick={() => handleEdit(recipe._id)}
                    >
                      Edit Recipe
                    </button>
                    <button
                      className="button-delete-unique"
                      onClick={() => handleDelete(recipe._id)}
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
