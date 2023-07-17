// Criação da classe dados
class dados {
    // O construtor da classe irá receber 3 dados: Quantos km por dia a pessoa anda, quantas horas ela descansa e quantos
    // Km é a viagem
    constructor(kmh,rest,dist){
        this.kmh = parseFloat(kmh);
        this.rest = parseFloat(rest);
        this.dist = parseFloat(dist);
    } 

    // Criação da função para calcular o tempo de viagem
    time() {
        // Horas uteis de caminhada por dia da pessoa
        let horas_caminhada_dia = 24 - this.rest;
        // Quanto Km a pessoa faz em um dia
        let km_dia = horas_caminhada_dia * this.kmh;
        // Quantos dias (truncado) a pessoa irá demorar para finalizar a viagem
        this.dias = parseInt(this.dist/km_dia);
        // Quantas horas a pessoa irá demorar  no ultimo dia de viagem
        this.horas = (this.dist/km_dia - this.dias)*24;
        // Retorna o tempo da viagem
        return console.log(`A viagem irá terminar em ${this.dias} dias e ${this.horas} horas.`);
    }
}

// entrada de dados do usuário
var kmh = +prompt("Quantos Km você caminha por dia?");
var rest = +prompt("Quantas horas por dia você precisa descansar?");
var dist = +prompt("Qual a distância da viagem?");

// Inserção dos dados no construtor
var travel = new dados(kmh,rest,dist);
// Utilização da função para impressão do resultado
travel.time(); 
// Impressão do objeto
console.log(travel)