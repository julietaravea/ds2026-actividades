import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export function validateParams(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.params);
    if (!resultado.success) {
      return res.status(400).json({
        error: "Parámetros inválidos",
        detalles: resultado.error.issues.map((i) => i.message),
      });
    }
    req.params = resultado.data as any;
    next();
  };
}