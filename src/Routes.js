import { Route } from 'react-router-dom';
import Login from './pages/Login';

function Routes() {
  return (
    <Route exact path="/" component={ Login } />
  );
}

export default Routes;
