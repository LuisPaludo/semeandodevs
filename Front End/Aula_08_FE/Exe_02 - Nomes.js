// Entrada de dados pelo usuário
var nome = prompt("Digite um nome\n Para encerrar, digite 'fim'");
// Criação da arrays vazias
let list = [];
let list_vogal = [];

// Formatação da entrada
nome.toLowerCase();

// Enquanto a entrada for diferente de 'fim'
while(nome != 'fim'){
    // Adiciona o nome na lista
    list.push(nome);
    // Pede uma nova entrada ao usuário
    nome = prompt("Digite um nome");
}

// Função que filtra a partir das condições dadas no retorno
var result = list.filter(nome => {
    return nome[0] === ('a') || nome[0] === ('e') || nome[0] === ('i') || nome[0] === ('o') || nome[0] === ('u')    
})

// Impressão do resultado
console.log(result)

// Impressão da lista completa
console.log(list)