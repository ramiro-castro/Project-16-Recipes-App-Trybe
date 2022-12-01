import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Footer from './Footer';

function RecipeInProgress() {
  const history = useHistory();
  const match = useRouteMatch();
  const [recipe, setRecipe] = useState();
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (history.location.pathname.includes('meals')) {
      fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52882')
        .then((res) => res.json())
        .then((data) => {
          setRecipe(data.meals[0]);
          setCategory('Meal');
        });
    } else {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17256')
        .then((res) => res.json())
        .then((data) => setRecipe(data.drinks[0]));
      setCategory('Drink');
    }
  }, []);

  console.log(recipe);

  return (
    <div>
      <img data-testid="recipe-photo" src="x" alt="x" />
      <h2 data-testid="recipe-title">Título</h2>
      <button
        data-testid="share-btn"
        type="button"
      >
        Compartilhar
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favoritos
      </button>
      <h3 data-testid="recipe-category">Texto da categoria</h3>
      <p data-testid="instructions">instruçoes</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar
      </button>
      <Footer />
    </div>
  );
}

export default RecipeInProgress;
