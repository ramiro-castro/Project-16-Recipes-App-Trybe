import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import shareIconGreen from '../images/shareIconGreen.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './RecipeInProgress.css';
import Loading from './Loading';

function RecipeInProgress() {
  const history = useHistory();
  const match = useRouteMatch();
  const [recipe, setRecipe] = useState([]);
  const [category, setCategory] = useState('');
  const [checked, setChecked] = useState([]);
  const [filterIngredients, setFilterIngredients] = useState([]);
  const [filteredMeasures, setfilteredMeasures] = useState([]);
  const [btnDisable, setBtnDisable] = useState(true);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingTime = 1500;

  const getFavorites = () => {
    const data = localStorage.getItem('favoriteRecipes') || [];
    if (data.length) {
      setFavorites(JSON.parse(data));
    }
  };

  const getDoneRecipes = () => { // verifica se tem informacoes no localStorage, caso tenha, elas serao salvas no array doneRecipes (linha 20)
    const data = localStorage.getItem('doneRecipes') || [];
    if (data.length) {
      setDoneRecipes(JSON.parse(data));
    }
  };

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
    getFavorites();
    getDoneRecipes();
    setTimeout(() => setIsLoading(false), loadingTime);
  }, []);

  const getVideoId = () => {
    if (recipe.length !== 0) {
      return recipe.strYoutube.split('v=')[1];
    }
  };

  const getIngredients = () => (Object.entries(recipe)
    .filter((key) => key[0].includes('strIngredient'))
    .map((ingredient) => ingredient[1]));

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
    if (recipe.length !== 0) {
      console.log(recipe);
      const allMeasures = getMeasures();
      const indexNullMeasures = allMeasures.indexOf(null);
      setfilteredMeasures(allMeasures.slice(0, indexNullMeasures));

      const auxSetfilIngredient = sliceIngredients();
      setFilterIngredients(auxSetfilIngredient);

      const getItem = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
      let createArr = [];
      if (getItem.length !== 0) {
        createArr = getItem;
      } else {
        createArr = auxSetfilIngredient.map(() => false);
      }
      setChecked(createArr);
    }
  };

  useEffect(() => {
    removeNull();
  }, [recipe]);

  // https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/
  const handleFilters = (position) => {
    const updatedCheckedState = checked
      .map((item, index) => (index === position ? !item : item));
    setChecked(updatedCheckedState);
    const verifyBtn = updatedCheckedState.every((el) => el === true);
    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedCheckedState));
    const teste = verifyBtn === false;
    setBtnDisable(teste);
  };

  // https://stackoverflow.com/questions/71873824/copy-text-to-clipboard-cannot-read-properties-of-undefined-reading-writetext
  const copyToClipboard = async (input) => {
    try {
      await navigator.clipboard.writeText(input);
    } catch (e) {
      console.log(e);
    }
  };

  const handleShare = () => {
    if (history.location.pathname.includes('meals')) {
      copyToClipboard(`http://localhost:3000/meals/${match.params.id}`);
      setCopied(true);
    } else {
      copyToClipboard(`http://localhost:3000/drinks/${match.params.id}`);
      setCopied(true);
    }
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

  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    return today.toLocaleDateString('pt-BR', options);
  };

  const handleClick = () => {
    const recipeToSave = {
      id: recipe[[`id${category}`]],
      type: `${category.toLowerCase()}`,
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${category}`],
      image: recipe[`str${category}Thumb`],
      tags: recipe.strTags !== null ? recipe.strTags.split(',') : [],
      doneDate: formatDate(),
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify([]));
    console.log(recipeToSave);
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, recipeToSave]));
    history.push('/done-recipes');
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="in-progress">
      <div className="details-header">
        <img
          className="thumb"
          data-testid="recipe-photo"
          src={ recipe[`str${category}Thumb`] }
          alt=""
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
            </div>
            {copied && <p>Link copied!</p>}
          </div>
          <h3 className="recipe-titles" data-testid="recipe-title">{recipe[`str${category}`]}</h3>
        </div>
      </div>
      {recipe && (
        <div className="content">
          <div className="text-card">
            {filterIngredients.map((ingredient, index) => (
              <div className="checkbox" key={ index }>
                <input
                  type="checkbox"
                  id={ `${index}-ingredient-step` }
                  name={ ingredient }
                  value={ ingredient }
                  checked={ checked[index] }
                  onChange={ () => handleFilters(index) }
                />
                <label
                  htmlFor={ `${index}-ingredient-step` }
                  className={ checked[index] ? 'decoration' : '' }
                  data-testid={ `${index}-ingredient-step` }
                >
                  {`${ingredient} ${filteredMeasures[index] !== undefined
                    ? filteredMeasures[index]
                    : ''}`}
                </label>
              </div>
            ))}
          </div>
          <div className="text-card">
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </div>

          { category !== 'Drink' && <iframe
            data-testid="video"
            src={ `https://www.youtube.com/embed/${getVideoId()}` }
            title="recipe video"
          />}
          <button
            className="button"
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ btnDisable }
            onClick={ handleClick }
          >
            Finalizar
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeInProgress;
