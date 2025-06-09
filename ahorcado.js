const palabras = [
  'ejemplo',
  'agiles',
  'metodologias',
  'desarrollo',
  'frontend',
  'scrum',
];

class Ahorcado {
  constructor(palabra) {
    this.palabra = palabra.toLocaleLowerCase();
    this.intentos = 6;
    this.cantidadLetras = palabra.length;
    this.cantidadLetrasDistintas = new Set(this.palabra).size;
    this.letrasAdivinadas = [];
    this.letrasIntentadas = [];
    this.adivinanzaCorrecta = this.palabra;
    this.adivinanzaIncorrecta = this.palabra.slice(0, -1) + 'x';
    this.intentosRestantes = this.intentos;
    this.intentoFallido = 'Ü';
    this.intentoCorrecto = this.palabra.charAt(0);
  }

  validarAdivinanza(palabra, adivinanza) {
    return palabra === adivinanza;
  }

  intento(intento) {
    if (this.letrasIntentadas.includes(intento.toLocaleLowerCase())) {
      return 'ya intentada';
    }
    this.letrasIntentadas.push(intento.toLocaleLowerCase());
    if (this.palabra.includes(intento.toLocaleLowerCase())) {
      this.letrasAdivinadas.push(intento.toLocaleLowerCase());
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

module.exports = { Ahorcado };

const { Ahorcado } = require('../ahorcado.js');

const iniciarJuego = () => {
  const palabraAleatoria =
    palabras[Math.floor(Math.random() * palabras.length)];
  const ahorcado = new Ahorcado(palabraAleatoria);
};
