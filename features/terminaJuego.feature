Feature: Termino juego
  Como usuario 
  Quiero poder terminar un juego
  Para poder ver mi resultado

  Scenario: Me quedo sin intentos
    Given que inició un juego
    When me quedo sin intentos
    Then debería ver mi resultado
