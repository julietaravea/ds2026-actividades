import type { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";

export async function obtenerLibros(req: Request, res: Response, next: NextFunction) {
  try {
    const libros = await prisma.libro.findMany({ include: { autor: true, categorias: true } });
    res.json(libros);
  } catch (error) {
    next(error);
  }
}

export async function obtenerLibro(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params as unknown as { id: number };
    const libro = await prisma.libro.findUniqueOrThrow({
      where: { id },
      include: { autor: true, categorias: true },
    });
    res.json(libro);
  } catch (error) {
    next(error);
  }
}

export async function crearLibro(req: Request, res: Response, next: NextFunction) {
  try {
    const { autorId, categoriaIds, ...datos } = req.body;
    const libro = await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { id: autorId } },
        categorias: categoriaIds ? { connect: categoriaIds.map((id: number) => ({ id })) } : undefined,
      },
    });
    res.status(201).json(libro);
  } catch (error) {
    next(error);
  }
}

export async function modificarLibro(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params as unknown as { id: number };
    const { autorId, categoriaIds, ...datos } = req.body;
    const libro = await prisma.libro.update({
      where: { id },
      data: {
        ...datos,
        ...(autorId ? { autor: { connect: { id: autorId } } } : {}),
        ...(categoriaIds ? { categorias: { set: categoriaIds.map((id: number) => ({ id })) } } : {}),
      },
    });
    res.json(libro);
  } catch (error) {
    next(error);
  }
}

export async function eliminarLibro(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params as unknown as { id: number };
    await prisma.libro.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}