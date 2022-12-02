import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const history = useHistory();
  const match = useRouteMatch();
  const [recipe, setRecipe] = useState([]);
  const [category, setCategory] = useState('');
  const [checked, setChecked] = useState([]);
  const [filterIngredients, setFilterIngredients] = useState([]);
  const [btnDisable, setBtnDisable] = useState(true);

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

  const removeNull = () => {
    if (recipe.length !== 0) {
      const allIngredients = getIngredients();
      console.log(allIngredients);
      const indexNull = allIngredients.indexOf('');
      const createArr = allIngredients.slice(0, indexNull).map(() => false);
      console.log(createArr);
      setChecked(createArr);
      setFilterIngredients(allIngredients.slice(0, indexNull));
    }
  };

  useEffect(() => {
    removeNull();
  }, [recipe]);

  // https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/

  const handleFilters = (position) => {
    console.log(checked);
    console.log(position);
    const updatedCheckedState = checked
      .map((item, index) => (index === position ? !item : item));
    setChecked(updatedCheckedState);
    console.log(updatedCheckedState);
    const verifyBtn = updatedCheckedState.every((el) => el === true);
    console.log(verifyBtn);
    const teste = verifyBtn === false;
    setBtnDisable(teste);
    console.log(btnDisable);
  };

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
          {filterIngredients.map((ingredient, index) => (
            <div key={ index }>
              <label
                htmlFor={ `${index}-ingredient-step` }
                className={ checked[index] ? 'decoration' : '' }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ `${index}-ingredient-step` }
                  name={ ingredient }
                  value={ ingredient }
                  checked={ checked[index] }
                  onChange={ () => handleFilters(index) }
                />
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
            disabled={ btnDisable }
          >
            Finalizar
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeInProgress;
