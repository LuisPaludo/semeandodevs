# Definição da função. A variável de entrada será sempre uma string e a saída será booleana
def valida_data(data:str):
    # Definição do estado inicial da variável de saída, caso nenhuma das condições sejam satisfeitas
    # res continuará com este valor
    res = False

    # Primeira verificação: Se  o modelo inserido de data é válido (verificação através dos separadores)
    # Formato dd-mm-yyyy
    if (data[2] == '-' and data[5] == '-') or (data[2] == '/' and data[5] == '/'): 
        # Obtenção do valor do dia
        dia = int(data[0]+data[1])
        # Obtenção do valor do mês
        mes = int(data[3]+data[4])
        # Teste para verificar se os dias e os meses inseridos são válidos
        if (dia >= 0 and dia <= 31) and (mes >= 0 and mes <=12):
            # Caso tudo seja satisfeito, a saída é definida como true
            res = True
    # Formato yyyy-mm-dd (mesma lógica anterior)
    elif (data[4] == '-' and data[7] == '-') or (data[4] == '/' and data[7] == '/'):
        dia = int(data[8]+data[9])
        mes = int(data[5]+data[6]) 
        if (dia >= 0 and dia <= 31) and (mes >= 0 and mes <=12):
            res = True
    
    # saída da função
    return res

a = '2023/04/10'
b = '32/12/2023'
c = '323/12/2023'
d = '31/1232023'

print(valida_data(a))
print(valida_data(b))
print(valida_data(c))
print(valida_data(d))