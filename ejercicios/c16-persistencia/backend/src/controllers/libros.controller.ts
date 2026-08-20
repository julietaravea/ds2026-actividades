import { Request, Response } from 'express'

import {
  getLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro
} from '../services/libros.service'

export const obtenerLibros = async (req: Request, res: Response) => {
  const libros = await getLibros()

  res.json(libros)
}

export const obtenerLibro = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const libro = await getLibroById(id)

  if (!libro) {
    return res.status(404).json({
      error: 'Libro no encontrado'
    })
  }

  res.json(libro)
}

export const crearLibro = async (req: Request, res: Response) => {
  const libro = await createLibro(req.body)

  res.status(201).json(libro)
}

export const modificarLibro = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const libro = await updateLibro(id, req.body)

    res.json(libro)
  } catch {
    res.status(404).json({
      error: 'Libro no encontrado'
    })
  }
}

export const eliminarLibro = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    await deleteLibro(id)

    res.status(204).send()
  } catch {
    res.status(404).json({
      error: 'Libro no encontrado'
    })
  }
}