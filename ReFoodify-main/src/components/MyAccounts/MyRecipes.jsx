import RecipeGenerator from './RecipeGenerator';

const MyRecipes = () => {
  const ingredientList = [
    'Beetroot',
    'Chicken',
    'Tomato',
    'Potato',
    'Paprika',
    'Garlic',
    'Eggs',
    'Vinegar',
  ];

  return (
    <div className="my-recipes-container">
      <h1 className="my-recipes-title">My Recipes</h1>
      <RecipeGenerator initialIngredients={ingredientList} />
    </div>
  );
};

export default MyRecipes;
