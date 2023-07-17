// Inserção de número pelo usuário
const num1 = +prompt("Digite um número")

// Contador auxiliar
var cont = 0;

// Verificação inicial: O dado digitado é um número?
if(!isNaN(num1)){

// Cálculo do valor absoluto do número (permite entrada de número negativo)
const num = Math.abs(num1);

// Loop para percorrer todos os divisores possíveis do número digitado, partindo do número até 2
for(let i = num; i > 1; i--){
    // Se o número inserido for divisível por um número menor que ele
    if(num%i == 0){
        // Contador recebe ele e o divisor
        cont = cont + i;
    }
}

// Se o contador final for igual ao número inserido, significa que o único divisor do numero é ele mesmo
if(cont == num){
    console.log("O número " + num1 + " é primo.")
}

// Caso contrário, o número não é primo
else{
    console.log("O número " + num1 + " não é primo.")
}

}

// O usuário digitou uma entrada diferente de um número
else{
    console.log("Digite uma entrada válida.")
}