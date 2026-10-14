import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  rol?: 'ADMIN' | 'CLIENTE';
}

export default function PrivateRoute({ rol }: PrivateRouteProps) {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return <p className="text-center mt-5">Verificando sesión...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (rol && usuario.rol !== rol) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return <Outlet />;
}