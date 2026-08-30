import { Request, Response } from "express";

import {
  findAll,
  findById,
  create,
  update,
  remove,
} from "../services/libros.service";

export const obtenerLibros = async (
  req: Request,
  res: Response
) => {
  const disponible =
    req.query.disponible !== undefined
      ? req.query.disponible === "true"
      : undefined;

  const libros = await findAll(disponible);

  res.json(libros);
};

export const obtenerLibro = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const libro = await findById(id);

  if (!libro) {
    return res.status(404).json({
      error: "Libro no encontrado",
    });
  }

  res.json(libro);
};

export const crearLibro = async (
  req: Request,
  res: Response
) => {
  const libro = await create(req.body);

  res.status(201).json(libro);
};

export const modificarLibro = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const libro = await update(id, req.body);

  res.json(libro);
};

export const eliminarLibro = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  await remove(id);

  res.status(204).send();
};