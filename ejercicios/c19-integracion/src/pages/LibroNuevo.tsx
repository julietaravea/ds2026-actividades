import { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../services/api'
import type { Libro } from '../types/libro'

function LibroNuevo() {
    const navigate = useNavigate()

    const [titulo, setTitulo] = useState('')
    const [precio, setPrecio] = useState('')
    const [autorId, setAutorId] = useState('')
    const [imagen, setImagen] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [error, setError] = useState('')
    const [cargando, setCargando] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!titulo.trim()) {
            setError('Debe ingresar un título')
            return
        }
        if (!precio || Number(precio) <= 0) {
            setError('Debe ingresar un precio válido')
            return
        }
        if (!autorId || Number(autorId) <= 0) {
            setError('Debe ingresar el ID del autor')
            return
        }

        setCargando(true)
        try {
            await apiFetch<Libro>('/libros', {
                method: 'POST',
                body: JSON.stringify({
                    titulo,
                    precio: Number(precio),
                    autorId: Number(autorId),
                    imagen: imagen || undefined,
                    descripcion: descripcion || undefined,
                }),
            })

            navigate('/catalogo')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo agregar el libro')
        } finally {
            setCargando(false)
        }
    }

    return (
        <Container className="my-5" style={{ maxWidth: '500px' }}>
            <h1 className="mb-4 text-center">Nuevo Libro</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Ingrese el título"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        placeholder="Ingrese el precio"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>ID del autor</Form.Label>
                    <Form.Control
                        type="number"
                        value={autorId}
                        onChange={(e) => setAutorId(e.target.value)}
                        placeholder="Ingrese el ID del autor existente"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Imagen (URL, opcional)</Form.Label>
                    <Form.Control
                        type="text"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                        placeholder="/imagenes/foto.jpg"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descripción (opcional)</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </Form.Group>

                <Button
                    type="submit"
                    variant="dark"
                    className="w-100"
                    disabled={cargando}
                >
                    {cargando ? 'Agregando...' : 'Agregar libro'}
                </Button>

            </Form>
        </Container>
    )
}

export default LibroNuevo