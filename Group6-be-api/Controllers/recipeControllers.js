
const Recipe = require("../Models/recipe");

const filterRecipes = async (req, res) => {
  const { ingredients } = req.body;

  try {
    const recipes = await Recipe.aggregate([
      {
        $addFields: {
          matchingIngredientsCount: {
            $size: {
              $filter: {
                input: "$ingredients",
                as: "ingredient",
                cond: { $in: ["$$ingredient.name", ingredients] },
              },
            },
          },
        },
      },
      {
        $match: {
          matchingIngredientsCount: { $gt: 0 },
        },
      },
      {
        $sort: {
          matchingIngredientsCount: -1,
        },
      },
    ]);

    res.status(200).json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


const addRecipe = async (req, res) => {
  const { name, ingredients, instructions, duration, serving } = req.body; // Include new fields
  const userId = req.user.id; // Get user ID from the authenticated user

  try {
    const recipe = new Recipe({
      name,
      ingredients,
      instructions,
      duration,
      serving,
      userId,
    }); // Include new fields
    await recipe.save();
    res.status(201).send("Recipe added successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getUserRecipes = async (req, res) => {
  const userId = req.user.id; // Get user ID from the authenticated user

  try {
    const recipes = await Recipe.find({ userId });
    res.status(200).json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Handler for fetching a recipe by ID
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const recipe = await Recipe.findOne({ _id: id, userId });
    if (!recipe) {
      return res.status(404).send("Recipe not found or not authorized");
    }
    res.status(200).json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions, duration, serving } = req.body; // Include new fields
  const userId = req.user.id; // Get user ID from the authenticated user

  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: id, userId },
      { name, ingredients, instructions, duration, serving }, // Include new fields
      { new: true }
    );
    if (!recipe) {
      return res.status(404).send("Recipe not found or not authorized");
    }
    res.status(200).send("Recipe updated successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  filterRecipes,
  addRecipe,
  getUserRecipes,
  updateRecipe,
  getRecipeById,
};

