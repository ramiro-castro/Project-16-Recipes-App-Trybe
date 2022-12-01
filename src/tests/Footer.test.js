import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Footer from '../components/Footer';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('testes do componente Footer', () => {
  test('testa se os botões estão presentes na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });
    expect(history.location.pathname).toBe('/drinks');

    const buttons = screen.getByTestId('meals-bottom-btn');
    const buttons1 = screen.getByTestId('drinks-bottom-btn');
    expect(buttons).toBeInTheDocument();
    expect(buttons1).toBeInTheDocument();
  });
  test('testa a funcionalidade do botão Meal', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const mealBtn = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealBtn);
    expect(history.location.pathname).toBe('/meals');
  });
  test('testa a funcionalidade do botão Meal', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);
    expect(history.location.pathname).toBe('/drinks');
  });
});
