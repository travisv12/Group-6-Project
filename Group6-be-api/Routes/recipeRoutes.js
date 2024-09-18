const express = require("express");
const { authenticateJWT } = require("../Middleware/auth");

const {
  filterRecipesController,
  createRecipeController,
  updateRecipeController,
  getUserRecipesController,
  getRecipeByIdController,
} = require("../Controllers/recipeControllers");

const router = express.Router();

// Route for adding a recipe (protected)
router.post("/add", authenticateJWT, createRecipeController);

// Route for getting all recipes by the authenticated user (protected)
router.get("/user/recipes", authenticateJWT, getUserRecipesController);

//  Route for fetching a recipe by ID (protected)
router.get("/user/recipe/:id", authenticateJWT, getRecipeByIdController);

// Route for updating a recipe (protected)
router.put("/user/recipe/update/:id", authenticateJWT, updateRecipeController);

// Route for filtering recipes based on ingredients
router.post("/recipes/search", authenticateJWT, filterRecipesController);

module.exports = router;
