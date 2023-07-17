# Essa linha importa o objeto db do módulo db. db é uma instância do objeto SQLAlchemy
# que fornece uma interface para interagir com o banco de dados.
from db import db

class Livro(db.Model):
    # Essa linha define o nome da tabela no banco de dados que corresponde a esta classe. 
    # Neste caso, o nome da tabela é 'livro'.
    __tablename__ = 'livro'

    # Cada coluna é definida como uma variável de classe com um tipo de dado específico. 
    # livro_id é uma coluna de inteiro que é definida como chave primária (primary_key=True). 
    # titulo é uma coluna de string com limite de 255 caracteres. 
    # ano é uma coluna de inteiro.

    livro_id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255))
    ano = db.Column(db.Integer)

    def __init__(self, titulo, ano):  # REMOVER O LIVRO_ID DO INIT
        self.titulo = titulo
        self.ano = ano

    def serialize(self):
        # Retorna um dicionário contendo os dados do livro serializados em formato JSON. 
        # Isso permite converter facilmente objetos Livro em formato JSON.
        return {
            'livro_id': self.livro_id,
            'titulo': self.titulo,
            'ano': self.ano
        }
    
    # Método para o GET
    # Recebe um ID de livro como
    # parâmetro e retorna o primeiro autor encontrado na tabela 'livro' com o ID correspondente.
    @classmethod
    def retrieve(cls, id):
        return cls.query.filter_by(livro_id=id).first()

    # Método para o GET (todos)
    # Retorna todos os autores encontrados na tabela 'livro'.
    @classmethod
    def list(cls):
        return cls.query.all()
    
    # Método para o POST / UPDATE
    # Salva o objeto Livro atual no banco de dados. A instância é 
    # adicionada à sessão do banco de dados (db.session.add(self)) e as alterações são confirmadas (db.session.commit()).
    def save(self):
        db.session.add(self)
        db.session.commit()

    # Método para o DELETE
    # exclui o objeto Livro atual do banco de dados. A instância é removida da sessão do banco de dados 
    # (db.session.delete(self)) e as alterações são confirmadas (db.session.commit()).
    def delete(self):
        db.session.delete(self)
        db.session.commit()