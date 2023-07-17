// Criação da função
function rgb_random(){
    // Geração dos números randômicos
    var r = Math.ceil(Math.random()*255);
    var g = Math.ceil(Math.random()*255);
    var b = Math.ceil(Math.random()*255);
    // Criação de vetor com os resultados
    var rgb = [r, g, b];
    // Retorno da função
    return ("Rgb: (" + rgb + ")")
}

console.log(rgb_random())