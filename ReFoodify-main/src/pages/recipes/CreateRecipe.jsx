import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IconSearch, IconX, IconCircleArrowLeft } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import recipeBg from "@/assets/recipe-detail-bg.png";
import { createRecipe } from "@/redux/recipe/actions";
import { toast } from "react-toastify";
import "./createRecipe.style.css";

const availableIngredients = [
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

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const [filteredIngredients, setFilteredIngredients] =
    useState(availableIngredients); // Filtered ingredients list
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    serving: "",
    image: "",
    ingredients: [],
    instructions: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddIngredient = (ingredient) => {
    if (!formData.ingredients.find((ing) => ing.name === ingredient)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ingredients: [
          ...prevFormData.ingredients,
          { name: ingredient, quantity: "" }, // Add ingredient with an empty amount
        ],
      }));
      console.log(`Added ingredient: ${ingredient}`);
    }
  };

  const handleRemoveIngredient = (ingredientName) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: prevFormData.ingredients.filter(
        (ing) => ing.name !== ingredientName
      ),
    }));
  };

  // Handle changing the amount of an ingredient
  // const handleAmountChange = (e, ingredientName) => {
  //   const { value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     ingredients: prevFormData.ingredients.map((ing) =>
  //       ing.name === ingredientName ? { ...ing, amount: value } : ing
  //     ),
  //   }));
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prevData) => ({ ...prevData, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: "",
    }));
  };

  const handleQuantityChange = (e, ingredientName) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: prevFormData.ingredients.map((ing) =>
        ing.name === ingredientName ? { ...ing, quantity: value } : ing
      ),
    }));
  };

  // Save or update the recipe
  const handleSubmit = async () => {
    // Log the form data to debug
    console.log("Form Data:", formData);
    // Ensure required fields are present
    if (
      !formData.name ||
      !formData.serving ||
      formData.ingredients.some((ing) => !ing.quantity)
    ) {
      console.error("Missing required fields");
      toast.error("Please fill in all required fields.");
      return;
    }

    const newRecipe = {
      ...formData,
      id: uuidv4(),
      createdAt: new Date().toLocaleString(),
    };

    try {
      await dispatch(createRecipe(newRecipe)).unwrap(); // Dispatch the createRecipe thunk
      console.log("Recipe saved to database", newRecipe);
      toast.success("Recipe saved successfully!");

      // Reset form and image preview
      setFormData({
        name: "",
        duration: "",
        serving: "",
        image: "",
        ingredients: [],
        instructions: "",
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Failed to save recipe:", error);
      toast.error("Failed to save recipe. Please try again.");
    }
  };

  // Delete a recipe
  // const handleDeleteRecipe = (index) => {
  //   dispatch(deleteRecipe(index));
  // };

  // Handle ingredient search input change
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredIngredients(
      availableIngredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(term)
      )
    );
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    console.log(`Deleted recipe at index: ${index}`);
  };

  return (
    <div className="create-recipe-container">
      <div className="header-section">
        <div className="header-content">
          <Link to="/recipes" className="btn-link">
            <button className="btn-back">
              <IconCircleArrowLeft className="icon-back" />
              <span>Go back</span>
            </button>
          </Link>
          <div className="btn-share-section">
            <button className="btn-share">
              <span className="share-text">Share your recipe</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className="background-section"
        style={{
          backgroundImage: `url(${recipeBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content-container">
          <div className="create-form-container">
            <div className="create-form-group">
              <label className="form-label">Recipe name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="create-form-group">
              <label className="form-label">Duration (minutes):</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="create-form-group">
              <label className="form-label">Servings (person):</label>
              <input
                type="text"
                name="serving"
                value={formData.serving}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            {/* Add Picture Section */}
            <div className="create-form-group">
              <label className="form-label">Add Picture:</label>
              <div className="create-file-upload-section">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="create-input-field"
                />
                <button className="btn-delete" onClick={handleDeleteImage}>
                  Delete
                </button>
              </div>
            </div>
            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-image"
                />
              </div>
            )}

            {/* Ingredients */}
            <div className="ingredients-section">
              <div className="search-ingredients">
                <div className="create-search-box">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search for ingredients..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <IconSearch />
                </div>
                <div className="ingredients-list">
                  {filteredIngredients.map((ingredient) => (
                    <div
                      key={ingredient}
                      className="create-ingredient"
                      onClick={() => handleAddIngredient(ingredient)}
                    >
                      {ingredient}
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Ingredients */}
              <div className="selected-ingredients">
                <div className="selected-header">
                  <div className="create-selected-content">
                    <p>Selected ingredients</p>
                  </div>
                </div>
                <div className="ingredients-list">
                  {formData.ingredients.length === 0 && (
                    <p>No ingredients selected.</p>
                  )}
                  {formData.ingredients.map((ingredient) => (
                    <div
                      key={ingredient.name}
                      className="create-ingredient selected"
                    >
                      <span>{ingredient.name}</span>
                      <IconX
                        className="icon-remove"
                        onClick={() => handleRemoveIngredient(ingredient.name)}
                      />
                      <input
                        type="text"
                        placeholder="Amount"
                        className="input-ingredient-amount"
                        value={ingredient.quantity || ""}
                        onChange={(e) =>
                          handleQuantityChange(e, ingredient.name)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h1 className="instructions-title">Instructions</h1>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className="input-instructions"
              />
            </div>

            {/* Submit Button */}
            <div className="create-recipe-container">
              {/* Other sections here */}
              <button className="btn-generate-recipe" onClick={handleSubmit}>
                GENERATE A RECIPE
              </button>
            </div>

            {/* Saved Recipes */}
            <div className="saved-recipes">
              <h2 className="saved-recipes-title">Saved Recipes:</h2>
              {recipes.length === 0 && <p>No recipes saved yet.</p>}
              <ul className="saved-recipes-list">
                {recipes.map((recipe, index) => (
                  <li key={index} className="recipe-item">
                    <div className="recipe-card">
                      <h3 className="recipe-name">{recipe.name}</h3>
                      <p>Recipe ID: {recipe.id}</p>
                      <p>Created At: {recipe.createdAt}</p>
                      <p>Duration: {recipe.duration} minutes</p>
                      <p>Servings: {recipe.serving}</p>
                      <p>Instructions: {recipe.instructions}</p>
                      {recipe.image && (
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="recipe-image"
                        />
                      )}
                      <div className="btn-delete-container">
                        <button
                          className="btn-delete-recipe"
                          onClick={() => handleDeleteRecipe(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
