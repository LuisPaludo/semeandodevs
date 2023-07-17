numero = input("Digite um número inteiro de três digitos à ser invertido: \n")

numero_lista = list(numero)
numero_lista.reverse()
numero_reverso = "".join(numero_lista)
print("O número inverto é:", int(numero_reverso))
