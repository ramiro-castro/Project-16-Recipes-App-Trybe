import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Carrousel from '../components/Carrousel';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const history = useHistory();
  const match = useRouteMatch();
  const [recipe, setRecipe] = useState();
  const [category, setCategory] = useState('');
  const [recomendations, setRecomendations] = useState();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInprogressRecipes] = useState();
  const [copied, setCopied] = useState(false);

  const getDoneRecipes = () => {
    const data = localStorage.getItem('doneRecipes') || [];
    if (data.length) {
      setDoneRecipes(JSON.parse(data));
    }
  };

  const getInProgressReipes = () => {
    const data = localStorage.getItem('inProgressRecipes') || [];
    if (data.length) {
      setInprogressRecipes(JSON.parse(data));
    }
  };

  useEffect(() => {
    if (history.location.pathname.includes('meals')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setRecipe(data.meals[0]);
        });
      setCategory('Meal');
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((data) => {
          setRecomendations(data.drinks);
        });
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
        .then((res) => res.json())
        .then((data) => setRecipe(data.drinks[0]));
      setCategory('Drink');
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((data) => setRecomendations(data.meals));
      setCategory('Drink');
    }
    getDoneRecipes();
    getInProgressReipes();
  }, []);

  const isDone = () => {
    if (!doneRecipes.length) {
      return false;
    }
    doneRecipes.some((element) => element.id === match.params.id);
  };
  const isInProgress = () => {
    if (inProgressRecipes) {
      return !!inProgressRecipes[`${category.toLowerCase()}s`][match.params.id];
    }
    return false;
  };
  const getVideoId = () => recipe.strYoutube.split('v=')[1];
  const getIngredients = () => Object.entries(recipe)
    .filter((key) => key[0].includes('strIngredient')).map((ingredient) => ingredient[1]);
  const getMeasures = () => Object.entries(recipe)
    .filter((key) => key[0].includes('strMeasure')).map((ingredient) => ingredient[1]);
  const handleShare = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setCopied(true);
  };
  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleShare }
      >
        <img src={ shareIcon } alt="shareIcon.svg" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        <img src={ whiteHeartIcon } alt="whiteHeartIcon.svg" />
      </button>
      {copied && <p>Link copied!</p>}
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
          {recomendations && <Carrousel
            category={ category }
            recomendations={ recomendations }
          />}
          {getIngredients().map((ingredient, index) => (
            <div key={ index }>
              <p data-testid={ `${index}-ingredient-name-and-measure` }>
                {`${ingredient} ${getMeasures()[index]}`}
              </p>
            </div>
          ))}
          <p data-testid="instructions">{recipe.strInstructions}</p>
          { !isDone() && (
            <button
              className="start-btn"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history
                .push(`/${category.toLowerCase()}s/${match.params.id}/in-progress`) }
            >
              Start Recipe
            </button>
          )}
          {isInProgress() && (
            <button
              className="start-btn"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history
                .push(`/${category.toLowerCase()}s/${match.params.id}/in-progress`) }
            >
              Continue Recipe
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
