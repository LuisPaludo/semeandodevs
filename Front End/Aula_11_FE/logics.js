// Declaração de todas as variáveis a serem utilizadas

// Botão de envio do formulário
const botao = document.querySelector('#enviar');

// Constantes para armazenar a div responsável pela respectiva resposta
const R1 = document.querySelector("#R_1");
const R2 = document.querySelector("#R_2");
const R3 = document.querySelector("#R_3");
// Array com os valores de R
const R = [R1, R2, R3];

// Constante para armazenar o local em que será inserido o link real
const RL1 = document.querySelector("#RL_1");
const RL2 = document.querySelector("#RL_2");
const RL3 = document.querySelector("#RL_3");
// Array com os valores de RL
const RL = [RL1, RL2, RL3];

// Constantes para armazenar o local em que será inserido o link encurtado
const SL1 = document.querySelector("#SL_1");
const SL2 = document.querySelector("#SL_2");
const SL3 = document.querySelector("#SL_3");
// Array com os valores de SL
const SL = [SL1, SL2, SL3];

// Constantes para armazenar os botões de cópia
const C1 = document.querySelector("#Copy_1");
const C2 = document.querySelector("#Copy_2");
const C3 = document.querySelector("#Copy_3");
// Array com os valores de C
const C = [C1, C2, C3];

// Variável para armazenar o formulário de entrada
let link = document.getElementById("Input");

// Constante para armazenar o próprio formulário
const form = document.querySelector('#Form');

// Contador
let cont = 1;

// Função de validação do formulário
// aqui é testado se a entrada inserida pelo usuário em "link" é válida
function validaForm() {
    // Se checkValidity() retorna um valor falso, significa que a função é invalida
    if (!link.checkValidity()) {
        // Retira a classe que valida o formulário (bootstrap)
        form.classList.remove('was-validated');
        // Adiciona a classe 'is-invalid' ao input de texto, permitindo que o texto de alerta seja exibido em baixo
        link.classList.add("is-invalid");
        // Retorna falso, em caso de link inválido inserido
        return false
    }
    // Caso o link seja valido, o formulário é validado (booststrap)
    form.classList.add('was-validated');
    // Caso o link seja valido, remove a class 'is-invalid', que exibe o alerta em texto vermelho
    link.classList.remove("is-invalid");
    // Retorna verdadeiro em caso de link válido
    return true
}

// Criação do evento de escuta do botão de enviar o formulário. A escuta aguarda um click
botao.addEventListener('click', () => {
    // Se valida form for falso
    if(!validaForm()){
        // Sai da função e não segue com o código
        return
    };
    // Deixe que valor receba o valor armazenado na entrada de texto do formulário
    let valor = link.value;
    // Após armazenado, o valor é limpo para uma nova inserção pelo usuário
    link.value = "";
    
    // Aqui, está sendo feita uma requisição GET para a API "https://api.shrtco.de/v2/shorten" 
    // com um parâmetro "url" que é composto pela concatenação do valor da variável "valor" com a 
    // string "/very/long/link.html". Esse trecho está buscando encurtar um URL específico.
    fetch("https://api.shrtco.de/v2/shorten?url="+valor+"/very/long/link.html").
    // O método .then() é chamado no objeto retornado pela função fetch, o que permite tratar
    // a resposta da requisição. O parâmetro res representa a resposta da requisição HTTP.
    then((res) => {
        // Aqui, está sendo chamado o método .json() na resposta da requisição para extrair os dados JSON da resposta. 
        // O método .json() retorna uma nova Promise que resolve com os dados JSON. O parâmetro data representa esses dados.
        res.json().then((data) => {
            // Nesta linha, está sendo extraído o valor da propriedade full_short_link do objeto result presente nos dados 
            // retornados pela API. Esse valor é atribuído à variável full_short.
            let full_short = data.result.full_short_link;
            // Remove a classe 'd-none' (bootstrap). Classe responsável por esconder a div de resposta até o momento
            // em que se fornece um resultado a ela
            R[cont - 1].classList.remove('d-none');
            // O link inserido pelo usuário é colocado na div de resposta
            RL[cont - 1].textContent = valor;
            // O link ecurtado obtido com o fetch é colocado no div de resposta
            SL[cont - 1].textContent = full_short;
            // O link encurtado é fornecido ao Href de cada uma das tags de ângora
            SL[cont - 1].href = full_short;
            // Contador (até 3)
            cont = (cont % 3) + 1;
            
        });
        
    })
    // : Caso ocorra algum erro durante a requisição HTTP ou ao extrair os dados JSON, 
    // o bloco de código dentro do .catch() é executado. Nesse caso, a mensagem de erro é exibida no console.
    .catch((e) => {
        console.log("Error", e);
    })
})

// Função para copiar o texto para o clipboard do usuário, possui index como entrada
function copyText(index) {
    // Requisita uma promessa com as informações de permissão do navegador, buscando ver se o navegador tem liberdade
    // de gtavação no clipboard
    navigator.permissions.query({ name: "clipboard-write" })
    // Após a promessa ser cumprida, com o resultado obtido
    .then((result) => {
        // verifica-se se é permitido a gravação de dados
        if (result.state === "granted" || result.state === "prompt") {
        // Caso positivo, fornece o dado registrado na div de resposta para o clipboard do usuário
        navigator.clipboard.writeText(SL[index].textContent);
        // Altera o background do botão para dar um efeito mais din1ãmico
        C[index].style.background = '#9BE3E2';
        // Altera o texto do botão para indicar que o objeto foi copiado
        C[index].innerHTML = 'Copied';
        // Após 1 segundo, retorna as configurações originais do botão de cópia
        setTimeout(() => {
            C[index].style.background = '#2BD1D1';
            C[index].innerHTML = 'Copy';
        }, 1000);
        }
    });
}

// Para cada um dos botoões de cópia, aciona a função copyText no momento em que forem clicados
C[0].addEventListener('click', () => copyText(0));
C[1].addEventListener('click', () => copyText(1));
C[2].addEventListener('click', () => copyText(2));