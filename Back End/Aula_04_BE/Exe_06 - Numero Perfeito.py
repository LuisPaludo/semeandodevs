# Inserção do número a ser avaliado
N = int(input("Digite um número inteiro para testar se o mesmo é perfeito: "))

# Contador auxiliar
cont = 0

# For responsável por dividir o número inserido e tentar descobrir seus divisores
# Range do for construída de forma que o número nãp seja dividido por 0 e por ele mesmo
for n in range(1,N):
    if not(N%n):
        # Soma dos divisores
        cont = cont + n

# Teste lógico para imprimir ao usuário se o número é perfeito ou não
if(cont == N):
    print("O número",N,"é perfeito")
else:
    print("O número",N,"não é perfeito")

