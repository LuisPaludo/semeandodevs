# Aviso ao usuário sobre como responder as perguntas
print("Responde as próximas perguntas com S para sim ou N para não:")

# Coleta das respostas para cada uma das 5 perguntas
p1 = input("1. Telefonou para a vítima? ")
p2 = input("2. Esteve no local do crime? ")
p3 = input("3. Mora perto da vítima? ")
p4 = input("4. Devia para a vítima? ")
p5 = input("5. Já trabalhou para vítima? ")

# Padronização das respostas coletadas
p1 = p1.lower()
p2 = p2.lower()
p3 = p3.lower()
p4 = p4.lower()
p5 = p5.lower()

# Definição do valor inicial do contador
cont = 0

# Primeiro teste: O usuário respondeu corretamente as perguntas propostas?
if p1 == 's' or p1 == 'n':
    if p2 == 's' or p2 == 'n':
        if p3 == 's' or p3 == 'n':
            if p4 == 's' or p4 == 'n':
                if p5 == 's' or p5 == 'n':
                    # Caso o usuário tenha respondido corretamente, as respostas são avaliadas
                    # por meio de um contador
                    if p1 == 's':
                        cont = cont + 1
                    if p2 == 's':
                        cont = cont + 1
                    if p3 == 's':
                        cont = cont + 1
                    if p4 == 's':
                        cont = cont + 1
                    if p5 == 's':
                        cont = cont + 1

                    # Após a avaliação das respostas, o valor final do contador é comparado com a tabela
                    # fornecida pelo exercício
                    if cont == 2:
                        d = 'Suspeita'
                    elif cont == 3 or cont == 4:
                        d = 'Cúmplice'
                    elif cont == 5:
                        d = 'Assassino'
                    else:
                        d = 'Inocente'

                    # Impressão do resultado
                    print("De acordo com as respostas, o entrevistado é",d)                
                
                # Impressão de erro, indicando que o usuário inseriu uma resposta inválida
                else:
                    print("Responda corretamente.")
            else:
                print("Responda corretamente.")
        else:
            print("Responda corretamente.")
    else:
        print("Responda corretamente.")
else:
    print("Responda corretamente.")
