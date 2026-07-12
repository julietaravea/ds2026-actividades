import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'

type LibroCardProps = {
    id: number
    titulo: string
    autor: string
    imagen: string
    mostrarLike?: boolean
}

function LibroCard({
    id,
    titulo,
    autor,
    imagen,
    mostrarLike = true
}: LibroCardProps) {

    const [like, setLike] = useState(false)

    return (
        <Card className="text-center h-100 shadow-sm">
            <Card.Img
              variant="top"
              src={imagen}
               style={{
             height: '300px',
                objectFit: 'cover'
          }}
            />

            <Card.Body>

                <Card.Title>
                    {titulo}
                </Card.Title>

                <Card.Text>
                    {autor}
                </Card.Text>

            </Card.Body>

            <div className="d-flex flex-column gap-2 align-items-center mb-3">

                <Button
                    variant="dark"
                    as={Link}
                    to={`/libros/${id}`}
                >
                    Ver más
                </Button>

                {mostrarLike && (
                    <Button
                        variant={like ? "danger" : "outline-danger"}
                        onClick={() => setLike(!like)}
                    >
                        ♡ Me gusta
                    </Button>
                )}

            </div>

        </Card>
    )
}

export default LibroCard