import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Footer from '../components/Footer';
import Drinks from '../pages/Drinks';
import Meals from '../pages/Meals';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('testes do componente Footer', () => {
  test('testa se os botões estão presentes na tela', () => {
    renderWithRouterAndRedux(<Drinks />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toEqual(2);
  });
  test('testa a funcionalidade do botão Meal', () => {
    const { history } = renderWithRouterAndRedux(<Drinks />);
    const mealBtn = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealBtn);
    expect(history.location.pathname).toBe('/meals');
  });
  test('testa a funcionalidade do botão Meal', () => {
    const { history } = renderWithRouterAndRedux(<Meals />);
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);
    expect(history.location.pathname).toBe('/drinks');
  });
});
