import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Image, Spinner, Alert } from 'react-bootstrap'
import { apiFetch } from '../services/api'
import type { Libro } from '../types/libro'

function LibroDetalle() {
    const { id } = useParams()
    const [libro, setLibro] = useState<Libro | null>(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        apiFetch<Libro>(`/libros/${id}`)
            .then(setLibro)
            .catch((e) => setError(e.message))
            .finally(() => setCargando(false))
    }, [id])

    if (cargando) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
            </Container>
        )
    }

    if (error || !libro) {
        return (
            <Container className="text-center mt-5">
                <h2 className="mb-4">Libro no encontrado</h2>
                {error && <Alert variant="danger">{error}</Alert>}

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
                        src={libro.imagen}
                        alt={libro.titulo}
                        fluid
                        rounded
                        className="shadow"
                    />
                </Col>

                <Col xs={12} md={6} className="px-md-5">

                    <h1 className="fw-bold mb-3">
                        {libro.titulo}
                    </h1>

                    <h4 className="text-muted mb-4">
                        {libro.autor.nombre}
                    </h4>

                    <p>
                        {libro.descripcion}
                    </p>

                    <p className="fw-bold fs-4">
                        ${libro.precio}
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