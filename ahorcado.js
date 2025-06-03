class Ahorcado {
  constructor(palabra) {
    this.palabra = palabra;
    this.intentos = 6;
    this.cantidadLetras = palabra.length;
    this.cantidadLetrasDistintas = new Set(palabra).size;
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

module.exports = { Ahorcado };
