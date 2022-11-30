import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Recipe.css';

function Recipes() {
  const location = useLocation();
  const [path] = useState(location.pathname);
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
    };

    const fetchDrinks = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const request = await fetch(url);
      const response = await request.json();
      setDriksData(response.drinks);
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

  if (path === '/drinks') {
    return (
      <main className="mainRecipes">
        <h1>receitas de drinks</h1>
        <nav>
          {drinkCategories.map((drink, index) => index < 5 && (
            <button
              data-testid={ `${drink.strCategory}-category-filter` }
              type="button"
              key={ index }
            >
              {drink.strCategory}

            </button>))}
        </nav>
        <section className="sectionRecipes">
          {drinksData.map((drinks, index) => index < 12 && (
            <div key={ index } className="card" data-testid={ `${index}-recipe-card` }>
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
          ))}
        </section>
      </main>
    );
  }
  return (
    <main>
      <h1>receitas de meals</h1>
      <nav>
        {mealCategories.map((meal, index) => index < 5 && (
          <button
            data-testid={ `${meal.strCategory}-category-filter` }
            type="button"
            key={ index }
          >
            {meal.strCategory}

          </button>))}
      </nav>
      <section className="sectionRecipes">
        {mealData.map((meal, index) => index < 12 && (
          <div key={ index } className="card" data-testid={ `${index}-recipe-card` }>
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
        ))}
      </section>
    </main>
  );
}

export default Recipes;
