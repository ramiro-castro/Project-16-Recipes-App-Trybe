import { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ search, profile, children }) {
  const [isSearch, setisSearch] = useState(false);
  return (
    <div className="header">
      {profile && (
        <Link to="/profile">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="icone de profile" />
        </Link>
      )}
      {search && (
        <button onClick={ () => setisSearch((prev) => !prev) } type="button">
          <img data-testid="search-top-btn" src={ searchIcon } alt="icone de profile" />
        </button>
      )}
      {isSearch && <input type="text" data-testid="search-input" />}
      <p data-testid="page-title" className="title">{children}</p>
    </div>
  );
}

Header.propTypes = {}.isRequired;

export default Header;
