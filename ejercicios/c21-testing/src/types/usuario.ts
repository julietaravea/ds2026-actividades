export type Rol = 'ADMIN' | 'CLIENTE';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: Rol;
}