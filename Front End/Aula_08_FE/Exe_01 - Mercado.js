// Entrada inicial
var entrada = prompt("Digite os componentes da lista de mercado \n Digite 'Fim' para encerrar")
// Criação de Array vazia
let lista = [];

// Formatação da entrada para minusculas
entrada.toLowerCase();

// Enquanto a entrada for diferente de 'fim'
while(entrada != 'fim'){
    // O dado é inserido na lista
    lista.push(entrada);
    // Entrada recebe novo dado do usuário
    entrada = prompt("Digite outro item");
}

// ao final, imprime-se a lista com as informações
console.log(lista);
