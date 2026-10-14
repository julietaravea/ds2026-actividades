import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Spinner, Alert } from 'react-bootstrap'

import Hero from '../components/Hero'
import LibroCard from '../components/LibroCard'

import { apiFetch } from '../services/api'
import type { Libro } from '../types/libro'

function Home() {
    const [libros, setLibros] = useState<Libro[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        apiFetch<Libro[]>('/libros')
            .then(setLibros)
            .catch((e) => setError(e.message))
            .finally(() => setCargando(false))
    }, [])

    return (
        <>
            <Hero />

            <Container className="text-center mb-5">

                <h2
                    className="subtituloDestacados my-5"
                    style={{ color: 'var(--color-principal)' }}
                >
                    Destacados
                </h2>

                {cargando && <div className="text-center mb-4"><Spinner animation="border" /></div>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Row className="g-4 justify-content-center">

                    {libros.slice(0, 4).map((libro) => (
                        <Col md={4} lg={3} key={libro.id}>
                            <LibroCard
                                id={libro.id}
                                titulo={libro.titulo}
                                autor={libro.autor.nombre}
                                imagen={libro.imagen ?? ''}
                            />
                        </Col>
                    ))}

                </Row>

            </Container>
        </>
    )
}

export default Home