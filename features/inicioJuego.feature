Feature: Inicio un nuevo juego
  Como usuario 
  Quiero iniciar un nuevo juego
  Para jugar

  Scenario: Juego iniciado
    Given que estoy en la pantalla principal
    When selecciono juego nuevo
    Then debería crearse un nuevo juego


