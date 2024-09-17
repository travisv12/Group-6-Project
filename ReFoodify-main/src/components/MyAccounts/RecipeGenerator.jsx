import { useState } from 'react';
import './recipeGenerator.style.css';

const RecipeGenerator = () => {
  // Initial list of ingredients
  const [ingredients, setIngredients] = useState([
    { name: 'Beetroot', amount: '' },
    { name: 'Chicken', amount: '' },
    { name: 'Tomato', amount: '' },
    { name: 'Potato', amount: '' },
    { name: 'Paprika', amount: '' },
    { name: 'Garlic', amount: '' },
    { name: 'Eggs', amount: '' },
    { name: 'Vinegar', amount: '' }
  ]);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Handle selection of an ingredient
  const handleIngredientSelect = (ingredient) => {
    // Check if the ingredient is already selected
    const alreadySelected = selectedIngredients.some(
      (selected) => selected.name === ingredient.name
    );

    if (!alreadySelected) {
      // Add to selectedIngredients
      setSelectedIngredients([...selectedIngredients, ingredient]);
      console.log('Ingredient Selected:', ingredient); // Log the selected ingredient
    }
  };

  // Handle the amount change
  const handleAmountChange = (index, amount) => {
    const newIngredients = [...ingredients];
    newIngredients[index].amount = amount;
    setIngredients(newIngredients);
  };

  const handleGenerateRecipe = () => {
    console.log('Selected Ingredients:', selectedIngredients);
  };

  return (
    <div>
      <h3>Select Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ingredient.name}>
            <button onClick={() => handleIngredientSelect(ingredient)}>
              Add {ingredient.name}
            </button>
            <input
              type="text"
              placeholder="Amount"
              value={ingredient.amount}
              onChange={(e) => handleAmountChange(index, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleGenerateRecipe}>Generate Recipe</button>
    </div>
  );
};

export default RecipeGenerator;
