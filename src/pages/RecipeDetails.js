import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Carrousel from '../components/Carrousel';
import './RecipeDetails.css';
import shareIconGreen from '../images/shareIconGreen.svg';
import Loading from '../components/Loading';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const history = useHistory();
  const match = useRouteMatch();
  const [recipe, setRecipe] = useState();
  const [category, setCategory] = useState('');
  const [recomendations, setRecomendations] = useState();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInprogressRecipes] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterIngredients, setFilterIngredients] = useState([]);
  const [filteredMeasures, setfilteredMeasures] = useState([]);
  const loadingTime = 1500;

  const getFavorites = () => {
    const data = localStorage.getItem('favoriteRecipes') || [];
    if (data.length) {
      setFavorites(JSON.parse(data));
    }
  };

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
    getFavorites();
    setTimeout(() => setIsLoading(false), loadingTime);
  }, []);

  // console.log(history);

  const isDone = () => {
    if (!doneRecipes.length) {
      return false;
    }
    return doneRecipes.some((element) => element.id === match.params.id);
  };
  const isInProgress = () => {
    if (inProgressRecipes[`${category.toLowerCase()}s`]) {
      return !!inProgressRecipes[`${category.toLowerCase()}s`][match.params.id];
    }
    return false;
  };

  const getVideoId = () => recipe.strYoutube.split('v=')[1];

  const getIngredients = () => Object.entries(recipe)
    .filter((key) => key[0].includes('strIngredient')).map((ingredient) => ingredient[1]);

  const getMeasures = () => Object.entries(recipe)
    .filter((key) => key[0].includes('strMeasure')).map((ingredient) => ingredient[1]);

  const sliceIngredients = () => {
    const menosUm = -1;
    const allIngredients = getIngredients();
    const indexNull = allIngredients.indexOf(null);
    const indexStrgVazia = allIngredients.indexOf('');
    if (indexNull !== menosUm && indexStrgVazia !== menosUm) {
      const aux = allIngredients.slice(0, indexNull);
      return aux.slice(0, indexStrgVazia);
    }
    if (indexStrgVazia !== menosUm) {
      return allIngredients.slice(0, indexStrgVazia);
    }
    return allIngredients.slice(0, indexNull);
  };

  const removeNull = () => {
    if (isLoading !== true) {
      console.log(recipe);
      const allMeasures = getMeasures();
      const indexNullMeasures = allMeasures.indexOf(null);
      setfilteredMeasures(allMeasures.slice(0, indexNullMeasures));

      const auxSetfilIngredient = sliceIngredients();
      setFilterIngredients(auxSetfilIngredient);
    }
  };

  useEffect(() => {
    removeNull();
  }, [isLoading]);

  const handleShare = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setCopied(true);
  };

  const isFavorite = () => favorites.some((element) => element.id === match.params.id);

  const handleFavorite = () => {
    const recipeToSave = {
      id: recipe[[`id${category}`]],
      type: `${category.toLowerCase()}`,
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${category}`],
      image: recipe[`str${category}Thumb`],
    };
    if (isFavorite()) {
      setFavorites((prev) => prev.filter((element) => element.id !== match.params.id));
    } else {
      setFavorites((prev) => [...prev, recipeToSave]);
    }
  };

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="details">
      {recipe && (
        <>
          <div className="details-header">
            <img
              className="thumb"
              data-testid="recipe-photo"
              src={ recipe[`str${category}Thumb`] }
              alt="recipe img"
            />
            <div className="header-content">
              <div className="row">
                {category !== 'Drink'
                  ? <p className="category" data-testid="recipe-category">{recipe.strCategory}</p>
                  : <p className="category" data-testid="recipe-category">{recipe.strAlcoholic}</p>}
                <div className="spacer" />
                <div className="buttons-container">
                  <button
                    data-testid="share-btn"
                    type="button"
                    onClick={ handleShare }
                  >
                    <img src={ shareIconGreen } alt="shareIcon.svg" />
                  </button>
                  <button
                    type="button"
                    onClick={ handleFavorite }
                  >
                    <img
                      data-testid="favorite-btn"
                      src={ isFavorite()
                        ? blackHeartIcon : whiteHeartIcon }
                      alt="favorite icon"
                    />
                  </button>
                  {copied && <p>Link copied!</p>}
                </div>
              </div>
            </div>
            <p className="recipe-titles" data-testid="recipe-title">{recipe[`str${category}`]}</p>
          </div>

          <div className="content">
            <h2 className="sub-title">Ingredients</h2>
            <div className="ingredients-card text-card">
              {filterIngredients.map((ingredient, index) => (
                <ul key={ index }>
                  <li data-testid={ `${index}-ingredient-name-and-measure` }>
                    {`${ingredient} ${filteredMeasures[index] !== undefined
                      ? filteredMeasures[index]
                      : ''}`}
                  </li>
                </ul>
              ))}
            </div>

            <h2 className="sub-title">Instructions</h2>
            <div className="text-card">
              <p data-testid="instructions">{recipe.strInstructions}</p>
            </div>

            <h2 className="sub-title">Video</h2>
            { category !== 'Drink' && <iframe
              className="video"
              data-testid="video"
              src={ `https://www.youtube.com/embed/${getVideoId()}` }
              title="recipe video"
            />}

            <h2 className="sub-title">Recommended</h2>
            {recomendations && <Carrousel
              category={ category }
              recomendations={ recomendations }
            />}

            { !isDone() && (
              <button
                className="button"
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
                className="button"
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => history
                  .push(`/${category.toLowerCase()}s/${match.params.id}/in-progress`) }
              >
                Continue Recipe
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeDetails;
