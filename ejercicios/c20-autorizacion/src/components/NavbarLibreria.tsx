import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavbarLibreria() {
  const { usuario, logout, tieneRol } = useAuth();
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar className="navbar-crema" expand="lg">
      <Container className="d-flex align-items-center">
        <Navbar.Brand className="tituloNavbar" as={Link} to="/">
          LIBRERÍA
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-libreria" />

        <Navbar.Collapse id="navbar-libreria">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>

            {tieneRol('ADMIN') && (
              <Nav.Link as={Link} to="/libros/nuevo">
                Nuevo Libro
              </Nav.Link>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-2">
            {usuario ? (
              <>
                <span className="text-white">
                  {usuario.nombre} ({usuario.rol})
                </span>

                <Button
                  variant="link"
                  className="text-white text-decoration-none"
                  onClick={handleCerrarSesion}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="link"
                  className="text-white text-decoration-none"
                  onClick={() => navigate('/login')}
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarLibreria;