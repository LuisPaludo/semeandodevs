def valida_CNPJ(a:str):
    CNPJ = ''
    soma_1 = 0
    soma_2 = 0
    cont_1 = 5
    cont_2 = 9
    cont_3 = 6
    cont_4 = 9

    res = False

    for n in a:
        if n.isdigit():
            CNPJ = CNPJ + n 


    if len(CNPJ) == 14:

        dig_1 = int(CNPJ[12])
        dig_2 = int(CNPJ[13])

        for num in CNPJ[0:4]:
            soma_1 = soma_1 + int(num)*cont_1
            cont_1 = cont_1 - 1
        for num in CNPJ[4:12]:
            soma_1 = soma_1 + int(num)*cont_2
            cont_2 = cont_2 - 1
        if soma_1*10%11 == 10:
            resto_1 = 0
        else:
            resto_1 = soma_1*10%11

        for num in CNPJ[0:5]:
            soma_2 = soma_2 + int(num)*cont_3
            cont_3 = cont_3 - 1
        for num in CNPJ[5:13]:
            soma_2 = soma_2 + int(num)*cont_4
            cont_4 = cont_4 - 1
        if soma_2*10%11 == 10:
            resto_2 = 0
        else:
            resto_2 = soma_2*10%11
        
        if resto_1 == dig_1 and resto_2 == dig_2:
            res = True

    return res