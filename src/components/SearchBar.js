import {
  firstLetterDrinkApi,
  firstLetterFoodApi,
  ingredientDrinkApi,
  ingredientFoodApi,
  nameDrinkApi,
  nameFoodApi,
} from '../services/requestApi';

function SearchBar({ input, option, handleFilters, pathname, push }) {
//   console.log(pathname);

  const handleSearch = async () => {
    let ing = [];
    if (option === 'Ingredient') {
      ing = pathname === '/meals'
        ? await ingredientFoodApi(input) : await ingredientDrinkApi(input);
      console.log(ing);
      // push(`/meals/${ing.meals[0].idMeal}`);
    }
    if (option === 'Name') {
      ing = pathname === '/meals'
        ? await nameFoodApi(input) : await nameDrinkApi(input);
    }
    if (option === 'First letter') {
      if (input.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      ing = pathname === '/meals'
        ? await firstLetterFoodApi(input) : await firstLetterDrinkApi(input);
    }
    const auxIng = ing.meals || ing.drinks;
    if (auxIng.length === 1) {
      return pathname === '/meals'
        ? push(`/meals/${auxIng[0].idMeal}`) : push(`/drinks/${auxIng[0].idDrink}`);
    }
  };

  return (
    <div>
      <label htmlFor="ingredient">
        Ingredient
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="option"
          checked={ option === 'Ingredient' }
          value="Ingredient"
          onChange={ handleFilters }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          name="option"
          checked={ option === 'Name' }
          value="Name"
          onChange={ handleFilters }
        />
      </label>
      <label htmlFor="firstLetter">
        First letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="option"
          checked={ option === 'First letter' }
          value="First letter"
          onChange={ handleFilters }
        />
      </label>
      <button
        type="button"
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
