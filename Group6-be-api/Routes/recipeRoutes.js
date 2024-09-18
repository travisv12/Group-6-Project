const express = require("express");
const { authenticateJWT } = require("../Middleware/auth");

const {
  filterRecipes,
  addRecipe,
  updateRecipe,
  getUserRecipes,
  getRecipeById,
} = require("../Controllers/recipeControllers");

const router = express.Router();

// Route for adding a recipe (protected)
router.post("/add", authenticateJWT, addRecipe);

// Route for getting all recipes by the authenticated user (protected)
router.get("/user/recipes", authenticateJWT, getUserRecipes);

//  Route for fetching a recipe by ID (protected)
router.get("/user/recipe/:id", authenticateJWT, getRecipeById);

// Route for updating a recipe (protected)
router.put("/user/recipe/update/:id", authenticateJWT, updateRecipe);

// Route for filtering recipes based on ingredients
router.post("/recipes/search", authenticateJWT, filterRecipes);

module.exports = router;
