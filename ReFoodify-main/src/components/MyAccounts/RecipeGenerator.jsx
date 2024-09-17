import { useState } from 'react';
import PropTypes from 'prop-types';
import './recipeGenerator.style.css';

const RecipeGenerator = ({ initialIngredients = [] }) => {
  // Initialize state with provided ingredients
  const [ingredients, setIngredients] = useState(
    initialIngredients.map(ingredient => ({ name: ingredient, amount: '', selected: false }))
  );

  const handleCheckboxChange = (name) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(ingredient =>
        ingredient.name === name
          ? { ...ingredient, selected: !ingredient.selected }
          : ingredient
      )
    );
  };

  const handleAmountChange = (name, value) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(ingredient =>
        ingredient.name === name
          ? { ...ingredient, amount: value }
          : ingredient
      )
    );
  };

  const handleGenerateRecipe = () => {
    const selectedIngredients = ingredients.filter(ingredient => ingredient.selected);
    console.log('Selected Ingredients:', selectedIngredients);
    // Logic to generate recipe based on selectedIngredients
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
};

export default RecipeGenerator;
