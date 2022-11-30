import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Recipe.css';

function Recipes() {
  const location = useLocation();
  const [path] = useState(location.pathname);
  const [mealData, setMealData] = useState([]);
  const [drinksData, setDriksData] = useState([]);

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

  if (path === '/drinks') {
    return (
      <main className="mainRecipes">
        <h1>receitas de drinks</h1>
        <section>
          {drinksData.map((drinks, index) => index < 12 && (
            <div key={ index } className="card" data-testid={ `${index}-recipe-card` }>
              <img
                className="recipeImg"
                src={ drinks.strDrinkThumb }
                alt={ drinks.strDrink }
              />
              <h3 className="recipeName">{drinks.strDrink}</h3>
            </div>
          ))}
        </section>
      </main>
    );
  }
  return (
    <main>
      <h1>receitas de meals</h1>
      <section>
        {mealData.map((meal, index) => index < 12 && (
          <div key={ index } className="card" data-testid={ `${index}-recipe-card` }>
            <img
              className="recipeImg"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
            <h3 className="recipeName">{meal.strMeal}</h3>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Recipes;
