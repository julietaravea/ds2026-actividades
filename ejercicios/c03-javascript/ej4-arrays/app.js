const numeros = [1, 2, 3, 4, 5, 6, 7, 8];

let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];

for (const num of numeros) {
    suma += num;

    if (num > mayor) mayor = num;
    if (num < menor) menor = num;
}

const promedio = suma / numeros.length;

console.log("Suma:", suma);
console.log("Promedio:", promedio);
console.log("Mayor:", mayor);
console.log("Menor:", menor);

function generarAstericos(n) {
    let resultado = "";
    
    for (let i = 0; i < n; i++) {
        resultado += "*";
    }
    return resultado;
}

console.log(generarAstericos(8));