import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Hero from '../components/Hero'
import LibroCard from '../components/LibroCard'

function Home() {
    return (
        <>
            <Hero />

            <Container className="text-center mb-5">
                <h2 className="subtituloDestacados my-5" style={{ color: 'var(--color-principal)' }}>
                    Destacados
                </h2>

                <Row className="g-4 justify-content-center">
                    <Col lg={2}>
                        <LibroCard
                            titulo="Coraline"
                            autor="Neil Gaiman"
                            imagen="/imagenes/coraline.webp"
                        />
                    </Col>

                    <Col lg={2}>
                        <LibroCard
                            titulo="El extranjero"
                            autor="Albert Camus"
                            imagen="/imagenes/extranjero.jpg"
                        />
                    </Col>

                    <Col lg={2}>
                        <LibroCard
                            titulo="Metamorfosis"
                            autor="Franz Kafka"
                            imagen="/imagenes/metamorfosis.webp"
                        />
                    </Col>

                    <Col lg={2}>
                        <LibroCard
                            titulo="Primer Amor"
                            autor="Iván Turguénev"
                            imagen="/imagenes/ivan.webp"
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home