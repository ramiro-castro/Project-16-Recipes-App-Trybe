import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Carrousel from '../components/Carrousel';

function RecipeDetails() {
  const history = useHistory();
  const match = useRouteMatch();
  const [recipe, setRecipe] = useState();
  const [category, setCategory] = useState('');
  const [recomendations, setRecomendations] = useState();

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
  }, []);

  const getVideoId = () => recipe.strYoutube.split('v=')[1];
  const getIngredients = () => Object.entries(recipe)
    .filter((key) => key[0].includes('strIngredient')).map((ingredient) => ingredient[1]);
  const getMeasures = () => Object.entries(recipe)
    .filter((key) => key[0].includes('strMeasure')).map((ingredient) => ingredient[1]);

  return (
    <div>
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
          <button
            className="start-btn"
            type="button"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
