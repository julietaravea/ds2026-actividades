const input = document.getElementById("inputProducto");
const boton = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");


const actualizarContador = () => {
    const cantidad = lista.children.length;
    contador.textContent = `${cantidad} productos en la lista`;
};

boton.addEventListener("click", () => {
    const texto = input.value.trim();

    if (texto === "") {
        alert("El producto no puede estar vacío");
        return;
    }

    const li = document.createElement("li");
    li.textContent = texto + " ";

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {
        li.remove();
        actualizarContador();
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
    
    input.value = "";

    actualizarContador();
});