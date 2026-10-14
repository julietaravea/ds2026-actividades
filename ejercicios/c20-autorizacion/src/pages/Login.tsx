import { useState, type FormEvent } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      await login(email, password);

      const destino = location.state?.from?.pathname;
      navigate(destino || '/catalogo', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '480px' }}>
      <h1 className="mb-4">Iniciar sesión</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </Button>
      </Form>

      <p className="mt-3">
        ¿Todavía no tenés cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </Container>
  );
}