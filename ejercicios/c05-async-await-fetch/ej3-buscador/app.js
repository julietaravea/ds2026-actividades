"use strict";
const input = document.getElementById("inputBusqueda");
const boton = document.getElementById("btnBuscar");
const resultados = document.getElementById("resultados");
const msjError = document.getElementById("error");
const msjCargando = document.getElementById("cargando");
async function buscarLibros(q) {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${q}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        return data.docs;
    }
    catch (error) {
        msjError.textContent = "Error al buscar libros";
        msjError.style.display = "block";
        return [];
    }
}
async function mostrarLibros() {
    const q = input.value.trim();
    // Validación
    if (q === "") {
        msjError.textContent = "Por favor ingresá un libro";
        msjError.style.display = "block";
        resultados.innerHTML = "";
        return;
    }
    msjError.textContent = "";
    msjError.style.display = "none";
    resultados.innerHTML = "";
    msjCargando.textContent = "Cargando...";
    const libros = await buscarLibros(q);
    msjCargando.textContent = "";
    if (libros.length === 0) {
        msjError.textContent = "No se encontraron resultados";
        msjError.style.display = "block";
        return;
    }
    // Mostrar 10
    libros.slice(0, 10).forEach(libro => {
        const card = document.createElement("div");
        card.className = "card";
        const titulo = document.createElement("h3");
        titulo.textContent = libro.title;
        const autor = document.createElement("p");
        autor.textContent = libro.author_name
            ? `Autor: ${libro.author_name[0]}`
            : "Autor: desconocido";
        const anio = document.createElement("p");
        anio.textContent = libro.first_publish_year
            ? `Año: ${libro.first_publish_year}`
            : "Año: desconocido";
        card.appendChild(titulo);
        card.appendChild(autor);
        card.appendChild(anio);
        resultados.appendChild(card);
    });
}
boton.addEventListener("click", mostrarLibros);
