import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

type Props = {
    onAgregar: (libro: any) => void
}

function LibroNuevo({ onAgregar }: Props) {

    const navigate = useNavigate()

    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!titulo.trim()) {
            alert('Debe ingresar un título')
            return
        }

        if (!autor.trim()) {
            alert('Debe ingresar un autor')
            return
        }

        const nuevoLibro = {
            id: Date.now(),
            titulo,
            autor,
            imagen: '/imagenes/foto.jpg',
            descripcion: 'Libro agregado desde el formulario'
        }

        onAgregar(nuevoLibro)

        setTitulo('')
        setAutor('')

        navigate('/catalogo')
    }

    return (
        <Container className="my-5" style={{ maxWidth: '500px' }}>
            <h1 className="mb-4 text-center">Nuevo Libro</h1>

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
                    <Form.Label>Autor</Form.Label>
                    <Form.Control
                        type="text"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        placeholder="Ingrese el autor"
                    />
                </Form.Group>

                <Button
                    type="submit"
                    variant="dark"
                    className="w-100"
                >
                    Agregar libro
                </Button>

            </Form>
        </Container>
    )
}

export default LibroNuevo