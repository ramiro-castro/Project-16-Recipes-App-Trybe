import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Drinks from './pages/Drinks';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
// import MealCard from './pages/MealCard';
// import Done from './pages/Done';
// import Favorites from './pages/Favorites';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Meals } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/profile" component={ Profile } />
      {/* <Route path="/meals/:id-da-receita" component={ MealCard } />
      <Route path="/drinks/:id-da-receita" component={ DrinksCard } />
      <Route path="/done-recipes" component={ Done } />
      <Route path="/favorite-recipes" component={ Favorites } /> */}
    </Switch>
  );
}

export default Routes;
