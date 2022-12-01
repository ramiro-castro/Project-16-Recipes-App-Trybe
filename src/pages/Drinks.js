import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Recipes from '../components/Recipes';

function Drinks({ history }) {
  const recipes = useSelector((state) => state.recipesReducer.recipes);
  // console.log(recipes);

  useEffect(() => {

  }, [recipes]);

  return (
    <div>
      <Header profile search>Drinks</Header>
      <RecipeCard recipes={ recipes } />
      <Recipes history={ history } />
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Drinks;
