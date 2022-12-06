import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import localStorageMock from './helpers/localStorageMock';

const favoriteRecipeRoute = '/favorite-recipes';
const drinkBtnDId = 'filter-by-drink-btn';
const mealTextDId = '0-horizontal-top-text';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
});

afterEach(() => {
  window.localStorage.clear();
});

describe('Testa o componente Recipe Favorites', () => {
  it('testa se os componentes estão na tela', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [favoriteRecipeRoute] },
    );
    expect(history.location.pathname).toBe(favoriteRecipeRoute);
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId(drinkBtnDId);
    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
  });

  it('testa o botão de filtro meals', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [favoriteRecipeRoute] },
    );
    expect(history.location.pathname).toBe(favoriteRecipeRoute);
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkText = screen.getByTestId('1-horizontal-top-text');
    userEvent.click(mealBtn);
    expect(drinkText).not.toBeInTheDocument();
  });

  it('testa o botão de filtro drink', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [favoriteRecipeRoute] },
    );
    expect(history.location.pathname).toBe(favoriteRecipeRoute);
    const drinkBtn = screen.getByTestId(drinkBtnDId);
    const mealText = screen.getByTestId(mealTextDId);
    userEvent.click(drinkBtn);
    expect(mealText).not.toBeInTheDocument();
  });

  it('testa o botão de filtro all', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [favoriteRecipeRoute] },
    );
    expect(history.location.pathname).toBe(favoriteRecipeRoute);
    const mealText = screen.getByTestId(mealTextDId);
    const drinkBtn = screen.getByTestId(drinkBtnDId);

    userEvent.click(drinkBtn);
    expect(mealText).not.toBeInTheDocument();
    const allBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allBtn);
    const mealTextAfter = screen.getByTestId(mealTextDId);
    // console.log(history.location.pathname);
    expect(mealTextAfter).toBeInTheDocument();
  });

  it('testa se remove um favorito ao clicar no botão', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [favoriteRecipeRoute] },
    );
    expect(history.location.pathname).toBe(favoriteRecipeRoute);
    const favoriteBtn = screen.getByTestId('1-horizontal-favorite-btn');
    const drinkText = screen.getByTestId('1-horizontal-top-text');
    userEvent.click(favoriteBtn);
    expect(drinkText).not.toBeInTheDocument();
  });
});
