import { Router } from "express";

import {
  obtenerLibros,
  obtenerLibro,
  crearLibro,
  modificarLibro,
  eliminarLibro,
} from "../controllers/libros.controller";

import { validate } from "../middlewares/validate";
import { validateParams } from "../middlewares/validateParams";

import {
  libroCreateSchema,
  libroUpdateSchema,
} from "../validations/libro.validation";

import { idParamSchema } from "../validations/params.validation";

const router = Router();

// GET /api/libros
router.get("/", obtenerLibros);

// GET /api/libros/:id
router.get(
  "/:id",
  validateParams(idParamSchema),
  obtenerLibro
);

// POST /api/libros
router.post(
  "/",
  validate(libroCreateSchema),
  crearLibro
);

// PUT /api/libros/:id
router.put(
  "/:id",
  validateParams(idParamSchema),
  validate(libroUpdateSchema),
  modificarLibro
);

// DELETE /api/libros/:id
router.delete(
  "/:id",
  validateParams(idParamSchema),
  eliminarLibro
);

export default router;