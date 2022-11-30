import PropTypes from 'prop-types';
import Header from '../components/Header';

function Drinks({ history }) {
  return (
    <div>
      <Header history={ history } profile search>Drinks</Header>
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default Drinks;
