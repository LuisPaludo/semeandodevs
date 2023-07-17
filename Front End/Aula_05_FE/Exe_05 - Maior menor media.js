// Inserção dos dados pelo usuário
var n1 = prompt("Insira o primeiro número");
var n2 = prompt("Insira o segundo número");
var n3 = prompt("Insira o terceiro número");

// Conversão das strings para inteiros
var n1 = parseInt(n1);
var n2 = parseInt(n2);
var n3 = parseInt(n3);

// Criação de um array com os numeros inseridos
var n = [n1, n2, n3];

// Cálculos
var Media = (n1 + n2 + n3)/3;
var Maior = Math.max(...n);
var Menor = Math.min(...n);

// Impressão dos resultados
console.log("O maior número inserido é " + Maior + " o menor número inserido é " + Menor + " e a média de todos é " + Media);

