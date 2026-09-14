import { useState } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { obtenerSesion, cerrarSesion } from '../services/sesion'
import LoginModal from './LoginModal'

function NavbarLibreria() {
  const navigate = useNavigate()
  const sesion = obtenerSesion()
  const [showLogin, setShowLogin] = useState(false)

  const handleCerrarSesion = () => {
    cerrarSesion()
    window.location.href = '/'
  }

  return (
    <>
      <Navbar className="navbar-crema" expand="lg">
        <Container className="d-flex align-items-center">

          <Navbar.Brand className="tituloNavbar" as={Link} to="/">
            LIBRERÍA
          </Navbar.Brand>

          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>

            <Nav.Link as={Link} to="/catalogo">
              Catálogo
            </Nav.Link>

            <Nav.Link as={Link} to="/libros/nuevo">
              Nuevo Libro
            </Nav.Link>
          </Nav>

          <div className="d-flex gap-2">
            {sesion ? (
          <Button
           variant="link"
           className="text-white text-decoration-none"
           onClick={handleCerrarSesion}
          >
            Cerrar sesión ({sesion.usuario.nombre})
          </Button>
            ) : (
              <>
              <Button
               variant="link"
               className="text-white text-decoration-none"
                onClick={() => setShowLogin(true)}
              >
               Iniciar sesión
             </Button>

               <Button
                variant="link"
                className="text-white text-decoration-none"
               onClick={() => navigate('/registro')}
              >
               Registrarse
              </Button>
            </>
            )}
          </div>

        </Container>
      </Navbar>

      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  )
}

export default NavbarLibreria