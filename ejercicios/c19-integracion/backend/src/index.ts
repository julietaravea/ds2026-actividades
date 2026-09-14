import express from "express";
import cors from "cors";
import librosRouter from "./routes/libros.routes";
import autoresRouter from "./routes/autores.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

const corsOptions = {
  origin: [process.env.FRONTEND_URL ?? "http://localhost:5173"],
};

app.use(cors(corsOptions)); // ANTES de json() y de las rutas
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/libros", librosRouter);
app.use("/api/autores", autoresRouter);

// Middleware 404 en JSON, DESPUÉS de las rutas y ANTES del errorHandler
app.use((req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});