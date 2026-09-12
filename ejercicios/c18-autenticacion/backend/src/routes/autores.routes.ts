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
import { autorCreateSchema, autorUpdateSchema } from "../validations/autor.validation";
import { idParamSchema } from "../validations/params.validation";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

// GET /api/autores — público
router.get("/", obtenerAutores);

// GET /api/autores/:id — público
router.get("/:id", validateParams(idParamSchema), obtenerAutor);

// POST /api/autores — solo ADMIN
router.post("/", authenticate, authorize("ADMIN"), validate(autorCreateSchema), crearAutor);

// PUT /api/autores/:id — solo ADMIN
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  validate(autorUpdateSchema),
  actualizarAutor
);

// DELETE /api/autores/:id — solo ADMIN
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), eliminarAutor);

export default router;