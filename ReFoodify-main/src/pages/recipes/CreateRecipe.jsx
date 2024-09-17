import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconSearch, IconX, IconCircleArrowLeft } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import recipeBg from "@/assets/recipe-detail-bg.png";
import "./createRecipe.style.css";

const availableIngredients = () => [
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
  const [formData, setFormData] = useState({
    recipeName: "",
    duration: "",
    servings: "",
    image: "",
    ingredients: [],
    instructions: "",
  });

  const [recipes, setRecipes] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState(availableIngredients());

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(savedRecipes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddIngredient = (ingredient) => {
    if (!formData.ingredients.find((ing) => ing.name === ingredient)) {
      setFormData((prevData) => ({
        ...prevData,
        ingredients: [
          ...prevData.ingredients,
          { name: ingredient, amount: "" },
        ],
      }));
    }
  };

  const handleRemoveIngredient = (ingredientName) => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: prevData.ingredients.filter(
        (ing) => ing.name !== ingredientName
      ),
    }));
  };

  const handleAmountChange = (e, ingredientName) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      ingredients: prevData.ingredients.map((ing) =>
        ing.name === ingredientName ? { ...ing, amount: value } : ing
      ),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setFormData((prevData) => ({
      ...prevData,
      image: "",
    }));
  };

  const handleSubmit = () => {
    const newRecipe = {
      ...formData,
      id: uuidv4(),
      createdAt: new Date().toLocaleString(),
    };

    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    setFormData({
      recipeName: "",
      duration: "",
      servings: "",
      image: "",
      ingredients: [],
      instructions: "",
    });
    setImagePreview(null);
    console.log("Recipe saved to localStorage", updatedRecipes);
  };

  const handleDeleteRecipe = (index) => {
    const recipeToDelete = recipes[index];
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    console.log(`Recipe "${recipeToDelete.recipeName}" has been deleted.`);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = availableIngredients().filter((ingredient) =>
      ingredient.toLowerCase().includes(term)
    );
    setFilteredIngredients(filtered);
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
            {/* Form */}
            <div className="create-form-group">
              <label className="form-label">Recipe name:</label>
              <input
                type="text"
                name="recipeName"
                value={formData.recipeName}
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
                name="servings"
                value={formData.servings}
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

            {/* Show Image Preview */}
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
              {/* Search ingredients */}
              <div className="search-ingredients">
                <div className="create-search-box">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="write what you have here..."
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

              {/* Selected ingredients */}
              <div className="selected-ingredients">
                <div className="selected-header">
                  <div className="create-selected-content">
                    <p>Selected ingredients</p>
                  </div>
                </div>

                <div className="ingredients-list">
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
                      {/* Amount input */}
                      <input
                        type="text"
                        placeholder="write amount here"
                        className="input-ingredient-amount"
                        value={ingredient.amount}
                        onChange={(e) => handleAmountChange(e, ingredient.name)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h1 className="instructions-title">Instructions:</h1>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="write instructions here"
                className="input-instructions"
              />
            </div>

            {/* POST button */}
            <div className="btn-submit-container">
              <button className="btn-submit" onClick={handleSubmit}>
                Save Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
