import { it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext, type AuthContextType } from '../../context/AuthContext';
import { admin, cliente, crearAuth } from '../../testUtils';
import Header from './Header';

function renderHeader(auth: AuthContextType) {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={auth}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>,
  );
}

it('sin sesión: muestra "Ingresar" y no muestra "Nuevo libro"', () => {
  renderHeader(crearAuth(null));
  expect(screen.getByText('Ingresar')).toBeInTheDocument();
  expect(screen.queryByText('Salir')).not.toBeInTheDocument();
  expect(screen.queryByText('Nuevo libro')).not.toBeInTheDocument();
});

it('CLIENTE: saluda por nombre y NO ve "Nuevo libro"', () => {
  renderHeader(crearAuth(cliente));
  expect(screen.getByText(/Hola, Cliente/)).toBeInTheDocument();
  expect(screen.getByText('Salir')).toBeInTheDocument();
  expect(screen.queryByText('Nuevo libro')).not.toBeInTheDocument();
});

it('ADMIN: ve el link "Nuevo libro"', () => {
  renderHeader(crearAuth(admin));
  expect(screen.getByText(/Hola, Admin/)).toBeInTheDocument();
  expect(screen.getByText('Nuevo libro')).toBeInTheDocument();
});

it('"Salir" llama a logout() del context', () => {
  const auth = crearAuth(cliente);
  renderHeader(auth);
  fireEvent.click(screen.getByText('Salir'));
  expect(auth.logout).toHaveBeenCalledTimes(1);
});