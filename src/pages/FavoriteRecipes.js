import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import iconHeart from '../images/iconHeart.svg';
import Loading from '../components/Loading';
import allFoods from '../images/allFoods.svg';
import drinks from '../images/drinks.svg';
import foods from '../images/foods.svg';
import favoriteProfileIcon from '../images/favoriteProfileIcon.svg';
import './FavoriteRecipes.css';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filtredRecipes, setFiltredRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingTime = 1500;

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
    setTimeout(() => setIsLoading(false), loadingTime);
  }, []);

  const handleFavorite = (recipe) => {
    setFavoriteRecipes((prev) => prev.filter((element) => element.id !== recipe.id));
  };

  useEffect(() => {
    setFiltredRecipes(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <Header profile>Favorite Recipes</Header>
      <div className="favorite-recipes">
        <div className="title-favorite">
          <img src={ favoriteProfileIcon } alt="favoriteProfileIcon" />
          <h2>FAVORITES</h2>
        </div>
        <div className="filters-buttons-favorite">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ allFilter }
          >
            <img src={ allFoods } alt="allFoods" />
          </button>
          <button
            data-testid="filter-by-meal-btn"
            onClick={ mealsFilter }
            type="button"
          >
            <img src={ foods } alt="foods" />
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ drinkFilter }
          >
            <img src={ drinks } alt="drinks" />
          </button>
        </div>
        {filtredRecipes.length && (
          <div className="favorite-recipes-container">
            {filtredRecipes.map((recipe, index) => (
              <div key={ recipe.id } className="recipe-card-favorite">
                <Link to={ `${recipe.type}s/${recipe.id}` }>
                  <div className="recipe-card-fav">
                    <img
                      width={ 150 }
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      alt="recipe"
                    />
                    <div className="details-food-fav">
                      <p className="recipe-name" data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                      {recipe.type !== 'drink' ? (
                        <p className="recipe-nationality" data-testid={ `${index}-horizontal-top-text` }>
                          {`${recipe.nationality} - ${recipe.category}`}
                        </p>
                      )
                        : (
                          <p data-testid={ `${index}-horizontal-top-text` }>
                            {`${recipe.alcoholicOrNot}`}
                          </p>
                        )}
                      <div className="btn-share-fav">
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
                            src={ iconHeart }
                            alt="favorite icon"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
