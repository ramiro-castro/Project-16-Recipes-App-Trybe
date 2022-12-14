import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import Recipes from '../components/Recipes';

function Meals() {
  const recipes = useSelector((state) => state.recipesReducer.recipes);
  // console.log(recipes);

  useEffect(() => {

  }, [recipes]);

  const validation = () => recipes.length !== 0;
  // console.log(validation());
  const history = useHistory();

  return (
    <div>
      <Header profile search />
      {validation()
        ? (
          <RecipeCard recipes={ recipes } />
        )
        : (
          <Recipes history={ history } />
        )}
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Meals;
