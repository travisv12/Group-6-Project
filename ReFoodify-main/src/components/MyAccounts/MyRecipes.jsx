import { useEffect, useState } from 'react';
import RecipeGenerator from './RecipeGenerator';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="my-recipes-container">
      <h1 className="my-recipes-title">My Recipes</h1>

      {/* Display the list of recipes */}
      <ul className="recipe-list">
        {recipes.map(recipe => (
          <li key={recipe.id} className="recipe-item">
            <div className="recipe-title">{recipe.title}</div>
            <button onClick={() => handleDelete(recipe.id)} className="delete-recipe-button">
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Add Recipe Generator */}
      <RecipeGenerator />
    </div>
  );
};

export default MyRecipes;
