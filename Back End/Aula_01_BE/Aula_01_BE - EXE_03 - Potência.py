# Entradas
base = int(input("Informa a base:"))
expoente = int(input("Informe o expoente:"))
resultado_for = base
resultado_while = base

# Cálculo com for 
for i in range(1, expoente):
    resultado_for = base*resultado_for

# Cálculo com while
j = 0
while j <= expoente:
    resultado_while = base*resultado_while
    j = j + 1

# Saída
print("O resultado é", resultado_for)
