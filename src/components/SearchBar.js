import { firstLetterFoodApi,
  ingredientFoodApi, nameFoodApi } from '../services/requestApi';

function SearchBar({ input, option, handleFilters }) {
  const handleSearch = async () => {
    if (option === 'Ingredient') {
      const ing = await ingredientFoodApi(input);
      console.log(ing);
    }
    if (option === 'Name') {
      const foo = await nameFoodApi(input);
      console.log(foo);
    }
    if (option === 'First letter') {
      if (input.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const first = await firstLetterFoodApi(input);
      console.log(first);
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
