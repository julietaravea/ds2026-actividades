import { useState } from 'react'
import Layout from './components/Layout/Layout'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import LibroDetalle from './pages/LibroDetalle'
import LibroNuevo from './pages/LibroNuevo'

import { libros as librosIniciales } from './types/libro'

function App() {

    const [libros, setLibros] = useState(librosIniciales)

    const agregarLibro = (nuevoLibro: any) => {
        setLibros([...libros, nuevoLibro])
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/catalogo"
                    element={<Catalogo libros={libros} />}
                />

                <Route
                    path="/libros/:id"
                    element={<LibroDetalle />}
                />

                <Route
                    path="/libros/nuevo"
                    element={<LibroNuevo onAgregar={agregarLibro} />}
                />
            </Routes>
        </Layout>
    )
}

export default App