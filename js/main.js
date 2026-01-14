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

// Se crea un arreglo vacío para las respuestas del usuario
let respuestasUsuario = JSON.parse(localStorage.getItem('respuestas')) || new Array(preguntas.length).fill(null);

function mostrarPregunta() {
    const pregunta = preguntas[indicePreguntaActual];

    //  Mostramos el texto y el contador 
    document.getElementById("texto-pregunta").innerText = pregunta.titulo;
    document.getElementById("contador-preguntas").innerText = `Pregunta ${indicePreguntaActual + 1} de ${preguntas.length}`;

    // 2. Limpiamos las opciones anteriores y generamos las nuevas
    const contenedor = document.getElementById("contenedor-opciones");
    contenedor.innerHTML = ""; // Borra lo que había antes

    pregunta.opciones.forEach((opcion, index) => {
        contenedor.innerHTML += `
             <div class="form-check">
                 <input class="form-check-input" type="radio" name="pregunta" 
                 id="opcion${index}" 
                 onclick="guardarRespuesta(${index})" 
       ${respuestasUsuario[indicePreguntaActual] === index ? 'checked' : ''}>
                  <label class="form-check-label" for="opcion${index}">
                      ${opcion}
                  </label>
             </div>`;
    });

    // Bloquear "Anterior" si estamos en la pregunta 1
    document.getElementById("btn-anterior").disabled = (indicePreguntaActual === 0);

    const btnSiguiente = document.getElementById("btn-siguiente");
    if (indicePreguntaActual === preguntas.length - 1) {
        btnSiguiente.innerText = "Finalizar";
        btnSiguiente.classList.replace("btn-primary", "btn-success");
    } else {
        btnSiguiente.innerText = "Siguiente ->";
        btnSiguiente.classList.replace("btn-success", "btn-primary");
    }
    // --- BOTÓN SIGUIENTE ---
    document.getElementById("btn-siguiente").onclick = function () {
        if (indicePreguntaActual < preguntas.length - 1) {
            indicePreguntaActual++; // Sumamos para avanzar
            mostrarPregunta();
        } else {
            finalizarCuestionario();
        }
    };

    // --- BOTÓN ANTERIOR ---
    document.getElementById("btn-anterior").onclick = function () {
        if (indicePreguntaActual > 0) {
            indicePreguntaActual--; // RESTAMOS para retroceder
            mostrarPregunta();
        }
    };
    // Lo guardamos en el "disco duro" del navegador (LocalStorage)
    localStorage.setItem('respuestas', JSON.stringify(respuestasUsuario));
}
function guardarRespuesta(indiceOpcion) {
    // 1. Guarda el número de la opción elegida en la posición de la pregunta actual
    respuestasUsuario[indicePreguntaActual] = indiceOpcion;

    // 2. Guarda el arreglo actualizado en el navegador para que no se pierda
    localStorage.setItem('respuestas', JSON.stringify(respuestasUsuario));

    // Esto es solo para que tú veas en la consola que sí se está guardando
    console.log("Respuestas actuales:", respuestasUsuario);
}

function finalizarCuestionario() {
    let aciertos = 0;
    let errores = 0;

    preguntas.forEach((pregunta, index) => {
        // Comparamos lo guardado con la respuesta correcta
        if (respuestasUsuario[index] === pregunta.correcta) {
            aciertos++;
        } else {
            errores++;
        }
    });

    // Esta es la línea que DEBE activarse
    alert(`¡Cuestionario Terminado!\n\nAciertos: ${aciertos}\nErrores: ${errores}`);
    
    localStorage.removeItem('respuestas'); // Opcional: para reiniciar el examen
}


// Al cargar la página, mostramos la primera pregunta 
window.onload = mostrarPregunta;