class fatores {
    constructor(Cura,Xp,Evolucao){
        this.Cura = Cura;
        this.Xp = Xp;
        this.Evolucao = Evolucao;
    }
}
const fatorCura = 0.2;
const fatorXP = 1.2;
const fatorEvolucao = 1.3;


const divisor = () => {
    console.log('**************');
}

const mundoDestruido = () => {
    console.clear();
    console.log('Nosso planeta foi destruído e o mal venceu! Aperte F5 para recomeçar.')
}

const reiniciar = () => {
    faseAtual = 1;
    inimigoAtual = selecionaFase(faseAtual);
    jogador.vida = jogador.vidaMaxima;
    selecionaOpcao();
}


const selecionaFase = (fase) => {
    return {
        ...inimigos.find(inimigo => inimigo.fase === fase)
    };
};

const perdeuJogo = () => {
    console.log('Você foi derrotado!');
    console.log('Selecione uma opção: ');
    console.log('1 - Reiniciar com o mesmo poder');
    console.log('2 - Sair');
    const opcao = +prompt('Selecione uma opção: ');
    console.clear();

    while (opcao < 1 || opcao > 2 || isNaN(opcao)) {
        perdeuJogo();
        return;
    }

    switch (opcao) {
        case 1:
            reiniciar();
            break;
        default:
            mundoDestruido();
    }
}


class player {
    constructor(nivel, vida, vidaMaxima, ataqueMaximo, xp, proximoNivel,faseAtual) {
        this.nivel = nivel;
        this.vida = vida;
        this.vidaMaxima = vidaMaxima;
        this.ataqueMaximo = ataqueMaximo;
        this.xp = xp;
        this.proximoNivel = proximoNivel;
        this.faseAtual = faseAtual;
    }

    status() {
        divisor();
        console.log(`Herói: ${heroi} lvl ${this.nivel}`);
        console.log(`Vida: ${this.vida}`);
        console.log(`XP: ${this.xp}/${this.proximoNivel}`);
        console.log(`Ataque máximo: ${this.ataqueMaximo}`);
    }

    curar() {
        const cura = Math.floor(this.vidaMaxima * fator.Cura);
        this.vida = Math.min(this.vidaMaxima, this.vida + cura);
        console.log(`${heroi} curou com ${cura}`);
        acaoInimigo();
    }

    calculaXp(totalXp) {
        this.xp += totalXp;
        if (this.xp >= this.proximoNivel) {
            const diferenca = this.xp - this.proximoNivel;
            this.vidaMaxima = Math.ceil(fatorXP * this.vidaMaxima);
            this.vida = this.vidaMaxima;
            this.ataqueMaximo = Math.ceil(this.ataqueMaximo * fator.Xp);
            this.proximoNivel = Math.ceil(this.proximoNivel * fator.Evolucao);
            this.xp = 0;
            this.nivel++;
            this.calculaXp(diferenca);
        }
    }

    atacar() {
        const ataqueHeroi = Math.ceil(Math.random() * this.ataqueMaximo);
        inimigoAtual.vida -= ataqueHeroi;
        console.log(`${heroi} atacou com ${ataqueHeroi}`);

        if (inimigoAtual.vida > 0) {
            inimigo.acaoInimigo(inimigoAtual);
        } else {
            console.log(`${heroi} derrotou ${inimigoAtual.nome} e ganhou ${inimigoAtual.experiencia}`);
            this.calculaXp(inimigoAtual.experiencia);
            inimigoAtual = selecionaFase(++faseAtual);
            if (inimigoAtual.nome) {
                selecionaOpcao();
            } else {
                console.clear();
                console.log(`Parabéns, ${heroi}! Você salvou a humanidade!`);
                console.log('Aperte F5 para reiniciar.');
            }
        }
    }

    nomeHeroi() {
        if (localStorage.getItem('heroi')) {
            heroi = localStorage.getItem('heroi');
        } else {
            heroi = prompt('Informe o nome do herói: ');
            localStorage.setItem('heroi', heroi);
        }

        console.log(`Bem-vindo, ${heroi}!`);
        console.log('Nosso planeta está sendo atacado por poderosos inimigos e dependemos de você para salvá-lo.');
        console.log('Preparado(a) para começar?');

        const preparado = prompt('Digite "s" para continuar ou qualquer outra opção para sair: ');
    // try{
        if (preparado.toLowerCase() === 's') {
            console.clear();
            inimigoAtual = selecionaFase(this.faseAtual);
            selecionaOpcao();
        } else {
            mundoDestruido();
        }
    // }
    // catch(e){
    //     console.log(e);
    //     // mundoDestruido();
    // }
    // finally{
    //     mundoDestruido();
    // }
    };
}

