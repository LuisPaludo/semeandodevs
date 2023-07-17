# Desafio PDI Angular - Pipes

Este projeto foi criado com [Angular CLI](https://github.com/angular/angular-cli) versão 14.1.2 and [Node](https://nodejs.org/) 16.16.0

## Objetivo:
O objetivo deste desafio é aprender um pouco mais sobre como criar e usar pipes em aplicações Angular. Pipes são modificadores de dados que podem ser usados tanto no template, como nos arquivos de typescript. Ao final, você deverá saber criar pipes e também usar os pipes padrão do Angular. 

## Desafio:
Para facilitar o desenvolvimento e acompanhamento do que vocễ fará, vamos estruturar esse desafio em pequenos passos. 

- Faça um fork deste projeto.
- Instale as dependências e coloque o projeto rodar com ng s.
- O desafio terá as seguintes etapas:
  - Uso de pipes padrão do Angular (no template e também no arquivo typescript);
  - Criação de um pipe modificador de string;
  - Criação de um pipe modificador de números;
  - Criação de um pipe para filtrar arrays.


### Uso de pipes padrão:

- Dentro do arquivo app.component.ts, você verá a primeira parte (iniciando do primeiro h1 até o segundo), que terá bem especificado quais são as tarefas que deverão ser feitas dentro deste primeiro passo.

### Criação de um pipe modificador de string

- Crie um pipe chamado “centopeia”. 
- Este pipe deve receber uma string e deve retornar a mesma string, só que agora alternando uma letra maiúscula e uma minúscula. Ex.: “texto de exemplo” -> “TeXtO De ExEmPlO”.
- Dentro do app.component.ts, terá o lugar para ser colocado, a partir do segundo h1.

### Criação de um pipe modificador de number

- Crie um pipe chamado “exp”.
- Esse será um pipe que deverá receber um number e elevar ele a uma potência, que por padrão, será 2.
- Dentro do app.component.ts, terá o lugar para ser colocado, a partir do terceiro h1.

### Criação de um pipe para filtrar arrays

- Crie um pipe chamado “filtroArray”.
- Esse pipe deverá receber o array que se quer filtrar e um valor qualquer, que deverá ser usado para filtros os valores do array e retornar somente os que incluírem uma parte do valor filtrado.
- Dentro do app.component.ts, terá o lugar para ser colocado, a partir do quarto h1.
