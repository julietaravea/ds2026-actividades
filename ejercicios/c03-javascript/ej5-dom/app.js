const input = document.getElementById("altura");
const boton = document.getElementById("btnGenerar");
const resultado = document.getElementById("resultado");

const generarArbol = (n) => {
    let texto = "";

    for (let i = 1; i <= n; i++) {
        texto += "*".repeat(i) + "\n";
    }

    return texto;
};

boton.addEventListener("click", () => {
    const valor = input.value;

    // validación
    if (valor === "" || valor < 1) {
        resultado.textContent = "Ingresa un número válido mayor o igual a 1";
        return;
    }

    const altura = Number(valor);

    const arbol = generarArbol(altura);

    resultado.textContent = arbol;
});