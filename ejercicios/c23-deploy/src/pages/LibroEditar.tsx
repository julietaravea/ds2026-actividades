
import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../services/api';
import type { Libro } from '../types/libro';

function LibroEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [autorId, setAutorId] = useState('');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    apiFetch<Libro>(`/libros/${id}`)
      .then((libro) => {
        setTitulo(libro.titulo);
        setPrecio(String(libro.precio));
        setAutorId(String(libro.autorId));
        setImagen(libro.imagen ?? '');
        setDescripcion(libro.descripcion ?? '');
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!titulo.trim()) {
      setError('Debe ingresar un título');
      return;
    }

    if (!precio || Number(precio) <= 0) {
      setError('Debe ingresar un precio válido');
      return;
    }

    if (!autorId || Number(autorId) <= 0) {
      setError('Debe ingresar el ID del autor');
      return;
    }

    setGuardando(true);

    try {
      await apiFetch<Libro>(`/libros/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          titulo,
          precio: Number(precio),
          autorId: Number(autorId),
          imagen: imagen || undefined,
          descripcion: descripcion || undefined,
        }),
      });

      navigate('/catalogo');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo modificar el libro');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="my-5" style={{ maxWidth: '500px' }}>
      <h1 className="mb-4 text-center">Modificar libro</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ID del autor</Form.Label>
          <Form.Control
            type="number"
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen (URL, opcional)</Form.Label>
          <Form.Control
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="dark"
          className="w-100"
          disabled={guardando}
        >
          {guardando ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </Form>
    </Container>
  );
}

export default LibroEditar;
