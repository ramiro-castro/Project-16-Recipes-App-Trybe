import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import headerLogo from '../images/headerLogo.svg';
import './Header.css';
import { searchToggle } from '../redux/actions/userActions';

function Header({
  search, profile,
  // children
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="header">
      {profile && (
        <>
          <Link to="/meals">
            <img src={ headerLogo } alt="header logo" />
          </Link>
          <div className="spacer" />
          {/* <div className="title-container">
            <p>Recipes</p>
          </div> */}
          <div className="icons-container">
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
            {search && (
              <button onClick={ () => dispatch(searchToggle()) } type="button">
                <img
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="icone de profile"
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

Header.propTypes = {
  search: PropTypes.bool,
  profile: PropTypes.bool,
  children: PropTypes.string,
}.isRequired;

export default Header;
