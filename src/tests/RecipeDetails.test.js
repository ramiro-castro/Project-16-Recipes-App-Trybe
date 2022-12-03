import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const mealRoute = '/meals/52771';
const drinkRoute = '/drinks/11007';

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      console.log(store);
    },
  };
}());

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Testa o componente RecipeDetails', () => {
  it('Testa a existencia da rota /meals/52772', async () => {
    // const { history } = renderWithRouterAndRedux(<App />);
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [`${mealRoute}`] },
    );
    expect(history.location.pathname).toBe(`${mealRoute}`);
    const title = await screen.findByTestId('recipe-category');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Vegetarian');
    const recomendation = await screen.findByTestId('0-recommendation-card');
    expect(recomendation).toBeInTheDocument();
  });

  it('Testa a existencia da rota /drinks/11007', async () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [`${drinkRoute}`] },
    );
    expect(history.location.pathname).toBe(`${drinkRoute}`);
    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Margarita');
    const recomendation = await screen.findByTestId('0-recommendation-card');
    expect(recomendation).toBeInTheDocument();
  });
  it('Testa o botão de compartilhar', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(`${drinkRoute}`);
    });
    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
  });
  it('Testa o botão de favorito', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(`${mealRoute}`);
    });
    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favoriteBtn);
    const favoriteBtn1 = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn1).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  it('Testa o botão de favorito em mais de um ítem', async () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [`${drinkRoute}`] },
    );
    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favoriteBtn);
    act(() => {
      history.push(`${mealRoute}`);
    });
    const favoriteBtn1 = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteBtn1);
  });

  it('testa se o botão de start recipe está na página e é direcionado para inprogress', async () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [`${mealRoute}`] },
    );
    expect(history.location.pathname).toBe(`${mealRoute}`);
    const startBtn = await screen.findByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);
    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });

  it('testa se muda o botão para continuar a receita', async () => {
    const inProgressRecipes = {
      drinks: {
        178319: [],
      },
    };
    window.localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/drinks/178319'] },
    );
    expect(history.location.pathname).toBe('/drinks/178319');
    const continueBtn = await screen.findAllByTestId('start-recipe-btn');
    window.localStorage.getAll();
    expect(continueBtn[1]).toHaveAccessibleName('Continue Recipe');
  });
});
