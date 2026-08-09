import { Request, Response } from 'express'
import * as autoresService from '../services/autores.service'

export const obtenerAutores = (req: Request, res: Response) => {
  res.json(autoresService.getAutores())
}

export const obtenerAutor = (req: Request, res: Response) => {
  const autor = autoresService.getAutorById(Number(req.params.id))

  if (!autor) {
    return res.status(404).json({ error: 'Autor no encontrado' })
  }

  res.json(autor)
}

export const crearAutor = (req: Request, res: Response) => {
  const nuevo = autoresService.createAutor(req.body)
  res.status(201).json(nuevo)
}

export const actualizarAutor = (req: Request, res: Response) => {
  const autor = autoresService.updateAutor(Number(req.params.id), req.body)

  if (!autor) {
    return res.status(404).json({ error: 'Autor no encontrado' })
  }

  res.json(autor)
}

export const eliminarAutor = (req: Request, res: Response) => {
  const ok = autoresService.deleteAutor(Number(req.params.id))

  if (!ok) {
    return res.status(404).json({ error: 'Autor no encontrado' })
  }

  res.status(204).send()
}