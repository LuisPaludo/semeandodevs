// Inserção de dados pelo usuário
const peso = +prompt("Digite seu peso")
const altura = +prompt("Digite sua altura")

// Criação da função IMC
function IMC(peso,altura) {
    // Cálculo do IMC
    var IMC = peso/(altura*altura);
    // Classificação de acordo com o valor
    if (IMC < 16){
        console.log("O valor de " + IMC.toFixed(2) + " indica que a pessoa está com Subpeso Severo.")
    }
    else if(IMC < 19.9){
        console.log("O valor de " + IMC.toFixed(2) + " indica que a pessoa está com Subpeso.")
    }
    else if(IMC < 24.9){
        console.log("O valor de " + IMC.toFixed(2) + " indica que a pessoa está com peso Normal.")
    }
    else if(IMC < 29.9){
        console.log("O valor de " + IMC.toFixed(2) + " indica que a pessoa está com Sobrepeso.")
    }
    else if(IMC < 39.9){
        console.log("O valor de " + IMC.toFixed(2) + " indica que a pessoa está Obesa.")
    }
    else{
        console.log("O valor de " + IMC.toFixed(2) + " indica que a pessoa está com Obesidade Mórbida.")
    }
    return IMC;
}

IMC(peso,altura)

