import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Hero from '../components/Hero'
import LibroCard from '../components/LibroCard'

import { libros } from '../types/libro'

function Home() {
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

                <Row className="g-4 justify-content-center">

                    {libros.map((libro) => (
                        <Col md={4} lg={3} key={libro.id}>
                            <LibroCard
                                id={libro.id}
                                titulo={libro.titulo}
                                autor={libro.autor}
                                imagen={libro.imagen}
                            />
                        </Col>
                    ))}

                </Row>

            </Container>
        </>
    )
}

export default Home