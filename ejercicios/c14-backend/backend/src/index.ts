import express from "express"

const app = express()

const libros = [
  {
    id: 1,
    titulo: 'Coraline',
    autor: 'Neil Gaiman',
    imagen: '/imagenes/coraline.webp'
  },
  {
    id: 2,
    titulo: 'El extranjero',
    autor: 'Albert Camus',
    imagen: '/imagenes/extranjero.jpg'
  },
  {
    id: 3,
    titulo: 'Metamorfosis',
    autor: 'Franz Kafka',
    imagen: '/imagenes/metamorfosis.webp'
  },
  {
    id: 4,
    titulo: 'Primer Amor',
    autor: 'Iván Turguénev',
    imagen: '/imagenes/ivan.webp'
  }
]

app.get('/libros', (req, res) => {
  res.json(libros)
})

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000')
})