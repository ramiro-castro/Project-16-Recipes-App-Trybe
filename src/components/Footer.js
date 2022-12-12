import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIconLight.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();
  const onClickDrinks = () => {
    history.push('/drinks');
  };

  const onClickMeals = () => {
    history.push('/meals');
  };

  return (
    <footer data-testid="footer" className="menu-footer">
      <button type="button" onClick={ onClickDrinks }>
        <img src={ drinkIcon } alt="drink icon" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button" onClick={ onClickMeals }>
        <img src={ mealIcon } alt="meal icon" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
