import { z } from "zod";

export const libroCreateSchema = z.object({
  titulo: z.string().trim().min(1, "El título es obligatorio"),
  precio: z.number().positive("El precio debe ser mayor a 0"),
  imagen: z.string().optional(),
  descripcion: z.string().optional(),
  autorId: z.number().int().positive("autorId es obligatorio"),
  categoriaIds: z.array(z.number().int().positive()).optional(),
});

export const libroUpdateSchema = libroCreateSchema.partial();