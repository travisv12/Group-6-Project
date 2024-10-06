const express = require("express");
const { authenticateJWT } = require("../Middleware/auth");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../ReFoodify-main/public/foodimage/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const {
  filterRecipesController,
  createRecipeController,
  updateRecipeController,
  getUserRecipesController,
  getRecipeByIdController,
  deleteRecipeController,
} = require("../Controllers/recipeControllers");

const router = express.Router();

router.post("/upload-image", upload.single("file"), (req, res) => {
  res.json({ imageUrl: `../../public/foodimage/${req.file.filename}` });
});

// Route for adding a recipe (protected)
router.post("/add", authenticateJWT, createRecipeController);

// Route for getting all recipes by the authenticated user (protected)
router.get("/user/recipes", authenticateJWT, getUserRecipesController);

//  Route for fetching a recipe by ID (protected)
router.get("/user/recipe/:id", authenticateJWT, getRecipeByIdController);

// Route for updating a recipe (protected)
router.put("/user/recipe/update/:id", authenticateJWT, updateRecipeController);

// Route for deleting a recipe (protected)
router.delete(
  "/user/recipe/delete/:id",
  authenticateJWT,
  deleteRecipeController
);

// Route for filtering recipes based on ingredients
router.post("/recipes/search", authenticateJWT, filterRecipesController);

module.exports = router;
