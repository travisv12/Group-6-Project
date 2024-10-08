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
  const recipes = await Recipe.find({ userId }).sort({ createdAt: -1 });
  return recipes;
};

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
  // Detailed logging for each recipe
  recipes.forEach((recipe) => {
    console.log(`Recipe: ${recipe.name}`);
    console.log(`Exact Match Count: ${recipe.exactMatchCount}`);
    console.log(`Near Match Count: ${recipe.nearMatchCount}`);
    console.log(
      `Matching Ingredients Count: ${recipe.matchingIngredientsCount}`
    );
    recipe.ingredients.forEach((ingredient) => {
      console.log(`Ingredient: ${ingredient.name}`);
    });
  });
  console.log("Filtered Recipes:", recipes);

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
