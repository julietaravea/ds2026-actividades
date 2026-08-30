import { Request, Response } from "express";

import {
  findAll,
  findById,
  create,
  update,
  remove,
} from "../services/autores.service";

export const obtenerAutores = async (
  _req: Request,
  res: Response
) => {
  const autores = await findAll();

  res.json(autores);
};

export const obtenerAutor = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const autor = await findById(id);

  if (!autor) {
    return res.status(404).json({
      error: "Autor no encontrado",
    });
  }

  res.json(autor);
};

export const crearAutor = async (
  req: Request,
  res: Response
) => {
  const autor = await create(req.body);

  res.status(201).json(autor);
};

export const actualizarAutor = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const autor = await update(id, req.body);

  res.json(autor);
};

export const eliminarAutor = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  await remove(id);

  res.status(204).send();
};