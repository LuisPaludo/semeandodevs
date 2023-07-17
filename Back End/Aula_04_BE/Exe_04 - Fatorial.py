fat = input("Insira um número inteiro a ser calculado seu fatorial: ")
res = 1;

for n in range(1,int(fat)+1):
    res = res*n;

print("O fatorial de",fat,"é",res)