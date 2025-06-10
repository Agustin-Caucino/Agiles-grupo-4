// Tu clase Ahorcado (adaptada para el navegador)
class Ahorcado {
  constructor(palabra) {
    this.palabra = palabra.toUpperCase();
    this.intentos = 6;
    this.cantidadLetras = palabra.length;
    this.cantidadLetrasDistintas = new Set(this.palabra).size;
    this.letrasAdivinadas = [];
    this.letrasIntentadas = [];
    this.adivinanzaCorrecta = 'ejemplo';
    this.adivinanzaIncorrecta = 'ejemlo';
    this.intentosRestantes = this.intentos;
    this.intentoFallido = 'x';
    this.intentoCorrecto = 'e';
  }

  validarAdivinanza(palabra, adivinanza) {
    return palabra === adivinanza;
  }

  intento(intento) {
    intento = intento.toUpperCase();
    if (this.letrasIntentadas.includes(intento)) {
      return 'ya intentada';
    }
    this.letrasIntentadas.push(intento);
    if (this.palabra.includes(intento)) {
      this.letrasAdivinadas.push(intento);
      return true;
    } else {
      this.intentosRestantes--;
      return false;
    }
  }

  resultado() {
    if (this.intentosRestantes <= 0) {
      return 'perdio';
    } else if (this.letrasAdivinadas.length === this.cantidadLetrasDistintas) {
      return 'gano';
    } else {
      return 'sigue jugando';
    }
  }
}

// Variables globales para la interfaz
let juegoActual = null;
const hangmanStages = [
  `+---+
|   |
    |
    |
    |
    |
=========`,
  `+---+
|   |
O   |
    |
    |
    |
=========`,
  `+---+
|   |
O   |
|   |
    |
    |
=========`,
  `+---+
|   |
O   |
/|  |
    |
    |
=========`,
  `+---+
|   |
O   |
/|\\ |
    |
    |
=========`,
  `+---+
|   |
O   |
/|\\ |
/   |
    |
=========`,
  `+---+
|   |
O   |
/|\\ |
/ \\ |
    |
=========`,
];

// Funciones de la interfaz
function crearAlfabeto() {
  const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  const alphabetContainer = document.getElementById('alphabet');
  alphabetContainer.innerHTML = '';

  for (let letter of alphabet) {
    const button = document.createElement('button');
    button.className = 'letter-btn';
    button.textContent = letter;
    button.onclick = () => intentarLetra(letter);
    button.disabled = !juegoActual;
    alphabetContainer.appendChild(button);
  }
}

function iniciarJuego() {
  const palabraInput = document.getElementById('nueva-palabra');
  const palabra = palabraInput.value.trim();

  if (!palabra) {
    mostrarMensaje('Por favor ingresa una palabra', 'info');
    return;
  }

  if (!/^[a-zA-ZñÑ]+$/.test(palabra)) {
    mostrarMensaje('La palabra solo debe contener letras', 'info');
    return;
  }

  juegoActual = new Ahorcado(palabra);
  palabraInput.value = '';
  crearAlfabeto();
  actualizarDisplay();
  ocultarMensaje();

  mostrarMensaje(
    `¡Juego iniciado! Palabra de ${juegoActual.cantidadLetras} letras`,
    'info'
  );
  setTimeout(ocultarMensaje, 2000);
}

function intentarLetra(letra) {
  if (!juegoActual) return;

  const resultado = juegoActual.intento(letra);
  const button = Array.from(document.querySelectorAll('.letter-btn')).find(
    (btn) => btn.textContent === letra
  );

  if (resultado === 'ya intentada') {
    mostrarMensaje(`La letra "${letra}" ya fue intentada`, 'info');
    setTimeout(ocultarMensaje, 2000);
    return;
  }

  if (resultado === true) {
    button.classList.add('correct');
  } else {
    button.classList.add('incorrect');
  }

  button.disabled = true;
  actualizarDisplay();
  verificarEstadoJuego();
}

