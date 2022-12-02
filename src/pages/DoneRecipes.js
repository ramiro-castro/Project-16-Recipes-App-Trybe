import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

function DoneRecipes() {
  // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filtredRecipes, setFiltredRecipes] = useState([]);

  const getDoneRecipes = () => {
    const data = localStorage.getItem('doneRecipes') || [];
    if (data.length) {
      setDoneRecipes(JSON.parse(data));
    }
  };

  const mealsFilter = () => {
    setFiltredRecipes(doneRecipes.filter((recipe) => recipe.type === 'meal'));
  };

  const drinkFilter = () => {
    setFiltredRecipes(doneRecipes.filter((recipe) => recipe.type === 'drink'));
  };

  const allFilter = () => {
    setFiltredRecipes(doneRecipes);
  };

  useEffect(() => {
    getDoneRecipes();
    setFiltredRecipes(doneRecipes);
  }, []);

  useEffect(() => { setFiltredRecipes(doneRecipes); }, [doneRecipes]);

  return (
    <div>
      <Header profile>Done Recipes</Header>
      <div className="filters-buttons">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ allFilter }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ mealsFilter }
          type="button"
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ drinkFilter }
        >
          Drinks
        </button>
      </div>
      {filtredRecipes.length && (
        <div className="done-recipes-container">
          {filtredRecipes.map((recipe, index) => (
            <div key={ recipe.id } className="recipe-card">
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <img
                  width={ 150 }
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt="recipe"
                />
                {recipe.type !== 'drink' ? (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>
                )
                  : (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {`${recipe.alcoholicOrNot}`}
                    </p>
                  )}

                <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
                {/* <button type="button">
                <img
                src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="share Icon"
                />
              </button> */}
                {recipe.tags.map((tagName) => (
                  <p
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                    key={ tagName }
                  >
                    {tagName}
                  </p>
                ))}
              </Link>
              <ShareButton
                recipe={ recipe }
                testId={ `${index}-horizontal-share-btn` }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoneRecipes;
