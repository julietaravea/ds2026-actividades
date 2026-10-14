import { Router } from "express";
import { registrar, login, yo } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { loginSchema, registroSchema } from "../validations/auth.validation";

const router = Router();

router.post("/registro", validate(registroSchema), registrar);
router.post("/login", validate(loginSchema), login);
router.get("/yo", authenticate, yo);

export default router;