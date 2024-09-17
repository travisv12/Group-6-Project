import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconSearch, IconX, IconCircleArrowLeft } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import recipeBg from "@/assets/recipe-detail-bg.png";
import "./createRecipe.style.css";


const availableIngredients = [
  "Fish", "Carrot", "Beetroot", "Potato", "Garlic", "Eggs", "Butter",
  "Flour", "Chicken", "Tomato", "Paprika", "Parmesan Cheese", "Basil",
  "Lemon", "Beef", "Vinegar", "Fish Sauce", "Pea"
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
  const [filteredIngredients, setFilteredIngredients] = useState(availableIngredients);

  
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(savedRecipes);
  }, []);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handleAddIngredient = (ingredient) => {
    if (!formData.ingredients.find((ing) => ing.name === ingredient)) {
      setFormData((prevData) => ({
        ...prevData,
        ingredients: [...prevData.ingredients, { name: ingredient, amount: "" }],
      }));
      console.log(`Added ingredient: ${ingredient}`);
    }
  };

  // Remove ingredient from the list
  const handleRemoveIngredient = (ingredientName) => {
    setFormData((prevData) => {
      const updatedIngredients = prevData.ingredients.filter((ing) => ing.name !== ingredientName);
      console.log(`Removed ingredient: ${ingredientName}`); // Log the removed ingredient
      return { ...prevData, ingredients: updatedIngredients };
    });
  };

  
  const handleAmountChange = (e, ingredientName) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      ingredients: prevData.ingredients.map((ing) =>
        ing.name === ingredientName ? { ...ing, amount: value } : ing
      ),
    }));
    console.log(`Updated amount for ingredient "${ingredientName}": ${value}`);
  };

 
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
    setFormData((prevData) => ({ ...prevData, image: "" }));
  };

  
  const handleSubmit = () => {
    if (!formData.recipeName || !formData.duration || !formData.servings || !formData.instructions) {
      alert("Please fill out all required fields.");
      return;
    }

    const newRecipe = {
      ...formData,
      id: uuidv4(),
      createdAt: new Date().toLocaleString(),
    };

    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

   
    console.log("New recipe created:", newRecipe);

    // Reset form
    setFormData({
      recipeName: "",
      duration: "",
      servings: "",
      image: "",
      ingredients: [], 
      instructions: "",
    });
    setImagePreview(null);
  };

  
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredIngredients(availableIngredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(term)
    ));
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
            {/* Form fields */}
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
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" className="preview-image" />
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
              {/* Selected ingredients */}
              <div className="selected-ingredients">
                <div className="selected-header">
                  <div className="create-selected-content">
                    <p>Selected ingredients</p>
                  </div>
                </div>
                <div className="ingredients-list">
                  {formData.ingredients.length === 0 && <p>No ingredients selected.</p>}
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
                placeholder="Enter instructions here..."
                className="input-instructions"
              />
            </div>
            {/* POST button */}
            <div className="btn-submit-container">
              <button className="btn-submit" onClick={handleSubmit}>
                POST
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
                      <h3 className="recipe-name">{recipe.recipeName}</h3>
                      <p>Recipe ID: {recipe.id}</p>
                      <p>Created At: {recipe.createdAt}</p>
                      <p>Duration: {recipe.duration} minutes</p>
                      <p>Servings: {recipe.servings}</p>
                      <p>Instructions: {recipe.instructions}</p>
                      {recipe.image && (
                        <img
                          src={recipe.image}
                          alt={recipe.recipeName}
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
