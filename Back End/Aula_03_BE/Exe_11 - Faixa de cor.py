co = float(input("Digite um comprimento de onda em nm: "))

if co >= 380 and co <= 750:
    if co >= 380 and co < 450:
        c = 'Violeta'
    elif co >= 450 and co < 495:
        c = 'Azul'
    elif co >= 495 and co < 570:
        c = 'Verde'
    elif co >= 570 and co < 590:
        c = 'Amarelo'
    elif co >= 590 and co < 620:
        c = 'Laranja'
    elif co >= 620 and co <= 750:
        c = 'Vermelho'
    print("O comprimento de onda",co,"nm, equivale a cor",c)
else:
    print("O comprimento de cor digitado não corresponde ao espectro visível.")

