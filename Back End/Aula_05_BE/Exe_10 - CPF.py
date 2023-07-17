def valida_CPF(a:str):
    CPF = ''
    soma_1 = 0
    soma_2 = 0
    cont_1 = 10
    cont_2 = 11
    res = False

    for n in a:
        if n.isdigit():
            CPF = CPF + n
    
    dig_1 = int(CPF[9])
    dig_2 = int(CPF[10])

    if len(CPF) == 11:

        for num in CPF[0:9]:
            soma_1 = soma_1 + int(num)*cont_1
            cont_1 = cont_1 - 1
        if soma_1*10%11 == 10:
            resto_1 = 0
        else:
            resto_1 = soma_1*10%11

        for num in CPF[0:10]:
            soma_2 = soma_2 + int(num)*cont_2
            cont_2 = cont_2 - 1
        if soma_2*10%11 == 10:
            resto_2 = 0
        else:
            resto_2 = soma_2*10%11
        
        if resto_1 == dig_1 and resto_2 == dig_2:
            print("O CPF é válido")
            res = True
    
    if not res:
        print("O CPF não é válido")

    return res
            
a = '078.416.489-44'
valida_CPF(a)