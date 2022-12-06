import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filtredRecipes, setFiltredRecipes] = useState([]);

  const getfavoriteRecipes = () => {
    const data = localStorage.getItem('favoriteRecipes') || [];
    if (data.length) {
      setFavoriteRecipes(JSON.parse(data));
    }
  };

  const mealsFilter = () => {
    setFiltredRecipes(favoriteRecipes.filter((recipe) => recipe.type === 'meal'));
  };

  const drinkFilter = () => {
    setFiltredRecipes(favoriteRecipes.filter((recipe) => recipe.type === 'drink'));
  };

  const allFilter = () => {
    setFiltredRecipes(favoriteRecipes);
  };

  useEffect(() => {
    getfavoriteRecipes();
    setFiltredRecipes(favoriteRecipes);
  }, []);

  const handleFavorite = (recipe) => {
    setFavoriteRecipes((prev) => prev.filter((element) => element.id !== recipe.id));
  };

  useEffect(() => {
    setFiltredRecipes(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);
  return (
    <div>
      <Header profile>Favorite Recipes</Header>
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
              </Link>
              <ShareButton
                recipe={ recipe }
                testId={ `${index}-horizontal-share-btn` }
              />
              <button
                type="button"
                onClick={ () => handleFavorite(recipe) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="favorite icon"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoriteRecipes;
