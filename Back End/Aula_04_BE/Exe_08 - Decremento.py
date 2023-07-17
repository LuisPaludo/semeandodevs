N = float(input("Insira um número: "))
Nmax = N
cont = 0

while((N - 0.5)>0):
    cont += 1
    N = N - 0.5

print("Foram necessários",cont,"decrementos de 0.5 para reduzir o número",Nmax,"até {:.2f}".format(N))