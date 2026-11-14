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
  const obtenerAutor = async (nombre: string, nacionalidad: string) =>
    (await prisma.autor.findFirst({ where: { nombre } })) ??
    (await prisma.autor.create({ data: { nombre, nacionalidad } }));

  const austen = await obtenerAutor("Jane Austen", "Británica");
  const charlotteBronte = await obtenerAutor("Charlotte Brontë", "Británica");
  const emilyBronte = await obtenerAutor("Emily Brontë", "Británica");
  const gaskell = await obtenerAutor("Elizabeth Gaskell", "Británica");
  const duMaurier = await obtenerAutor("Daphne du Maurier", "Británica");
  const shelley = await obtenerAutor("Mary Shelley", "Británica");
  const turguenev = await obtenerAutor("Iván Turguénev", "Rusa");

  // ---- CATEGORÍAS ----
  const nombresCategorias = ["Romance", "Gótico", "Clásico", "Novela"];
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
      titulo: "Orgullo y prejuicio",
      precio: 16000,
      imagen: "/imagenes/orgullo-y-prejuicio.svg",
      descripcion: "Elizabeth Bennet y el reservado señor Darcy tendrán que dejar atrás sus prejuicios antes de reconocer lo que sienten.",
      autorId: austen.id,
      categoriaNombres: ["Romance", "Clásico"],
    },
    {
      titulo: "Sensatez y sentimientos",
      precio: 15000,
      imagen: "/imagenes/sensatez-y-sentimientos.svg",
      descripcion: "Dos hermanas, una prudente y otra apasionada, enfrentan el amor y la pérdida en la Inglaterra del siglo XIX.",
      autorId: austen.id,
      categoriaNombres: ["Romance", "Clásico"],
    },
    {
      titulo: "Emma",
      precio: 15500,
      imagen: "/imagenes/emma.svg",
      descripcion: "Una joven que se cree experta en casamientos arma parejas ajenas y termina descubriendo sus propios sentimientos.",
      autorId: austen.id,
      categoriaNombres: ["Romance", "Novela"],
    },
    {
      titulo: "Persuasión",
      precio: 14500,
      imagen: "/imagenes/persuasion.svg",
      descripcion: "Años después de haber rechazado a su pretendiente, Anne Elliot vuelve a cruzarse con él.",
      autorId: austen.id,
      categoriaNombres: ["Romance", "Clásico"],
    },
    {
      titulo: "La abadía de Northanger",
      precio: 13500,
      imagen: "/imagenes/la-abadia-de-northanger.svg",
      descripcion: "Una lectora fanática de las novelas góticas imagina oscuros misterios en una antigua abadía.",
      autorId: austen.id,
      categoriaNombres: ["Gótico", "Romance"],
    },
    {
      titulo: "Jane Eyre",
      precio: 17500,
      imagen: "/imagenes/jane-eyre.svg",
      descripcion: "Una huérfana se convierte en institutriz y descubre un secreto escondido en la mansión de Thornfield.",
      autorId: charlotteBronte.id,
      categoriaNombres: ["Gótico", "Romance"],
    },
    {
      titulo: "Cumbres borrascosas",
      precio: 16500,
      imagen: "/imagenes/cumbres-borrascosas.svg",
      descripcion: "Una pasión destructiva entre Heathcliff y Catherine atraviesa los páramos de Yorkshire y dos generaciones.",
      autorId: emilyBronte.id,
      categoriaNombres: ["Gótico", "Clásico"],
    },
    {
      titulo: "Norte y sur",
      precio: 15000,
      imagen: "/imagenes/norte-y-sur.svg",
      descripcion: "Margaret, una joven del sur de Inglaterra, se enfrenta a una ciudad industrial y a un orgulloso dueño de fábrica.",
      autorId: gaskell.id,
      categoriaNombres: ["Romance", "Novela"],
    },
    {
      titulo: "Rebeca",
      precio: 16000,
      imagen: "/imagenes/rebeca.svg",
      descripcion: "La nueva señora de Manderley vive a la sombra de la primera esposa, cuyo recuerdo todavía domina la casa.",
      autorId: duMaurier.id,
      categoriaNombres: ["Gótico", "Novela"],
    },
    {
      titulo: "Frankenstein",
      precio: 13500,
      imagen: "/imagenes/frankenstein.svg",
      descripcion: "Un científico da vida a una criatura y debe enfrentar las consecuencias de haberla abandonado.",
      autorId: shelley.id,
      categoriaNombres: ["Gótico", "Clásico"],
    },
    {
      titulo: "Primer amor",
      precio: 13000,
      imagen: "/imagenes/primer-amor.svg",
      descripcion: "Un relato clásico sobre las emociones, ilusiones y desilusiones del primer amor juvenil.",
      autorId: turguenev.id,
      categoriaNombres: ["Romance", "Clásico"],
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