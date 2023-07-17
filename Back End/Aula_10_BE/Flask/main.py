from flask import Flask, request
from db import db
from livros import Livro
from autor import Autor

# Função que cria um objeto de aplicação Flask no atual módulo (main) - __name__ === __main___
app = Flask(__name__)
# Essa linha de comando permite que o aplicativo Flask saiba como se conectar ao banco de dados especificado, 
# permitindo que o SQLAlchemy execute operações de banco de dados, como consultar, inserir, atualizar ou excluir registros.
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:luisgugu@localhost:5433/postgres'

# /livros - POST, GET
# define uma rota chamada "/livros" que pode lidar com solicitações GET e POST, permitindo que os clientes acessem a 
# lista de livros existentes ou adicionem novos livros ao servidor.
@app.route("/livros", methods=['GET', 'POST'])
def livros(): 
    # Dentro da função, há uma verificação condicional if que verifica se o método HTTP da solicitação é 'GET'. 
    # Essa verificação é feita usando request.method. O request é um objeto fornecido pelo Flask que contém informações 
    # sobre a solicitação HTTP atual.
    if request.method == 'GET':
        livros = Livro.list()
        resposta = {
            'dados': [livro.serialize() for livro in livros]
        }
        return resposta, 200
    
    else:
        # usado para obter os dados enviados com a solicitação HTTP como um objeto JSON. 
        # O request é um objeto fornecido pelo Flask que contém informações sobre a solicitação HTTP atual.
        #  A função get_json() analisa o corpo da solicitação e retorna um objeto Python contendo os dados JSON.
        request_data = request.get_json()
        # O método get() é usado para acessar o valor de uma chave em um dicionário. 
        # Se a chave existir no dicionário, o valor correspondente será retornado; caso contrário, None será retornado.
        titulo = request_data.get('titulo')
        ano = request_data.get('ano')
        livro = Livro(titulo, ano)
        livro.save()
        resposta = {
            'dados': [livro.serialize()]
        }
        return resposta, 201


# /livros/id - GET, PUT, DELETE
# a rota é usada para obter informações de um livro, atualizar informações existentes ou excluir um livro com base em seu ID.
@app.route("/livros/<id>", methods=['GET', 'PUT', 'DELETE'])
# A função livros_id(id) é definida com o parâmetro id, que corresponde ao valor fornecido na rota <id>. O valor do parâmetro
#  é passado para a função quando a rota é acessada.
def livros_id(id):
    #  Esse método recebe um ID (convertido para inteiro usando int(id)) e retorna o livro correspondente com 
    # base no ID.
    livro = Livro.retrieve(int(id))
    # Se nenhum livro for encontrado com o ID fornecido, um dicionário de resposta vazio é retornado com o código de 
    # status HTTP 404 (Not Found), indicando que o livro não foi encontrado.
    if not livro:
        resposta = {
            'dados': []
        }
        return resposta,  404

    # Se o método da solicitação HTTP for GET, isso significa que o cliente está solicitando obter informações sobre o livro
    if request.method == 'GET':
        resposta = {
            'dados': [livro.serialize()]
        }
        # A resposta é retornada com o código de status HTTP 200 (OK), indicando que a solicitação foi bem-sucedida.
        return resposta, 200
    
    # Se o método da solicitação HTTP for PUT, isso significa que o cliente está solicitando atualizar as informações 
    # do livro
    elif request.method == 'PUT':
        request_data = request.get_json()
        titulo = request_data.get('titulo')
        ano = request_data.get('ano')
        livro.titulo = titulo
        livro.ano = ano
        livro.save() 
        resposta = {
            'dados': [livro.serialize()]
        }
        # Uma resposta é criada com o livro serializado atualizado e retornada com o código de status HTTP 200 (OK).
        return resposta, 200

    # Se a solicitação não for GET nem PUT, presume-se que seja uma solicitação DELETE para excluir o livro.
    else:
        livro.delete()
        resposta = {
            'dados': []
        }
        # Uma resposta vazia é retornada com o código de status HTTP 204 (No Content),
        #  indicando que a solicitação foi bem-sucedida, mas não há conteúdo a ser retornado.
        return resposta, 204
    
# /autor - POST, GET
@app.route("/autor", methods=['GET', 'POST'])
def autores(): 
    if request.method == 'GET':
        autores = Autor.list()
        resposta = {
            'dados': [autor.serialize() for autor in autores]
        }
        return resposta, 200
    
    else:
        request_data = request.get_json()
        nome = request_data.get('nome')
        nasc = request_data.get('nasc')
        autor = Autor(nome, nasc)
        autor.save()  # Atualizado de create para save
        resposta = {
            'dados': [autor.serialize()]
        }
        return resposta, 201


# /autor/id - GET, PUT, DELETE
@app.route("/autor/<id>", methods=['GET', 'PUT', 'DELETE'])
def autores_id(id):
    autor = Autor.retrieve(int(id))
    if not autor:
        resposta = {
            'dados': []
        }
        return resposta,  404

    if request.method == 'GET':
        resposta = {
            'dados': [autor.serialize()]
        }
        return resposta, 200
    
    elif request.method == 'PUT':
        request_data = request.get_json()
        nome = request_data.get('nome')
        nasc = request_data.get('nasc')
        autor.nome = nome
        autor.nasc = nasc
        autor.save()  # Atualizado de update para save
        resposta = {
            'dados': [autor.serialize()]
        }
        return resposta, 200

    else:
        autor.delete()
        resposta = {
            'dados': []
        }
        return resposta, 204


# Esse trecho de código verifica se o módulo está sendo executado como o programa principal, 
# inicializa o banco de dados usando SQLAlchemy, cria as tabelas do banco de dados se necessário e, em seguida, 
# inicia o servidor Flask para escutar as solicitações HTTP.
if __name__ == '__main__':
    # inicializa o banco de dados usando a função init_app() fornecida pela biblioteca SQLAlchemy.
    db.init_app(app)

    # Essas linhas de código criam um contexto de aplicativo (app context) usando app.app_context(). 
    # O contexto do aplicativo é necessário para executar operações relacionadas ao banco de dados. 
    # Em seguida, db.create_all() é chamado para criar todas as tabelas do banco de dados com base nos modelos 
    # definidos no SQLAlchemy. Isso cria as tabelas se elas ainda não existirem no banco de dados.
    with app.app_context():
        db.create_all()

    # Essa linha inicia a execução do servidor Flask. O método run() inicia o servidor Flask e 
    # começa a escutar as solicitações HTTP.
    app.run()