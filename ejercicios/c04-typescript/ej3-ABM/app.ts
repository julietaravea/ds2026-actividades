interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

let catalogo: Libro[] = [
    { isbn: '1', titulo: 'El Gran Gatsby', autor: 'F. Scott Fitzgerald', precio: 10.99, disponible: true, genero: 'Novela' },
    { isbn: '2', titulo: '1984', autor: 'George Orwell', precio: 8.99, disponible: false, genero: 'Distopía' },
    { isbn: '3', titulo: 'Matar a un ruiseñor', autor: 'Harper Lee', precio: 12.99, disponible: true, genero: 'Novela' },
];

// DOM
const lista = document.getElementById("listado") as HTMLUListElement;
const stats = document.getElementById("stats") as HTMLElement;
const errorForm = document.getElementById("errorForm") as HTMLElement;

const inputTitulo = document.getElementById("titulo") as HTMLInputElement;
const inputAutor = document.getElementById("autor") as HTMLInputElement;
const inputPrecio = document.getElementById("precio") as HTMLInputElement;
const inputGenero = document.getElementById("genero") as HTMLInputElement;
const inputDisponible = document.getElementById("disponible") as HTMLInputElement;

const inputFiltro = document.getElementById("filtroAutor") as HTMLInputElement;

const btnAgregar = document.getElementById("btnAgregar") as HTMLButtonElement;
const btnFiltrar = document.getElementById("filtrar") as HTMLButtonElement;
const btnDisponibles = document.getElementById("mostrarDisponibles") as HTMLButtonElement;
const btnTodos = document.getElementById("mostrarTodos") as HTMLButtonElement;

// FUNCIONES

const renderizar = (libros: Libro[]): void => {
    lista.innerHTML = "";

    for (const libro of libros) {
        const li = document.createElement("li");

        li.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio} ${
            libro.disponible ? "(Disponible)" : "(No disponible)"
        }`;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";

        btnEliminar.addEventListener("click", () => {
            eliminarLibro(libro.isbn);
        });

        li.appendChild(btnEliminar);
        lista.appendChild(li);
    }

    const promedio =
        libros.length === 0
            ? 0
            : libros.reduce((acc, l) => acc + l.precio, 0) / libros.length;

    stats.textContent = `Cantidad: ${libros.length} | Promedio: $${promedio}`;
};

const agregarLibro = (libro: Libro): void => {
    catalogo.push(libro);
    renderizar(catalogo);
};

const eliminarLibro = (isbn: string): void => {
    catalogo = catalogo.filter(libro => libro.isbn !== isbn);
    renderizar(catalogo);
};

const validarFormulario = (): Libro | null => {
    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const precio = Number(inputPrecio.value);
    const genero = inputGenero.value.trim();
    const disponible = inputDisponible.checked;

    if (titulo === "" || autor === "" || precio <= 0) {
        return null;
    }

    return {
        isbn: "AUTO-" + Date.now(),
        titulo,
        autor,
        precio,
        disponible,
        genero: genero || undefined
    };
};

const buscarPorAutor = (autor: string): Libro[] => {
    return catalogo.filter(libro =>
        libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
};

const librosDisponibles = (): Libro[] => {
    return catalogo.filter(libro => libro.disponible);
};

// EVENTOS

btnAgregar.addEventListener("click", () => {
    const libro = validarFormulario();

    if (!libro) {
        errorForm.textContent = "Datos inválidos";
        return;
    }

    errorForm.textContent = "";
    agregarLibro(libro);

    inputTitulo.value = "";
    inputAutor.value = "";
    inputPrecio.value = "";
    inputGenero.value = "";
    inputDisponible.checked = false;
});

btnFiltrar.addEventListener("click", () => {
    const texto = inputFiltro.value.trim();
    renderizar(buscarPorAutor(texto));
});

btnDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});

btnTodos.addEventListener("click", () => {
    renderizar(catalogo);
});

// INICIAL
renderizar(catalogo);