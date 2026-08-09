import { Autor } from '../types/autor.type'

let autores: Autor[] = [
  { id: 1, nombre: 'Neil Gaiman', nacionalidad: 'Reino Unido' },
  { id: 2, nombre: 'Albert Camus', nacionalidad: 'Francia' },
  { id: 3, nombre: 'Franz Kafka', nacionalidad: 'Chequia' }
]

export const getAutores = (): Autor[] => autores

export const getAutorById = (id: number): Autor | undefined =>
  autores.find(a => a.id === id)

export const createAutor = (data: Omit<Autor, 'id'>): Autor => {
  const nuevo: Autor = {
    id: autores.length + 1,
    ...data
  }

  autores.push(nuevo)
  return nuevo
}

export const updateAutor = (
  id: number,
  data: Omit<Autor, 'id'>
): Autor | undefined => {
  const index = autores.findIndex(a => a.id === id)

  if (index === -1) return undefined

  autores[index] = { id, ...data }
  return autores[index]
}

export const deleteAutor = (id: number): boolean => {
  const index = autores.findIndex(a => a.id === id)

  if (index === -1) return false

  autores.splice(index, 1)
  return true
}