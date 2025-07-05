const Ahorcado = window.Ahorcado;

// const { JSDOM } = require('jsdom');

// // In your Jest setup file (e.g., jest.config.js setupFiles array)
// const dom = new JSDOM();
// global.document = dom.window.document;
// global.window = dom.window;

let juegoActual = null;

const posicionesAhorcado = [
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

let palabras = [
  'programacion',
  'javascript',
  'desarrollo',
  'agilidad',
  'tecnologia',
];

function crearAlfabeto() {
  const alphabet = 'QWERTYUIOPASDFGHJKLÑZXCVBNM';
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
  const palabra =
    palabras[Math.floor(Math.random() * palabras.length)].toLocaleLowerCase();
  juegoActual = new Ahorcado(palabra);
  crearAlfabeto();
  actualizarDisplay();
  ocultarMensaje();

  mostrarMensaje(
    `Arrancó el ahorcado, la palabra tiene ${juegoActual.cantidadLetras} letras`,
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
  document.getElementById('remaining-tries').textContent =
    juegoActual.intentosRestantes;
  document.getElementById('total-letters').textContent =
    juegoActual.cantidadLetras;
  document.getElementById('diferent-letters').textContent =
    juegoActual.cantidadLetrasDistintas;
  document.getElementById('guessed-letters').textContent =
    juegoActual.letrasAdivinadas.length;

  // Cambiar color si quedan pocos intentos
  const intentosEl = document.getElementById('remaining-tries');
  if (juegoActual.intentosRestantes <= 2) {
    intentosEl.classList.add('danger');
  } else {
    intentosEl.classList.remove('danger');
  }

  // Actualizar dibujo ahorcado
  const etapaAhorcado = juegoActual.intentos - juegoActual.intentosRestantes;
  document.getElementById('hangman').textContent =
    posicionesAhorcado[etapaAhorcado];

  // Mostrar letras intentadas
  if (juegoActual.letrasIntentadas.length > 0) {
    document.getElementById('tried-letters').style.display = 'block';
    document.getElementById('tried-list').textContent =
      juegoActual.letrasIntentadas.join(', ');
  }
}

function verificarEstadoJuego() {
  const resultado = juegoActual.resultado();

  if (resultado === 'gano') {
    mostrarMensaje(
      `¡Ganaste! <br>Palabra completa: <strong>${juegoActual.palabra}</strong>`,
      'win'
    );
    deshabilitarBotones();
  } else if (resultado === 'perdio') {
    mostrarMensaje(
      `Perdiste. <br>La palabra era: <strong>${juegoActual.palabra}</strong>`,
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
  document.getElementById('word-display').textContent = '';
  document.getElementById('tried-letters').style.display = 'none';
  document.getElementById('hangman').textContent = posicionesAhorcado[0];

  document.getElementById('remaining-tries').textContent = '6';
  document.getElementById('total-letters').textContent = '0';
  document.getElementById('diferent-letters').textContent = '0';
  document.getElementById('guessed-letters').textContent = '0';
  document.getElementById('remaining-tries').classList.remove('danger');

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
    mostrarMensaje('No estás jugando todavía', 'info');
  }
}

document.addEventListener('keydown', (e) => {
  const letra = e.key.toUpperCase();
  if (/^[A-ZÑ]$/.test(letra) && juegoActual) {
    intentarLetra(letra);
  }
});

document.getElementById('start-game').addEventListener('click', iniciarJuego);
document
  .getElementById('restart-game')
  .addEventListener('click', reiniciarJuego);
document
  .getElementById('reveal-word')
  .addEventListener('click', revelarPalabra);

crearAlfabeto();
