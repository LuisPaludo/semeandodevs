def get_number(a:str)->int:
    num = ''

    for n in a:
        if n.isdigit():
            num = num + n

    num = int(num)
    return num

def valida_CEP(a:str):
    CEP = get_number(a)
    CEP_N = len(str(CEP))

    if CEP_N == 8:
        print("CEP válido")
        res = 1
    else:
        res = 0
        print("CEP inválido")
    
    return res


a = '86530-000'
b = valida_CEP(a)
print(b)