const selecionaOpcao = () => {
    inimigo.mostraStatusInimigo(inimigoAtual);
    jogador.status();

    divisor();
    console.log('Selecione uma opção: ');
    console.log('1 - Atacar');
    console.log('2 - Curar');
    console.log('3 - Sair');
    const opcao = +prompt('Informe a opção: ');
    console.clear();

    while (opcao < 1 || opcao > 3 || isNaN(opcao)) {
        selecionaOpcao();
        return;
    }

    switch (opcao) {
        case 1:
            jogador.atacar();
            break;
        case 2:
            jogador.curar();
            break;
        default:
            mundoDestruido();
    }
}

const inimigos = [
    {
        fase: 1,
        nome: 'Babidi',
        vida: 10,
        vidaMaxima: 10,
        experiencia: 5,
        ataqueMaximo: 2,
    },
    {
        fase: 2,
        nome: 'Dr. Gero',
        vida: 30,
        vidaMaxima: 30,
        experiencia: 7,
        ataqueMaximo: 5,
    },
    {
        fase: 3,
        nome: 'Vegeta',
        vida: 50,
        vidaMaxima: 50,
        experiencia: 10,
        ataqueMaximo: 10,
    },
    {
        fase: 4,
        nome: 'Androides 17 e 18',
        vida: 90,
        vidaMaxima: 90,
        experiencia: 20,
        ataqueMaximo: 15,
    },
    {
        fase: 5,
        nome: 'Broly',
        vida: 130,
        vidaMaxima: 130,
        experiencia: 40,
        ataqueMaximo: 20,
    },
    {
        fase: 6,
        nome: 'Zamasu/Goku Black',
        vida: 170,
        vidaMaxima: 170,
        experiencia: 70,
        ataqueMaximo: 25,
    },
    {
        fase: 7,
        nome: 'Piccolo Daimaoh',
        vida: 220,
        vidaMaxima: 220,
        experiencia: 100,
        ataqueMaximo: 30,
    },
    {
        fase: 8,
        nome: 'Cell',
        vida: 400,
        vidaMaxima: 400,
        experiencia: 150,
        ataqueMaximo: 60,
    },
    {
        fase: 9,
        nome: 'Majin Boo',
        vida: 600,
        vidaMaxima: 600,
        experiencia: 200,
        ataqueMaximo: 120,
    },
    {
        fase: 10,
        nome: 'Freeza',
        vida: 1000,
        vidaMaxima: 1000,
        experiencia: 250,
        ataqueMaximo: 200,
    }
];

class enemy {
    curaInimigo(inimigoAtual) {
        const cura = Math.floor(inimigoAtual.vidaMaxima * fatorCura);
        inimigoAtual.vida = Math.min(inimigoAtual.vidaMaxima, inimigoAtual.vida + cura);
        console.log(`${inimigoAtual.nome} curou com ${cura}`);
    }

    ataqueInimigo(inimigoAtual) {
        const ataque = Math.ceil(Math.random() * inimigoAtual.ataqueMaximo);
        jogador.vida -= ataque;
        console.log(`${inimigoAtual.nome} atacou com ${ataque}`);
    }

    mostraStatusInimigo(inimigoAtual) {
        divisor();
        console.log(`Inimigo: ${inimigoAtual.nome} lvl ${inimigoAtual.fase}`);
        console.log(`Vida: ${inimigoAtual.vida}`);
    }

    acaoInimigo(inimigoAtual) {
        const acao = Math.ceil(Math.random() * 3) % 3 === 0 ? 'curar' : 'atacar';
    
        if (acao === 'atacar') {
            this.ataqueInimigo(inimigoAtual);
        } else {
            this.curaInimigo(inimigoAtual);
        }
    
        if (jogador.vida > 0) {
            selecionaOpcao();
        } else {
            perdeuJogo();
        }
    };
    
}

let heroi = '';
let inimigoAtual = inimigos[0];
let faseAtual = 1;

const jogador = new player(1, 20, 20, 3, 0, 5,1);
const fator = new fatores(0.2,1.2,1.3);
const inimigo = new enemy();

jogador.nomeHeroi();
