import { Request, Response } from 'express'
import { getLibros } from '../services/libros.service'

export const obtenerLibros = (req: Request, res: Response) => {
  res.json(getLibros())
}