let heroi = '';
let faseAtual = 1;
let inimigoAtual;

const fatorCura = 0.2;
const fatorXP = 1.2;
const fatorEvolucao = 1.3;

const mostraStatusInimigo = (inimigo) => {
    divisor();
    console.log(`Inimigo: ${inimigo.nome} lvl ${inimigo.fase}`);
    console.log(`Vida: ${inimigo.vida}`);
}

const inimigos = [
    {
        fase: 1,
        nome: 'Babidi',
        vida: 10,
        vidaMaxima: 10,
        experiencia: 5,
        ataqueMaximo: 2,
        status: function () {
            mostraStatusInimigo(this);
        }
    },
    {
        fase: 2,
        nome: 'Dr. Gero',
        vida: 30,
        vidaMaxima: 30,
        experiencia: 7,
        ataqueMaximo: 5,
        status: function () {
            mostraStatusInimigo(this);
        }
    },
    {
        fase: 3,
        nome: 'Vegeta',
        vida: 50,
        vidaMaxima: 50,
        experiencia: 10,
        ataqueMaximo: 10,
        status: function () {
            mostraStatusInimigo(this);
        }
    },
    {
        fase: 4,
        nome: 'Androides 17 e 18',
        vida: 90,
        vidaMaxima: 90,
        experiencia: 20,
        ataqueMaximo: 15,
        status: function () {
            mostraStatusInimigo(this);
        }
    },
    {
        fase: 5,
        nome: 'Broly',
        vida: 130,
        vidaMaxima: 130,
        experiencia: 40,
        ataqueMaximo: 20,
        status: function () {
            mostraStatusInimigo(this);
        }
    },
    {
        fase: 6,
        nome: 'Zamasu/Goku Black',
        vida: 170,
        vidaMaxima: 170,
        experiencia: 70,
        ataqueMaximo: 25,
        status: function () {
            mostraStatusInimigo(this);
        }
    },
    {
        fase: 7,
        nome: 'Piccolo Daimaoh',
        vida: 220,
        vidaMaxima: 220,
        experiencia: 100,
        ataqueMaximo: 30,
        status: function () {
            mostraStatusInimigo(this);
        }
    },
    {
        fase: 8,
        nome: 'Cell',
        vida: 400,
        vidaMaxima: 400,
        experiencia: 150,
        ataqueMaximo: 60,
        status: function () {
            mostraStatusInimigo(this);
        }
    },
    {
        fase: 9,
        nome: 'Majin Boo',
        vida: 600,
        vidaMaxima: 600,
        experiencia: 200,
        ataqueMaximo: 120,
        status: function () {
            mostraStatusInimigo(this);
        }
    },
    {
        fase: 10,
        nome: 'Freeza',
        vida: 1000,
        vidaMaxima: 1000,
        experiencia: 250,
        ataqueMaximo: 200,
        status: function () {
            mostraStatusInimigo(this);
        }
    }
];

const divisor = () => {
    console.log('**************');
}

const player = {
    nivel: 1,
    vida: 20,
    vidaMaxima: 20,
    ataqueMaximo: 3,
    xp: 0,
    proximoNivel: 5,
    status: function () {
        divisor();
        console.log(`Herói: ${heroi} lvl ${this.nivel}`);
        console.log(`Vida: ${this.vida}`);
        console.log(`XP: ${this.xp}/${this.proximoNivel}`);
        console.log(`Ataque máximo: ${this.ataqueMaximo}`);
    }
}

const selecionaFase = (fase) => {
    return {
        ...inimigos.find(inimigo => inimigo.fase === fase)
    };
};

const mundoDestruido = () => {
    console.clear();
    console.log('Nosso planeta foi destruído e o mal venceu! Aperte F5 para recomeçar.')
};

const ataqueInimigo = () => {
    const ataque = Math.ceil(Math.random() * inimigoAtual.ataqueMaximo);
    player.vida -= ataque;
    console.log(`${inimigoAtual.nome} atacou com ${ataque}`);
};

const curaInimigo = () => {
    const cura = Math.floor(inimigoAtual.vidaMaxima * fatorCura);
    inimigoAtual.vida = Math.min(inimigoAtual.vidaMaxima, inimigoAtual.vida + cura);
    console.log(`${inimigoAtual.nome} curou com ${cura}`);
};

const reiniciar = () => {
    faseAtual = 1;
    inimigoAtual = selecionaFase(faseAtual);
    player.vida = player.vidaMaxima;
    selecionaOpcao();
}

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
};

const acaoInimigo = () => {
    const acao = Math.ceil(Math.random() * 3) % 3 === 0 ? 'curar' : 'atacar';

    if (acao === 'atacar') {
        ataqueInimigo();
    } else {
        curaInimigo();
    }

    if (player.vida > 0) {
        selecionaOpcao();
    } else {
        perdeuJogo();
    }
};

const calculaXp = (totalXp) => {
    player.xp += totalXp;

    if (player.xp >= player.proximoNivel) {
        const diferenca = player.xp - player.proximoNivel;
        player.vidaMaxima = Math.ceil(fatorXP * player.vidaMaxima);
        player.vida = player.vidaMaxima;
        player.ataqueMaximo = Math.ceil(player.ataqueMaximo * fatorXP);
        player.proximoNivel = Math.ceil(player.proximoNivel * fatorEvolucao);
        player.xp = 0;
        player.nivel++;
        calculaXp(diferenca);
    }
}

const atacar = () => {
    const ataqueHeroi = Math.ceil(Math.random() * player.ataqueMaximo);
    inimigoAtual.vida -= ataqueHeroi;
    console.log(`${heroi} atacou com ${ataqueHeroi}`);

    if (inimigoAtual.vida > 0) {
        acaoInimigo();
    } else {
        console.log(`${heroi} derrotou ${inimigoAtual.nome} e ganhou ${inimigoAtual.experiencia}`);
        calculaXp(inimigoAtual.experiencia);
        inimigoAtual = selecionaFase(++faseAtual);
        if (inimigoAtual.nome) {
            selecionaOpcao();
        } else {
            console.clear();
            console.log(`Parabéns, ${heroi}! Você salvou a humanidade!`);
            console.log('Aperte F5 para reiniciar.');
        }
    }
};

const curar = () => {
    const cura = Math.floor(player.vidaMaxima * fatorCura);
    player.vida = Math.min(player.vidaMaxima, player.vida + cura);
    console.log(`${heroi} curou com ${cura}`);
    acaoInimigo();
};

const selecionaOpcao = () => {
    inimigoAtual.status();
    player.status();

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
            atacar();
            break;
        case 2:
            curar();
            break;
        default:
            mundoDestruido();
    }
}

const nomeHeroi = () => {
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

    if (preparado.toLowerCase() === 's') {
        console.clear();
        inimigoAtual = selecionaFase(faseAtual);
        selecionaOpcao();
    } else {
        mundoDestruido();
    }
};

setTimeout(() => {
    nomeHeroi();
}, 5000);