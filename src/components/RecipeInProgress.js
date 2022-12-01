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
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
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

  const getVideoId = () => recipe.strYoutube.split('v=')[1];
  const getIngredients = () => Object.entries(recipe)
    .filter((key) => key[0].includes('strIngredient')).map((ingredient) => ingredient[1]);
  const getMeasures = () => Object.entries(recipe)
    .filter((key) => key[0].includes('strMeasure')).map((ingredient) => ingredient[1]);

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
      {recipe && (
        <div>
          {category !== 'Drink'
            ? <p data-testid="recipe-category">{recipe.strCategory}</p>
            : <p data-testid="recipe-category">{recipe.strAlcoholic}</p>}
          <p data-testid="recipe-title">{recipe[`str${category}`]}</p>
          <img
            width="150px"
            data-testid="recipe-photo"
            src={ recipe[`str${category}Thumb`] }
            alt=""
          />
          { category !== 'Drink' && <iframe
            data-testid="video"
            src={ `https://www.youtube.com/embed/${getVideoId()}` }
            title="recipe video"
          />}
          {getIngredients().map((ingredient, index) => (
            <div key={ index }>
              <label htmlFor="recepi" data-testid={ `${index}-ingredient-step` }>
                <input type="checkbox" />
                {`${ingredient} ${getMeasures()[index]}`}
              </label>
            </div>
          ))}
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default RecipeInProgress;
