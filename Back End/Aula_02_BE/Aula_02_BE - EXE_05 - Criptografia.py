frase = input("Digite a uma frase:\n")

a = input("Informe um caractere para substituir a ou A:\n")
e = input("Informe um caractere para substituir e ou E:\n")
i = input("Informe um caractere para substituir i ou I:\n")
o = input("Informe um caractere para substituir o ou O:\n")
u = input("Informe um caractere para substituir u ou U:\n")

frase_cripto = frase.upper()
frase_cripto = frase.replace('A', a)
frase_cripto = frase_cripto.replace('E', e)
frase_cripto = frase_cripto.replace('I', i)
frase_cripto = frase_cripto.replace('O', o)
frase_cripto = frase_cripto.replace('U', u)

print("A frase criptofrafada é", frase_cripto)