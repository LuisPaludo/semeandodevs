// Entrada de dado pelo usuário com conversão para valor numérico
const ano = +prompt("Digite um ano")

// Verificação se o valor inserido é um número
if(!isNaN(ano)){
    // Se o ano é divisível por 4 com exceção das viradas de século
    if(ano % 4 == 0 && !(ano%100 == 0)){
        console.log("O ano é bissexto.")
    }
    // Se o ano é virada de século e divisível por 400
    else if( ano%100 == 0 && ano%400 == 0){
        console.log("O ano é bissexto.")
    }
    // Nenhuma condição satisfeita
    else{
        console.log("O ano não é bissexto.")
    }
}
// Valor inserido não é número
else{
    console.log("Digite um ano válido.")
}