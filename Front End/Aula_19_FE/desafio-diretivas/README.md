# Desafio PDI Angular - Diretivas

Este projeto foi criado com [Angular CLI](https://github.com/angular/angular-cli) versão 14.1.2 and [Node](https://nodejs.org/) 16.16.0

## Objetivo:
O objetivo deste desafio é aprender um pouco mais sobre diretivas. Diretivas são marcadores em um elemento DOM (como um atributo) que informam ao Angular para anexar um comportamento especificado a um elemento existente. O objetivo deste desafio é que você consiga criar duas diretivas: uma estrutural e outra de atributo. Ao final do desafio, você deverá conhecer um pouco mais sobre hostBinding, hostListener, manipulação no dom e criar atributos via Input para diretivas.


## Desafio:
Para facilitar o desenvolvimento e acompanhamento do que vocễ fará, vamos estruturar esse desafio em pequenos passos. 

- Faça um fork deste projeto.
- Instale as dependências e coloque o projeto rodar com ng s.
  - A partir deste projeto, você deverá criar duas diretivas:
  - Diretiva estrutural ehPar;
  - Diretiva de atributo tooltip;


### Diretiva ehPar:

- Esta será uma diretiva que deverá mostrar ou esconder um elemento HTML somente se for passado um número par para ele. Deverá ser no seguinte formato *ehPar=”2”, por exemplo.

### Diretiva tooltip

- Será uma diretiva que poderá ir em qualquer elemento HTML.
- A diretiva deverá ter três inputs:
  - texto: será uma string e o default será ‘’;
  - corTexto: será um input do tipo string e o default será #fff;
  - corBackground: será um input do tipo string e o default será #000;
- O comportamento da diretiva deverá ser o seguinte:
  - Ao passar o mouse sobre o elemento que contém a diretiva, o background dele deverá ficar em amarelo (como se tivesse marcado) e ao tirar o mouse, deve voltar ao normal (utilize HostBinding para isso).
  - Ao passar o mouse sobre o elemento que contém a diretiva, deverá subir uma pequena caixa contendo o texto informado por parâmetro, que deverá ser passado por parâmetro.
  - Ao remover o mouse do elemento, deverá sumir o tooltip.Essa caixa de texto deverá sobrepor os outros elementos da tela. 
  - Ao rolar a “rodinha” do mouse em cima do tooltip, deverá alterar a fonte do texto para mais (caso rode para cima) ou para menos (caso rode para baixo).
  - A cor do texto e do background deve obedecer aos parâmetros informados via input.
  - A estilização do tooltip fica a seu critério.

