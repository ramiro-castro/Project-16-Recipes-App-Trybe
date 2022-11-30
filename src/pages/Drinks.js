import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Recipes from '../components/Recipes';

function Drinks() {
  const recipes = useSelector((state) => state.recipesReducer.recipes);
  // console.log(recipes);

  useEffect(() => {

  }, [recipes]);

  return (
    <div>
      <Header profile search>Drinks</Header>
      <RecipeCard recipes={ recipes } />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
