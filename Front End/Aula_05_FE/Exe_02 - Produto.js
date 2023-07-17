// Inserção dos dados pelo usuário
var Nome = prompt("Digite o nome do produto");
var Quant = prompt("Digite a quantidade");
var Preço = prompt("Digite o valor unitário");

// Cálculo do valor total
var Total = parseInt(Quant)*parseInt(Preço);

// Conversão do valor total para a moeda local
var Total = Total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

// Impressão do nome com o valor total
console.log(Nome + " Valor Total " + Total);