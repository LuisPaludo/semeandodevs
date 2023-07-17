// Entrada de dado pelo usuário
var palavra = prompt("Digite uma palavra");

// Separação da palavra em uma array
let palavra_array = palavra.split("");
// Reversão do array anteriormente criado
let palavra_array_reverse = palavra_array.reverse();
// União do array anteriormente revertido
let palavra_reverse = palavra_array_reverse.join("");

// Teste para descorbrir se é um palíndromo
if(palavra == palavra_reverse){
    console.log("A palavra " + palavra + " é um palíndromo.")
}
else {
    console.log("A palavra " + palavra + " não é um palíndromo.")
}