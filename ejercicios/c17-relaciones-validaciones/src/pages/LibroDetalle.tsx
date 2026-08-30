import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import { libros } from '../types/libro'

function LibroDetalle() {
    const { id } = useParams()

    const libroEncontrado = libros.find(
        (libro) => libro.id === Number(id)
    )

    if (!libroEncontrado) {
        return (
            <Container className="text-center mt-5">
                <h2 className="mb-4">Libro no encontrado</h2>

                <Link
                    to="/catalogo"
                    className="btn btn-outline-dark"
                >
                    Volver al catálogo
                </Link>
            </Container>
        )
    }

    return (
        <Container className="my-5">

            <Link
                to="/catalogo"
                className="text-decoration-none text-dark mb-4 d-inline-block"
            >
                ← Volver
            </Link>

            <Row className="align-items-center">

                <Col xs={12} md={6}>
                    <Image
                        src={libroEncontrado.imagen}
                        alt={libroEncontrado.titulo}
                        fluid
                        rounded
                        className="shadow"
                    />
                </Col>

                <Col xs={12} md={6} className="px-md-5">

                    <h1 className="fw-bold mb-3">
                        {libroEncontrado.titulo}
                    </h1>

                    <h4 className="text-muted mb-4">
                        {libroEncontrado.autor}
                    </h4>

                    <p>
                        {libroEncontrado.descripcion}
                    </p>

                    <Button
                        variant="dark"
                        size="lg"
                        className="w-100"
                    >
                        Comprar
                    </Button>

                </Col>

            </Row>

        </Container>
    )
}

export default LibroDetalle