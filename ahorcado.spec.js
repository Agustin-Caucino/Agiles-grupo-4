const { validarAdivinanza } = require('./ahorcado.js');

describe('Funciones críticas para el ahorcado', () => {
  beforeEach(() => {
    // Configuración inicial antes de cada prueba
    this.palabra = 'ejemplo';
    this.intentos = 6;
    this.letrasAdivinadas = [];
    this.adivinanzaCorrecta = 'ejemplo';
    this.adivinanzaIncorrecta = 'ejemlo';
  });

  it('debería confirmar el acierto en adivinar de la palabra', () => {
    expect(validarAdivinanza(this.palabra, this.adivinanzaCorrecta)).toBe(true);
  });

  it('debería confirmar el intento fallido de adivinar la palabra', () => {
    expect(validarAdivinanza(this.palabra, this.adivinanzaIncorrecta)).toBe(
      false
    );
  });
});
