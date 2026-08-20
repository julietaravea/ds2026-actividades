import { Request, Response } from 'express'

import * as autoresService from '../services/autores.service'

export const obtenerAutores = async (req: Request, res: Response) => {
  const autores = await autoresService.getAutores()

  res.json(autores)
}

export const obtenerAutor = async (req: Request, res: Response) => {
  const autor = await autoresService.getAutorById(
    Number(req.params.id)
  )

  if (!autor) {
    return res.status(404).json({
      error: 'Autor no encontrado'
    })
  }

  res.json(autor)
}

export const crearAutor = async (req: Request, res: Response) => {
  const nuevo = await autoresService.createAutor(req.body)

  res.status(201).json(nuevo)
}

export const actualizarAutor = async (req: Request, res: Response) => {
  try {
    const autor = await autoresService.updateAutor(
      Number(req.params.id),
      req.body
    )

    res.json(autor)
  } catch {
    res.status(404).json({
      error: 'Autor no encontrado'
    })
  }
}

export const eliminarAutor = async (req: Request, res: Response) => {
  try {
    await autoresService.deleteAutor(Number(req.params.id))

    res.status(204).send()
  } catch {
    res.status(404).json({
      error: 'Autor no encontrado'
    })
  }
}