// Inserção do dado pelo usuário
var n = prompt("Insira um número inteiro entre 100 e 999");
var n = parseInt(n);

// Obtenção da centena
var Centena = Math.floor(n/100);

// Obtenção da Dezena
var Dezena = n%100;
var Dezena = Math.floor(Dezena/10);

// Obtenção da unidade
var Unidade = n%10;

// Impressão dos resultados
console.log("Centena: " + Centena);
console.log("Dezena: " + Dezena);
console.log("Unidade: " + Unidade);

