import PropTypes from 'prop-types';
import Header from '../components/Header';

function Meals({ history }) {
  return (
    <div>
      <Header history={ history } profile search>Meals</Header>
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default Meals;
