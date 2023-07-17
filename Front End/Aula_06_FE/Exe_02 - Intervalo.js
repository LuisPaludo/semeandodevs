// Inservção de dados com conversão para valor numérico
const ini = +prompt("Digite um número inicial:")
const fim = +prompt("Digite um número final:")

// Verificação inicial se o valor digitado corresponde a digitos
if(!isNaN(ini) && !isNaN(fim)){
    // Identificação do sentido do intervlao
    if (ini < fim){
        // Se ini é menor que fim, então será incrementado
        for(let i = ini; i <= fim; i++){
            if(i%2 == 0){
                console.log("Número: " + i + " é um número par.")
            }
            else{
                console.log("Número: " + i + " é um número ímpar.")
            }
        }
    }
    else{
        // Se ini for maior que fim, então será decrementado
        for(let i = ini; i >= fim; i--){
            if(i%2 == 0){
                console.log("Número: " + i + " é um número par.")
            }
            else{
                console.log("Número: " + i + " é um número ímpar.")
            }
        }
    }
}
// Resposta para dado inserido que não corresponde a valor numérico
else{
    console.log("Digite um intervalo válido.")
}
