bib = []
N = 1

while(N != 0):    
    N = int(input("Insira um número (0 para cancelar): "))
    bib.append(N)

print("O maior numero inserido na lista é",max(bib))
print(bib)