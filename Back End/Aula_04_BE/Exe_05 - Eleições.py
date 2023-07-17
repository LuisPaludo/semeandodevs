N = int(input("Informe o número de eleitores: "))
res = []
cand_1 = 0
cand_2 = 0
b = 0
nu = 0

for n in range(N):
    voto = int(input("Indique sua opção de voto:\n1 - Candidato 1\n2 - Candidato 2\n3 - Branco\n4 - Nulo\nSeu voto: "))
    res.append(voto)

for n in range(N):
    if res[n] == 1:
        cand_1 += 1
    elif res[n] == 2:
        cand_2 += 1
    elif res[n] == 3:
        b += 1
    else:
        nu += 1

vv = cand_1 + cand_2
p1 = float(cand_1/vv)*100
p2 = float(cand_2/vv)*100
pb = float(b/N)*100
pnu = float(nu/N)*100

print("O percentual de votos válidos do candidato 1 é: {:.2f}".format(p1),"%")
print("O percentual de votos válidos do candidato 2 é: {:.2f}".format(p2),"%")
print("O percentual de votos brancos com relação ao total de votos é: {:.2f}".format(pb),"%")
print("O percentual de votos nulos com relação ao total de votos é: {:.2f}".format(pnu),"%")