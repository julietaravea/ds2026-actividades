import {
  Request,
  Response,
  NextFunction,
} from "express";

import { ZodType } from "zod";

export const validateParams =
  (schema: ZodType) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const resultado = schema.safeParse(req.params);

    if (!resultado.success) {
      return next(resultado.error);
    }

    next();
  };