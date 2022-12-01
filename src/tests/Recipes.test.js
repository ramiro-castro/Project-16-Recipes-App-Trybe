import React from 'react';
import { cleanup } from '@testing-library/react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockMealsRecipes from './mocks/mockRecipes';
import mockDrinksRecipes from './mocks/mockRecipes';
import { act } from 'react-dom/test-utils';

const fetchMealMock = () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockMealsRecipes),
  }));
}

const fetchDrinkMock = () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockDrinksRecipes),
  }));
}

describe('Testa o funcionamento da tela de receitas', () => {
  afterEach(cleanup);

  it('As receitas de comidas são mostradas corretamente', async () => {
    fetchMealMock();
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals');
    });

    const firstMeal = await screen.findByTestId('0-recipe-card');
    const secondMeal = await screen.findByTestId('1-recipe-card');
    const thirdMeal = await screen.findByTestId('2-recipe-card');
    const fourthMeal = await screen.findByTestId('3-recipe-card');

    expect(firstMeal).toBeInTheDocument();
    expect(secondMeal).toBeInTheDocument();
    expect(thirdMeal).toBeInTheDocument();
    expect(fourthMeal).toBeInTheDocument();
  });
});
