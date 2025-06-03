const { Ahorcado } = require('./ahorcado.js');

let ahorcado = null;
let letrasIncorrectas = [];
describe('Funciones críticas para el ahorcado', () => {
  beforeEach(() => {
    ahorcado = new Ahorcado('ejemplo');
    letrasIncorrectas = ['x', 'y', 'z', 'q', 'w', 'r'];
  });

  it('debería confirmar el acierto en adivinar de la palabra', () => {
    expect(
      ahorcado.validarAdivinanza(ahorcado.palabra, ahorcado.adivinanzaCorrecta)
    ).toBe(true);
  });

  it('debería confirmar el intento fallido de adivinar la palabra', () => {
    expect(
      ahorcado.validarAdivinanza(
        ahorcado.palabra,
        ahorcado.adivinanzaIncorrecta
      )
    ).toBe(false);
  });

  it('debería confirmar el intento correcto de la letra', () => {
    expect(ahorcado.intento(ahorcado.intentoCorrecto)).toBe(true);
  });

  it('debería confirmar el intento incorrecto de la letra', () => {
    expect(ahorcado.intento(ahorcado.intentoFallido)).toBe(false);
  });

  it('debería confirmar que ganó', () => {
    let letras = Array.from(new Set(ahorcado.palabra.split('')));
    for (let letra of letras) {
      ahorcado.intento(letra);
    }
    expect(ahorcado.resultado()).toEqual('gano');
  });

  it('debería confirmar que perdió', () => {
    for (letra of letrasIncorrectas) {
      ahorcado.intento(letra);
    }
    expect(ahorcado.resultado()).toEqual('perdio');
  });

  it('debería confirmar que sigue jugando', () => {
    expect(ahorcado.resultado()).toEqual('sigue jugando');
  });

  it('debería no dejar adivinar una letra ya intentada', () => {
    ahorcado.intento(ahorcado.intentoCorrecto);
    expect(ahorcado.intento(ahorcado.intentoCorrecto)).toBe('ya intentada');
  });
});
