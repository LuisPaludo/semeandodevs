class CrudController {
    idInput;
    nomeInput;
    sobrenomeInput;
    emailInput;
    formulario;
    ulUsuarios;
    usuarios = [];
    id = 1;

    constructor() {
        this.valorizaAtributos();
    }

    valorizaAtributos() {
        this.formulario = document.getElementById('formulario');
        this.idInput = document.getElementById('id');
        this.nomeInput = document.getElementById('nome');
        this.sobrenomeInput = document.getElementById('sobrenome');
        this.emailInput = document.getElementById('email');
        this.ulUsuarios = document.getElementById('ul-usuarios');
    }

    salvar() {
        if (this.formularioValido()) {
            const id = +this.idInput.value;

            if (id) {
                this.usuarios = this.usuarios.map(usuario => {
                    if (usuario.id === id) {
                        usuario.nome = this.nomeInput.value;
                        usuario.sobrenome = this.sobrenomeInput.value;
                        usuario.email = this.emailInput.value;
                    }

                    return usuario;
                });
            } else {
                this.usuarios.push({
                    nome: this.nomeInput.value,
                    sobrenome: this.sobrenomeInput.value,
                    email: this.emailInput.value,
                    id: this.id++
                });
            }

            this.formulario.reset();
            this.idInput.value = '';
            this.atualizarListaUsuario();
        }
    }

    atualizarListaUsuario() {
        this.ulUsuarios.innerHTML = '';
        for (let i in this.usuarios) {
            const usuario = this.criarItemUsuario(this.usuarios[i]);

            this.ulUsuarios.appendChild(usuario);
        }
    }

    editar(e) {
        if (e.target.closest('.btn-excluir')) {
            return;
        }
        const li = e.target.closest('li');
        const id = +li.getAttribute('data-id');
        const usuario = this.usuarios.find(usuario => usuario.id === id);
        
        this.nomeInput.value = usuario.nome;
        this.sobrenomeInput.value = usuario.sobrenome;
        this.emailInput.value = usuario.email;
        this.idInput.value = usuario.id;
    }

    excluir(e) {
        const li = e.target.closest('li');
        const id = +li.getAttribute('data-id');

        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);

        this.atualizarListaUsuario();
    }

    criarItemUsuario(usuario) {
        const li = document.createElement('LI');
        const div1 = document.createElement('DIV');
        const div2 = document.createElement('DIV');
        const divNomeUsuario = document.createElement('DIV');
        const divEmailUsuario = document.createElement('DIV');
        const botao = document.createElement('BUTTON');
        const imagem = document.createElement('IMG');

        li.addEventListener('click', this.editar.bind(this));
        li.setAttribute('data-id', usuario.id);

        divNomeUsuario.classList.add('nome-usuario');
        divNomeUsuario.innerText = `${usuario.nome} ${usuario.sobrenome}`;
        
        divEmailUsuario.classList.add('email-usuario');
        divEmailUsuario.innerText = usuario.email;

        botao.classList.add('btn-excluir');
        botao.addEventListener('click', this.excluir.bind(this));

        imagem.setAttribute('src', 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-trash-outline-512.png');
        imagem.setAttribute('alt', 'Excluir');

        div1.appendChild(divNomeUsuario);
        div1.appendChild(divEmailUsuario);

        botao.appendChild(imagem);
        div2.appendChild(botao);

        li.appendChild(div1);
        li.appendChild(div2);

        return li;
    }

    formularioValido() {
        let nomeValido = !!this.nomeInput.value;
        let sobrenomeValido = !!this.sobrenomeInput.value;
        let emailValido = !!this.emailInput.value;

        if (!nomeValido) {
            this.mostraMensagemErro('nome');
        }

        if (!sobrenomeValido) {
            this.mostraMensagemErro('sobrenome');
        }

        if (!emailValido) {
            this.mostraMensagemErro('email');
        }

        return nomeValido && sobrenomeValido && emailValido;
    }

    mostraMensagemErro(campo) {
        const erro = document.getElementById(`${campo}-erro`);

        erro.classList.remove('hidden');
    }

    removeMensagemErro(e) {
        const erro = e.target.nextElementSibling;

        erro.classList.add('hidden');
    }
}

class CrudEvents {
    crudController;

    constructor() {
        this.init();
    }

    init() {
        this.crudController = new CrudController();
        this.ouveBotaoSubmit();
        this.ouvoInputs();
    }

    ouveBotaoSubmit() {
        document.getElementById('btn-salvar')
            .addEventListener('click', e => {
                e.preventDefault();
                this.crudController.salvar();
            });
    }

    ouvoInputs() {
        Array.from(document.getElementsByTagName('input'))
            .forEach(input => {
                input.addEventListener('input', e => {
                    this.crudController.removeMensagemErro(e);
                });
            });
    }
}

new CrudEvents();