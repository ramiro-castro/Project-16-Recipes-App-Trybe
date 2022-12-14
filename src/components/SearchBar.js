import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { saveRecipes } from '../redux/actions/recipesActions';
import {
  firstLetterDrinkApi,
  firstLetterFoodApi,
  ingredientDrinkApi,
  ingredientFoodApi,
  nameDrinkApi,
  nameFoodApi,
} from '../services/requestApi';
import './SearchBar.css';

const foodSearch = {
  input: '',
  option: '',
};

function SearchBar() {
  const dispatch = useDispatch();
  const [searchOptions, setSearchOptions] = useState(foodSearch);

  const history = useHistory();
  const { pathname } = history.location;
  const { push } = history;

  const handleFilters = ({ target: { value, name } }) => {
    setSearchOptions({ ...searchOptions, [name]: value });
  };
  const { input, option } = searchOptions;

  const handleSearch = async (e) => {
    e.preventDefault();
    // https://horadecodar.com.br/2022/05/31/como-trocar-espacos-por-underline-em-string-com-javascript/
    const myImputUnderline = input.replace(/ /g, '_');
    let ing = [];
    switch (option) {
    case 'Ingredient':
      ing = pathname === '/meals'
        ? await ingredientFoodApi(myImputUnderline)
        : await ingredientDrinkApi(myImputUnderline);
      break;
    case 'Name':
      ing = pathname === '/meals'
        ? await nameFoodApi(myImputUnderline)
        : await nameDrinkApi(myImputUnderline);
      break;
    case 'First letter':
      if (input.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      ing = pathname === '/meals'
        ? await firstLetterFoodApi(myImputUnderline)
        : await firstLetterDrinkApi(myImputUnderline);
      break;
    default:
      break;
    }

    const auxIng = ing.meals || ing.drinks || [];
    if (auxIng.length === 1) {
      // console.log(auxIng);
      return pathname === '/meals'
        ? push(`/meals/${auxIng[0].idMeal}`) : push(`/drinks/${auxIng[0].idDrink}`);
    }

    if (auxIng.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      dispatch(saveRecipes(auxIng));
    }
  };

  return (
    <div className="search">
      <input
        className="input-text"
        type="text"
        name="input"
        id="input"
        data-testid="search-input"
        value={ input }
        onChange={ handleFilters }
      />
      <div className="filters">
        <label
          className="filter"
          htmlFor="Ingredient"
        >
          Ingredient
          <input
            type="radio"
            id="Ingredient"
            data-testid="ingredient-search-radio"
            name="option"
            checked={ option === 'Ingredient' }
            value="Ingredient"
            onChange={ handleFilters }
          />
        </label>
        <label
          className="filter"
          htmlFor="Name"
        >
          Name
          <input
            type="radio"
            id="Name"
            data-testid="name-search-radio"
            name="option"
            checked={ option === 'Name' }
            value="Name"
            onChange={ handleFilters }
          />
        </label>
        <label
          className="filter"
          htmlFor="First letter"
        >
          First letter
          <input
            type="radio"
            id="First letter"
            data-testid="first-letter-search-radio"
            name="option"
            checked={ option === 'First letter' }
            value="First letter"
            onChange={ handleFilters }
          />
        </label>
      </div>
      <button
        type="button"
        className="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {}.isRequired;

export default SearchBar;
