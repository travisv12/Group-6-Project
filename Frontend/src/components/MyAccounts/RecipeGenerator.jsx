import { useState } from 'react';
import PropTypes from 'prop-types';
import './recipeGenerator.style.css';

// Recipe search component
const RecipeGenerator = ({ initialIngredients = [], onRecipeGenerate }) => {
  const [ingredients, setIngredients] = useState(
    initialIngredients.map(ingredient => ({ name: ingredient, amount: '', selected: false }))
  );

  // Handle checkbox change event
  const handleCheckboxChange = (name) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(ingredient =>
        ingredient.name === name
          ? { ...ingredient, selected: !ingredient.selected }
          : ingredient
      )
    );
  };

  // Handle amount change event
  const handleAmountChange = (name, value) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(ingredient =>
        ingredient.name === name
          ? { ...ingredient, amount: value }
          : ingredient
      )
    );
  };

// setting ingredients for search
  const handleGenerateRecipe = () => {
    const selectedIngredients = ingredients.filter(ingredient => ingredient.selected);
    if (onRecipeGenerate) {
      onRecipeGenerate(selectedIngredients);
    }
  };

  return (
    <div className="recipe-generator">
      <h3>Select Ingredients:</h3>
      <ul>
        {ingredients.map(ingredient => (
          <li key={ingredient.name} className="ingredient-item">
            <input
              type="checkbox"
              checked={ingredient.selected}
              onChange={() => handleCheckboxChange(ingredient.name)}
            />
            <label>{ingredient.name}</label>
            {ingredient.selected && (
              <input
                type="text"
                placeholder="Amount"
                value={ingredient.amount}
                onChange={(e) => handleAmountChange(ingredient.name, e.target.value)}
              />
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleGenerateRecipe}>Generate Recipe</button>
    </div>
  );
};

RecipeGenerator.propTypes = {
  initialIngredients: PropTypes.arrayOf(PropTypes.string),
  onRecipeGenerate: PropTypes.func,
};

export default RecipeGenerator;
