const Recipe = require("../Models/recipe");

// Create new recipes
const createRecipe = async (recipeData, userId, author) => {
  const recipe = new Recipe({
    ...recipeData,
    userId,
    author,
  });
  await recipe.save();
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  return recipes;
};

const updateRecipe = async (id, userId, updateData) => {
  if (updateData._id) {
    delete updateData._id;
  }
  const recipe = await Recipe.findOneAndUpdate(
    { _id: id, userId },
    updateData,
    { new: true }
  );
  if (!recipe) {
    throw new Error("Recipe not found or not authorized");
  }
  return "Recipe updated successfully";
};

// delete a recipe
const deleteRecipe = async (id, userId) => {
  const recipe = await Recipe.findOneAndDelete({ _id: id, userId });
  if (!recipe) {
    throw new Error(
      "Recipe not found or you do not have permission to delete this recipe"
    );
  }
  return "Recipe deleted successfully";
};

// Get a recipe by ID
const getRecipeById = async (id, userId) => {
  const recipe = await Recipe.findOne({ _id: id, userId });
  if (!recipe) {
    throw new Error("Recipe not found or not authorized");
  }
  return recipe;
};

// Get all recipes of a user
const getUserRecipes = async (userId) => {
  const recipes = await Recipe.find({ userId }).sort({ createdAt: -1 });
  return recipes;
};

// // Get all recipes of a user
const filterRecipes = async (ingredients) => {
  console.log("Input Ingredients:", ingredients);

  const lowerCaseIngredients = ingredients.map((ingredient) =>
    ingredient.toLowerCase()
  );

  console.log("Lowercase Ingredients:", lowerCaseIngredients);

  const recipes = await Recipe.aggregate([
    {
      $addFields: {
        exactMatchCount: {
          $size: {
            $filter: {
              input: "$ingredients",
              as: "ingredient",
              cond: {
                $in: [{ $toLower: "$$ingredient.name" }, lowerCaseIngredients],
              },
            },
          },
        },
        nearMatchCount: {
          $size: {
            $filter: {
              input: "$ingredients",
              as: "ingredient",
              cond: {
                $or: lowerCaseIngredients.map((ing) => ({
                  $regexMatch: {
                    input: { $toLower: "$$ingredient.name" },
                    regex: ing,
                    options: "i",
                  },
                })),
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        matchingIngredientsCount: {
          $add: ["$exactMatchCount", "$nearMatchCount"],
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
        exactMatchCount: -1, // Prioritize exact matches
      },
    },
  ]);
  return recipes;
};

module.exports = {
  createRecipe,
  updateRecipe,
  getRecipeById,
  getUserRecipes,
  filterRecipes,
  deleteRecipe,
  getAllRecipes,
};
