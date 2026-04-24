"use strict";
const input = document.getElementById("altura");
const boton = document.getElementById("btnGenerar");
const resultado = document.getElementById("resultado");
const generarAsteriscos = (n) => let, texto = "";
for (let i = 1; i <= n; i++) {
    texto += "*".repeat(i) + "\n";
}
return texto;
;
boton.addEventListener("click", () => {
    const valor = input.value;
    if (valor === "" || Number(valor) < 1) {
        resultado.textContent = "Número inválido";
        return;
    }
    const altura = Number(valor);
    const arbol = generarAsteriscos(altura);
    resultado.textContent = arbol;
});
