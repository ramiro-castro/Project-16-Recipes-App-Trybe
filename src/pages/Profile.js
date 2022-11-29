import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
  const [emailStorage, setEmailStorage] = useState('');
  const history = useHistory();
  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    console.log(email);
    setEmailStorage(email);
  }, []);
  return (
    <div>
      <Header profile>Profile</Header>
      <p data-testid="profile-email">{emailStorage}</p>
      <button
        onClick={ () => history.push('/done-recipes') }
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

export default Profile;
