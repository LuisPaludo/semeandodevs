from flask import Flask, request
from flask_restful import Api
from flasgger import Swagger 

from db import db
from livro.resources import LivroListResource, LivroResource
from autor.resources import AutorListResource, AutorResource
from cliente.resources import ClienteListResource, ClienteResource
from pedidos.resources import PedidoListResource, PedidoResource, LivroPedidoListResource, LivroPedidoResource


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:luisgugu@localhost:5433/postgres'

api = Api(app)
api.add_resource(LivroResource, '/livros/<id>')
api.add_resource(LivroListResource, '/livros/')
api.add_resource(AutorResource, '/autores/<id>')
api.add_resource(AutorListResource, '/autores/')
api.add_resource(ClienteResource, '/clientes/<id>')
api.add_resource(ClienteListResource, '/clientes/')
api.add_resource(PedidoResource, '/pedidos/<id>')
api.add_resource(PedidoListResource, '/pedidos/')
api.add_resource(LivroPedidoListResource, '/pedidos<id>/livros/')
api.add_resource(LivroPedidoResource, '/pedidos<id>/livros/<livro_id>/')
swagger = Swagger(app)  # nova linha


if __name__ == '__main__':
    db.init_app(app)

    with app.app_context():
        db.create_all()

    app.run()