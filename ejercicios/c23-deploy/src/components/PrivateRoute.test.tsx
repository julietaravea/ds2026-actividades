import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext, type AuthContextType } from '../context/AuthContext';
import { admin, cliente, crearAuth } from '../testUtils';
import PrivateRoute from './PrivateRoute';

function renderRuta(auth: AuthContextType) {
  return render(
    <MemoryRouter initialEntries={['/libros/nuevo']}>
      <AuthContext.Provider value={auth}>
        <Routes>
          <Route path="/login" element={<p>Página de login</p>} />
          <Route path="/sin-permiso" element={<p>Página sin permiso</p>} />
          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/libros/nuevo" element={<p>Formulario de libro</p>} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </MemoryRouter>,
  );
}

it('sin usuario → /login', () => {
  renderRuta(crearAuth(null));
  expect(screen.getByText('Página de login')).toBeInTheDocument();
  expect(screen.queryByText('Formulario de libro')).not.toBeInTheDocument();
});

it('CLIENTE → /sin-permiso', () => {
  renderRuta(crearAuth(cliente));
  expect(screen.getByText('Página sin permiso')).toBeInTheDocument();
  expect(screen.queryByText('Formulario de libro')).not.toBeInTheDocument();
});

it('ADMIN → renderiza el Outlet', () => {
  renderRuta(crearAuth(admin));
  expect(screen.getByText('Formulario de libro')).toBeInTheDocument();
});

it('mientras cargando: muestra el Spinner y NO redirige', () => {
  const { container } = renderRuta(crearAuth(null, true));
  expect(container.querySelector('.spinner-border')).not.toBeNull();
  expect(screen.queryByText('Página de login')).not.toBeInTheDocument();
});