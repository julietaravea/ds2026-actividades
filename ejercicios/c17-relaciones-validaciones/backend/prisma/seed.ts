import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // AUTORES

  const neilGaiman = await prisma.autor.create({
    data: {
      nombre: "Neil Gaiman",
      nacionalidad: "Británica",
    },
  });

  const albertCamus = await prisma.autor.create({
    data: {
      nombre: "Albert Camus",
      nacionalidad: "Francesa",
    },
  });

  const franzKafka = await prisma.autor.create({
    data: {
      nombre: "Franz Kafka",
      nacionalidad: "Checa",
    },
  });

  const ivanTurguenev = await prisma.autor.create({
    data: {
      nombre: "Iván Turguénev",
      nacionalidad: "Rusa",
    },
  });

  // CATEGORÍAS

  const fantasia = await prisma.categoria.create({
    data: {
      nombre: "Fantasía",
    },
  });

  const terror = await prisma.categoria.create({
    data: {
      nombre: "Terror",
    },
  });

  const novela = await prisma.categoria.create({
    data: {
      nombre: "Novela",
    },
  });

  const existencialismo = await prisma.categoria.create({
    data: {
      nombre: "Existencialismo",
    },
  });

  const clasico = await prisma.categoria.create({
    data: {
      nombre: "Clásico",
    },
  });

  // LIBROS

  await prisma.libro.create({
    data: {
      titulo: "Coraline",
      precio: 15000,
      imagen: "/imagenes/coraline.webp",
      descripcion:
        "Una niña descubre una puerta secreta hacia un mundo paralelo tan fascinante como peligroso.",
      autor: {
        connect: {
          id: neilGaiman.id,
        },
      },
      categorias: {
        connect: [
          { id: fantasia.id },
          { id: terror.id },
        ],
      },
    },
  });

  await prisma.libro.create({
    data: {
      titulo: "El extranjero",
      precio: 14000,
      imagen: "/imagenes/extranjero.jpg",
      descripcion:
        "Una novela existencialista que explora el absurdo de la vida a través de su protagonista, Meursault.",
      autor: {
        connect: {
          id: albertCamus.id,
        },
      },
      categorias: {
        connect: [
          { id: novela.id },
          { id: existencialismo.id },
        ],
      },
    },
  });

  await prisma.libro.create({
    data: {
      titulo: "Metamorfosis",
      precio: 12000,
      imagen: "/imagenes/metamorfosis.webp",
      descripcion:
        "Gregor Samsa despierta transformado en un insecto gigante, cambiando para siempre su vida y la de su familia.",
      autor: {
        connect: {
          id: franzKafka.id,
        },
      },
      categorias: {
        connect: [
          { id: clasico.id },
          { id: novela.id },
        ],
      },
    },
  });

  await prisma.libro.create({
    data: {
      titulo: "Primer Amor",
      precio: 13000,
      imagen: "/imagenes/ivan.webp",
      descripcion:
        "Un relato clásico sobre las emociones, ilusiones y desilusiones del primer amor juvenil.",
      autor: {
        connect: {
          id: ivanTurguenev.id,
        },
      },
      categorias: {
        connect: [
          { id: clasico.id },
          { id: novela.id },
        ],
      },
    },
  });

  console.log("Seed ejecutado correctamente");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });