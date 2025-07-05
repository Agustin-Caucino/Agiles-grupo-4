const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const Ahorcado = require('../../ahorcado.js');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let ultimoResultado;
let ultimaValidacion;
const options = new chrome.Options();
options.addArguments('--headless');
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');
let driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

// Iniciando Juego
Given('que estoy en la pantalla principal', async function () {
  await driver.get('https://agustin-caucino.github.io/Agiles-grupo-4/');
});

When('selecciono juego nuevo', async function () {
  await driver.findElement(By.id('start-game')).click();
});

Then('debería crearse un nuevo juego', async function () {
  const element = await driver.findElement(By.id('word-display'));
  const textoFinal = await element.getText();
  assert.ok(textoFinal.includes('_'));
});

// Probando Letras
Given('que inició un juego', async function () {
  await driver.get('https://agustin-caucino.github.io/Agiles-grupo-4/');
  await driver.findElement(By.id('start-game')).click();
});

When('ingreso una letra correcta', async function () {
  await driver.actions().sendKeys('a').perform();
});

Then('debería ver que la letra pertenece a la palabra', async function () {
  let element = await driver.findElement(By.id('word-display'));
  let v = await element.getText();
  assert.ok(v.includes('a'));
});

When('ingreso una letra incorrecta', async function () {
  await driver.actions().sendKeys('z').perform();
});

Then('debería ver que la letra no pertenece a la palabra', async function () {
  assert.ok(
    (await driver.findElement(By.id('remaining-tries'))).getText() != '6'
  );
});

When('me quedo sin intentos', async function () {
  await driver.actions().sendKeys('z').perform();
  await driver.actions().sendKeys('q').perform();
  await driver.actions().sendKeys('u').perform();
  await driver.actions().sendKeys('w').perform();
  await driver.actions().sendKeys('x').perform();
  await driver.actions().sendKeys('b').perform();
});

Then('debería ver mi resultado', async function () {
  let element = await driver.findElement(By.id('message'));
  let mensaje = await element.getText();
  assert.ok(mensaje.includes('Perdiste'));
});
