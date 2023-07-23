import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dojo-ng';

  heroi = 'Goku';
  faseAtual = 0;

  fatorCura = 0.2;
  fatorXP = 1.2;
  fatorEvolucao = 1.3;
  fatorCritico = 3;

  playerAtacando = false;
  inimigoAtacando = false;

  playerCurando = false;
  inimigoCurando = false;


  inimigos = [
    {
        fase: 1,
        nome: 'Kuririn',
        vida: 10,
        vidaMaxima: 10,
        experiencia: 5,
        ataqueMaximo: 2,
        tempoCura: 1500,
        tempoAtaque: 2550,
        urlNormal: '/assets/kuririn/kuririn-normal.gif',
        urlAtacando: '/assets/kuririn/kuririn-atacando.gif',
        urlCurando: '/assets/kuririn/kuririn-curando.gif',
    },
    {
        fase: 2,
        nome: 'Goten',
        vida: 15,
        vidaMaxima: 15,
        experiencia: 7,
        ataqueMaximo: 5,
        tempoCura: 1200,
        tempoAtaque: 2800,
        urlNormal: '/assets/goten/goten-normal.gif',
        urlAtacando: '/assets/goten/goten-atacando.gif',
        urlCurando: '/assets/goten/goten-curando.gif',
    },
    {
        fase: 3,
        nome: 'Gohan',
        vida: 20,
        vidaMaxima: 20,
        experiencia: 15,
        ataqueMaximo: 10,
        tempoCura: 800,
        tempoAtaque: 4400,
        urlNormal: '/assets/gohan/gohan-normal.gif',
        urlAtacando: '/assets/gohan/gohan-atacando.gif',
        urlCurando: '/assets/gohan/gohan-curando.gif',
    },
    {
        fase: 4,
        nome: 'Vegeta',
        vida: 45,
        vidaMaxima: 45,
        experiencia: 20,
        ataqueMaximo: 15,
        tempoCura: 1000,
        tempoAtaque: 6000,
        urlNormal: '/assets/vegeta/vegeta-normal.gif',
        urlAtacando: '/assets/vegeta/vegeta-atacando.gif',
        urlCurando: '/assets/vegeta/vegeta-curando.gif',
    },
    {
        fase: 5,
        nome: 'Cell',
        vida: 90,
        vidaMaxima: 90,
        experiencia: 40,
        ataqueMaximo: 20,
        tempoCura: 1500,
        tempoAtaque: 1400,
        urlNormal: '/assets/cell/cell-normal.gif',
        urlAtacando: '/assets/cell/cell-atacando2.gif',
        urlCurando: '/assets/cell/cell-curando.gif',

    },
    {
        fase: 6,
        nome: 'Baby Vegeta',
        vida: 120,
        vidaMaxima: 120,
        experiencia: 70,
        ataqueMaximo: 25,
        tempoCura: 400,
        tempoAtaque: 4050,
        urlNormal: '/assets/babyvg/babyvg-normal.gif',
        urlAtacando: '/assets/babyvg/babyvg-atacando2.gif',
        urlCurando: '/assets/babyvg/babyvg-curando.gif',
    },
    {
        fase: 7,
        nome: 'Goku Black',
        vida: 150,
        vidaMaxima: 150,
        experiencia: 100,
        ataqueMaximo: 30,
        tempoCura: 1600,
        tempoAtaque: 2400,
        urlNormal: '/assets/black/black-normal.gif',
        urlAtacando: '/assets/black/black-atacando.gif',
        urlCurando: '/assets/black/black-curando.gif',
    },
    {
        fase: 8,
        nome: 'Xeno Goku',
        vida: 200,
        vidaMaxima: 200,
        experiencia: 150,
        ataqueMaximo: 60,
        tempoCura: 1400,
        tempoAtaque: 5000,
        urlNormal: '/assets/xenogoku/xenogoku-normal.gif',
        urlAtacando: '/assets/xenogoku/xenogoku-atacando.gif',
        urlCurando: '/assets/xenogoku/xenogoku-curando.gif',
    },
    {
        fase: 9,
        nome: 'Jiren',
        vida: 250,
        vidaMaxima: 250,
        experiencia: 200,
        ataqueMaximo: 120,
        tempoCura: 600,
        tempoAtaque: 4200,
        urlNormal: '/assets/jiren/jiren-normal.gif',
        urlAtacando: '/assets/jiren/jiren-atacando.gif',
        urlCurando: '/assets/jiren/jiren-curando.gif',
    },
    {
        fase: 10,
        nome: 'J0ISSON',
        vida: 1000,
        vidaMaxima: 1000,
        experiencia: 250,
        ataqueMaximo: 200,
        tempoCura: 600,
        tempoAtaque: 4200,
        urlNormal: '/assets/jiren/jiren-normal.gif',
        urlAtacando: '/assets/jiren/jiren-atacando.gif',
        urlCurando: '/assets/jiren/jiren-curando.gif',
    }
];

inimigoAtual = this.inimigos[this.faseAtual];
urlInimigo = this.inimigoAtual.urlNormal;

player = {
  nivel: 1,
  vida: 20,
  vidaMaxima: 20,
  ataqueMaximo: 3,
  xp: 0,
  proximoNivel: 5,
  chanceCritico: 0.3,
  urlNormal: '/assets/playerNormal.gif',
  urlAtacando: '/assets/playerAtacando.gif',
  urlCurando: '/assets/playerCurando.gif',
  urlApanhando: '/assets/playerApanhando.png',
  urlCritico: '/assets/playerCritico.gif',
}

