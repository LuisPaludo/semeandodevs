from collections import Counter

dic = []
nota = 1

while(nota >= 1 and nota <= 5):
    nota = int(input("Digite a nota do filme (De 1 a 5): "))
    if nota >= 1 and nota <= 5:
        dic.append(nota)

cont = dict(Counter(dic))
t = len(dic)

if 1 in cont:
    p1 = float(cont[1]/t*100)
    p1n = cont[1]
    p1f = "{:.2f}%".format(p1)
else:
    p1 = p1n = 0
    p1f = "{:.2f}%".format(p1)

if 2 in cont:
    p2 = float(cont[2]/t*100)
    p2n = cont[2]
    p2f = "{:.2f}%".format(p2)
else:
    p2 = p2n = 0
    p2f = "{:.2f}%".format(p2)

if 3 in cont:
    p3 = float(cont[3]/t*100)
    p3n = cont[3]
    p3f = "{:.2f}%".format(p3)
else:
    p3 = p3n = 0
    p3f = "{:.2f}%".format(p3)

if 4 in cont:
    p4 = float(cont[4]/t*100)
    p4n = cont[4]
    p4f = "{:.2f}%".format(p4)
else:
    p4 = p4n = 0
    p4f = "{:.2f}%".format(p4)

if 5 in cont:
    p5 = float(cont[5]/t*100)
    p5n = cont[5]    
    p5f = "{:.2f}%".format(p5)
else:
    p5 = p5n = 0
    p5f = "{:.2f}%".format(p5)    

pt = (1*p1n + 2*p2n + 3*p3n + 4*p4n + 5*p5n)/t
ptf = "{:.2f}%".format(pt)  

print("A porcentagem de pessoas que deram 1 estrela foi: ",p1f)
print("A porcentagem de pessoas que deram 2 estrela foi: ",p2f)
print("A porcentagem de pessoas que deram 3 estrela foi: ",p3f)
print("A porcentagem de pessoas que deram 4 estrela foi: ",p4f)
print("A porcentagem de pessoas que deram 5 estrela foi: ",p5f)
print("A nota média do filme foi de: ",pt)