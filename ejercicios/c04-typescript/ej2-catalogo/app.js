"use strict";
const catalogo = [
    {
        isbn: "1",
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        precio: 15.99,
        disponible: true,
        genero: "Ficción"
    },
    {
        isbn: "2",
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        precio: 20.99,
        disponible: false,
        genero: "Ficción"
    },
    {
        isbn: "3",
        titulo: "1984",
        autor: "George Orwell",
        precio: 18.99,
        disponible: true,
        genero: "Ciencia ficción"
    },
    {
        isbn: "4",
        titulo: "El código Da Vinci",
        autor: "Dan Brown",
        precio: 12.99,
        disponible: true,
        genero: "Thriller"
    }
];
// Elementos del DOM
const input = document.getElementById("filtroAutor");
const btnFiltrar = document.getElementById("filtrar");
const btnDisponibles = document.getElementById("mostrarDisponibles");
const btnTodos = document.getElementById("mostrarTodos");
const lista = document.getElementById("listado");
const stats = document.getElementById("stats");
// Funciones
const buscarPorAutor = (autor) => {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
};
const librosDisponibles = () => {
    return catalogo.filter(libro => libro.disponible);
};
const precioPromedio = (libros) => {
    const total = libros.reduce((sum, libro) => sum + libro.precio, 0);
    return total / libros.length;
};
const renderizar = (libros) => {
    lista.innerHTML = "";
    libros.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio} - ${libro.disponible ? "Disponible" : "No disponible"}`;
        lista.appendChild(li);
    });
    const promedio = precioPromedio(libros);
    stats.textContent = `Cantidad: ${libros.length} | Promedio: $${promedio}`;
};
// Eventos
btnFiltrar.addEventListener("click", () => {
    const autor = input.value;
    const resultados = buscarPorAutor(autor);
    renderizar(resultados);
});
btnDisponibles.addEventListener("click", () => {
    const disponibles = librosDisponibles();
    renderizar(disponibles);
});
btnTodos.addEventListener("click", () => {
    renderizar(catalogo);
});
renderizar(catalogo);
