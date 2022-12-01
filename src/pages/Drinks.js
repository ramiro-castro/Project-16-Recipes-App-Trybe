import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks({ history }) {
  return (
    <div>
      <Header profile search>Drinks</Header>
      <Recipes history={ history } />
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Drinks;
