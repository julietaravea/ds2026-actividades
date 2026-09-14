import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiFetch } from '../services/api';

const registroSchema = z.object({
  nombre: z.string().trim().min(1, 'El nombre es obligatorio').max(100),
  email: z.string().trim().email('Email inválido'),
  password: z
    .string()
    .min(8, 'La contraseña necesita al menos 8 caracteres')
    .regex(/[A-Z]/, 'Necesita al menos una mayúscula')
    .regex(/[0-9]/, 'Necesita al menos un número'),
});

type RegistroForm = z.infer<typeof registroSchema>;

function Registro() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegistroForm>({
    resolver: zodResolver(registroSchema),
  });

  const onSubmit = async (data: RegistroForm) => {
    setCargando(true);
    setError('');
    try {
      await apiFetch('/auth/registro', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      alert('¡Registro exitoso! Ya podés iniciar sesión.');
      navigate('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo completar el registro.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: '450px' }}>
      <h1 className="mb-4 text-center">Crear cuenta</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            {...register('nombre')}
            isInvalid={!!errors.nombre}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nombre?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register('email')}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            {...register('password')}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="dark" className="w-100" disabled={cargando}>
          {cargando ? 'Registrando...' : 'Registrarme'}
        </Button>

        <div className="text-center mt-3 small text-muted">
          ¿Ya tenés cuenta?{' '}
          <Link to="/" className="text-dark fw-bold text-decoration-underline">
            Iniciá sesión
          </Link>
        </div>
      </Form>
    </Container>
  );
}

export default Registro;