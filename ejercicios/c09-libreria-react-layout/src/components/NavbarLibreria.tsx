import { Navbar, Container, Nav } from 'react-bootstrap'

function NavbarLibreria() {

  return (

    <Navbar className="navbar-crema">

      <Container>

        <Navbar.Brand className="tituloNavbar" href="#home">
          LIBRERÍA
        </Navbar.Brand>

        <Nav>

          <Nav.Link>
            Inicio
          </Nav.Link>

          <Nav.Link>
            Libros
          </Nav.Link>

          <Nav.Link>
            Contacto
          </Nav.Link>

        </Nav>

      </Container>

    </Navbar>

  )
}

export default NavbarLibreria