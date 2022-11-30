import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';

import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do componente Header', () => {
  test('verifica se os elementos estão na tela', () => {
    renderWithRouterAndRedux(<Header search profile>Teste</Header>);
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const title = screen.getByTestId('page-title');
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(title).toHaveTextContent('Teste');
  });
  test('verifica se ao clicar no search aparece o input para busca', () => {
    renderWithRouterAndRedux(<Header search profile>Teste</Header>);
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
