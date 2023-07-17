import sqlite3

conn = sqlite3.connect("livro.db")

create_table_cmd = """
CREATE TABLE livro (
   livro_id INTEGER PRIMARY KEY,
   titulo VARCHAR(255),
   ano INTEGER
);
"""
conn.execute(create_table_cmd)

add_l1_cmd = "INSERT INTO livro(titulo, ano) VALUES ('A Sociedade do Anel', 2022)"
add_l2_cmd = "INSERT INTO livro(titulo, ano) VALUES ('As Duas Torres', 2022)"
add_l3_cmd = "INSERT INTO livro(titulo, ano) VALUES ('O Retorno do Rei', 2022)"
conn.execute(add_l1_cmd)
conn.execute(add_l2_cmd)
conn.execute(add_l3_cmd)

select_cmd = 'select * from livro'
cur = conn.cursor()
cur.execute(select_cmd)
livros = cur.fetchall()
livros[0], livros[1], livros[2]

select_cmd = 'select * from livro where livro_id = 1'
cur.execute(select_cmd)
livro = cur.fetchall()
livro[0]

update_cmd = 'UPDATE livro SET ano = 2020 WHERE livro_id = 1'
conn.execute(update_cmd)
select_cmd = 'select * from livro where livro_id = 1'
cur.execute(select_cmd)
livro = cur.fetchall()
livro[0]