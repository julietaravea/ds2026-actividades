import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  cerrarSesion,
  guardarSesion,
  obtenerSesion,
  type Sesion,
  type UsuarioSesion,
} from '../services/sesion';
import { apiFetch } from '../services/api';

interface AuthContextType {
  usuario: UsuarioSesion | null;
  cargando: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  tieneRol: (rol: 'ADMIN' | 'CLIENTE') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(
    () => obtenerSesion()?.usuario ?? null,
  );
  const [cargando, setCargando] = useState(true);

  const logout = useCallback(() => {
    cerrarSesion();
    setUsuario(null);
  }, []);

  useEffect(() => {
    const verificarSesion = async () => {
      const sesion = obtenerSesion();

      if (!sesion?.token) {
        setCargando(false);
        return;
      }

      try {
        const usuarioActual = await apiFetch<UsuarioSesion>('/auth/yo');
        const sesionActualizada: Sesion = {
          token: sesion.token,
          usuario: {
            id: usuarioActual.id,
            nombre: usuarioActual.nombre,
            email: usuarioActual.email,
            rol: usuarioActual.rol,
          },
        };

        guardarSesion(sesionActualizada);
        setUsuario(sesionActualizada.usuario);
      } catch {
        cerrarSesion();
        setUsuario(null);
      } finally {
        setCargando(false);
      }
    };

    void verificarSesion();
  }, []);

  useEffect(() => {
    window.addEventListener('auth:unauthorized', logout);
    return () => window.removeEventListener('auth:unauthorized', logout);
  }, [logout]);

  const login = async (email: string, password: string) => {
    const sesion = await apiFetch<Sesion>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    guardarSesion(sesion);
    setUsuario(sesion.usuario);
  };

  const tieneRol = (rol: 'ADMIN' | 'CLIENTE') => usuario?.rol === rol;

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout, tieneRol }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  }

  return context;
}