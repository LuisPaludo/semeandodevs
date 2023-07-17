// Inserção dos dados pelo usuário
var Ovos = prompt("Insira a quantidade de ovos");

// Cálculo
var Duzias = parseInt(Ovos)/12;

// Arredondamento do valor para o inteiro mais próximo
var Duzias = Math.round(Duzias);

// Cálculo da quantia restante de ovos
var Resto = parseInt(Ovos) - 12*Duzias;

// Impressão do resultado
console.log("A quantia de " + Ovos + " ovos equivalem a " + Duzias + " duzias e " + Resto + " ovos.")