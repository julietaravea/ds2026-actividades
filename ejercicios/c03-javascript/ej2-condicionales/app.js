function clasificarNota(nota) {
    if (nota < 4) {
        return "Desaprobado";
    } else if (nota >= 4 && nota <= 7) {
        return "Aprobado";
    } else {
        return "Promocionado";
    }
}

function diaDeLaSemana(numero) {
    switch (numero) {
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sábado (fin de semana)";
        case 7:
            return "Domingo (fin de semana)";
        default:
            return "Día inválido";
    }
}

// Prueba de las funciones
console.log(clasificarNota(3)); // Desaprobado
console.log(clasificarNota(5)); // Aprobado
console.log(clasificarNota(8)); // Promocionado

console.log(diaDeLaSemana(1)); // Lunes
console.log(diaDeLaSemana(7)); // Domingo (fin de semana)
console.log(diaDeLaSemana(8)); // Día inválido