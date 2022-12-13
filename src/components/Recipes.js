import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Recipe.css';
import OrdinaryDrink from '../images/OrdinaryDrink.svg';
import OtherUnknown from '../images/OtherUnknown.svg';
import Shake from '../images/Shake.svg';
import Cocktail from '../images/Cocktail.svg';
import Cocoa from '../images/Cocoa.svg';
import all from '../images/all.svg';
import beef from '../images/beef.svg';
import allMeal from '../images/allMeal.svg';
import breakfest from '../images/breakfest.svg';
import chicken from '../images/chicken.svg';
import dessert from '../images/dessert.svg';
import goat from '../images/goat.svg';
import mealIcon from '../images/mealIcon.svg';
import Loading from './Loading';
import drinkIconMain from '../images/drinkIconMain.svg';

const mealIcons = [beef, breakfest, chicken, dessert, goat];
const drinkIcons = [OrdinaryDrink, Cocktail, Shake, OtherUnknown, Cocoa];

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
  const [isLoading, setIsLoading] = useState(true);
  const loadingTime = 1500;

  useEffect(() => {
    const fetchMeal = async () => {
      setIsLoading(true);
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const request = await fetch(url);
      const response = await request.json();
      setMealData(response.meals);
      setResetMeal(response.meals);
      setTimeout(() => setIsLoading(false), loadingTime);
    };

    const fetchDrinks = async () => {
      setIsLoading(true);
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const request = await fetch(url);
      const response = await request.json();
      setDriksData(response.drinks);
      setResetDrink(response.drinks);
      setTimeout(() => setIsLoading(false), loadingTime);
    };
    fetchDrinks();
    fetchMeal();
  }, []);

  useEffect(() => {
    const mealCategory = async () => {
      setIsLoading(true);
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const request = await fetch(url);
      const response = await request.json();
      setMealCategories(response.meals);
      setTimeout(() => setIsLoading(false), loadingTime);
    };
    const drinkCategory = async () => {
      setIsLoading(true);
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const request = await fetch(url);
      const response = await request.json();
      setDrinkCategories(response.drinks);
      setTimeout(() => setIsLoading(false), loadingTime);
    };
    drinkCategory();
    mealCategory();
  }, []);

  const handleMealClick = async (e) => {
    if (clicked === false) {
      setIsLoading(true);
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e}`;
      const request = await fetch(url);
      const response = await request.json();
      setMealData(response.meals);
      setClicked(true);
      setTimeout(() => setIsLoading(false), loadingTime);
    } else {
      setMealData(resetMeal);
      setClicked(false);
    }
  };

  const handleDrinkClick = async (e) => {
    if (clicked === false) {
      setIsLoading(true);
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e}`;
      const request = await fetch(url);
      const response = await request.json();
      setDriksData(response.drinks);
      setClicked(true);
      setTimeout(() => setIsLoading(false), loadingTime);
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

  if (isLoading) {
    return (
      <div className="recipes">
        <Loading />
      </div>
    );
  }

  if (path === '/drinks') {
    return (

      <main className="recipes">
        <div className="title">
          <img src={ drinkIconMain } alt="mealIcon" />
          <h1>Drinks</h1>
        </div>
        <nav className="category-container">
          <button
            className="category-icons"
            type="button"
            onClick={ allDrinks }
            data-testid="All-category-filter"
          >
            <img src={ all } alt="category icon" />
            <p className="category-text">all</p>
          </button>
          {drinkCategories.map((drink, index) => index < five && (
            <button
              className="category-icons"
              data-testid={ `${drink.strCategory}-category-filter` }
              type="button"
              onClick={ () => handleDrinkClick(drink.strCategory) }
              value={ drink.strCategory }
              key={ index }
            >
              <img src={ drinkIcons[index] } alt="category icon" />
              <p className="category-text">{drink.strCategory}</p>

            </button>))}
        </nav>
        <section className="section-recipes">
          {drinksData.map((drinks, index) => index < twelve && (
            <button
              className="card-recipes"
              type="button"
              key={ index }
              data-testid={ `${index}-recipe-card` }
              onClick={ () => handleRecipeClick(drinks.idDrink) }
            >
              <img
                className="recipeImg"
                src={ drinks.strDrinkThumb }
                alt={ drinks.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h3
                className="recipe-name"
                data-testid={ `${index}-card-name` }
              >
                {drinks.strDrink}

              </h3>
            </button>
          ))}
        </section>
      </main>
    );
  }
  return (
    <main className="recipes">
      <div className="title">
        <img src={ mealIcon } alt="mealIcon" />
        <h1>Meals</h1>
      </div>
      <nav className="category-container">
        <button
          className="category-icons"
          type="button"
          onClick={ allMeals }
          data-testid="All-category-filter"
        >
          <img src={ allMeal } alt="category icon" />
          <p className="category-text">all</p>
        </button>
        {mealCategories.map((meal, index) => index < five && (
          <button
            className="category-icons"
            data-testid={ `${meal.strCategory}-category-filter` }
            value={ meal.strCategory }
            onClick={ () => handleMealClick(meal.strCategory) }
            type="button"
            key={ index }
          >
            <img src={ mealIcons[index] } alt="category icon" />
            <p className="category-text">{meal.strCategory}</p>
          </button>))}
      </nav>
      <section className="section-recipes">
        {mealData.map((meal, index) => index < twelve && (
          <button
            data-testid={ `${index}-recipe-card` }
            className="card-recipes"
            type="button"
            key={ index }
            onClick={ () => handleRecipeClick(meal.idMeal) }
          >
            <img
              className="recipeImg"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <h3
              className="recipe-name"
              data-testid={ `${index}-card-name` }
            >
              {meal.strMeal}

            </h3>
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
