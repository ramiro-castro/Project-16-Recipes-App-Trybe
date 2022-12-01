import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const email = 'igor@teste.com';
const password = '1234567';

describe('Testa o funcionamento da tela de Recipes', () => {
  afterEach(cleanup);

  it('As receitas de comidas são mostradas corretamente ao carregar', async () => {
    renderWithRouterAndRedux(<App />);

    const emailLog = screen.getByPlaceholderText(/email/i);
    const passwordLog = screen.getByPlaceholderText(/senha/i);
    const login = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailLog, email);
    userEvent.type(passwordLog, password);
    userEvent.click(login);

    const firstText = await screen.findAllByRole('heading', { level: 3 });
    expect(firstText).toHaveLength(12);
  });

  it('Ao clicar em uma receita de comida, é redirecionado para sua página', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailLog = screen.getByPlaceholderText(/email/i);
    const passwordLog = screen.getByPlaceholderText(/senha/i);
    const login = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailLog, email);
    userEvent.type(passwordLog, password);
    userEvent.click(login);

    const firstText = await screen.findAllByRole('heading', { level: 3 });
    userEvent.click(firstText[0]);
    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('A página de drinks carrega corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');

    const firstText = await screen.findAllByRole('heading', { level: 3 });
    expect(firstText).toHaveLength(12);
  });

  it('Ao clicar em uma receita de drink, é redirecionado para sua página', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/drinks');
    });

    const firstText = await screen.findAllByRole('heading', { level: 3 });
    userEvent.click(firstText[0]);
    expect(history.location.pathname).toBe('/drinks/15997');
  });

  it('Os botões de filtro dos drinks são gerados corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/drinks');
    });

    const ordinary = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(ordinary).toBeInTheDocument();

    const cocktail = await screen.findByRole('button', { name: /cocktail/i });
    expect(cocktail).toBeInTheDocument();

    const shake = await screen.findByRole('button', { name: /shake/i });
    expect(shake).toBeInTheDocument();

    const other = await screen.findByRole('button', { name: 'Other/Unknown' });
    expect(other).toBeInTheDocument();

    const cocoa = await screen.findByRole('button', { name: /cocoa/i });
    expect(cocoa).toBeInTheDocument();
  });
});
