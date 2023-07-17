aa = 1.50
ab = 1.10
cont = 0

while(ab<aa):
    cont += 1
    aa = aa + 0.02
    ab = ab + 0.03

print("Serão necessários",cont,"anos para que a árvore B tenha {:.2f}".format(ab),"m e a árvore A {:.2f}".format(aa),"m")