import type { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";

export async function obtenerAutores(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await prisma.autor.findMany());
  } catch (error) {
    next(error);
  }
}

export async function obtenerAutor(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params as unknown as { id: number };
    res.json(await prisma.autor.findUniqueOrThrow({ where: { id } }));
  } catch (error) {
    next(error);
  }
}

export async function crearAutor(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(201).json(await prisma.autor.create({ data: req.body }));
  } catch (error) {
    next(error);
  }
}

export async function actualizarAutor(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params as unknown as { id: number };
    res.json(await prisma.autor.update({ where: { id }, data: req.body }));
  } catch (error) {
    next(error);
  }
}

export async function eliminarAutor(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params as unknown as { id: number };
    await prisma.autor.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}