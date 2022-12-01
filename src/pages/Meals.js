import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import Recipes from '../components/Recipes';

function Meals({ history }) {
  const recipes = useSelector((state) => state.recipesReducer.recipes);
  // console.log(recipes);

  useEffect(() => {

  }, [recipes]);

  return (
    <div>
      <Header profile search>Meals</Header>
      <RecipeCard recipes={ recipes } />
      <Recipes history={ history } />
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Meals;
