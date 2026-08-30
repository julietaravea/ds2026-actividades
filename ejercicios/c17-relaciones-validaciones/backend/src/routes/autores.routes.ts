import { Router } from "express";

import {
  obtenerAutores,
  obtenerAutor,
  crearAutor,
  actualizarAutor,
  eliminarAutor,
} from "../controllers/autores.controller";

import { validate } from "../middlewares/validate";
import { validateParams } from "../middlewares/validateParams";

import {
  autorCreateSchema,
  autorUpdateSchema,
} from "../validations/autor.validation";

import { idParamSchema } from "../validations/params.validation";

const router = Router();

// GET /api/autores
router.get("/", obtenerAutores);

// GET /api/autores/:id
router.get(
  "/:id",
  validateParams(idParamSchema),
  obtenerAutor
);

// POST /api/autores
router.post(
  "/",
  validate(autorCreateSchema),
  crearAutor
);

// PUT /api/autores/:id
router.put(
  "/:id",
  validateParams(idParamSchema),
  validate(autorUpdateSchema),
  actualizarAutor
);

// DELETE /api/autores/:id
router.delete(
  "/:id",
  validateParams(idParamSchema),
  eliminarAutor
);

export default router;