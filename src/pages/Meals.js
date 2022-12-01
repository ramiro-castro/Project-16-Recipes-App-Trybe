import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals({ history }) {
  return (
    <div>
      <Header profile search>Meals</Header>
      <Recipes history={ history } />
      <Footer />
    </div>
  );
}

export default Meals;
