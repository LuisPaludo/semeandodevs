def valida_UF(a:str):
    tupla_UF = ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
                 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO')
    
    res = False

    # for UF in tupla_UF:
    #     if a == UF:
    #         res = True

    if a in tupla_UF:
        res = True

    return res


