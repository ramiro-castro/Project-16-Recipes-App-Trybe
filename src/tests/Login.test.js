import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa o componente Login', () => {
  const emailId = 'email-input';
  const passwordId = 'password-input';
  const buttonId = 'login-submit-btn';
  const email = 'grupo12@gmail.com';

  it('Testa a existencia da rota /', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se o botão é desabilitado se pelo menos um dos inputs estiver vazio', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const enterButton = screen.getByTestId(buttonId);

    expect(enterButton).toBeDisabled();

    userEvent.type(emailInput, '');
    userEvent.type(passwordInput, '1234567');
    expect(enterButton).toBeDisabled();

    userEvent.type(emailInput, '');
    userEvent.type(passwordInput, '');
    expect(enterButton).toBeDisabled();
  });

  it('Testa de o botão fica habilitado se os dois inputs estiverem preenchidos corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const enterButton = screen.getByTestId(buttonId);

    expect(enterButton).toBeDisabled();

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '1234567');
    expect(enterButton).toBeEnabled();
  });

  it('Testa se ao fazer login foi salvo no localStorage o e-mail da pessoa usuária na chave user e se history esta em /mel', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const enterButton = screen.getByTestId(buttonId);

    expect(enterButton).toBeDisabled();

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '1234567');
    expect(enterButton).toBeEnabled();
    userEvent.click(enterButton);

    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    expect(userLocalStorage.email).toBe(email);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