function actualizarDisplay() {
  if (!juegoActual) return;

  // Actualizar palabra
  let display = '';
  for (let letra of juegoActual.palabra) {
    if (juegoActual.letrasAdivinadas.includes(letra)) {
      display += letra + ' ';
    } else {
      display += '_ ';
    }
  }
  document.getElementById('word-display').textContent = display.trim();

  // Actualizar estadísticas
  document.getElementById('intentos-restantes').textContent =
    juegoActual.intentosRestantes;
  document.getElementById('total-letras').textContent =
    juegoActual.cantidadLetras;
  document.getElementById('letras-distintas').textContent =
    juegoActual.cantidadLetrasDistintas;
  document.getElementById('letras-adivinadas').textContent =
    juegoActual.letrasAdivinadas.length;

  // Cambiar color si quedan pocos intentos
  const intentosEl = document.getElementById('intentos-restantes');
  if (juegoActual.intentosRestantes <= 2) {
    intentosEl.classList.add('danger');
  } else {
    intentosEl.classList.remove('danger');
  }

  // Actualizar ahorcado
  const etapaAhorcado = juegoActual.intentos - juegoActual.intentosRestantes;
  document.getElementById('hangman').textContent = hangmanStages[etapaAhorcado];

  // Mostrar letras intentadas
  if (juegoActual.letrasIntentadas.length > 0) {
    document.getElementById('letras-intentadas').style.display = 'block';
    document.getElementById('lista-intentadas').textContent =
      juegoActual.letrasIntentadas.join(', ');
  }
}

function verificarEstadoJuego() {
  const resultado = juegoActual.resultado();

  if (resultado === 'gano') {
    mostrarMensaje(
      `🎉 ¡Felicidades! Has ganado 🎉<br>Palabra completa: <strong>${juegoActual.palabra}</strong>`,
      'win'
    );
    deshabilitarBotones();
  } else if (resultado === 'perdio') {
    mostrarMensaje(
      `💀 Game Over 💀<br>La palabra era: <strong>${juegoActual.palabra}</strong>`,
      'lose'
    );
    deshabilitarBotones();
  }
}

function deshabilitarBotones() {
  document.querySelectorAll('.letter-btn').forEach((btn) => {
    btn.disabled = true;
  });
}

function mostrarMensaje(texto, tipo) {
  const messageEl = document.getElementById('message');
  messageEl.innerHTML = texto;
  messageEl.className = `message ${tipo}`;
  messageEl.style.display = 'block';
}

function ocultarMensaje() {
  document.getElementById('message').style.display = 'none';
}

function reiniciarJuego() {
  juegoActual = null;
  document.getElementById('word-display').textContent =
    'Ingresa una palabra para comenzar';
  document.getElementById('nueva-palabra').value = '';
  document.getElementById('letras-intentadas').style.display = 'none';
  document.getElementById('hangman').textContent = hangmanStages[0];

  // Resetear estadísticas
  document.getElementById('intentos-restantes').textContent = '6';
  document.getElementById('total-letras').textContent = '0';
  document.getElementById('letras-distintas').textContent = '0';
  document.getElementById('letras-adivinadas').textContent = '0';
  document.getElementById('intentos-restantes').classList.remove('danger');

  crearAlfabeto();
  ocultarMensaje();
}

function revelarPalabra() {
  if (juegoActual) {
    mostrarMensaje(
      `La palabra es: <strong>${juegoActual.palabra}</strong>`,
      'info'
    );
  } else {
    mostrarMensaje('No hay ningún juego activo', 'info');
  }
}

// Soporte para teclado
document.addEventListener('keydown', (e) => {
  const letra = e.key.toUpperCase();
  if (/^[A-ZÑ]$/.test(letra) && juegoActual) {
    intentarLetra(letra);
  }
});

// Enter para iniciar juego
document.getElementById('nueva-palabra').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    iniciarJuego();
  }
});

// Inicializar interfaz
crearAlfabeto();
