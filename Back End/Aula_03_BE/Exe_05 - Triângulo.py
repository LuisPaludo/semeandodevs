l1 = float(input("Digite o lado A do triângulo: "))
l2 = float(input("Digite o lado B do triângulo: "))
l3 = float(input("Digite o lado C do triângulo: "))

if l1 < (l2 + l3) and l2 < (l1 + l3) and l3 < (l1 + l2):
    print("Os números inseridos formam a um triângulo.")
else:
    print("Os números inseridos não formam um triângulo.")