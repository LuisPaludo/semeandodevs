def valida_UF(a:str):
    tupla_UF = ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
                 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO')
    
    res = 0

    for UF in tupla_UF:
        if a == UF:
            res = 1
    
    if res == 1:
        print("O UF digitado é válido")
    else:
        print("O UF digitado é inválido")

    return res