urlPlayer:string = this.player.urlNormal;

selecionaFase = (fase:number) => {
  return {
      ...this.inimigos.find(inimigo => inimigo.fase === fase)
  };
};

defineVidaPlayer() {
  let styles = {
    'width': this.player.vida/this.player.vidaMaxima*100 + '%',
  };
  return styles;
}

defineVidaInimigo() {
  let styles = {
    'width': this.inimigoAtual.vida/this.inimigoAtual.vidaMaxima*100 + '%',
  };
  return styles;
}

atacar = () => {
  if(Math.random() < this.player.chanceCritico){
    this.playerAtacando = true;
    this.urlPlayer = this.player.urlCritico;
    let ataqueHeroi = Math.ceil(Math.random() * this.player.ataqueMaximo);
    if (ataqueHeroi < 0.6*this.player.ataqueMaximo){
      ataqueHeroi = Math.ceil(0.6*this.player.ataqueMaximo);
    }
    setTimeout(() => {
      this.inimigoAtual.vida -= this.fatorCritico*ataqueHeroi;
      this.playerAtacando = false;
      this.urlPlayer = this.player.urlNormal;
      if (this.inimigoAtual.vida > 0) {
        this.acaoInimigo();
      } 
      else {
        this.calculaXp(this.inimigoAtual.experiencia);
        this.inimigoAtual = this.inimigos[++this.faseAtual];
        this.urlInimigo = this.inimigoAtual.urlNormal;
      }
    }, 6500);
    return
  }
  else{
    this.playerAtacando = true;
    this.urlPlayer = this.player.urlAtacando;
    let ataqueHeroi = Math.ceil(Math.random() * this.player.ataqueMaximo);
    if (ataqueHeroi < 0.6*this.player.ataqueMaximo){
      ataqueHeroi = Math.ceil(0.6*this.player.ataqueMaximo);
    }

    setTimeout(() => {
      this.inimigoAtual.vida -= ataqueHeroi;
      this.playerAtacando = false;
      this.urlPlayer = this.player.urlNormal;
      if (this.inimigoAtual.vida > 0) {
        this.acaoInimigo();
    } else {
        this.calculaXp(this.inimigoAtual.experiencia);
        this.inimigoAtual = this.inimigos[++this.faseAtual];
        this.urlInimigo = this.inimigoAtual.urlNormal;
    }
  }, 1500);
  return
} 
};

calculaXp = (totalXp:number) => {
  this.player.xp += totalXp;
  if (this.player.xp >= this.player.proximoNivel) {
      const diferenca = this.player.xp - this.player.proximoNivel;
      this.player.vidaMaxima = Math.ceil(this.fatorXP * this.player.vidaMaxima);
      this.player.vida = this.player.vidaMaxima;
      this.player.ataqueMaximo = Math.ceil(this.player.ataqueMaximo * this.fatorXP);
      this.player.proximoNivel = Math.ceil(this.player.proximoNivel * this.fatorEvolucao);
      this.player.xp = 0;
      this.player.nivel++;
      this.calculaXp(diferenca);
  }
}

acaoInimigo = () => {
  const acao = Math.ceil(Math.random() * 3) % 3 === 0 ? 'curar' : 'atacar';

  if (acao === 'atacar') {
      this.ataqueInimigo();
  } else {
      this.curaInimigo();
  }

  if (this.player.vida <= 0){
    this.inimigoAtual = this.inimigos[0];
    for (let inimigo in this.inimigos) {
      this.inimigos[inimigo].vida = this.inimigos[inimigo].vidaMaxima;
    }
    this.inimigoAtual.vida = this.inimigoAtual.vidaMaxima;
    this.faseAtual = 0;
    this.player.vida = this.player.vidaMaxima;
  }

};

ataqueInimigo = () => {
  this.inimigoAtacando = true;
  this.urlPlayer = this.player.urlApanhando;
  this.urlInimigo = this.inimigoAtual.urlAtacando;
  let ataque = Math.ceil(Math.random() * this.inimigoAtual.ataqueMaximo);
  this.player.vida -= ataque;

  setTimeout(() => {
    this.inimigoAtacando = false;
    this.urlPlayer = this.player.urlNormal;
    this.urlInimigo = this.inimigoAtual.urlNormal;
}, this.inimigoAtual.tempoAtaque);
};

curaInimigo = () => {
  this.inimigoCurando = true;
  this.urlInimigo = this.inimigoAtual.urlCurando;

  setTimeout(() => {
    this.inimigoCurando = false;
    this.urlInimigo = this.inimigoAtual.urlNormal;
    let cura = Math.floor(this.inimigoAtual.vidaMaxima * this.fatorCura);
    this.inimigoAtual.vida = Math.min(this.inimigoAtual.vidaMaxima, this.inimigoAtual.vida + cura);
  }, this.inimigoAtual.tempoCura);
};

curar = () => {
  this.playerCurando = true;
  this.urlPlayer = this.player.urlCurando;

  setTimeout(() => {
  this.playerCurando = false;
  this.urlPlayer = this.player.urlNormal;
  let cura = Math.floor(this.player.vidaMaxima * this.fatorCura);
  this.player.vida = Math.min(this.player.vidaMaxima, this.player.vida + cura);
  this.acaoInimigo();
}, 1920);
  
};

}
