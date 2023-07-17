def get_number(a:str)->int:
    num = ''

    for n in a:
        if n.isdigit():
            num = num + n

    num = int(num)
    return num

a = 'ABC10#1!2**&¨123'
b = get_number(a)
print(b)
