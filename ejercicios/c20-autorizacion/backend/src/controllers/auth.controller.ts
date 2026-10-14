import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { JWT_EXPIRES_IN, JWT_SECRET, SALT_ROUNDS } from "../config/env";

export async function registrar(req: Request, res: Response, next: NextFunction) {
  try {
    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const usuario = await prisma.usuario.create({
      data: { nombre: req.body.nombre, email: req.body.email, passwordHash: hash },
      select: { id: true, email: true, nombre: true, rol: true },
    });
    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email: req.body.email },
      omit: { passwordHash: false },
    });
    if (!usuario) return res.status(401).json({ error: "Credenciales inválidas" });

    const coincide = await bcrypt.compare(req.body.password, usuario.passwordHash);
    if (!coincide) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.status(200).json({
      token,
      usuario: { id: usuario.id, email: usuario.email, nombre: usuario.nombre, rol: usuario.rol },
    });
  } catch (error) {
    next(error);
  }
}

export async function yo(req: Request, res: Response, next: NextFunction) {
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id: req.usuario!.id } });
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    next(error);
  }
}