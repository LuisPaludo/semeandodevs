Vl = float(1000)
cont = 0

while(Vl<1200):
    Vl = Vl*(1 + 0.5/100)
    cont += 1

print("Serão necessários",cont,"meses para tornar R$ 1000.00 em R$ {:.2f}".format(Vl))