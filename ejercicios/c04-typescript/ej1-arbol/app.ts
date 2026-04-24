const input = document.getElementById("altura") as HTMLInputElement;
const boton = document.getElementById("btnGenerar") as HTMLButtonElement;
const resultado = document.getElementById("resultado") as HTMLElement;

const generarAsteriscos = (n: number): string => {
    let texto: string = "";

    for (let i = 1; i <= n; i++) {
        texto += "*".repeat(i) + "\n";
    }

    return texto;
};

boton.addEventListener("click", () => {
    const valor: string = input.value;

    if (valor === "" || Number(valor) < 1) {
        resultado.textContent = "Número inválido";
        return;
    }

    const altura: number = Number(valor);

    const arbol: string = generarAsteriscos(altura);

    resultado.textContent = arbol;
});