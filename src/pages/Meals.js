import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Headerr';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import Recipes from '../components/Recipes';

function Meals() {
  const recipes = useSelector((state) => state.recipesReducer.recipes);
  // console.log(recipes);

  useEffect(() => {

  }, [recipes]);

  return (
    <div>
      <Header profile search>Meals</Header>
      <RecipeCard recipes={ recipes } />
      <Recipes />
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Meals;
