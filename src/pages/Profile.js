import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
  const [emailStorage, setEmailStorage] = useState('');
  const history = useHistory();
  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    setEmailStorage(email);
  }, []);
  return (
    <div>
      <Header profile>Profile</Header>
      <p data-testid="profile-email">{emailStorage}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout

      </button>
    </div>
  );
}

export default Profile;
