export interface UsuarioSesion {
  id: number;
  nombre: string;
  email: string;
  rol: 'ADMIN' | 'CLIENTE';
}

export interface Sesion {
  token: string;
  usuario: UsuarioSesion;
}

const SESSION_KEY = 'libreria-sesion';

export function guardarSesion(sesion: Sesion): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(sesion));
}

export function obtenerSesion(): Sesion | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Sesion;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function obtenerToken(): string | null {
  return obtenerSesion()?.token ?? null;
}

export function cerrarSesion(): void {
  localStorage.removeItem(SESSION_KEY);
}