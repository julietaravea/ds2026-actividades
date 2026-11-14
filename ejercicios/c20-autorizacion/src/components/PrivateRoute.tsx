import { Spinner } from 'react-bootstrap';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  rol?: 'ADMIN' | 'CLIENTE';
}

export default function PrivateRoute({ rol }: PrivateRouteProps) {
  const { usuario, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (rol && usuario.rol !== rol) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return <Outlet />;
}