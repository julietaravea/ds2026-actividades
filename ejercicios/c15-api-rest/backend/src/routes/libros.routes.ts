import { Router } from 'express'
import { obtenerLibros } from '../controllers/libros.controller'

const router = Router()

router.get('/', obtenerLibros)

export default router