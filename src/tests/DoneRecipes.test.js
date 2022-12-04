import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import localStorageMock from './helpers/localStorageMock';

const doneRecipeRoute = '/done-recipes';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
});

afterEach(() => {
  window.localStorage.clear();
});

describe('Testa o componente RecipeDetails', () => {
  it('testa se os componentes estão na tela', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [doneRecipeRoute] },
    );
    expect(history.location.pathname).toBe(doneRecipeRoute);
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
  });

  it('testa o botão de filtro meals', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [doneRecipeRoute] },
    );
    expect(history.location.pathname).toBe(doneRecipeRoute);
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkText = screen.getByTestId('1-horizontal-top-text');
    userEvent.click(mealBtn);
    expect(drinkText).not.toBeInTheDocument();
  });

  it('testa o botão de filtro drink', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [doneRecipeRoute] },
    );
    expect(history.location.pathname).toBe(doneRecipeRoute);
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    const mealText = screen.getByTestId('0-horizontal-top-text');
    userEvent.click(drinkBtn);
    expect(mealText).not.toBeInTheDocument();
  });

  it('testa o botão de filtro all', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [doneRecipeRoute] },
    );
    expect(history.location.pathname).toBe(doneRecipeRoute);
    const mealText = screen.getByTestId('0-horizontal-top-text');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(drinkBtn);
    expect(mealText).not.toBeInTheDocument();
    const allBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allBtn);
    const mealTextAfter = screen.getByTestId('0-horizontal-top-text');
    // console.log(history.location.pathname);
    expect(mealTextAfter).toBeInTheDocument();
  });
});
