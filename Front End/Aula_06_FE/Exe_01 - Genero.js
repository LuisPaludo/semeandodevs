// Coleta de dado do usuário
const gen = prompt("Informe seu gênero (m ou f)")

// Teste lógico
if (gen == 'm' || gen == 'M'){
    // Impressão do resultado
    console.log("Você é do sexo masculino.")
}
else if (gen == 'f' || gen == 'F'){
    console.log("Você é do sexo feminino.")
}
else{
    console.log("Digite um genêro válido.")
}