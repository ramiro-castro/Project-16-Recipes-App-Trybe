import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Recipes from '../components/Recipes';

function Drinks() {
  const recipes = useSelector((state) => state.recipesReducer.recipes);
  // console.log(recipes);

  useEffect(() => {

  }, [recipes]);
  const validation = () => recipes.length !== 0;
  const history = useHistory();

  return (
    <div>
      <Header profile search>Drinks</Header>
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

export default Drinks;
