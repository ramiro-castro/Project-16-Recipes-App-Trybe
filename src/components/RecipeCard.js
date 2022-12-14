import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import mealIcon from '../images/mealIcon.svg';

function RecipeCard({ recipes }) {
  console.log(recipes);

  const isSearch = useSelector(({ recipesReducer }) => recipesReducer.isSearch);

  const history = useHistory();

  const validation = () => history.location.pathname.includes('meals');

  const num = 12;

  return (
    <div className="recipes">
      <div className="title">
        <img src={ mealIcon } alt="mealIcon" />
        <h1>Meals</h1>
      </div>
      <section className="section-recipes">
        {isSearch && <SearchBar />}
        {
          validation()
            ? (
              recipes.slice(0, num).map((rep, index) => (
                <div
                  className="card-recipes"
                  key={ parseInt(rep.idMeal, 10) }
                  data-testid={ `${index}-recipe-card` }
                >
                  <img
                    className="recipeImg"
                    src={ rep.strMealThumb }
                    alt={ rep.strMealThumb }
                    data-testid={ `${index}-card-img` }
                  />
                  <h3
                    className="recipe-name"
                    data-testid={ `${index}-card-name` }
                  >
                    {rep.strMeal}

                  </h3>
                </div>)))
            : (
              recipes.slice(0, num).map((rep, index) => (
                <div
                  className="card-recipes"
                  key={ rep.idDrink }
                  data-testid={ `${index}-recipe-card` }
                >
                  <img
                    src={ rep.strDrinkThumb }
                    alt={ rep.strDrinkThumb }
                    data-testid={ `${index}-card-img` }
                  />
                  <div
                    className="recipe-name"
                    data-testid={ `${index}-card-name` }
                  >
                    {rep.strDrink}

                  </div>
                </div>)))
        }
      </section>
    </div>

  );
}

RecipeCard.propTypes = {}.isRequired;

export default RecipeCard;
