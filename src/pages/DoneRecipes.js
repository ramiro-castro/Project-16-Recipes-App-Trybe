import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import drinks from '../images/drinks.svg';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import Loading from '../components/Loading';
import allFoods from '../images/allFoods.svg';
import Footer from '../components/Footer';
import foods from '../images/foods.svg';
import doneIcon from '../images/doneIcon.svg';
import './DoneRecipes.css';

function DoneRecipes() {
  // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filtredRecipes, setFiltredRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingTime = 1500;

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
    setTimeout(() => setIsLoading(false), loadingTime);
  }, []);

  useEffect(() => { setFiltredRecipes(doneRecipes); }, [doneRecipes]);

  const setDate = () => options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <Header profile />
      <div className="done-recipes">
        <div className="title">
          <img src={ doneIcon } alt="doneIcon" />
          <h2>DONE RECIPES</h2>
        </div>
        <div className="filters-buttons">
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
          <div className="done-recipes-container">
            {filtredRecipes.map((recipe, index) => (
              <Link key={ recipe.id } to={ `${recipe.type}s/${recipe.id}` }>
                <div className="recipe-card">
                  <img
                    className="image-recipe"
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt="recipe"
                  />
                  <div className="details-food">
                    <p className="name-food" data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                    {recipe.type !== 'drink' ? (
                      <p className="title-food" data-testid={ `${index}-horizontal-top-text` }>
                        {`${recipe.nationality} - ${recipe.category}`}
                      </p>
                    )
                      : (
                        <p className="title-food" data-testid={ `${index}-horizontal-top-text` }>
                          {`${recipe.alcoholicOrNot}`}
                        </p>
                      )}
                    <p className="done-date" data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
                    {/* <button type="button">
                <img
                src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="share Icon"
                />
              </button> */}
                    <div className="tag-container">
                      {recipe.tags.map((tagName) => (
                        <div className="tag-food" key={ tagName }>
                          <p
                            data-testid={ `${index}-${tagName}-horizontal-tag` }
                          >
                            {tagName}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="share-btn">
                      <ShareButton
                        recipe={ recipe }
                        testId={ `${index}-horizontal-share-btn` }
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default DoneRecipes;
