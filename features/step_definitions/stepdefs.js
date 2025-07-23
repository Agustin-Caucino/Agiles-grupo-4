const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const Ahorcado = require('../../ahorcado.js');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let ultimoResultado;
let ultimaValidacion;
const options = new chrome.Options();
// options.addArguments('--headless');
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');
let driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

// Iniciando Juego
Given('que estoy en la pantalla principal', async function () {
  await driver.get('https://agustin-caucino.github.io/Agiles-grupo-4/');
  await driver.wait(until.elementLocated(By.id('start-game')));
});

When('selecciono juego nuevo', async function () {
  await driver.findElement(By.id('start-game')).click();
  await driver.sleep(500);
});

Then('debería crearse un nuevo juego', async function () {
  const element = await driver.findElement(By.id('word-display'));
  const textoFinal = await element.getText();
  assert.ok(textoFinal.includes('_'));
});

// Probando Letras
// Given('que inició un juego', async function () {
//   await driver.get('https://agustin-caucino.github.io/Agiles-grupo-4/');
//   await driver.wait(until.elementLocated(By.id('start-game')));
//   await driver.findElement(By.id('start-game')).click();
// });

Given('que inició un juego', async function () {
  await driver.get('https://agustin-caucino.github.io/Agiles-grupo-4/');

  // 1. Esperar a que la página se cargue completamente
  await driver.wait(until.elementLocated(By.id('start-game')), 1000);

  // 2. Obtener referencia fresca del elemento cada vez
  const startButton = await driver.findElement(By.id('start-game'));

  // 3. Esperar a que el elemento sea visible y clickeable
  await driver.wait(until.elementIsVisible(startButton), 2000);
  await driver.wait(until.elementIsEnabled(startButton), 2000);

  // 4. Click con manejo de errores
  try {
    await startButton.click();
  } catch (error) {
    // Fallback: usar JavaScript click si el click normal falla
    await driver.executeScript('arguments[0].click();', startButton);
  }

  // 5. Verificar que el juego realmente se inició
  await driver.wait(until.elementLocated(By.id('word-display')), 1000);
  const wordDisplay = await driver.findElement(By.id('word-display'));
  await driver.wait(until.elementTextContains(wordDisplay, '_'), 1000);
});

When('ingreso una letra correcta', async function () {
  await driver.actions().sendKeys('a').perform();
  await driver.sleep(500);
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
  await driver.sleep(500);
});

Then('debería ver mi resultado', async function () {
  let element = await driver.findElement(By.id('message'));
  let mensaje = await element.getText();
  assert.ok(mensaje.includes('Perdiste'));
});
