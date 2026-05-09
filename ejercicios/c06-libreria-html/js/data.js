async function buscarLibros() {
    const input =
        document.getElementById("busqueda");

    const resultados =
        document.getElementById("resultados");

    const cargando =
        document.getElementById("cargando");

    const error =
        document.getElementById("error");

    const texto = input.value.trim();

    if (texto === "") {

        error.textContent =
            "Ingrese un libro";

        return;
    }

    error.textContent = "";
    resultados.innerHTML = "";
    cargando.textContent =
        "Cargando...";

    try {

        const response = await fetch(
            `https://openlibrary.org/search.json?q=${texto}`
        );

        const data = await response.json();

        cargando.textContent = "";

        data.docs.slice(0, 10).forEach(libro => {

            const card =
                document.createElement("div");

            card.className = "col-md-4";

            card.innerHTML = `
            
                <div class="card h-100">

                    <div class="card-body">

                        <h5 class="card-title">
                            ${libro.title}
                        </h5>

                        <p class="card-text">
                            ${
                                libro.author_name
                                ? libro.author_name[0]
                                : "Autor desconocido"
                            }
                        </p>

                        <a href="libro.html"
                           class="btn btn-primary">
                           Ver más
                        </a>

                    </div>

                </div>
            
            `;

            resultados.appendChild(card);

        });

    } catch {

        cargando.textContent = "";

        error.textContent =
            "Error al buscar libros";
    }
}