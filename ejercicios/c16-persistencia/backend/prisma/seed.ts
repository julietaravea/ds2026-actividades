import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.autor.createMany({
    data: [
      {
        nombre: "Neil Gaiman",
        nacionalidad: "Reino Unido",
      },
      {
        nombre: "Albert Camus",
        nacionalidad: "Francia",
      },
      {
        nombre: "Franz Kafka",
        nacionalidad: "Chequia",
      },
      {
        nombre: "Iván Turguénev",
        nacionalidad: "Rusia",
      },
    ],
  });

  await prisma.libro.createMany({
    data: [
      {
        titulo: "Coraline",
        autor: "Neil Gaiman",
        precio: 15000,
        imagen: "/imagenes/coraline.webp",
        descripcion:
          "Una niña descubre una puerta secreta hacia un mundo paralelo tan fascinante como peligroso.",
        disponible: true,
      },
      {
        titulo: "El extranjero",
        autor: "Albert Camus",
        precio: 12000,
        imagen: "/imagenes/extranjero.jpg",
        descripcion:
          "Una novela existencialista que explora el absurdo de la vida a través de su protagonista, Meursault.",
        disponible: true,
      },
      {
        titulo: "Metamorfosis",
        autor: "Franz Kafka",
        precio: 13000,
        imagen: "/imagenes/metamorfosis.webp",
        descripcion:
          "Gregor Samsa despierta transformado en un insecto gigante, cambiando para siempre su vida y la de su familia.",
        disponible: true,
      },
      {
        titulo: "Primer Amor",
        autor: "Iván Turguénev",
        precio: 11000,
        imagen: "/imagenes/ivan.webp",
        descripcion:
          "Un relato clásico sobre las emociones, ilusiones y desilusiones del primer amor juvenil.",
        disponible: true,
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });