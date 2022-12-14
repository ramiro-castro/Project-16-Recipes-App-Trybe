import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { useRouter } from 'next/router';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

jest.spyOn(global, 'alert').mockImplementation(() => {});

describe('Testa o componente SearchBar.js', () => {
  const emailId = 'email-input';
  const passwordId = 'password-input';
  const buttonId = 'login-submit-btn';
  const email = 'grupo12@gmail.com';
  const activeSearch = 'search-top-btn';
  const searchInput = 'search-input';
  const searchButton = 'exec-search-btn';
  const ingredientRadio = 'ingredient-search-radio';
  const nameRadio = 'name-search-radio';
  const firstLetterRadio = 'first-letter-search-radio';

  it('Testa a existencia da rota /meals', async () => {
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

    const profileBtn = await screen.findByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);

    const profileEmail = await screen.findByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
  });

  it('Testa a existencia da rota /drinks', () => {
    act(() => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/drinks');
      expect(history.location.pathname).toBe('/drinks');
    });
  });

  it('Testa uma busca na rota /meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    expect(history.location.pathname).toBe('/meals');

    const searchTopBtn = await screen.findByTestId(activeSearch);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();

    const searchInputUse = await screen.findByTestId(searchInput);
    const searchButtonUse = await screen.findByTestId(searchButton);
    const ingredientRadioUse = await screen.findByTestId(ingredientRadio);
    const nameRadioUse = await screen.findByTestId(nameRadio);
    const firstLetterRadioUse = await screen.findByTestId(firstLetterRadio);

    const inputIngredient = await screen.findByLabelText('Ingredient');
    expect(inputIngredient).toBeInTheDocument();
    const input2 = await screen.findByLabelText('Name');
    expect(input2).toBeInTheDocument();
    const inputFirstletter = await screen.findByLabelText('First letter');
    expect(inputFirstletter).toBeInTheDocument();

    expect(searchInputUse).toBeInTheDocument();
    expect(searchButtonUse).toBeInTheDocument();
    expect(ingredientRadioUse).toBeInTheDocument();
    expect(nameRadioUse).toBeInTheDocument();
    expect(firstLetterRadioUse).toBeInTheDocument();

    userEvent.type(searchInput, 'chicken');
    userEvent.click(inputIngredient);
    userEvent.click(searchButtonUse);

    userEvent.type(searchInput, 'Milk');
    userEvent.click(ingredientRadioUse);
    userEvent.click(searchButtonUse);
  });

  it('Testa alert first letter na rota /drink', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchTopBtn = screen.getByTestId(activeSearch);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const searchInputUse = await screen.findByTestId(searchInput);
    const searchButtonUse = await screen.findByTestId(searchButton);

    const firstLetterRadioUse = await screen.findByTestId(firstLetterRadio);

    userEvent.type(searchInputUse, 'ch');
    userEvent.click(firstLetterRadioUse);
    userEvent.click(searchButtonUse);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  it('Testa uma busca por first letter na rota /meals', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchTopBtn = screen.getByTestId(activeSearch);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const searchInputUse = await screen.findByTestId(searchInput);
    const searchButtonUse = await screen.findByTestId(searchButton);
    // const ingredientRadioUse = await screen.findByTestId(ingredientRadio);
    const firstLetterRadioUse = await screen.findByTestId(firstLetterRadio);

    userEvent.click(firstLetterRadioUse);
    userEvent.type(searchInputUse, 'A');
    userEvent.click(searchButtonUse);
    const recipe2 = await screen.findByText('Apple Frangipan Tart');
    expect(recipe2).toBeInTheDocument();

    // userEvent.type(searchInput, 'Aquamarine');
    // userEvent.click(nameRadioUse);
    // userEvent.click(searchButtonUse);
    // const aquamarineText = await screen.findByText('Aquamarine');
    // console.log(aquamarineText);
  });

  it('Testa push na /drinks', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchTopBtn = screen.getByTestId(activeSearch);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const searchInputUse = await screen.findByTestId(searchInput);
    const searchButtonUse = await screen.findByTestId(searchButton);
    const nameRadioUse = await screen.findByTestId(nameRadio);

    userEvent.type(searchInputUse, 'Aquamarine');
    userEvent.click(nameRadioUse);
    userEvent.click(searchButtonUse);
    const aquamarineText = await screen.findByText('Aquamarine');
    console.log(aquamarineText);
  });

  it('Testa uma busca na rota /drink', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchTopBtn = screen.getByTestId(activeSearch);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const searchInputUse = await screen.findByTestId(searchInput);
    const searchButtonUse = await screen.findByTestId(searchButton);
    const ingredientRadioUse = await screen.findByTestId(ingredientRadio);
    const firstLetterRadioUse = await screen.findByTestId(firstLetterRadio);

    // console.log(searchButtonUse);

    expect(searchInputUse).toBeInTheDocument();
    expect(searchButtonUse).toBeInTheDocument();

    expect(firstLetterRadioUse).toBeInTheDocument();
    userEvent.type(searchInputUse, 'lemon');
    userEvent.click(ingredientRadioUse);
    userEvent.click(searchButtonUse);
  });

  it('exibe mensagem de alert em meals', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchTopBtn = screen.getByTestId(activeSearch);
    userEvent.click(searchTopBtn);

    const searchInputUse = await screen.findByTestId(searchInput);
    const searchButtonUse = await screen.findByTestId(searchButton);
    const ingredientRadioUse = await screen.findByTestId(ingredientRadio);
    const nameRadioUse = await screen.findByTestId(nameRadio);
    const firstLetterRadioUse = await screen.findByTestId(firstLetterRadio);

    // console.log(searchButtonUse);
    expect(searchTopBtn).toBeInTheDocument();
    expect(searchInputUse).toBeInTheDocument();
    expect(searchButtonUse).toBeInTheDocument();
    expect(ingredientRadioUse).toBeInTheDocument();
    expect(nameRadioUse).toBeInTheDocument();
    expect(firstLetterRadioUse).toBeInTheDocument();

    //  const alertMock = jest.spyOn(global, 'alert').mockImplementation();

    userEvent.click(searchButtonUse);

    expect(window.alert).toHaveBeenCalledTimes(1);

    // await act(async () => {
    //   await new Promise((resolve) => { setTimeout(resolve, 4000); });
    // });
  });

  it('exibe uma lista de drinks', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchTopBtn = screen.getByTestId(activeSearch);
    userEvent.click(searchTopBtn);

    const searchInputUse = await screen.findByTestId(searchInput);
    const searchButtonUse = await screen.findByTestId(searchButton);
    const firstLetterRadioUse = await screen.findByTestId(firstLetterRadio);

    // console.log(searchButtonUse);

    userEvent.type(searchInputUse, 'b');
    userEvent.click(firstLetterRadioUse);
    userEvent.click(searchButtonUse);
    const recipe = await screen.findByText('B-52');
    expect(recipe).toBeInTheDocument();
  });

  it('mock in meals', async () => {
    // window.location.reload();
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(mockOneRecipe),
    // }));

    const searchTopBtn = screen.getByTestId(activeSearch);
    userEvent.click(searchTopBtn);

    const searchInputUse = await screen.findByTestId(searchInput);
    const searchButtonUse = await screen.findByTestId(searchButton);
    const nameRadioUse = await screen.findByTestId(nameRadio);

    // console.log(searchButtonUse);

    userEvent.click(nameRadioUse);
    userEvent.type(searchInputUse, 'Big Mac');
    userEvent.click(searchButtonUse);
    // await new Promise((resolve) => { setTimeout(resolve, 1000); });

    const recipeBigMac = await screen.findByText('Big Mac');
    expect(recipeBigMac).toBeInTheDocument();

    // // console.log(history);

    // // const recipeBigMac = await screen.findByText('Big Mac');
    // expect(recipeBigMac).toBeInTheDocument();

    // userEvent.type(searchInput, 'S');
    // userEvent.click(firstLetterRadioUse);
    // userEvent.click(searchButtonUse);
    // const recipe2 = await screen.findByTestId('0-card-name');
    // expect(recipe2).toBeInTheDocument();
  });
});
