const Recipe = require("../Models/recipe");

const createRecipe = async (recipeData) => {
  const recipe = new Recipe(recipeData);
  await recipe.save();
  return recipe;
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

const getRecipeById = async (id, userId) => {
  const recipe = await Recipe.findOne({ _id: id, userId });
  if (!recipe) {
    throw new Error("Recipe not found or not authorized");
  }
  return recipe;
};

const getUserRecipes = async (userId) => {
  const recipes = await Recipe.find({ userId });
  return recipes;
};

const filterRecipes = async (ingredients) => {
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

  return recipes;
};

module.exports = {
  createRecipe,
  updateRecipe,
  getRecipeById,
  getUserRecipes,
  filterRecipes,
};
