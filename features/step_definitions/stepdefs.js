const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const Ahorcado = require('../../ahorcado.js');
// const iniciarJuego = require('../../script.js').iniciarJuego;

let juego;
let ultimoResultado;
let ultimaValidacion;

// Iniciando Juego
Given('que estoy en la pantalla principal', function () {
  juego = null;
});

When('selecciono juego nuevo', function () {
  juego = new Ahorcado('hola');
});

Then('debería crearse un nuevo juego', function () {
  assert.ok(juego instanceof Ahorcado);
});

// Probando Letras

Given('que inició un juego', function () {
  // step para cuando acierta y para cuando erra
  ultimoResultado = null;
  juego = new Ahorcado('naranja');
});

When('ingreso una letra correcta', function () {
  ultimoResultado = juego.intento('n');
});

Then('debería ver que la letra pertenece a la palabra', function () {
  assert.strictEqual(ultimoResultado, true);
});

When('ingreso una letra incorrecta', function () {
  ultimoResultado = juego.intento('l');
});

Then('debería ver que la letra no pertenece a la palabra', function () {
  assert.strictEqual(ultimoResultado, false);
});

When('me quedo sin intentos', function () {
  juego.intento('l');
  juego.intento('o');
  juego.intento('w');
  juego.intento('z');
  juego.intento('k');
  juego.intento('ñ');
});

Then('debería ver mi resultado', function () {
  assert.strictEqual(juego.resultado(), 'perdio');
});
