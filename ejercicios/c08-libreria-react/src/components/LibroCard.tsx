import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

type LibroCardProps = {
    titulo: string
    autor: string
    imagen: string
}
function LibroCard({
    titulo,
    autor,
    imagen,
}: LibroCardProps) {

    const [like, setLike] = useState(false)

    return (

        <Card className="h-100 shadow-sm">

            <Card.Img
                variant="top"
                src={imagen}
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

                <Button variant="dark">
                Ver más
                </Button>

                <Button
                 variant={like ? "danger" : "outline-danger"}
                onClick={() => setLike(!like)}>               
                {like ? "♡ Me gusta" : "♡ Me gusta"}
                </Button>

            </div>

        </Card>

    )
}

export default LibroCard