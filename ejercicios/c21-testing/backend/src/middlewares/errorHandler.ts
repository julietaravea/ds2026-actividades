import type { NextFunction, Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Ya existe un registro con ese valor" });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Registro no encontrado" });
    }
  }
  console.error(err);
  return res.status(500).json({ error: "Error interno del servidor" });
}