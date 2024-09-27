import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IconSearch, IconX, IconCircleArrowLeft } from "@tabler/icons-react";
import { message } from "antd"; // Import message from antd
import recipeBg from "@/assets/recipe-detail-bg.png";
import { updateRecipe } from "@/redux/slices/recipeSlice";
import { useDispatch, useSelector } from "react-redux";
import "./updateRecipe.style.css";

// Available Ingredients (Mock data)
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

const UpdateRecipe = () => {
  const { id } = useParams(); // Extract the recipe ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipes = useSelector((state) => state.recipes.recipes);
  const [formData, setFormData] = useState({
    recipeName: "",
    duration: "",
    servings: "",
    image: "",
    ingredients: [], // Assumed to be an array of objects with name and amount
    instructions: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [filteredIngredients, setFilteredIngredients] =
    useState(availableIngredients); // Filtered ingredients list
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (id && recipes.length > 0) {
      const selectedRecipe = recipes.find((recipe) => recipe._id === id);
      if (selectedRecipe) {
        setFormData({
          recipeName: selectedRecipe.name,
          ingredients: selectedRecipe.ingredients || [],
          instructions: selectedRecipe.instructions,
          duration: selectedRecipe.duration,
          servings: selectedRecipe.serving,
          image: selectedRecipe.img,
        });
        setImagePreview(selectedRecipe.img);
                console.log("Image preview set to:", selectedRecipe.img); 
      }
    }
  }, [id, recipes]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddIngredient = (ingredient) => {
    if (!formData.ingredients.some((ing) => ing.name === ingredient)) {
      setFormData((prevData) => ({
        ...prevData,
        ingredients: [
          ...prevData.ingredients,
          { name: ingredient, amount: "" },
        ], // Add new ingredient with default amount
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

   const handleIngredientAmountChange = (name, amount) => {
     setFormData((prevData) => ({
       ...prevData,
       ingredients: prevData.ingredients.map((ing) =>
         ing.name === name ? { ...ing, amount } : ing
       ),
     }));
   };

     const handleSearchChange = (e) => {
       const term = e.target.value.toLowerCase();
       setSearchTerm(term);
       const filtered = availableIngredients.filter((ingredient) =>
         ingredient.toLowerCase().includes(term)
       );
       setFilteredIngredients(filtered);
     };

       const handleFileChange = (e) => {
         const file = e.target.files[0];
         if (file) {
           const reader = new FileReader();
           reader.onloadend = () => {
             setImagePreview(reader.result); // Show preview of image
             setFormData((prevData) => ({
               ...prevData,
               image: reader.result, // Store image as base64
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

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateRecipe({ id, ...formData }));
    message.success("Recipe updated successfully!"); // Show success toast
    navigate("/my-account/my-recipes");
  };


  return (
    <div>
      <div className="header-section">
        <div className="header-content">
          <Link to="/recipes" className="btn-link">
            <button className="btn-back">
              <IconCircleArrowLeft className="icon-back" />
              <span>Go back</span>
            </button>
          </Link>
          <div className="btn-update-section">
            <button className="btn-update">
              <span className="update-text">Update your recipe</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className="background-image-section"
        style={{
          backgroundImage: `url(${recipeBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content-container">
          <div className="form-container">
            {/* form */}
            <div className="update-form-group">
              <label className="form-label">Recipe name:</label>
              <input
                type="text"
                name="recipeName"
                value={formData.recipeName}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="update-form-group">
              <label className="form-label">Duration (minutes):</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="update-form-group">
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
            <div className="update-form-group">
              <label className="form-label">Add Picture:</label>
              <div className="file-upload-section">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="input-field"
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
                <div className="search-box">
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
                  {filteredIngredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="ingredient"
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
                  <div className="selected-content">
                    <p>Selected ingredients</p>
                  </div>
                </div>

                <div className="ingredients-list">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient selected">
                      <span>{ingredient.name}</span> {/* Render the name */}
                      <input
                        type="text"
                        value={ingredient.amount}
                        onChange={(e) =>
                          handleIngredientAmountChange(
                            ingredient.name,
                            e.target.value
                          )
                        }
                        placeholder="write amount here"
                        className="input-ingredient-amount"
                      />
                      <IconX
                        className="icon-remove"
                        onClick={() => handleRemoveIngredient(ingredient.name)}
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
            <div className="btn-update-container">
              <button className="btn-submit" onClick={handleUpdate}>
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipe;
