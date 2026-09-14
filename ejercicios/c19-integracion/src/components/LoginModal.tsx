import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiFetch } from '../services/api';
import { guardarSesion, type Sesion } from '../services/sesion';

const loginSchema = z.object({
  email: z.string().trim().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

type LoginForm = z.infer<typeof loginSchema>;

type LoginModalProps = {
  show: boolean;
  handleClose: () => void;
};

export default function LoginModal({ show, handleClose }: LoginModalProps) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setCargando(true);
    setError('');

    try {
      const sesion = await apiFetch<Sesion>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      guardarSesion(sesion);
      reset();
      handleClose();
      window.location.href = '/catalogo';
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo iniciar sesión.');
    } finally {
      setCargando(false);
    }
  };

  const irARegistro = () => {
    handleClose();
    navigate('/registro');
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="w-100 text-center fs-4 fw-normal mt-2">
          Ingresá a tu cuenta
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pt-3 pb-4">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="alert alert-danger py-2 small">{error}</div>}

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              className="py-2"
              {...register('email')}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              className="py-2"
              {...register('password')}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="text-end mb-3">
            <span
              onClick={() => alert('Si el email existe en nuestro sistema, te enviamos un enlace para recuperar tu contraseña.')}
              style={{ cursor: 'pointer', fontSize: '0.85rem' }}
              className="text-muted text-decoration-underline"
            >
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          <Button
            variant="dark"
            type="submit"
            className="w-100 py-2"
            disabled={cargando}
          >
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </Button>

          <div className="text-center mt-4 small text-muted">
            ¿No tenés cuenta?{' '}
            <span
              onClick={irARegistro}
              style={{ cursor: 'pointer' }}
              className="text-dark fw-bold text-decoration-underline"
            >
              Registrate
            </span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}