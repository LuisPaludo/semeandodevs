# Dados a serem inseridos pelo usuário
nome = input("Digite o nome do aluno: ")
Nota_1 = float(input("Digite a nota do primeiro bimestre: "))
Nota_2 = float(input("Digite a nota do segundo bimetrstre: "))
Nota_3 = float(input("Digite a nota do terceiro bimestre: "))

# Criação do dicionário através dos dados coletados
dic = {'Nome':nome,'Nota_1':Nota_1,'Nota_2':Nota_2,'Nota_3':Nota_3}

# Impressão do dicionário para comparação com a versão atualizada
print("O dicionário com os dados do aluno ",dic['Nome'], ": \n", dic)

# Cálculo da média, utilizando os valores de nota resgatados do dicionário
media = (dic['Nota_1'] + dic['Nota_2'] + dic['Nota_3'])/3

# Adicição da média no dicionário
dic['Media'] = media

# Impressão do dicionário atualizado
print("O dicionário atualizado com a média do aluno",dic['Nome'], ": \n", dic)