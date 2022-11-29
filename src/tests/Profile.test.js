import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do componente Profile', () => {
  test('verifica se os elementos estão na tela', () => {
    renderWithRouterAndRedux(<App />);
    const mockemail = 'josiel.jcc@hotmail.com';

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, mockemail);
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '12345678');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.click(loginBtn);
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);

    const doneBtn = screen.getByTestId('profile-done-btn');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    const email = screen.getByText(mockemail);
    expect(email).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
  test('verifica se ao clicar no search aparece o input para busca', () => {
    renderWithRouterAndRedux(<App />);
    const mockemail = 'josiel.jcc@hotmail.com';

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, mockemail);
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '12345678');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.click(loginBtn);
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);

    const doneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneBtn);
    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Done Recipes');
  });
});
