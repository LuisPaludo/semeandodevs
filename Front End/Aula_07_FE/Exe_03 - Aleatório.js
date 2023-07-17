// Inserção de dados pelo usuário
const num1 = +prompt("Digite o primeiro limite dos intervalos")
const num2 = +prompt("Digite o segundo limite dos intervalos")

// Criação da função
function Aleatorio(n1,n2){
    // Se o primeiro numero for maior que o segundo
    if(n1 > n2){
        // Fórmula -> Rand*(Max - Min) + Min
        const rand = Math.random() * (n1 - n2) + n2;
        console.log("O valor aleatório entre " + n2 + " e " + n1 + " é " + rand.toFixed(2));
        return rand.toFixed(2);
    }
    else{
        // Fórmula -> Rand*(Max - Min) + Min
        const  rand = Math.random() * (n2 - n1) + n1;
        console.log("O valor aleatório entre " + n1 + " e " + n2 + " é " + rand.toFixed(2));
        return rand.toFixed(2);
    }
}

p = Aleatorio(num1,num2);