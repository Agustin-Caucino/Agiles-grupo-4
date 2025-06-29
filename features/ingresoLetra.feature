Feature: Ingreso Letra
  Como usuario 
  Quiero poder ingresar una letra
  Para ver si esta en la palabra

  Scenario: Letra Correcta
    Given que inició un juego
    When ingreso una letra correcta
    Then debería ver que la letra pertenece a la palabra

  Scenario: Letra incorrecta
    Given que inició un juego
    When ingreso una letra incorrecta
    Then debería ver que la letra no pertenece a la palabra