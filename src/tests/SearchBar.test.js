import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, jest } from '@jest/globals';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa o componente Login', () => {
//   const emailId = 'email-input';
//   const passwordId = 'password-input';
//   const buttonId = 'login-submit-btn';
//   const email = 'grupo12@gmail.com';
  const activeSearch = 'search-top-btn';
  const searchInput = 'search-input';
  const searchButton = 'exec-search-btn';
  const ingredientRadio = 'ingredient-search-radio';
  const nameRadio = 'name-search-radio';
  const firstLetterRadio = 'first-letter-search-radio';

  it('Testa a existencia da rota /meals', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals');
    expect(history.location.pathname).toBe('/meals');
  });

  it('Testa a existencia da rota /drinks', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks');
    expect(history.location.pathname).toBe('/drinks');
  });

  it('Testa uma busca na rota /meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    // history.push('/meals');
    expect(history.location.pathname).toBe('/meals');

    const searchTopBtn = screen.getByTestId(activeSearch);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const searchInputUse = screen.getByTestId(searchInput);
    const searchButtonUse = screen.getByTestId(searchButton);
    const ingredientRadioUse = screen.getByTestId(ingredientRadio);
    const nameRadioUse = screen.getByTestId(nameRadio);
    const firstLetterRadioUse = screen.getByTestId(firstLetterRadio);

    expect(searchInputUse).toBeInTheDocument();
    expect(searchButtonUse).toBeInTheDocument();
    expect(ingredientRadioUse).toBeInTheDocument();
    expect(nameRadioUse).toBeInTheDocument();
    expect(firstLetterRadioUse).toBeInTheDocument();

    userEvent.type(searchInput, 'chicken');
    userEvent.click(ingredientRadioUse);
    userEvent.click(searchButtonUse);

    userEvent.type(searchInput, 'ch');
    userEvent.click(firstLetterRadioUse);
    userEvent.click(searchButtonUse);
    // preciso testar alert

    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(nameRadioUse);
    userEvent.click(searchButtonUse);

    // await new Promise((resolve) => { setTimeout(resolve, 100); });

    // expect(history.location.pathname).toBe('/meals/52771');
  });

  it('Testa uma busca na rota /drink', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });
    // history.push('/meals');
    expect(history.location.pathname).toBe('/drinks');

    const searchTopBtn = screen.getByTestId(activeSearch);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const searchInputUse = screen.getByTestId(searchInput);
    const searchButtonUse = screen.getByTestId(searchButton);
    const ingredientRadioUse = screen.getByTestId(ingredientRadio);
    const nameRadioUse = screen.getByTestId(nameRadio);
    const firstLetterRadioUse = screen.getByTestId(firstLetterRadio);

    expect(searchInputUse).toBeInTheDocument();
    expect(searchButtonUse).toBeInTheDocument();
    expect(ingredientRadioUse).toBeInTheDocument();
    expect(nameRadioUse).toBeInTheDocument();
    expect(firstLetterRadioUse).toBeInTheDocument();

    userEvent.type(searchInput, 'lemon');
    userEvent.click(ingredientRadioUse);
    userEvent.click(searchButtonUse);

    userEvent.type(searchInput, 'ch');
    userEvent.click(firstLetterRadioUse);
    userEvent.click(searchButtonUse);
    // preciso testar alert

    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(nameRadioUse);
    userEvent.click(searchButtonUse);

    // await new Promise((resolve) => { setTimeout(resolve, 100); });

    // expect(history.location.pathname).toBe('/drinks/178319');
  });
});
