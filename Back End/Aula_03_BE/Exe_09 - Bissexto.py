ano = int(input("Digite um ano: "))

if ano % 4 == 0:
    if ano % 100 == 0 and ano % 400 != 0:
        print("O ano",ano,"não é bissexto.")
    else:
        print("O ano",ano,"é bissexto.")
else:
    print("O ano",ano,"não é bissexto.")
