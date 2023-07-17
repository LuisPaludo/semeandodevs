def retorna_numero(a:str)->int:
    num = ''

    for n in a:
        if n.isdigit():
            num = num + n

    num = int(num)
    return num

def valida_CEP(a:str):
    CEP = retorna_numero(a)
    CEP_N = len(str(CEP))

    if CEP_N == 8:
        res = True
    else:
        res = False
    
    return res