// "/meals/52977/in-progress"
// /drinks/15997/in-progress

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

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
];

describe('Testes para meals', () => {
  const mealsRecipe = '/meals/52977/in-progress';

  it('Testa a rota meals', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [mealsRecipe] },
    );

    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();
  });
  it('Testa a ativacao do botao finalizar', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [mealsRecipe] },
    );

    const finalizarBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finalizarBtn).toBeDisabled();

    const inputsCheckbox = await screen.findAllByRole('checkbox');
    // console.log(inputsCheckbox.length);
    inputsCheckbox.forEach((check) => userEvent.click(check));

    expect(finalizarBtn).toBeEnabled();
    userEvent.click(finalizarBtn);
    // window.location.reload();
  });
  it('Testa o botão de compartilhar', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [mealsRecipe] },
    );
    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
  });
  it('Testa a chamada do localstorage', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [mealsRecipe] },
    );

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/meals/53060/in-progress'] },
    );
  });
  it('Testa recipe com string vazia e null nos ingredientes', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/meals/52771/in-progress'] },
    );
    const arrabiataText = await screen.findByText('Spicy Arrabiata Penne');
    expect(arrabiataText).toBeInTheDocument();
  });
});
