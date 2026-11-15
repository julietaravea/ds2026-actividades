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
import { libroCreateSchema, libroUpdateSchema } from "../validations/libro.validation";
import { idParamSchema } from "../validations/params.validation";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

// GET /api/libros — público
router.get("/", obtenerLibros);

// GET /api/libros/:id — público
router.get("/:id", validateParams(idParamSchema), obtenerLibro);

// POST /api/libros — solo ADMIN
router.post("/", authenticate, authorize("ADMIN"), validate(libroCreateSchema), crearLibro);

// PUT /api/libros/:id — solo ADMIN
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  validate(libroUpdateSchema),
  modificarLibro
);

// DELETE /api/libros/:id — solo ADMIN
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), eliminarLibro);

export default router;