// Inserção de dado pelo usuário com conversão para valor numérico
const nota1 = +prompt("Insira a média do aluno (entre 0 e 10)")

// Criação da função
function Testa_aluno(nota){
    // Verificação se o número está dentro do intervalo
if (nota >= 0 && nota <= 10){
    // Verificação se está reprovado
    if (nota >= 0 && nota < 6){
        console.log("O aluno com nota " + nota + " está reprovado.")
    }
    // Verificação se está em recuperação
    else if(nota >= 6 &&  nota < 7){
        console.log("O aluno com nota " + nota + " está em recuperação.")
    }
    // Caso nenhum enquadramento anterior, aluno está aprovado
    else{
        console.log("O aluno com nota " + nota + " está aprovado.")
    }
}
// Valor inserido inválido
else{
    console.log("Número inválido ou fora do intervalo.")
}
}

Testa_aluno(nota1)