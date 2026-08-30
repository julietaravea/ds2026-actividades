import {
  Request,
  Response,
  NextFunction,
} from "express";

import { ZodError } from "zod";

import { Prisma } from "../generated/prisma/client";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // ERROR DE VALIDACIÓN → 400

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Datos inválidos",

      detalles: err.issues.map((i) => ({
        campo: i.path.join("."),
        mensaje: i.message,
      })),
    });
  }

  // ERRORES DE PRISMA

  if (
    err instanceof Prisma.PrismaClientKnownRequestError
  ) {
    switch (err.code) {
      // P2002 → dato duplicado
      case "P2002":
        return res.status(409).json({
          error:
            "Ya existe un registro con esos datos",
        });

      // P2025 → registro no encontrado
      case "P2025":
        return res.status(404).json({
          error: "Registro no encontrado",
        });

      // P2003 → referencia inválida
      case "P2003":
        return res.status(400).json({
          error: "Referencia inválida",
        });
    }
  }

  console.error(err);

  return res.status(500).json({
    error: "Error interno del servidor",
  });
};