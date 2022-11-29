import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndRedux } from './helpers/renderWith';

const mockemail = 'josiel.jcc@hotmail.com';
const dataIdEmailInput = 'email-input';
const dataIdpassword = 'password-input';
const dataIdloginbtn = 'login-submit-btn';
const dataIdprofilebtn = 'profile-top-btn';

describe('Testes do componente Profile', () => {
  test('verifica se os elementos estão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(dataIdEmailInput);
    userEvent.type(emailInput, mockemail);
    const passwordInput = screen.getByTestId(dataIdpassword);
    userEvent.type(passwordInput, '12345678');
    const loginBtn = screen.getByTestId(dataIdloginbtn);
    userEvent.click(loginBtn);
    const profileBtn = screen.getByTestId(dataIdprofilebtn);
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

  test('verifica se ao clicar no botão done é redirecionado', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(dataIdEmailInput);
    userEvent.type(emailInput, mockemail);
    const passwordInput = screen.getByTestId(dataIdpassword);
    userEvent.type(passwordInput, '12345678');
    const loginBtn = screen.getByTestId(dataIdloginbtn);
    userEvent.click(loginBtn);
    const profileBtn = screen.getByTestId(dataIdprofilebtn);
    userEvent.click(profileBtn);

    const doneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneBtn);
    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Done Recipes');
  });

  test('verifica se ao clicar no botão favorite é redirecionado', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(dataIdEmailInput);
    userEvent.type(emailInput, mockemail);
    const passwordInput = screen.getByTestId(dataIdpassword);
    userEvent.type(passwordInput, '12345678');
    const loginBtn = screen.getByTestId(dataIdloginbtn);
    userEvent.click(loginBtn);
    const profileBtn = screen.getByTestId(dataIdprofilebtn);
    userEvent.click(profileBtn);

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);
    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Favorite Recipes');
  });

  test('verifica se ao clicar no botão logout é redirecionado', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(dataIdEmailInput);
    userEvent.type(emailInput, mockemail);
    const passwordInput = screen.getByTestId(dataIdpassword);
    userEvent.type(passwordInput, '12345678');
    const loginBtn = screen.getByTestId(dataIdloginbtn);
    userEvent.click(loginBtn);
    const profileBtn = screen.getByTestId(dataIdprofilebtn);
    userEvent.click(profileBtn);

    const favoriteBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(favoriteBtn);
    const emailInputAfter = screen.getByTestId(dataIdEmailInput);
    expect(emailInputAfter).toBeInTheDocument();
  });
});
