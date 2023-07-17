def retorna_numero(a:str)->int:
    num = ''

    for n in a:
        if n.isdigit():
            num = num + n

    num = int(num)
    return num
