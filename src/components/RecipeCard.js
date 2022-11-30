import { useHistory } from 'react-router-dom';

function RecipeCard({ recipes }) {
  console.log(recipes);

  const history = useHistory();

  const validation = () => history.location.pathname.includes('meals');

  const num = 12;

  return (
    <div>
      { recipes.slice(0, num).map((rep, index) => (
        validation()
          ? (
            <div
              key={ rep.idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ rep.strMealThumb }
                alt={ rep.strMealThumb }
                data-testid={ `${index}-card-img` }
              />
              <div data-testid={ `${index}-card-name` }>{rep.strMeal}</div>
            </div>)
          : (
            <div
              key={ rep.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ rep.strDrinkThumb }
                alt={ rep.strDrinkThumb }
                data-testid={ `${index}-card-img` }
              />
              <div data-testid={ `${index}-card-name` }>{rep.strDrink}</div>
            </div>)
      ))}
    </div>

  );
}

RecipeCard.propTypes = {}.isRequired;

export default RecipeCard;
