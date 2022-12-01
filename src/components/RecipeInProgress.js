import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

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
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
        .then((res) => res.json())
        .then((data) => setRecipe(data.drinks[0]));
      setCategory('Drink');
    }
  }, []);

  const getVideoId = () => recipe.strYoutube.split('v=')[1];
  const getIngredients = () => (Object.entries(recipe)
    .filter((key) => key[0].includes('strIngredient'))
    .map((ingredient) => ingredient[1]));

  const getMeasures = () => Object.entries(recipe)
    .filter((key) => key[0].includes('strMeasure')).map((ingredient) => ingredient[1]);

  let ingred = [];
  let indexNull = 0;

  if (recipe !== undefined) {
    ingred = getIngredients();
    console.log(ingred);
    console.log(ingred.indexOf(''));
    indexNull = ingred.indexOf('');
  }

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
      >
        <img src={ shareIcon } alt="shareIcon.svg" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        <img src={ whiteHeartIcon } alt="whiteHeartIcon.svg" />
      </button>
      {recipe && (
        <div>
          {category !== 'Drink'
            ? <p data-testid="recipe-category">{recipe.strCategory}</p>
            : <p data-testid="recipe-category">{recipe.strAlcoholic}</p>}
          <h3 data-testid="recipe-title">{recipe[`str${category}`]}</h3>
          <img
            width="150px"
            data-testid="recipe-photo"
            src={ recipe[`str${category}Thumb`] }
            alt=""
          />
          {ingred.slice(0, indexNull).map((ingredient, index) => (
            <div key={ index }>
              <label htmlFor="recepi" data-testid={ `${index}-ingredient-step` }>
                <input type="checkbox" />
                {`${ingredient} ${getMeasures()[index]}`}
              </label>
            </div>
          ))}
          <p data-testid="instructions">{recipe.strInstructions}</p>
          { category !== 'Drink' && <iframe
            data-testid="video"
            src={ `https://www.youtube.com/embed/${getVideoId()}` }
            title="recipe video"
          />}
          <button
            data-testid="finish-recipe-btn"
            type="button"
          >
            Finalizar
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeInProgress;
