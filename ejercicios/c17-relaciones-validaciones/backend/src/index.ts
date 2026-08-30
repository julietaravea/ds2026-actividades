import express from "express";

import librosRouter from "./routes/libros.routes";
import autoresRouter from "./routes/autores.routes";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/libros", librosRouter);

app.use("/api/autores", autoresRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});