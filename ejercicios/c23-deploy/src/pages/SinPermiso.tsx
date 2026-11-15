import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SinPermiso() {
  const navigate = useNavigate();

  return (
    <Container className="text-center py-5">
      <h1>Acceso denegado</h1>
      <p>No tenés permisos para acceder a esta página.</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Volver al inicio
      </Button>
    </Container>
  );
}