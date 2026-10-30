const canciones = [
    {
        titulo: 'Malboro Rojo',
        artista: 'Fuerza Regida',
        archivo: 'resources/canciones/MalboroRojo.mp3',
        portada: 'resources/imagenes/FZ111XPANTIA.jpg'
    },
    {
        titulo: 'Brillas',
        artista: 'Leon Larregui',
        archivo: 'resources/canciones/Brillas.mp3',
        portada: 'resources/imagenes/Brillas.jpg'
    },
    {
        titulo: 'Caperuza',
        artista: 'Fuerza Regida',
        archivo: 'resources/canciones/Caperuza.mp3',
        portada: 'resources/imagenes/FZ111XPANTIA.jpg'
    },
    {
        titulo: 'Demencia',
        artista: 'Junior H',
        archivo: 'resources/canciones/Demencia.mp3',
        portada: 'resources/imagenes/Demencia.jpg'
    },
    {
        titulo: 'Dopamina',
        artista: 'Fuerza Regida',
        archivo: 'resources/canciones/Dopamina.mp3',
        portada: 'resources/imagenes/Dopamina.jpg'
    },
    {
        titulo: 'Herida Abierta',
        artista: 'Ivan Cornejo',
        archivo: 'resources/canciones/HeridaAbierta.mp3',
        portada: 'resources/imagenes/HeridaAbierta.jpg'
    },
    {
        titulo: 'LOBA',
        artista: 'Emi Blue',
        archivo: 'resources/canciones/LobaEmi.mp3',
        portada: 'resources/imagenes/LobaEmi.jpg'
    },
    {
        titulo: 'Profeko',
        artista: 'LoveUikari',
        archivo: 'resources/canciones/Profeko.mp3',
        portada: 'resources/imagenes/Profeko.jpg'
    },
    {
        titulo: 'Pvta Luna',
        artista: 'Neton Vega',
        archivo: 'resources/canciones/PvtaLuna.mp3',
        portada: 'resources/imagenes/PvtaLuna.png'
    },
    {
        titulo: 'Sabor Fresa',
        artista: 'Fuerza Regida',
        archivo: 'resources/canciones/SaborFresa.mp3',
        portada: 'resources/imagenes/SaborFresa.jpg'
    }
];

const audio = document.getElementById('mi-audio');
const botonReproducir = document.getElementById('boton-reproducir');
const tituloCancion = document.getElementById('titulo-cancion');
const artista = document.getElementById('artista');
const portada = document.getElementById('portada');
const listaCanciones = document.getElementById('lista-canciones');
const estado = document.getElementById('estado');
const botonesCambio = [
    document.getElementById('anterior'),
    document.getElementById('siguiente')
];
let indiceActual = 0;

botonesCambio.forEach((boton) => {
    boton.disabled = canciones.length < 2;
});

function mostrarCancion(indice) {
    indiceActual = indice;
    const cancion = canciones[indiceActual];

    audio.src = cancion.archivo;
    tituloCancion.textContent = cancion.titulo;
    artista.textContent = cancion.artista;
    portada.src = cancion.portada;
    portada.alt = `Portada de ${cancion.titulo}`;

    listaCanciones.querySelectorAll('.cancion-lista').forEach((boton, numero) => {
        boton.classList.toggle('seleccionada', numero === indiceActual);
        if (numero === indiceActual) {
            boton.setAttribute('aria-current', 'true');
        } else {
            boton.removeAttribute('aria-current');
        }
    });

    botonReproducir.textContent = '▶ Reproducir';
    estado.textContent = '';
}

function cambiarCancion(direccion) {
    const siguienteIndice = (indiceActual + direccion + canciones.length) % canciones.length;
    mostrarCancion(siguienteIndice);
    reproducir();
}

async function reproducir() {
    try {
        await audio.play();
    } catch (error) {
        estado.textContent = 'No se pudo reproducir esta canción.';
    }
}

canciones.forEach((cancion, indice) => {
    const elemento = document.createElement('li');
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'cancion-lista';
    boton.innerHTML = `<span>${indice + 1}. ${cancion.titulo}<br><span class="artista-lista">${cancion.artista}</span></span><span>▶</span>`;
    boton.addEventListener('click', () => {
        mostrarCancion(indice);
        reproducir();
    });
    elemento.appendChild(boton);
    listaCanciones.appendChild(elemento);
});

botonReproducir.addEventListener('click', () => {
    if (audio.paused) {
        reproducir();
    } else {
        audio.pause();
    }
});

document.getElementById('anterior').addEventListener('click', () => cambiarCancion(-1));
document.getElementById('siguiente').addEventListener('click', () => cambiarCancion(1));

audio.addEventListener('play', () => {
    botonReproducir.textContent = '⏸ Parar';
    estado.textContent = 'Corriendo';
});

audio.addEventListener('pause', () => {
    botonReproducir.textContent = '▶ Correr';
    if (audio.currentTime > 0 && !audio.ended) {
        estado.textContent = 'Parao';
    }
});

audio.addEventListener('ended', () => cambiarCancion(1));

mostrarCancion(0);
