import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import doneIcon from '../images/doneIcon.svg';
import favoriteIcon from '../images/favoriteProfileIcon.svg';
import logoutIcon from '../images/logoutIcon.svg';
import './Profile.css';

function Profile() {
  const [emailStorage, setEmailStorage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const loadingTime = 1500;
  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user')) || '';
    setEmailStorage(email);
    setTimeout(() => setIsLoading(false), loadingTime);
  }, []);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="profile">
      <Header profile>Profile</Header>
      <p className="email" data-testid="profile-email">{emailStorage}</p>
      <button
        className="link-container"
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        <img src={ doneIcon } alt="done Icon" />
        Done Recipes
      </button>
      <button
        className="link-container center"
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        <img src={ favoriteIcon } alt="favorite icon" />
        Favorite Recipes
      </button>
      <button
        type="button"
        className="link-container"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        <img src={ logoutIcon } alt="logout icon" />
        Logout

      </button>
      <Footer />
    </div>
  );
}

export default Profile;
