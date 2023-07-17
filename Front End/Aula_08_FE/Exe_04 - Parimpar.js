// Entrada de dados
var num1 = +prompt("Insira o primeiro numero do intervalo:")
var num2 = +prompt("Insira o segundo número do intervalo:")

// Arrays vazias
let lista_par = [];
let lista_impar = [];
let lista = [];

// Teste para o sentido da contagem
if(num2 >= num1){
    // Percorrendo o intervalo digitado
    for(let i = num1; i <= num2; i++){
        lista.push(i);
    }
}
// Sentido contrário de inserção de dados (num 1 > num2)
else {
    // Percorre no mesmo sentido
    for(let i = num2; i <= num1; i++){
        lista.push(i);
    }
}

// Filtro dos dados
lista_par = lista.filter(numero => numero%2 == 0)
lista_impar = lista.filter(numero => numero %2 != 0)

// Impressão dos resultados
console.log(lista_par)
console.log(lista_impar)