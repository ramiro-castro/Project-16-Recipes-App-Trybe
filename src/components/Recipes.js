import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Recipe.css';

const five = 5;
const twelve = 12;

function Recipes({ history: { push, location: { pathname } } }) {
  const location = useLocation();
  const [path] = useState(location.pathname);
  const [resetMeal, setResetMeal] = useState([]);
  const [resetDrink, setResetDrink] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [mealData, setMealData] = useState([]);
  const [drinksData, setDriksData] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);

  useEffect(() => {
    const fetchMeal = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const request = await fetch(url);
      const response = await request.json();
      setMealData(response.meals);
      setResetMeal(response.meals);
    };

    const fetchDrinks = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const request = await fetch(url);
      const response = await request.json();
      setDriksData(response.drinks);
      setResetDrink(response.drinks);
    };
    fetchDrinks();
    fetchMeal();
  }, []);

  useEffect(() => {
    const mealCategory = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const request = await fetch(url);
      const response = await request.json();
      setMealCategories(response.meals);
    };
    const drinkCategory = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const request = await fetch(url);
      const response = await request.json();
      setDrinkCategories(response.drinks);
    };
    drinkCategory();
    mealCategory();
  }, []);

  const handleMealClick = async (e) => {
    if (clicked === false) {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.value}`;
      const request = await fetch(url);
      const response = await request.json();
      setMealData(response.meals);
      setClicked(true);
    } else {
      setMealData(resetMeal);
      setClicked(false);
    }
  };

  const handleDrinkClick = async (e) => {
    if (clicked === false) {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e.target.value}`;
      const request = await fetch(url);
      const response = await request.json();
      setDriksData(response.drinks);
      setClicked(true);
    } else {
      setDriksData(resetDrink);
      setClicked(false);
    }
  };

  const allDrinks = () => {
    setDriksData(resetDrink);
  };

  const allMeals = () => {
    setMealData(resetMeal);
  };

  const handleRecipeClick = (id) => {
    if (pathname === '/meals') {
      return push(`/meals/${id}`);
    }
    return push(`/drinks/${id}`);
  };

  if (path === '/drinks') {
    return (
      <main className="mainRecipes">
        <h1>receitas de drinks</h1>
        <nav>
          {drinkCategories.map((drink, index) => index < five && (
            <button
              data-testid={ `${drink.strCategory}-category-filter` }
              type="button"
              onClick={ handleDrinkClick }
              value={ drink.strCategory }
              key={ index }
            >
              {drink.strCategory}

            </button>))}
          <button
            type="button"
            onClick={ allDrinks }
            data-testid="All-category-filter"
          >
            all

          </button>
        </nav>
        <section className="sectionRecipes">
          {drinksData.map((drinks, index) => index < twelve && (
            <button
              type="button"
              key={ index }
              onClick={ () => handleRecipeClick(drinks.idDrink) }
            >
              <div className="card" data-testid={ `${index}-recipe-card` }>
                <img
                  className="recipeImg"
                  src={ drinks.strDrinkThumb }
                  alt={ drinks.strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <h3
                  className="recipeName"
                  data-testid={ `${index}-card-name` }
                >
                  {drinks.strDrink}

                </h3>
              </div>
            </button>
          ))}
        </section>
      </main>
    );
  }
  return (
    <main>
      <h1>receitas de meals</h1>
      <nav>
        {mealCategories.map((meal, index) => index < five && (
          <button
            data-testid={ `${meal.strCategory}-category-filter` }
            value={ meal.strCategory }
            onClick={ handleMealClick }
            type="button"
            key={ index }
          >
            {meal.strCategory}

          </button>))}
        <button
          type="button"
          onClick={ allMeals }
          data-testid="All-category-filter"
        >
          all

        </button>
      </nav>
      <section className="sectionRecipes">
        {mealData.map((meal, index) => index < twelve && (
          <button
            type="button"
            key={ index }
            onClick={ () => handleRecipeClick(meal.idMeal) }
          >
            <div className="card" data-testid={ `${index}-recipe-card` }>
              <img
                className="recipeImg"
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h3
                className="recipeName"
                data-testid={ `${index}-card-name` }
              >
                {meal.strMeal}

              </h3>
            </div>
          </button>
        ))}
      </section>
    </main>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Recipes;
