import { prisma } from '../config/prisma'

export const getLibros = async () => {
  return prisma.libro.findMany()
}

export const getLibroById = async (id: number) => {
  return prisma.libro.findUnique({
    where: { id }
  })
}

export const createLibro = async (data: {
  titulo: string
  autor: string
  precio: number
  imagen: string
  descripcion: string
  disponible?: boolean
}) => {
  return prisma.libro.create({
    data
  })
}

export const updateLibro = async (
  id: number,
  data: {
    titulo?: string
    autor?: string
    precio?: number
    imagen?: string
    descripcion?: string
    disponible?: boolean
  }
) => {
  return prisma.libro.update({
    where: { id },
    data
  })
}

export const deleteLibro = async (id: number) => {
  return prisma.libro.delete({
    where: { id }
  })
}