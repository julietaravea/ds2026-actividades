"use strict";
async function obtenerUsuarios() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const usuarios = await response.json();
        return usuarios;
    }
    catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
}
async function mostrarUsuarios() {
    const usuarios = await obtenerUsuarios();
    usuarios.forEach(usuario => {
        console.log(`ID: ${usuario.id}, Nombre: ${usuario.name}, Email: ${usuario.email}, Teléfono: ${usuario.phone}`);
        console.log('-----------------------------');
    });
}
mostrarUsuarios();
