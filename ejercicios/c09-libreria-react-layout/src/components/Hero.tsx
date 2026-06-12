import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <section className="hero">
            <Container className="text-center py-5">
                <h1 className="tituloHero subtituloDestacados"> ¡Bienvenidos! </h1>

                <h2 className="subtituloHero"> Los mejores clásicos de la literatura</h2>

                <Button variant="outline-light" as={Link} to="/catalogo">
                    Accedé a nuestro catálogo
                </Button>
            </Container>
        </section>
    )
}

export default Hero