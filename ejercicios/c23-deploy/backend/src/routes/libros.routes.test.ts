import request from "supertest";
import jwt from "jsonwebtoken";
import { it, expect } from "vitest";
import app from "../app";
import { JWT_SECRET } from "../config/env";

const libroNuevo = { titulo: "Bestiario", precio: 9000, imagen: "/imagenes/b.jpg", autorId: 1 };

const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });

it("sin token → 401", async () => {
  const res = await request(app).post("/api/libros").send(libroNuevo);
  expect(res.status).toBe(401);
});

it("con token de CLIENTE → 403", async () => {
  const res = await request(app)
    .post("/api/libros")
    .set("Authorization", `Bearer ${tokenCliente}`)
    .send(libroNuevo);
  expect(res.status).toBe(403);
});

it("ADMIN con body inválido → 400, no 403", async () => {
  const res = await request(app)
    .post("/api/libros")
    .set("Authorization", `Bearer ${tokenAdmin}`)
    .send({ precio: -5 });
  expect(res.status).toBe(400);
  expect(res.body.detalles).toContain("El precio debe ser mayor a 0");
});

it("ruta inexistente → 404 en JSON", async () => {
  const res = await request(app).get("/api/no-existe");
  expect(res.status).toBe(404);
  expect(res.body).toHaveProperty("error");
});