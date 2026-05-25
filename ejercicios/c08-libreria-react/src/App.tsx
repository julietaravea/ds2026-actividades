import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavbarLibreria from './components/NavbarLibreria.tsx'
import Hero from './components/Hero.tsx'
import LibroCard from './components/LibroCard.tsx'
import Footer from './components/Footer.tsx'
import './App.css'

function App() {

    return (
        <>
            <NavbarLibreria />

            <Hero />
            
            <Container className="text-center">
                <h2 className="subtituloDestacados my-5"> Destacados </h2>
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

            <Footer />
        </>
    )
}

export default App