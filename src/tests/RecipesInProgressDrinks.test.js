// "/meals/52977/in-progress"
// /drinks/15997/in-progress

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import localStorageMock from './helpers/localStorageMock';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const doneRecipes = [
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
];
// const favoriteRecipes = [
//   {
//     id: '15997',
//     type: 'drink',
//     nationality: '',
//     category: 'Ordinary Drink',
//     alcoholicOrNot: 'Optional alcohol',
//     name: 'GG',
//     image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
//   },
// ];
// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// jest.spyOn(global, 'localStorage').mockImplementation(() => {});

// beforeEach(() => {
//   window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
// });

// afterEach(() => {
//   window.localStorage.clear();
// });

// jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');

describe('Testes para drinks', () => {
  const drinksRecipe = '/drinks/15997/in-progress';

  it('Testa a rota meals', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [drinksRecipe] },
    );

    const gg = await screen.findByText('GG');
    expect(gg).toBeInTheDocument();
  });
  it('Testa a ativacao do botao finalizar', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [drinksRecipe] },
    );

    const finalizarBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finalizarBtn).toBeDisabled();

    const inputsCheckbox2 = await screen.findAllByRole('checkbox');
    // console.log(inputsCheckbox.length);
    inputsCheckbox2.forEach((check) => {
      userEvent.click(check);
      console.log(check);
    });
    // const finalizarBtn2 = await screen.findByTestId('finish-recipe-btn');
    expect(finalizarBtn).toBeEnabled();
    userEvent.click(finalizarBtn);
  });

  it('Testa a chamada do localstorage', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [drinksRecipe] },
    );

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/drinks/17222/in-progress'] },
    );
  });
  it('Testa o botão de favorito', async () => {
    const favoriteBtnTid = 'favorite-btn';
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [drinksRecipe] },
    );

    const favoriteBtn = await screen.findByTestId(favoriteBtnTid);
    userEvent.click(favoriteBtn);

    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/favorite-recipes'] },
    );
    const favoriteRecipe = await screen.findByText('GG');
    expect(favoriteRecipe).toBeInTheDocument();

    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [drinksRecipe] },
    );
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);

    // expect(favoriteRecipe).not.toBeInTheDocument();

    // renderWithRouterAndRedux(
    //   <App />,
    //   { initialEntries: ['/favorite-recipes'] },
    // );

    // expect(favoriteRecipe).not.toBeInTheDocument();
  });
  it('Testa o botão de compartilhar', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [drinksRecipe] },
    );
    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
  });
  it('Testa a recuperacao do estado de check', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [drinksRecipe] },
    );

    const finalizarBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finalizarBtn).toBeDisabled();

    const inputsCheckbox2 = await screen.findAllByRole('checkbox');
    // console.log(inputsCheckbox.length);
    userEvent.click(inputsCheckbox2[0]);
    userEvent.click(inputsCheckbox2[1]);

    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/drinks/'] },
    );
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [drinksRecipe] },
    );
    userEvent.click(inputsCheckbox2[2]);
  });
});
