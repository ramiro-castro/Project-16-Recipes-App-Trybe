import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <div>
      <Header profile search>Meals</Header>
      <Recipes />
      <Footer />
    </div>
  );
}

export default Meals;
