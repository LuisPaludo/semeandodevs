from flask import Flask, request

from musicas import Playlist


app = Flask(__name__)  

# cria uma intância de uma aplicação flask com o nome do modulo atual
@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/musicas', methods=['GET', 'POST'])
def get_all():
    if request.method == 'GET':
        data = playlist.recupera_todas_as_musicas()
        resposta = {
            'data': data,
        }
        return resposta, 200
    
    else:
        request_data = request.get_json()
        titulo = request_data.get('titulo')
        artista = request_data.get('artista')
        album = request_data.get('album')
        ano = request_data.get('ano')
        data = playlist.adiciona_musica(titulo, artista, album, ano)
        resposta = {
            'data': data,
        }
        return resposta, 201
    
@app.route('/musicas/<id>', methods=['GET', 'PUT', 'DELETE'])
def get_id(id):
    musica = playlist.encontra_musica_por_id(int(id))
    if not musica:
        resposta = {
            'data': [],
        }
        return resposta, 404
    
    if request.method == 'GET':
        data = playlist.recupera_musica(int(id))
        resposta = {
            'data': data,
        }
        return resposta, 200
    
    elif request.method == 'PUT':
        request_data = request.get_json()
        titulo = request_data.get('titulo')
        artista = request_data.get('artista')
        album = request_data.get('album')
        ano = request_data.get('ano')
        data = playlist.atualiza_musica(int(id), titulo, artista, album, ano)
        resposta = {
            'data': data,
        }
        return resposta, 200
    
    else:
        data = playlist.exclui_musica(int(id))
        resposta = {
            'data': data,
        }
        return resposta, 204

# Facilita a inicialização do programa: flask --app main run -> python -m main

if __name__ == '__main__':
    playlist = Playlist()
    playlist.adiciona_musica('burning out', 'bad omens')
    playlist.adiciona_musica('traced in constellations', 'sleepmakewaves')
    playlist.adiciona_musica('venger', 'perturbator')
    app.run()