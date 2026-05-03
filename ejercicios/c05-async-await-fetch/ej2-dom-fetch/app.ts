interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

const loading = document.getElementById("cargando") as HTMLParagraphElement;
const errorMsj = document.getElementById("error") as HTMLParagraphElement;
const lista = document.getElementById("lista") as HTMLUListElement;

async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const usuarios: Usuario[] = await response.json();
        return usuarios;
    }

    catch (error) {
        if (errorMsj) {
            errorMsj.textContent = `Error al obtener los usuarios: ${error instanceof Error ? error.message : String(error)}`;
        }
            return [];
    }

    finally {
        if (loading) {
            loading.style.display = "none";
        }
        
    }
}

async function mostrarUsuarios() {
   const listaUsuarios = await obtenerUsuarios();

        listaUsuarios.forEach(usuario => {
            const user = document.createElement("li");
            user.textContent = `Nombre: ${usuario.name} - Email: ${usuario.email}`;
            lista.append(user);
        });
}

mostrarUsuarios();