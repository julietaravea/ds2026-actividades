import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NavbarLibreria() {

  return (

    <Navbar className="navbar-crema">

      <Container>

        <Navbar.Brand className="tituloNavbar" href="#home">
          LIBRERÍA
        </Navbar.Brand>

        <Nav>
        <Nav.Link as={Link} to="/">
         Inicio
        </Nav.Link>

        <Nav.Link as={Link} to="/catalogo">
         Catálogo
        </Nav.Link>

      </Nav>

      </Container>

    </Navbar>

  )
}

export default NavbarLibreria