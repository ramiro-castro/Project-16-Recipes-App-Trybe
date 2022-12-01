import { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const foodSearch = {
  input: '',
  option: '',
};

function Header({
  search, profile, children }) {
  const [isSearch, setisSearch] = useState(false);
  const [searchOptions, setSearchOptions] = useState(foodSearch);
  // console.log(children);

  const handleFilters = ({ target: { value, name } }) => {
    setSearchOptions({ ...searchOptions, [name]: value });
  };

  const { input, option } = searchOptions;

  const history = useHistory();

  return (
    <div className="header">
      {profile && (
        <button
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="icone de profile"
          />

        </button>
      )}
      {search && (
        <button onClick={ () => setisSearch((prev) => !prev) } type="button">
          <img data-testid="search-top-btn" src={ searchIcon } alt="icone de profile" />
        </button>
      )}
      {
        isSearch
      && (
        <div>
          <label htmlFor="search">
            <input
              type="text"
              name="input"
              data-testid="search-input"
              value={ input }
              onChange={ handleFilters }
            />
          </label>
          <SearchBar
            push={ history.push }
            input={ input }
            pathname={ history.location.pathname }
            option={ option }
            handleFilters={ handleFilters }
          />
        </div>
      )
      }
      <p data-testid="page-title" className="title">{children}</p>
    </div>
  );
}

Header.propTypes = {
  search: PropTypes.bool,
  profile: PropTypes.bool,
  children: PropTypes.string,
}.isRequired;

export default Header;
