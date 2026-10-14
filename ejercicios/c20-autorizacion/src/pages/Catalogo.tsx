import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spinner, Alert } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import { apiFetch } from '../services/api';
import type { Libro } from '../types/libro';

function Catalogo() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<Libro[]>('/libros')
      .then(setLibros)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  return (
    <Container className="my-5">
      <h1 className="subtituloDestacados my-5 text-center fw-bold">
        Catálogo
      </h1>

      <p className="text-center text-muted mb-5">
        Descubrí nuestra selección de libros clásicos y contemporáneos.
      </p>

      {cargando && <div className="text-center"><Spinner animation="border" /></div>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-5 mb-5">
        {libros.map((libro) => (
          <Col md={4} lg={3} key={libro.id}>
            <LibroCard
              id={libro.id}
              titulo={libro.titulo}
              autor={libro.autor.nombre}
              imagen={libro.imagen ?? ''}
              mostrarLike={false}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Catalogo;