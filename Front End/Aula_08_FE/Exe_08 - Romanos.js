// Tabela de referência
const tabela = {
    M:1000,
    CM:900,
    D:500,
    CD:400,
    C:100,
    XC:90,
    L:50,
    XL:40,
    X:10,
    IX:9,
    V:5,
    IV:4,
    I:1
}

// Entrada = prompt("Insira um número em algarismos romanos");
var entry = 'XLIV';

// Divisão da entrada
var entry_split = entry.split("");

// Variável para armazenar o resultado
var res = 0;    

// Para um valor de i, dentre o tamanho da string especificada na entrada
for(let i = 0; i < entry_split.length; i++){
    // Cria-se um valor de teste, o qual considera a posição 'i' e 'i+1'
    var teste = entry_split[i] + entry_split[i+1];
    // Caso o valor de teste seja uma quantia válida na tabela de referência
    if(tabela[teste]){
        // O resultado é armazenado
        var res = res + tabela[teste];
        // E um índice é pulado
        i++;
    }
    // Caso contrárop
    else{
        // O valor de resultado apenas recebe a entrada [i]
        var res = res + tabela[entry_split[i]];
    }
}

// Impressão do resultado
console.log(`O algarismo romano ${entry} equivale à -> ${res}`);