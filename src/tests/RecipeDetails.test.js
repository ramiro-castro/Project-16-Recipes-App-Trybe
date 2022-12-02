import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa o componente RecipeDetails', () => {
  it('Testa a existencia da rota /meals/52772', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals/52772');
    });
    const title = await screen.findByTestId('recipe-category');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Chicken');
    const recomendation = await screen.findByTestId('0-recommendation-card');
    expect(recomendation).toBeInTheDocument();
  });

  it('Testa a existencia da rota /drinks/11007', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks/11007');
    });
    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Margarita');
    const recomendation = await screen.findByTestId('0-recommendation-card');
    expect(recomendation).toBeInTheDocument();
  });
  // it('Testa a existencia da rota /drinks/11007', () => {

  // });
});
