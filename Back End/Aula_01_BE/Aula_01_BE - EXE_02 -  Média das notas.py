# Entradas
n1 = float(input("Insira a primeira nota"))
n2 = float(input("Insira a segunda nota"))

# Cálculo
media = float((n1+n2)/2)

# Teste Lógico
if media >= 6:
    Aprovacao = ("Aprovado")

else:
    Aprovacao = ("Reprovado")

# Saída
print(f"O aluno está {Aprovacao} e a média é {media}")