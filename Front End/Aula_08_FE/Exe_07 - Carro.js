// Criação do objeto carro
let carro = {
    Marca: 'Wolkswagen',
    Modelo: 'Golf',
    Cor: 'Azul-Marinho Perolado',
    Opcionais: ['Ar-Condicionado','Direção Hidráulica'],
    imprime: function(){
        console.log(`Objeto -> Carro, Marca: ${this.Marca}, Modelo: ${this.Modelo}, Cor: ${this.Cor}, Opcionais: ${this.Opcionais}`);
    }
}

// Impressão do resultado
console.log(carro)
carro.imprime();