import { Router } from 'express'
import {
  obtenerAutores,
  obtenerAutor,
  crearAutor,
  actualizarAutor,
  eliminarAutor
} from '../controllers/autores.controller'

const router = Router()

router.get('/', obtenerAutores)
router.get('/:id', obtenerAutor)
router.post('/', crearAutor)
router.put('/:id', actualizarAutor)
router.delete('/:id', eliminarAutor)

export default router