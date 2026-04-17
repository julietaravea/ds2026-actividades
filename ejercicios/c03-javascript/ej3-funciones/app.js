function calcularPrecioFinal(monto, medioPago) {

    if (monto < 200) {
        return monto;
    }

    if (monto >= 200 && monto <= 400) {
        if (medioPago === "E") return monto * 0.7;
        if (medioPago === "D") return monto * 0.8;
        if (medioPago === "C") return monto * 0.9;       
    }

    if (monto > 400) {
        return monto * 0.6;
    }
}

// Pruebas
const pruebas = [
    [100, "E"],
    [300, "E"],
    [400, "D"],
    [600, "C"],
    [500, "E"]
];

for (const [monto, pago] of pruebas) {
    const final = calcularPrecioFinal(monto, pago);

    console.log(`Monto: $${monto} | Pago: ${pago} | Final: $${final}`);
}