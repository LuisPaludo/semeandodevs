def menor(*numeros:float) -> float:
    cont = 0

    for n in numeros:
        if cont == 0:
            low = n
            cont += 1
        elif cont == 1:
            if n < low:
                low = n
    
    return low

print(menor(1,2,3,4,5,6,0.5))
