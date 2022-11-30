import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function Drinks() {
  const recipes = useSelector((state) => state.recipesReducer.recipes);
  // console.log(recipes);

  useEffect(() => {

  }, [recipes]);

  return (
    <div>
      <Header profile search>Drinks</Header>
      <RecipeCard recipes={ recipes } />
    </div>
  );
}

export default Drinks;
