const Recipe = require("../Models/recipe");



const createRecipe = async (recipeData, userId, author) => {
  const recipe = new Recipe({
    ...recipeData,
    userId,
    author,
  });
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


const deleteRecipe = async (id, userId) => {
  const recipe = await Recipe.findOneAndDelete({ _id: id, userId });
  if (!recipe) {
    throw new Error(
      "Recipe not found or you do not have permission to delete this recipe"
    );
  }
  return "Recipe deleted successfully";
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
    const lowerCaseIngredients = ingredients.map((ingredient) =>
      ingredient.toLowerCase()
    );
  const recipes = await Recipe.aggregate([
    {
      $addFields: {
        matchingIngredientsCount: {
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
  deleteRecipe,
};
