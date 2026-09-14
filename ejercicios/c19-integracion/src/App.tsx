import Layout from './components/Layout/Layout'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import LibroDetalle from './pages/LibroDetalle'
import LibroNuevo from './pages/LibroNuevo'
import Registro from './pages/Registro'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/libros/:id" element={<LibroDetalle />} />
                <Route path="/libros/nuevo" element={<LibroNuevo />} />
                <Route path="/registro" element={<Registro />} />
            </Routes>
        </Layout>
    )
}

export default App