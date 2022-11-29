import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const onClickDrinks = () => {
    history.push('/drinks');
  };

  const onClickMeals = () => {
    history.push('/meals');
  };

  return (
    <footer data-testid="footer">
      <button type="button" onClick={ onClickDrinks }>
        <img src={ drinkIcon } alt="drink icon" />
      </button>
      <button type="button" onClick={ onClickMeals }>
        <img src={ mealIcon } alt="meal icon" />
      </button>
    </footer>
  );
}

export default Footer;
