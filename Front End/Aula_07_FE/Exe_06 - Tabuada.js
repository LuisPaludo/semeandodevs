// Inserção do número pelo usuário
const num =  +prompt("Digite um número entre 0 e 10 para obter sua tabuada");

// Definição da função com dois argumentos
function tabuada(n,cont){
    // Caso o segundo parâmetro não seja fornecido (desconhecido)
    if(cont === undefined){
        // Contador assume o valor de 0
        cont = 0;
    }
    // Se o contador atingir o valor máximo, retorna a função
    else if (cont === 10){
        return;
    }
    // Se não, conta de 0 a 10
    else{
        cont = cont + 1;
    }
    // Imprime o resultado
    console.log(`Tabuada -> ${n} x ${cont} = ${n*cont}`)
    // Recursividade
    return (tabuada(n,cont))
}

tabuada(num)