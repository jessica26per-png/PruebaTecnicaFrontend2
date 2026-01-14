const preguntas = [
    {
        titulo: "¿Cuál es la raíz cuadrada de 25?",
        opciones: ["5", "3", "25 no tiene raíz", "2"],
        correcta: 0 // primera pregunta
    },
    {
        titulo: "¿Qué lengua tiene más hablantes nativos: inglés o español?",
        opciones: ["Español", "Ingles", "Aleman"],
        correcta: 0 // segunda pregunta

    }
];

let indicePreguntaActual = 0;

function mostrarPregunta() {
    const pregunta = preguntas[indicePreguntaActual];

    // 1. Mostramos el texto y el contador 
    document.getElementById("texto-pregunta").innerText = pregunta.titulo;
    document.getElementById("contador-preguntas").innerText = `Pregunta ${indicePreguntaActual + 1} de ${preguntas.length}`;

    // 2. Limpiamos las opciones anteriores y generamos las nuevas
    const contenedor = document.getElementById("contenedor-opciones");
    contenedor.innerHTML = ""; // Borra lo que había antes

    pregunta.opciones.forEach((opcion, index) => {
        contenedor.innerHTML += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="pregunta" id="opcion${index}">
                <label class="form-check-label" for="opcion${index}">
                    ${opcion}
                </label>
            </div>
        `;
    });
    // Detectar clic en el botón Siguiente
    document.getElementById("btn-siguiente").onclick = function () {
        if (indicePreguntaActual < preguntas.length - 1) {
            indicePreguntaActual++; // Avanzamos una posición
            mostrarPregunta(); // Volvemos a dibujar todo
        } else {
            alert("¡Has llegado al final del cuestionario!");
        }
    };

    // Detectar clic en el botón Anterior
    document.getElementById("btn-anterior").onclick = function () {
        if (indicePreguntaActual > 0) {
            indicePreguntaActual--; // Retrocedemos una posición
            mostrarPregunta(); // Volvemos a dibujar todo
        }
    };
}


// Al cargar la página, mostramos la primera pregunta 
window.onload = mostrarPregunta;