import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";

async function main() {
  // ---- USUARIOS ----
  const usuarios = [
    { email: "admin@libreria.test", nombre: "Admin", rol: "ADMIN" as const, password: "Admin1234" },
    { email: "cliente@libreria.test", nombre: "Cliente", rol: "CLIENTE" as const, password: "Cliente1234" },
  ];

  for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({
      where: { email: datos.email },
      update: {},
      create: { ...datos, passwordHash: await bcrypt.hash(password, 10) },
    });
  }

  // ---- AUTORES ----
  const neilGaiman = await prisma.autor.upsert({
    where: { id: 1 },
    update: {},
    create: { nombre: "Neil Gaiman", nacionalidad: "Británica" },
  });

  const albertCamus = await prisma.autor.upsert({
    where: { id: 2 },
    update: {},
    create: { nombre: "Albert Camus", nacionalidad: "Francesa" },
  });

  const franzKafka = await prisma.autor.upsert({
    where: { id: 3 },
    update: {},
    create: { nombre: "Franz Kafka", nacionalidad: "Checa" },
  });

  const ivanTurguenev = await prisma.autor.upsert({
    where: { id: 4 },
    update: {},
    create: { nombre: "Iván Turguénev", nacionalidad: "Rusa" },
  });

  // ---- CATEGORÍAS ----
  const nombresCategorias = ["Fantasía", "Terror", "Novela", "Existencialismo", "Clásico"];
  const categorias: Record<string, { id: number }> = {};
  for (const nombre of nombresCategorias) {
    categorias[nombre] = await prisma.categoria.upsert({
      where: { nombre },
      update: {},
      create: { nombre },
    });
  }

  // ---- LIBROS ----
  const libros = [
    {
      titulo: "Coraline",
      precio: 15000,
      imagen: "/imagenes/coraline.webp",
      descripcion: "Una niña descubre una puerta secreta hacia un mundo paralelo tan fascinante como peligroso.",
      autorId: neilGaiman.id,
      categoriaNombres: ["Fantasía", "Terror"],
    },
    {
      titulo: "El extranjero",
      precio: 14000,
      imagen: "/imagenes/extranjero.jpg",
      descripcion: "Una novela existencialista que explora el absurdo de la vida a través de su protagonista, Meursault.",
      autorId: albertCamus.id,
      categoriaNombres: ["Novela", "Existencialismo"],
    },
    {
      titulo: "Metamorfosis",
      precio: 12000,
      imagen: "/imagenes/metamorfosis.webp",
      descripcion: "Gregor Samsa despierta transformado en un insecto gigante, cambiando para siempre su vida y la de su familia.",
      autorId: franzKafka.id,
      categoriaNombres: ["Clásico", "Novela"],
    },
    {
      titulo: "Primer Amor",
      precio: 13000,
      imagen: "/imagenes/ivan.webp",
      descripcion: "Un relato clásico sobre las emociones, ilusiones y desilusiones del primer amor juvenil.",
      autorId: ivanTurguenev.id,
      categoriaNombres: ["Clásico", "Novela"],
    },
  ];

  for (const { categoriaNombres, ...datos } of libros) {
    const existente = await prisma.libro.findFirst({ where: { titulo: datos.titulo } });
    if (!existente) {
      await prisma.libro.create({
        data: {
          ...datos,
          categorias: { connect: categoriaNombres.map((nombre) => ({ id: categorias[nombre].id })) },
        },
      });
    }
  }

  console.log("Seed completo");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });