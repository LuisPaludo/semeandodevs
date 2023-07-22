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

  playerAtacando = false;
  inimigoAtacando = false;

  playerCurando = false;
  inimigoCurando = false;


  inimigos = [
    {
        fase: 1,
        nome: 'Saibamen',
        vida: 10,
        vidaMaxima: 10,
        experiencia: 5,
        ataqueMaximo: 2,
        urlNormal: 'https://mugenarchive.com/forums/576546d5bf292b9424d94fde84f7b5a3/images/SaibamenZ2_48780.gif',
    },
    {
        fase: 2,
        nome: 'Vegeta',
        vida: 30,
        vidaMaxima: 30,
        experiencia: 7,
        ataqueMaximo: 5
    },
    {
        fase: 3,
        nome: 'Capitão Ginyu',
        vida: 50,
        vidaMaxima: 50,
        experiencia: 10,
        ataqueMaximo: 10
    },
    {
        fase: 4,
        nome: 'Freeza',
        vida: 90,
        vidaMaxima: 90,
        experiencia: 20,
        ataqueMaximo: 15
    },
    {
        fase: 5,
        nome: 'Androides 18',
        vida: 130,
        vidaMaxima: 130,
        experiencia: 40,
        ataqueMaximo: 20
    },
    {
        fase: 6,
        nome: 'Cell',
        vida: 170,
        vidaMaxima: 170,
        experiencia: 70,
        ataqueMaximo: 25
    },
    {
        fase: 7,
        nome: 'Babidi',
        vida: 220,
        vidaMaxima: 220,
        experiencia: 100,
        ataqueMaximo: 30
    },
    {
        fase: 8,
        nome: 'Majin Boo',
        vida: 400,
        vidaMaxima: 400,
        experiencia: 150,
        ataqueMaximo: 60
    },
    {
        fase: 9,
        nome: 'Broly',
        vida: 600,
        vidaMaxima: 600,
        experiencia: 200,
        ataqueMaximo: 120
    },
    {
        fase: 10,
        nome: 'J0ISSON',
        vida: 1000,
        vidaMaxima: 1000,
        experiencia: 250,
        ataqueMaximo: 200
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
  urlNormal: 'https://mugenarchive.com/forums/576546d5bf292b9424d94fde84f7b5a3/images/Songoku_US_33255.gif',
  urlAtacando: 'https://mugenarchive.com/forums/576546d5bf292b9424d94fde84f7b5a3/images/Bardock_63602_thumb.gif',
  urlCurando: 'https://thumbs.gfycat.com/RapidIllegalKronosaurus-max-1mb.gif',
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
  this.playerAtacando = true;
  this.urlPlayer = this.player.urlAtacando;
  let ataqueHeroi = Math.ceil(Math.random() * this.player.ataqueMaximo);
  this.inimigoAtual.vida -= ataqueHeroi;

  setTimeout(() => {
    this.playerAtacando = false;
    this.urlPlayer = this.player.urlNormal;
    if (this.inimigoAtual.vida > 0) {
      this.acaoInimigo();
  } else {
      this.calculaXp(this.inimigoAtual.experiencia);
      this.inimigoAtual = this.inimigos[++this.faseAtual];

  }
}, 3000);

 
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
  let ataque = Math.ceil(Math.random() * this.inimigoAtual.ataqueMaximo);
  this.player.vida -= ataque;
  setTimeout(() => {
    this.inimigoAtacando = false;
}, 3000);
};

curaInimigo = () => {
  let cura = Math.floor(this.inimigoAtual.vidaMaxima * this.fatorCura);
  this.inimigoAtual.vida = Math.min(this.inimigoAtual.vidaMaxima, this.inimigoAtual.vida + cura);
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
}, 3000);
  
};

}
