import { Router } from 'express'

import {
  obtenerLibros,
  obtenerLibro,
  crearLibro,
  modificarLibro,
  eliminarLibro
} from '../controllers/libros.controller'

const router = Router()

router.get('/', obtenerLibros)
router.get('/:id', obtenerLibro)
router.post('/', crearLibro)
router.put('/:id', modificarLibro)
router.delete('/:id', eliminarLibro)

export default router