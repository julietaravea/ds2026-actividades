import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle';
import LibroNuevo from './pages/LibroNuevo';
import Registro from './pages/Registro';
import Login from './pages/Login';
import SinPermiso from './pages/SinPermiso';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sin-permiso" element={<SinPermiso />} />

        <Route element={<PrivateRoute rol="ADMIN" />}>
          <Route path="/libros/nuevo" element={<LibroNuevo />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;