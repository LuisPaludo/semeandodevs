# Essa linha importa o objeto db do módulo db. db é uma instância do objeto SQLAlchemy
# que fornece uma interface para interagir com o banco de dados.
from db import db

# a classe Autor é definida e herda da classe db.Model do SQLAlchemy, 
# indicando que esta classe é um modelo de tabela do banco de dados.
class Autor(db.Model):
    # Essa linha define o nome da tabela no banco de dados que corresponde a esta classe. 
    # Neste caso, o nome da tabela é 'autor'.
    __tablename__ = 'autor'

    # Cada coluna é definida como uma variável de classe com um tipo de dado específico. 
    # autor_id é uma coluna de inteiro que é definida como chave primária (primary_key=True). 
    # nome é uma coluna de string com limite de 255 caracteres. 
    # nasc é uma coluna de inteiro.
    autor_id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    nasc = db.Column(db.Integer)

    # Construtor da classe
    def __init__(self, nome, nasc):
        self.nome = nome
        self.nasc = nasc

    # Conversão de dados para JSON
    def serialize(self):
        # etorna um dicionário contendo os dados do autor serializados em formato JSON. 
        # Isso permite converter facilmente objetos Autor em formato JSON.
        return {
            'autor_id': self.autor_id,
            'nome': self.nome,
            'nasc': self.nasc
        }
    
    # Método para o GET
    # Recebe um ID de autor como
    # parâmetro e retorna o primeiro autor encontrado na tabela 'autor' com o ID correspondente.
    @classmethod
    def retrieve(cls, id):
        return cls.query.filter_by(autor_id=id).first()
    
    # Método para o GET (todos)
    # Retorna todos os autores encontrados na tabela 'autor'.
    @classmethod
    def list(cls):
        return cls.query.all()

    # Método para o POST / UPDATE
    # Salva o objeto Autor atual no banco de dados. A instância é 
    # adicionada à sessão do banco de dados (db.session.add(self)) e as alterações são confirmadas (db.session.commit()).
    def save(self):
        db.session.add(self)
        db.session.commit()

    # Método para o DELETE
    # exclui o objeto Autor atual do banco de dados. A instância é removida da sessão do banco de dados 
    # (db.session.delete(self)) e as alterações são confirmadas (db.session.commit()).
    def delete(self):
        db.session.delete(self)
        db.session.commit()