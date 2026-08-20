import { prisma } from '../config/prisma'

export const getAutores = async () => {
  return prisma.autor.findMany()
}

export const getAutorById = async (id: number) => {
  return prisma.autor.findUnique({
    where: { id }
  })
}

export const createAutor = async (data: {
  nombre: string
  nacionalidad: string
}) => {
  return prisma.autor.create({
    data
  })
}

export const updateAutor = async (
  id: number,
  data: {
    nombre?: string
    nacionalidad?: string
  }
) => {
  return prisma.autor.update({
    where: { id },
    data
  })
}

export const deleteAutor = async (id: number) => {
  return prisma.autor.delete({
    where: { id }
  })
}