import { vi } from 'vitest';
import type { AuthContextType } from './context/AuthContext';
import type { UsuarioSesion } from './services/sesion';

export function crearAuth(usuario: UsuarioSesion | null, cargando = false): AuthContextType {
  return {
    usuario,
    cargando,
    estaAutenticado: usuario !== null,
    tieneRol: (rol) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  };
}

export const admin: UsuarioSesion = { id: 1, nombre: 'Admin', email: 'admin@libreria.test', rol: 'ADMIN' };
export const cliente: UsuarioSesion = { id: 2, nombre: 'Cliente', email: 'cliente@libreria.test', rol: 'CLIENTE' };