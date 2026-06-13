import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LibroCard from '../components/LibroCard'

type CatalogoProps = {
  libros: any[]
}

function Catalogo({ libros }: CatalogoProps) {
  return (
    <Container className="my-5">
      <h1 className="subtituloDestacados my-5 text-center fw-bold">
        Catálogo
      </h1>

      <p className="text-center text-muted mb-5">
        Descubrí nuestra selección de libros clásicos y contemporáneos.
      </p>

      <Row className="g-5 mb-5">
        {libros.map((libro) => (
          <Col md={4} lg={3} key={libro.id}>
            <LibroCard
              id={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              imagen={libro.imagen}
              mostrarLike={false}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Catalogo